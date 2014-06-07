// ==UserScript==
// @name           Limpieza Total
// @namespace      limpiezatotal
// @description    Botón para alcanzar el 100% de higiene
// @include        http://*mendigogame.es/*
// @exclude 	   http://newboard.mendigogame.es/*
// ==/UserScript==


var div = document.getElementById('infoscreen');
var navi = div.getElementsByTagName('li')[6];

var exit = navi.getElementsByTagName('input')[0];
exit.value = 'Exit';

var fbutton = document.createElement("input");
fbutton.type = 'button';
fbutton.value = '$';
fbutton.addEventListener('click', fclick, false);

navi.appendChild(fbutton);

function fclick(ev) 
{	
	GM_setValue("limpiar","true");
	top.location.href= '/city/washhouse/';
}

if (GM_getValue("limpiar") == "true") {		
	GM_setValue("limpiar", "false");		
	var content = document.getElementById("content");
	var form = content.getElementsByTagName("form")[1];
	form.submit();
}