/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'); 
var ContentItem = require('./contentItem'); 
var _ = require('underscore');
var ReactTransitionGroup = React.addons.TransitionGroup;

var Content = React.createClass({
	shouldComponentUpdate: function(newProps, newState) {
		return this.props.uid !== newProps.uid;
	},
	render: function() {
		console.log('content render');
		var cr = _.map(this.props.data || [], function(r) {
			return (<ContentItem key={r.data.id} data={r.data}/>);
		});
		
		return (
			<div className='st-cols group'>
				{cr}
			</div>
		);
	}
});

module.exports = Content;