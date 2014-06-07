// ==UserScript==
// @name           Britannica Wide
// @namespace      Hallvard
// @description    Makes Britannica School Edition readable
// @include        *.eb.co.uk/*
// ==/UserScript==

var article = document.getElementsByClassName("articleBody")[0];
article.style.width = (screen.width-216)+'px';

var ps = document.getElementsByTagName('p');
	for (var i = ps.length - 1; i >= 0; i--) {
		var current = ps[i];
		if(current.parentNode.className=="articleBody")
			{current.style.width = (screen.width-416)+'px';}
	}