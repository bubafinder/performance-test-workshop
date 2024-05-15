import { getUserPage, postSignIn } from '../requests/index.js';
import * as option from '../helpers/options.js';
import { users } from '../helpers/data.js';

export const options = option.iterations(1, 1);

export default function () {
  const { username, password } = users[0];
  const accessToken = postSignIn(username, password);

  getUserPage(accessToken);
}