// ==UserScript==
// @name		Google Notifications Blocker
// @description		Get rid of the red Google+ notifications button on all Google sites (including YouTube) except Google+ itself. This script is based on imwill's Google+ Notifications Blocker which is defunct as of December 2012.
// @author		eldon
// @grant		none
// @website	
// @license		Public Domain
// @version		0.06

// @include		http://*.google.*/*
// @include		https://*.google.*/*
// @include		http://*.youtube.*/*
// @include		https://*.youtube.*/*
// @exclude		http://plus.google.com/*
// @exclude		https://plus.google.com/*

// @history		0.01 Adapted from imwill's defunct Google+ Notifications Blocker; fixed span id of notification button
// @history		0.02 Fixed including of local google sites (google.de, google.fr, ...)
// @history		0.03 Added youtube as an included site
// @history		0.04 Adapted to new notification button
// @history		0.05 Adapted to new notification button
// @history		0.06 Adapted to new notification button

// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'li.gbt.gbtn {display: none;} div.gb_pa {display: none;} div.gb_qa {display: none;} button#sb-button-notify {display: none;}';
document.documentElement.appendChild(styleEl);