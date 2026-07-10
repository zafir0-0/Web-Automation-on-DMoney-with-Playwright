import { Page, Locator, expect } from '@playwright/test';

export class SelfStatementPage {
    readonly page: Page;
    readonly selfStatementLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.selfStatementLink = page.getByRole('link', {
            name: "Self Statement",
            exact: true
        });
    }

    async navigate() {
        await this.page.goto('/profile');
    }

    async openSelfStatement() {
        await this.selfStatementLink.click();
        await this.page.waitForURL(/agent\/self-statement\/*/);
    }

    async assertCurrentBalance(balance: string) {
        await expect(
            this.page.getByRole('heading', {
                name: `Current Balance: BDT ${balance}`
            })
        ).toBeVisible();
    }
}