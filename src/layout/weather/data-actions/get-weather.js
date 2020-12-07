import { WEATHER_API_KEY } from 'env';
import { fetchApi } from 'api/helpers';
import { DAYS, MONTHS } from '../consts';
import set from 'lodash/set';

const ACTIONS = {
  FETCH_REQUEST: 'weather/FetchGetDetailWeather',
  FETCH_SUCCESS: 'weather/FetchGetDetailWeatherSuccess',
  FETCH_ERROR: 'weather/FetchGetDetailWeatherError',
};

const GET_WEATHER_API = `/weather?APPID=${WEATHER_API_KEY}&units=metric`;

const buildWeatherInfo = data => {
  const currentDate = new Date();
  const date = `${DAYS[currentDate.getDay()]} ${currentDate.getDate()} ${
    MONTHS[currentDate.getMonth()]
  }`;
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);

  return {
    city: data.name,
    country: data.sys.country,
    date,
    description: data.weather[0].description,
    main: data.weather[0].main,
    temp: data.main.temp,
    highestTemp: data.main.temp_max,
    lowestTemp: data.main.temp_min,
    sunrise,
    sunset,
    clouds: data.clouds.all,
    humidity: data.main.humidity,
    wind: data.wind.speed,
  };
};

export const getWeather = city => {
  return dispatch => {
    dispatch({
      type: ACTIONS.FETCH_REQUEST,
    });
    const params = {
      entry: `${GET_WEATHER_API}&q=${city}`,
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
            data: buildWeatherInfo(result),
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

export const getWeatherHandler = {
  type: [ACTIONS.FETCH_REQUEST, ACTIONS.FETCH_SUCCESS, ACTIONS.FETCH_ERROR],
  handler: (state, action) => {
    switch (action.type) {
      case ACTIONS.FETCH_REQUEST: {
        set(state, ['weatherData'], null);
        set(state, ['loading'], true);

        return state;
      }
      case ACTIONS.FETCH_SUCCESS: {
        set(state, ['weatherData'], action.payload);
        set(state, ['loading'], false);
        set(state, ['getWeatherError'], null);

        return state;
      }
      case ACTIONS.FETCH_ERROR: {
        set(state, ['getWeatherError'], action.payload);
        set(state, ['loading'], false);
        set(state, ['weatherData'], null);

        return state;
      }
      default: {
        return state;
      }
    }
  },
};
