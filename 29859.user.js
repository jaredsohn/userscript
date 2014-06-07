// ==UserScript==
// @name           Minimize Rockdock Icons
// @namespace      http://solitude12.deviantart.com
// @description    Shortens the width of icons in the deviantART Rock Dock
// @include        http://*.deviantart.com/*
// ==/UserScript==

/* 
 * Author: Solitude12
 * Date: November 10th, 2008
 * Version: 0.1b
 *
 * Copyright © Solitude12 - http://solitude12.deviantart.com/
 * Please do not redistribute any part of this code without
 * permission of Solitude12.
*/

var span = document.createElement("span");
span.setAttribute("id", "minimize_rockdock_icons");
document.getElementById('logindock').appendChild(span);
if (window.location.href.indexOf('http://chat.deviantart.com/chat/')>=0){
	GM_addStyle('#friendslink {font-size:0 !important; font-color:transparent !important;}');
	GM_addStyle("#logindock span.friendsmenu {padding-right:36px !important;right:38px !important;}");//104,101
	GM_addStyle('#logindock span.collectmenu { padding-right:42px !important;}');
	GM_addStyle('#collectlink {font-size:0 !important; font-color:transparent !important;}');
} else {
 	GM_addStyle('#friendslink {font-size:0 !important; font-color:transparent !important;}');
	GM_addStyle("#logindock span.friendsmenu {padding-right:36px !important;right:38px !important;}");//104,101
	GM_addStyle('#logindock span.collectmenu { padding-right:42px !important;}');
	GM_addStyle('#collectlink {font-size:0 !important; font-color:transparent !important;}');
}

