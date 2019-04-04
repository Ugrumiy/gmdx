import React from "react";
import PropTypes from 'prop-types';

const Demo = props => <h1 style={{color: props.color }}>This is a demo component {props.children}</h1>;

Demo.propTypes = {
  color: PropTypes.string,
};
Demo.defaultProps = {
  color: 'red',
};
export default Demo;
