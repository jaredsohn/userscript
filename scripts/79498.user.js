// ==UserScript==
// @name           klavogonki - Skyline2
// @version        0.0.4
// @namespace      klavogonki
// @author         novkostya&Wяnd
// @description    just for fun
// @include        http://klavogonki.ru/play/*
// @include        http://klavogonki.ru/profile/*
// ==/UserScript==


function doIt()
{
	$$(".other .imgcont div")[0].style.background = 'url("http://i080.radikal.ru/1003/37/397a37873b24.png") no-repeat scroll 0 0 transparent';
}

var script = document.createElement("script");
script.innerHTML = "(" + doIt + ")()";
document.body.appendChild(script);