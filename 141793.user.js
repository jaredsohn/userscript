// ==UserScript==
// @name        Sparvar
// @namespace   http://filelist.ro
// @description Translate Sparvar to English from Swedish
// @version     2.0
// @include     http://*sparvar.org/*
// @include     https://*sparvar.org/*
// ==/UserScript==

//Menu
document.body.innerHTML= document.body.innerHTML.replace(/Hem/g,"Home");
document.body.innerHTML= document.body.innerHTML.replace(/Logg/g,"Log");
document.body.innerHTML= document.body.innerHTML.replace(/Seedhjälp/g,"Need Seed");
document.body.innerHTML= document.body.innerHTML.replace(/Ladda upp/g,"Upload");
document.body.innerHTML= document.body.innerHTML.replace(/Spaningstornet/g,"Wishlist");
document.body.innerHTML= document.body.innerHTML.replace(/Hjälp/g,"Help");
document.body.innerHTML= document.body.innerHTML.replace(/Donera/g,"<a href=\"donate.php\">Donate");
document.body.innerHTML= document.body.innerHTML.replace(/Recensioner/g,"Reviews");

//Statusbar
document.body.innerHTML= document.body.innerHTML.replace(/Välkommen/g,"Welcome");
document.body.innerHTML= document.body.innerHTML.replace(/Fågelfrön/g,"Karma");
document.body.innerHTML= document.body.innerHTML.replace(/Kontrollpanel/g,"Profile");
document.body.innerHTML= document.body.innerHTML.replace(/Logga ut/g,"Log Out");
document.body.innerHTML= document.body.innerHTML.replace(/Uppladdat/g,"Upload");
document.body.innerHTML= document.body.innerHTML.replace(/Nedladdat/g,"Download");
document.body.innerHTML= document.body.innerHTML.replace(/Buffert/g,"Buffer");
document.body.innerHTML= document.body.innerHTML.replace(/Ajaxsök/g,"Search");
document.body.innerHTML= document.body.innerHTML.replace(/Sök/g,"Search");

//Index
document.body.innerHTML= document.body.innerHTML.replace(/Nyheter/g,"News");
document.body.innerHTML= document.body.innerHTML.replace(/Populära torrents denna vecka/g,"Last week's popular torrents");
document.body.innerHTML= document.body.innerHTML.replace(/Senaste recensioner/g,"Latest reviews");
document.body.innerHTML= document.body.innerHTML.replace(/Veckans filmer valda av staff/g,"This weeks staff-picked movies");
document.body.innerHTML= document.body.innerHTML.replace(/Populära torrents förra veckan/g,"Popular torrents last week");
document.body.innerHTML= document.body.innerHTML.replace(/Statistik över Sparvar.Org/g,"Stats");
document.body.innerHTML= document.body.innerHTML.replace(/Max sparvbestånd/g,"Maximum sparrow population");
document.body.innerHTML= document.body.innerHTML.replace(/Ringmärkta sparvar/g,"Banded sparrows");
document.body.innerHTML= document.body.innerHTML.replace(/Vingklippta sparvar/g,"Wingclipped sparrows");
document.body.innerHTML= document.body.innerHTML.replace(/Skrämda sparvar/g,"Frightened sparrows");
document.body.innerHTML= document.body.innerHTML.replace(/Stekta sparvar/g,"Fried sparrows");
document.body.innerHTML= document.body.innerHTML.replace(/Sparvungar/g,"Sparrow chicks");
document.body.innerHTML= document.body.innerHTML.replace(/Sparvar/g,"Sparrows");
document.body.innerHTML= document.body.innerHTML.replace(/Upphöjda sparvar/g,"Exalted sparrows");
document.body.innerHTML= document.body.innerHTML.replace(/Gudomliga sparvar/g,"Divine sparrows");
document.body.innerHTML= document.body.innerHTML.replace(/Hederssparvar/g,"Honorary sparrows");
document.body.innerHTML= document.body.innerHTML.replace(/Forumtrådar/g,"Forum threads");
document.body.innerHTML= document.body.innerHTML.replace(/Forumposter/g,"Forum posts");
document.body.innerHTML= document.body.innerHTML.replace(/Torrentkommentarer/g,"Torrent comments");
document.body.innerHTML= document.body.innerHTML.replace(/användare online senaste/g,"users online the past");
document.body.innerHTML= document.body.innerHTML.replace(/dygnet och/g," day");
document.body.innerHTML= document.body.innerHTML.replace(/veckan/g," week");
document.body.innerHTML= document.body.innerHTML.replace(/aktiva användare/g,"active users");

//Browse
document.body.innerHTML= document.body.innerHTML.replace(/Sammanslagen/g,"Combined");
document.body.innerHTML= document.body.innerHTML.replace(/Nytt/g,"New");
document.body.innerHTML= document.body.innerHTML.replace(/Arkiv/g,"Archive");
document.body.innerHTML= document.body.innerHTML.replace(/Ljudbok/g,"Audiobook");
document.body.innerHTML= document.body.innerHTML.replace(/E-bok/g,"E-book");
document.body.innerHTML= document.body.innerHTML.replace(/E-tidning/g,"E-magazine");
document.body.innerHTML= document.body.innerHTML.replace(/Föreg/g,"Prev");
document.body.innerHTML= document.body.innerHTML.replace(/Nästa/g,"Next");
document.body.innerHTML= document.body.innerHTML.replace(/Namn/g,"Name");
document.body.innerHTML= document.body.innerHTML.replace(/Betyg/g,"Score");
document.body.innerHTML= document.body.innerHTML.replace(/Tillagd/g,"Added");
document.body.innerHTML= document.body.innerHTML.replace(/Storlek/g,"Size");
document.body.innerHTML= document.body.innerHTML.replace(/timmar sedan/g,"Hours ago");
document.body.innerHTML= document.body.innerHTML.replace(/timme sedan/g,"Hour ago");
document.body.innerHTML= document.body.innerHTML.replace(/minut sedan/g,"Minute ago");
document.body.innerHTML= document.body.innerHTML.replace(/minuter sedan/g,"Minutes ago");
document.body.innerHTML= document.body.innerHTML.replace(/Fri leech/g,"Free leech");
document.body.innerHTML= document.body.innerHTML.replace(/endast uppladdad data räknas/g,"only uploaded data is counted");
document.body.innerHTML= document.body.innerHTML.replace(/Detta är bästa sättet att förbättra din ratio/g,"This is the best way to improve your ratio");