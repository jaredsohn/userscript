// ==UserScript==
// @name          Bebe17.info no iklan
// @namespace     
// @description	  Penghilang iklan
// @author        tsubaki
// @homepage      http://www.tsubaki.com/
// @include       http://www.bebe17.info/*
// ==/UserScript==

var remover_tag = function()
{
	var tag = document.getElementsByTagName('div');
	var i = 0;
	for(i=0; i<tag.length; i++)
	{	
		if(window.location.pathname=='/forumdisplay.php'||window.location.pathname=='/showthread.php'){
			if(i==2||i==3||i==4||i==5||i==19)
			{
				tag[i].style.display = 'none';
			}
		}else{
			if(i==2||i==3||i==4||i==5||i==20)
			{
				tag[i].style.display = 'none';
			}
		}
	}
}

var remover_br = function()
{
	var tagbr = document.getElementsByTagName('br');
	var i = 0;
	for(i=0; i<tagbr.length; i++)
	{		
		if(i<6)
		{
			tagbr[i].style.display = 'none';
		}
	}
}

var remover_logo = function()
{
	var tagimg = document.getElementsByTagName('img');
	var i = 0;
	for(i=0; i<tagimg.length; i++)
	{		
		if(tagimg[i].src=='http://www.bebe17.info/images/misc/BB17-alt-2.png')
		{
			tagimg[i].style.display = 'none';
		}
	}
}

remover_tag();
remover_br();
remover_logo();