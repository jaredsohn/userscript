// ==UserScript==
// @name           Wikipedia Title Search
// @namespace      none
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==

var ttl = document.getElementById("firstHeading");
if (ttl == null) return;
var text = ttl.textContent;
var i = text.indexOf(" (");
var t=[];
if (i == -1) {
	t[0] = text;
	t[1] = "";
} else {
	t[0] = text.substring(0, i);
	t[1] = text.substring(i);
}

ttl.textContent = "";
var a = document.createElement("a");
a.href="http://"+window.location.hostname+"/w/index.php?fulltext=Search&search=" + t[0];
a.textContent = t[0];
ttl.appendChild(a);
ttl.appendChild(document.createTextNode(t[1]));