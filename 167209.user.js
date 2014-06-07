// ==UserScript==
// @name        The Backlot Article Widener
// @namespace   http://userscripts.org/users/parolles/
// @include     http://www.thebacklot.com/*
// @version     1
// @grant       none
// ==/UserScript==
var body = document.getElementsByTagName("body")[0];
if(body.className.indexOf("single-post") > 0) {
    var content = document.getElementById("content");
    var elems = document.getElementsByTagName("aside");
    for(var i in elems) {
        if(elems[i].className == "sidebar") {
            content.removeChild(elems[i]);
        }
    }
    document.getElementById("main").style.width = "100%";
}