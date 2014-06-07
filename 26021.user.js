// ==UserScript==
// @name           Lebarin Dong [kaskus] - kepeto
// @namespace      Lebarin Dong [kaskus] - kepeto
// @description    bikin kaskus jadi lebih lega
// @include        http://*kaskus.us/*
// @version        v0.2
// ==/UserScript==

//history
//v0.2: bug fix in page navigation
//v0.1: initial release

var parse_tag = function()
{
	var tag = document.getElementsByTagName("div");
	var i = 0;
	for(i=0; i<tag.length; i++)
	{		
		if(tag[i].className=="page")
		{
			tag[i].style.cssText = "width:100%; text-align:left;";
		}
	}
}
parse_tag();