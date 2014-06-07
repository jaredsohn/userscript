// ==UserScript==
// @name           Sin Links iTaringa!
// @namespace      Juampi_92
// @description    Elimina los links.itaringa.net/out? de los links
// @include        http://*.taringa.net/*
// @version        0.1
// @copyright      Copyright (c) 2011, Juampi_92
// @creator        Juampi_92
// ==/UserScript==

// ==Variables==
var totalinks = document.links.length;
	var itlink = "http://links.itaringa.net/out?";
	for (i=0; i<totalinks; i++) {
		var href = document.links[i].href;
		if(href.substr(0,30)=="http://links.itaringa.net/out?"){
		document.links[i].href = href.substr(30);}else{}
	 }