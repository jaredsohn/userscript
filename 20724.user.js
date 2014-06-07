// --------------------------------------------------------------------
//

// ==UserScript==

// @name          Firma il messaggio
// @namespace     http://diveintomark.org/projects/greasemonkey/

// @description   Script per non vedere il risultato dell'ultima partita giocata 
// @include       http://online.sokker.org/forum_topic.php*


// ==/UserScript==

var allTextareas, thisTextarea;
var ultimoIndice;

var links = document.getElementsByTagName('textarea');

if(links[0].name='area'){
links[0].value='[b]Luigibraccio - Wonderfulworld  [url=league.php?leagueID=2338]D.12[/url] - tessera #24 Napoli una fede incrollabile[/b]'	
			}	