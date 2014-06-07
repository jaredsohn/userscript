// ==UserScript==
// @name           Ikariam Wikibar
// @version        1.3
// @namespace      EnigmaBrand
// @description    This extension adds a tab on the left side of the game browser game Ikariam located at http://ikariam.org or http://ikariam.com that will slide out to reveal the Ikariam Wiki located at http://ikariam.wikia.com/wiki/Main_Page when moused over. To close the window that slides out, simply click on the Tab again!
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
// ===========================================================================

//
// This extension was made by EnigmaBrand.
// Ikariam and WikIkariam are copyrighted by their respective owners.
//

var version="1.6";
var displayedflag = 0;

unsafeWindow.displaywiki = function() {
	if(displayedflag == 0) {
		document.getElementById("wikiframe").innerHTML = '<iframe width="764" border="0" frameborder="0" height="100%" src="http://ikariam.wikia.com/wiki/Main_Page" style="margin-left:26px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showwiki = function() {
	if(document.getElementById("wikibar").style.left == "-802px")
	{
		document.getElementById("wikibar").style.left = "0px;"
	}
	document.getElementById("wikibar").style.left = "0px;"
}

unsafeWindow.hidewiki = function() {
	document.getElementById("wikibar").style.left = "-802px;"
}

vwikibar = document.createElement("div");
vwikibar.setAttribute("id", "wikibar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vwikibar);


var wkHTML = '<div id="wikitab" onmouseover="showwiki()" onclick="hidewiki()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:800px;position:absolute;top:0px;left:0px;height:30px;background:url(http://www.imgboot.com/images/enigmabrand/wikibarbgtop.gif);background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/55264/scripts">Wikibar v'+version+'</a></div>'
	+ '<div id="wikiframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaywiki()">Mouse over this area to load the wiki</div>'
	+ '<div style="width:800px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://www.imgboot.com/images/enigmabrand/wikibarbgbot.gif);background-repeat:no-repeat;"></div>';

GM_addStyle("#wikibar { background:url(http://www.imgboot.com/images/enigmabrand/wikibarbgmid.gif); padding-top:33px; width:800px; position:fixed; left:-802px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#wikibar:hover { left:0px; }");
GM_addStyle("#wikitab { background:url(http://www.imgboot.com/images/enigmabrand/tabwikibar.png); width:26px; height:100px; position:absolute; right:-26px; top:0px; } ");
GM_addStyle("#wikitab:hover { cursor: pointer; } ");

document.getElementById("wikibar").innerHTML = wkHTML;

///// End of script /////