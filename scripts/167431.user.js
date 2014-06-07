// ==UserScript==
// @name           No re-direcciona.me links
// @namespace      http://
// @description    (v1.0) Quita los links de re-direcciona.me
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://www.neobookeros.com.ar/userscripts/no-rd/jquery.base64-2.js
// @icon           http://www.neobookeros.com.ar/userscripts/no-rd/no-rd.png
// ==/UserScript==

/*******************************************************************************
************     Creado por BuNKeR << www.neobookeros.com.ar >>     ************
*******************************************************************************/

$.noConflict();
jQuery(document).ready(function($){
	element = document.getElementsByTagName("a");
	for(var i = 0; i < element.length; i++)
	{
		if(element[i].href.match("http://re-direcciona.me/l/(.*)"))
		{
			link = element[i].href.substr(element[i].href.lastIndexOf("/l/")+3);
			for (var j = 0; j < 5; j++) {
				link =  $.base64Decode(link);
			};
			element[i].href = link;
		}
	}
});