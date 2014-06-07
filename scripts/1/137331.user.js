// coding: utf-8
// ==UserScript==
// @name          HoW fix 1
// @namespace     
// @description   Fixes the hero selector glitch.
// @version       1.0
// @include       http://www.playflyfish.com/heroofwar/*
// @include       http://www.playflyfish.com/heroofwar_hu/*
// @include       http://m.heronow.com/heroofwar/*
// @include       https://m.heronow.com/heroofwar/*
// @include       http://m.heronow.com/heroofwar_hu/*
// @include       https://m.heronow.com/heroofwar_hu/*
// ==/UserScript==

GM_addStyle('.hero_info2 LI .pic img {padding : 3px !important; background : url(http://imgcache.heronow.com/hero2web/css/img/hero/heroimg2.png) -1px -1px no-repeat !important;}');
GM_addStyle('.hero_info2 {width: 100px;}');
GM_addStyle('.hero_info2 LI {width : 100px !important;}');