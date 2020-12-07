import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import NotFound from './index';

configure({ adapter: new Adapter() });
describe('<NotFound /> component', () => {
  let notFound;
  beforeEach(() => {
    notFound = renderer.create(<NotFound />).toJSON();
  });
  test('is rendered', () => {
    expect(notFound).toMatchSnapshot();
  });
});
