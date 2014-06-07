// ==UserScript==
// @name	Instapaper Auto reload
// @version	1.0
// @description Reloads the Instapaper page every 5 minutes.
// @include     http://*.instapaper.com/*
// @copyright 	2009+, Florian Eckerstorfer
// @license	(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

window.setTimeout("location.reload();", 300000);