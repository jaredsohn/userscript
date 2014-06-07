// ==UserScript==
// @name			ManageFlitter Select All
// @namespace		manageflitter_select_all
// @description		Automatically selects all users by default on every page of ManageFlitter.com
// @match			http://manageflitter.com/*
// @icon			http://cdn2.manageflitter.com/favicon6.png
// @version			20
// @encoding		UTF-8
// ==/UserScript==

// It seems really hard to wait until a variable is visible in Chrome
// This timer approach seems to mostly work. Ideally though this script
// should wait until the unfollow variable exists on the page before
// executing.
var script = "$(unfollow).bind('pageLoaded', unfollow.selectAll);";
script += "unfollow.selectAll();";
window.setTimeout(function() {
	location.href="javascript:(function(){"+script+"})()";
}, 1000);