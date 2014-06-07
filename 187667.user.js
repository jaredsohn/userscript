// ==UserScript==
// @name            Replace Afmelden
// @author          Hardcode
// @version         1.0 
// @description     Vervangt de afmelden knop met de Vrienden knop
// @include         http://nl*.tribalwars.nl/game.php*
// ==/UserScript==

$('a:contains("Afmelden")').replaceWith('<a href="/game.php?&screen=buddies"> Vrienden </a>'); 