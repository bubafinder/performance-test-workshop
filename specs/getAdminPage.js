import * as req from '../requests/index.js';
import * as option from '../helpers/options.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { users } from '../helpers/data.js';

export const options = option.iterations(1, 1);

export default function () {
  const { username, password } = users[0];
  const accessToken = req.postSignIn(username, password);

  req.getAdminPage(accessToken);
}

export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data),
    'result.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true })
  };
}