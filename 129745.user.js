// ==UserScript==
// @name           prueba02
// @authors        nico203
// @include        http://*managerzone.*
// ==/UserScript==


if(location == "http://*managerzone.*/?p=match&sub=*")
{
	function saltarPagina()
	{
		location = "http://managerzone.tn.com.ar/?p=match&sub=played&hidescore=1";
	}
	var boton = document.createElement("button");
	boton.value = "Parar";
	boton.innerHTML= "Estadísticas de Partidos";
	boton.addEventListener("click",function() {saltarPagina()},false);
	var ins = document.getElementsById('contentDiv');
	ins.parentNode.insertBefore(boton, ins);
}