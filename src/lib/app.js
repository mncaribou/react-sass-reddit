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
		var router = Director.Router({
			'/r/:subreddit' : this.viewSubreddit
		});
		router.init();
		if (!location.hash) this.viewSubreddit('all');

		request.get('http://www.reddit.com/subreddits/popular.json').end(this.loadAllSubreddits);
	},
	componentWillUpdate: function(newProps, newState) {

	},
	viewSubreddit: function(n) {
		this.setState({current: n, menuOpen: false});
		request.get('http://www.reddit.com/r/' + n + '/hot.json').end(this.loadSubreddit);
	},
	loadSubreddit: function(s) {
		this.refs.content.getDOMNode().scrollTop = 0;
		var newCurrentData = s.body.data.children;
		this.setState({ currentData: newCurrentData, currentUID: _.uniqueId() });
	},
	loadAllSubreddits: function(r) {
		var newSubreddits = [{ data: {id:'all',display_name:'all'} }].concat(r.body.data.children);
		this.setState({ subreddits: newSubreddits });
	},
	onMenuToggle: function(e) {
		this.setState({menuOpen:!this.state.menuOpen});
	},
	render: function() {
		var ccs = cs({
			'st-container': true,
			'st-menu-open': this.state.menuOpen,
			'st-effect-8': true
		});
		return (
			<div className={ccs}>
				<Header onMenuToggle={this.onMenuToggle} current={this.state.current}/>
				<div className="st-pusher">
					<Menu subreddits={this.state.subreddits} />
					<div ref="content" className="st-content">
						<div className="st-content-inner"> 
							<Content uid={this.state.currentUID} data={this.state.currentData} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = app;
 