import isStatusOk from '../helpers/isStatusOk.js';
import http from 'k6/http';

export default function (token) {
  const getUserPage = http.get(
    `${__ENV.BASE_URL}/api/test/user`, {
    headers: {
      'x-access-token': token
    }
  }
  );
  isStatusOk('get User Page', getUserPage);
}
