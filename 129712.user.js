// ==UserScript==
// @name           prueba
// @authors        nico203
// @include        http://*managerzone.*
// ==/UserScript==


function saltarPagina()
{
    location = "http://managerzone.tn.com.ar/?p=match&sub=played&hidescore=1";
}
  
var boton = document.createElement("button");
boton.value = "Parar";
boton.innerHTML= "Ir a la Pagina";
boton.addEventListener("click",function() {saltarPagina()},false);
document.body.appendChild(boton);