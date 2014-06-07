// ==UserScript==
// @name            Oude lay-out terug
// @author          Aus
// @version         1.0 
// @description     Brengt oude lay-out terug
// @include         http://nl*.tribalwars.nl/game.php*
// ==/UserScript==



$('a:contains("Afmelden"):last').replaceWith('<a class="vrienden" href="/game.php?&screen=buddies">Vrienden</a>');
$('a:contains("Kaart"):first').remove();


$('#menu_row td:contains("Instellingen"):first').after('<td class="menu-item"><a class="notitieblok" href="/game.php?&screen=memo">Notitieblok</a></td>');
$('a:contains("Notitieblok"):last').remove();


$('<td class="firstcell icon-box arrowCell"><a class="menu-item" href="/game.php?&screen=map">Kaart</a></td>').insertBefore("#menu_row2 td:first-child");

$('#menu_row td:contains("Instellingen"):first').after('<td class="menu-item"><a class="Afmelden" href="/game.php?&action=logout">Afmelden</a></td>');

$($('a:contains("Vrienden"):last').get(0).previousSibling).remove(); 

