// ==UserScript==
// @name           Hide insightly on Gmail
// @description    Got stupid administrators that force Insightly down your throat? This script will hide Insightly blocks below emails.
// @namespace      https://userscripts.org/scripts/show/117233
// @updateURL      https://userscripts.org/scripts/source/117233.user.js
// @downloadURL    https://userscripts.org/scripts/source/117233.user.js
// @grant          none
// @version        2011.11.04
// @include        https://mail.google.com/*
// ==/UserScript==

document.getElementsByTagName('head')[0].innerHTML +=
	'<style>.hi{ display: none };</style>';