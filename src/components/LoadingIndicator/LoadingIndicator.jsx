import React from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import './LoadingIndicator.scss';

const LoadingIndicator = () => (
  <div className="example">
    <Spin />
  </div>
);

export default LoadingIndicator;
