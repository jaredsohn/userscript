// ==UserScript==
// @name        Facebook Fast TabClose
// @namespace   erosman
// @description Prevent delay due to Facebook running scripts on Tab Close
// @updateURL   https://userscripts.org/scripts/source/153998.meta.js
// @downloadURL https://userscripts.org/scripts/source/153998.user.js
// @include     https://www.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @include     http://www.facebook.com/*
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @grant       none
// @author      erosman
// @version     1
// ==/UserScript==


document.body.setAttribute('onunload',''); 