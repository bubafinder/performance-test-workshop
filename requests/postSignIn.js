import { baseUrl } from '../helpers/config.js';
import isStatusOk from '../helpers/isStatusOk.js';
import http from 'k6/http';

export default function (username, password) {
  const postSignIn = http.post(
    `${baseUrl}/api/auth/signin`,
    {
      username,
      password
    }
  );
  isStatusOk('post Sign In the user', postSignIn);
  return JSON.parse(postSignIn.body).accessToken;
}
