// ==UserScript==
// @name           DIY Your Gmail Logo
// @namespace      blueiris4
// @description    change gmail logo
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

logoimg = document.getElementsByName("su_s_l");
logoimg[0].src = "http://blueiris4.googlepages.com/gmaillogo.gif";