import {Page, Locator, expect} from '@playwright/test';

export interface SignupData {
    fullname:string;
    email: string;
    password: string;
    phoneNumber: string;
    nid:string;
    role: 'Customer' | 'Agent' | 'Merchant';
}

export class SignupPage {
    readonly page:Page;
    readonly fullnameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly phoneInput: Locator;
    readonly nidInput: Locator;
    readonly roleCombobox: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;

    constructor(page : Page) {
        this.page = page;
        this.fullnameInput = page.getByRole('textbox', {name: "Full Name"});
        this.emailInput = page.getByRole('textbox',{name: "Email Address" });
        this.passwordInput= page.getByRole('textbox', {name: "Password"})
        this.phoneInput = page.getByRole('textbox', {name:  "Phone Number"})
        this.nidInput= page.getByRole('textbox',{name: "National ID (NID)"})
        this.roleCombobox = page.getByRole('combobox')
        this.submitButton = page.getByRole('button', {name: "Create Account →"})
        this.successMessage = page.getByText('Registration successful. Your account is pending approval by an admin.');
    }

    async navigateFromHomePage() {
        await this.page.goto('/');
        await this.page.getByRole('link', {name: "Sign Up"}).first().click();
        await this.page.waitForURL('**/register')
    }

    async fillForm(data: SignupData) {
        await this.fullnameInput.fill(data.fullname);
        await this.emailInput.fill(data.email);
        await this.passwordInput.fill(data.password);
        await this.phoneInput.fill(data.phoneNumber);
        await this.nidInput.fill(data.nid);
        await this.roleCombobox.click();
        await this.page.getByRole('option', { name: new RegExp(data.role, 'i') }).click();
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async signup(data: SignupData) {
        await this.fillForm(data);
        await this.submitForm();
    }

    async assertSignupSuccess() {
        
        await expect(this.successMessage).toBeVisible();
        
    }




}