// JavaScript Document
// ==UserScript==
// @name           Ikariam Island Time ("Mobile" version)
// @autor          roselan
// @version        1.6.4
// @downloadURL    https://userscripts.org/scripts/source/133070.user.js
// @updateURL      https://userscripts.org/scripts/source/133070.meta.js
// @icon           http://s3.amazonaws.com/uso_ss/icon/133070/large.jpg?1336770440
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace      ikariamScript
// @description    Display travel times from the current selected city to the island, world and city views.
// @include        http://m*.*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @grant          none
// @require        http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==


$(document).ready(function() {
	$.fn.sortDomElements = (function() {
		return function(comparator) {
			return [].sort.call(this, comparator).each(function(i) {
				this.parentNode.appendChild(this);
			});
		};
	})();
	
	islandTime.init();
});

var islandTime = (function() {

	var activeTown,
		activeCoords,
		targetIsland;

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

	var getCoords = function (city) {
		var myCity = city.replace('(', '[').replace(')', ']').replace(',',':');
		if (myCity.indexOf('[') > -1) myCity = myCity.substring(myCity.indexOf('[') + 1, myCity.indexOf(']'));
		return myCity.split(':');
	};

	var	showTime = function (targetIsland) {
		if ( activeTown && targetIsland ) {
			var targetCoords = getCoords(targetIsland),
				distTime = computeTime(activeCoords, targetCoords),
				$timeToIsland = $('#timeToIsland');
			if ( $timeToIsland.length ) $timeToIsland.text(distTime);
			else $('#breadcrumbs').append('<span>&nbsp;-&nbsp;</span><span id="timeToIsland">'+distTime+'</span>');
		}
	};

	var suffleSpies = function () {
		var $spyCities = $('div.spyinfo');
		$spyCities.each( function () {
			var targetCoords = getCoords(this.textContent.trim());
			this.dataset['time'] = computeTime(activeCoords, targetCoords, true);
			$(this).find('li.city').append('<a> - </a><a>'+computeTime(activeCoords, targetCoords)+'</a>');
		});

		//console.time('sort');
		$spyCities.sortDomElements(function(a,b){
			if (a.dataset['time'] === b.dataset['time']) return 0;
			return a.dataset['time']-0 > b.dataset['time']-0 ? 1 : -1;
		});
		//console.timeEnd('sort');
	};

	var worldTime = function () {

		// DOMSubtreeModified is deprecated !!! T___T
		//islandBread.addEventListener('DOMSubtreeModified', function(){
		//	showTime(this.textContent);
		//},false);

		// so let's play with the new toy in the house ^^
		// ika 0.5 guys will love it to act on ajax dom modifications ;)
		var islandBread = document.getElementById("islandBread"),
			MutationObserver = window.MutationObserver || window.MozMutationObserver, // || window.WebKitMutationObserver // TODO remove prefix when implemented fully by vendor.
			observer = new MutationObserver(function(mutations) {
				//console.log(islandBread.textContent, mutations[0].addedNodes[0].textContent); // they are the same :)
				showTime(islandBread.textContent);
			});

		observer.observe(islandBread, {
			attributes: false,
			childList: true,
			characterData: false
		});

	};

	var init = function() {

		activeTown = $('#changeCityForm li.active').text();
		activeCoords = getCoords(activeTown);
		targetIsland = $('span.island, a.island').text();


		// island and city views
		showTime(targetIsland);

		// spy center
		if ( $('body[id=safehouse]').length ) {
			suffleSpies();
		}

		// world map
		if ( $('#linkMap').length ) {
			worldTime();
		}
	};

	return {
		init: function () {
			init();
		}
	};

})();
