// ==UserScript==
// @name           4Chan Triforce
// @namespace      4chantriforcefornewfags
// @description    Only newfags want to triforce
// @include        http://boards.4chan.org/*
// ==/UserScript==

var trs = document.getElementsByTagName('tr');

for (var tr in trs) {
 if (trs[tr].innerHTML.indexOf("Comment") != -1) trs[tr].innerHTML = trs[tr].innerHTML + "<a href=\"#\" id=\"newfagtriforce\">TRIFAG</a>";
}

document.getElementById('newfagtriforce').addEventListener("click", function() {document.getElementsByName('com')[0].value=("\xA0\xA0\u25B2\x0A\u25B2\x20\u25B2");}, false);