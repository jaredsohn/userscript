// ==UserScript==
// @name				Adjustements
// @author			LeonBuzz
// @namespace		LeonBuzz
// @include			http://*clodogame.fr*
// @include			http://*pennergame.de*
// @exclude			http://*/gang/stuff/*
// @exclude			http://*/fight/*
// ==/UserScript==


// réhaussage de l'affichage (CG paris/marseille)
if(document.location.hostname.match('clodogame'))
{	document.getElementById("tabnav").setAttribute("style", "top:-127px");
	document.getElementById("content").setAttribute("style", "top:-127px");
	document.getElementById("footer").setAttribute("style", "margin-top:-127px");
}

// suppression des redirections (prudence...)
var lnks = document.getElementsByTagName('a');
for(var i=0;i<=lnks.length;i++)	lnks[i].setAttribute('href', lnks[i].href.replace(/(http:\/\/[^\/]+\/redirect\/\?site=http)/g, 'http'));