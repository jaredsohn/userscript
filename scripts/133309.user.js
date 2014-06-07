// ==UserScript==
// @name        VG Wort Anzeige
// @namespace   http://diveintogreasemonkey.org/download/
// @description Ein kleines Symbol unten rechts in der Ecke erscheint, wenn Z&Auml;hlpixel der VG Wort auf der Seite verwendet werden.
// @include     *
// @version     1
// ==/UserScript==
var string = ".met.vgwort.de/na/";
var vgwort = document.getElementsByTagName('body')[0].innerHTML.match(string);

if(vgwort) {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#fusszeile { position:fixed; bottom:0px; right:5px; }');

var vgw = document.createElement("div");
vgw.innerHTML = '<div id="fusszeile"><img src="http://www.JanZ-im-Web.de/downloads/vgwlogo.png" alt="Auf dieser Seite werden Z&Auml;hlpixel der VG Wort angezeigt." height="15px"/></div>';
document.body.insertBefore(vgw, document.body.firstChild);
}