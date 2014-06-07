// ==UserScript==
// @name           Flightradar Airport Info Box
// @description	   Add some special functions to flightradar page.
// @author         Łukasz Stawiarz
// @namespace      http://userscripts.org/users/290017
// @version        0.1
// @license        LGPL
// @include        http://*.flightradar24.com/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @grant          none
// ==/UserScript==

function removeShit(){
	$('#bottomRightAdContainer').remove();
};

window.setTimeout(removeShit,5000);