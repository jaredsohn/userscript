// ==UserScript==
// @name           No links urlanonimo.com
// @namespace      http://
// @description    (v1.0) Quita los links de urlanonimo.com
// @include        http://*.intercambiosvirtuales.org/*
// @include        http://intercambiosvirtuales.org/*
// @include        http://www.intercambiowarez.org/*
// @include        http://*.intercambiowarez.org/*
// ==/UserScript==

/*******************************************************************************
***************     Creado por BuNKeR << www.n00bs.com.ar >>     ***************
*******************************************************************************/

element = document.getElementsByTagName("a");
for(var i = 0; i < element.length; i++)
{
	if(element[i].href.match("http://www.urlanonimo.com/?"))
	{
		element[i].href = element[i].href.substr(27);
	}
}