// ==UserScript==
// @name           Ikariam Searchbar
// @version       0.1
// @namespace      ikariam.searchbar
// @description    This script adds a tab to the left of the game screen that will slide out when moused over to reveal the Ikariam Search Engine
// @include            http://s*.ikariam.*/*
// ==/UserScript==

//
// This script was customised by perfectBUD
// Originalscript Ikariam Fightbar made by EnigmaBrand. 
// Ikariam and the searchengine are copyrighted by their respective owners.
//

var version="0.1";
var displayedflag = 0;

var imgtab="http://img74.imageshack.us/img74/2413/tabsearchbarom4.png";
var imgbarbgt="http://img165.imageshack.us/img165/34/barbgtopfm1.gif";
var imgbarbgm="http://img74.imageshack.us/img74/6937/barbgmidln9.gif";
var imgbarbgb="http://img145.imageshack.us/img145/7952/barbgbotpj9.gif";

unsafeWindow.displaysearch = function() {
	if(displayedflag == 0) {
		document.getElementById("searchframe").innerHTML = '<iframe width="914" border="0" frameborder="0" height="100%" src="http://beafraid.prv.pl/ikariam/index.html" style="margin-left:26px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showsearch = function() {
	if(document.getElementById("searchbar").style.left == "-952px")
	{
		document.getElementById("searchbar").style.left = "0px;"
	}
	document.getElementById("searchbar").style.left = "0px;"
}

unsafeWindow.hidesearch = function() {
	document.getElementById("searchbar").style.left = "-952px;"
}

vsearchbar = document.createElement("div");
vsearchbar.setAttribute("id", "searchbar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vsearchbar);


var wkHTML = '<div id="searchtab" onmouseover="showsearch()" onclick="hidesearch()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:950px;position:absolute;top:0px;left:0px;height:30px;background:url('+imgbarbgt+');background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/55683/scripts">Ikariam searchbar v'+version+'</a></div>'
	+ '<div id="searchframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaysearch()">Mouse over this area to load the Search Engine</div>'
	+ '<div style="width:950px;position:absolute;bottom:0px;left:0px;height:3px;background:url('+imgbarbgb+');background-repeat:no-repeat;"></div>';

GM_addStyle("#searchbar { background:url("+imgbarbgm+"); padding-top:33px; width:950px; height: 500px; position:fixed; left:-952px; top:15px; border:1px black solid; z-index:50;");
GM_addStyle("#searchbar:hover { left:0px; }");
GM_addStyle("#searchtab { background:url("+imgtab+"); width:26px; height:100px; position:absolute; right:-26px; top:400px; } ");
GM_addStyle("#searchtab:hover { cursor: pointer; } ");

document.getElementById("searchbar").innerHTML = wkHTML;

///// End of script /////