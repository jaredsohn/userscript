// ==UserScript==
// @name           No links adf.ly
// @namespace      http://
// @description    (v1.0) Quita los links de adf.ly
// @include        http://*
// ==/UserScript==

/*******************************************************************************
***************     Creado por BuNKeR << www.n00bs.com.ar >>     ***************
*******************************************************************************/

window.onload = function ()
{
	element = document.getElementsByTagName("a");
	for(var i = 0; i < element.length; i++)
	{
		if(element[i].href.match("http://adf.ly/(.*)/"))
		{
			element[i].href = element[i].href.substr(element[i].href.lastIndexOf("http://"));
		}
	}
}