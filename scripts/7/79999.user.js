// ==UserScript==
// @name           klavogonki - Mazda Furai3
// @version        0.0.4
// @namespace      klavogonki
// @author         novkostya&Wяnd
// @description    just for fun
// @include        http://klavogonki.ru/play/*
// ==/UserScript==

function doIt()
{
	$$(".car11 .imgcont div")[0].style.background = 'url("http://i081.radikal.ru/1006/70/edfdff953c7d.png") no-repeat scroll 0 0 transparent';
}

var script = document.createElement("script");
script.innerHTML = "(" + doIt + ")()";
document.body.appendChild(script);