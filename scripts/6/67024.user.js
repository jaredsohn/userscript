// ==UserScript==
// @name        Uploading.com redirector
// @namespace   http://uploading.com/
// @description Auto click, redirect
// @include     http://uploading.com/files/*
// @include     http://www.uploading.com/files/*
// @copyright   2010, Perberos (perberos@gmail.com)
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version     1.0
// @author      German Perugorria (Perberos)
// @homepage    http://matsusoft.com.ar/
// ==/UserScript==

// para el boton de "Free Download"
var obj = document.getElementsByTagName('button');

for (var i = obj.length - 1; i >= 0; i--)
{
	if (obj[i].type && obj[i].type == 'button')
	{
		if (obj[i].className != 'blue')
		{
			obj[i].click();
		}
	}
}

function superfunction()
{
	if (timer_count == undefined)
		return;
	// buscamos el enlace de descarga.
	var obj = document.getElementById('waitblock');

	if (obj.onclick == undefined)
	{
		document.title = "Still " + (timer_count + 1) + " seconds";
		setTimeout("superfunction();", 500);
		return;
	}

	document.title = 'Done';
	obj.click();
}

/* Ephiphany method working
window.addEventListener("load", superfunction, false);
*/

// Attach hack method
var obj = document.createElement("script");
obj.type = "application/javascript";
obj.innerHTML = superfunction+'superfunction();';
document.body.appendChild(obj);
