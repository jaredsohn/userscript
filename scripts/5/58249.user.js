// ==UserScript==
// @name			Ika-Core Ivan666
// @version 		1
// @namespace 		
// @author			Yo
// @description	    	
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched. Your not allowed to edit or copy ika-core.js, read license inside the file.
// You can create a copy of Ika-core-SearchTools.user.js and host it anywhere, when a new version of ika-core.js comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=1;
var scriptlocation = "http://userscripts.org/scripts/source/54253.user.js";
var scripthomepage = "http://userscripts.org/scripts/show/54253";

switch (location.host) {
	case 's3.ikariam.es':
		alliancefullnm='Ivan666';
		alliancenm='Ivan666';		
		alliance=[['?o alliance'	, NoAlliance],
					[ alliancenm	, Alliance	]];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//forumurl='.';
		//forumurlnew='.';
		
		break;
	}
	
	fixtreaties();

// Consejos de los mandatarios
	var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
		addsbubble('mayor', "Eso va, esto viene...",10);
		addsbubble('diplomat',"Nada a decir?",20);
		addsbubble('scientist',"De las buenas ideas, se produce beneficio!",30);
		addsbubble('general',"¡Hum!, Creí ver a un Grande Oso...",40);
		addsbubble('mayor', "Necesitamos un escondite al mismo nivel de la intendencia",50);
   } else if (showbubble%3) { //If Even
		addsbubble('mayor', "Un barco de transporte, eso no hace nada parado en el puerto.",10);
		addsbubble('diplomat',"Sería necesario pedir algo a nuestro jefe, no?",20);
		addsbubble('scientist',"La Investigación, es el futuro!",30);
		addsbubble('general',"Los Hoplitas son buenos, y aún mejor con arqueros.",40);
   } else if (showbubble%5) { //If Even
		addsbubble('mayor', "De barcos de transporte, nunca se tiene bastante.",10);
		addsbubble('diplomat',"Sería necesario visitar a nuestros aliados...",20);
		addsbubble('scientist',"Con un poco de cristal, podría acelerar la Investigación.",30);
		addsbubble('general', "Nunca se tienen bastantes aliados...",40);
		addsbubble('mayor', "Siempre listo para evacuar la ciudad si un enemigo se acerca!",50);
		addsbubble('general', "Para asaltar, mejor fusileros que arqueros!",60);
   } else if (showbubble%7) { //If Even
		addsbubble('mayor', "Vender, comprar, y revender; ¡es eso el comercio!",10);
		addsbubble('general', "Necesitamos una muralla al mismo nivel que la intendencia.",20);
		addsbubble('scientist',"Con la Burocracia, se tendrá más lugar en nuestras ciudades.",30);
		addsbubble('general', "¿Dónde está Bambi? Es la hora de su azotaina…...",40);
   } else {
		addsbubble('mayor', "No se está en paro aquí!",10);
		addsbubble('diplomat',"Sería necesario indicar eso, no?",20);
		addsbubble('scientist',"A fuerza de buscar, se encontrará!",30);
		addsbubble('general', "Un buen enemigo, es un enemigo muerto!",40);
   }

	var enlaces = [['http://www.ika-core.org/search/supermap.php'],
		['http://hi.muriandre.com/cdb.php'],
		['http://ikariamlibrary.com/?content=IkaFight'],
		['http://ikariam.ogame-world.com/es/suche.php?view=suche_stadt&land_i=14'],
		['http://ikariam.ogame-world.com/es/suche.php?view=suche_insel&land_i=14'],
                ['http://s3.ikariam.es/index.php?view=sendIKMessage&receiverId=36428']];

	var menuAlianza=[["Mapa", "Encuentra las coordenadas de los jugadores y alianzas"],
		["Compactador de batallas", "Compactador de batallas para publicarlas en el foro"],
		["Simulador de batallas", "Comprueba si vas a ganar una batalla"],
		["Buscador de jugadores", "Busca las ciudades y coordenadas en las que se encuentra un jugador"],
		["Buscador de islas", "Busca las coordenadas de una isla"],
                ["Mensaje a Angelito", "Enviar un mensaje a Angelito"],];


function tools(width,title){	
	var tempmenu='<li><div class="korniza" style="width:'+width+'px"></div>\
							<div class="elisthead" style="width:'+width+'px;">Ivan666</div>\
							<div class="korniza" style="width:'+width+'px"></div>';
	var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;-moz-outline:none;border-bottom:brown dotted 1px" ';
	

	corsairmenu=[[enlaces[0], menuAlianza[0][1], menuAlianza[0][0], 'window.open(this.href, _blank); return false;', ''],
					 [enlaces[1], menuAlianza[1][1], menuAlianza[1][0], 'window.open(this.href, _blank); return false;', ''],
					 [enlaces[2], menuAlianza[2][1], menuAlianza[2][0], 'window.open(this.href, _blank); return false;', ''],
					 [enlaces[3], menuAlianza[3][1], menuAlianza[3][0], 'window.open(this.href, _blank); return false;', ''],
					 [enlaces[4], menuAlianza[4][1], menuAlianza[4][0], 'window.open(this.href, _blank); return false;', ''],
                                         [enlaces[5], menuAlianza[5][1], menuAlianza[5][0], '', '-']];
		
		for (i=0;i<corsairmenu.length;i++) {
			switch (corsairmenu[i][0]) {
			case '.':
				break;
			case '':
				if (corsairmenu[i][3]!="makeframes('.');")
					tempmenu+='<li><center><a '+style+' target="_blank" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			default:
				tempmenu+='<li><center><a '+style+' target="_blank" href="'+corsairmenu[i][0]+'" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			}
		}
 	tempmenu+='<div class="elistfoot" style="width:'+width+'px;"/>';	
 	
   return '<ul>'+tempmenu+'</ul>';
}