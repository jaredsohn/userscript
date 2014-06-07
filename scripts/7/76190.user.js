// ==UserScript==
// @name           vizipipa.eu NSFW
// @namespace      vizipipa.eu/nsfw
// @description    NSFW tartalom szqrés
// @include        http://vizipipa.eu/*
// ==/UserScript==

var divs = document.getElementsByTagName('div');
var i;
var str;

for (i=0; i<divs.length;i++)
{		
	if (divs[i].className=='contentpaneopen') {
		str=divs[i].innerHTML;
		if ( (str.match('Miss 2007')!=null) || (str.match('Miss 2008')!=null) || (str.match('Miss 2009')!=null) || (str.match('Miss 2010')!=null) )
		{
			divs[i].style.display='none';			
		}
	}
}