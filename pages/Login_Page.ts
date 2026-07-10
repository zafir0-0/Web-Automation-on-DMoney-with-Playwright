import { Page, Locator } from '@playwright/test';

export interface LoginData {
    emailOrPhone: string;
    password: string;
}

export class LoginPage {
    readonly page: Page;
    readonly emailOrPhoneInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly otpInput: Locator;
    readonly verifyOtpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailOrPhoneInput = page.getByRole('textbox', { name: "Email or Phone Number" });
        this.passwordInput = page.getByRole('textbox', { name: "Password" });
        this.loginButton = page.getByRole('button', { name: "Login →" });
        this.otpInput = page.getByRole('textbox', { name: "Enter 4-Digit OTP" });
        this.verifyOtpButton = page.getByRole('button', { name: "Verify OTP →" });
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async fillCredentials(data: LoginData) {
        await this.emailOrPhoneInput.fill(data.emailOrPhone);
        await this.passwordInput.fill(data.password);
    }

    async submitCredentials() {
        await this.loginButton.click();
    }

    async login(data: LoginData) {
        await this.fillCredentials(data);
        await this.submitCredentials();
    }

    async submitOtp(otp: string) {
        await this.otpInput.fill(otp);
        await this.verifyOtpButton.click();
    }

    async assertLoginSuccess() {
        await this.page.waitForURL(/profile\/*/);
    }
}
