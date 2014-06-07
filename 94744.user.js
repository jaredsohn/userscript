// ==UserScript==
// @name          WefragVideo
// @namespace     http://www.wefrag.com
// @version       0.3
// @description   Ajoute le lecteur video sous les liens vers youtube
// @include       http://www.wefrag.com/forums/*
// @match         http://www.wefrag.com/forums/*
// ==/UserScript==
(function(){

	var tables = document.getElementsByClassName('list posts'),
	gReIdYt = /v=([\w-]{11})/; // regexp identifiant video youtube

	if (tables.length > 0) {
		ajouteLiensVideo(tables[0]);
	}
	else {
		return;
	}

	document.addEventListener('AutoPagerAfterInsert', nouvellePage, true);
	
	////////////////////////////////////////////////////////////////////////////
	// Ajoute les liens [+] apres les liens vers youtube dans un conteneur DOM
	////////////////////////////////////////////////////////////////////////////
	function ajouteLiensVideo(conteneur) {
		
		var liens = conteneur.getElementsByTagName('a'),
		nb = liens.length,
		lien,
		spanAction;
	
		for (var i = 0; i < nb; ++i) {
			lien = liens[i];
			if (lien.hostname == 'www.youtube.com' && gReIdYt.test(lien.href)) {
			
				spanAction = document.createElement('span');
				spanAction.innerHTML = '&nbsp;[+]';
				spanAction.style.cursor = 'pointer';
				spanAction.title = 'Ouvrir vidéo';
				spanAction.addEventListener('click', ouvreVideo, false);
				lien.parentNode.insertBefore(spanAction, lien.nextSibling);
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////
	// Appele au clic sur liens [+]. Ouvre l'iframe avec la video et change le
	// lien en [-].
	////////////////////////////////////////////////////////////////////////////
	function ouvreVideo(event) {

		var video,
		spanAction = event.target,
		resultats = spanAction.previousSibling.href.match(gReIdYt, '$1');
		
		// creation iframe
		video = document.createElement('iframe');
		video.setAttribute('class', 'youtube-player');
		video.setAttribute('type', 'text/html');
		video.setAttribute('width', 640);
		video.setAttribute('height', 385);
		video.setAttribute(
			'src',
			'http://www.youtube.com/embed/' + resultats[1]
		);
		video.setAttribute('frameborder', 0);
		spanAction.parentNode.insertBefore(video, spanAction.nextSibling);

		// modif span
		spanAction.innerHTML = '&nbsp;[-]';
		spanAction.title = 'Fermer vidéo';
		spanAction.removeEventListener('click', ouvreVideo, false);
		spanAction.addEventListener('click', fermeVideo, false);
	}

	////////////////////////////////////////////////////////////////////////////
	// Appele au clic sur liens [-]. Ferme iframe avec video et change le lien.
	////////////////////////////////////////////////////////////////////////////
	function fermeVideo(event) {
		var spanAction = event.target;
		spanAction.parentNode.removeChild(spanAction.nextSibling);
		spanAction.innerHTML = '&nbsp;[+]';
		spanAction.title = 'Ouvrir vidéo';
		spanAction.removeEventListener('click', fermeVideo, false);
		spanAction.addEventListener('click', ouvreVideo, false);
	}
	
	////////////////////////////////////////////////////////////////////////////
	// Chargement nouvelle page AutoPager
	////////////////////////////////////////////////////////////////////////////
	function nouvellePage(event) {
		// event.target : div de la nouvelle page
		ajouteLiensVideo(event.target);
	}

}());
