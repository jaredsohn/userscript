// ==UserScript==
// @name		SUPER Tools
// @version 	82
// @namespace 	Gboz
// @author		Gboz
// @description	 UVS-ika-core
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

var version=108;
var scriptlocation = "http://userscripts.org/scripts/edit_src/43942.user.js";
var scripthomepage = "http://userscripts.org/scripts/edit_src/43942";

switch (location.host) {
	case 's7.ikariam.com.pt':
		alliancefullnm='ARES-UN-';
		alliancenm='SUPER';		
		alliance=[	['Îo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['SUPER'			, Allies	],
					 ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://cocompacific.forumactif.net/chatbox/chatbox.forum?';
		//forumurl='.';
		forumurl='http://cocompacific.forumactif.net/alliance-ccp-c1/';
		//forumurlnew='.';
		forumurlnew='http://cocompacific.forumactif.net/search.forum?search_id=newposts';
		break;
	}
	main();
	ToolsMenu();
	fixtreaties();

// Pour le fun. Autant en profiter pour mettre des conseils...
var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
		addsbubble('mayor', "Ca va, ca vient...",10);
		addsbubble('diplomat',"Rien Ã  dire ?",20);
		addsbubble('scientist',"Des bonnes idÃ©es, ca rapporte !",30);
		addsbubble('general',"Hum, j'ai cru voir un Gros Ours...",40);
		addsbubble('mayor', "Il nous faut une cachette au mÃªme niveau que l'hotel de ville",50);
   } else if (showbubble%3) { //If Even
		addsbubble('mayor', "Un bateau de transport, Ã§a ne devrait pas rester Ã  rien faire au port.",10);
		addsbubble('diplomat',"Faudrait demander Ã  notre chef, non ?",20);
		addsbubble('scientist',"La Recherche, c'est l'avenir !",30);
		addsbubble('general',"Des phalanges c'est bien, et encore mieux avec des archers.",40);
   } else if (showbubble%5) { //If Even
		addsbubble('mayor', "Des bateaux de transport, on n'en a jamais assez.",10);
		addsbubble('diplomat',"Faudrait rendre visite Ã  nos alliÃ©s...",20);
		addsbubble('scientist',"Avec un peu de cristal, je pourrais accÃ©lÃ©rer la Recherche.",30);
		addsbubble('general', "On a jamais assez d'alliÃ©s...",40);
		addsbubble('mayor', "Toujours prÃªt Ã  Ã©vacuer la ville si un PE approche !",50);
		addsbubble('general', "Vaut mieux des tireurs que des archers !",60);
   } else if (showbubble%7) { //If Even
		addsbubble('mayor', "Vendre, acheter, et re-vendre ; c'est Ã§a le commerce !",10);
		addsbubble('general', "Il nous faut un mur au mÃªme niveau que l'hotel de ville.",20);
		addsbubble('scientist',"Avec la Bureaucratie, on aura plus de place dans nos villes.",30);
		addsbubble('general', "Il est oÃ¹ Bambi ? C'est l'heure de sa fessÃ©e...",40);
   } else {
		addsbubble('mayor', "On chome pas ici !",10);
		addsbubble('diplomat',"Faudrait signaler Ã§Ã , non ?",20);
		addsbubble('scientist',"A force de chercher, on trouvera !",30);
		addsbubble('general', "Un bon PE, c'est un PE mort !",40);

    }

// Fix for ally script update
function tools(width,title){	
		var tempmenu='<li><div class="korniza" style="width:'+width+'px"></div>\
<div class="elisthead" style="width:'+width+'px;">'+title+'</div>\
<div class="korniza" style="width:'+width+'px"></div>';
		var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;-moz-outline:none;border-bottom:brown dotted 1px" ';
		corsairmenu=[['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , AllianceMenu[0][1], AllianceMenu[0][0],'','-'],
		[forumurl	,  AllianceMenu[1][1], AllianceMenu[1][0],''],
		[forumurlnew,  AllianceMenu[2][1], AllianceMenu[2][0],'','-'],
		[chaturl 	,  AllianceMenu[3][1], AllianceMenu[3][0],'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		[''			,  AllianceMenu[4][1], AllianceMenu[4][0],'makeframes(\''+chaturl+'\');' ,'-'],
		['http://ikariamlibrary.com/?content=IkaFight' ,  AllianceMenu[5][1], AllianceMenu[5][0],'window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[scripthomepage,  AllianceMenu[6][1], AllianceMenu[6][0],'']];	   
		for (i=0;i<corsairmenu.length;i++) {
			switch (corsairmenu[i][0]) {
			case '.':
				break;
			case '':
				if (corsairmenu[i][3]!="makeframes('.');") tempmenu+='<li><center><a '+style+' target="_blank" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			default:
				tempmenu+='<li><center><a '+style+' target="_blank" href="'+corsairmenu[i][0]+'" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			}
		}
 	tempmenu+='<div class="elistfoot" style="width:'+width+'px;"/>';	
   return '<ul>'+tempmenu+'</ul>';
}
