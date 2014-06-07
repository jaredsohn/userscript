// ==UserScript==
// @name		Ika-Core Hawks-Excalibur
// @version 	82
// @namespace 	Gboz
// @author		Gboz
// @description	Ika-Core Hawks-Excalibur
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=84;
var scriptlocation="http://userscripts.org/scripts/source/58934.user.js";

switch (location.host) {
	default:
		
		alliancefullnm='Hawks-Excalibur';
		alliancenm='Hw-Ex';		
		alliance=[['?o alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],

                                         ['kod' , Enemies ],
                                         ['hof' , Enemies ],
                                         ['cdom' , Allies ],




];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//forumurl='.';
		//forumurlnew='.';
}


		
		
	
	
	fixtreaties();

// Consejos de los mandatarios
	var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
		addsbubble('mayor', "Os espiões abrem brechas nas muralhas",10);
		addsbubble('diplomat',"Vai ver se tens espiões a defesa",20);
		addsbubble('scientist',"Se és recruta evolui bastante as academias",30);
		addsbubble('general',"Espionagem deve ter o nivel da Cm",40);
	
   } else if (showbubble%3) { //If Even
		addsbubble('mayor', "Não acumules muito ouro compra barcos de comercio",10);
		addsbubble('diplomat',"Se fores atacado fala com o Capitão",20);
		addsbubble('scientist',"Podes comprar pesquisas com Cristal",30);
		addsbubble('general',"Muros devem ter o mesmo nível da Cm",40);
   } else if (showbubble%5) { //If Even
		addsbubble('mayor', "Carpintaria baixa o custo da madeira.",10);
		addsbubble('diplomat',"Visita o nosso Forum",20);
		addsbubble('general', "Aríetes e catapultas abrem brechas nas muralhas",20);
	
		addsbubble('general', "´Quanto + Fundeiros mais energia vai ter o combate",30);
   } else if (showbubble%7) { //If Even
		addsbubble('mayor', "Melhor aliança do Gamma Hawks-Excalibur",10);
		addsbubble('general', "Procura inactivos na tua zona",20);
		addsbubble('scientist',"Verifica as academias",30);
		
   } else {
		addsbubble('mayor', "Hawks-Excalibur",10);
		addsbubble('diplomat',"Lança aí uma piada para a aliança!!!",20);
		addsbubble('scientist',"As pesquisas dão muitos pontos!!",30);
		addsbubble('general', "PORRADA NELES",40);
   }

	var enlaces = [['http://ripeace.withme.us/forum.htm'],
		['http://s1.convertisseur-ikariam.fr.nf/'],
		['http://ikariam.gamestats.org/battlesim'],
		['http://www.ika-world.com/pt/suche.php?view=suche_stadt&land=pt'],
		['http://www.ika-world.com/pt/suche.php?view=suche_insel&land=pt'],
                ];

	var menuAlianza=[["Forum", "Forum da nossa aliança"],
		["Conversor de batalhas", "Conversor de Rc´s para poderes colocar no forum"],
		["Simulador de batalhas", "Antes de atacar simula a batalha"],
		["Procurar Jogadores", "Procura as coordenadas dum Jogador"],
		["Procurar ilhas", "Procura ilhas"],
               ];


function tools(width,title){	
	var tempmenu='<li><div class="korniza" style="width:'+width+'px"></div>\
							<div class="elisthead" style="width:'+width+'px;">Hawks-Excal</div>\
							<div class="korniza" style="width:'+width+'px"></div>';
	var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;-moz-outline:none;border-bottom:brown dotted 1px" ';
	

	corsairmenu=[[enlaces[0], menuAlianza[0][1], menuAlianza[0][0], 'window.open(this.href, _blank); return false;', ''],
					 [enlaces[1], menuAlianza[1][1], menuAlianza[1][0], 'window.open(this.href, _blank); return false;', ''],
					 [enlaces[2], menuAlianza[2][1], menuAlianza[2][0], 'window.open(this.href, _blank); return false;', ''],
					 [enlaces[3], menuAlianza[3][1], menuAlianza[3][0], 'window.open(this.href, _blank); return false;', ''],
					 [enlaces[4], menuAlianza[4][1], menuAlianza[4][0], 'window.open(this.href, _blank); return false;', ''],
                                         ];
		
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





