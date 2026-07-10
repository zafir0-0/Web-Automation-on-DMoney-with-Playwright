import { test } from '@playwright/test';
import { DepositPage } from '../pages/Deposit_Page.ts';
import agentData from '../agent-data.json';

test.use({
    storageState: 'auth.json'
});

test("System Deposit to Agent", async ({ page }) => {

    const depositPage = new DepositPage(page);

    await depositPage.navigate();

    await depositPage.openCashInPage();

    await depositPage.deposit({
        phoneNumber: agentData.agentPhone,
        amount: "2000",
    });

    await depositPage.assertDepositSuccess("SYSTEM deposit to Agent successful");
});