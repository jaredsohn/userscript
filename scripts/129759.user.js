// ==UserScript==
// @name           prueba-v08
// @authors        nico203
// @include        http://*managerzone.*
// ==/UserScript==


function saltarPagina()
{
	location = "http://managerzone.tn.com.ar/?p=statistics";
}
  
var boton = document.createElement("button");
boton.value = "Parar";
boton.innerHTML= "Estadísticas de Partidos";
boton.addEventListener("click",function() {saltarPagina()},false);
var ins = document.getElementById('contentDiv');
ins.parentNode.insertBefore(boton, ins);

var exp = /(http:\/\/)*managerzone\.*\/?p=match&sub=*
var texto = 'Direcion: ' + location + '\n';
if(location.match(exp))
	texto = texto + 'si';
else
	texto = texto + 'no';
alert(texto);