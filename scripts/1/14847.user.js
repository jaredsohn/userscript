// ==UserScript==
// @name           GC-smallprint
// @namespace      http://dosensuche.de
// @include        http://www.geocaching.com/seek/cdpf.aspx?*
// ==/UserScript==

hd=document.getElementById("hd");
waypoint=hd.getElementsByTagName("div")[1].getElementsByTagName("h1")[0].firstChild.data;
name=document.getElementById("bd").getElementsByTagName("div")[0].getElementsByTagName("h2")[0].childNodes[1];
name.appendData(" ("+waypoint+")");
terms=document.getElementById("bd").childNodes[9].childNodes[3];
terms.parentNode.removeChild(terms);
hd.parentNode.removeChild(hd);
ft=document.getElementById("ft");
ft.parentNode.removeChild(ft);

addGlobalStyle("body {font-size:x-small !important} span {font-size:x-small !important} p {font-size:x-small !important} td {font-size:x-small !important} cacheName {font-size:medium !important}"+
	" .ff {font-size:small !important} .ek {font-size:xx-small !important}");

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
