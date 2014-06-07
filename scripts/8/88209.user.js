// ==UserScript==
// @name           NOMEe fórum
// @namespace      http://www.scentrala.sk
// @description    This script adds a tab to the left of the game screen that will slide out when moused over to reveal the Ikariam NOMEe fórum.
// @include        http://s*.ikariam.*/*
// ==/UserScript==



var version="0.2";
var displayedflag = 0;

unsafeWindow.displayfight = function() {
	if(displayedflag == 0) {
		document.getElementById("fightframe").innerHTML = '<iframe width="915" border="0" frameborder="0" height="100%" src="http://nome.freeforums.org" style="margin-left:26px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showfight = function() {
	if(document.getElementById("fightbar").style.left == "-954px")
	{
		document.getElementById("fightbar").style.left = "0px;"
	}
	document.getElementById("fightbar").style.left = "0px;"
}

unsafeWindow.hidefight = function() {
	document.getElementById("fightbar").style.left = "-954px;"
}

vfightbar = document.createElement("div");
vfightbar.setAttribute("id", "fightbar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vfightbar);


var wkHTML = '<div id="fighttab" onmouseover="showfight()" onclick="hidefight()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:800px;position:absolute;top:0px;left:0px;height:30px;background:url(http://www.jpeg.cz/images/826_2.jpg);background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://nome.freeforums.org">Fórum aliancie NOMEe</a></div>'
	+ '<div id="fightframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displayfight()">Načíta sa....</div>'
	+ '<div style="width:950px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://www.jpeg.cz/images/826_2.jpg);background-repeat:no-repeat;"></div>';

GM_addStyle("#fightbar { background:url(http://www.jpeg.cz/images/192_nac1.jpg); padding-top:33px; width:954px; position:fixed; left:-955px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#fightbar:hover { left:0px; }");
GM_addStyle("#fighttab { background:url(http://www.jpeg.cz/images/551_nf.png); width:26px; height:100px; position:absolute; right:-26px; top:300px; } ");
GM_addStyle("#fighttab:hover { cursor: pointer; } ");

document.getElementById("fightbar").innerHTML = wkHTML;

///// End of script /////