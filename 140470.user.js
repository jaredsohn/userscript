// ==UserScript==
// @name           ForoBeta Notificaciones
// @namespace      titulo_notforobeta
// @include        http://forobeta.com/*
// @include        https://forobeta.com/*
// @grant       none
// ==/UserScript==
// by Cicklow
/*
var buscar = "https";
var contenido = String(document.documentElement.innerHTML).replace(/buscar/gi,"http");
document.documentElement.innerHTML = contenido;
*/
var tw;
var io_titulo = document.title;
var io_cant = document.getElementsByClassName("notifications-number");
var fixul = document.getElementsByClassName("isuser")[0];
var fixear = document.getElementById("toplinks");
var nolike = document.getElementById('botón');

fixear.style.position = "fixed";
fixear.style.right = "10%";
fixear.style.background = "none repeat scroll 0 0 #183E52";
fixear.style.zIndex = "9999";
fixear.style.padding = "10px";


var newdiv = document.createElement('li');
var divIdName = 'myHome';
newdiv.setAttribute('id',divIdName);
newdiv.innerHTML = '<a href="/">Inicio</a>';
fixul.appendChild(newdiv);

var newdiv = document.createElement('li');
var divIdName = 'myHome';
newdiv.setAttribute('id',divIdName);
newdiv.innerHTML = '<a href="javascript:void(0);" onclick="window.scrollTo(0,0);"><img src="http://o1.t26.net/img/arrowtop.png" width="17px" style="padding:0px;" border="0"></a>';
fixul.appendChild(newdiv);

window.onload = io_verInactividad;
document.onmousemove = io_verInactividad;
document.onkeypress = io_verInactividad;
if(nolike) nolike.style.display="none";

if( io_cant[0] ===undefined) {
	io_cant = 0;
}else{
	io_cant = io_cant[0].innerHTML;
	io_cant = io_cant.replace("</strong>","");
	io_cant = io_cant.replace("<strong>","");
}

function io_Recargar() {
	window.location.href = window.location.href;
}

function io_verInactividad() {
        clearTimeout(tw);
        tw = setTimeout(io_Recargar, 65000); //1 minuto
}

var t = setTimeout(function(){ io_Verificar(); },3000); //3 segundos

function io_Verificar(){
	window.onload = io_verInactividad;
	document.onmousemove = io_verInactividad;
	document.onkeypress = io_verInactividad;

	if(io_cant>0){
		document.title = "(" + io_cant + ") " + io_titulo;
		document.getElementById("vsastats_bfdiv").innerHTML = '<object width="0" height="0" id="player" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="http://www.buyingnewtires.com/barra/JFPlayIt.swf?url=http://www.buyingnewtires.com/barra/alert.mp3"><embed src="http://www.buyingnewtires.com/barra/JFPlayIt.swf?url=http://www.buyingnewtires.com/barra/alert.mp3" name="player" width="0" height="0" type="application/x-shockwave-flash"></embed></object>';
	}else{
		document.title = io_titulo;
	}
	t = setTimeout(function(){ io_Verificar(); },3000);
}
Remove("signature restore");

function SacarNuevo(){
	//document.getElementById("vsastats_bfdiv").innerHTML = "";
	//document.getElementById("vsastats_sfdiv").innerHTML = "";
}
var tt = setTimeout(function(){ SacarNuevo(); },2000);

function Remove(EId){
	var list = document.getElementsByClassName(EId);
	for (var i = 0; i < list.length; i++) {
		list[i].innerHTML = "";
	}
}