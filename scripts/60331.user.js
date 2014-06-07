// ==UserScript==
// @name		The Ika-core Hawks-Excalibur v2
// @version 	2
// @namespace 	Gboz
// @author		ff
// @description	The Ika-core Tools for Alliance - Hawks-Excalibur
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

var version=2;
var scriptlocation = "http://userscripts.org/scripts/source/60331.user.js";
var scripthomepage = "http://userscripts.org/scripts/show/60331";



			alliancefullnm='Hawks-Excalibur';
		alliancenm='Hw-Ex';		
		alliance=[['?o alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
                                         
                                         ['hof' , Enemies ],
                                         ['Nzdom' , Allies ],['Tkod' , Allies ],];


		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		
	

	

	var enlaces = [['http://ripeace.withme.us/forum.htm'],
		['http://tools.betawarriors.com/ikcrc/'],
		['http://ikariam.gamestats.org/battlesim'],
		['http://www.ika-world.com/search.php?view=suche_spieler&land=pt&welt=3'],
		['http://www.ika-world.com/search.php?view=suche_insel&land=pt&welt=3'],
['http://ika-world.com/search.php?view=alliance_details&land=pt&welt=3&allianz=hw-ex&show=pie'],
                ];

	var menuAlianza=[["Forum", "Forum da nossa aliança"],
		["Conversor de batalhas", "Conversor de Rc´s para poderes colocar no forum"],
		["Simulador de batalhas", "Antes de atacar simula a batalha"],
		["Procurar Jogadores", "Procura as coordenadas dum Jogador"],
		["Procurar ilhas", "Procura ilhas"],
                 ["Estatísticas Hw-Ex", "Mostra as estatísticas da nossa ally"], 
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

[enlaces[5], menuAlianza[5][1], menuAlianza[5][0], 'window.open(this.href, _blank); return false;', ''],
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



	
	
   