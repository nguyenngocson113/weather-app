import React from 'react';

// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import device from 'responsive/Device';
import ForecastDay from 'components/ForecastDay';
import ResultFadeIn from 'components/ResultFadeIn';
import { BigLabel, MediumLabel, SmallLabel } from 'components/Label';
import Text from 'components/Text';

// states
import { useWeatherState, useForecastState } from 'layout/weather/data-actions';

// constants
import { DAYS } from 'layout/weather/consts';

export const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;

export const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

export const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

export const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media ${device.laptop} {
    font-size: 120px;
  }
  @media ${device.laptopL} {
    font-size: 140px;
  }
`;

export const TemperatureWrapper = styled.div``;

export const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 70px;
  }
  @media ${device.laptop} {
    font-size: 90px;
  }
  @media ${device.laptopL} {
    font-size: 110px;
  }
`;

export const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  align-self: flex-start;
  @media ${device.mobileL} {
    flex-basis: 50%;
  }
`;

export const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${device.laptop} {
    padding: 20px 10px;
  }
`;

export const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

export const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;
  margin: 0 auto;
  justify-content: start;
  @media ${device.laptop} {
    order: 4;
  }
  @media ${device.tablet} {
    justify-content: center;
  }
`;

const WEATHER_ICONS = {
  Thunderstorm: faBolt,
  Drizzle: faCloudRain,
  Rain: faCloudShowersHeavy,
  Snow: faSnowflake,
  Clear: faSun,
  Clouds: faCloud,
};

const Result = () => {
  const { weatherData } = useWeatherState();
  const { forecastData } = useForecastState();

  if (!weatherData || !forecastData) {
    return null;
  }

  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
  } = weatherData;

  const getTemp = temp => `${Math.floor(temp * 1) / 1}°`;

  const forecasts = forecastData.map(item => {
    const date = new Date(item.dt * 1000);
    return (
      <ForecastDay
        key={item.dt}
        temp={`${getTemp(item.temp.max)} - ${getTemp(item.temp.min)}`}
        icon={item.weather[0].icon}
        date={DAYS[date.getDay()]}
      />
    );
  });

  const renderWeatherDetails = () => {
    const weatherParams = [
      { value: `${Math.floor(highestTemp)}°`, text: 'Hight' },
      { value: `${wind}mph`, text: 'Wind' },
      { value: sunrise, text: 'Sunrise' },
      { value: `${Math.floor(lowestTemp)}°`, text: 'Low' },
      { value: `${humidity}%`, text: 'Rain' },
      { value: sunset, text: 'Sunset' },
    ];
    return weatherParams.map(param => (
      <WeatherDetail key={param.text}>
        <SmallLabel align="center" weight="400">
          {param.value}
        </SmallLabel>
        <Text align="center">{param.text}</Text>
      </WeatherDetail>
    ));
  };

  return (
    <Results>
      <LocationWrapper>
        <BigLabel>
          {city}, {country}
        </BigLabel>
        <SmallLabel weight="400">{date}</SmallLabel>
      </LocationWrapper>
      <CurrentWeatherWrapper>
        <WeatherIcon>
          <FontAwesomeIcon icon={WEATHER_ICONS[main] || faSmog} />
        </WeatherIcon>
        <TemperatureWrapper>
          <Temperature>{Math.floor(temp)}&#176;</Temperature>
          <SmallLabel weight="400" firstToUpperCase>
            {description}
          </SmallLabel>
        </TemperatureWrapper>
      </CurrentWeatherWrapper>
      <WeatherDetailsWrapper>{renderWeatherDetails()}</WeatherDetailsWrapper>
      <ForecastWrapper>
        <MediumLabel weight="400">Forecast</MediumLabel>
        <Forecast>{forecasts}</Forecast>
      </ForecastWrapper>
    </Results>
  );
};

export default Result;
