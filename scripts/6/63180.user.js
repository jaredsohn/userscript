// ==UserScript==
// @name           Forum Kingsage Bar
// @version        0.1
// @autor          nederland GO wereld 1 & 2 
// @description    Forum openen in kingsage.
// @include        http://s*.kingsage.nl/game.php*
// ==/UserScript==
// ===========================================================================

var version="0.1";
var displayedflag = 0;

unsafeWindow.displaywiki = function() {
	if(displayedflag == 0) {
		document.getElementById("wikiframe").innerHTML = '<iframe width="970" border="0" frameborder="0" height="100%" src="http://board.kingsage.nl/" style="margin-left:26px;"></iframe>';
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
	+ '<a style="border-bottom: " href="http://board.kingsage.nl/" ><IMG SRC="http://img109.imageshack.us/img109/5695/buttonkaforum.png" ALT="Kingsage Forum" ></a></div>'
	+ '<div id="wikiframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaywiki()">Beweeg uw muis hier over om naar het forum</div>'
	+ '<div style="width:100px;position:absolute;bottom:0px;left:0px;height:3px;background:url();background-repeat:no-repeat;"></div>';

GM_addStyle("#wikibar { background:url(http://paracaidistaspm.iespana.es/fondo%20negro.gif); padding-top:33px; width:1000px; position:fixed; left:-1002px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#wikibar:hover { left:0px; }");
GM_addStyle("#wikitab { background:url(http://img44.imageshack.us/img44/2002/forumkanl.png); width:25px; height:100px; position:absolute; right:-26px; top:0px; } ");
GM_addStyle("#wikitab:hover { cursor: pointer; } ");

document.getElementById("wikibar").innerHTML = wkHTML;

///// End of script /////