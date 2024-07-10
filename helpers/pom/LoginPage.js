import { check } from 'k6';
import randomSleep from '../randomSleep.js';

export class LoginPage {
    constructor(page) {
        this.url = '/login';
        this.page = page;
        this.profileImage = this.page.locator('img[id="profile-img"]');
        this.usernameInput = this.page.locator('input[name="username"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.loginButton = this.page.locator('button[class*="btn-primary"]');
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
            'Login Page is opened': imageIsVisible === true,
        });
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        randomSleep(1, 2);
        await this.passwordInput.fill(password);
        randomSleep(1, 2);
        await this.loginButton.click();
    }
}