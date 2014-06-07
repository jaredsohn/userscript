// JavaScript Document
// ==UserScript==
// @name           Ikariam Island Time
// @autor          roselan
// @version        2.0.5
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace      ikariamScript
// @description    Display travel times from the current selected city to the island, world and city views.
// @downloadURL    https://userscripts.org/scripts/source/89174.user.js
// @updateURL      https://userscripts.org/scripts/source/89174.meta.js
// @icon           http://s3.amazonaws.com/uso_ss/icon/133070/large.jpg?1336770440
// @include        http://s*.*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @grant          none
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==


$(document).ready(function() {
	islandTime.init();
});

var islandTime = (function() {

	//http://roselan.github.com/jquery-observe-plugin
	(function( $ ){

		$.fn.observe = function( callback, options ) {

			var settings = $.extend( {
					attributes: true,
					childList: true,
					characterData: true
				},
				options );

			return this.each(function() {
				var self = this,
					observer,
					MutationObserver =  window.MutationObserver ||
										window.WebKitMutationObserver ||
										window.MozMutationObserver;

				if (MutationObserver && callback) {
					observer = new MutationObserver(function(mutations) {
						callback.call(self, mutations);
					});

					try {
						observer.observe(this, settings);
					} catch (e) {console.log(e);}
				}
			});
		};
	})( jQuery );

	(function( $ ){
		$.fn.sortDomElements = (function() {
			return function(comparator) {
				return [].sort.call(this, comparator).each(function(i) {
						this.parentNode.appendChild(this);
				});
			};
		})();
	})( jQuery );


	var activeIsland,
		$breadcrumbs,
		$safeHouse,
		$worldMap;

	var secondsToHms = function (d) {
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor(d % 3600 / 60);
		var s = Math.floor(d % 3600 % 60);
		return ((h > 0 ? h + ':' : '00:') + (m > 0 ? (h > 0 && m < 10 ? '0' : '') + m + ':' : '00:') + (s < 10 ? '0' : '') + s);
	};

	var computeTime = function (from, to, unformated) {
		var distMins = (from[0] == to[0] && from[1] == to[1]) ? 10 : Math.sqrt(Math.pow(Math.abs(from[0]-to[0]), 2) + Math.pow(Math.abs(from[1]-to[1]), 2))*20;
		return unformated ? distMins*60 : secondsToHms(distMins*60);
	};

	var getActiveIsland = function () {
		var data = unsafeWindow.dataSetForView.relatedCityData,
			island = $('#js_citySelectContainer button').last().text() || data[data.selectedCity].coords;

		return island;
	};

	var getCoords = function (city) {
		var myCity = city.replace('(', '[').replace(')', ']').replace(',',':');
		if (myCity.indexOf('[') > -1) myCity = myCity.substring(myCity.indexOf('[') + 1, myCity.indexOf(']'));
		return myCity.split(':');
	};

	// ** main "setter" function **
	var	showTime = function (targetIsland) {
		//console.log(activeIsland, targetIsland, getCoords(activeIsland), getCoords(targetIsland));
		if ( activeIsland && targetIsland ) {
			var targetCoords = getCoords(targetIsland),
				distTime = computeTime(getCoords(activeIsland), targetCoords),
				$timeToIsland = $('#timeToIsland');
			if ( $timeToIsland.length ) $timeToIsland.text(distTime);
			else $breadcrumbs.append('<span>&nbsp;-&nbsp;</span><span id="timeToIsland">'+distTime+'</span>');
		}
	};

	// ** add time to each spy in spyhouse, and sort them by distance time **
	var suffleSpies = function () {
		var $spyCities = $('div.spyinfo');
		$spyCities.each( function () {
			var activeCoords = getCoords(activeIsland),
				targetCoords = getCoords(this.textContent.trim());

			this.dataset['time'] = computeTime(activeCoords, targetCoords, true);
			$(this).find('li.city').append('<a> - </a><a>'+computeTime(activeCoords, targetCoords)+'</a>');
		});

		//$spyCities.sortElements(function(a,b){ return a.dataset['time'] > b.dataset['time'] ? 1 : -1; });
		$spyCities.sortDomElements(function(a,b){
			if (a.dataset['time'] === b.dataset['time']) return 0;
			return a.dataset['time']-0 > b.dataset['time']-0 ? 1 : -1;
		});
	};

	var handleSpiesWindow = function () {
		var $safeHouse = $('#tabSafehouse');
		//console.log('observed', $safeHouse.length, $safeHouse.data('shuffled'));
		if ( $safeHouse.length ) {
			if ( !$safeHouse.data('shuffled') ) {
				suffleSpies();
				$safeHouse.data('shuffled', true);
			}
		}
	};

	var init = function() {

		activeIsland =  getActiveIsland();  //$('#changeCityForm li.active').text();
		$breadcrumbs = $('#js_islandBread'); // $('#breadcrumbs')
		$safeHouse = $("#tabSafehouse div.spyinfo"); // $('body[id=safehouse]')
		$worldMap = $('#worldmap'); // $('#linkMap')

		var $target = $('#js_islandBreadCoords'),
			targetIsland = $target.text(); //$('span.island, a.island').text();

		// show time on load of new pages
		showTime(targetIsland);

		// handle self city change
		$('#js_citySelectContainer').observe(function (m) {
			var newIsland = getActiveIsland();
			if ( activeIsland != newIsland ) {
				activeIsland = newIsland;
				if (!$worldMap.length) targetIsland =  $target.text(); // if cityView, target is itself;
				showTime(targetIsland);
				handleSpiesWindow();
			}
		},
		{	attributes: false,
			childList: true,
			characterData: true
		});

		// when the city changes, the breadcrumbs (target) is updated by ajax (with a delay), hence
		// recompute time when it changes.
		$target.observe(function () {
			targetIsland = $target.text();
			showTime(targetIsland);
		});

		// island and world map
		if ( $worldMap.length ) {
			// change with "direct" links (like from a report)
			$breadcrumbs.observe(function () {
				showTime(this.textContent)();
			},
			{	attributes: false,
				childList: false,
				characterData: true
			});

			// mouseover island tile.
			$worldMap.on('mouseenter', 'div.islandTile', function () {
				if ( targetIsland != this.title ) {
					targetIsland = this.title;
					$('#js_islandBreadName').text(this.title.split(' ')[0]);
					$target.text(this.title.split(' ')[1]);
					showTime(targetIsland);
				}
			});

		}

		// spy center
		// problem1: the page changes alone on a regular basis
		// problem2: when it changes to itself (if you reclick the alreadyopen sypcenter), no change fires.
		$('#container').observe(function () {
			handleSpiesWindow();
		},
		{	attributes: false,
			childList: true,
			characterData: true
		});

	};

	return {
		init: function () {
			init();
		}
	};

})();
