import { SharedArray } from 'k6/data';

export const users = new SharedArray('Shared Users', function () {
  return JSON.parse(open('./users.json'));
});
