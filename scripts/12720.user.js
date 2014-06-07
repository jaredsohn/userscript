// ==UserScript==
// @name		Gmail Logo Resizer

// @include		http://mail.google.com/*
// @include		https://mail.google.com/*

// ==/UserScript==



// Preferences ( 0 = NO, 1 = YES )

var prefNewLogo         = 1 // Show the new Gmail Logo ?



// Script

if (prefNewLogo==1)
{
	setTimeout("document.images['su_s_l'].src='https://mail.google.com/mail/help/images/logo1.gif'; document.images['su_s_l'].style.height='30px';", 100);
	setTimeout("document.images['su_s_l'].style.heigth='30px';", 100);
}
