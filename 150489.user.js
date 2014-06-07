// ==UserScript==
// @name           ex-arrows
// @version        1.0
// @namespace      http://userscripts.org/users/133663
// @author         Sana
// @description    Bind left and right arrow keys to previous and next page links on ex like a proper slideshow program
// @match          http://exhentai.org/s/*/*
// @match          http://g.e-hentai.org/s/*/*
// @run-at-document-end
// ==/UserScript==

document.addEventListener("keyup",keyup,false);
var next = /<a href="([^"]*?)"><img src="[^"]*\/n.png"/i.exec(document.body.innerHTML)[1];
var prev = /<a href="([^"]*?)"><img src="[^"]*\/p.png"/i.exec(document.body.innerHTML)[1];

function keyup (key) {
    if (key.keyCode==39) {
        // -->
        window.location.href = next;
    } else if (key.keyCode==37) {
        // <--
        window.location.href = prev;
    }
}