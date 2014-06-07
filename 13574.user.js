// ==UserScript==
// @name	Fluff Friends Petter
// @namespace	http://www.smert.net/
// @description	Auto Pet Fluff Friends
// @include	http://apps.facebook.com/fluff/fluffbook.php*
// ==/UserScript==
var h = document.getElementsByTagName('div');
var i;
for (i in h) {
    if (h[i].innerHTML) {
        k = h[i].innerHTML.substr(0,8);
        if (k == "You have") { window.close(); return; }
    }
}
var i = document.getElementsByTagName('form');
// The first 5 are now fake forms that will generate an error. This will change often.
i[6].submit();