// ==UserScript==
// @name           GitHub: Repo-Filter Info
// @namespace      https://github.com/skratchdot/github-repo-filter-info.user.js
// @description    A user script to display some additional info below the repository filter on a user's main GitHub page.
// @include        https://github.com/*
// @match          https://github.com/*
// @require        https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/d3.ay-pie-chart.js
// @run-at         document-end
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/github-repo-filter-info.user.js
// @updateURL      https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/github-repo-filter-info.user.js
// @version        2.3
// ==/UserScript==
/*global jQuery, ay */
/*jslint browser: true, unparam: true, plusplus: true, nomen: true */

(function () {
	'use strict';

	// Declare a namespace to store functions in
	var SKRATCHDOT = window.SKRATCHDOT || {},
		chartData = [],
		colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
			'#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5'],
		init;

	// This will store jQuery object for the div we are injecting info into
	SKRATCHDOT.onRepoFilterDiv = null;

	// We want to allow a delay before displaying "filter info"
	// (to accommodate typing in the filter input box)
	SKRATCHDOT.onRepoFilterTimeout = null;

	SKRATCHDOT.repoFilterIsExpanded = function () {
		return SKRATCHDOT.onRepoFilterDiv.find('.show-hide:visible').length > 0;
	};

	SKRATCHDOT.repoFilterBuildChart = function () {
		var $container = SKRATCHDOT.onRepoFilterDiv.find('.chart');
		if (SKRATCHDOT.repoFilterIsExpanded() && $container.find('svg').length === 0) {
			$container.append('<svg class="skratchdot-language-chart"></svg>');
			if ('undefined' !== typeof ay) {
				ay.pie_chart('skratchdot-language-chart', chartData, { group_data: 0 });
			}
		}
	};

	// The function that will be called on all filter events
	SKRATCHDOT.onRepoFilter = function () {
		// the delay in milliseconds before showing the filter info
		var delay = 100;

		// if this function was called before delay time, wait a little bit longer
		window.clearTimeout(SKRATCHDOT.onRepoFilterTimeout);

		// show filter info (after delay)
		SKRATCHDOT.onRepoFilterTimeout = window.setTimeout(function () {
			var i = 0, othersCount = 0,
				total = 0, forks = 0, starred = 0,
				languageHash = {}, languageArray = [], languageName = '', language = {};

			// Initialize Chart Data
			chartData = [];

			// Calculate counts
			jQuery('ul.js-repo-list > li:visible').each(function (i) {
				var elem = jQuery(this), languageName, forkCount, stargazerCount;
				// Do nothing if we are looking at an invalid <li />
				if (elem.find('ul.repo-stats').length === 0) {
					return;
				}
				forkCount = parseInt(elem.find('li.forks a').text().replace(',', ''), 10);
				stargazerCount = parseInt(elem.find('li.stargazers a, li.watchers a').text().replace(',', ''), 10);
				total = total + 1;
				forks += forkCount;
				starred += stargazerCount;
				languageName = elem.find('li:first').not('.forks, .stargazers, .watchers').text();
				if (languageName === '') {
					languageName = 'Unknown';
				}
				if (!languageHash.hasOwnProperty(languageName)) {
					languageHash[languageName] = {
						name : languageName,
						count : 0,
						forks : 0,
						starred : 0
					};
				}
				languageHash[languageName].count = languageHash[languageName].count + 1;
				languageHash[languageName].forks = languageHash[languageName].forks + forkCount;
				languageHash[languageName].starred = languageHash[languageName].starred + stargazerCount;
			});

			// Display counts
			SKRATCHDOT.onRepoFilterDiv.find('.left').html('Now Showing <b>' + total + '</b> Repos');
			SKRATCHDOT.onRepoFilterDiv.find('.skratchdot-count-forks').text(forks);
			SKRATCHDOT.onRepoFilterDiv.find('.skratchdot-count-starred').text(starred);
			SKRATCHDOT.onRepoFilterDiv.find('table tbody').empty();
			SKRATCHDOT.onRepoFilterDiv.find('.chart').empty();

			// Convert to array
			for (languageName in languageHash) {
				if (languageHash.hasOwnProperty(languageName)) {
					languageArray.push(languageHash[languageName]);
				}
			}

			// Sort Array
			languageArray.sort(function (a, b) {
				return b.count - a.count || a.name > b.name;
			});

			// Show languages
			for (i = 0; i < languageArray.length; i++) {
				language = languageArray[i];
				SKRATCHDOT.onRepoFilterDiv.find('table tbody').append('<tr>' +
					'<td align="right">' + language.name + '</td>' +
					'<td align="center"><div class="color-chip color-g-' + Math.min(colors.length, i + 1) + '">&nbsp;</div></td>' +
					'<td align="center">' +
					((language.count / total) * 100).toFixed(2) + ' %' +
					'</td>' +
					'<td align="center">' + language.count + '</td>' +
					'<td align="center">' + language.starred + '</td>' +
					'<td align="center">' + language.forks + '</td>' +
					'</tr>');

				if (i < colors.length - 1) {
					chartData.push({
						index: i + 1,
						name: language.name,
						value: language.count
					});
				} else if (i !== 0) {
					othersCount += language.count;
				}
			}

			// Add "Others" to chartData
			if (othersCount > 0) {
				chartData.push({
					index: colors.length,
					name: 'Other',
					value: othersCount
				});
			}

			// Build Chart
			SKRATCHDOT.repoFilterBuildChart();
		}, delay);
	};

	init = function () {
		var i, colorNum, cssRule = '';

		// Create some styles
		cssRule += '<style type="text/css">';
		cssRule += '#skratchdotOnRepoFilterDiv .show-hide { display: none; }';
		cssRule += '#skratchdotOnRepoFilterDiv th, #skratchdotOnRepoFilterDiv td { padding-right: 10px; }';
		cssRule += '#skratchdotOnRepoFilterDiv .chart { width: 300px; height: 300px; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }';
		cssRule += '#skratchdotOnRepoFilterDiv svg { width: 100%; height: 100%; }';
		cssRule += '#skratchdotOnRepoFilterDiv .color-chip { border: 1px solid #000; width: 10px; height: 10px; }';
		for (i = 0; i < colors.length; i++) {
			colorNum = Math.min(colors.length, i + 1);
			cssRule += '#skratchdotOnRepoFilterDiv path.g-' + colorNum + ' { fill:' + colors[i] + '; }';
			cssRule += '#skratchdotOnRepoFilterDiv .color-g-' + colorNum + ' { background-color:' + colors[i] + '; }';
		}
		cssRule += '#skratchdotOnRepoFilterDiv svg > g.label { text-anchor: middle; }';
		cssRule += '#skratchdotOnRepoFilterDiv svg > g.labels g.label { -moz-pointer-events: none; -webkit-pointer-events: none; -o-pointer-events: none; pointer-events: none; }';
		cssRule += '#skratchdotOnRepoFilterDiv svg > g.labels g.label rect { stroke: none; fill: #fff; fill-opacity: .5; shape-rendering: crispEdges; }';
		cssRule += '#skratchdotOnRepoFilterDiv svg > g.labels g.label text { font-size: 12px; text-anchor: left; }';
		cssRule += '#skratchdotOnRepoFilterDiv svg > g.labels g.label.active rect { fill-opacity: 1; }';
		cssRule += '</style>';
		jQuery('head').append(cssRule);

		// Create our information div
		jQuery('div.js-repo-filter .filter-bar').after(
			jQuery('<div></div>')
				.attr('id', 'skratchdotOnRepoFilterDiv')
				.css('background', 'none repeat scroll 0 0 #FAFAFB')
				.css('border', '1px solid #DDDDDD')
				.css('border-radius', '4px 4px 4px 4px')
				.css('margin-bottom', '10px')
				.css('padding', '10px')
				.css('text-align', 'center')
				.append('<div class="left" />')
				.append('<div class="right">' +
					'<a class="skratchdot-languages" href="javascript:void(0)" style="font-size:.8em;padding:5px;">show languages</a>' +
					'<span class="mini-icon mini-icon-star"></span>' +
					'<span class="skratchdot-count-starred" style="padding:0px 5px;"></span>' +
					'<span class="mini-icon mini-icon-fork"></span>' +
					'<span class="skratchdot-count-forks" style="padding:0px 5px;"></span>' +
					'</div>')
				.append('<div class="show-hide" style="clear:both;">' +
					'<div style="float:left;">' +
					'<div class="chart"></div>' +
					'</div>' +
					'<div style="float:right;">' +
					'<table><thead><tr>' +
					'<th>Language</th>' +
					'<th>&nbsp;</th>' +
					'<th>Usage</th>' +
					'<th>Repos</th>' +
					'<th>Starred</th>' +
					'<th>Forks</th>' +
					'</tr></thead><tbody></tbody></table>' +
					'</div>' +
					'</div>')
				.append('<div class="clear" />')
		);

		// Store a reference to our information div
		SKRATCHDOT.onRepoFilterDiv = jQuery('#skratchdotOnRepoFilterDiv');

		// Attach a click event to show/hide language usage
		SKRATCHDOT.onRepoFilterDiv.click(function (e) {
			e.preventDefault();
			if (SKRATCHDOT.repoFilterIsExpanded()) {
				SKRATCHDOT.onRepoFilterDiv.find('.skratchdot-languages').text('show languages');
				SKRATCHDOT.onRepoFilterDiv.find('.show-hide').hide();
			} else {
				SKRATCHDOT.onRepoFilterDiv.find('.skratchdot-languages').text('hide languages');
				SKRATCHDOT.onRepoFilterDiv.find('.show-hide').show();
				SKRATCHDOT.repoFilterBuildChart();
			}
		});

		// After every event in filter-bar, call SKRATCHDOT.onRepoFilter();
		jQuery('.filter-bar').find('*').each(function (i) {
			// NOTE: this is undocumented. Should move to $.Event().
			// $.data('events') was removed in jQuery 1.8
			// see: http://blog.jquery.com/2011/11/08/building-a-slimmer-jquery/
			// see: https://github.com/jquery/jquery/commit/24e416dca36df4b182a612dba37f8b6cdaa25916
			var events = jQuery._data(this, 'events');
			if ('undefined' !== typeof events) {
				jQuery.each(events, function (j, eventList) {
					jQuery.each(eventList, function (k, event) {
						if (event.type === 'click' || event.type === 'keyup') {
							var original = event.handler;
							event.handler = function () {
								var result = original.apply(this, arguments);
								SKRATCHDOT.onRepoFilter();
								return result;
							};
						}
					});
				});
			}
		});

		// Simulate a filter event to "initially populate" the info div
		SKRATCHDOT.onRepoFilter();
	};

	// onDomReady : setup our page
	jQuery(document).ready(function () {
		jQuery(document).on('pjax:end', function (event) {
			if (jQuery(event.relatedTarget).parents('li[data-tab="repo"]').length > 0) {
				init();
			}
		});
		init();
	});
}());