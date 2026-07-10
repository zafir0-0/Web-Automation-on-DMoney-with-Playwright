import { Page, Locator, expect } from '@playwright/test';

export interface DepositData {
    phoneNumber: string;
    amount: string;
}

export class DepositPage {
    readonly page: Page;
    readonly cashInLink: Locator;
    readonly customerPhoneInput: Locator;
    readonly amountInput: Locator;
    readonly cashInButton: Locator;
    

    constructor(page: Page) {
        this.page = page;

        this.cashInLink = page.getByRole('link', {name: "Cash In",
            exact: true
});

        this.customerPhoneInput = page.getByRole('textbox', {
            name: "Customer Phone Number",
            exact: true
        });

        this.amountInput = page.getByRole('spinbutton', {
            name: "Amount (BDT)",
            exact: true
        });

        this.cashInButton = page.getByRole('button', {
            name: "Cash In →",
            exact: true
        });

        
    }

    async navigate() {
        await this.page.goto('/profile');
    }

    async openCashInPage() {
        await this.cashInLink.click();
        await this.page.waitForURL(/agent\/cash-in\/*/);
    }

    async fillDepositDetails(data: DepositData) {
        await this.customerPhoneInput.fill(data.phoneNumber);
        await this.amountInput.fill(data.amount);
    }

    async submitDeposit() {
        await this.cashInButton.click();
    }

    async deposit(data: DepositData) {
        await this.fillDepositDetails(data);
        await this.submitDeposit();
    }

    async assertDepositSuccess(message: string) {
    await expect(
        this.page.getByText(message, { exact: true })
    ).toBeVisible();
}
}