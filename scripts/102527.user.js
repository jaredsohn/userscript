// ==UserScript==
// @name          Dim Ads for Google Mail
// @description   Dim Ads for Google Mail
// @include       htt*://mail.google.tld/*
// ==/UserScript==

var stylegmailad = document.createElement('style');
stylegmailad.type = 'text/css';
stylegmailad.innerHTML = ' \
.oM > .aWO, .oM > .aWO a, .oM > .aWO span, .oM > .aWM, .oM > .aWM a, .oM > .aWM span \
		{ color:#333 !important; text-decoration:none !important; } \
.oM > .aWO, .oM > .aWM { opacity:.2; } \
';
document.documentElement.appendChild(stylegmailad);