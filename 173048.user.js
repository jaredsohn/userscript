// ==UserScript==
// @name        CydiaLinkSwitcher
// @namespace   CLS
// @description Switch cydia:// links to http:// equivalents
// @include     http://apt.thebigboss.org/packagesfordev.php?*
// @include     http://modmyi.com/cydiadevs/*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @grant       none
// ==/UserScript==

"use strict";

$("a").each(function() {				
		var changeHref = $(this).attr("href");
		changeHref = changeHref.replace("cydia://", "http://cydia.saurik.com/");		
		$(this).attr("href", changeHref);
		$(this).attr("target", "_self");		
	});