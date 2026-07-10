import { test } from '@playwright/test';
import { LoginPage } from '../pages/Login_Page';
import { readLatestEmail } from '../services/gmailAuth';
import { extractOTP } from '../utils/extractOTP';
import { mkdirSync, unlinkSync, existsSync } from 'fs';
import { dirname } from 'path';
import agentData from '../agent-data.json';
import dotenv from 'dotenv';
dotenv.config();

test("Agent login", async ({ page, request, context }) => {
    test.setTimeout(60000);
    const loginPage = new LoginPage(page);

    const authPath = 'auth.json';
    if (existsSync(authPath)) {
        unlinkSync(authPath);
        context.clearCookies();
        console.log(`✓ Removed existing auth.json for fresh login`);
    }

    const previousOTP = extractOTP(await readLatestEmail(request));

    await loginPage.navigate();
    await loginPage.login({
        emailOrPhone: agentData.agentEmail,
        password: process.env.AGENT_PASSWORD ?? "",
    });
    await page.waitForTimeout(5000);

    let newOTP: string = '';
    for (let i = 0; i < 10; i++) {
        await page.waitForTimeout(1000);
        const currentOTP = extractOTP(await readLatestEmail(request));
        if (previousOTP !== currentOTP) {
            newOTP = currentOTP;
            break;
        }
    }

    await loginPage.submitOtp(newOTP);

    await loginPage.assertLoginSuccess();
    try {
        mkdirSync(dirname(authPath), { recursive: true });
        await page.context().storageState({ path: authPath });
        console.log(`✓ Authentication state saved to ${authPath}`);
    } catch (error) {
        console.error(`✗ Failed to save auth.json: ${error}`);
        throw error;
    }
})
