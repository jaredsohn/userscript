// ==UserScript==
// @name           Facebook Like button on mo.hu
// @namespace      tewe
// @include        https://*magyarorszag.hu/*
// @version			1.0
// ==/UserScript==

var jobbhasab = document.getElementById('sidebar');
var doboz = jobbhasab.getElementsByClassName('box');

var fb_like = document.createElement('iframe');
var pageurl = location.href;
fb_like.src ="http://www.facebook.com/widgets/like.php?href="+pageurl;
fb_like.scrolling="no";
fb_like.frameborder="0";
fb_like.style.border = "none";
fb_like.style.width = "234px";
fb_like.style.height = "80px";
fb_like.style.allowTransparency = "true";

doboz[1].parentNode.insertBefore(fb_like, doboz[3]);	