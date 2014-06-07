// ==UserScript==
// @name           Github: Fork Count
// @namespace      https://github.com/skratchdot/github-fork-count.user.js
// @description    A user script to display repo counts (public, private, sources, forks, mirrors) where the "public" repo counts used to be.
// @include        https://github.com/*
// @match          https://github.com/*
// @run-at         document-end
// @grant          none
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-fork-count.user.js/raw/master/github-fork-count.user.js
// @updateURL      https://github.com/skratchdot/github-fork-count.user.js/raw/master/github-fork-count.user.js
// @version        1.8
// ==/UserScript==
/*global jQuery */
/*jslint browser: true */

(function () {
	'use strict';

	var init = function () {
		// Initial our variables (and jQuery selectors)
		var countRepos = 0,
			countPublic = 0,
			countPrivate = 0,
			countSources = 0,
			countForks = 0,
			countMirrors = 0,
			repoList = jQuery('ul.js-repo-list > li'),
			stats = jQuery('body.page-profile div.profilecols ul.stats');

		// Loop through all repos, looking for public forks
		repoList.each(function () {
			try {
				var elem = jQuery(this);
				countRepos = countRepos + 1;
				if (elem.hasClass('public')) {
					countPublic = countPublic + 1;
				}
				if (elem.hasClass('private')) {
					countPrivate = countPrivate + 1;
				}
				if (elem.hasClass('source')) {
					countSources = countSources + 1;
				}
				if (elem.hasClass('fork')) {
					countForks = countForks + 1;
				}
				if (elem.hasClass('mirror')) {
					countMirrors = countMirrors + 1;
				}
			} catch (e) {}
		});

		// Display Fork Count (profile page - right column)
		if (stats.length > 0) {
			if (jQuery('li[data-tab="repo"] .tabnav-tab.selected').length > 0) {
				stats.append('<li>' +
						'<span>' + countPublic + ' public, ' +
						countPrivate + ' private, ' +
						countSources + ' sources, ' +
						countForks + ' forks</span>' +
						(countMirrors > 0 ? '<span style="margin:0">' + countMirrors + ' mirrors</span>' : '') +
						'</li>');
			} else {
				stats.append('<li><span>repo counts visible on <a href="?tab=repositories">tab repositories</a></span></li>');
			}
		}
	};

	jQuery(document).ready(function () {
		jQuery(document).on('pjax:end', function (event) {
			if (jQuery('body.page-profile').length > 0) {
				init();
			}
		});
		init();
	});
}());