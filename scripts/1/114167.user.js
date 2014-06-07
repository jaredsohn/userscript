// ==UserScript==
// @name postav_odin
// @namespace mail.ru
// @include http://my.mail.ru/cgi-bin/my/photo_for_vote*
// ==/UserScript==

function clickOne() {
document.getElementById("f2_r11").click();
}

function doScript() {
clickOne();
setTimeout(doScript, 3000);
}

doScript();