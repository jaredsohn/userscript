// ==UserScript==
// @name          Wiki Section Links
// @namespace     *
// @description   Creates on hover of the wikipedia links a anchor link
// @include       http://*.wikipedia.org/wiki/*
// ==/UserScript==

var style_node = document.createElement("style");
style_node.setAttribute("type", "text/css");
var css = new Array("","","");
for (var i=1; i<=6; i++) {
	css[0] += "h"+i+"       .mw-headline a.a";
	css[1] += "h"+i+":hover .mw-headline a.a";
	css[2] += "h"+i+" .mw-headline a.a:hover";
	if (i!=6) {
		css[0] += ",\n";
		css[1] += ",\n";
		css[2] += ",\n";
	} else {
		css[0] +=" {display:none; color:dimgray; margin-left:2px; text-decoration:none;}\n";
		css[1] +=" {display:inline;}\n";
		css[2] +=" {color:white; background-color:dimgray;}\n";
	}
}
style_node.appendChild(document.createTextNode(css[0] + css[1] + css[2] + ".editsection {float:right!important}"));
document.getElementsByTagName("head")[0].appendChild(style_node);

headlines = document.getElementsByClassName("mw-headline");
for (var i=0; i<headlines.length; i++) {
	var link = document.createElement("a");
	link.appendChild(document.createTextNode("¶"));
	link.setAttribute("class", "a");
	link.setAttribute("href", "#" + headlines[i].getAttribute("id"));
	headlines[i].appendChild(link);
}