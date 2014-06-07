// ==UserScript==
// @name          Customize Netvibes Reader
// @namespace     http://userscripts.org/users/fredp42
// @description   Customize Netvibes Reader View
// @version       1.0
// @license       Public Doamin
// @include       http://www.netvibes.com/*
// @grant         none
// ==/UserScript==


var container = document.getElementById('smartreader-feeds-container');
var main = document.getElementById('smartreader-feeds-main');
var footer = document.getElementById('smartreader-feeds-footer');
container.insertBefore(footer, main);
