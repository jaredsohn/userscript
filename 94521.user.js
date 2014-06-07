// ==UserScript==
// @name	Change Corkboard Background
// @author	ckintner
// @description	Change the corkboard.me-background and remove the footer-bar
// @include	http://corkboard.me/*
// @version	1.14
// ==/UserScript==

GM_addStyle('.board {background-image: url(http://a3.twimg.com/profile_background_images/3481245/1.jpg) !important;}');
GM_addStyle('.bar { display: none !important;}');
