import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { registerReduces } from 'reducers';
const createReduxStore = () => {
  return createStore(registerReduces(), applyMiddleware(thunk));
};

export default createReduxStore;
