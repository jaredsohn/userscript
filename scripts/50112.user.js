// ==UserScript==
// @name           Mirrorrr It
// @namespace      mirrorrr.appspot.com
// @include        http://*.blogspot.com/*
// @include        https://*.blogspot.com/*
// @exclude        http://mirrorrr.appspot.com/*
// @exclude        https://mirrorrr.appspot.com/*
// ==/UserScript==

location.href = location.href.replace(/^https?:\/\//, 'https://mirrorrr.appspot.com/');