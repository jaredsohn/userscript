// ==UserScript==
// @name           Kronos MCAnime - Ultimas publicaciones v2
// @namespace      Jocolocogoco 
// @description    Coloca las ultimas publicaciones al estilo del viejo MCAnime | Responsive, adaptable al acho del screen + actividades recientes centrado
// @include        http://kronos.mcanime.net/
// ==/UserScript==

var style="#sidebar { display:none !important } #wrapper { max-width:960px; width:98% !important; } #iconbar { width:635px; margin:10px auto} #tab-menu { width:635px; margin:0 auto} div#content { float:none !important; margin:0 auto} #recientes { width:98%; max-width:1280px; margin:10px auto; border: 2px solid maroon; padding:1px; background-color: white; } #recientes .series-releases {padding:5px !Important;} .anime-releases a {color:gray;} .manga-releases a {color:gray;} #recientes h4 {display:none} #recientes .series-releases div {padding:0px !important;} #recientes .series-releases .notify {display:none !important;}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);

var t = document.getElementById("top");
var w = document.getElementById("wrapper");

function getPublicaciones() {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://kronos.mcanime.net/publicaciones/todas/",
        onload: function(xhr) { 
					hide();
					inform(xhr.responseText) 
				}
    })
}

function hide() {
	var sb = document.getElementById("sidebar");
	sb.parentNode.removeChild(sb);
}

function inform(resp) {
	var publ = document.createElement("div");
	publ.id = 'recientes';
	publ.innerHTML = resp;
	var body = document.getElementsByTagName("body")[0];
	body.insertBefore(publ, w);
}

getPublicaciones();