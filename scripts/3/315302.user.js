// ==UserScript==
// @name        Wikipedia Mobile to Desktop redirect
// @namespace   CrabbyBlueberry
// @include     http://*.m.wikipedia.org/*
// @version     1
// ==/UserScript==

var newLocation = ''+ window.location;
newLocation = newLocation.replace('m.wikipedia.org','wikipedia.org');

window.location = newLocation;