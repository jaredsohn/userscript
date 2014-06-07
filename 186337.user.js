// ==UserScript==
// @name            Afmelden
// @author          Aus
// @version         1 
// @description     Verwijdert de afmelden knop
// @include         http://nl*.tribalwars.nl/game.php*
// ==/UserScript==

$('a').filter(function(){
    return this.innerHTML === 'Afmelden';
}).replaceWith('Afmelden');
