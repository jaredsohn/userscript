// ==UserScript==
// @name           Google Search Clean page
// @namespace      http://www.google.com/search*
// @include        http://www.google.com/search*
// ==/UserScript==

document.title = document.title.split("- Google Search")[0];
var gb = document.getElementById("gb");
gb.style.display = 'none';
gb.previousSibling.style.visibility = 'hidden';
gb.previousSibling.previousSibling.style.visibility = 'hidden';
gb.previousSibling.previousSibling.previousSibling.style.display = 'none';
var header = document.getElementById("header");
header.style.paddingLeft = "2em";
var res = document.getElementById("res");
res.style.paddingLeft = "2em";
res.nextSibling.nextSibling.style.visibility = "hidden";
var ssb = document.getElementById("ssb");
ssb.style.visibility = "hidden";
var logo = document.getElementById("logo");
logo.parentNode.style.display = "none";
var query_table = document.getElementById("sff");
query_table.firstChild.style.width = "100%";
var queries = document.getElementsByName("q");
for(var i = 0; i < queries.length; i++) {
	if(queries[i].getAttribute("title") == "Search") {
		queries[i].parentNode.style.width = "90%";
		queries[i].style.width = "85%";
		queries[i].style.fontSize = "2em";
		//queries[i].nextSibling.style.fontSize = "2em";
		queries[i].nextSibling.nextSibling.style.fontSize = "2em";
	}
}
var imgs = document.getElementsByTagName("img");
for(var i = 0; i < imgs.length; i++) {
	imgs[i].style.border = "none";
}
var mbEnd = document.getElementById("mbEnd");
mbEnd.style.display = "none";