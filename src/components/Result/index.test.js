import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import * as Redux from 'react-redux';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import weatherMockData from './__test__/mock-data-weather.json';
import forecastMockData from './__test__/mock-data-forecast.json';
import Result, {
  LocationWrapper,
  CurrentWeatherWrapper,
  WeatherIcon,
  TemperatureWrapper,
  Temperature,
  WeatherDetailsWrapper,
  WeatherDetail,
  ForecastWrapper,
  Forecast,
} from './index';
import { BigLabel, SmallLabel, MediumLabel } from 'components/Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from 'components/Text';
import ForecastDay from 'components/ForecastDay';

configure({ adapter: new Adapter() });
describe('<Result /> is rendered', () => {
  let useSelectorSpy;

  beforeEach(() => {
    useSelectorSpy = jest.spyOn(Redux, 'useSelector');
  });

  test('return null when dont have weather and forecast', () => {
    useSelectorSpy.mockReturnValue({});
    const wrapper = renderer.create(<Result />).toJSON();
    expect(wrapper).toEqual(null);
  });
});

describe('<Result /> is rendered', () => {
  let useSelectorSpy;

  beforeEach(() => {
    useSelectorSpy = jest.spyOn(Redux, 'useSelector');
    useSelectorSpy.mockReturnValue({
      weatherData: weatherMockData,
      forecastData: forecastMockData,
    });
  });

  test('snapshot <Result /> component', () => {
    const wrapper = renderer.create(<Result />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  test('with style of Results tag', () => {
    const wrapper = shallow(<Result />);
    expect(wrapper).toHaveStyleRule('display', 'flex');
    expect(wrapper).toHaveStyleRule('flex-wrap', 'wrap');
    expect(wrapper).toHaveStyleRule('justify-content', 'space-between');
    expect(wrapper).toHaveStyleRule('padding', '40px 0');
    expect(wrapper).toHaveStyleRule('opacity', '0');
    expect(wrapper).toHaveStyleRule('visibility', 'hidden');
    expect(wrapper).toHaveStyleRule('top', '20px');
  });

  describe('<LocationWrapper /> is rendered', () => {
    test('with style of LocationWrapper tag', () => {
      const wrapper = shallow(<Result />);
      const location = wrapper.find(LocationWrapper);
      expect(location.exists()).toEqual(true);
      expect(location).toHaveStyleRule('flex-basis', '100%');
    });
    test('with <BigLabel />', () => {
      const wrapper = shallow(<Result />);
      const location = wrapper.find(LocationWrapper);
      const bigLabel = location.find(BigLabel);
      expect(bigLabel.exists()).toEqual(true);
      expect(bigLabel.text()).toEqual(`${weatherMockData.city}, ${weatherMockData.country}`);
    });
    test('with <SmallLabel />', () => {
      const wrapper = shallow(<Result />);
      const location = wrapper.find(LocationWrapper);
      const smallLabel = location.find(SmallLabel);
      expect(smallLabel.exists()).toEqual(true);
      expect(smallLabel.text()).toEqual(`${weatherMockData.date}`);
    });
  });

  describe('<CurrentWeatherWrapper /> is rendered', () => {
    test('with style of CurrentWeatherWrapper tag', () => {
      const wrapper = shallow(<Result />);
      const currentWeather = wrapper.find(CurrentWeatherWrapper);
      expect(currentWeather.exists()).toEqual(true);
      expect(currentWeather).toHaveStyleRule('flex-basis', '100%');
      expect(currentWeather).toHaveStyleRule('display', 'grid');
      expect(currentWeather).toHaveStyleRule('justify-content', 'center');
      expect(currentWeather).toHaveStyleRule('align-items', 'center');
      expect(currentWeather).toHaveStyleRule('grid-template-columns', 'auto 1fr');
      expect(currentWeather).toHaveStyleRule('margin', '20px 0');
      expect(currentWeather).toHaveStyleRule('grid-gap', '30px');
    });
    test('with <WeatherIcon />', () => {
      const wrapper = shallow(<Result />);
      const currentWeather = wrapper.find(CurrentWeatherWrapper);
      const weatherIcon = currentWeather.find(WeatherIcon);
      expect(weatherIcon.exists()).toEqual(true);
      expect(weatherIcon.find(FontAwesomeIcon).exists()).toEqual(true);
    });
    test('with <TemperatureWrapper />', () => {
      const wrapper = shallow(<Result />);
      const currentWeather = wrapper.find(CurrentWeatherWrapper);
      const temperature = currentWeather.find(TemperatureWrapper);
      expect(temperature.exists()).toEqual(true);
    });
    test('with <Temperature />', () => {
      const wrapper = shallow(<Result />);
      const currentWeather = wrapper.find(CurrentWeatherWrapper);
      const temperatureWrap = currentWeather.find(TemperatureWrapper);
      const temp = temperatureWrap.find(Temperature);
      expect(temp.exists()).toEqual(true);
      expect(temp.text()).toEqual(`${Math.floor(weatherMockData.temp)}°`);
      expect(temp).toHaveStyleRule('display', 'block');
      expect(temp).toHaveStyleRule('font-size', '50px');
      expect(temp).toHaveStyleRule('font-weight', '400');
      expect(temp).toHaveStyleRule('color', '#ffffff');
    });
    test('with <SmallLabel />', () => {
      const wrapper = shallow(<Result />);
      const currentWeather = wrapper.find(CurrentWeatherWrapper);
      const temperatureWrap = currentWeather.find(TemperatureWrapper);
      const smallLabel = temperatureWrap.find(SmallLabel);
      expect(smallLabel.exists()).toEqual(true);
      expect(smallLabel.text()).toEqual(`${weatherMockData.description}`);
    });
  });

  describe('<WeatherDetailsWrapper /> is rendered', () => {
    let renderWeatherDetails;
    beforeEach(() => {
      renderWeatherDetails = jest.fn(x => {});
    });
    test('with style of WeatherDetailsWrapper tag', () => {
      const wrapper = shallow(<Result />);
      const currentWeather = wrapper.find(WeatherDetailsWrapper);
      expect(currentWeather.exists()).toEqual(true);
      expect(currentWeather).toHaveStyleRule('flex-basis', '100%');
      expect(currentWeather).toHaveStyleRule('flex-wrap', 'wrap');
      expect(currentWeather).toHaveStyleRule('padding', '10px 0');
      expect(currentWeather).toHaveStyleRule('margin', '20px 0');
      expect(currentWeather).toHaveStyleRule('background-color', 'rgba(255,255,255,0.2)');
      expect(currentWeather).toHaveStyleRule('border-radius', '10px');
      expect(currentWeather).toHaveStyleRule('align-self', 'flex-start');
    });

    describe('List <WeatherDetailsWrapper /> is rendered', () => {
      let wrapper;
      let currentWeather;
      let details;

      beforeEach(() => {
        wrapper = shallow(<Result />);
        currentWeather = wrapper.find(WeatherDetailsWrapper);
        details = currentWeather.find(WeatherDetail);
      });
      test('having 6 number items', () => {
        expect(details.exists()).toEqual(true);
        expect(details).toHaveLength(6);
        // expect(details).toMatchSnapshot();
      });

      test('First <WeatherDetail /> is rendered with Hight', () => {
        const hightComp = details.at(0);
        expect(hightComp.find(SmallLabel).exists()).toEqual(true);
        expect(hightComp.find(SmallLabel).text()).toEqual(
          `${Math.floor(weatherMockData.highestTemp)}°`,
        );
        expect(hightComp.find(Text).text()).toEqual('Hight');
      });
      test('First <WeatherDetail /> is rendered with Wind', () => {
        const windComp = details.at(1);
        expect(windComp.find(SmallLabel).exists()).toEqual(true);
        expect(windComp.find(SmallLabel).text()).toEqual(`${weatherMockData.wind}mph`);
        expect(windComp.find(Text).text()).toEqual('Wind');
      });
      test('First <WeatherDetail /> is rendered with Sunrise', () => {
        const sunriseComp = details.at(2);
        expect(sunriseComp.find(SmallLabel).exists()).toEqual(true);
        expect(sunriseComp.find(SmallLabel).text()).toEqual(weatherMockData.sunrise);
        expect(sunriseComp.find(Text).text()).toEqual('Sunrise');
      });
      test('First <WeatherDetail /> is rendered with Low', () => {
        const lowComp = details.at(3);
        expect(lowComp.find(SmallLabel).exists()).toEqual(true);
        expect(lowComp.find(SmallLabel).text()).toEqual(
          `${Math.floor(weatherMockData.lowestTemp)}°`,
        );
        expect(lowComp.find(Text).text()).toEqual('Low');
      });
      test('First <WeatherDetail /> is rendered with Rain', () => {
        const rainComp = details.at(4);
        expect(rainComp.find(SmallLabel).exists()).toEqual(true);
        expect(rainComp.find(SmallLabel).text()).toEqual(`${weatherMockData.humidity}%`);
        expect(rainComp.find(Text).text()).toEqual('Rain');
      });
      test('First <WeatherDetail /> is rendered with Sunset', () => {
        const sunsetComp = details.at(5);
        expect(sunsetComp.find(SmallLabel).exists()).toEqual(true);
        expect(sunsetComp.find(SmallLabel).text()).toEqual(weatherMockData.sunset);
        expect(sunsetComp.find(Text).text()).toEqual('Sunset');
      });
    });

    describe('<ForecastWrapper /> is rendered', () => {
      test('with style of CurrentWeatherWrapper tag', () => {
        const wrapper = shallow(<Result />);
        const forecastWrapper = wrapper.find(ForecastWrapper);
        expect(forecastWrapper.exists()).toEqual(true);
        expect(forecastWrapper).toHaveStyleRule('flex-basis', '100%');
        expect(forecastWrapper).toHaveStyleRule('margin', '20px 0');
        expect(forecastWrapper).toHaveStyleRule('overflow', 'hidden');
      });
      test('with <MediumLabel />', () => {
        const wrapper = shallow(<Result />);
        const forecastWrapper = wrapper.find(ForecastWrapper);
        const mediumLabel = forecastWrapper.find(MediumLabel);
        expect(mediumLabel.text()).toEqual('Forecast');
      });
      test('with <Forecast /> styles', () => {
        const wrapper = shallow(<Result />);
        const forecastWrapper = wrapper.find(ForecastWrapper);
        const forecast = forecastWrapper.find(Forecast);
        expect(forecast.exists()).toEqual(true);
        expect(forecast).toHaveStyleRule('position', 'relative');
        expect(forecast).toHaveStyleRule('display', 'flex');
        expect(forecast).toHaveStyleRule('overflow-x', 'scroll');
        expect(forecast).toHaveStyleRule('overflow-y', 'hidden');
        expect(forecast).toHaveStyleRule('scrollbar-color', 'lightgray #ffffff');
        expect(forecast).toHaveStyleRule('scrollbar-width', 'thin');
        expect(forecast).toHaveStyleRule('margin-top', '20px');
        expect(forecast).toHaveStyleRule('padding-bottom', '20px');
        expect(forecast).toHaveStyleRule('margin', '0 auto');
        expect(forecast).toHaveStyleRule('justify-content', 'start');
      });

      test('having 5 number items from current day', () => {
        const wrapper = shallow(<Result />);
        const forecastWrapper = wrapper.find(ForecastWrapper);
        const forecast = forecastWrapper.find(Forecast).find(ForecastDay);
        expect(forecast.exists()).toEqual(true);
        expect(forecast).toHaveLength(5);
      });
    });
  });
});
