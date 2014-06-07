// ==UserScript==
// @name           The West_-_Reduire
// @namespace      http://userscripts.org/scripts/show/96376
// @description    Permet de Reduire toutes les fenetres du jeu
// @copyright      Hack.Crows/ryuuku
// @author         Hack.Crows
// @website        http://selim.oguz.free.fr/
// @include        http://*.the-west.*/game.php*
// @include        http://userscripts.org/scripts/source/96376.meta.js
// @exclude        http://forum.the-west.fr/*
// @exclude        http://wiki.the-west.fr/*
// @version        1.00
// ==/UserScript==

var minimizeall = document.createElement('script');
document.getElementsByTagName('head')[0].appendChild(minimizeall);

function aKeyIsPressed(e) 
{
	var key = e.keyCode;

	if (key == 113)
	{
		for (var i=0; i<document.getElementById('windows').childNodes.length; i++)
		{
			if (document.getElementById('windows').childNodes[i].style.display != "none") 
			{
				var winId = document.getElementById('windows').childNodes[i].id.substr(7);
				var type = document.getElementById('windows').childNodes[i].className.substr(11);

				document.location.href = "javascript:AjaxWindow.toggleSize(\'" + winId + "\', \'"+ type + "\');"
			}
		}
	}
}	

document.addEventListener('keydown', aKeyIsPressed, true);