import { projectID } from '../helpers/config.js';

/**
 * Configuration if you want to control the maximum number of requests to make
 * per second globally.
 *
 * @param   userCount  Number of VUs to run concurrently.
 * @param   rps  Maximum number of requests to make per second.
 * @param   duration  Load duration.
 * @param   failureRate  The treshold value fotr the rate of HTTP errors.
 * Default value is 0%.
 * @returns k6 option object.
 */
export function rps(userCount, rps, duration, failureRate = '===0') {
  return {
    discardResponseBodies: true,
    vus: userCount,
    rps,
    duration,
    ext: {
      loadimpact: {
        projectID,
      },
    },
    thresholds: {
      http_req_failed: [`rate${failureRate}`],
    },
  };
}

/**
 * Key configurations for avg load test.
 *
 * @param   userCount  Number of VUs to run concurrently.
 * @param   duration  Load duration.
 * @param   rampUpDuration  Ramp up period. Default value is set to 10s.
 * @param   rampDownDuration  Ramp down period. Default value is set to 10s.
 * @param   failureRate  The treshold value fotr the rate of HTTP errors.
 * Default value is 0%.
 * @returns k6 option object.
 */
export function stages(
  userCount,
  duration,
  rampUpDuration = '10s',
  rampDownDuration = '10s',
  failureRate = '===0'
) {
  return {
    stages: [
      { duration: rampUpDuration, target: userCount },
      { duration, target: userCount },
      { duration: rampDownDuration, target: 0 },
    ],
    ext: {
      loadimpact: {
        projectID,
      },
    },
    thresholds: {
      http_req_failed: [`rate${failureRate}`],
    },
  };
}

/**
 * Configuration that is convenient for local development.
 * Send only desired number of users and number of iterations.
 *
 * @param   userCount  Number of VUs to run concurrently.
 * @param   iterationCount  Number of exec function iterations to be
 * executed in total.
 * @param   failureRate  The treshold value fotr the rate of HTTP errors.
 * Default value is 0%.
 * @returns k6 option object.
 */
export function iterations(userCount, iterationCount, failureRate = '===0') {
  return {
    vus: userCount,
    iterations: iterationCount,
    ext: {
      loadimpact: {
        projectID,
      },
    },
    thresholds: {
      http_req_failed: [`rate${failureRate}`],
    },
  };
}
