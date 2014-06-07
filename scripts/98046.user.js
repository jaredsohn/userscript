// ==UserScript==
// @name           Ikariam ATPlus Slidebar
// @namespace      A-thanatos
// @description    Insert a slidebar menu More details to http://ikariam.com.netw.gr/
// @include            http://s*.ba.ikariam.com/*
// @include	       http://ba.ikariam.com/*
// @include            http://s*.id.ikariam.com/*
// @include	       http://id.ikariam.com/*
// @include	       http://s*.ro.ikariam.com/*
// @include	       http://ro.ikariam.com/*
// @include	       http://s*.us.ikariam.com/*
// @include	       http://us.ikariam.com/*
// @include	       http://s*.en.ikariam.com/*
// @include	       http://en.ikariam.com/*
// @include	       http://s*.fr.ikariam.com/*
// @include	       http://fr.ikariam.com/*
// @include            http://s*.gr.ikariam.com/*
// @include	       http://gr.ikariam.com/*
// @include            http://s*.hu.ikariam.com/*
// @include	       http://hu.ikariam.com/*
// @include            http://s*.pk.ikariam.com/*
// @include	       http://pk.ikariam.com/*
// @include            http://s*.es.ikariam.com/*
// @include	       http://es.ikariam.com/*
// @include            http://s*.it.ikariam.com/*
// @include	       http://it.ikariam.com/*
// @include            http://s*.de.ikariam.com/*
// @include	       http://de.ikariam.com/*
// @include            http://coma.gameforge.de/ticket/index.php?page=tickets*
// @include            http://coma.gameforge.de/ticket/index.php?page=answer&*
// @version            0.1
// ==/UserScript==

//--------------------------------------------------------------ATPlus Slidebar ---------------------------------------------------------
var version="0.1";
var displayedflag = 0;

var imgtab="http://s4.postimage.org/mliqruw4/PLUS1.png?noCache=1299020324";
var imgbarbgt="http://img165.imageshack.us/img165/34/barbgtopfm1.gif";
var imgbarbgm="http://img74.imageshack.us/img74/6937/barbgmidln9.gif";
var imgbarbgb="http://img145.imageshack.us/img145/7952/barbgbotpj9.gif";

unsafeWindow.displaysearch = function() {
	if(displayedflag == 0) {
		document.getElementById("searchframe").innerHTML = '<iframe width="945" border="0" frameborder="0" height="100%" src="http://ikariam.com.netw.gr" style="margin-right:26px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showsearch = function() {
	if(document.getElementById("searchbar").style.left == "-1052px")
	{
		document.getElementById("searchbar").style.left = "0px;"
	}
	document.getElementById("searchbar").style.left = "0px;"
}

unsafeWindow.hidesearch = function() {
	document.getElementById("PLUS").style.left = "-1052px;"
}

vsearchbar = document.createElement("div");
vsearchbar.setAttribute("id", "searchbar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vsearchbar);


var wkHTML = '<div id="searchtab" onmouseover="showsearch()" onclick="hidesearch()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:955px;position:absolute;top:0px;left:0px;height:30px;background:url('+imgbarbgt+');background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;"http://userscripts.org/users/297931">Ikariam Admintool Plus'+version+'</a></div>'
	+ '<div id="searchframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaysearch()">Mouse over this area to loadpage</div>'
	+ '<div style="width:950px;position:absolute;bottom:0px;left:0px;height:3px;background:url('+imgbarbgb+');background-repeat:no-repeat;"></div>';

GM_addStyle("#searchbar { background:url("+imgbarbgm+"); padding-top:33px; width:955px; height: 500px; position:fixed; left:-952px; top:15px; border:1px black solid; z-index:50;");
GM_addStyle("#searchbar:hover { left:0px; }");
GM_addStyle("#searchtab { background:url("+imgtab+"); width:26px; height:100px; position:absolute; right:-26px; top:400px; } ");
GM_addStyle("#searchtab:hover { cursor: pointer; } ");

document.getElementById("searchbar").innerHTML = wkHTML;

