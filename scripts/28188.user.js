// ==UserScript==
// @name           Ikariam Fightbar
// @namespace      http://ikariamfightbar.googlepages.com/home
// @description    This script adds a tab to the left of the game screen that will slide out when moused over to reveal the Ikariam Fight Simulator.
// @include        http://s*.ikariam.*/*
// ==/UserScript==

//
// This script was made by EnigmaBrand.
// Ikariam and the simulator are copyrighted by their respective owners.
//

var version="0.2";
var displayedflag = 0;

unsafeWindow.displayfight = function() {
	if(displayedflag == 0) {
		document.getElementById("fightframe").innerHTML = '<iframe width="764" border="0" frameborder="0" height="100%" src="http://ikariam.immortal-nights.com/ikafight/" style="margin-left:26px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showfight = function() {
	if(document.getElementById("fightbar").style.left == "-802px")
	{
		document.getElementById("fightbar").style.left = "0px;"
	}
	document.getElementById("fightbar").style.left = "0px;"
}

unsafeWindow.hidefight = function() {
	document.getElementById("fightbar").style.left = "-802px;"
}

vfightbar = document.createElement("div");
vfightbar.setAttribute("id", "fightbar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vfightbar);


var wkHTML = '<div id="fighttab" onmouseover="showfight()" onclick="hidefight()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:800px;position:absolute;top:0px;left:0px;height:30px;background:url(http://www.imgboot.com/images/enigmabrand/wikibarbgtop.gif);background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/55264/scripts">Ikariam Fightbar v'+version+'</a></div>'
	+ '<div id="fightframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displayfight()">Mouse over this area to load the fight</div>'
	+ '<div style="width:800px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://www.imgboot.com/images/enigmabrand/wikibarbgbot.gif);background-repeat:no-repeat;"></div>';

GM_addStyle("#fightbar { background:url(http://www.imgboot.com/images/enigmabrand/wikibarbgmid.gif); padding-top:33px; width:800px; position:fixed; left:-802px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#fightbar:hover { left:0px; }");
GM_addStyle("#fighttab { background:url(http://www.imgboot.com/images/enigmabrand/tabfightbar.png); width:26px; height:100px; position:absolute; right:-26px; top:300px; } ");
GM_addStyle("#fighttab:hover { cursor: pointer; } ");

document.getElementById("fightbar").innerHTML = wkHTML;

///// End of script /////