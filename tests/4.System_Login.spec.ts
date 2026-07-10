


import { test } from '@playwright/test';
import { LoginPage } from '../pages/Login_Page';
import dotenv from 'dotenv';
import { mkdirSync, unlinkSync, existsSync } from 'fs';
import { dirname } from 'path';

dotenv.config();

test("System Login", async ({ page, context }) => {
    test.setTimeout(60000);

    const loginPage = new LoginPage(page);

    const authPath = 'auth.json';

   
    if (existsSync(authPath)) {
        unlinkSync(authPath);
        await context.clearCookies();
        console.log(`✓ Removed existing auth.json for fresh login`);
    }

    // Navigate to login page
    await loginPage.navigate();

    // Perform login
    await loginPage.login({
        emailOrPhone: process.env.SYSTEM_EMAIL ?? "",
        password: process.env.SYSTEM_PASSWORD ?? "",
    });

    // Verify successful login
    await loginPage.assertLoginSuccess();

    // Save authentication state
    try {
        mkdirSync(dirname(authPath), { recursive: true });
        await page.context().storageState({ path: authPath });
        console.log(`✓ Authentication state saved to ${authPath}`);
    } catch (error) {
        console.error(`✗ Failed to save auth.json: ${error}`);
        throw error;
    }
});




