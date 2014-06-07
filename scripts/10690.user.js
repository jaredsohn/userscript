// ==UserScript==
// @name		Gmail Logo Changer
// @namespace	
// @description	        Have an individual Gmail
// @include		http://mail.google.com/*
// @include		https://mail.google.com/*

// ==/UserScript==



// Preferences ( 0 = NO, 1 = YES )

var prefNewLogo         = 1 // Show the new Gmail Logo ?



// Script

if (prefNewLogo==1)
{
	setTimeout("document.images['su_s_l'].src='http://services.google.com/images/gmail/logo1.gif';", 100);
}
