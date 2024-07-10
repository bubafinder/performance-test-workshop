import { check } from 'k6';
import randomSleep from '../randomSleep.js';

export class RegisterPage {
    constructor(page) {
        this.url = '/register';
        this.page = page;
        this.profileImage = this.page.locator('img[id="profile-img"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.usernameInput = this.page.locator('input[name="username"]');
        this.emailInput = this.page.locator('input[name="email"]');
        this.signUpButton = this.page.locator('button[class*="btn-primary"]');
        this.successMessage = this.page.locator('div[class*="alert-success"]');
        this.alertMessage = this.page.locator('div[class*="alert-danger"]');
    }

    async goto() {
        await this.page.goto(__ENV.BASE_URL_BROWSER + this.url, {
            waitUntil: 'networkidle',
        });
        await this.isOpened();
    }

    async isOpened() {
        const imageIsVisible = await this.profileImage.isVisible();
        check(imageIsVisible, {
            'Register Page is opened': imageIsVisible === true,
        });
    }

    async alertMessageIsNotVisible() {
        const message = await this.alertMessage.isHidden();
        check(message, {
            'Error Register message is not visible': message === true,
        });
    }

    async signUp(username, email, password) {
        await this.usernameInput.fill(username);
        randomSleep(1, 2);
        await this.emailInput.fill(email);
        randomSleep(1, 2);
        await this.passwordInput.fill(password);
        randomSleep(1, 2);
        await this.signUpButton.click();
        await this.successMessage.waitFor({
            state: 'visible',
        });
        await this.alertMessageIsNotVisible();
    }
}