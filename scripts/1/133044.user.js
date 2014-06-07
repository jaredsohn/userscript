// ==UserScript==
// @name           JV MP ++ -15
// @namespace      http://userscripts.org/scripts/show/132214
// @description    Ajoute un bouton pour revenir sur le blabla moins de 15 ans en un clic depuis la boîte de réception des MP. 
// @include        http://www.jeuxvideo.com/messages-prives/*
// ==/UserScript==

    var c = document.getElementById('mp_onglets');
 
    var b = document.createElement('a');
    var image = document.createElement('img');
	
	b.setAttribute('href', 'http://www.jeuxvideo.com/forums/0-15-0-1-0-1-0-blabla-moins-de-15-ans.htm');
	image.setAttribute('src', 'http://image.noelshack.com/fichiers/2012/17/1335530826-3.png');
    b.appendChild(image);
	document.getElementById('mp_onglets').appendChild(b);
	c.insertBefore(b,c.lastChild);