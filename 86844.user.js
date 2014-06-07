// ==UserScript==
// @name		x-tra navigation espaÃ±ol mendigogame V4
// @namespace	autor: das_bazie
// @namespace	traslated: joak.i.ng
// @description	Muestra el menu deslizante mucha mas rapido
// @version		1.54
// @include		http://www.faveladogame.com.br*
// @include		http://www.faveladogame.com.br/change_please/statistics/
// @exclude		http://board.faveladogame.com.br*
// @exclude		http://www.faveladogame.com.br/change_please/*
// ==/UserScript==

// css in html einfuegen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// css fuer hoovermenue
addGlobalStyle('ul li:hover ul ul { display:none; }')
addGlobalStyle('ul li:hover ul { display:block; width:800px; }')
addGlobalStyle('ul ul { z-index:10000; display:none; top:19px; position:absolute; margin-left:0px; left:0px; width:800px; }')
addGlobalStyle('#tabnav a, #tabnav a span { float:left; height:25px; }')
addGlobalStyle('#XtraLinklistSetting, #xn_nav_update { cursor:pointer; } ')
addGlobalStyle('#XtraNavigationOptionen p.aktiv { color:#FFFFFF; }')
addGlobalStyle('#XtraNavigationOptionen p.inaktiv { color:#000000; }')

// seitenadresse ermitteln
var url = document.location.href;
// Linkadressen fuer hamburg
if (url.indexOf("http://www")>=0) {
var gamelink = "http://faveladogame.com.br"
var hslink = "http://faveladogame.com.br/highscore"
var medialink = "http://media.pennergame.de"
var XtraNavLink7Punkt2 = "<li><a href=\"http://board.pennergame.de/\" target=\"_blank\"><span class=\"btn-right\"><span class=\"btn-left\">Forum (alt)</span></span></a></li>";
var XtraNavLink7Punkt3 = "<li><a href=\"http://newboard.pennergame.de/\" target=\"_blank\"><span class=\"btn-right\"><span class=\"btn-left\">Forum (neu)</span></span></a></li>";
var XtraNavLink7Punkt4 = "<li><a href=\"#\" title=\"IRC-Chat\" target=\"_blank\" onclick=\"showchat(); return false;\"><span class=\"btn-right\"><span class=\"btn-left\">IRC-Chat</span></span></a></li>";
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
var hslink = "http://berlin.pennergame.de/highscore"
var medialink = "http://mediaberlin.pennergame.de"
var XtraNavLink7Punkt2 = "<li><a href=\"http://board.pennergame.de/\" target=\"_blank\"><span class=\"btn-right\"><span class=\"btn-left\">Forum (alt)</span></span></a></li>";
var XtraNavLink7Punkt3 = "<li><a href=\"http://newboard.pennergame.de/\" target=\"_blank\"><span class=\"btn-right\"><span class=\"btn-left\">Forum (neu)</span></span></a></li>";
var XtraNavLink7Punkt4 = "<li><a href=\"#\" title=\"IRC-Chat\" target=\"_blank\" onclick=\"showchat(); return false;\"><span class=\"btn-right\"><span class=\"btn-left\">IRC-Chat</span></span></a></li>";
}
// Linkadressen fuer Frankreich
if (url.indexOf("http://www.clodogame")>=0) {
var gamelink = "http://www.clodogame.fr"
var hslink = "http://www.clodogame.fr/highscore"
var medialink = "http://media.clodogame.fr"
var XtraNavLink7Punkt2 = "<li><a href=\"http://board.clodogame.fr/\" target=\"_blank\"><span class=\"btn-right\"><span class=\"btn-left\">Forum</span></span></a></li>";
var XtraNavLink7Punkt3 = "";
var XtraNavLink7Punkt4 = "";
}
// Linkadressen fuer Spanien
if (url.indexOf("http://www.mendigogame")>=0) {
var gamelink = "http://www.mendigogame.es"
var hslink = "http://www.mendigogame.es/highscore"
var medialink = "http://media.mendigogame.es"
var XtraNavLink7Punkt2 = "<li><a href=\"http://board.mendigogame.es/\" target=\"_blank\"><span class=\"btn-right\"><span class=\"btn-left\">Forum</span></span></a></li>";
var XtraNavLink7Punkt3 = "";
var XtraNavLink7Punkt4 = "";
}

// angaben fuer Updatefunktion
var CurrentScriptVersion = '1.54';
var xmlurl = 'http://userscripts.org/scripts/show/64707';
var downloadurl = 'http://userscripts.org/scripts/source/64707.user.js';

// Updaterequest
GM_xmlhttpRequest({
   method: 'GET',
   url: xmlurl,
   onload: function(responseDetails) {
      var content = responseDetails.responseText;
		try{
		var neueversion = content.split('#[V:')[1].split(']#')[0];
		}
		catch(err){
		var neueversion = ""+CurrentScriptVersion+""
		}

// userid auslesen
GM_xmlhttpRequest({
  method: 'GET',
  url: ""+gamelink+"/overview/",
      onload: function( response ) {
      var content = response.responseText;
      var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
	  		try {
			MailLink = content.split('<a href="/messages/">')[1].split('</a>')[0];
			}
			catch(err){
			MailLink = "<img src=\""+medialink+"/img/read.gif\">[0]";
			}
			
// Banden- ID und Name bekommen
GM_xmlhttpRequest({
	method: 'GET',
	url: ""+gamelink+"/dev/api/user."+userid+".xml",
		onload: function(responseDetails) {
		var content = responseDetails.responseText;
			var bandenid = content.split('<id>')[2].split('</id>')[0];
			var bandenname = content.split('<name>')[2].split('</name>')[0];
				try
				{
				ganglink = "<li><a href=\""+gamelink+"/profil/bande:"+bandenid+"/\"><span class=\"btn-right\"><span class=\"btn-left\">"+bandenname+"</span></span></a></li>";
				}
				catch(err)
				{
				ganglink = "<li><a href=\""+gamelink+"/gang/\"><span class=\"btn-right\"><span class=\"btn-left\">Bande</span></span></a></li>";
				}
			
// optionsmenue vorgaben
// link 1 name
var LinkName1 = GM_getValue("LinkName1In");
if (LinkName1 == null){LinkName1 = "Xtra-Navigation EspaÃ±ol by Joak.i.ng";};
// link 1 url
var LinkUrl1 = GM_getValue("LinkUrl1In");
if (LinkUrl1 == null){LinkUrl1 = "http://userscripts.org/scripts/show/60050/";};
// checkbox standart fuer link 1 (true = Anzeigen | false = nicht anzeigen)
var CheckLink1 = GM_getValue("CheckLink1In");
if (CheckLink1 == null){CheckLink1 = "true";};
// auswahlbox target (_self und _blank)
var LinkTarget1 = GM_getValue("LinkTarget1In");
if (LinkTarget1 == null){LinkTarget1 = "_blank";};

// link 2 name
var LinkName2 = GM_getValue("LinkName2In");
if (LinkName2 == null){LinkName2 = "Boton 10 minutos chatarra";};
// link 2 url
var LinkUrl2 = GM_getValue("LinkUrl2In");
if (LinkUrl2 == null){LinkUrl2 = "http://userscripts.org/scripts/show/57064";};
// checkbox standart fuer link 2 (true = Anzeigen | false = nicht anzeigen)
var CheckLink2 = GM_getValue("CheckLink2In");
if (CheckLink2 == null){CheckLink2 = "true";};
// auswahlbox target (_self und _blank)
var LinkTarget2 = GM_getValue("LinkTarget2In");
if (LinkTarget2 == null){LinkTarget2 = "_blank";};

// link 3 name
var LinkName3 = GM_getValue("LinkName3In");
if (LinkName3 == null){LinkName3 = "Perfil de banda Deluxe";};
// link 3 url
var LinkUrl3 = GM_getValue("LinkUrl3In");
if (LinkUrl3 == null){LinkUrl3 = "http://userscripts.org/scripts/show/64394";};
// checkbox standart fuer link 3 (true = Anzeigen | false = nicht anzeigen)
var CheckLink3 = GM_getValue("CheckLink3In");
if (CheckLink3 == null){CheckLink3 = "true";};
// auswahlbox target (_self und _blank)
var LinkTarget3 = GM_getValue("LinkTarget3In");
if (LinkTarget3 == null){LinkTarget3 = "_blank";};

// link 4 name
var LinkName4 = GM_getValue("LinkName4In");
if (LinkName4 == null){LinkName4 = "Aviso Ataque";};
// link 4 url
var LinkUrl4 = GM_getValue("LinkUrl4In");
if (LinkUrl4 == null){LinkUrl4 = "http://userscripts.org/scripts/show/64505";};
// checkbox standart fuer link 4 (true = Anzeigen | false = nicht anzeigen)
var CheckLink4 = GM_getValue("CheckLink4In");
if (CheckLink4 == null){CheckLink4 = "true";};
// auswahlbox target (_self und _blank)
var LinkTarget4 = GM_getValue("LinkTarget4In");
if (LinkTarget4 == null){LinkTarget4 = "_blank";};

// link 5 name
var LinkName5 = GM_getValue("LinkName5In");
if (LinkName5 == null){LinkName5 = "";};
// link 5 url
var LinkUrl5 = GM_getValue("LinkUrl5In");
if (LinkUrl5 == null){LinkUrl5 = "";};
// checkbox standart fuer link 5 (true = Anzeigen | false = nicht anzeigen)
var CheckLink5 = GM_getValue("CheckLink5In");
if (CheckLink5 == null){CheckLink5 = "false";};
// auswahlbox target (_self und _blank)
var LinkTarget5 = GM_getValue("LinkTarget5In");
if (LinkTarget5 == null){LinkTarget5 = "_self";};

// link 6 name
var LinkName6 = GM_getValue("LinkName6In");
if (LinkName6 == null){LinkName6 = "";};
// link 6 url
var LinkUrl6 = GM_getValue("LinkUrl6In");
if (LinkUrl6 == null){LinkUrl6 = "";};
// checkbox standart fuer link 6 (true = Anzeigen | false = nicht anzeigen)
var CheckLink6 = GM_getValue("CheckLink6In");
if (CheckLink6 == null){CheckLink6 = "false";};
// auswahlbox target (_self und _blank)
var LinkTarget6 = GM_getValue("LinkTarget6In");
if (LinkTarget6 == null){LinkTarget6 = "_self";};

// link 7 name
var LinkName7 = GM_getValue("LinkName7In");
if (LinkName7 == null){LinkName7 = "";};
// link 7 url
var LinkUrl7 = GM_getValue("LinkUrl7In");
if (LinkUrl7 == null){LinkUrl7 = "";};
// checkbox standart fuer link 7 (true = Anzeigen | false = nicht anzeigen)
var CheckLink7 = GM_getValue("CheckLink7In");
if (CheckLink7 == null){CheckLink7 = "false";};
// auswahlbox target (_self und _blank)
var LinkTarget7 = GM_getValue("LinkTarget7In");
if (LinkTarget7 == null){LinkTarget7 = "_self";};

// link 8 name
var LinkName8 = GM_getValue("LinkName8In");
if (LinkName8 == null){LinkName8 = "";};
// link 8 url
var LinkUrl8 = GM_getValue("LinkUrl8In");
if (LinkUrl8 == null){LinkUrl8 = "";};
// checkbox standart fuer link 8 (true = Anzeigen | false = nicht anzeigen)
var CheckLink8 = GM_getValue("CheckLink8In");
if (CheckLink8 == null){CheckLink8 = "false";};
// auswahlbox target (_self und _blank)
var LinkTarget8 = GM_getValue("LinkTarget8In");
if (LinkTarget8 == null){LinkTarget8 = "_self";};

// menuepunkte generieren

// menuepunkte uebersicht
// unterpunkte hauptpunkt 1
var XtraNavLink1Punkt1 = "<li><a href=\""+gamelink+"/profil/id:"+userid+"/\"><span class=\"btn-right\"><span class=\"btn-left\">Perfil</span></span></a></li>";
var XtraNavLink1Punkt2 = "<li><a href=\""+gamelink+"/awards/\"><span class=\"btn-right\"><span class=\"btn-left\">Reconocimientos</span></span></a></li>";
var XtraNavLink1Punkt3 = "<li><a href=\""+gamelink+"/financial/\"><span class=\"btn-right\"><span class=\"btn-left\">Finanzas</span></span></a></li>";
var XtraNavLink1Punkt4 = "<li><a href=\""+gamelink+"/change_please/statistics/\"><span class=\"btn-right\"><span class=\"btn-left\">Donaciones</span></span></a></li>";
var XtraNavLink1Punkt5 = "<li><a href=\""+gamelink+"/settings/\"><span class=\"btn-right\"><span class=\"btn-left\">Preferencias</span></span></a></li>";
var XtraNavLink1Punkt6 = "<li><a href=\""+gamelink+"/friendlist/\"><span class=\"btn-right\"><span class=\"btn-left\">Amigos</span></span></a></li>";
// unterpunkte zusammenfassen
var XtraNavLink1Unterpunkte = ""+XtraNavLink1Punkt1+XtraNavLink1Punkt2+XtraNavLink1Punkt3+XtraNavLink1Punkt4+XtraNavLink1Punkt5+XtraNavLink1Punkt6+"";
// hauptpunkt 1
var XtraNaviLink1 = "<li><a href=\""+gamelink+"/overview/\"><span class=\"btn-right\"><span class=\"btn-left\">Resumen</span></span></a><ul>"+XtraNavLink1Unterpunkte+"</ul></li>";

// menuepunkte haustier
// unterpunkte hauptpunkt 2
var XtraNavLink2Punkt1 = "<li><a href=\""+gamelink+"/skills/pet/\"><span class=\"btn-right\"><span class=\"btn-left\">Cursillos</span></span></a></li>";
var XtraNavLink2Punkt2 = "<li><a href=\""+gamelink+"/fight/pet/\"><span class=\"btn-right\"><span class=\"btn-left\">Peleas</span></span></a></li>";
// unterpunkte zusammenfassen
var XtraNavLink2Unterpunkte = ""+XtraNavLink2Punkt1+XtraNavLink2Punkt2+"";
// hauptpunkt 2
var XtraNaviLink2 = "<li><a href=\""+gamelink+"/skills/pet/\"><span class=\"btn-right\"><span class=\"btn-left\">Mascota</span></span></a><ul>"+XtraNavLink2Unterpunkte+"</ul></li>";

// menuepunkte aktionen
// unterpunkte hauptpunkt 3
var XtraNavLink3Punkt1 = "<li><a href=\""+gamelink+"/fight/overview/\"><span class=\"btn-right\"><span class=\"btn-left\">Luchar</span></span></a></li>";
var XtraNavLink3Punkt2 = "<li><a href=\""+gamelink+"/activities/\"><span class=\"btn-right\"><span class=\"btn-left\">Chatarra</span></span></a></li>";
var XtraNavLink3Punkt3 = "<li><a href=\""+gamelink+"/skills/\"><span class=\"btn-right\"><span class=\"btn-left\">Cursillos</span></span></a></li>";
var XtraNavLink3Punkt4 = "<li><a href=\""+gamelink+"/stock/ug_plunder/create/\"><span class=\"btn-right\"><span class=\"btn-left\">Crear cachivache</span></span></a></li>";
// unterpunkte zusammenfassen
var XtraNavLink3Unterpunkte = ""+XtraNavLink3Punkt1+XtraNavLink3Punkt2+XtraNavLink3Punkt3+XtraNavLink3Punkt4+"";
// hauptpunkt 3
var XtraNaviLink3 = "<li><a href=\""+gamelink+"/activities/\"><span class=\"btn-right\"><span class=\"btn-left\">Acciones</span></span></a><ul>"+XtraNavLink3Unterpunkte+"</ul></li>";

// menuepunkte inventar
// unterpunkte hauptpunkt 4
var XtraNavLink4Punkt1 = "<li><a href=\""+gamelink+"/stock/bottle/\"><span class=\"btn-right\"><span class=\"btn-left\">Chatarra</span></span></a></li>";
var XtraNavLink4Punkt2 = "<li><a href=\""+gamelink+"/stock/foodstuffs/\"><span class=\"btn-right\"><span class=\"btn-left\">Bebida</span></span></a></li>";
var XtraNavLink4Punkt3 = "<li><a href=\""+gamelink+"/stock/foodstuffs/food/\"><span class=\"btn-right\"><span class=\"btn-left\">Alimentos</span></span></a></li>";
var XtraNavLink4Punkt4 = "<li><a href=\""+gamelink+"/stock/plunder/\"><span class=\"btn-right\"><span class=\"btn-left\">Cachivaches</span></span></a></li>";
var XtraNavLink4Punkt5 = "<li><a href=\""+gamelink+"/stock/plunder/craft/\"><span class=\"btn-right\"><span class=\"btn-left\">Crear cachivache</span></span></a></li>";
var XtraNavLink4Punkt6 = "<li><a href=\""+gamelink+"/stock/ug_plunder/1/\"><span class=\"btn-right\"><span class=\"btn-left\">Cachivaches especiales</span></span></a></li>";
var XtraNavLink4Punkt7 = "<li><a href=\""+gamelink+"/stock/instruments/\"><span class=\"btn-right\"><span class=\"btn-left\">Instrumentos</span></span></a></li>";
var XtraNavLink4Punkt8 = "<li><a href=\""+gamelink+"/stock/armoury/\"><span class=\"btn-right\"><span class=\"btn-left\">Armeria</span></span></a></li>";
// unterpunkte zusammenfassen
var XtraNavLink4Unterpunkte = ""+XtraNavLink4Punkt1+XtraNavLink4Punkt2+XtraNavLink4Punkt3+XtraNavLink4Punkt4+XtraNavLink4Punkt5+XtraNavLink4Punkt6+XtraNavLink4Punkt7+XtraNavLink4Punkt8+"";
// hauptpunkt 4
var XtraNaviLink4 = "<li><a href=\""+gamelink+"/stock/\"><span class=\"btn-right\"><span class=\"btn-left\">Inventario</span></span></a><ul>"+XtraNavLink4Unterpunkte+"</ul></li>";

// meunuepunkte bande
// unterpunkte hauptpunkt 5
var XtraNavLink5Punkt1 = "<li><a href=\""+gamelink+"/gang/memberlist/\"><span class=\"btn-right\"><span class=\"btn-left\">Miembros</span></span></a></li>";
var XtraNavLink5Punkt2 = "<li><a href=\""+gamelink+"/gang/credit/\"><span class=\"btn-right\"><span class=\"btn-left\">Caja</span></span></a></li>";
var XtraNavLink5Punkt3 = "<li><a href=\""+gamelink+"/gang/forum/\"><span class=\"btn-right\"><span class=\"btn-left\">Foro</span></span></a></li>";
var XtraNavLink5Punkt4 = "<li><a href=\""+gamelink+"/gang/pact/\"><span class=\"btn-right\"><span class=\"btn-left\">Pactos</span></span></a></li>";
var XtraNavLink5Punkt5 = "<li><a href=\""+gamelink+"/gang/fight/\"><span class=\"btn-right\"><span class=\"btn-left\">Luchas</span></span></a></li>";
var XtraNavLink5Punkt6 = "<li><a href=\""+gamelink+"/gang/fight/fightlog/\"><span class=\"btn-right\"><span class=\"btn-left\">Historial Luchas</span></span></a></li>";
var XtraNavLink5Punkt7 = "<li><a href=\""+gamelink+"/gang/upgrades/\"><span class=\"btn-right\"><span class=\"btn-left\">Mejoras</span></span></a></li>";
var XtraNavLink5Punkt8 = "<li><a href=\""+gamelink+"/gang/stuff/\"><span class=\"btn-right\"><span class=\"btn-left\">Banco Cachivaches</span></span></a></li>";
var XtraNavLink5Punkt9 = "<li><a href=\""+gamelink+"/gang/stuff/upgrades/\"><span class=\"btn-right\"><span class=\"btn-left\">Mejoras Cachivaches</span></span></a></li>";
var XtraNavLink5Punkt10 = "<li><a href=\""+gamelink+"/gang/admin/\"><span class=\"btn-right\"><span class=\"btn-left\">(Co-)Admin</span></span></a></li>";
var XtraNavLink5Punkt11 = "<li><a href=\""+gamelink+"/gang/admin/log/\"><span class=\"btn-right\"><span class=\"btn-left\">Adminlog</span></span></a></li>";
// unterpunkte zusammenfassen
var XtraNavLink5Unterpunkte = ""+ganglink+XtraNavLink5Punkt1+XtraNavLink5Punkt2+XtraNavLink5Punkt3+XtraNavLink5Punkt4+XtraNavLink5Punkt5+XtraNavLink5Punkt6+XtraNavLink5Punkt7+XtraNavLink5Punkt8+XtraNavLink5Punkt9+XtraNavLink5Punkt10+XtraNavLink5Punkt11+"";
// hauptpunkt 5
var XtraNaviLink5 = "<li><a href=\""+gamelink+"/gang/\"><span class=\"btn-right\"><span class=\"btn-left\">Banda</span></span></a><ul>"+XtraNavLink5Unterpunkte+"</ul></li>";

// menuepunkte stadt
// unterpunkte hauptpunkt 1
var XtraNavLink6Punkt1 = "<li><a href=\""+gamelink+"/city/map/\"><span class=\"btn-right\"><span class=\"btn-left\">Mapa</span></span></a></li>";
var XtraNavLink6Punkt2 = "<li><a href=\""+gamelink+"/city/district/\"><span class=\"btn-right\"><span class=\"btn-left\">Barrios</span></span></a></li>";
var XtraNavLink6Punkt3 = "<li><a href=\""+gamelink+"/city/medicine/\"><span class=\"btn-right\"><span class=\"btn-left\">Remedios</span></span></a></li>";
var XtraNavLink6Punkt4 = "<li><a href=\""+gamelink+"/city/washhouse/\"><span class=\"btn-right\"><span class=\"btn-left\">Casa de Aseo</span></span></a></li>";
var XtraNavLink6Punkt5 = "<li><a href=\""+gamelink+"/city/home/\"><span class=\"btn-right\"><span class=\"btn-left\">Domicilio</span></span></a></li>";
var XtraNavLink6Punkt6 = "<li><a href=\""+gamelink+"/city/music_store/\"><span class=\"btn-right\"><span class=\"btn-left\">Tienda de musica</span></span></a></li>";
var XtraNavLink6Punkt7 = "<li><a href=\""+gamelink+"/city/scrounge/\"><span class=\"btn-right\"><span class=\"btn-left\">Sitios de Gorronear</span></span></a></li>";
var XtraNavLink6Punkt8 = "<li><a href=\""+gamelink+"/city/games/\"><span class=\"btn-right\"><span class=\"btn-left\">Juegos de azar</span></span></a></li>";
var XtraNavLink6Punkt9 = "<li><a href=\""+gamelink+"/city/supermarket/\"><span class=\"btn-right\"><span class=\"btn-left\">Supermercado</span></span></a></li>";
var XtraNavLink6Punkt10 = "<li><a href=\""+gamelink+"/city/supermarket/food/\"><span class=\"btn-right\"><span class=\"btn-left\">Alimentos</span></span></a></li>";
var XtraNavLink6Punkt11 = "<li><a href=\""+gamelink+"/city/weapon_store/\"><span class=\"btn-right\"><span class=\"btn-left\">Armeria</span></span></a></li>";
var XtraNavLink6Punkt12 = "<li><a href=\""+gamelink+"/city/weapon_store/def/\"><span class=\"btn-right\"><span class=\"btn-left\">Defensa</span></span></a></li>";
var XtraNavLink6Punkt13 = "<li><a href=\""+gamelink+"/city/pet_store/\"><span class=\"btn-right\"><span class=\"btn-left\">Tienda de mascotas</span></span></a></li>";
var XtraNavLink6Punkt14 = "<li><a href=\""+gamelink+"/city/stuff/\"><span class=\"btn-right\"><span class=\"btn-left\">Accesorios</span></span></a></li>";
// unterpunkte zusammenfassen
var XtraNavLink6Unterpunkte1 = ""+XtraNavLink6Punkt1+XtraNavLink6Punkt2+XtraNavLink6Punkt3+XtraNavLink6Punkt4+XtraNavLink6Punkt5+XtraNavLink6Punkt6+XtraNavLink6Punkt7+XtraNavLink6Punkt8+"";
var XtraNavLink6Unterpunkte2 = ""+XtraNavLink6Punkt9+XtraNavLink6Punkt10+XtraNavLink6Punkt11+XtraNavLink6Punkt12+XtraNavLink6Punkt13+XtraNavLink6Punkt14+"";
// hauptpunkt 1
var XtraNaviLink6 = "<li><a href=\""+gamelink+"/city/\"><span class=\"btn-right\"><span class=\"btn-left\">Ciudad</span></span></a><ul>"+XtraNavLink6Unterpunkte1+XtraNavLink6Unterpunkte2+"</ul></li>";

// menuepunkte infos
// unterpunkte hauptpunkt 7
var XtraNavLink7Punkt1 = "<li><a href=\""+gamelink+"/\"><span class=\"btn-right\"><span class=\"btn-left\">Anuncios</span></span></a></li>";
var XtraNavLink7Punkt5 = "<li><a href=\""+gamelink+"/support/\"><span class=\"btn-right\"><span class=\"btn-left\">Soporte</span></span></a></li>";
var XtraNavLink7Punkt6 = "<li><a href=\""+gamelink+"/messages/\"><span class=\"btn-right\"><span class=\"btn-left\">Mensajes entrantes</span></span></a></li>";
var XtraNavLink7Punkt7 = "<li><a href=\""+gamelink+"/messages/out/\"><span class=\"btn-right\"><span class=\"btn-left\">Mensajes salientes</span></span></a></li>";
var XtraNavLink7Punkt8 = "<li><a href=\""+gamelink+"/messages/write/\"><span class=\"btn-right\"><span class=\"btn-left\">Enviar Mensaje</span></span></a></li>";
// unterpunkte zusammenfassen
var XtraNavLink7Unterpunkte = ""+XtraNavLink7Punkt1+XtraNavLink7Punkt2+XtraNavLink7Punkt3+XtraNavLink7Punkt4+XtraNavLink7Punkt5+XtraNavLink7Punkt6+XtraNavLink7Punkt7+XtraNavLink7Punkt8+"";
// hauptpunkt 7
var XtraNaviLink7 = "<li><a href=\""+gamelink+"/messages/\"><span class=\"btn-right\"><span class=\"btn-left\">Mensajes "+MailLink+"</span></span></a><ul>"+XtraNavLink7Unterpunkte+"</ul></li>";

// menuepunkte highscore
// unterpunkte hauptpunkt 8
var XtraNavLink8Punkt1 = "<li><a href=\""+gamelink+"/highscore/joindate/\"><span class=\"btn-right\"><span class=\"btn-left\">Mi clasificacion</span></span></a></li>";
var XtraNavLink8Punkt2 = "<li><a href=\""+gamelink+"/highscore/user/\"><span class=\"btn-right\"><span class=\"btn-left\">Clasif. de Jugadores</span></span></a></li>";
var XtraNavLink8Punkt3 = "<li><a href=\""+gamelink+"/highscore/gang/\"><span class=\"btn-right\"><span class=\"btn-left\">Clasif. de Bandas</span></span></a></li>";
var XtraNavLink8Punkt4 = "<li><a href=\""+gamelink+"/highscore/rank/\"><span class=\"btn-right\"><span class=\"btn-left\">Hall of Fame</span></span></a></li>";
var XtraNavLink8Punkt5 = "<li><a href=\""+gamelink+"/highscore/stuff/\"><span class=\"btn-right\"><span class=\"btn-left\">Clasif. de Cachivaces</span></span></a></li>";
// unterpunkte zusammenfassen
var XtraNavLink8Unterpunkte = ""+XtraNavLink8Punkt1+XtraNavLink8Punkt2+XtraNavLink8Punkt3+XtraNavLink8Punkt4+XtraNavLink8Punkt5+"";
// hauptpunkt 8
var XtraNaviLink8 = "<li><a href=\""+gamelink+"/highscore/user/\"><span class=\"btn-right\"><span class=\"btn-left\">Clasificacion</span></span></a><ul>"+XtraNavLink8Unterpunkte+"</ul></li>";


if (CheckLink1 == "true")
{var TLink1 = "<li><a href=\""+LinkUrl1+"\" target=\""+LinkTarget1+"\"><span class=\"btn-right\"><span class=\"btn-left\">"+LinkName1+"</span></span></a></li>";}
else{var TLink1 = "";};

if (CheckLink2 == "true")
{var TLink2 = "<li><a href=\""+LinkUrl2+"\" target=\""+LinkTarget2+"\"><span class=\"btn-right\"><span class=\"btn-left\">"+LinkName2+"</span></span></a></li>";}
else{var TLink2 = "";};

if (CheckLink3 == "true")
{var TLink3 = "<li><a href=\""+LinkUrl3+"\" target=\""+LinkTarget3+"\"><span class=\"btn-right\"><span class=\"btn-left\">"+LinkName3+"</span></span></a></li>";}
else{var TLink3 = "";};

if (CheckLink4 == "true")
{var TLink4 = "<li><a href=\""+LinkUrl4+"\" target=\""+LinkTarget4+"\"><span class=\"btn-right\"><span class=\"btn-left\">"+LinkName4+"</span></span></a></li>";}
else{var TLink4 = "";};

if (CheckLink5 == "true")
{var TLink5 = "<li><a href=\""+LinkUrl5+"\" target=\""+LinkTarget5+"\"><span class=\"btn-right\"><span class=\"btn-left\">"+LinkName5+"</span></span></a></li>";}
else{var TLink5 = "";};

if (CheckLink6 == "true")
{var TLink6 = "<li><a href=\""+LinkUrl6+"\" target=\""+LinkTarget6+"\"><span class=\"btn-right\"><span class=\"btn-left\">"+LinkName6+"</span></span></a></li>";}
else{var TLink6 = "";};

if (CheckLink7 == "true")
{var TLink7 = "<li><a href=\""+LinkUrl7+"\" target=\""+LinkTarget7+"\"><span class=\"btn-right\"><span class=\"btn-left\">"+LinkName7+"</span></span></a></li>";}
else{var TLink7 = "";};

if (CheckLink8 == "true")
{var TLink8 = "<li><a href=\""+LinkUrl8+"\" target=\""+LinkTarget8+"\"><span class=\"btn-right\"><span class=\"btn-left\">"+LinkName8+"</span></span></a></li>";}
else{var TLink8 = "";};

// menuepunkte linkliste zusammenfassen
var TLinkMenue = "<li><a id=\"XtraLinklistSetting\" name=\"EinstellungenXtraNavigation\"><span class=\"btn-right\"><span class=\"btn-left\">Links</span></span></a><ul>"+TLink1+TLink2+TLink3+TLink4+TLink5+TLink6+TLink7+TLink8+"</ul></li>";

// updatelink
if (CurrentScriptVersion != neueversion){
var XtraNavUpdate = "<li><a id=\"xn_nav_update\"><span class=\"btn-right\"><span class=\"btn-left\"><font color=\"#FFFFFF\">UPDATE</font></span></span></a></li>";
}else{
var XtraNavUpdate = "";
}

// linkkette hauptlinks
var XtraNavHauptlinks = ""+XtraNaviLink1+XtraNaviLink2+XtraNaviLink3+XtraNaviLink4+XtraNaviLink5+XtraNaviLink6+XtraNaviLink7+XtraNaviLink8+TLinkMenue+XtraNavUpdate+"";

// menue in vorhandenes html einfuegen
document.getElementById("tabnav").innerHTML = "<ul id=\"nav-2\" class=\"hmenu zabsolute\">"+XtraNavHauptlinks+"</ul>";

// meldung bei klick auf update
if (CurrentScriptVersion != neueversion){

document.getElementById("xn_nav_update").addEventListener("click", function Oeffnen () {
updateinstall = window.confirm ("Updateversion: "+neueversion+"\nVista la web\n\nIntalar update?");

if (updateinstall == true){
self.location.href = downloadurl
}else{}

},false);

}else{}

// optionsmenue menuepunkte
if (CheckLink1 == "true")
{var OLink1 = "<p class=\"aktiv\">Link-1: <input name=\"CheckLink1In\" type=\"checkbox\" checked=\"checked\" /> Nombre: <input name=\"LinkName1In\" size=\"32\" type=\"text\" value=\""+LinkName1+"\"> Ventana: <select name=\"LinkTarget1In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl1In\" size=\"80\" type=\"text\" value=\""+LinkUrl1+"\"></p>";}
else
{var OLink1 = "<p class=\"inaktiv\">Link-1: <input name=\"CheckLink1In\" type=\"checkbox\" /> Nombre: <input name=\"LinkName1In\" size=\"32\" type=\"text\" value=\""+LinkName1+"\"> Ventana: <select name=\"LinkTarget1In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl1In\" size=\"80\" type=\"text\" value=\""+LinkUrl1+"\"></p>";};

if (CheckLink2 == "true")
{var OLink2 = "<p class=\"aktiv\">Link-2: <input name=\"CheckLink2In\" type=\"checkbox\" checked=\"checked\" /> Nombre: <input name=\"LinkName2In\" size=\"32\" type=\"text\" value=\""+LinkName2+"\"> Ventana: <select name=\"LinkTarget2In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl2In\" size=\"80\" type=\"text\" value=\""+LinkUrl2+"\"></p>";}
else
{var OLink2 = "<p class=\"inaktiv\">Link-2: <input name=\"CheckLink2In\" type=\"checkbox\" /> Nombre: <input name=\"LinkName2In\" size=\"32\" type=\"text\" value=\""+LinkName2+"\"> Ventana: <select name=\"LinkTarget2In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl2In\" size=\"80\" type=\"text\" value=\""+LinkUrl2+"\"></p>";};

if (CheckLink3 == "true")
{var OLink3 = "<p class=\"aktiv\">Link-3: <input name=\"CheckLink3In\" type=\"checkbox\" checked=\"checked\" /> Nombre: <input name=\"LinkName3In\" size=\"32\" type=\"text\" value=\""+LinkName3+"\"> Ventana: <select name=\"LinkTarget3In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl3In\" size=\"80\" type=\"text\" value=\""+LinkUrl3+"\"></p>";}
else
{var OLink3 = "<p class=\"inaktiv\">Link-3: <input name=\"CheckLink3In\" type=\"checkbox\" /> Nombre: <input name=\"LinkName3In\" size=\"32\" type=\"text\" value=\""+LinkName3+"\"> Ventana: <select name=\"LinkTarget3In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl3In\" size=\"80\" type=\"text\" value=\""+LinkUrl3+"\"></p>";};

if (CheckLink4 == "true")
{var OLink4 = "<p class=\"aktiv\">Link-4: <input name=\"CheckLink4In\" type=\"checkbox\" checked=\"checked\" /> Nombre: <input name=\"LinkName4In\" size=\"32\" type=\"text\" value=\""+LinkName4+"\"> Ventana: <select name=\"LinkTarget4In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl4In\" size=\"80\" type=\"text\" value=\""+LinkUrl4+"\"></p>";}
else
{var OLink4 = "<p class=\"inaktiv\">Link-4: <input name=\"CheckLink4In\" type=\"checkbox\" /> Nombre: <input name=\"LinkName4In\" size=\"32\" type=\"text\" value=\""+LinkName4+"\"> Ventana: <select name=\"LinkTarget4In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl4In\" size=\"80\" type=\"text\" value=\""+LinkUrl4+"\"></p>";};

if (CheckLink5 == "true")
{var OLink5 = "<p class=\"aktiv\">Link-5: <input name=\"CheckLink5In\" type=\"checkbox\" checked=\"checked\" /> Nombre: <input name=\"LinkName5In\" size=\"32\" type=\"text\" value=\""+LinkName5+"\"> Ventana: <select name=\"LinkTarget5In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl5In\" size=\"80\" type=\"text\" value=\""+LinkUrl5+"\"></p>";}
else
{var OLink5 = "<p class=\"inaktiv\">Link-5: <input name=\"CheckLink5In\" type=\"checkbox\" /> Nombre: <input name=\"LinkName5In\" size=\"32\" type=\"text\" value=\""+LinkName5+"\"> Ventana: <select name=\"LinkTarget5In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl5In\" size=\"80\" type=\"text\" value=\""+LinkUrl5+"\"></p>";};

if (CheckLink6 == "true")
{var OLink6 = "<p class=\"aktiv\">Link-6: <input name=\"CheckLink6In\" type=\"checkbox\" checked=\"checked\" /> Nombre: <input name=\"LinkName6In\" size=\"32\" type=\"text\" value=\""+LinkName6+"\"> Ventana: <select name=\"LinkTarget6In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl6In\" size=\"80\" type=\"text\" value=\""+LinkUrl6+"\"></p>";}
else
{var OLink6 = "<p class=\"inaktiv\">Link-6: <input name=\"CheckLink6In\" type=\"checkbox\" /> Nombre: <input name=\"LinkName6In\" size=\"32\" type=\"text\" value=\""+LinkName6+"\"> Ventana: <select name=\"LinkTarget6In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl6In\" size=\"80\" type=\"text\" value=\""+LinkUrl6+"\"></p>";};

if (CheckLink7 == "true")
{var OLink7 = "<p class=\"aktiv\">Link-7: <input name=\"CheckLink7In\" type=\"checkbox\" checked=\"checked\" /> Nombre: <input name=\"LinkName7In\" size=\"32\" type=\"text\" value=\""+LinkName7+"\"> Ventana: <select name=\"LinkTarget7In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl7In\" size=\"80\" type=\"text\" value=\""+LinkUrl7+"\"></p>";}
else
{var OLink7 = "<p class=\"inaktiv\">Link-7: <input name=\"CheckLink7In\" type=\"checkbox\" /> Nombre: <input name=\"LinkName7In\" size=\"32\" type=\"text\" value=\""+LinkName7+"\"> Ventana: <select name=\"LinkTarget7In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl7In\" size=\"80\" type=\"text\" value=\""+LinkUrl7+"\"></p>";};

if (CheckLink8 == "true")
{var OLink8 = "<p class=\"aktiv\">Link-8: <input name=\"CheckLink8In\" type=\"checkbox\" checked=\"checked\" /> Nombre: <input name=\"LinkName8In\" size=\"32\" type=\"text\" value=\""+LinkName8+"\"> Ventana: <select name=\"LinkTarget8In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl8In\" size=\"80\" type=\"text\" value=\""+LinkUrl8+"\"></p>";}
else
{var OLink8 = "<p class=\"inaktiv\">Link-8: <input name=\"CheckLink8In\" type=\"checkbox\" /> Nombre: <input name=\"LinkName8In\" size=\"32\" type=\"text\" value=\""+LinkName8+"\"> Ventana: <select name=\"LinkTarget8In\"><option value=\"_blank\">Nueva</option><option value=\"_self\">La misma</option></select><br/>Direccion: <input name=\"LinkUrl8In\" size=\"80\" type=\"text\" value=\""+LinkUrl8+"\"></p>";};

var OXtraNavigationAbbrechen = "<input type=\"submit\" class=\"formbutton\" name=\"SchliessenXtraNavigation\" value=\"Cancelar\" />";
var OSpeichern = "<input type=\"submit\" class=\"formbutton\"  name=\"SpeichernTopMenue\" value=\"Guardar\">";

// optionsmenue einzelpunkte
var OXtraNavigationTop1 = "<tr><td colspan=\"3\" align=\"left\" height=\"15\" valign=\"top\"><span class=\"tiername\"><p class=\"aktiv\">X-Tra Navigation configuracion</p></span><hr size=\"1\"></td></tr>";

var OXtraNavigationLink1 = "<tr><td>"+OLink1+"<hr size=\"1\"></td></tr>";
var OXtraNavigationLink2 = "<tr><td>"+OLink2+"<hr size=\"1\"></td></tr>";
var OXtraNavigationLink3 = "<tr><td>"+OLink3+"<hr size=\"1\"></td></tr>";
var OXtraNavigationLink4 = "<tr><td>"+OLink4+"<hr size=\"1\"></td></tr>";
var OXtraNavigationLink5 = "<tr><td>"+OLink5+"<hr size=\"1\"></td></tr>";
var OXtraNavigationLink6 = "<tr><td>"+OLink6+"<hr size=\"1\"></td></tr>";
var OXtraNavigationLink7 = "<tr><td>"+OLink7+"<hr size=\"1\"></td></tr>";
var OXtraNavigationLink8 = "<tr><td>"+OLink8+"<hr size=\"1\"></td></tr>";

var OptionsLinkKette = ""+OXtraNavigationTop1+OXtraNavigationLink1+OXtraNavigationLink2+OXtraNavigationLink3+OXtraNavigationLink4+OXtraNavigationLink5+OXtraNavigationLink6+OXtraNavigationLink7+OXtraNavigationLink8+OXtraNavigationAbbrechen+OSpeichern+"";

// beim klick auf einstellungen
document.getElementsByName('EinstellungenXtraNavigation')[0].addEventListener('click', function EinstellungenXtraNavigation () {

// optionsmenue in html einfuegen
document.getElementById("provocation_area").innerHTML = "<div id=\"XtraNavigationOptionen\" class=\"tieritemA\" width=\"450\"><tbody>"+OptionsLinkKette+"</tbody></div>";

// wurde speichern geklickt dan........
document.getElementsByName('SpeichernTopMenue')[0].addEventListener('click', function Schliessen () {

// speichern.....
// link adresse und name 1
GM_setValue('LinkName1In', document.getElementsByName('LinkName1In')[0].value);
GM_setValue('LinkUrl1In', document.getElementsByName('LinkUrl1In')[0].value);
// link checkbox 1
if (document.getElementsByName('CheckLink1In')[0].checked == true)
{GM_setValue("CheckLink1In", "true");}else{GM_setValue("CheckLink1In", "false");}
// target
GM_setValue("LinkTarget1In", document.getElementsByName('LinkTarget1In')[0].value);

// link adresse und name 2
GM_setValue('LinkName2In', document.getElementsByName('LinkName2In')[0].value);
GM_setValue('LinkUrl2In', document.getElementsByName('LinkUrl2In')[0].value);
// link checkbox 2
if (document.getElementsByName('CheckLink2In')[0].checked == true)
{GM_setValue("CheckLink2In", "true");}else{GM_setValue("CheckLink2In", "false");}
// target
GM_setValue("LinkTarget2In", document.getElementsByName('LinkTarget2In')[0].value);

// link adresse und name 3
GM_setValue('LinkName3In', document.getElementsByName('LinkName3In')[0].value);
GM_setValue('LinkUrl3In', document.getElementsByName('LinkUrl3In')[0].value);
// link checkbox 3
if (document.getElementsByName('CheckLink3In')[0].checked == true)
{GM_setValue("CheckLink3In", "true");}else{GM_setValue("CheckLink3In", "false");}
// target
GM_setValue("LinkTarget3In", document.getElementsByName('LinkTarget3In')[0].value);

// link adresse und name 4
GM_setValue('LinkName4In', document.getElementsByName('LinkName4In')[0].value);
GM_setValue('LinkUrl4In', document.getElementsByName('LinkUrl4In')[0].value);
// link checkbox 4
if (document.getElementsByName('CheckLink4In')[0].checked == true)
{GM_setValue("CheckLink4In", "true");}else{GM_setValue("CheckLink4In", "false");}
// target
GM_setValue("LinkTarget4In", document.getElementsByName('LinkTarget4In')[0].value);

// link adresse und name 5
GM_setValue('LinkName5In', document.getElementsByName('LinkName5In')[0].value);
GM_setValue('LinkUrl5In', document.getElementsByName('LinkUrl5In')[0].value);
// link checkbox 5
if (document.getElementsByName('CheckLink5In')[0].checked == true)
{GM_setValue("CheckLink5In", "true");}else{GM_setValue("CheckLink5In", "false");}
// target
GM_setValue("LinkTarget5In", document.getElementsByName('LinkTarget5In')[0].value);

// link adresse und name 6
GM_setValue('LinkName6In', document.getElementsByName('LinkName6In')[0].value);
GM_setValue('LinkUrl6In', document.getElementsByName('LinkUrl6In')[0].value);
// link checkbox 6
if (document.getElementsByName('CheckLink6In')[0].checked == true)
{GM_setValue("CheckLink6In", "true");}else{GM_setValue("CheckLink6In", "false");}
// target
GM_setValue("LinkTarget6In", document.getElementsByName('LinkTarget6In')[0].value);

// link adresse und name 7
GM_setValue('LinkName7In', document.getElementsByName('LinkName7In')[0].value);
GM_setValue('LinkUrl7In', document.getElementsByName('LinkUrl7In')[0].value);
// link checkbox 7
if (document.getElementsByName('CheckLink7In')[0].checked == true)
{GM_setValue("CheckLink7In", "true");}else{GM_setValue("CheckLink7In", "false");}
// target
GM_setValue("LinkTarget7In", document.getElementsByName('LinkTarget7In')[0].value);

// link adresse und name 8
GM_setValue('LinkName8In', document.getElementsByName('LinkName8In')[0].value);
GM_setValue('LinkUrl8In', document.getElementsByName('LinkUrl8In')[0].value);
// link checkbox 8
if (document.getElementsByName('CheckLink8In')[0].checked == true)
{GM_setValue("CheckLink8In", "true");}else{GM_setValue("CheckLink8In", "false");}
// target
GM_setValue("LinkTarget8In", document.getElementsByName('LinkTarget8In')[0].value);

// nach speichern seite neu laden
window.location.reload();
},false);

// Wurde abbrechen geklickt dann...
document.getElementsByName('SchliessenXtraNavigation')[0].addEventListener('click', function Schliessen () {
// Seite neu laden
window.location.reload();
},false);

// nach einstellungen neu laden
},false);


// klammern bandenid
}})
// klammern userid
}})
// klammern update
}})

// nav-1 div auf diversen seiten entfernen (oberer teil der navi bei stadt und bande)
function removeElement( element ) {
	try {
    	element.parentNode.removeChild( element );
	} catch( error ){
	}
}

function remove_nav1_div() {
	try {
		removeElement( document.getElementById('nav-1') );
	} catch( error ) {
		stack.push( error );
	}
}

function init() {
	remove_nav1_div();
}

init();
window.addEventListener("load", init, false);