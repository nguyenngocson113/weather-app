import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, batch } from 'react-redux';
import SearchCity from 'components/SearchCity';
import device from 'responsive/Device';
import Result from 'components/Result';
import NotFound from 'components/NotFound';
import { getWeather, getForecast } from "../data-actions";
import { useWeatherState, useForecastState } from '../data-actions/use-state';

const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
    @media ${device.tablet} {
      font-size: 40px;
    }
    @media ${device.laptop} {
      font-size: 50px;
    }
    @media ${device.laptopL} {
      font-size: 60px;
    }
    @media ${device.desktop} {
      font-size: 70px;
    }
    
  `}

  ${({ showResult }) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

const Home = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');

  const { error, weatherData } = useWeatherState();
  const { error: forecastError, forecastData } = useForecastState();

  const hasData = (weatherData && forecastData) || (error && forecastError);
  const hasError = error || forecastError;

  const handleInputChange = e => {
    setCity(e.target.value);
  };

  const handleSearchCity = e => {
    e.preventDefault();
    batch(() => {
      dispatch(getWeather(city));
      dispatch(getForecast(city));
    });
  };

  return (
    <>
      <AppTitle showLabel={hasData}>Weather app</AppTitle>
      <WeatherWrapper>
        <AppTitle secondary showResult={hasData}>
          Weather web
        </AppTitle>
        <SearchCity
          value={city}
          showResult={!!hasData}
          change={(...props) => handleInputChange(...props)}
          submit={(...props) => handleSearchCity(...props)}
        />
        {hasError ? <NotFound error={hasError} /> : <Result />}
      </WeatherWrapper>
    </>
  );
};

export default Home;
