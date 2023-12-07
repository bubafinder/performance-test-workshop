import { baseUrl } from '../helpers/config.js';
import isStatusOk from '../helpers/isStatusOk.js';
import http from 'k6/http';

export default function (token) {
  const getUserPage = http.get(
    `${baseUrl}/api/test/user`, {
    headers: {
      'x-access-token': token
    }
  }
  );
  isStatusOk('get User Page', getUserPage);
}
