// ==UserScript==
// @name           TC PageFixer
// @namespace      no u
// @include        http://www.tinychat.com/*
// @include        http://tinychat.com/*
// @exclude        http://tinychat.com/
// @exclude        http://www.tinychat.com/
// @version        1.2.2
// ==/UserScript==

LoadMeTC();

function LoadMeTC(){ 
var t = document.getElementById("header");
if (t != null) t.parentNode.removeChild(t);

var t = document.getElementById("footer");
if (t != null) t.parentNode.removeChild(t);

var t = document.getElementById("share-bar");
if (t != null) t.parentNode.removeChild(t);

var t = document.getElementById("goods");
if (t != null) t.parentNode.removeChild(t);

var t = document.getElementById("room_header");
if (t != null) t.parentNode.removeChild(t);

var t = document.getElementById("chat-info");
if (t != null) t.parentNode.removeChild(t);

var t = document.getElementById("ad_banner");
if (t != null) t.parentNode.removeChild(t);

var t = document.getElementById("right_block");
if (t != null) t.parentNode.removeChild(t);

var t = document.getElementById("p180-root");
if (t != null) {t.parentNode.removeChild(t);}

var t = document.getElementById("body_footer_ad");
if (t != null) {t.parentNode.removeChild(t);}

var t = document.getElementById("wrapper");
var q = document.getElementById("page");
var u = t.parentNode;
if (t != null) u.removeChild(t);

var newwrapper = document.createElement('div');
newwrapper.appendChild(q);

u.appendChild(newwrapper);

var t = document.getElementById("category-bar");
if (t != null) t.parentNode.removeChild(t);



}