// Legendas.tv downloads diretos
// version b0.2
// 2011-11-11
// Copyright (c) 2009, Adail Horst
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Note that this may break some sites, and you may wish to add
// @exclude lines for specific sites.  If you don't know how to
// do that, this script is not for you.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ForceGet", and click Uninstall.
//
// Usei o script original do Joel Calado como base para criação deste. Ao inves de modificar a acao dos atalhos nos destaques,
// optei por usar a area de noticias superior como repositorio de um resumo de todos os detalhes com o link para download da
// legenda e link para pesquisa do torrent no isohunt dot com
// Espero que gostem, comentários para the.spaww@gmail.com
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Legendas.tv Downloads Diretos
// @namespace     http://spinola.net.br/blog
// @description   Ignorar o popup dos detalhes, donwload directo das legendas. Redefinicao da aba central de notiticias para aparecer link para pesquisa de torrents e download das legendas.
// @include       http://*legendas.tv*
// ==/UserScript==

if (typeof contentWindow != 'undefined') {
	unsafeWindow = contentWindow; // google chrome
} else if (typeof unsafeWindow != 'undefined') {
	// firefox
} else {
	unsafeWindow = window; // opera + safari?
}
//	alert(unsafeWindow);

var ss = document.createElement('script');
var scr = 'function abredown2(download) { window.location.href = "http://legendas.tv/info.php?c=1&d="+download; }';
var tt = document.createTextNode(scr);
ss.appendChild(tt);
var hh = document.getElementsByTagName('head')[0];
hh.appendChild(ss);


//unsafeWindow.abredown2 = 
unsafeWindow.gpop = function gpop(p1,p2,p3,p4,p5,p6,p7,p8,p9) {
return '<div class=\'pop\' style=\'background:#009999\'><h3>'+p1+'<br />'+p2+'</h3><p>'
+p3+'</p><ul><li><strong>AdailCds:</strong> '
+p4+'</li><li><strong>FPS:</strong> '+p5+'</li><li><strong>Tamanho:</strong> '+p6+'</li></ul><ul><li><strong>Downloads:</strong> '+p7+'</li><li><strong>'+p8+'</strong></li><li>'+p9+'</li></ul></div>';
}

function limpaElemento (elem) {
	var attributes = elem.attributes;
	var attrs = "";
	for (var i = 0; i < attributes.length; i++) {
		attrs += " " + attributes[i].name + "=\"" + attributes[i].value + "\"";
		if (attributes[i].name == "onclick") {
			vOnClick = attributes[i].value.replace("javascript:abredown(","javascript:abredown2(");
		} else
		if (attributes[i].name == "onmouseover") {
			vInfo = attributes[i].value.replace("escape(gpop(","[;]").replace("))","[;]").split("[;]")[1];			
		}
	}
	vInfo = vInfo.split("','");
	vDistro1 = vInfo[2];
	//<a title="Baixar este torrent" href="http://torrents.thepiratebay.org/6808455/Dexter_S06E06_HDTV_NL_Subs_DutchReleaseTeam.6808455.TPB.torrent"><img alt="Download" class="dl" src="http://static.thepiratebay.org/img/dl.gif"></a>
	texto = ""
	+"<a title=\"Baixar este torrent ("+vDistro1+")\" href=\"http://isohunt.com/torrents/?ihq="+vDistro1+"\" target=\"_blank\">"
	+'<img alt="Download" class="dl" src="http://static.thepiratebay.org/img/dl.gif"></a> '
	+ "<a href=\""+vOnClick+"\">"+
	'<img title="Baixar legenda." alt="Baixar Legenda." src="http://static.thepiratebay.org/img/icon_comment.gif">'
	+"</a> "
	+vInfo[8].replace("'","")
	+" - "+vInfo[0].replace("'","")
	+ "<br>"
	;//+vInfo;
//	texto = "<" + elem.tagName + attrs + ">" + elem.innerHTML + "</" + elem.tagName + ">";
}


var newdiv=unsafeWindow.document.createElement("div");
var newtext=unsafeWindow.document.createTextNode("");
newdiv.appendChild(newtext); //append text to new div
newdiv.setAttribute('id', 'MeuDivDestaque');
newdiv.setAttribute('style', 'height: 200px; width: 100%; overflow: auto; ');


unsafeWindow.document.getElementsByClassName("noticias")[1].innerHTML = "";    
unsafeWindow.document.getElementsByClassName("noticias")[1].appendChild(newdiv); //login

var elementos =  unsafeWindow.document.getElementsByClassName("Ldestaque");
//var elementos =  unsafeWindow.document.getElementsByClassName("Ldestaque");
//conteudodest
//var elem = elementos[0];


var texto = "oi";
var textoFull = "";

// Destaques
for (var i=20; i<elementos.length;i++) {
	limpaElemento(elementos[i]);
	textoFull += texto;
}
textoFull += "<div class=\"quebra\"></div>"
+'<table cellspacing="0" cellpadding="0" border="0" align="left" width="100%" bgcolor="silver"><tr><td width="123">'
+'<div align="center"><span class="style17">Mais baixados da semana</span></div></td></tr></table>'
;
// Top Semana
for (var i=0; i<20;i++) {
	limpaElemento(elementos[i]);
	textoFull += texto;
}




unsafeWindow.document.getElementById("MeuDivDestaque").innerHTML = textoFull;

//
// ChangeLog
// 2005-05-02 - 0.2 - Initial release.
