// ==UserScript==
// @name          Bebe17.info tracer
// @namespace     
// @description	  Only tracer
// @author        tsubaki
// @homepage      http://www.tsubaki.com/
// @include       http://www.bebe17.info/*
// ==/UserScript==

var test_tag = function()
{
	var tag = document.getElementsByTagName('img');
	var i = 0;
	for(i=0; i<tag.length; i++)
	{		
		
			alert(tag[i].src);

	}
}

test_tag();