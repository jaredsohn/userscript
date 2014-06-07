// ==UserScript==
// @name           Pokec.sk - skrytie správ
// @namespace      http://
// @description    Skrytie správ na skle obsahujúcich vybrané slovné spojenia
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @include        http://www-pokec.azet.sk/miestnost/*
// @date           2012-03-4
// @author         Marvin-HOG (MaxSVK)
// @version        1.0
// ==/UserScript==


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */


var words = new Array("zakázané slovné spojenie", "aj toto je zakázané", "toto ani náhodou nechcem vidieť");


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */


var sklo = document.getElementById("sklo");
sklo.addEventListener('DOMNodeInserted', function(event) {
	var array;
	var link;
	var text;

	array = event.relatedNode.getElementsByClassName("prispevok");
	for(var i=0; i<array.length; i++)
	{
		link = array[i];
		text = link.innerHTML;
		for(var j=0; j<array.length; j++)
		{
			word = words[j];
			if(text.indexOf(word)>-1)
				link.parentNode.parentNode.setAttribute('style','display:none !important;');
		}
	}

}, true);

