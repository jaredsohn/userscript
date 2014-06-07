// ==UserScript==
// @name          Bebe17.info
// @namespace     
// @description	  Penghilang banner top
// @author        tsubaki
// @homepage      http://www.tsubaki.com/
// @include       http://www.bebe17.info/*
// ==/UserScript==

var parse_tag = function()
{
	var tag = document.getElementsByTagName('div');
	var i = 0;
	for(i=0; i<tag.length; i++)
	{		
		if(tag[i].getAttribute('id')=='fixme')
		{
			tag[i].style.display = 'none';
		}
	}
}

parse_tag();
