// ==UserScript==
// @name           RemoveSpace
// @namespace      http://www.anztf2mug.net
// @description    Removes the gaps on the side of anztf2mug
// @include        http://www.anztf2mug.net/*
// @include        http://anztf2mug.net/*
// ==/UserScript==



function addCss(style) 
{
	var head = document.getElementsByTagName("body");
	var item = head[0];
	var ele = item.appendChild(window.document.createElement( 'style' ));
	ele.innerHTML = style;
	return ele;
}


addCss (
'body {margin: 0 0;}'
);
