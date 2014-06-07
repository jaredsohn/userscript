// ==UserScript==
// @name        docjar-helper
// @namespace   com.docjar-helper
// @description hide line numbers for docjar
// @include     http://www.docjar.com/html/*.java.html*
// @version     1
// @grant       none
// ==/UserScript==

var pre = document.getElementsByTagName("pre")[0];

var ognlHTML = pre.innerHTML;

function clipLineNumber(ognlHTML) {
	return ognlHTML.replace(new RegExp("[\\s0-9]{5}\\s&nbsp;\\s", "ig"), "");
}

var clippedHTML = clipLineNumber(ognlHTML);

var headDiv = document.getElementsByTagName("div")[0];

var sharp = document.createTextNode("# ");
var hideArchor = document.createElement("a");
var showArchor = document.createElement("a");
hideArchor.innerHTML = "hide line numbers";
showArchor.innerHTML = "show line numbers";

headDiv.appendChild(document.createTextNode("# ["));
headDiv.appendChild(hideArchor);
headDiv.appendChild(document.createTextNode(" | "));
headDiv.appendChild(showArchor);
headDiv.appendChild(document.createTextNode("]"));

function hideLineNum() {
	pre.innerHTML = clippedHTML;
	showArchor.onclick = showLineNum;
	hideArchor.onclick = null;
	showArchor.href = "#show-line-numbers";
	hideArchor.removeAttribute("href");
	location.hash = "hide-line-numbers";
}

function showLineNum() {
	pre.innerHTML = ognlHTML;
	hideArchor.onclick = hideLineNum;
	showArchor.onclick = null;
	hideArchor.href = "#hide-line-numbers";
	showArchor.removeAttribute("href");
	location.hash = "show-line-numbers";
}

if (location.hash !== "#show-line-numbers") {
	hideLineNum();
} else {
	showLineNum();
}