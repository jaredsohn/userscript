// ==UserScript==
// @name           Payeeme
// @namespace      payeeme
// @description Auto refresh script for payee.me PTA site. This script have random interval 15-30 second for refresh.
// @author      unixash
// @date        2009-03-19
// @version     1.0

// @include        http://www.payee.me/?main=surf
// @include        http://payee.me/?main=surf

// ==/UserScript==




var lowerBound = 15;
var upperBound = 30;	
var randNum = Math.floor((upperBound-lowerBound+1)*Math.random()+lowerBound) * 1000;
window.setTimeout("document.location.reload();",randNum);

