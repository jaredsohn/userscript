// ==UserScript==
// @name          cdfreaks - forum ad remover
// @description   Removes the annoying ads on cdfreaks.
// @include       http://club.cdfreaks.com/*
// @namespace     #aVg
// @version       0.1
// ==/UserScript==
var ads=document.evaluate("//*[contains(text(),'This advertising will not be shown to registered members')]/../../../../../../../../../../..",document,null,6,null), i=0, ad;
while(ad=ads.snapshotItem(i++))
 ad.parentNode.removeChild(ad);