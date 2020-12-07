import { initState, getWeatherHandler, getForecastHandler } from './data-actions';
import { WEATHER_REDUCER_NAME } from './consts';

export default {
  name: WEATHER_REDUCER_NAME,
  initState,
  handlers: [getWeatherHandler, getForecastHandler],
};
