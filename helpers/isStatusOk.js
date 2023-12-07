import { check, fail } from 'k6';

export default function (name, response, failIfNotOk = true) {
  const isSuccessful = check(response, {
    [`${name} -> success response status code`]: (r) =>
      r.status === 200 || r.status === 201,
  });
  if (failIfNotOk && !isSuccessful) {
    fail(`Status code for ${name} response was ${response.status}`);
  }
}
