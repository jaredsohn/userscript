// ==UserScript==
// @name           DS - Tastennavigation
// @namespace      Die Staemme
// @description    Ermöglicht das wechesln von Gebäuden/Stamm/Berichte/Nachrichten/Einstellungen mit Tasten
// @include        http://de*.die-staemme.de/*

// @exclude        http://de*.die-staemme.de/game.php?*&screen=settings*
// @exclude        http://forum.die-staemme.de/*
// @exclude        http://de*.die-staemme.de/game.php?*&screen=place&mode=command&target=*
// @exclude        http://de*.die-staemme.de/game.php?*&screen=mail*
// @exclude        http://de*.die-staemme.de/forum.php?screen=view_thread&thread_id=*
// @exclude        http://de*.die-staemme.de/forum.php?screen=view_forum&forum_id=*

// ==/UserScript==


y=document.URL;
serv=y.substring(9,y.indexOf("."));
dorf=y.substring(y.indexOf("village=")+3);

link_0 = ("href","http://de"+serv+".die-staemme.de/staemme.php?screen=overview&top");


link_1 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=main");
link_2 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=barracks");
link_3 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=statue");
link_4 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=market");
link_5 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=smith");
link_6 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=stable");
link_7 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=garage");
link_8 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=place");
link_9 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=church_f");
link_10 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=snob");
link_11 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=storage");

link_12 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=ally&mode=forum");

link_13 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=settings");
link_14 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=report");
link_15 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=mail");

link_16 = ("href","http://de"+serv+".die-staemme.de/staemme.php?"+dorf+"&screen=map");

// Links mit tasten anwaehlen
document.addEventListener('keypress', function(event) {	
	var key = event.which.toString(); 
	
// Welche Taste wurde gedrueckt?
switch(key) {

	// [g] = Startlink
	case "103":
	document.location.href = link_0;
	break;



 	// [h] = Hauptgebaeude
	case "104":
	document.location.href = link_1;
	break;

	// [k] = Kaserne
	case "107":
	document.location.href = link_2;
	break;

	// [p] = Statue
	case "112":
	document.location.href = link_3;
	break;

	// [m] = Marktplatz
	case "109":
	document.location.href = link_4;
	break;

	// [f] = schmieden
	case "102":
	document.location.href = link_5;
	break;

	// [s] = Stall
	case "115":
	document.location.href = link_6;
	break;

	// [w] = Werkstatt
	case "119":
	document.location.href = link_7;
	break;

	// [v] = Versammlungsplatz
	case "118":
	document.location.href = link_8;
	break;

	// [c] = erste Kirche
	case "99":
	document.location.href = link_9;
	break;

	// [a] = Adelshof
	case "97":
	document.location.href = link_10;
	break;

	// [r] = Speicher
	case "114":
	document.location.href = link_11;
	break;

	// [x] = Stammesforum
	case "120":
	document.location.href = link_12;
	break;

	// [e] = Einstellungen
	case "101":
	document.location.href = link_13;
	break;

	// [b] = Berichte
	case "98":
	document.location.href = link_14;
	break;

	// [n] = Nachrichten
	case "110":
	document.location.href = link_15;
	break;

	// [y] = Karte
	case "121":
	document.location.href = link_16
	break;


		}
		}, true);