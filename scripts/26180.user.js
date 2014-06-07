// ==UserScript==
// @name           Kaskus AKTB Text Remover - [kepeto]
// @namespace      greamonkey.kepeto.scripts
// @description    eliminate notification about AKTB in kaskus notices
// @include        http://*kaskus.us/*
// @version        v0.1
// ==/UserScript==

var parse_tag = function()
{
	var tag = document.getElementsByTagName('div');
	var i = 0;
	for(i=0; i<tag.length; i++)
	{		
		if(tag[i].className=='navbar_notice')
		{
			if(tag[i].textContent.match(/AKTB/i)!=null)
				tag[i].textContent = '';
		}
	}
}

parse_tag();