// JIRA Awesomizer 
// version 0.1 BETA!
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          JIRA Awesomizer v0.1
// @namespace     http://github.com/anutron/jira-awesomizer/tree/master
// @description   Makes JIRA a little less suxxors
// @include       https://jira.*.com/*
// @include       http://jira.*.com/*
// @unwrap
// ==/UserScript==
var injector = function(url) {
	var s = document.createElement('script');
	s.src = url;
	document.getElementsByTagName('head')[0].appendChild(s);
};
injector("http://www.clientcide.com/jira/setup.js");