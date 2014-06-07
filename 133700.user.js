// ==UserScript==
// @name        FetlifeDirecPic
// @namespace   http://userscripts.org/users/knot2nice
// @description Opens url of actual hi-res image instead of normal view. Makes it easy to save pics
// @include     https://fetlife.com/users/*/pictures/*
// @version     1
// ==/UserScript==

var imageshit = document.getElementsByTagName('style');
var innertxt = imageshit[0].innerHTML
var flpics1 = innertxt.search("flpics")
var flpics2 = innertxt.substring(flpics1).search("http")
var end = innertxt.substring(flpics1+flpics2).search("jpg")
imgurl = innertxt.substring(flpics1+flpics2,flpics1+flpics2+end+3)
window.location.href = imgurl;