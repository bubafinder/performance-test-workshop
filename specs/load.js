import {
  postSignup,
  postSignIn,
  getHomepage,
  getUserPage
} from '../requests/index.js';
import * as option from '../helpers/options.js';
import exec from 'k6/execution';
import randomSleep from '../helpers/randomSleep.js';
import { users } from '../helpers/data.js';

export const options = option.iterations(20, 20);

export default function () {
  const { username, email, password } = users[exec.vu.idInTest - 1];

  postSignup(username, email, password);

  const accessToken = postSignIn(username, password);

  getHomepage();
  randomSleep();
  getUserPage(accessToken);
}
