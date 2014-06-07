// ==UserScript==
// @name           klavogonki: 1st april fun
// @version        0.0.4
// @namespace      klavogonki
// @author         novkostya
// @description    just for fun
// @include        http://klavogonki.ru/play/*
// ==/UserScript==

function doIt()
{
	$$(".you .imgcont div")[0].style.background = 'url("http://xmages.net/upload/489c533c.png") no-repeat scroll 0 0 white';
}

var script = document.createElement("script");
script.innerHTML = "(" + doIt + ")()";
document.body.appendChild(script);