
// KBT Forum Extension
// version 0.2 BETA!
// 2008-09-08
// Copyright (c) 2008, Fatro
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "KBT Forum Extension", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          	KBT Forum Extension
// @namespace     	http://fatro.net/
// @description   	Enlarge shoutbox
// @include			http://*kbt-project.com/forums.php
// @include			http://*kbt-project.com/chatp.php
// @include			http://*kbt.no-ip.com/forums.php
// @include			http://*kbt.no-ip.com/chatp.php
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(

'#shoutarea {' +
'  width: auto ! important;' +
'  height: 300px ! important;' +
'}');

var iframe = document.getElementsByTagName("iframe");

for(var i = 0; i < iframe.length; i++) {
	if(iframe[i].name == 'shoutshow') {
		iframe[i].width = "1024px";
		iframe[i].height = "580px";
	}
}