// ==UserScript==
// @name		  ?.jpg suffix exploit
// @description  Automatically add '?.jpg' suffix at end of URL
// @include	  http://*
// @exclude *?.jpg
// @version       0.1
// ==/UserScript==

var getURL = window.location;
location.replace(getURL + '?.jpg');