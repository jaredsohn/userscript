// ==UserScript==
// @name	bbcode
// @author	LokiCode
// @description  bbcode resource
// @include http://*hikiculture.net/post*.html*
// @version       0.1
// ==/UserScript==


var textarea = document.getElementsById("textarea")[0];
var str = textarea.selection.createRange().text;
function bold() {
	textarea.innerHTML = "[b]"+str+"[/b]";
	}
var input = document.createElement('input');
	input.setAttribute("value","Spoiler");
	input.addEventListener('click', function bold(), false);
	input.setAttribute("type","button");
	textarea.parentNode.insertBefore(input, textarea);
