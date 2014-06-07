// ==UserScript==
// @name        Depositfiles redirector
// @namespace   http://depositfiles.com/
// @description Auto click, redirect
// @include     http://depositfiles.com/*/files/*
// @include     http://www.depositfiles.com/*/files/*
// @copyright   2009, Perberos (perberos@gmail.com)
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version     1.0
// @author      German Perugorria (Perberos)
// @homepage    http://matsusoft.com.ar/
// ==/UserScript==

// para el boton de "Descargar GRATIS"
var obj = document.getElementsByTagName('form');

for (var i = obj.length - 1; i >= 0; i--)
{
	if (obj[i].innerHTML.indexOf('gateway_result') != -1)
	{
		obj[i].submit();
	}
}

// para un intervalo hasta que se habilite de nuevo
var obj = document.getElementsByTagName('span');

for (var i = obj.length - 1; i >= 0; i--)
{
	if (obj[i].className == 'html_download_api-limit_interval')
	{
		setTimeout("location.href=location.href;", obj[i].innerHTML * 1000);
	}
}


function superfunction()
{
	// buscamos el enlace de descarga.
	var obj = document.getElementById('download_waiter_remain');

	if (!obj)
		return;

	if (obj.innerHTML != '0' && obj.innerHTML != '1')
	{
		document.title = "Still " + (obj.innerHTML) + " seconds";
		setTimeout("superfunction();", 500);
		return;
	}

	document.title = 'Done';

	var obj = document.getElementById('download_url');

	if (!obj)
		return;

	// hacemos submit!
	obj.submit();
}

/* Ephiphany method working
window.addEventListener("load", superfunction, false);
*/

// Attach hack method
var obj = document.createElement("script");
obj.type = "application/javascript";
obj.innerHTML = superfunction+'superfunction();';
document.body.appendChild(obj);
