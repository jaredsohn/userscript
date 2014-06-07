// ==UserScript==
// @name           prettyPrinter - Autocheck
// @namespace      http://userscripts.org/users/33515/scripts
// @description    Checks Checkboxes for JavaScript and CSS automatically.
// @include        http://prettyprinter.de/*
// ==/UserScript==


GM_addStyle("textarea { width: 1300px; height: 300px; }"); // remove/change this if you want, it doesn't affect the script.
var ta = document.getElementsByTagName("input")[0];
var css = document.createElement("a");
var js = document.createElement("a");
css.addEventListener("click", function(e){
	var dd = document.getElementsByTagName("input");
	for (var i=0; i<dd.length; i++) {
		dd[i].checked = "";
	}
	document.getElementsByName("addnewlines")[0].checked = "checked";
	document.getElementsByName("onelineperstatement")[0].checked = "checked";
	document.getElementsByName("css")[0].checked = "checked";
}, true);
js.addEventListener("click", function(e){
	var dd = document.getElementsByTagName("input");
	for (var i=0; i<dd.length; i++) {
		dd[i].checked = "";
	}
	document.getElementsByName("addnewlines")[0].checked = "checked";
	document.getElementsByName("onelineperstatement")[0].checked = "checked";
	document.getElementsByName("css")[0].checked = "checked";
	document.getElementsByName("onelineperstatementexcludeforandquotes")[0].checked = "checked";
}, true);
css.innerHTML = "[CSS]";
css.style.marginRight = "5px";
js.innerHTML = "[JS]";
css.style.cursor = "pointer";
js.style.cursor = "pointer";
ta.parentNode.insertBefore(css, ta);
ta.parentNode.insertBefore(js, ta);
ta.parentNode.insertBefore(document.createElement("br"), js.nextSibling);
ta.parentNode.insertBefore(document.createElement("br"), js.nextSibling);