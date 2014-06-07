// ==UserScript==
// @name           Robot Invasion - Tastennavigation
// @namespace      Robot Invasion
// @description    Ermöglicht das wechesln von Gebäuden/Stamm/Berichte/Nachrichten/Einstellungen mit Tasten
// @include        http://s*.robot-invasion.at/*

// @exclude        http://forum.robot-invasion.at/*

// ==/UserScript==


y=document.URL;
serv=y.substring(7,9);
dorf=y.substring(45,48);

link_0 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=villageOverview");


link_1 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=architect");
link_2 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=barracks");
link_3 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=ores");
link_4 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=marked");
link_5 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=laboratory");
link_6 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=machine");
link_7 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=factory");
link_8 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=place");
link_10 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=controlcenter");
link_11 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=storage");

link_12 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=ally&mode=forum");

link_13 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=settings");
link_14 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=reports");
link_15 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=mail");

link_16 = ("href","http://"+serv+".robot-invasion.at/main.php?village="+dorf+"&screen=map");

// Links mit tasten anwaehlen
document.addEventListener('keypress', function(event) {	
	var key = event.which.toString(); 
	
// Welche Taste wurde gedrueckt?
switch(key) {

	// [g] = Startlink
	case "103":
	document.location.href = link_0;
	break;



 	// [h] 
	case "104":
	document.location.href = link_1;
	break;

	// [k]
	case "107":
	document.location.href = link_2;
	break;

	// [p] 
	case "112":
	document.location.href = link_3;
	break;



	// [m] 
	case "109":
	document.location.href = link_4;
	break;

	// [f] 
	case "102":
	document.location.href = link_5;
	break;

	// [s] 
	case "115":
	document.location.href = link_6;
	break;

	// [w] 
	case "119":
	document.location.href = link_7;
	break;

	// [v] 
	case "118":
	document.location.href = link_8;
	break;

	// [a] 
	case "97":
	document.location.href = link_10;
	break;

	// [r] 
	case "114":
	document.location.href = link_11;
	break;


	// [e] 
	case "101":
	document.location.href = link_13;
	break;

	// [b]
	case "98":
	document.location.href = link_14;
	break;

	// [n] 
	case "110":
	document.location.href = link_15;
	break;

	// [y] 
	case "121":
	document.location.href = link_16
	break;


		}
		}, true);