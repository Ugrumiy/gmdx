/*eslint-disable*/
import React from 'react';

export default ({ children }) => <div data-gallery>
{
  React.Children.map(children, (item, i) => (
    <div style={{width: '50%'}}>{item}</div>
  ))
}</div>;
