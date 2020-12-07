import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SmallLabel from 'components/Label/SmallLabel';
import Text from 'components/Text';
import device from 'responsive/Device';

const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media ${device.tablet} {
    flex-basis: 110px;
  }
  @media ${device.laptop} {
    flex-basis: 125px;
  }
  @media ${device.laptopL} {
    flex-basis: 140px;
  }
`;

const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

const ForecastDay = props => {
  const { temp, date, icon } = props;
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <ForecastWrapper>
      <Text align="center">{date}</Text>
      <WeatherIcon src={iconUrl} />
      <SmallLabel align="center" weight="400">
        {temp}
      </SmallLabel>
    </ForecastWrapper>
  );
};

ForecastDay.propTypes = {
  temp: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ForecastDay;
