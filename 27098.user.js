// ==UserScript==
// @name           Shillapundit
// @namespace      confuzatron
// @description    Remove referrer id from amazon links on instapundit
// @include        http://pajamasmedia.com/instapundit*
// ==/UserScript==

var links, alink;

links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) {
alink = links[i];
alink.href = alink.href.replace("wwwviolentkicom", "nope");
}