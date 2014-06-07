// ==UserScript==
// @name           Barra Wildguns Forobar
// @version        0.2
// @autor          henche (Barra Ikariam)
// @description    Foro Barra Wildguns que se despliega en el juego
// @include        http://s*.wildguns.*/user.php*
// ==/UserScript==
// ===========================================================================

//
// This extension was made by EnigmaBrand.
// Ikariam and WikIkariam are copyrighted by their respective owners.
//

var version="0.1";
var displayedflag = 0;

unsafeWindow.displaywiki = function() {
	if(displayedflag == 0) {
		document.getElementById("wikiframe").innerHTML = '<iframe width="920" border="0" frameborder="0" height="100%" src="http://www.barrawildguns.tk" style="margin-left:26px;"></iframe>';
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
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 15px; font-weight: bold;width:1000px;position:absolute;top:0px;left:0px;height:30px;background:url(http://ikariam80.net23.net/imagenes/scripts/ForoBar/forobar-cartel.gif);">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://descarga-barraikariam.tk">Barra Wildguns ForoBar</a></div>'
	+ '<div id="wikiframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaywiki()">Mueve el raton por aquí para cargar el foro</div>'
	+ '<div style="width:100px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://ikariam80.net23.net/imagenes/scripts/ForoBar/forobar-juntas.gif);background-repeat:no-repeat;"></div>';

GM_addStyle("#wikibar { background:url(http://ikariam80.net23.net/imagenes/scripts/ForoBar/forobar-fondo.gif); padding-top:33px; width:1000px; position:fixed; left:-1002px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#wikibar:hover { left:0px; }");
GM_addStyle("#wikitab { background:url(http://ikariam80.net23.net/imagenes/scripts/ForoBar/forobar-boton.png); width:26px; height:100px; position:absolute; right:-26px; top:0px; } ");
GM_addStyle("#wikitab:hover { cursor: pointer; } ");

document.getElementById("wikibar").innerHTML = wkHTML;

///// End of script /////