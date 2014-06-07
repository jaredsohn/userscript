// ==UserScript==
// @name           Destuenti 2.0
// @namespace      -
// @description    Para descargar fotos del tuenti. Pulsar el botón "Descargar" arriba a la derecha en la página de la foto.
// @include        http:/*.tuenti.com/*
// ==/UserScript==
if(document.getElementsByTagName("body")[0] != null)
{
	if(document.getElementsByTagName("body")[0].innerHTML.indexOf("Gente")!=-1)
	{
		var i=0;
		alert("No aceptes hasta que Tuenti haya cargado.");
		var botones = document.getElementById("tab_home").parentNode.parentNode;
		if(botones !=null)
		{
			var boton = document.createElement("input");
			boton.setAttribute("type","button");
			boton.setAttribute("value","Descargar");
			boton.setAttribute("class","send inline");
			boton.setAttribute("onclick","if(document.getElementById(\"photo_image\")!=null) \n	window.open(document.getElementById(\"photo_image\").getAttribute(\"src\"),\"Foto\");");
			document.getElementById("tab_home").parentNode.parentNode.appendChild(boton);
		}
	}
}