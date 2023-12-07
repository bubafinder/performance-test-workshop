import { baseUrl } from '../helpers/config.js';
import isStatusOk from '../helpers/isStatusOk.js';
import http from 'k6/http';

export default function () {
  const getHomepage = http.get(`${baseUrl}/api/test/all`);
  isStatusOk('get Homepage', getHomepage);
}
