// ==UserScript==
// @name	Facebook UI Fixer
// @namespace	ui-fix
// @description	This script turns the top frame into a normal page element, increasing usable screen area.
// @version	1
// @include	https://www.facebook.com/*
// @include	http://www.facebook.com/*
// ==/UserScript==

document.getElementById("blueBar").style.cssText = "position:static !important";
