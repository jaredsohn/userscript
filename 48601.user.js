// ==UserScript==
// @name           MS downloads direct link
// @namespace      http://dev.gurianov.com/userjs/msd_directlink
// @description    Adds direct link of file to be downloaded from "http://www.microsoft.com/downloads/" next to "Download" button.
// @include        http://www.microsoft.com/downloads/details.aspx?*
// ==/UserScript==

var headerid = "quickInfoHeader";
var multifileid = "multiFileList";

var re1 = /http:.+(?=',)/;
var re2 = /http.+(?=")/;

var header = document.getElementById(headerid);
var url = header.innerHTML.match(re1);
if (url) {
    header.innerHTML += 'Direct Link'.link(url[0]);}

var multifile = document.getElementById(multifileid);
var nses = multifile.getElementsByTagName("noscript");
for (var i=0; i<nses.length; i++) {
    var ns = nses[i];
    var url = ns.innerHTML.match(re2);
    if (url) {
        ns.parentNode.innerHTML += 'Direct Link'.link(unescape(url[0]));}}
