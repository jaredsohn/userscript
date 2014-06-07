// Author: Cordazar (contact: cordazar (at) gmail (dot) com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MZ Extended", and click Uninstall.
//
// TODO:
// Update to use jQuery 1.4.x when it works out of the box with GM
//
// ==UserScript==
// @name			MZ Extended
// @namespace		opendia.net
// @description		Modifications for MZ
// @version 		0.1.0
// @history			0.1.0	First release
// @include			http://*.managerzone.se*/*
// @include			http://www.managerzone.com*
// @require			http://userscripts.org/scripts/source/57756.user.js
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require			http://userscripts.org/scripts/source/62718.user.js
// ==/UserScript==
var scriptId = 84358;
var scriptName = "MZ Extended";
var scriptVersion = "0.1.0";
var scriptWright = "Cordazar";
var scriptWrightEmail = "cordazar (at) gmail (dot) com";
ScriptUpdater.check(scriptId, scriptVersion);

	//global variables
	var uW = unsafeWindow;
	var mzSport = uW.ajaxSport;

	//base64 coded images
	var imPNG = 'data:image/png;base64,';
	var image = {
		"btnEco": imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAATdJREFUeNpiZAACFRWVbiBVwsrKyoAP/P79G8bsuXPnTun///8ZGKEG/D9x6TZWTXGVvXD2ovZiMG2hp8oANIARZAATTPLuR+wYBOorilHUIAMWGOPR9384nQ6Tw6YGboCW0C+cBsyf2I9TDTwMGIgEzMzMDH///sUMAzl5BbCkrKwsXlpaRhbFQLgBf/78YZCSkmKIiU3EStvrqYFpkDqsXhATl2B4++Y1w48fPxg4ODgwaJDmZ8+eMQiLiDK8evkC0wt/gSaDFPv4+GClYS74i8sF/PwCDF++fCboAh4eXoaPHz9guuAPHhcQFQYgW0BpHZfNMBqUX0BymGEAjFtkmxMDPFBs3uf9CxIGQHVYXQCKYxDAZTOMhlmG7AJ1IK4BCYIwyIkg+vHjx1hpqAtqoPoYAAIMABFRA+lArB0AAAAAAElFTkSuQmCC',
		"btnPlayed": imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAIAAACp9tltAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAM9JREFUeNqUkj0KhDAQhZ012eiJLPyJgWAtXkDBWqzsbbS38AAWHsADeLd9OLh18sAhvGQ+34RQlmWBmz6BswQRuR7FlyQJGsIwlFKi3vcNs2ma7yul1L7vlOe5R4A0TYUQ8hEY13Vho+s6rKMoYuqyLFQUhQe1qiqmcrLzPLExjiNT1aNpmkhr7XED/2HRjYphYc7zzEHjOEbt+57KsvSgtm3LPI61rivMbduw5qwA13VNxhgP6jAM6FOvMCzM4zjYxN9wOdZaH6r7c/kJMABZIylegb2SZwAAAABJRU5ErkJggg==',
		"bgSoccer": imPNG + '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',
		"bgHockey": imPNG + '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',
	};

	//styling
	var Css = ""+
		" body, #content, #players_iframe {background-color:#ededed !important;}";
	if (mzSport == "hockey") {
		Css += " body {background:#006298 url("+image['bgHockey']+") repeat-x scroll 0 0 !important}";
	} else if (mzSport == "soccer") {
		Css += " body {background:#669900 url("+image['bgSoccer']+") repeat-x scroll 0 0 !important}";
	}
	GM_addStyle(Css);

function functionMain(e) {
	$('#logout_etc div:last a:first').before('<a href="/?p=economy"><img title="Ekonomi" style="border:0;vertical-align:5px;padding-left:3px;" src="'+image['btnEco']+'" /></a>');
	$('#logout_etc div:last a:first').before('<a href="/?p=match&sub=played"><img title="Spelade Matcher" style="border:0;vertical-align:5px;padding-left:3px;" src="'+image['btnPlayed']+'" /></a>');
}
window.addEventListener('load', functionMain, false);

