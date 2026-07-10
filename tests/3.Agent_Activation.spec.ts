
import { test } from '@playwright/test';
import { AgentActivationPage } from '../pages/User_Activation_Page.ts';
import agentData from '../agent-data.json';

test.use({
    storageState: 'auth.json'
});

test("Agent Activation", async ({ page }) => {

    const agentActivationPage = new AgentActivationPage(page);

    await agentActivationPage.navigate();

    await agentActivationPage.openUserList();

    await agentActivationPage.activate({
        email: agentData.agentEmail
    });
    await agentActivationPage.assertAgentActivationSuccess();
});