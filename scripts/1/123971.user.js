// ==UserScript==
// @name           Gmail
// @namespace      http://userscripts.org/users/431643
// @include        https://mail.google.com/*
// ==/UserScript==

// Ad-Remover
GM_addStyle(".mq {display: none;}");

// fix for sneak-peak dialog box buttons to show black icons.
GM_addStyle(".yo .ar8{background: no-repeat url('//ssl.gstatic.com/ui/v1/icons/mail/sprite_black2.png') -84px -20px;}"+
			".yo .ar9{background: no-repeat url('//ssl.gstatic.com/ui/v1/icons/mail/sprite_black2.png') -62px -40px;}");

// expand sneek peak
GM_addStyle("html body div.yo { width: 950px !important; left: 260px !important;}");
//GM_addStyle("html body div.yo .yp { height: 400px !important}");