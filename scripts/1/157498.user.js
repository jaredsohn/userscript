// ==UserScript==
// @name        Comment Permalink
// @namespace   com.ta
// @include     http://www.trueachievements.com/*.htm*
// @version     1
// ==/UserScript==

var x = document.getElementsByClassName("Comment");
var i = 0;
var id = "";
var spl;

for(i = 0; i < x.length; i++) {

	if(x[i].className != "Comment OtherComments") {

		var id = x[i].getAttribute("id");
		spl = id.split("gfcid");
		var url = document.URL.split('?')[0] + "?gfcid=" + spl[1];
		
		
		x[i].childNodes[1].innerHTML = "<a href=\"" + url + "\"><img class=\"AddComment\" src=\"http://i.imgur.com/S7n0cI4.gif\"  alt=\"Permalink\" title=\"Permalink\"></img></a>" + x[i].childNodes[1].innerHTML;
	
	}
}
