import { check } from 'k6';

export class ProfilePage {
    constructor(page) {
        this.url = '/profile';
        this.page = page;
    }

    async goto() {
        await this.page.goto(__ENV.BASE_URL_BROWSER + this.url, {
            waitUntil: 'networkidle',
        });
        await this.isOpened();
    }

    async isOpened(username) {
        const usernameText = await this.page.locator('h3 strong').textContent();
        check(usernameText, {
            'Profile Page is opened': usernameText === username
        });
    }
}