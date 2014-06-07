// ==UserScript==
// @name       Crap Cleaner
// @namespace  http://fakenotif.tk
// @version    0.1
// @description  Saca la mierda de ahora de Taringa.
// @match      http://*.taringa.net/posts/*
// @copyright  2013+, Puika Software
// @require http://code.jquery.com/jquery-1.7.min.js
// ==/UserScript==

//function

function SacarEsaMierda (){
	$(".fixme").html("");
	$(".post-box-item").html("");
}

SacarEsaMierda();