import isStatusOk from '../helpers/isStatusOk.js';
import http from 'k6/http';

export default function (token) {
  const getModeratorPage = http.get(
    `${__ENV.BASE_URL}/api/test/mod`, {
    headers: {
      'x-access-token': token
    }
  }
  );
  isStatusOk('get Moderator Page', getModeratorPage);
}
