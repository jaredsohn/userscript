// ==UserScript==
// @name           probando la musica
// @version        0.1
// @autor          henche
// @description    Ikariam Song
// @include        http://s*.ikariam.*/index.php*
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
		document.getElementById("wikiframe").innerHTML = '   <center><p style="visibility:visible;"><object type="application/x-shockwave-flash" data="http://assets.myflashfetish.com/swf/mp3/mff-stick.swf" height="35" width="219" style="width:219px;height:35px"><param name="movie" value="http://assets.myflashfetish.com/swf/mp3/mff-stick.swf" /><param name="quality" value="high" /><param name="scale" value="noscale" /><param name="salign" value="TL" /><param name="wmode" value="transparent"/><param name="flashvars" value="myid=18721753&path=2009/02/22&mycolor=111111&mycolor2=99CCCC&mycolor3=FFFFFF&autoplay=true&rand=0&f=4&vol=100&pat=11&grad=false&ow=219&oh=35"/></object><br><a href="http://www.myflashfetish.com/playlist/18721753" target="_blank"><img src="" title="" style="border-style:none;" alt=""></a><a href="http://www.mixpod.com" target="_blank"><img src="" title="" style="border-style:none;" alt="Playlist"></a><br /><a href="http://mixpod.com"></a><a href="http://mixpod.com"></a></p></center><img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://counters.gigya.com/wildfire/IMP/CXNID=2000002.11NXC/bT*xJmx*PTEyMzUzMTEyNTI*NjImcHQ9MTIzNTMxMTI1NDMxNiZwPTE4MDMxJmQ9Jmc9MSZ*PQ==.gif" />';
		displayedflag = 1;
	}
}

unsafeWindow.showwiki = function() {
	if(document.getElementById("wikibar").style.left == "-300px")
	{
		document.getElementById("wikibar").style.left = "0px;"
	}
	document.getElementById("wikibar").style.left = "0px;"
}

unsafeWindow.hidewiki = function() {
	document.getElementById("wikibar").style.left = "-300"
}

vwikibar = document.createElement("div");
vwikibar.setAttribute("id", "wikibar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vwikibar);


var wkHTML = '<div id="wikitab" onmouseover="showwiki()" onclick="hidewiki()"><a style="height:100px;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 15px; font-weight: bold;width:300px;position:absolute;top:0px;left:0px;height:30px;background:url(http://ikariam80.net23.net/imagenes/scripts/ForoBar/forobar-cartel.gif);">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://descarga-barraikariam.tk">Musica Ikariam</a></div>'
	+ '<div id="wikiframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaywiki()">Mueve el raton por aquí para cargar el reproductor</div>'
	+ '<div style="width:100px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://ikariam80.net23.net/imagenes/scripts/ForoBar/forobar-juntas.gif);background-repeat:no-repeat;"></div>';

GM_addStyle("#wikibar { background:url(http://ikariam80.net23.net/imagenes/scripts/ForoBar/forobar-fondo.jpg); padding-top:33px; width:300px; position:fixed; left:-300px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#wikibar:hover { left:0px; }");
GM_addStyle("#wikitab { background:url(http://ikariam80.net23.net/imagenes/scripts/ForoBar/forobar-boton.png); width:26px; height:100px; position:absolute; right:-26px; top:0px; } ");
GM_addStyle("#wikitab:hover { cursor: pointer; } ");

document.getElementById("wikibar").innerHTML = wkHTML;

///// End of script /////