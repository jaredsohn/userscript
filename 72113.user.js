// ==UserScript==
// @name        MediaFire redirector
// @namespace   http://www.mediafire.com/
// @description Auto click, redirect
// @include     http://mediafire.com/*
// @include     http://*.mediafire.com/*
// @copyright   2010, Perberos (perberos@gmail.com)
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version     1.0
// @author      German Perugorria (Perberos)
// @homepage    http://matsusoft.com.ar/
// ==/UserScript==

function superfunction()
{
	var link = document.getElementById("download_link");
	
	if (!link)
		return;
		
	if (link.innerHTML.indexOf("Preparing download...") != -1)
	{
		document.title = "Preparing...";
		// agregamos un timeout para volver a comprobar el estado
		setTimeout("superfunction();", 500);
		return;
	}
	
	if (link.innerHTML.indexOf("Click here to start download") != -1)
	{
		var div = link.parentNode.getElementsByTagName("div");
		
		for (var i = div.length - 1; i > 0; i--)
		{
			if (div[i].style["display"] == "block")
			{
				document.title = 'Done';
				// el link esta en un a.href
				var a = div[i].getElementsByTagName("a")[0];
				location.href = a.href;
			}
		}
	}
}

/* Ephiphany method working
window.addEventListener("load", superfunction, false);
*/

// Attach hack method
var obj = document.createElement("script");
obj.type = "application/javascript";
obj.innerHTML = superfunction+'superfunction();';
document.body.appendChild(obj);
