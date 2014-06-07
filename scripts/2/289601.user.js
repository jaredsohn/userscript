// ==UserScript==
// @name           Play Store Word Break
// @description    Fix the weird word break that appears on the Google Play Store in Firefox.
// @namespace      http://www.shywim.fr
// @author         Shywim (http://userscripts.org/users/shywim)
// @include        http://play.google.com/*
// @include        https://play.google.com/*
// @version        1.0
// @history        1.0 First Release.
//
// ==/UserScript==

var style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode('.review-text { word-break: normal !important; }' + '.review-body { word-break: normal !important; }'));
document.getElementsByTagName('head')[0].appendChild(style);