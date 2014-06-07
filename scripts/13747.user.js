// mypornmotion.com private beta access
// version 0.1
// 2007-11-10
// Copyright (c) 2007, smulgf
//
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
// select "linkk.it", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          mypornmotion.com private beta access
// @namespace     http://mypornmotion.com/
// @description   access the porn website mypornmotion without restriction!
// @include       *.mypornmotion.com/*
// ==/UserScript==

(function() {
	var body = document.getElementsByTagName('body');
	body = body[0];
	var beta = document.getElementById('BetaPrive');
	var disabler = document.getElementById('DisableSite');
	body.removeChild(beta);
	body.removeChild(disabler);
})();

//
// ChangeLog
// 2007-11-10 - 0.1 - initial release
//