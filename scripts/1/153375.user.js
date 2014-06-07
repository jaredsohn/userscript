// ==UserScript==
// @name           YouTube: No Google+
// @version        1.2
// @namespace      Hpr222
// @description    Removes annoying Google+ pop-up from YouTube.
// @downloadURL    http://userscripts.org/scripts/source/153375.user.js
// @updateURL      http://userscripts.org/scripts/source/153375.meta.js
// @grant          none
// @include        *.youtube.com*
// @run-at         document-end
// ==/UserScript==

//fixes the upload button
var str = document.getElementById("yt-masthead-content").innerHTML;
var n = str.replace('#','http://www.youtube.com/upload').replace('yt-uix-button  link-gplus-lightbox yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default','yt-uix-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default');
document.getElementById("yt-masthead-content").innerHTML=n;
// remove all children from element
var element = document.getElementById("link-gplus-lb");
while (element.firstChild) {
  element.removeChild(element.firstChild);
}