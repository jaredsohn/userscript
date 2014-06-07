// ==UserScript==
// @name           Remove Rune-server shoutbox gap
// @namespace      ORLY
// @description    This Script Removes the Gap on the left hand side of the shoutbox
// @include        http://www.rune-server.org/*
// ==/UserScript==
Javascript: document.getElementsByTagName('td')[40].width = null; void(0);
Javascript: document.getElementsByTagName('td')[44].width = null; void(0);