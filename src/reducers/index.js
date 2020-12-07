import { combineReducers } from 'redux';
import dataSources from './data-sources';

export const registerReduces = () => {
  const reducers = {};
  dataSources.forEach(datasource => {
    if (!reducers[datasource.name]) {
      const actionTypeToHandleMap = datasource.handlers.reduce((map, reducer) => {
        if (typeof reducer.type === 'string') {
          map[reducer.type] = reducer.handler;
        } else {
          reducer.type.forEach(type => {
            map[type] = reducer.handler;
          });
        }
        return map;
      }, {});
      reducers[datasource.name] = (state = datasource.initState, action) => {
        const handler = actionTypeToHandleMap[action.type];
        if (handler) {
          return handler(state, action);
        }
        return state;
      };
    }
  });

  return combineReducers(reducers);
};
