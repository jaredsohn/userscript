// ==UserScript==
// @name           Hello World JQuery
// @version        v0.1
// @author         Rafael Gomes
// @description    Script para SNODS
// ==/UserScript==

// go jQuery, go!
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
 
// Check if jQuery's loaded
function GM_wait()
{
	if(typeof unsafeWindow.jQuery == 'undefined')
	{
		window.setTimeout(GM_wait,100);
	}
	else
	{
		$ = unsafeWindow.jQuery; letsJQuery();
	}
}

GM_wait();


window.setTimeout("location.reload();",1000*10);

function letsJQuery()
{
	// pode usar o $ aqui ;D
	$(document).ready(function(){alert("Olá Mundo JQUERY!");});
}

