// ==UserScript==
// @name          klix.ba-bloker komentara
// @namespace     http://userscripts.org/
// @description   blokiranje linka za komentare
// @include       http://www.klix.ba/*
// @matches      http://klix.ba/*
// @matches      http://www.klix.ba/*
// ==/UserScript==

var html = document.body.innerHTML;
html = html.replace( new RegExp('/komentari', "g"), '/#' );
html = html.replace( new RegExp('Komentari:', "g"), '' );
html = html.replace( new RegExp('Četver', "g"), 'Četvor' );
html = html.replace( new RegExp('četver', "g"), 'četvor' );
html = html.replace( new RegExp('Peter', "g"), 'Petor' );
html = html.replace( new RegExp('peter', "g"), 'petor' );
html = html.replace( new RegExp('Šester', "g"), 'Šestor' );
html = html.replace( new RegExp('šester', "g"), 'šestor' );
html = html.replace( new RegExp('Sedmer', "g"), 'Sedmor' );
html = html.replace( new RegExp('sedmer', "g"), 'sedmor' );
html = html.replace( new RegExp('Osmer', "g"), 'Osmor' );
html = html.replace( new RegExp('osmer', "g"), 'osmor' );
html = html.replace( new RegExp('Deveter', "g"), 'Devetor' );
html = html.replace( new RegExp('deveter', "g"), 'devetor' );
document.body.innerHTML = html;