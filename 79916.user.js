// ==UserScript==
// @name           klavogonki - panel
// @version        0.0.4
// @namespace      klavogonki
// @author         novkostya&Wяnd
// @description    just for fun
// @include        http://klavogonki.ru/play/*
// @include        http://klavogonki.ru/profile/*
// ==/UserScript==


function doIt()
{
	$$(".userpanel.logged div")[0].style.background = 'url("http://i047.radikal.ru/1006/06/50edb20a7379.gif") no-repeat scroll 0 0 transparent';
}

var script = document.createElement("script");
script.innerHTML = "(" + doIt + ")()";
document.body.appendChild(script);