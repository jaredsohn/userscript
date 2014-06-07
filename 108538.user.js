// ==UserScript==
// @name           Google Images Basic View
// @namespace      http://
// @description    Perform a Google Image Search with its basic version
// @include        http://www.google.*/search?*
// @exclude        http://www.google.*/search?*&sout=1*
// ==/UserScript==


var standardUrl = window.location.href;
var addToUrl = '&sout=1';
var basicUrl = standardUrl+addToUrl;

window.location.replace(basicUrl);
