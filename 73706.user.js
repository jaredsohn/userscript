// ==UserScript==
// @name           klavogonki - Toyota Mark 2 Blit
// @version        0.0.4
// @namespace      klavogonki
// @author         novkostya&Wяnd
// @description    just for fun
// @include        http://klavogonki.ru/play/*
// @include        http://klavogonki.ru/profile/*
// ==/UserScript==

function doIt()
{
	$$(".you .imgcont div")[0].style.background = 'url("http://s52.radikal.ru/i138/1004/2c/021e157c0fff.png") no-repeat scroll 0 0 transparent';
}

var script = document.createElement("script");
script.innerHTML = "(" + doIt + ")()";
document.body.appendChild(script);