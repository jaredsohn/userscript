// ==UserScript==
// @name DisclaimerAccepter
// @author LJK
// @version 1.1
// @include *halbot.haluze.sk*
// @include *rozzlobenimuzi.com*
// @include *navratdoreality*
// @include *drsnysvet.cz*
// ==/UserScript==



var dnu = 9999;
var datum= new Date();
datum.setTime(datum.getTime() + 1000 * 60 * 60 * 24 * dnu);

document.cookie = "accepted_disclaimer=yes;expires=" + datum.toGMTString();

document.cookie = "rozzlobenimuziacknow=yes;expires=" + datum.toGMTString();

document.cookie = "__utmb=37343807.1.10.1287004591;expires=" + datum.toGMTString();

document.cookie = "agreement=true;expires=" + datum.toGMTString();

