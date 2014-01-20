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

		// cheat idea to have the parent propagate a new UID to signify state change
		// versus trying to compare all the data passed

		return this.props.uid !== newProps.uid;
	},
	render: function() {
		
		// use underscore to map all of the content (else empty array) to ContentItem components
		// use the react 'key' attribute here so it can do its magic

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