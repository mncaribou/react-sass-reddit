/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var _ = require('underscore');

var Menu = React.createClass({
	shouldComponentUpdate: function(newProps, newState) {

		// hack, expect to load the menu once and never reload

		return this.props.subreddits.length != newProps.subreddits.length;
	},
	componentWillReceiveProps: function(newProps) {

		// when the app state changes, this is cascaded and called before rendering
		// if they clicked on a subreddit after scrolling, make sure it resets

		this.refs.nav.getDOMNode().scrollTop = 0;

	},
	render : function() {
		
		// use underscore to map all subreddits (else empty array) to html
		// links will leverage Director routes in the app.js for navigation

		var sr = _.map(this.props.subreddits || [], function(s) { 
			return (<li key={s.data.id}><a href={'#/r/' + s.data.display_name}><i className="fa fa-chevron-right"></i> {s.data.display_name}</a></li>);
		});
		return (
			<nav ref="nav" className="st-menu">
				<ul>
					{sr}
				</ul>
			</nav>
		);
	}
});

module.exports = Menu;