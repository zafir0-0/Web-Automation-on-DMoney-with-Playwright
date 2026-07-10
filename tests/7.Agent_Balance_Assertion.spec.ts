

import { test } from '@playwright/test';
import { SelfStatementPage } from '../pages/User_Self_Statement_Page.ts';

import dotenv from 'dotenv';

dotenv.config();

test.use({
    storageState: 'auth.json'
});

test("Agent Balance Assertion", async ({ page }) => {

    const selfStatementPage = new SelfStatementPage(page);

    await selfStatementPage.navigate();

    await selfStatementPage.openSelfStatement();

    await selfStatementPage.assertCurrentBalance("2000.00");

    console.log(
        "✓ Agent balance assertion successful: Current Balance is 2000.00 BDT"
    );
});