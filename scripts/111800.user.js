// ==UserScript==
// @name           Google Reader - No White Text
// @namespace      http://userscripts.org/users/OmniSliver
// @include        http://www.google.*/reader/view/*
// @include        https://www.google.*/reader/view/*
// ==/UserScript==

document.getElementById("entries").addEventListener('DOMNodeInserted', nWT, false);

function nWT(e){
	var fonts = e.target.getElementsByTagName('FONT');

	for(var i = 0; i < fonts.length; i++)
		if(fonts[i].color)
			if(fonts[i].getAttribute('color').toLowerCase() == '#ffffff')
   	 			fonts[i].setAttribute('color', '#000000');

	var spans = e.target.getElementsByTagName('SPAN');

	for(var i = 0; i < spans.length; i++)
		if(spans[i].style.color)
			if(spans[i].getAttribute('style').toLowerCase() == 'color:#ffffff')
   	 			spans[i].setAttribute('style', 'color:#000000');
}