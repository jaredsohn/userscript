// ==UserScript==
// @name        Block TheFoundary.com Popup
// @namespace   https://userscripts.org/users/5705
// @description TheFoundary.com (wrongly) pops up a 'Join the Foundary' window that's hard to get rid of. Until now.
// @include     http://shop.thefoundary.com/*
// @include     https://shop.thefoundary.com/*
// @include     http://www.thefoundary.com/*
// @include     https://www.thefoundary.com/*
// @include     http://thefoundary.com/*
// @include     https://thefoundary.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at		document-end
// @version     1
// ==/UserScript==

$( '#nyroModalFull' ).hide();
