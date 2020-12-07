import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import SearchCity, { SearchBar, SearchInput, SearchIcon } from './index';
configure({ adapter: new Adapter() });

describe('<SearchBar /> is rendered', () => {
  let submit;
  let value;
  let change;
  let showResult;

  beforeEach(() => {
    submit = jest.fn();
    value = '';
    change = jest.fn();
    showResult = false;
  });

  test('is rendered', () => {
    const searchComp = renderer
      .create(<SearchCity submit={submit} value={value} change={change} showResult={showResult} />)
      .toJSON();
    expect(searchComp).toMatchSnapshot();
  });

  test('simulate change input', () => {
    const searchCity = shallow(
      <SearchCity submit={submit} value={value} change={change} showResult={showResult} />,
    );
    const searchInput = searchCity.find(SearchInput);
    const event = { target: { value: 'ha noi' } };
    searchInput.simulate('change', event);
    expect(change).toHaveBeenCalled();
  });
  test('simulate submit', () => {
    const searchCity = shallow(
      <SearchCity submit={submit} value={value} change={change} showResult={showResult} />,
    );
    const searchForm = searchCity.find(SearchBar);
    searchForm.simulate('submit');
    expect(submit).toHaveBeenCalled();
  });

  test('with <SearchIcon />', () => {
    const searchCity = shallow(
      <SearchCity submit={submit} value={value} change={change} showResult={showResult} />,
    );
    const searchForm = searchCity.find(SearchBar);
    const searchIcon = searchForm.find(SearchIcon);
    expect(searchIcon.exists()).toBe(true);
  });
});
