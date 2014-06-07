// ==UserScript==
// @name         Youtube Centered
// @namespace    http://userscripts.org/users/zackton
// @description  Center aligns the Youtube page
// @include      *.youtube.com/*
// @include      *.youtube.com/
// @updateURL    http://userscripts.org/scripts/source/153872.meta.js
// @run-at       document-start
// @grant        none
// @version      2.5
// ==/UserScript==

// My precious...
var YC = {};

/**
 * Show two columns for subscriptions, history, social {true, false}
 * Will make those pages wider.
 **/
YC.doublecolumn = false;
YC.doublecolumn_pages = ['watchlater', 'history', 'subscriptions', 'social', 'whattowatch'];

/** 
 * Shift the video page if it doesn't look centered to you {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}
 *   watchshift =  1: 100px left shifted
 *   watchshift =  2:  80px left shifted
 *   watchshift =  3:  60px left shifted
 *   watchshift =  4:  40px left shifted
 *   watchshift =  5:  20px left shifted
 *   watchshift =  6: Standard
 *   watchshift =  7:  20px right shifted
 *   watchshift =  8:  40px right shifted
 *   watchshift =  9:  60px right shifted
 *   watchshift = 10:  80px right shifted
 *   watchshift = 11: 100px right shifted
 **/
YC.watchshift = 6;

/** 
 * Watch page size {1, 2, 3, 4} 
 *   watchsize = 1: 1003px, same as homepage.
 *   watchsize = 2: 1203px, test size.
 *   watchsize = 3: 1403px, test size.
 *   watchsize = 4: 1485px, default size when left aligned on 1920x1280 resolution. 
 * Note: Even if you pick options 1 or 2, the video page elements will still push the content width to around 1305px.
 **/
YC.watchsize = 4;

/**
 * Flex-width page size {1, 2, 3, 4, 5}
 *   flexsize = 1: Page width fixed to 1003px, default Youtube homepage size
 *   flexsize = 2: Page width fixed to 1203px, test size
 *   flexsize = 3: Page width fixed to 1403px, test size
 *   flexsize = 4: Page width fixed to 1485px, default size when left aligned on 1920x1280 resolution. 
 *   flexsize = 5: Page width allowed to expand based on browser width
 **/
YC.flexsize = 5;

/** 
 * Default page size {1, 2, 3, 4}
 *   defaultsize = 1: 1003px, default homepage.
 *   defaultsize = 2: 1203px, test size.
 *   defaultsize = 3: 1403px, test size.
 *   defaultsize = 4: 1485px, video watch page size when left aligned on 1920x1280 resolution. 
 * If YC.doublecolumn is set to TRUE, this will default to 3.
 **/
YC.defaultsize = 1;

/**
 * Parameters for monitoring content width change after page load for flex-width pages
 * Checks once every YC.cmonitor_delay, YC.cmonitor_max times.  
 **/
YC.cmonitor_max = 30;
YC.cmonitor_delay = 100;
YC.cmonitor_count = 0;
YC.cmonitor_width = 0;

/** 
 * Makes the dislike bar red like it used to be.
 * Why? Because red bars are easier to see.
 **/
YC.showdislikebar = true;

// Player width used for monitoring player size changes
YC.playerwidth = 0;

// Size options (0 is just a placeholder to allow human-friendly option choices)
YC.sizeoptions = [0, 1003, 1203, 1403, 1485];

// Shift options for video watch pages
YC.shiftoptions = [0, -100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100];

// Initialize
YC.init = function() {
	// Make sure we're not embedded
	if (window.top !== window.self) {
		return false;
	}
	// Determine page type
	if (window.location.pathname == '/watch') {
		this.pagetype = 'watch';
	}
	else if (window.location.pathname == '/feed/watch_later') {
		this.pagetype = 'watchlater';
	}
	else if (window.location.pathname == '/feed/history') {
		this.pagetype = 'history';
	}
	else if (window.location.pathname == '/feed/subscriptions') {
		this.pagetype = 'subscriptions';
	}
	else if (window.location.pathname == '/feed/what_to_watch') {
		this.pagetype = 'whattowatch';
	}
	else if (window.location.pathname == '/feed/social') {
		this.pagetype = 'social';
	}
	else if (window.location.pathname == '/my_subscriptions') {
		this.pagetype = 'mysubscriptions';
	}
	else {
		this.pagetype = 'default';
	}
	
	// Check for main elements
	this.params = {}
	this.params.flexwidth = document.body.className.indexOf('flex-width-enabled') > -1 ? true : false;
	this.params.guideenabled = document.body.className.indexOf('guide-enabled') > -1 ? true : false;
	this.params.guideexpanded = document.body.className.indexOf('guide-expanded') > -1 ? true : false;
	this.params.sidebarexpanded = document.body.className.indexOf('sidebar-expanded') > -1 ? true : false;   // Video pages (exclusive?)

	this.params.pagecontainer = document.getElementById('page-container') ? true : false;
	this.params.page = document.getElementById('page') ? true : false;
	this.params.guide = document.getElementById('guide') ? true : false;
	this.params.content = document.getElementById('content') ? true : false;
	this.params.masthead = document.getElementById('yt-masthead') ? true : false;
	this.params.subnav = document.getElementById('masthead-subnav') ? true : false;   // Inbox
	this.params.alerts = document.getElementById('alerts') ? true : false;
	this.params.footer = document.getElementById('footer') ? true : false;
	
	//console.log(this.pagetype);
	//console.log(this.params);
	return true;
}

// Center page elements
YC.centerPage = function() {
	// Guide
	if (this.params.guide) {
		document.getElementById('guide').style.width = '175px';
	}
	// Footer
	if (this.params.footer) {
		document.getElementById('footer').style.textAlign = 'center';
	}
	// Add styles to head
	var styles = [{'elem': '#yt-masthead',         'css': '{margin-left:auto !important; margin-right:auto !important; position:relative;}'},
	              {'elem': '#yt-masthead-content', 'css': '{max-width:none;}'},
	              {'elem': '#masthead-subnav',     'css': '{margin-left:auto !important; margin-right:auto !important;}'},
	              {'elem': '#alerts',              'css': '{margin-left:auto !important; margin-right:auto !important;}'},
	              {'elem': '#page',                'css': '{margin-left:auto !important; margin-right:auto !important; position:relative;}'},
	              {'elem': '#baseDiv',             'css': '{margin-left:auto !important; margin-right:auto !important;}'}
	             ];
	var selectors = ['', '.guide-enabled', '.guide-expanded', '.guide-collapsed', '.sidebar-expanded', '.flex-width-enabled'];
	for (var i = 0; i < styles.length; i++) {
		for (var j = 0; j < selectors.length; j++) {
			this.addNewStyle('.site-left-aligned' + selectors[j] + ' ' + styles[i].elem + styles[i].css);
		}
	}
}

// Set widths for page elements
YC.setWidths = function() {
	// If flex-width, wait for page to settle on a size
	if (this.params.flexwidth && this.flexsize == 5) {
		var content_width = parseInt(window.getComputedStyle(document.getElementById('content')).getPropertyValue('width'));
		if ( (this.cmonitor_width !== content_width) && (this.cmonitor_count++ < this.cmonitor_max) ) {
			this.cmonitor_width = content_width;
			setTimeout(function() {
				YC.setWidths();
			}, YC.cmonitor_delay);
			return true;
		}
	}
	
	// Set content width
	if (this.params.flexwidth) {
		if (this.flexsize < 5) {
			// Fixed flex-width
			var content_width = this.params.guide ? this.sizeoptions[this.flexsize] - 180 : this.sizeoptions[this.flexsize];
			document.getElementById('content').style.width = content_width + 'px';
		}
		else {
			// Variable flex-width, do nothing
		}
	}
	else if (this.params.content) {
		if (this.params.sidebarexpanded) {
			// Watch page content width
			var content_width = this.params.guide ? this.sizeoptions[this.watchsize] - 180 : this.sizeoptions[this.watchsize];
		}
		else {
			if (this.doublecolumn && this.doublecolumn_pages.indexOf(this.pagetype) > -1) {
				// Double column width
				var content_width = this.params.guide ? this.sizeoptions[3] - 180 : this.sizeoptions[3];
			}
			else {
				// Standard page content width
				var content_width = this.params.guide ? this.sizeoptions[this.defaultsize] - 180 : this.sizeoptions[this.defaultsize];
			}
		}
		document.getElementById('content').style.width = content_width + 'px';
	}
	

	// Set page and masthead width based on content and guide widths
	var pagewidth = 0;
	pagewidth = this.params.guide ? parseInt(window.getComputedStyle(document.getElementById('guide')).getPropertyValue('width')) : 0;
	pagewidth += this.params.content ? parseInt(window.getComputedStyle(document.getElementById('content')).getPropertyValue('width')) : 0;
	pagewidth += this.pagetype == 'mysubscriptions' ? 1003 : '';
	this.params.page ? document.getElementById('page').style.width = pagewidth + 'px' : '';
	this.params.masthead ? document.getElementById('yt-masthead').style.width = pagewidth + 'px' : '';

	// Fix minor offsets based on page type
	this.fixOffsets();
}

// Fix minor offsets based on page type
YC.fixOffsets = function() {
	switch (this.pagetype) {
		case 'watch':
			// User defined offset
			var usershift = this.shiftoptions[this.watchshift];
			// Page required offset, corresponding to video watch size
			var offsets = [0, -152, -52, 48, 89];
			// Page offset
			document.getElementById('page').style.left = (usershift + offsets[this.watchsize]) + 'px';
			
			// Masthead size and offset (specifically for video pages)
			document.getElementById('yt-masthead').style.width = '1185px';
			document.getElementById('yt-masthead').style.left = (usershift - 13) + 'px';
			
			break;
		case 'subscriptions':
		case 'history':
		case 'watchlater':
			if (this.doublecolumn) {
				// Double column
				this.addNewStyle('.feed-list li.feed-list-item {float:left; display:block; width:475px; padding-top:10px;}');
				this.addNewStyle('.feed-list li.feed-list-item:first-child {padding-top:10px !important;}');
				this.addNewStyle('.feed-list li.feed-list-item:hover {background-color:#f8f8f8;}');
				this.addNewStyle('.feed-list .feed-item-content {height:116px;}');
				this.addNewStyle('.feed-load-more-container {clear:both;}');
			}
			break;
		case 'social':
			if (this.doublecolumn) {
				// Double column
				this.addNewStyle('.feed-list li.feed-list-item {float:left; display:block; width:475px; padding-top:10px;}');
				this.addNewStyle('.feed-list li.feed-list-item:first-child {padding-top:10px !important;}');
				this.addNewStyle('.feed-list li.feed-list-item:hover {background-color:#f8f8f8;}');
				this.addNewStyle('.feed-list .feed-item-main-content {height:84px;}');
				this.addNewStyle('.feed-load-more-container {clear:both;}');
			}
			break;
		case 'whattowatch':
			if (this.doublecolumn) {
				// Double column
				this.addNewStyle('.feed-list li.feed-list-item {float:left; display:block; width:475px; padding-top:10px;}');
				this.addNewStyle('.feed-list li.feed-list-item:first-child {padding-top:10px !important;}');
				this.addNewStyle('.feed-list li.feed-list-item:hover {background-color:#f8f8f8;}');
				this.addNewStyle('.feed-list .feed-item-main {height:155px;}');
				this.addNewStyle('.feed-load-more-container {clear:both;}');
			}
			var els = document.getElementsByClassName('feed-list-item');
			//console.log(els.length);
			for (var i = 0; i < els.length; i++) {
				if (els[i].getElementsByClassName('shelf-wrapper').length) {
					els[i].style.width = '950px';
					els[i].getElementsByClassName('feed-item-main') ? els[i].getElementsByClassName('feed-item-main')[0].style.height = 'auto' : '';
				}
			}
			break;
		case 'default':
			// Nothing for now
			break;
	}
}

// Make the dislike bar red like it used to be
YC.showDislikes = function() {
	var els = document.getElementsByClassName('video-extras-sparkbar-dislikes');
	for (var i = 0; i < els.length; i++) {
		els[i].style.backgroundColor = '#bc281c';
	}
}

// Add css style to head
YC.addNewStyle = function(newStyle) {
	var styleElement = document.getElementById('styles_js');
	if (!styleElement) {
		styleElement = document.createElement('style');
		styleElement.type = 'text/css';
		styleElement.id = 'styles_js';
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	styleElement.appendChild(document.createTextNode(newStyle));
}

// Main
function main() {
	if (YC.init()) {
		YC.centerPage();
		YC.setWidths();
		if (YC.pagetype == 'watch' && YC.showdislikebar) {
			YC.showDislikes();
		}
	}
}

if (window.opera) {
	// Opera's greasemonkey version of addEventListener() breaks try-catch on error, so it must be called first.
	try {
		document.addEventListener('DOMContentLoaded', main(), false)
	}
	catch(err) {
		document.addEventListener('DOMContentLoaded', main, false)
	}
}
else {
	// FF, Chrome
	document.addEventListener('DOMContentLoaded', main, false);
}