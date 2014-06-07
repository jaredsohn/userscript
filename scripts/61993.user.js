// ==UserScript==
// @name           Shoutbox immer da mit Mousover effekt für pennergame 4.0 Hamburg und Berlin
// @description    Zeigt die Shotbox an sobals man mit der maus rueber geht fuer Hamburg und Berlin
// @include        *pennergame.de*
// @exclude        *pennergame.de/gang/*
// ==/UserScript==
// ===========================================================================

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var pgurl = 'http://berlin.pennergame.de/';
};
if(document.location.href.indexOf('www.pennergame.de/')>=0) {
var pgurl = 'http://www.pennergame.de/';
};


var version="0.1";
var displayedflag = 0;

unsafeWindow.displaywiki = function() {
	if(displayedflag == 0) {
		document.getElementById("wikiframe").innerHTML = '<iframe width="600"   height="100%" src="'+pgurl+'gang/" style="margin-left:2px;"></iframe>';
		displayedflag = 1;
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
	+ '<div style="color:yellow;line-height: 35px; font-size: 15px; font-weight: bold;width:1000px;position:absolute;top:0px;left:0px;height:30px;background:url();">'
	+ '<a style="border-bottom:1px green dotted; color: #542C0F;" href="http://www.pennerhack.foren-city.de">Bastis Page</a></div>'
	+ '<div id="wikiframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaywiki()">Die Shoutbox wird geladen</div>'
	+ '<div style="width:100px;position:absolute;bottom:0px;left:0px;height:3px;background:url();background-repeat:no-repeat;"></div>';

GM_addStyle("#wikibar { background:url(http://pennertips.bplaced.net/filemanager/Bilder/Pennergame/fondo negro.gif); padding-top:33px; width:600px; position:fixed; left:-1015px; top:0px; bottom:50px; border:10px blue solid; z-index:50;");
GM_addStyle("#wikibar:hover { left:0px; }");
GM_addStyle("#wikitab { background:url(http://www.fotos-hochladen.net/shoutboxbanner084ihb62.jpg); width:26px; height:220px; position:absolute; right:-440px; top:0px; } ");
GM_addStyle("#wikitab:hover { cursor: pointer; } ");

document.getElementById("wikibar").innerHTML = wkHTML;

//Copiright by Basti1012
//Fuer Hamburg und Berlin by Boggler