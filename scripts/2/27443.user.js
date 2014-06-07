// ==UserScript==
// @name          DownloadFFH_ZeroTime
// @namespace     userscripts.org
// @version       1.0
// @description   Download instantly from: http://freefilehosting.ws/ removed the 30second countdown. (More Improvements to be added later on... this is my first script, Thanks to Mikado for your help. In future updates i will be removing ad's and much more)
// @include        http://freefilehosting.ws/file*
// @include        http://freefilehosting.*/file*
// @include        http://freefilehosting.*/file/*
// @include        http://freefilehosting.ws/file/*
// @include        http://freefilehosting.ws/file/*/*
// @include        http://freefilehosting.ws/file/*/*/*
// @include        http://freefilehosting.ws/file/*/*/*/*
// @include        http://freefilehosting.ws/file/*/*/*/*/*

// ==/UserScript==


var removedownloadtime=1



if ( removedownloadtime == 1)
{
	location.assign("javascript:void(timeout=0)");
	location.assign("javascript:void(countdown())");
	location.assign("javascript:void(countdown)");
	
}