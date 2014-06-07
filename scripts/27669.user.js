// ==UserScript==
// @name           Ikariam Acceso Directo / ShortCut
// @namespace      Pnia
// @description    Inicia sesión automáticamente en ikariam / Autologin in Ikariam
// @include        http://www.ikariam.*/*
// ==/UserScript==

// Este script inicia sesión automáticamente en Ikariam
// cuando escribes en la ruta del explorador
// http://www.ikariam.*/?m=[MUNDO]&u=[USUARIO]&p=[CONTRASEÑA]
// Los parámetros diferencian entre mayúsculas y minúsculas
// Ahora puedes crear un acceso directo en el escritorio para iniciar sesión.
// Ejemplo:
// http://www.ikariam.es/?m=Delta&u=james&p=bond
// http://www.ikariam.es/?m=Alpah&u=Peter&p=Petrelli

// This script automatically logs you into your Ikariam 
// server when yo type in de address bar
// http://www.ikariam.*/?m=[SERVER]&u=[USER]&p=[PASS]
// Note that params are case sensitive.
// Now you can make a shortcut in desktop to login in Ikariam.
// Examples:
// http://www.ikariam.de/?m=Zeta&u=John&p=Doe
// http://www.ikariam.com/?m=Gamma&u=Michael&p=Scofield
//=====================================================================

//Definimos las variables necesarias
var m='';
var u='';
var p='';

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

m=unescape(m);
u=unescape(u);
p=unescape(p);

var sel=document.getElementById('universe');
for (i=0;i<sel.options.length && sel;i++){
	var option=sel.options[i];
	if(option.text==m){
		document.getElementById('login').value=u;
		document.getElementById('pwd').value=p;
    	var url = "http://" + option.value + "/index.php?action=loginAvatar&function=login";
		document.getElementById('loginForm').action = url;		
		document.getElementById('loginForm').submit();		
		break;
	}
}
