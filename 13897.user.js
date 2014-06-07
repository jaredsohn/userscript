// ==UserScript==
// @name           Live Spaces Ad Remover
// @namespace      None
// @include        http://*.spaces.live.com/*
//
// @include        http://mail.live.com/*
// ==/UserScript==
// This script removes the ads in top of any MSN spaces page
//
// Version 1.0
// - It works!!!
// Version 1.0.1
// -Using Firefox under linux there where problems without the final *
// Changelog:
// -changed http://*.spaces.live.com/ to http://*.spaces.live.com/*
// Version 1.1
// -Now it's working also with Hotmail
// Changelog:
// -added scripts and urls to make this script working with hotmail

var toDelete = document.getElementById('AdContainer');
if (toDelete)
	toDelete.parentNode.removeChild(toDelete)
	
var toDelete = document.getElementById('RadAd_Banner');
if (toDelete)
	toDelete.parentNode.removeChild(toDelete)

var toDelete = document.getElementById('dap_header');
if (toDelete)
	toDelete.parentNode.removeChild(toDelete)

//Enjoy!
