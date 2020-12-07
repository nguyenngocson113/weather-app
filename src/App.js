import React from 'react';
import { Provider } from 'react-redux';
import Weather from 'layout/weather/components';
import createReduxStore from 'store';

const App = () => {
  const store = createReduxStore();

  return (
    <Provider store={store}>
      <Weather />
    </Provider>
  );
};

export default App;
