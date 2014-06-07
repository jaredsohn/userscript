// ==UserScript==
// @name Pennergame NoLogoutError alle games 
// @namespace 1334769[Bande:Arschbackenhoernchen] by basti1012 fuer clodogame
// @description  Es wird der Logout Error nicht mehr angezeigt. 
// @include http://*pennergame*nologout*
// @include http://*berlin.pennergame.de*nologout*
// @include http://*dossergame.co.uk*nologout*
// @include http://*menelgame.pl*nologout*
// @include http://*clodogame.fr/nologout*

// ==/UserScript==

if(window.location.href == "http://www.pennergame.de/nologout/" || window.location.href == "http://pennergame.de/nologout/")
{
window.location.href = "http://www.pennergame.de/overview/";
};

if(window.location.href == "http://www.berlin.pennergame.de/nologout/" || window.location.href == "http://berlin.pennergame.de/nologout/")
{
window.location.href = "http://www.berlin.pennergame.de/overview/";
};

if(window.location.href == "http://www.dossergame.co.uk/nologout/" || window.location.href == "http://dossergame.co.uk/nologout/")
{
window.location.href = "http://www.dossergame.co.uk/overview/";
};

if(window.location.href == "http://www.menelgame.pl/nologout/" || window.location.href == "http://menelgame.pl/nologout/")
{
window.location.href = "http://www.menelgame.pl/overview/";
};


if(window.location.href == "http://www.clodogame.fr/nologout/" || window.location.href == "http://clodogame.fr/nologout/")
{
window.location.href = "http://www.clodogame.fr/overview/";
};