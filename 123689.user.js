// ==UserScript==
// @name           Boerse BZ Spoilering
// @namespace      johann638
// @description    Alle Spoiler umschalten auf Boerse.bz
// @include        http://www.boerse.bz/*
// @version        2
// @grant          none
// ==/UserScript==

var spoilerlink = document.createElement("td");
spoilerlink.innerHTML = "Spoiler&nbsp;umschalten";
spoilerlink.style.cursor = "pointer";
spoilerlink.setAttribute('class','tcat');
spoilerlink.addEventListener('click',umschalten,false);

var header = document.getElementById('toolbar-wrap').getElementsByTagName('tr')[0];

header.insertBefore(spoilerlink,header.getElementsByTagName('td')[1]);

function umschalten()
{
    var elements = document.getElementsByClassName("wrap-spoiler");
	for(var i = 0;i<elements.length;i++)
	{ 
    	spoiler(elements[i]);
	}
}