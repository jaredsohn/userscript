
// No result a Luigibraccio Script... 
// version 0.2 BETA!

// Adesso anche l'ultima partita degli altri(anche la nazionale..) viene nascosta...
// Released under the GPL license

// http://www.gnu.org/copyleft/gpl.html

//

// --------------------------------------------------------------------

//

// This is a Greasemonkey user script.  To install it, you need

// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/

// Then restart Firefox and revisit this script.

// Under Tools, there will be a new menu item to "Install User Script".

// Accept the default configuration and install.
//

// To uninstall, go to Tools/Manage User Scripts,

// select "Noresult", and click Uninstall.
//

// --------------------------------------------------------------------
//

// ==UserScript==

// @name          Noresult
// @namespace     http://diveintomark.org/projects/greasemonkey/

// @description   Script per non vedere il risultato dell'ultima partita giocata 
// @include       http://www.buzzerbeater.org/BBWeb/fixtures.aspx*

// @include       http://buzzerbeater.org/BBWeb/fixtures.aspx*

// ==/UserScript==

var allTextareas, thisTextarea;
var ultimoIndice;


allTextareas = document.getElementsByTagName('a');
for (var i = 0; i < allTextareas.length; i++) {
thisTextarea = allTextareas[i];
 t=thisTextarea.firstChild.nodeValue;


if(t=='Replay') {
	ultimoIndice=i;
			
		   }
	}
	
	thisTextarea = allTextareas[ultimoIndice-1];
        t=thisTextarea.firstChild.nodeValue;
	thisTextarea.style.color = 'black';
	thisTextarea.firstChild.nodeValue='vedi partita'