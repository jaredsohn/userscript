// ==UserScript==
// @name            UH Wired/Wireless Vernier/RLH Auto-Login
// @description     Automatically logins in to Vernier/RLH on UH wired/wireless if Firefox remembers your password.
// @include         https://vernier-cs-*.cc.e.uh.edu/
// @include         https://vernier-cs-1.cc.e.uh.edu/*
// @include         https://rlhlogon.e.uh.edu/logon*
// ==/UserScript==
// Version: 1.1.0
// Date Created: 3/23/2007 9:15PM
// Date Modified: 4/14/2007 10:45PM
// Configured for the University of Houston's Wired/Wireless Login, Vernier/RLH
// Created by Kaleb Fulgham
// Website - http://www.kalebdf.com
// Based off of Henrik Nyh's My eBay autologin script <http://www.userscripts.com/scripts/show/1766>

var timer = 1000;

var form = document.forms.namedItem('logonForm');
var uid = form.elements.namedItem('username');
var pw = form.elements.namedItem('password');
var realButton = form.elements.namedItem('logon_action');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		if(realButton){
		     realButton.click();
		} else {
		     form.submit();
		}
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();