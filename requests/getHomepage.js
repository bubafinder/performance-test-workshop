import isStatusOk from '../helpers/isStatusOk.js';
import http from 'k6/http';

export default function () {
  const getHomepage = http.get(`${__ENV.BASE_URL}/api/test/all`);
  isStatusOk('get Homepage', getHomepage);
}
