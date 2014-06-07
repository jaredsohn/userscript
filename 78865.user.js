// ==UserScript==
// @name           klavogonki - Lamborghini Murcielago
// @version        0.0.4
// @namespace      klavogonki
// @author         novkostya&Wяnd
// @description    just for fun
// @include        http://klavogonki.ru/play/*
// ==/UserScript==

function doIt()
{
	$$(".you .imgcont div")[0].style.background = 'url("http://klavogonki.ru/img/cars/16-2.png") no-repeat scroll 0 0 transparent';
}

var script = document.createElement("script");
script.innerHTML = "(" + doIt + ")()";
document.body.appendChild(script);