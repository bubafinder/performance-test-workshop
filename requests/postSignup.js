import { baseUrl } from '../helpers/config.js';
import isStatusOk from '../helpers/isStatusOk.js';
import http from 'k6/http';

export default function (username, email, password) {
  const postSignup = http.post(
    `${baseUrl}/api/auth/signup`,
    {
      username,
      email,
      password
    }
  );
  isStatusOk('post Signup the user', postSignup);
}
