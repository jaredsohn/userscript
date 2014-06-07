// ==UserScript==
// @name           Cheat Engine Forums++
// @namespace      #aVg
// @description    Makes the experience had at the forums much better. Who the hell did the colors on this site? T_T Request a feature and I'll implement it if not too crazy or time consuming.
// @include        http://forum.cheatengine.org/*
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
function single() {if(arguments.length==2 && !arguments[1]) return;return document.evaluate("." + arguments[0], arguments[1] || document.body, null, 9, null).singleNodeValue}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
var loc = location.pathname.substring(1);
GM_addStyle(".quote {background-color:lightGreen;color:black} .code {background-color:black;color:lightGreen} th {color:white} body, .bodyline {background-color:white;border:none} td.cat, td.catHead, td.catSides, td.catLeft, td.catRight, td.catBottom {background-color:lightBlue} td.rowpic {background-color:lightBlue} td.row1 {background-color:lavender} td.row2 {background-color:lightGoldenRodYellow} td.row3 {background-color:lightCyan} td.row3Right {background-color:lightYellow} input.post, textarea.post, select{background-color:lightCyan}");
document.title = document.title.substring(16);
switch(loc) {
	case "viewtopic.php":
	case "viewforum.php":
		document.title = document.title.substring(13);
		var p = single("//span[@class='nav']/b/text()");
		if(p && p.nodeValue != "1") document.title += " [" + p.nodeValue + "]";
		break;
	case "":
	case "index.php":
		document.title = "Cheat Engine Forums";
		break;
	case "search.php":
		document.title = "Search";
		single("//form[@action='http://www.google.com/custom']/table").style.backgroundColor = "lavender";
		break;
	case "privmsg.php":
		if(location.search.match(/folder=([^&#]+)/)) document.title += " [" + RegExp.$1[0].toUpperCase() + RegExp.$1.substring(1) + "]";
		break;
}
var cp = single("//span[@class='copyright']"), links = cp.removeChild(single("//center", cp));
for(var i = cp.childNodes.length - 1; i>=0;--i) cp.removeChild(cp.firstChild);
cp.appendChild(links);