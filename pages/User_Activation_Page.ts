import { Page, Locator, expect  } from '@playwright/test';

export interface AgentSearchData {
    email: string;
}

export class AgentActivationPage {
    readonly page: Page;
    readonly userListLink: Locator;
    readonly searchTypeDropdown: Locator;
    readonly emailSearchOption: Locator;
    readonly emailTextbox: Locator;
    readonly searchButton: Locator;
    readonly viewButton: Locator;
    readonly editUserButton: Locator;
    readonly statusDropdown: Locator;
    readonly activeOption: Locator;
    readonly saveChangesButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.userListLink = page.getByRole('link', { name: "User List" });
        this.searchTypeDropdown = page.getByRole("combobox").first();
        this.emailSearchOption = page.getByRole('option', {name: "Search by Email", exact: true});
        this.emailTextbox = page.getByRole('textbox', {name: "Enter Email",exact: true});
        this.searchButton = page.getByRole('button', { name: "SEARCH" });
        this.viewButton = page.getByRole('button', { name: "VIEW" });
        this.editUserButton = page.getByRole('button', { name: "Edit User" });
        this.statusDropdown = page.getByRole("combobox").last();
        this.activeOption = page.getByRole('option', {name: "Active",exact: true});
        this.saveChangesButton = page.getByRole('button', {name: "Save Changes"});
        this.successMessage = page.getByText("User updated successfully", {exact: true});
    }

    async navigate() {
        await this.page.goto('/profile');
    }

    async openUserList() {
        await this.userListLink.click();
        await this.page.waitForURL(/admin\/users\/*/);
    }

    async searchAgent(data: AgentSearchData) {
        await this.searchTypeDropdown.click();
        await this.emailSearchOption.click();
        await this.emailTextbox.fill(data.email);
        await this.searchButton.click();
    }

    async openAgentDetails() {
        await this.viewButton.click();
    }

    async activateAgent() {
        await this.editUserButton.click();
        await this.statusDropdown.click();
        await this.activeOption.click();
        await this.saveChangesButton.click();
        // await this.page.waitForTimeout(5000);
    }

    async activate(data: AgentSearchData) {
        await this.searchAgent(data);
        await this.openAgentDetails();
        await this.activateAgent();
    }
    async assertAgentActivationSuccess() {
    await expect(this.successMessage).toBeVisible();
}
}