
// Cyrket.com Android Search
// (c) 03-2010 by decorator
// Licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License.
// More info: http://creativecommons.org/licenses/by-nc-sa/3.0/

// ==UserScript==
// @name           Cyrket.com Android Search
// @namespace      scripts@decorator
// @description    Automatically changes search on Cyrket.com to only search in Android market.
// @include        http://www.cyrket.com/*
// ==/UserScript==


// Get container div in search form
var target = document.getElementById('container');

// Define new input field to set search to android market
var setmarket = document.createElement('input');
setmarket.setAttribute('name','market');
setmarket.setAttribute('value','android');
setmarket.setAttribute('type','hidden');

// Add new input field
target.appendChild(setmarket);
