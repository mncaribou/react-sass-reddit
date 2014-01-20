/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var _ = require('underscore');

var Menu = React.createClass({
	shouldComponentUpdate: function(newProps, newState) {
		return this.props.subreddits.length != newProps.subreddits.length;
	},
	componentWillReceiveProps: function(newProps) {
		this.refs.nav.getDOMNode().scrollTop = 0;
	},
	render : function() {
		console.log('Menu Has[' + this.props.subreddits.length + ']');
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