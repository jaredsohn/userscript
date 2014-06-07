// ==UserScript==
// @name           Dumppix: Show only the picture
// @include        *dumppix.com/viewer.php*
// @namespace      https://userscripts.org/scripts/show/108316
// @updateURL      https://userscripts.org/scripts/source/108316.user.js
// @downloadURL    https://userscripts.org/scripts/source/108316.user.js
// @version        2012.11.08
// @grant          none
// ==/UserScript==

var re = new RegExp('[?&]file=([a-z0-9_-]+.[a-z]{3,4})', 'gi');
var image = document.location.search.replace(re, '$1');

document.body.innerHTML = '<img src="./images/'+image+'" onLoad="document.location.replace(this.src)">';