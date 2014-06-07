// ==UserScript==
// @name          TagPro Game Number Joiner
// @description   Provides an easy way to join a game number
// @include       http://tagpro-*.koalabeast.com/
// ==/UserScript==

var elems = document.getElementsByTagName('*'), i;
for (i in elems) {
    if((' ' + elems[i].className + ' ').indexOf(' buttons smaller ') > -1) {
        elems[i].innerHTML += "<a class = 'button' onclick = 'window.location = \"http://tagpro-radius.koalabeast.com:80\" + document.getElementById(\"number\").value'>Join a specific game <span>a little bit of ceremony</span></a><br /><span style = 'position: relative; margin-right: -21px; color: black'>80</span><input type = 'text' id = 'number' maxlength = '2' style = \"padding-left: 20px; width: 20px\" />";
    }
}