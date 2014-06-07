// ==UserScript==
// @name        贴吧反缩图
// @namespace   noe132
// @include     http://tieba.baidu.com/p/*
// @include	/http://tieba\.baidu\.com/f\?ct=[0-9]{9,12}&tn=baiduPost.*/
// @updateURL      https://userscripts.org/scripts/source/156548.meta.js
// @downloadURL    https://userscripts.org/scripts/source/156548.user.js
// @icon	http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version     1.0
// ==/UserScript==
var a = document.getElementsByClassName("BDE_Image");
for (x in a){a[x].src = a[x].src.replace(/w%3D580\/sign=[a-z0-9]{32}\/([a-z0-9]{40})/,"pic/item/$1");}