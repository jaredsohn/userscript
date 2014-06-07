// ==UserScript==
// @name           pruebaasa
// @authors        nico203
// @include        http://*managerzone.*
// ==/UserScript==



function saltarPagina()
{
    location = "http://managerzone.tn.com.ar/?p=match&sub=played&hidescore=1";
}
var boton = document.createElement("button");
boton.value = "Parar";
boton.innerHTML= "Estadísticas de Partidos";
boton.addEventListener("click",function() {saltarPagina()},false);
var ins = document.getElementsByName('selectTypeForm');
ins.parentNode.insertBefore(boton, ins);