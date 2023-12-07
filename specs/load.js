import * as req from '../requests/index.js';
import * as option from '../helpers/options.js';
import exec from 'k6/execution';
import { devMode } from '../helpers/config.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { users } from '../helpers/data.js';

export const options = option.iterations(20, 20);

export default function () {
  const { username, email, password } = users[exec.vu.idInTest - 1];

  req.postSignup(username, email, password);
  const accessToken = req.postSignIn(username, password);
  randomSleep();

  req.getHomepage();

  req.getUserPage(accessToken);
}

function randomSleep() {
  if (devMode) return;
  sleep(randomIntBetween(5, 10));
}

export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data),
    'result.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true })
  };
}