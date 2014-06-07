// ==UserScript==
// @name           Quick dActive Fix
// @namespace      http://solitude12.deviantart.com
// @description    Fixes dActive so that it does not overlap other icons
// @include        http://*.deviantart.com/*
// ==/UserScript==
if (!document.getElementById('minimize_rockdock_icons'))
	if(document.getElementById('shoutlink'))
		if(document.getElementById('birthdaysmenu'))
			GM_addStyle('#top-dActive {right:303px !important;');
		else			
			GM_addStyle('#top-dActive {right:266px !important;');
	else	
		if(document.getElementById('birthdaysmenu'))			
			GM_addStyle('#top-dActive {right:266px !important;');
		else
			GM_addStyle('#top-dActive {right:229px !important;');