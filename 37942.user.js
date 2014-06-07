// ==UserScript==
// @name           Doodle-GUI
// @namespace      http://www.pilman.ch/greasmonkey/doodle
// @include        http://*.doodle.com
// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName("head")[0];
	if (!head) { return; }
	style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle("#about, #findLeft, #findRight { background-color: #CEE4FF; }");
addGlobalStyle(".intro, .blueBox { background-color: #CEE4FF; }");
addGlobalStyle('.zusabox { width: 800px; }');
addGlobalStyle('.blueBox { width: 772px; }');
addGlobalStyle("div.button { border: 6px solid #84BBFF }");

var sticky = document.getElementById("sticky").removeChild(document.getElementById("header"));
document.getElementById("footer").removeChild(document.getElementById("footB"));
if (document.getElementById("adRight")) {
	document.getElementById("adRight").parent.removeChild(document.getElementById("adRight"));
}

if (document.getElementById("content")) {
	document.getElementById("content").style.width = "1000px";
	var divs = document.getElementById("content").getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].className == "intro" && divs[i].id != "about") {
			divs[i].style.width = "800px";
		}
	}
}
if (document.getElementById("contentHead")) {
	document.getElementById("contentHead").style.width = "1000px";
}
if (document.getElementById("poll")) {
	document.getElementById("poll").style.width = "800px";
}
if (document.getElementById("sBC")) {
	document.getElementById("sBC").style.width = "800px";
}
if (document.getElementById("fn")) {
	document.getElementById("fn").style.width = "810px";
	document.getElementById("fn").style.borderBottom = "0px";
}

if (document.getElementById("level6")) {
	var tds = document.getElementById("level6").childNodes;
	var len = tds.length;
	for (var i = 0; i < len; i++) {
		if (tds[i].nodeType == 1) {
			tds[i].style.fontSize = "9px";
			var childs = tds[i].childNodes;
			var len2 = childs.length;
			for (var j = 0; j < len2; j++) {
				if (childs[j].nodeType == 1) {
					childs[j].innerHTML = childs[j].childNodes[0].nodeValue + "<br/>";
				} else if (childs[j].nodeType == 3) {
					childs[j].nodeValue = "";
				}
			}
		}
	}
}

//var content = document.getElementById("content");
//content.style.width = "1000px";