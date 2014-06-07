// ==UserScript==
// @name        Remove extra objects from Facebook Inbox
// @namespace   http://userscripts.org/users/SystemDisc
// @description Removes the objects such as the checkbox next the last message (under the name)
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include     https://*.facebook.com/*
// @include     http://*.facebook.com/*
// @version     1.11
// ==/UserScript==

this.$ = jQuery.noConflict(true); //stop jQuery from breaking the page if it already uses a $ var

$('<style>.MercuryRepliedIndicator { visibility: hidden !important; }</style>').appendTo('body');

