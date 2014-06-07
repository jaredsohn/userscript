
// ==UserScript==
// @name           Nimbuzz noAds
// @namespace      http://my.nimbuzz.com/web_client/
// @description    Removes Ads From Grooveshark
// @include        http://my.nimbuzz.com/web_client/*
// ==/UserScript==
var element = document.getElementById("adsContent");
element.parentNode.removeChild(element);