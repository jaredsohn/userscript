// ==UserScript==
// @name           destuenti
// @namespace      dd
// @description    d
// @include        http://*.tuenti.com/*
// ==/UserScript==

function encontrar(texto)
{
	if(texto.indexOf("photo_image")!=-1)
	{
		empieza=texto.indexOf("photo_image")+18;
		if(texto.indexOf(".0.jpg")!=-1)
		{
			termina=texto.indexOf(".0.jpg");
			return texto.substring(empieza,termina)+".0.jpg";
		}
		else
			return false;
	}
	else
		return false;
	
}

texto=encontrar(document.getElementsByTagName("body")[0].innerHTML);
if(texto.indexOf("false")==-1)
	alert(texto);