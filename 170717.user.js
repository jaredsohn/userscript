// ==UserScript==
// @name        Dospy Reload
// @namespace   exzhawk2
// @description Dospy Rapid Reply
// @include     http://bbs.dospy.com/*
// @version     1
// ==/UserScript==
if (location.href.slice(0,44)=="http://bbs.dospy.com/forumdisplay.php?fid=29") {

setTimeout("location.reload()",120000);
}