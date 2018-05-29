import React                from 'react';
import ReactDOM             from 'react-dom';
import {Routes}           from './routes/Routes.js';
// import FastClick from 'fastclick';
import Ep from 'es6-promise';
import 'isomorphic-fetch';
import 'babel-polyfill';
import $ from 'webpack-zepto';

import '../assets/c2p.js';
// import 'swiper';

//以UI图宽度为准初始化rem
Ep.polyfill();
// hijacking()

const ELEMENT_ROOT = 'root';
const RootElement = document.getElementById(ELEMENT_ROOT);

ReactDOM.render(<Routes />, RootElement);

