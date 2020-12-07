import { ERR_MES_DEFAULT, FETCH_TIMEOUT_IN_SECOND, ERR_MES_FETCH_TIMEOUT } from 'api/consts';

import { WEATHER_DOMAIN } from 'env';

export function fetchApi(dispatch, params, onResponse, onError) {
  return service(
    params,
    data => {
      return onResponse(data);
    },
    error => {
      return onError(error);
    },
  );
}

const parse = async response => {
  let httpStatusCode = response.status;
  if (httpStatusCode !== 200) {
    throw {
      message: ERR_MES_DEFAULT,
      httpStatusCode,
    };
  }

  const json = await response.json();
  if (json.error) {
    throw json.error;
  }
  return json;
};

export function service(params, onResponse, onError) {
  const options = {
    ...params.options,
    headers: (params.options && params.options.headers) || {},
  };

  if (options.body) {
    if (typeof options.body === 'object' && !(options.body instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }
  }

  const url = `${params.domain || WEATHER_DOMAIN}${params.entry}`;

  return fetchWithTimeout(url, options)
    .then(parse)
    .then(response => {
      return onResponse(response);
    })
    .catch(error => {
      // Check case network error if any
      if (error instanceof TypeError) {
        return onError({
          message: ERR_MES_DEFAULT,
        });
      }

      return onError(error);
    });
}

const fetchWithTimeout = (url, options) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(
        () =>
          reject({
            success: false,
            error: {
              message: ERR_MES_FETCH_TIMEOUT,
              httpStatusCode: 408,
            },
          }),
        options.timeoutInSecond || FETCH_TIMEOUT_IN_SECOND * 1000,
      ),
    ),
  ]);
};
