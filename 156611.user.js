// ==UserScript==
// @name postav_odin
// @namespace mail.ru
// @include http://my.mail.ru/cgi-bin/my/photo_for_vote*
// ==/UserScript==

function clickOne() {
document.getElementById("f2_r11").click();
}

function clickSkip() {
document.getElementById("skip_vote").click();
}

function doScript() {
clickOne();
if (getComputedStyle(document.getElementById("curr_preload"), '').getPropertyValue("background-image") == 'url("http://img.mail.ru/r/blogs/load.gif")')
clickSkip();
setTimeout(doScript, 1250);
}

doScript ();