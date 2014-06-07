// ==UserScript==
// @name           GitHub: Twitter Link
// @namespace      https://github.com/skratchdot/github-twitter-link.user.js
// @description    Adds a twitter link on Github profile pages if a corresponding user name exists at Twitter.
// @include        https://github.com/*
// @match          https://github.com/*
// @run-at         document-end
// @grant          none
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-twitter-link.user.js/raw/master/github-twitter-link.user.js
// @updateURL      https://github.com/skratchdot/github-twitter-link.user.js/raw/master/github-twitter-link.user.js
// @version        1.6
// ==/UserScript==
/*global jQuery */
/*jslint browser: true, unparam: true, plusplus: true */

(function () {
	'use strict';

	var SKRATCHDOT,
		getTwitterLink,
		getTwitterNames,
		init,
		initTwitterSection,
		isCached,
		jsonpTimeout = 2000,
		jsonpTimeoutToken,
		performTwitterUserLookup,
		populateTwitterSection,
		username;

	// Declare a namespace to store functions in
	SKRATCHDOT = window.SKRATCHDOT || {};

	// localStorage wrapper for getting/storing objects
	SKRATCHDOT.getItem = function (key) {
		var value = window.localStorage.getItem(key);
		return JSON.parse(value);
	};

	// localStorage wrapper for getting/storing objects
	SKRATCHDOT.setItem = function (key, value) {
		value = JSON.stringify(value);
		window.localStorage.setItem(key, value);
	};

	// localStorage wrapper for getting/storing objects
	SKRATCHDOT.removeItem = function (key) {
		window.localStorage.removeItem(key);
	};

	// Are we on a profile page?
	SKRATCHDOT.isProfilePage = function () {
		return jQuery('body').hasClass('page-profile');
	};

	// Get current username from Github DOM
	SKRATCHDOT.getUsername = function () {
		return jQuery('.js-username').data('name');
	};

	// Handle user lookup. Will be called via a Twitter JSONP response.
	SKRATCHDOT.handleTwitterUserLookup = function (data) {
		var twitterNames = getTwitterNames(), i = 0, currentUser = {};

		// Clear our timeout token
		clearTimeout(jsonpTimeoutToken);

		// Default to 0 (AKA false - but conserving space)
		twitterNames[username] = 0;

		// Loop through user items. If twitter doesn't return an array, we will error out
		try {
			if (data && data.length) {
				for (i = 0; i < data.length; i++) {
					currentUser = data[i];
					if (currentUser.hasOwnProperty('screen_name') && currentUser.screen_name.toLowerCase() === username.toLowerCase()) {
						twitterNames[username] = 1;
					}
				}
			}
		} catch (err) {}

		SKRATCHDOT.setItem('twitterNames', twitterNames);
		populateTwitterSection();
	};

	// Construct a twitter link as a jQuery object
	getTwitterLink = function () {
		var $link = jQuery('<a />')
			.attr('href', '//twitter.com/' + encodeURIComponent(username))
			.text('@' + username);
		return $link;
	};

	// Prepare our base Twitter HTML. We will fill out the display/user info later
	initTwitterSection = function () {
		var twitterSection = '<dl>' +
			'<dt class="mini-icon">&#9443;</dt>' +
			'<dd>' +
			'<div id="skratchdot-twitter-link"></div>' +
			'<div id="skratchdot-twitter-followers" style="margin-top:5px;"></div>' +
			'</dd>' +
			'</dl>';

		jQuery('.first.vcard .details').append(twitterSection);
	};

	// Make sure our twitterNames object exists in localStorage, and return it
	getTwitterNames = function () {
		var twitterNames = SKRATCHDOT.getItem('twitterNames');
		if (!twitterNames) {
			twitterNames = {};
			SKRATCHDOT.setItem('twitterNames', twitterNames);
		}
		return twitterNames;
	};

	// Is the current username stored in localStorage?
	isCached = function () {
		var twitterNames = getTwitterNames();
		if (twitterNames.hasOwnProperty(username)) {
			return true;
		}
		return false;
	};

	// We can now display Twitter links based on whether or not we think a user has a
	// Twitter account
	populateTwitterSection = function () {
		var twitterNames = getTwitterNames(),
			$iframe,
			$link = getTwitterLink();
		if (twitterNames.hasOwnProperty(username) && twitterNames[username] === 1) {
			// We have a valid twitter account
			$iframe = jQuery('<iframe />')
				.attr('allowtransparency', true)
				.attr('frameborder', 0)
				.attr('scrolling', 'no')
				.attr('style', 'height:20px;')
				.attr('src', '//platform.twitter.com/widgets/follow_button.html?' +
					'show_screen_name=false&show_count=true&screen_name=' +
					encodeURIComponent(username));
			jQuery('#skratchdot-twitter-link').empty().append($link);
			jQuery('#skratchdot-twitter-followers').empty().append($iframe);
		} else {
			// We don't have a valid twitter account
			$link.attr('style', 'margin-left:20px;');
			jQuery('#skratchdot-twitter-link')
				.empty()
				.text('Not found: ')
				.append($link);
		}
	};

	// Perform user lookup
	performTwitterUserLookup = function (data) {
		// Set a timeout, in case our JSONP call fails
		jsonpTimeoutToken = setTimeout(function () {
			SKRATCHDOT.handleTwitterUserLookup([]);
		}, jsonpTimeout);

		// Make our ajax call
		// HACK:
		//        we are always passing in the 'twitter' username, so we don't get 404
		//        responses. jQuery's $.ajax() method doesn't handle JSONP 404's nicely
		jQuery.ajax({
			type : 'GET',
			url : '//api.twitter.com/1/users/lookup.json',
			contentType : 'application/json',
			dataType : 'jsonp',
			jsonpCallback : 'SKRATCHDOT.handleTwitterUserLookup',
			data : {
				screen_name : 'twitter,' + username
			}
		});
	};

	init = function () {
		// Only do something on profile pages
		if (!SKRATCHDOT.isProfilePage()) {
			return;
		}

		// Only do something if localStorage is supported
		if (!window.localStorage) {
			return;
		}

		// Only do something if window.JSON is supported
		if (typeof window.JSON !== 'object' ||
				typeof window.JSON.parse !== 'function' ||
				typeof window.JSON.stringify !== 'function') {
			return;
		}

		// Get the username
		username = SKRATCHDOT.getUsername();

		// Start building our Twitter section
		initTwitterSection();

		// Have we already determined whether or not a user has a twitter account?
		if (isCached()) {
			// If so, immediately add our links (and follow button)
			populateTwitterSection();
		} else {
			// We need to use the REST API to figure out if the user exists at Twitter
			performTwitterUserLookup();
		}
	};

	// onDomReady : setup our page
	jQuery(document).ready(function () {
		jQuery(document).on('pjax:end', function (event) {
			if (jQuery('body.page-profile').length > 0) {
				init();
			}
		});
		init();
	});

	// Give access to SKRATCHDOT (for our JSONP responses)
	window.SKRATCHDOT = SKRATCHDOT;

}());