// ==UserScript==
// @name           chat demons Bar
// @version        0.2
// @autor          demon on Nl. wereld 2 
// @description    chat openen voor demons.
// @include        http://s*.kingsage.nl/game.php*
// ==/UserScript==
// ===========================================================================

var version="0.2";
var displayedflag = 0;

unsafeWindow.displaywiki = function() {
	if(displayedflag == 0) {
		document.getElementById("wikiframe").innerHTML = '<iframe width="970" border="0" frameborder="0" height="100%" src="http://s295990375.onlinehome.fr/forum/chat/index.php" style="margin-left:26px;"></iframe>';
		displayedflag = 10;
	}
}

unsafeWindow.showwiki = function() {
	if(document.getElementById("wikibar").style.left == "-1000px")
	{
		document.getElementById("wikibar").style.left = "0px;"
	}
	document.getElementById("wikibar").style.left = "0px;"
}

unsafeWindow.hidewiki = function() {
	document.getElementById("wikibar").style.left = "-1000"
}

vwikibar = document.createElement("div");
vwikibar.setAttribute("id", "wikibar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vwikibar);


var wkHTML = '<div id="wikitab" onmouseover="showwiki()" onclick="hidewiki()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 15px; font-weight: bold;width:1000px;position:absolute;top:0px;left:0px;height:30px;background:url();">'
	+ '<a style="border-bottom: " href="http://s295990375.onlinehome.fr/forum/index.php" ><IMG SRC="http://s295990375.onlinehome.fr/images/buttonkachat.png" ALT="Kingsage chat" ></a></div>'
	+ '<div id="wikiframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaywiki()">Beweeg uw muis hier over om naar onze chat</div>'
	+ '<div style="width:100px;position:absolute;bottom:0px;left:0px;height:3px;background:url();background-repeat:no-repeat;"></div>';

GM_addStyle("#wikibar { background:url(http://paracaidistaspm.iespana.es/fondo%20negro.gif); padding-top:33px; width:1000px; position:fixed; left:-1002px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#wikibar:hover { left:0px; }");
GM_addStyle("#wikitab { background:url(http://s295990375.onlinehome.fr/images/chatkanl.png); width:25px; height:100px; position:absolute; right:-26px; top:0px; } ");
GM_addStyle("#wikitab:hover { cursor: pointer; } ");

document.getElementById("wikibar").innerHTML = wkHTML;

///// End of script /////