import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore, compose } from 'redux';
import rootReducer from '.';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const createStore = () => reduxCreateStore(
  rootReducer,
  {},
  composeEnhancers(),
);
const ReduxWrapper = ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);
ReduxWrapper.propTypes = {
  element: PropTypes.element,
};
export default ReduxWrapper;
