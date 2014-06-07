// ==UserScript==
// @name           Ogame Limpia vision General y Menu para la version 0.76c
// @namespace      wolfieland
// @description    Ogame Limpia vision General y Menu, y agrega un menu extra para que pongas tu propia pagina de tu propio foro, para hacerlo, solo necesitas cambiar el valor de la variable "foro" y poner el enlace de tu propia pagina asi mismo el titulo de tu foro.
// @include        http://*/game/overview.php*
// @include        http://*/game/leftmenu.php*
// ==/UserScript==

if (String(window.location).indexOf("overview", 0) >= 0)
{
	var obj = document.getElementById("combox_container");
	if (obj)
		obj.parentNode.removeChild(obj);
}
else
{
	var td = document.getElementsByTagName('td');
	for (var i = 0; i < td.length; i++) {
		if (td[i].innerHTML.indexOf("Info Comandante", 0) >= 0
		||  td[i].innerHTML.indexOf("Casino de los Oficiales", 0) >= 0)
			td[i].parentNode.removeChild(td[i]);
		if (td[i].innerHTML.indexOf("Foro", 0) >= 0)
		{
			var foro='http://tupaginadeforo.com';
			var title="El nombre de tu foro";
			var link=document.createElement("a");
			var contentsNode=document.createTextNode(title);

			link.setAttribute("title",title);
			link.setAttribute("href",foro);
			link.setAttribute("target","new");
			link.appendChild(contentsNode);

			td[i].appendChild(link);
			td[i].setAttribute("align",'center');
		}
			
	}
}