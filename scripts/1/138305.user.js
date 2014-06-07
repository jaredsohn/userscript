// ==UserScript==
// @name        zr.ru comments
// @namespace   http://brededor.dyndns.org/2012/greasemonkey/
// @include     http://www.zr.ru/*
// @version     5
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

var cmnts = document.getElementById("cmnts");
var script = cmnts.parentNode.getElementsByTagName("script")[0].text;
var run = "";
var regexp = /'(http.*)&callback=\?',[\s\r\n]*function\s*\(\s*data\s*\)\s*\{((.|[\r\n])*)\}\);[\s\n\r]*\}\);[\s\n\r]*$/m;
var matches = regexp.exec(script);
var url = matches[1];
run = matches[2];
GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(xhr) {
        var data = eval(xhr.responseText);
        eval(run);
    }
});
