import {test } from '@playwright/test';

import { faker } from '@faker-js/faker';

import { SignupPage, SignupData } from '../pages/User_Signup_Page';

import { randomThreeDigit, randomPhone, randomNid } from '../utils/randomData';

import { existsSync,readFileSync, writeFileSync } from 'fs';

import dotenv from 'dotenv';

dotenv.config();

  test('Agent signup', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.navigateFromHomePage();

    const agentEmail = `zafir.abid.9+${randomThreeDigit()}@gmail.com`;
    const agentPhone = randomPhone();

    await signupPage.signup({
      fullname: `${faker.person.fullName()}`,
      email: agentEmail,
      password: '1234' ,
      phoneNumber: agentPhone,
      nid: randomNid(),
      role: 'Agent',
    });

    await signupPage.assertSignupSuccess();

const filePath = 'agent-data.json';

interface AgentData {
  agentEmail?: string;
  agentPhone?: string;
}

let agentData: AgentData = {};

if (existsSync(filePath)) {
  agentData = JSON.parse(readFileSync(filePath, 'utf-8'));
}

agentData.agentEmail = agentEmail;
agentData.agentPhone = agentPhone;

writeFileSync(filePath, JSON.stringify(agentData, null, 2));
    
  });
