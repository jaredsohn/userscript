// ==UserScript==
// @name           Pokec.sk - skrytie správ od užívateľa
// @namespace      http://
// @description    Skrytie správ na skle od vybraných užívateľov
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @include        http://www-pokec.azet.sk/miestnost/*
// @date           2012-03-4
// @author         Marvin-HOG (MaxSVK)
// @version        1.0
// ==/UserScript==


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */


var nicks = new Array("nick1", "nick2", "nick3");


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */


var sklo = document.getElementById("sklo");
sklo.addEventListener('DOMNodeInserted', function(event) {
	var array;
	var link;
	var text;

	array = event.relatedNode.getElementsByClassName("dt");
	for(var i=0; i<array.length; i++)
	{
		link = array[i];
		text = link.getElementsByTagName("a")[1].innerHTML;
		for(var j=0; j<array.length; j++)
		{
			nick = nicks[j];
			if(text==nick)
				link.parentNode.setAttribute('style','display:none !important;');
		}
	}

}, true);

