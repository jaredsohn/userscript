// ==UserScript==
// @name 		Tab to popup window
// @description		Link at top left of a page opens as a popup window
// @version		0.2
// @match		*
// ==/UserScript==

var div = document.createElement("div");
	
	var contentStyle =	"position:absolute;top:0px;left:0px;background-color:#333;";
	var linkStyle =		"color:#DDD;font-size:1px;";
	var linkText =		"Popup";
	
	var linkScript =	"window.open(\''+window.location+'\',\'name\',\'toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=1,left=0,top=0\');";
	var link =			"<a style=\""+linkStyle+"\" href=\"javascript:void();\" onclick=\""+linkScript+"\">"+linkText+"<\a>";
	var content =		"<div style=\""+contentStyle+"\">"+link+"<\div>";
	
	div.innerHTML = content;
	document.body.appendChild(div);