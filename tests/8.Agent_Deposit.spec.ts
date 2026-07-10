

import { test } from '@playwright/test';
import { DepositPage } from '../pages/Deposit_Page';
import dotenv from 'dotenv';

dotenv.config();

test.use({
    storageState: 'auth.json'
});

const CUSTOMER_PHONE = process.env.CUSTOMER_PHONE ?? '01714167655';

test("Agent Deposit", async ({ page }) => {

    const depositPage = new DepositPage(page);

    await depositPage.navigate();

    await depositPage.openCashInPage();

    await depositPage.deposit({
        phoneNumber: CUSTOMER_PHONE,
        amount: "500",
    });

    await depositPage.assertDepositSuccess("Deposit successful");

    console.log(`✓ Agent Deposit successful`);
});