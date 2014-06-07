// ==UserScript==
// @name           Alluc Direct Link
// @namespace      http://codr.us/category/Greasemonkey/Alluc-Direct-Link
// @description    Changes links to videos directly on Alluc.org
// @include        *alluc.net*
// @include        *alluc.org*
// @include        *alluc.de*
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (var i=0; i<links.length; i++) {
    if (links[i].href.indexOf('showmovie.php') !== -1) {
	var s = links[i].href.split('&url=');
        links[i].href = unescape(s[1]);
    }
}