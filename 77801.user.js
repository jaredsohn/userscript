// ==UserScript==
// @name           Remove StumbleUpon bar
// @author         Aaron Bassett
// @namespace      http://aaronbassett.com/
// @version        1.0
// @description    Removes SU bar, and sends you to linked page
// @include        http://*stumbleupon.com/su/*
// ==/UserScript==

window.location = document.getElementById('stumbleFrame').src;