// ==UserScript==
// @name           Demonoid.ME Auto Sort By Seeds
// @namespace      http://userscripts.org/users/deoptima
// @description    Automatically sorts results by seeds
// @include        http://www.demonoid.me/files/*
// @copyright      deoptima
// ==/UserScript==

function addSortInput() {
var s = document.evaluate("//input[@name='sort']", document, null, 9, null).singleNodeValue;
if(s) {s.value = "S";}
}

if(/\/files\/.+category=.+$/.test(location.href) && !/(\&|\?)sort=S/.test(location.href)) {
location.href = location.href.replace(/\&sort=(\w+)?/g, '') + '&sort=S';
}

window.addEventListener("load", addSortInput, true);