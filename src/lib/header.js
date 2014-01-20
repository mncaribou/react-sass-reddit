/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Header = React.createClass({
	render: function() {

		// use awesome font to render header
		return (
			<header>
				<h2 onClick={this.props.onMenuToggle}><i className="st-toggle fa fa-bars"></i> Hello Reddit <i className='fa fa-caret-right'></i> <span>{this.props.status}</span></h2>
			</header>
		);
	}
});

module.exports = Header;