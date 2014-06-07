// (c) Sascha Beier
// ==UserScript==
// @name           SchülerVZ/StudiVZ/MeinVZ Foto Download
// @include        http://*.schuelervz.net/Photos/*
// @include	       http://*.studivz.net/Photos/*
// @include        http://*.meinvz.net/Photos/*
// ==/UserScript==

if( document.getElementById('PhotoContainer') != null ) {
	// Link-Element erstellen
	var dlLink = document.createElement('a');
	dlLink.href = document.getElementById('PhotoContainer').firstChild.src;
	dlLink.title = 'Bild herunterladen';
	dlLink.appendChild( document.createTextNode('Bild herunterladen') );

	// Link Container
	var lContainer = document.getElementById('accusePhotoLink').parentNode;

	lContainer.appendChild( document.createTextNode(' - ') );
	lContainer.appendChild( dlLink )
}