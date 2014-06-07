// Mail Tribune Pay Wall Bypass
// version 1.1
//
// syn4xe <syn4xe@syn4xe.org>
//
// Released into the public domain.
//
// --------------------------------------------------------------------
//
// This is a user script; to install and use, you will need to install
// either Google Chrome or Mozilla Firefox with the Greasemonkey plugin
// at http://greasemonkey.mozdev.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		Mail Tribune Pay Wall Bypass
// @namespace		http://userscripts.org/users/syn4xe
// @description		Bypass pay wall for mailtribune.com and dailytidings.com
// @include		http://mailtribune.com/*
// @include		http://www.mailtribune.com/*
// @include		http://dailytidings.com/*
// @include		http://www.dailytidings.com/*
// @version		1.1
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Revision history:
//
// v1.1 (2012-02-03)
//  Chrome compatible.  No longer using 'unsafeWindow'.
//
// v1.0 (2010-10-22)
//  Initial release.
//
// --------------------------------------------------------------------
//

function main() {
	window.doWall = function() {/* kthxbye */};
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
