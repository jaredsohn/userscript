// ==UserScript==
// @name           Ogame Acceso Directo v2
// @author	  Pnia
// @description   Permite iniciar sesión directamente desde un acceso directo de windows (por ejemplo en el escritorio) a ogame.
// @include        http://*ogame*/home.php
// @include        http://*ogame*/game/reg/login2.php*
// @include        http://*ogame*/game/index.php*crearframes*
// ==/UserScript==
if(document.baseURI.indexOf("login2.php") != -1) {
   var nodo = document.evaluate("//meta", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   var url = nodo.getAttribute('content');
   //Obtnemos el ID de session y la tabla de opciones.
   var sessionID = url.substr(url.indexOf("session=") + 8,12);
   var universo = document.baseURI.match(/\w+.{3}(\w+.){3,4}/)[0];
   parent.location = universo + "game/index.php?page=overview&session=" + sessionID + "&crearframes";
   setTimeout(CrearFrames, 1000);
}

//Definimos las variables necesarias
var uni=0;
var nombre='';
var clave='';

//Separamos los parametros
var ruta=String(parent.location);
var cadparametros = ruta.substring(ruta.indexOf('?')+1,ruta.length);
//en una de las posiciones del array
var arrParametros=cadparametros.split('&');

//Recorremos el array de parametros evaluando cada uno de los pares variable=valor
for (var i=0;i<arrParametros.length;i++){
    eval(arrParametros[i].substring(0,arrParametros[i].indexOf('=')+1)+"\""+
    arrParametros[i].substring(arrParametros[i].indexOf('=')+1,arrParametros
     [i].length)+"\"");
}
uni=unescape(uni);
nombre=unescape(nombre);
clave=unescape(clave);
if(isNaN(uni))
	uni=0;
if (location.pathname =='/home.php'){
	try{
		if(uni!=0 && nombre!='' && clave !=''){
			document.getElementsByName('login')[0].value=nombre;
			document.getElementsByName('pass')[0].value=clave;
			var url = "http://uni" + uni + ".ogame.com.es/game/reg/login2.php";
			document.forms[0].action = url;
			document.forms[0].submit();
		}
	}catch(e){}
}
if(document.baseURI.indexOf("crearframes") != -1) {
	var sessionID = document.baseURI.substr(document.baseURI.indexOf("session=") + 8,12);
	var universo = document.baseURI.match(/\w+.{3}(\w+.){3,4}/)[0];
	frameset = document.createElement("FRAMESET");
	frameset.setAttribute("rows", "*");
	frameset.setAttribute("frameborder", "0");
	frameset.setAttribute("framespacing", "0");
	var frame = document.createElement("FRAME");
	frame.setAttribute("frameborder", "0");
	frame.setAttribute("scrolling", "auto");
	frame.setAttribute("target", "_blank");
	frame.setAttribute("src", universo + "game/index.php?page=overview&session=" + sessionID);
	frameset.appendChild(frame);
	document.body = frameset;
}
