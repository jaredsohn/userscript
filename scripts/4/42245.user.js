// ==UserScript==
// @name           Votar en Bitacoras.com desde Google Reader
// @namespace      http://bitacoras.com/usuario/displaynone
// @description    Permite votar en Bitacoras.com los posts que lees en Google Reader
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://www.google.es/reader/*
// @include        https://www.google.es/reader/*
// ==/UserScript==

// Votar anotaciones en Bitacoras.com desde Google Reader
// Adaptado de Google reader digg news (http://userscripts.org/scripts/show/10311)

var entries=document.getElementById("entries");
if(entries)
	entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

function nodeInserted(event){	
	if (event.target.tagName=="DIV"){
			if (event.target.className === "entry-actions"){
				// List mode
				var linkbar= event.target;
				var parent= event.target.parentNode;
			} else if (event.target.firstChild.className ==="card card-common"
			    ||  event.target.firstChild.className === "ccard-container card-common"){ 
				// Expanded mode
				var linkbar= event.target.getElementsByClassName("entry-actions")[0];
				var parent= event.target;
			} else
				return;

			var link = parent.getElementsByClassName("entry-title-link")[0].getAttribute('href');
			
			window.setTimeout(function() {
				GM_xmlhttpRequest({
					method: 'HEAD',
					url: link,
					onload: function (responseDetails) {
						var btn= document.createElement("span");
            var url_bit = responseDetails.finalUrl.indexOf('http://bitacoras.com/anotaciones/') >= 0?responseDetails.finalUrl: 'http://bitacoras.com/anotaciones/'+escape(responseDetails.finalUrl);                                               
						btn.innerHTML = '<a href="'+url_bit+'" title="Votar Anotación en Bitacoras.com" target="_blank"><img src="http://static2.bitacoras.com/images/agregador/bitacorascom16x16.gif" alt="Votar" style="vertical-align:middle;border:0" /> - Vota</a>'
						linkbar.appendChild(btn);
					}
				});
			}, 0);


	}
}
