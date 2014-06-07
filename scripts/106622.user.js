// ==UserScript==
// @name		Google+ Notifications Blocker
// @description	Get rid of Google+ notifications in all Google Apps except Google+.
// @author		imwill

// @website		http://imwill.com
// @license		Creative Commons Attribution 3.0 Unported License http://creativecommons.org/licenses/by/3.0/
// @version		0.01

// @include		http://*.google.com/*
// @include		https://*.google.com/*
// @exclude		http://plus.google.com/*
// @exclude		https://plus.google.com/*

// @history		0.01 Initial release

// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'span#gbgs1.gbts{display: none;}';
document.documentElement.appendChild(styleEl);