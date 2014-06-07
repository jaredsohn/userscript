// BlendedJava - userscript to alias :java: on the PA Forums to the emoticon
// 				 :rotate:
// Version 0.1
// August 3rd, 2012
// Created by Chester Husk III
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ----------------------------------------------------------------------------
//
// Will need either Greasemonkey (for Firefox) or TamperMonkey (for Chrome) to
// use this style.
// ----------------------------------------------------------------------------

// ==UserScript==
// @name BlendedJava
// @version 0.1
// @description A simple script to alias :java: on the forums to :rotate:, for teh funnies!
// @include http://forums.penny-arcade.com/*
// ==/UserScript==

debugger;

var messages = document.getElementsByClassName('Message');
for (var i = 0; i < messages.length; ++i)
{
	var message = messages[i];
    if(message.innerHTML.indexOf(':java:') != -1){
        message.innerHTML = message.innerHTML.replace(':java:', ':rotate:');
    }
}