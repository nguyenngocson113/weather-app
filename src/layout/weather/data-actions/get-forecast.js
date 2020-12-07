import { WEATHER_API_KEY } from 'env';
import { fetchApi } from 'api/helpers';
import set from 'lodash/set';

const ACTIONS = {
  FETCH_REQUEST: 'forecast/FetchGetDetailForecast',
  FETCH_SUCCESS: 'weather/FetchGetDetailForecastSuccess',
  FETCH_ERROR: 'weather/FetchGetDetailForecastError',
};

const GET_FORECAST_API = `/forecast/daily?APPID=${WEATHER_API_KEY}&units=metric&cnt=5`;

export const getForecast = city => {
  return dispatch => {
    dispatch({
      type: ACTIONS.FETCH_REQUEST,
    });
    const params = {
      entry: `${GET_FORECAST_API}&q=${city}`,
      options: {
        method: 'GET',
      },
    };

    return fetchApi(
      dispatch,
      params,
      result => {
        dispatch({
          type: ACTIONS.FETCH_SUCCESS,
          payload: {
            data: result,
          },
        });
      },
      error => {
        dispatch({
          type: ACTIONS.FETCH_ERROR,
          payload: error,
        });
      },
    );
  };
};

export const getForecastHandler = {
  type: [ACTIONS.FETCH_REQUEST, ACTIONS.FETCH_SUCCESS, ACTIONS.FETCH_ERROR],
  handler: (state, action) => {
    switch (action.type) {
      case ACTIONS.FETCH_REQUEST: {
        set(state, ['forecastData'], null);
        set(state, ['loading'], true);

        return state;
      }
      case ACTIONS.FETCH_SUCCESS: {
        set(state, ['forecastData'], action.payload);
        set(state, ['loading'], false);
        set(state, ['getForecastError'], null);

        return state;
      }
      case ACTIONS.FETCH_ERROR: {
        set(state, ['getForecastError'], action.payload);
        set(state, ['loading'], false);
        set(state, ['forecastData'], null);

        return state;
      }
      default: {
        return state;
      }
    }
  },
};
