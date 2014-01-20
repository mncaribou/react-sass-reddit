/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var _ = require('underscore');
var Director = require('director');
var Menu = require('./menu');
var Header = require('./header');
var Content = require('./content');
var request = require('superagent');
var cs = React.addons.classSet;

var app = React.createClass({
	getInitialState: function() {
		return {
			menuOpen: false,
			subreddits: [],
			current: '',
			currentUID: '',
			currentData: []
		};
	},
	componentDidMount: function() {

		// use Director to handle stateful navigation

		var router = Director.Router({
			'/r/:subreddit' : this.viewSubreddit
		});
		router.init();

		// kick off 'all' if at root-- need better way
		// also need to find a better way to handle closing menu
		// if the selected is the current hash

		if (!location.hash) this.viewSubreddit('all');

		// load all subreddits for the menu

		request.get('http://www.reddit.com/subreddits/popular.json').end(this.loadAllSubreddits);
	},
	componentWillUpdate: function(newProps, newState) {

		// used for pre-render updates

	},
	viewSubreddit: function(n) {

		// clear current state with loading message and close the menu
		// uses a UID to signify state change versus comparing body

		this.setState({current: 'Loading...', menuOpen: false, currentData: [], currentUID: _.uniqueId() });

		// kick off request to load subreddit

		request.get('http://www.reddit.com/r/' + n + '/hot.json').end(this.loadSubreddit.bind(this,n));
	},
	loadSubreddit: function(n,s) {

		// ref from render, used to reposition scroll to top before loading content

		this.refs.content.getDOMNode().scrollTop = 0;

		// load new subreddit data returned from ajax and use UID to signal rendering in content

		var newCurrentData = s.body.data.children;
		this.setState({ current: n, currentData: newCurrentData, currentUID: _.uniqueId() });
	},
	loadAllSubreddits: function(r) {

		// used for loading the menu of popular subreddits, prepending 'all'

		var newSubreddits = [{ data: {id:'all',display_name:'all'} }].concat(r.body.data.children);
		this.setState({ subreddits: newSubreddits });
	},
	onMenuToggle: function(e) {

		// used for opening and closing the menu from the Header

		this.setState({menuOpen:!this.state.menuOpen});
	},
	render: function() {

		// if the menu is open, decorate open state class

		var ccs = cs({
			'st-container': true,
			'st-menu-open': this.state.menuOpen,
			'st-effect-8': true
		});

		// for the main content of the window, should we have a spinner or subreddits to load?

		var display = (this.state.currentData.length > 0)
						? (<Content uid={this.state.currentUID} data={this.state.currentData} />)
						: (<div className="spinner"></div>);

		// render layout, based on codrops sample plus some enhancements
		
		return (
			<div className={ccs}>
				<Header onMenuToggle={this.onMenuToggle} status={this.state.current}/>
				<div className="st-pusher">
					<Menu subreddits={this.state.subreddits} />
					<div ref="content" className="st-content">
						<div className="st-content-inner"> 
							{display}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = app;
 