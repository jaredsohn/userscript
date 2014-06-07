// ==UserScript==
// @name FaceBook Mob Add (mobadd.user.js)
// @namespace http://vishnu-agarwal.blogspot.com
// @description from the added friends page, adds him/her to your mob automatically
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @exclude http://www.facebook.com/
// @exclude https://www.facebook.com/
// @exclude http://apps.facebook.com/*
// ==/UserScript==

var str = document.body.innerHTML;
var uidStr = document.body.innerHTML.substr(str.search("uid=") + 4, 20);
var uid = uidStr.match(/^\d+/);
document.location = "http://apps.facebook.com/mobwars/mob/do.php?join_id=" + uid;
