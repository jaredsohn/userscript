// ==UserScript==
// @name        Cheezeburger Fix

// @namespace   Cheezeburger Sites

// @description Removes top of page clutter

// @include     http://*.cheezburger.com/*

// @grant       none

// ==/UserScript==


var elmDeleted = document.getElementById("js-globalnav-wrap");
	elmDeleted.parentNode.removeChild(elmDeleted);


var elmDeleted = document.getElementById("main-subnav");
	elmDeleted.parentNode.removeChild(elmDeleted);