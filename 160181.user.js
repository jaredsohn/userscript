// ==UserScript==
// @name        Remove "Seen At" on Facebook Chat
// @namespace   http://userscripts.org/users/SystemDisc
// @description Removes the grey "Seen At" from the bottom of the FB chat interface
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include     https://*.facebook.com/*
// @include     http://*.facebook.com/*
// @version     1.11
// ==/UserScript==

this.$ = jQuery.noConflict(true); //stop jQuery from breaking the page if it already uses a $ var

$('<style>.-cx-PRIVATE-mercuryTypingIndicator__root { visibility: hidden !important; } .seen { visibility: hidden !important; }</style>').appendTo('body');