// ==UserScript==
// @name		IKA CORE en Español
// @version 	84
// @namespace 	Gboz
// @author		Gboz
// @description	The Ika-core Tools for Alliance - ika-core
// @include		http://s*.ikariam.*/*
// @require		
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
country='es';

CheckVersionBubbleNegative=   "Se chequeó por versiones nuevas, pero no hay ninguna por el momento.";
          NewCoreVersion="Nueva versión Core";
          SideBar_News="Novedades"; //NEW
          SideBar_NewsT="Novedades de Ika-Core"; //NEW
          SideBar_Drag="Mantén presionado y arrastra para mover la Barra Lateral";
          SideBar_Search="Buscar";
          SideBar_SearchT="Buscar jugador/alianza";
          SideBar_ToolsT="Links de la alianza";
          SideBar_Notes="Notas";
          SideBar_NotesT="Notas Cortas";
          SideBar_Allies="Aliados";
          SideBar_AlliesT="Jugadores Aliados";
          SideBar_Enemies="Enemigos";
          SideBar_EnemiesT="Jugadores Enemigos";
          SideBar_Friends="Amigos";
          SideBar_FriendsT="Jugadores Amigos";
          SideBar_Games="Juegos";
          SideBar_GamesT="Menu de Juegos";
          SideBar_Indexing="Indexado";
          SideBar_IndexingT="Progeso de Indexación del Mundo";
          SideBar_Settings="Configuración";
          SideBar_SettingsT="Configuración General";
          SideBar_Chat="Chat";
          SideBar_ChatT="Chat Global";
          SideBar_Search_Add="Agregar";     
          SideBar_Search_Save="Guardar";     
          SideBar_Search_QuickSearch="Búsqueda Rápida";
          SideBar_Search_Player="Jugador";
          SideBar_Search_City="Ciudad"; //NEW
          SideBar_Search_PlayerStatus="Estado del Jugador";
          SideBar_Search_PlayerAll="Todos";
          SideBar_Search_PlayerUnknown="Desconocido";
          SideBar_Search_PlayerNormal="Normal";
          SideBar_Search_PlayerInactive="Inactivo";
          SideBar_Search_PlayerVacation="Vacaciones";
          SideBar_Search_Alliance="Alianza";
          SideBar_Search_Radius="Radio";
          SideBar_Search_Search="Buscar";
          SideBar_Search_Clear="Limpiar"; //NEW
          SideBar_Search_AdvancedSearch="Búsqueda Avanzada";
          SideBar_Search_EnemyAlliances="Alianzas Enemigas";
          AllianceMenu=[
          ["Enviar mensaje<br> a la alianza","Enviar mensaje a todos los aliados"],
          ["Foro "+alliancefullnm,"Ir al Foro de la Alianza" ],
          [alliancefullnm +" posteos nuevos del foro","Ir al Foro de la Alianza, últimos posteos",],
          ["Chatbox(Nueva ventana)","Chat de la Alianza, abre una nueva ventana"],
          ["Chatbox(Pantalla partida)","Chat de la Alianza, muestra el chat en la misma pantalla"],
          ["Simulador de Batallas","Simula el resultado de una batalla"],
          [" Actualizar script de "+alliancefullnm+"." ,"Busca el último script"]];
          IslandLegendAllies="• Aliados";
          IslandLegendNoAlliance="• Sin Alianza";
          IslandLegendEnemies="• Enemigos";
          TreatyAll="Todos los jugadores fueron chequeados. En Amarillo se ven los que no tienen tratado y en Gris los que sí tienen.";
          TreatyYes="Ya tienes un Tratado Cultural con este jugador.";
          TreatyNo="No se encontraros Tratados Culturales con este jugador.";
          updatenotification="Hay una nueva versión del script de "+alliancefullnm+".\n Presiona OK si deseas ir a www.ika-core.org y actualizar ahora.";
          txtplswait="Espere por favor";
          txtrefresh="Actualizar";
          txtpagedata="- Recibiendo página";
          txtinfodata="- Obteniendo información";
          txtchkplayer="- Chequeando jugador";
          CultureTreaties="ultur"; //magic word for treaties fix
          CultureTreatiesCancel=" Cancelar Tratado Cultural";
          CultureTreatiesRequest=" Ofrecer Tratado Cultural";
// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Ika-core';
		alliancenm='ika-core';		
		alliance=[	['�o alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['ika-core'		, Alliance	],
					['ika-core'		, Allies	],
					['-=+'			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='.';
		//forumurl='http://forum.com/';
		forumurlnew='.';
		//forumurlnew='http://=newposts';
		break;
}
	
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"You remind me of a man.", 68);
       addsbubble('scientist',"What man?", 71);
       addsbubble('diplomat',"The man with the power.", 72);
       addsbubble('scientist',"What power?", 74);
       addsbubble('diplomat',"The power of Hoodoo.", 77);
       addsbubble('scientist',"Who do?", 79);
       addsbubble('diplomat',"You do.", 81);
       addsbubble('scientist',"Do what?", 83);
       addsbubble('diplomat',"Remind me of a man.", 85);
       addsbubble('scientist',"What man?", 88);
       addsbubble('diplomat',"The man with the power.", 90);
       addsbubble('scientist',"What power?", 93);
       addsbubble('diplomat',"Give up?", 95);
       addsbubble('scientist',"Give up. Let's go.", 100);
    } else {
       addsbubble('general',"If they go on about Voodoo, who-do ..", 110);
       addsbubble('general', "I'm pushing them off the tower.", 118);
       addsbubble('mayor', "I'll help you.", 121);
    }

