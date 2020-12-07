import { useSelector, shallowEqual } from 'react-redux';
import { WEATHER_REDUCER_NAME as reducerName } from '../consts';
import get from 'lodash/get';

const stateSelector = state => {
  console.log('state:', state);

  return {
    // get weather
    weatherData: get(state, [reducerName, 'weatherData', 'data']),
    getWeatherError: get(state, [reducerName, 'getWeatherError']),
    loading: get(state, [reducerName, 'loading']),
    // get forecast
    forecastData: get(state, [reducerName, 'forecastData', 'data', 'list']),
    getForecastError: get(state, [reducerName, 'getForecastError']),
    loadingForecast: get(state, [reducerName, 'loadingForecast']),
  };
};

const useWeatherState = () => {
  let { weatherData, getWeatherError: error, loading } = useSelector(stateSelector, shallowEqual);

  return {
    weatherData,
    error,
    loading,
  };
};

const useForecastState = () => {
  let { forecastData, getForecastError: error, loadingForecast } = useSelector(
    stateSelector,
    shallowEqual,
  );

  return {
    forecastData,
    error,
    loadingForecast,
  };
};

export { useWeatherState, useForecastState };
