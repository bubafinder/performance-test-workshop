import { LoginPage } from "./LoginPage.js";

export class Header {
    constructor(page) {
        this.page = page;
        this.loginButton = this.page.locator('nav a[href="/login"]');
    }

    async clickLogin() {
        await this.loginButton.click();
        await new LoginPage(this.page).isOpened();
    }
}