// ==UserScript==
// @name Lara's silly Glitch forum redirect
// @description Redirects any request for the general forum to the offtopic forum at Glitch.com
// @include http://glitch.com/forum/general/*
// @include http://*.glitch.com/forum/general/*
// @include http://www.glitch.com/forum/general/*
// @match http://glitch.com/forum/general/*
// @match http://*.glitch.com/forum/general/*
// @match http://www.glitch.com/forum/general/*
// ==/UserScript==

window.location.replace('http://www.glitch.com/forum/offtopic');
