/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'); 
var _ = require('underscore');

var ContentItem = React.createClass({
	shouldComponentUpdate: function(newProps, newState) {
		return false;
	},
	render: function() {
		return (
			<section><article>{this.props.data.title}</article></section>
		);
	}
});

module.exports = ContentItem;