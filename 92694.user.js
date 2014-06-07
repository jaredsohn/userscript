// ==UserScript==
// @name           Demonoid.me Sort By Seeds
// @namespace      http://userscripts.org/users/256542
// @description    sorts results by seeds automatically
// @include        http://www.demonoid.me/files/*
// @copyright      wackyanimation
// ==/UserScript==

function addSortInput() {
var s = document.evaluate("//input[@name='sort']", document, null, 9, null).singleNodeValue;
if(s) {s.value = "S";}
}

if(/\/files\/.+category=.+$/.test(location.href) && !/(\&|\?)sort=S/.test(location.href)) {
location.href = location.href.replace(/\&sort=(\w+)?/g, '') + '&sort=S';
}

window.addEventListener("load", addSortInput, false);