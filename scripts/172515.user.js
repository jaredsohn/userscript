// ==UserScript==
// @name       		Hide some stuff - Personal/Testing use
// @namespace  		https://inetserv.visa.com.ar/visahome/app/*
// @version    		1.0
// @description  	Hides some stuff - Personal/Testing use
// @match      		https://inetserv.visa.com.ar/visahome/app/*
// @run-at              document-end
// @author         	cesard
// ==/UserScript==

$("div#submenu_0.submenu ul li.delMedio.inactive a.inactive:contains('Resúmenes Anteriores')").hide();

$("span:contains('DEUDA')").hide();