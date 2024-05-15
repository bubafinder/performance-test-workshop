import isStatusOk from '../helpers/isStatusOk.js';
import http from 'k6/http';

export default function (token) {
  const getAdminPage = http.get(
    `${__ENV.BASE_URL}/api/test/admin`, {
    headers: {
      'x-access-token': token
    }
  }
  );
  isStatusOk('get Admin Page', getAdminPage);
}
