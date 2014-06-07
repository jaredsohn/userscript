// ==UserScript==
// @name           deviantART Shout Link Adder
// @namespace      http://solitude12.deviantart.com/
// @description    Adds a quick link to the ShoutBox on the deviantBar.
// @include        http://*.deviantart.com/*
// ==/UserScript==

/* 
 * Author: Solitude12
 * Date: May 23rd, 2010/June 21 '10
 * Version: 0.4c
 *
 * Copyright © Solitude12 - http://solitude12.deviantart.com/
 * Please do not redistribute any part of this code without
 * permission of Solitude12.
*/


if (unsafeWindow.deviantART.deviant.loggedIn){
	var mylubimg = "data:image/png;base64,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%3D";
	var shoutlink = document.createElement("span");
	shoutlink.setAttribute("class", "oh-bl shoutlink");
	shoutlink.innerHTML = '<a class="oh-l" href="http://shout.deviantart.com/popup" id="shoutlink" title="ShoutBox!" onclick="return popup(\'http://shout.deviantart.com/popup\', \'shoutbox\', 500, 600);"><i class="icon h-icon i1" style="margin-left:5px;background-image:url('+mylubimg+') !important;"></i> </a>';
	GM_addStyle("#shoutlink:hover .icon,#shoutlink:focus .icon,#shoutlink .active .icon {height:80px;top:-28px;}");
	document.getElementById("overhead-sc").insertBefore(shoutlink, document.getElementById("friendslink").parentNode);	
}