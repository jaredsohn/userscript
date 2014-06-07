// ==UserScript==
// @name           télécharger coolrom.com
// @author         Daniel Jibouleau
// @namespace      http://www.example.com/
// @description    Ajoute un bouton "Télécharger" dans la liste des roms
// @include        http://www.coolrom.com/roms/*
// ==/UserScript==

var sid = readCookie("PHPSESSID");

var divs = document.getElementsByTagName('div');

for (var i = 0; i < divs.length; i ++)
{
	if (divs[i].class = "AdsBy") 
	{
		if (divs[i].nextSibling.nextSibling.nodeName == "script")
		{
			divs[i].parentNode.removeChild(divs[i].nextSibling.nextSibling);
		}
		
		divs[i].parentNode.removeChild(divs[i]);
	}
}

var links = document.getElementsByTagName('a');
var regex = new RegExp("http://www.coolrom.com/roms/\\w+\/(\\d+)/.+.\php");

for (var i = 0; i < links.length; i ++)
{
	arr = regex.exec(links[i].href);
	
	if (arr != null) 
	{
		var form = document.createElement("form");
		form.method = "POST";
		form.action = "http://dl.coolrom.com/dl.php?" + arr[1];
		
		var hid = document.createElement("input");
		hid.type = "hidden";
		hid.name = "sid"
		hid.value = sid;
		form.appendChild(hid);
		
		var btn = document.createElement("input");
		btn.type = "submit";
		btn.value = "Télécharger";
		form.appendChild(btn);
		
		links[i].parentNode.insertBefore(form, links[i].nextSibling);
	}
}


function readCookie(s)
{
	var regexp = new RegExp(s + "=([^;]*)");
	var arr = regexp.exec(document.cookie);
	return arr[1];
}
