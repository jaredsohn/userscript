// Ed O'Loughlin 2011-02-18
// Released to the public domain.
//
// ==UserScript==
// @name           Delay Timewaster Sites
// @namespace      http://neataudio.com
// @description    Make certain pages invisible for 30 seconds. Based on Gina Trapani's Invisibility Cloak & inspired by the ALT tag on http://xkcd.com/862/
// @version        1.0
// @include        *facebook*
// @include        *youtube*
// @include        *xkcd*
// @include        *dailyshow*
// @include        *news.google.com*
// ==/UserScript==
//

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty;
 

(function () {
	// EDIT THE NEXT LINE TO SET THE HOUR AFTER WHICH SITES SHOULD APPEAR
	// HOURS IN MILITARY TIME, SO 15 = 3PM
	var surf_time_after = 24;
	// END EDIT
	
	var oldBodyStyle;
	var bodyElem;

	var tstamp = new Date();

	if (tstamp.getHours() < surf_time_after )
	{
		bodyElem = (document.getElementsByTagName("body")[0]);
		oldBodyStyle = bodyElem.getAttribute('style');
		bodyElem.setAttribute('style', 'display:none!important');
		setTimeout(__bind(function(){bodyElem.setAttribute('style',oldBodyStyle)}, this),30000);
	}
})();