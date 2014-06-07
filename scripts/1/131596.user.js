// ==UserScript==
// @name           Navigation Forum
// @namespace      testtes
// @include        http://www.hordes.fr/*

// ==/UserScript==

var contenu = '<a href="http://www.hordes.fr/tid/forum#!" class="inlineButton">Accueil</a><a href="http://www.hordes.fr/tid/forum" class="inlineButton">Ville</a><a href="http://www.hordes.fr/tid/forum#!view/31069" class="inlineButton">Abris 13</a><a href="http://www.hordes.fr/tid/forum#!view/31071" class="inlineButton">Discussions</a><a href="http://www.hordes.fr/tid/forum#!view/31068" class="inlineButton">Saloon</a>';

var myctn = document.getElementById('gamebody');

		var sp1 = document.createElement('div');
		sp1.setAttribute('id', 'buttonNavigationForumTop');
		sp1.style.width = '900px';
		sp1.style.textAlign = 'right';
		sp1.style.position = 'absolute';
		sp1.style.margin = '10px 0px 0px 20px';
		sp1.style.padding = '0px 0px 0px 0px';

sp1.innerHTML = contenu;

var mynewdivTop = myctn.insertBefore(sp1 , myctn.firstChild);