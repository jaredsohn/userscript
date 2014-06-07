// ==UserScript==
// @name           nCore banner removal
// @author           Botond Szasz
// @namespace      http://ncore.hu/
// @description   Removes annoying blinking banners from http://ncore.hu, and forces the search fields to be always visible
// @include        http://ncore.hu/*
// ==/UserScript==

// Version 0.1 - 20070719

var divs = document.getElementsByTagName('div');
var i;
var nr;
nr=0;
var str;

//hide the banner images
for (i=0; i<divs.length;i++)
{	
	if (nr==2)
	{
		divs[i].style.display='none';		
		break;
	}
	if (divs[i].className=='UserBox')
	{
		nr++;		
	}
}

//hide the banner header
for (i=0; i<divs.length;i++)
{		
	if (divs[i].className=='fejlecbox_szoveg')
	{
		str=divs[i].innerHTML;
		if (str.match('Banners')!=null)
		{
			divs[i].style.display='none';		
			break;	
		}
	}
}

//always show the searchbox
document.getElementById('kereso_resz').style.display='block';
document.getElementById('kereso_nyitas').style.display='none';