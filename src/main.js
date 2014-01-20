'use strict';

var app = require('./lib/app');
var React = require('react'); 
 
React.renderComponent(app(), document.getElementById('reddit'));
