import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { sleep } from 'k6';

export const MIN = 5;
export const MAX = 10;

export default function (min = MIN, max = MAX) {
    sleep(randomIntBetween(min, max));
}
