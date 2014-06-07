// ==UserScript==
// @name          Mopoo AutoFill
// @author        人生就是一坨屎
// @include       http://www.tamiaode.com/txt/*
// @include       http://www.tamiaode.com/new/submit*
// @include       http://www.tamiaode.com/new/fatiezi.asp
// ==/UserScript==

var address   = "http://www.boxey.net";
var Img = "http://www.saicn.com/bbs/img/now/boxey";
var a =window.document.getElementsByName("address")
a[0].value=address;
var b =window.document.getElementsByName("address2")
b[0].value=Img;
