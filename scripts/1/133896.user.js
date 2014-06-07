// ==UserScript==
// @name           Allow pasting into login fields on Waitrose.com
// @version        1.0
// @description    Removes paste event handlers to re-enable pasting password and username.
// @author         Stuart Colville
// @include        https://www.waitrose.com/*
// @include        http://www.waitrose.com/*
// ==/UserScript==

(function(d) {
    var uname = d.getElementById("logonIdField"),
        pwd = d.getElementById("logonPasswordField");

    uname.removeAttribute("onpaste");
    pwd.removeAttribute("onpaste");
    
})(document);
