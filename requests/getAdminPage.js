import { baseUrl } from '../helpers/config.js';
import isStatusOk from '../helpers/isStatusOk.js';
import http from 'k6/http';

export default function (token) {
  const getAdminPage = http.get(
    `${baseUrl}/api/test/admin`, {
    headers: {
      'x-access-token': token
    }
  }
  );
  isStatusOk('get Admin Page', getAdminPage);
}
