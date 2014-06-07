// ==UserScript==
// @name           Aadsas Menu
// @namespace      http://userscripts.org
// @description    Adds 'All' to Status Menu Bar, works with Aadsas Status
// @include        https://aadsas.adea.org/aadsas08/menutree.cgi*
// ==/UserScript==


var scripts = document.getElementsByTagName("script");

var sIdx = scripts[3].text.indexOf('usefuldummy');
var eIdx = scripts[3].text.indexOf("'", sIdx+1);
var usefuldummy = scripts[3].text.substring(sIdx,eIdx);

var node = document.createElement("script");
node.type = "text/javascript";
var text = "Menu4=new Array('Status','','',7,20,120);"+
		 "Menu4_7=new Array('All','https://aadsas.adea.org/aadsas08/emptyframe.cgi?"+usefuldummy+"&pass=','',0);";
node.appendChild(document.createTextNode(text));

scripts[4].parentNode.insertBefore(node, scripts[4]);
