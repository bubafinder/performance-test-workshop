import * as option from '../helpers/options.js';
import { browser } from 'k6/browser';
import exec from 'k6/execution';
import randomSleep from '../helpers/randomSleep.js';
import { users } from '../helpers/data.js';
import { LoginPage, RegisterPage, ProfilePage, Header } from '../helpers/pom/index.js';
import { sleep } from 'k6';

export const options = option.browser(1, 1);

export default async function () {
  const { username, email, password } = users[exec.vu.idInTest - 1];

  const page = await browser.newPage();

  try {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    randomSleep(1, 2);
    await registerPage.signUp(username, email, password);
    randomSleep(1, 2);

    const header = new Header(page);
    await header.clickLogin();
    randomSleep(1, 2);

    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);

    const profilePage = new ProfilePage(page);
    await profilePage.isOpened(username);

    sleep(1);
  } finally {
    await page.close();
  }
}
