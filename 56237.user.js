// ==UserScript==
// @name        zSHARE redirector
// @namespace   http://zshare.com/
// @description Auto click, redirect
// @include     http://zshare.net/download/*
// @include     http://www.zshare.net/download/*
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
	if (obj[i].innerHTML.indexOf('id="download"') != -1)
	{
		obj[i].submit();
	}
}

function superfunction()
{
	if (time == undefined)
		return;

	// buscamos el enlace de descarga.
	var obj = document.getElementById('download');

	if (obj.innerHTML.indexOf('start();') == -1)
	{
		document.title = "Still " + (time + 1) + " seconds";
		setTimeout("superfunction();", 500);
		return;
	}

	document.title = 'Done';

	// hacemos submit!
	location = link_enc.join('');
}

/* Ephiphany method working
window.addEventListener("load", superfunction, false);
*/

// Attach hack method
var obj = document.createElement("script");
obj.type = "application/javascript";
obj.innerHTML = superfunction+'superfunction();';
document.body.appendChild(obj);
