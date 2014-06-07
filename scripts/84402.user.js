// ==UserScript==
// @name Carbo
// @namespace IrRox
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource forum http://img828.imageshack.us/img828/220/compiledforum.png
// @resource buttons http://img441.imageshack.us/img441/6928/buttonsy.png
// @resource buttonends http://img823.imageshack.us/img823/636/buttonends.png
// ==/UserScript==

GM_addStyle('.f-img {background-image: url(\''+GM_getResourceURL('forum')+'\');} .butbg, .but span, .dsel span, .usel span {background-image: url(\''+GM_getResourceURL('buttons')+'\');} .but a, .dsel, .usel {background-image: url(\''+GM_getResourceURL('buttonends')+'\');} ');