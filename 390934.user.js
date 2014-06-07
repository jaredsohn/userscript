// ==UserScript==
// @name        Bing Ad Remover
// @namespace   sandros.hu
// @description Use this, if you don't want ads on bing. Script by Sandros sandros.hu
// @include     http://www.bing.com/*
// @version     1
// @grant       none
// ==/UserScript==


body = document.body;
if(body != null) {
	div = document.createElement("style");
	div.setAttribute('type','text/css');
    div.innerHTML = "#b_context{display:none}"
                   +"#b_results{width: 80%;}";
	body.appendChild(div);


}