
import { test } from '@playwright/test';
import { LoginPage } from '../pages/Login_Page';
import dotenv from 'dotenv';
import { mkdirSync, unlinkSync, existsSync } from 'fs';
import { dirname } from 'path';


dotenv.config();
test.describe('Tests from Admin side ', () => {
test("Admin Login", async ({ page, context }) => {
    test.setTimeout(60000);

    const loginPage = new LoginPage(page);

    const authPath = 'auth.json';

    
    if (existsSync(authPath)) {
        unlinkSync(authPath);
        await context.clearCookies();
        console.log(`✓ Removed existing auth.json for fresh login`);
    }

    
    await loginPage.navigate();

    
    await loginPage.login({
        emailOrPhone: 'admin@dmoney.com',
        password: '1234' ,
    });

    
    await loginPage.assertLoginSuccess();

    
    try {
        mkdirSync(dirname(authPath), { recursive: true });
        await page.context().storageState({ path: authPath });
        console.log(`✓ Authentication state saved to ${authPath}`);
    } catch (error) {
        console.error(`✗ Failed to save auth.json: ${error}`);
        throw error;
    }


});

// test("Agent Activation", async ({ page }) => {
//     await page.goto("https://dmoneyportal.roadtocareer.net/profile");
//     await page.getByRole('link', { name: "User List" }).click();
//     await page.waitForURL(/admin\/users\/*/);
//     await page.getByRole("combobox").first().click();
//     await page.getByRole('option', { name: "Search by Email",exact: true }).click();

//     await page.getByRole('textbox', { name: "Enter Email", exact: true }).fill(agentData.agentEmail);
//     await page.getByRole('button', { name: "SEARCH" }).click();
//     await page.getByRole('button', { name: "VIEW" }).click();
//     // await page.waitForTimeout(1000);
//     await page.getByRole('button', { name: "Edit User" }).click();
//     await page.getByRole("combobox").last().click()
//     await page.getByRole('option', { name: "Active",exact: true }).click();

//     await page.getByRole('button', { name: "Save Changes" }).click();


    
// })

})