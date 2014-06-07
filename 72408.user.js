// ==UserScript==
// @name           اعداد تركي-The preparation of Turki
// @version        New
// @namespace      allieswar-And Open
// @description    ترجمه النصوص-Translation of texts
// @include        http://test.allieswar.com/Game/Inbox.aspx*
// @include        http://test.allieswar.com/Game/Premium.aspx*
// @include        http://test.allieswar.com/Game/NewMessage.aspx*
// @include        http://b*.allieswar.com/Game/Inbox.aspx*
// @include        http://b*.allieswar.com/Game/Premium.aspx*
// @include        http://b*.allieswar.com/Game/NewMessage.aspx*
// @include        http://www.*
 // @include       http://com*
// ==/UserScript==
// ===========================================================================

//
// 
//

var version="100%";
var displayedflag = 0;

unsafeWindow.displaywiki = function() {
	if(displayedflag == 0) {
		document.getElementById("wikiframe").innerHTML = '<iframe width="764" border="0" frameborder="0" height="100%" src="http://translate.google.com./#auto|en|" style="margin-left:26px;"></iframe>';
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
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:800px;position:absolute;top:0px;left:0px;height:30px;background:url(ttp://ae1.tribalwars.ae/graphic/background/content.jpg);background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="">'+version+'</a></div>'
	+ '<div id="wikiframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaywiki()">Mouse over this area to load the wiki</div>'
	+ '<div style="width:800px;position:absolute;bottom:0px;left:0px;height:3px;background:url(ttp://ae1.tribalwars.ae/graphic/background/content.jpg);background-repeat:no-repeat;"></div>';

GM_addStyle("#wikibar { background:url(http://ae1.tribalwars.ae/graphic/background/content.jpg); padding-top:33px; width:800px; position:fixed; left:-802px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#wikibar:hover { left:0px; }");
GM_addStyle("#wikitab { background:url(http://img717.imageshack.us/img717/4352/351431020002.jpg); width:90px; height:80px; position:absolute; right:-90px; top:0px; } ");
GM_addStyle("#wikitab:hover { cursor: pointer; } ");

document.getElementById("wikibar").innerHTML = wkHTML;

///// End of script /////