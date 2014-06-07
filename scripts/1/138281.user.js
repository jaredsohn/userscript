// ==UserScript==
// @name           IgnoreIsida
// @namespace      IgnoreIsida
// @include        http://forum.gaijin.ru/*
// @decription     Ignore messages from Isida (moderator of forum.gaijin.ru) because i don't like hers
// ==/UserScript==

elementList = document.querySelectorAll(".post_block");

ignored = 0;

for (var i=0; i<elementList.length; i++)
{
	linkObj = elementList[i].getElementsByTagName('div')[0].getElementsByTagName('h3')[0].getElementsByTagName('span');
	if (linkObj[2].innerHTML == 'ISIDA')
	{
		ignored++;
		elementList[i].innerHTML = "";
	}
}

elementList = document.querySelectorAll(".entry-content");

for (var i=0; i<elementList.length; i++)
{
	quoteHeaderList = elementList[i].getElementsByTagName('p');
	quoteBodyList = elementList[i].getElementsByTagName('div');
	for (var j=0; j<quoteHeaderList.length; j++)
	{
		if (quoteHeaderList[j].innerHTML.search('</a>ISIDA') != -1)
		{
			ignored++;
			quoteHeaderList[j].innerHTML = "";
			quoteBodyList[j+1].innerHTML = "";
		}
	}
}
