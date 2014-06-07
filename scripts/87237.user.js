// ==UserScript==
// @name           DropDown Menus + MZScript | frankito777
// @description    BBCode tags, íconos, atajos y más para el foro, GB y pizarras en MZ.
// @include        http://*managerzone.*
// @version        2.9.2
// @copyright      Copyright (c) 2010, frankito777
// @authors        frankito777 (frankito777@managerzone.com)
// @thanx to       c_c (c_c@managerzone.com) | serbocapo (serbocapo@managerzone.com)
// @credits	   some icons are by Yusuke Kamiyamane [http://p.yusukekamiyamane.com/]
// ==/UserScript==

(function(){
var dominios = ['ar', 'at', 'biz', 'bo', 'br', 'ch', 'cl', 'co', 'com', 'cr', 'cz', 'de', 'dk', 'do', 'ec', 'edu', 'es', 'eu', 'fm', 'fr', 'gb', 'gov', 'gr', 'gt', 'hn', 'hr', 'ie', 'info', 'int', 'it', 'jobs', 'lt', 'lv', 'ly', 'mx', 'mz', 'net', 'ni', 'org', 'pa', 'pe', 'pl', 'pr', 'pt', 'py', 'ro', 'ru', 'sv', 'se', 'th', 'tk', 'tn', 'to', 'tr', 'tv', 'tz', 'uk', 'us', 'uy', 've', 'vg', 'xxx', 'yu', 'zw'];
var etiqOut = ['a', 'applet', 'area', 'embed', 'frame', 'frameset', 'head', 'iframe', 'img', 'map', 'meta', 'noscript', 'object', 'option', 'param', 'script', 'select', 'style', 'textarea', 'title'];
var inArray = function(value, items) {for (var i = 0; items[i] && value != items[i]; i++);return value == items[i];}
var regExp = /(^|[\s()\[\]_:~+@*"'>])((?:https?|ftp|irc):\/\/)?([-a-z\d;:&=+$,%_.!~*'()]+@)?((?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:(www|irc|ftp)\.)?(?:(?:[a-z\d]|[a-z\d][a-z\d-]*[a-z\d])\.)+([a-z]{2,6}))(:\d+)?(\/(?:[-\w.!~*'()%:@&=+$,;\/]*[\w~*%@&=+$\/])?(?:\?(?:[-\w;\/?:@&=+$,.!~*'()%\[\]|]*[\w\/@&=+$~*%])?)?(?:#(?:[-\w;\/?:@&=+$,.!~*'()%]*[\w\/@&=+$~*%])?)?|\b)/i
var conteadorL = 0;var docAct = document.body;
while(docAct){if (docAct.nodeName == '#text' && (match = docAct.nodeValue.match(regExp)) && inArray(match[6], dominios)){var url;
if (match[3] && ! match[2] && ! match[5] && ! match[8] && (match[3].indexOf(':') == -1 || match[3].indexOf('mailto:') == 0)) {
url = (match[3].indexOf('mailto:') == -1 ? 'mailto:' : '')
+ match[3]
+ match[4];}else{url = (match[2] ? match[2] : (! match[5] || match[5] == 'www' ? 'http' : match[5]) + '://')
+ (match[3] ? match[3] : '')
+ match[4]
+ (match[7] ? match[7] : '')
+ (match[8] ? match[8] : '');}
if(url){var range = document.createRange();range.setStart(docAct, match.index + match[1].length);range.setEnd(docAct, match.index + match[0].length);var a = document.createElement('a');a.setAttribute('href', url);a.appendChild(range.extractContents());range.insertNode(a);range.detach();conteadorL++;}}if(docAct.tagName && !inArray(docAct.tagName.toLowerCase(), etiqOut) && docAct.firstChild){docAct = docAct.firstChild;}
else if (docAct.nextSibling){docAct = docAct.nextSibling;}else{do{docAct = docAct.parentNode;}while(!docAct.nextSibling && docAct.parentNode);docAct = docAct.nextSibling;}}})();

(function() {

var css = "#body.body_mz,div.win_back,#win_bg,div.news_item,.odd{\nbackground-image:url(http://static.managerzone.com/img/windowbg.gif)!important;\n}\n\n.subnavhr{\nheight:2px!important;\n}\n\n.even{\nbackground-color:#c0c0c0!important;\n}\n\n.age_restricted_game{\nbackground-color:#d6db93!important;\nborder-top:solid 1px #000015!important;\nborder-bottom:solid 1px #000015!important;\n}\n\n.age_restricted_game_secondary{\nbackground-color:#8ecf8b!important;\nborder-top:solid 1px #000015!important;\nborder-bottom:solid 1px #000015!important;\n}\n\noption.azul{\ncolor:blue;\n}\n\noption.dazul{\ncolor:darkblue;\n}\n\noption.cel{\ncolor:skyblue;\n}\n\noption.turq{\ncolor:turquoise;\n}\n\noption.vfluor{\ncolor:lime;\n}\n\noption.dora{\ncolor:gold;\n}\n\noption.drojo{\ncolor:darkred;\n}\n\noption.gris{\ncolor:dimgray;\n}\n\noption.rosa{\ncolor:palevioletred;\n}\n\noption.verde{\ncolor:green;\n}\n\noption.azul{\ncolor:blue;\n}\n\noption.rojo{\ncolor:red;\n}\n\noption.amar{\ncolor:yellow;\n}\n\noption.violeta{\ncolor:slateblue;\n}\n\noption.blanco{\ncolor:white;\n}\n\noption.naran{\ncolor:orange;\n}\n\nselect.selector{\nbackground-color:#e0e0e0;\nborder: 1px solid #000000;\nfont-weight:bold;\nfont-size:11px!important;\n}";

css += " \n#top_item_clubhouse_sub {\nwidth: 174px!important; z-index: 100; position: absolute; margin-top: -7px;\n}  \n#top_item_clubhouse_sub li {\n width: 174px!important; \n} \n#top_item_clubhouse_sub li ul{\n margin-left:134px!important; margin-top:-25px!important; \n}  \n#top_item_clubhouse_sub li ul li{\n background-color:#AAAAAA!important; \n} \n#top_item_clubhouse_sub li ul li:hover{\n background-color:#dddddd!important; \n}  ";

css += "#menuDiv div.topnavhr { height:0px; }";

css += "#top_item_matches_sub {width: 150px!important; z-index: 100; position: absolute; margin-top: 0px!important; margin-left: 160px!important;}  #top_item_matches_sub li { width: 150px!important; } #top_item_matches_sub li ul{ margin-left:110px!important; margin-top:-25px!important; }  #top_item_matches_sub li ul li{ background-color:#AAAAAA!important; } #top_item_matches_sub li ul li:hover{ background-color:#dddddd!important; } ";

css += "#top_item_office_sub {width: 150px!important; z-index: 100; position: absolute; margin-top: 0px!important; margin-left: 315px!important;}  #top_item_office_sub li { width: 150px!important; } #top_item_office_sub li ul{ margin-left:110px!important; margin-top:-25px!important; }  #top_item_office_sub li ul li{ background-color:#AAAAAA!important; } #top_item_office_sub li ul li:hover{ background-color:#dddddd!important; }";

css += "#top_item_community_sub {width: 151px!important; z-index: 100; position: absolute; margin-top: 0px!important; margin-left: 470px!important;}  #top_item_community_sub li { width: 151px!important; } #top_item_community_sub li ul{ margin-left:110px!important; margin-top:-25px!important; }  #top_item_community_sub li ul li{ background-color:#AAAAAA!important; } #top_item_community_sub li ul li:hover{ background-color:#dddddd!important; }";

css += "#top_item_store_sub {width: 150px!important; z-index: 100; position: absolute; margin-top: 0px!important; margin-left: 625px!important;}  #top_item_store_sub li { width: 150px!important; } #top_item_store_sub li ul{ margin-left:110px!important; margin-top:-25px!important; }  #top_item_store_sub li ul li{ background-color:#AAAAAA!important; } #top_item_store_sub li ul li:hover{ background-color:#dddddd!important; }";

css += "#top_item_help_sub {width: 150px!important; z-index: 100; position: absolute; margin-top: 0px!important; margin-left: 780px!important;}  #top_item_help_sub li { width: 150px!important; } #top_item_help_sub li ul{ margin-left:110px!important; margin-top:-25px!important; }  #top_item_help_sub li ul li{ background-color:#AAAAAA!important; } #top_item_help_sub li ul li:hover{ background-color:#dddddd!important; }";

css += "#contentDiv { border-top:3px solid #DFCD15; margin-top:3px; padding-top:6px; } #menuDiv { border-bottom:3px solid #DFCD15; margin-bottom:6px; }";

css += "#stripes { border-radius:10px; -moz-border-radius:10px; -webkit-border-radius:10px; background:url(\"http://i938.photobucket.com/albums/ad226/frankito777/MZ/background-transparent.png\") repeat scroll 0 0 transparent; border:1px solid #000000;  padding-left:3px;padding-right:3px; }";

css += "#menuDiv ul.topnav .bg { border-top-left-radius: 9px; border-top-right-radius: 9px; -moz-border-radius-topleft:9px; -moz-border-radius-topright:9px; -webkit-border-top-left-radius: 9px; -webkit-border-top-right-radius: 9px; }";

css += "#menuDiv ul.subnav li { border-right:0 solid #000000; }";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}

})();

function fixDropDownMenus() {
	document.getElementById("leaderboard").innerHTML = "";
	document.getElementById("leaderboard").style.height = "5px";

	
	try{
		var sidePub = document.getElementById("skyscraper");
		sidePub.parentNode.removeChild(sidePub);
	}catch(err){}
	try{
	var smallPub = document.getElementById("small_rectangle");
	smallPub.parentNode.removeChild(smallPub);
	}catch(err){}
	try{
	deleteBottonSponsor();
	}catch(err){}
	
	var htmlMenuDiv = "";

	htmlMenuDiv += "<ul class=\"topnav\">";
	htmlMenuDiv += "  <li id=\"top_item_clubhouse\" onmouseover=\"document.getElementById('top_item_clubhouse_sub').style.visibility = 'visible'; document.getElementById('top_item_clubhouse_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_clubhouse_sub').style.visibility = 'hidden'; document.getElementById('top_item_clubhouse_sub').style.display = 'none'; \">";
	htmlMenuDiv += "    <a href=\"/?p=clubhouse\" class=\"bg\">Sede del Club</a>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li id=\"top_item_matches\" onmouseover=\"document.getElementById('top_item_matches_sub').style.visibility = 'visible'; document.getElementById('top_item_matches_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_matches_sub').style.visibility = 'hidden'; document.getElementById('top_item_matches_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "    <a href=\"/?p=match&amp;sub=scheduled\" class=\"bg\">Partidos</a>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li id=\"top_item_office\" onmouseover=\"document.getElementById('top_item_office_sub').style.visibility = 'visible'; document.getElementById('top_item_office_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_office_sub').style.visibility = 'hidden'; document.getElementById('top_item_office_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "  <a href=\"/?p=office\" class=\"bg\">Oficina</a>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li id=\"top_item_community\" onmouseover=\"document.getElementById('top_item_community_sub').style.visibility = 'visible'; document.getElementById('top_item_community_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_community_sub').style.visibility = 'hidden'; document.getElementById('top_item_community_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "    <a href=\"/?p=community\" class=\"bg\">Comunidad</a>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li id=\"top_item_store\" onmouseover=\"document.getElementById('top_item_store_sub').style.visibility = 'visible'; document.getElementById('top_item_store_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_store_sub').style.visibility = 'hidden'; document.getElementById('top_item_store_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "    <a href=\"/?p=clubmember&amp;sub=member\" class=\"bg\">Tienda</a>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li id=\"top_item_help\" onmouseover=\"document.getElementById('top_item_help_sub').style.visibility = 'visible'; document.getElementById('top_item_help_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_help_sub').style.visibility = 'hidden'; document.getElementById('top_item_help_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "    <a href=\"/?p=help\" class=\"bg\">Ayuda</a>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "</ul>";

	htmlMenuDiv += "<a href=\"http://userscripts.org./scripts/show/87237\"><img border=\"0\" title=\"Visitar UserScript\" src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/btn_mzs3.gif\"></a>";
	htmlMenuDiv += "<div class=\"topnavhr\"></div>";

	htmlMenuDiv += "<ul style=\"display: none;\" class=\"subnav\" id=\"top_item_clubhouse_sub\" onmouseover=\"document.getElementById('top_item_clubhouse_sub').style.visibility = 'visible'; document.getElementById('top_item_clubhouse_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_clubhouse_sub').style.visibility = 'hidden'; document.getElementById('top_item_clubhouse_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "  <li><a href=\"?p=clubhouse\">Comienzo</a></li>";
	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('lequipo').style.display='none'\" onmouseover=\"document.getElementById('lequipo').style.display='block'\"><a href=\"?p=team\">Mi Equipo</a><ul style=\"position: absolute; width: 200px; margin-left: -40px; display: none;\" id=\"lequipo\"><li style=\"width: 137px;\">";
	htmlMenuDiv += "    <a style=\"text-align: left;\" href=\"?p=team&amp;sub=alter\">Editar Información</a>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li style=\"width: 137px;\"><a style=\"text-align: left;\" href=\"?p=team&amp;sub=alterbadge\">Editar Escudo</a></li>";
	htmlMenuDiv += "  <li style=\"width: 137px;\"><a style=\"text-align: left;\" href=\"?p=team&amp;sub=alterjersey\">Editar Camiseta</a></li>";
	htmlMenuDiv += "  <li style=\"width: 137px;\"><a style=\"text-align: left;\" href=\"?p=team&amp;sub=sponsor \">Sponsor</a></li>";
	htmlMenuDiv += "  &gt;";
	htmlMenuDiv += "  <li style=\"width: 137px;\"><a style=\"text-align: left;\" href=\"?p=team&amp;sub=press\">Anuncios Prensa (C)</a></li>";

	htmlMenuDiv += "  </ul>";
	htmlMenuDiv += "  </li>";

	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('ljug').style.display='none'\" onmouseover=\"document.getElementById('ljug').style.display='block'\">";
	htmlMenuDiv += "    <a href=\"?p=players\">Jugadores</a>";
	htmlMenuDiv += "    <ul style=\"position: absolute; width: 200px; margin-left: -40px; display: none;\" id=\"ljug\">";
	htmlMenuDiv += "      <li style=\"width: 120px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=players&amp;sub=alt\">Vista Alternativa</a>";
	htmlMenuDiv += "      </li>";
	htmlMenuDiv += "      <li style=\"width: 120px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=players&amp;sub=unavailable\">Les./Sanc.</a>";
	htmlMenuDiv += "      </li>";
	htmlMenuDiv += "      <li style=\"width: 120px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=players&amp;sub=changenumbers\">Cambiar Número</a>";
	htmlMenuDiv += "      </li>";
	htmlMenuDiv += "      <li style=\"width: 120px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=players&amp;sub=retired\">Retirados</a>";
	htmlMenuDiv += "      </li>";
	htmlMenuDiv += "      <li style=\"width: 120px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=players&amp;sub=stats \">Estadísticas (C)</a>";
	htmlMenuDiv += "      </li>";
	htmlMenuDiv += "    </ul>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('ltact').style.display='none'\" onmouseover=\"document.getElementById('ltact').style.display='block'\">";
	htmlMenuDiv += "    <a href=\"?p=tactics&amp;myTactic=1\">Tácticas</a>";
	htmlMenuDiv += "    <ul style=\"position: absolute; width: 200px; margin-left: -40px; display: none;\" id=\"ltact\">";
	htmlMenuDiv += "      <li style=\"width: 122px;\"><a style=\"text-align: left;\" href=\"?p=tactics&amp;sub=availability\">Disponibilidad (C)</a></li>";
	htmlMenuDiv += "    </ul>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('lentre').style.display='none'\" onmouseover=\"document.getElementById('lentre').style.display='block'\">";
	htmlMenuDiv += "  <a href=\"?p=training_home\">Entrenamiento</a>";
	htmlMenuDiv += "    <ul style=\"position: absolute; width: 200px; margin-left: -40px; display: none;\" id=\"lentre\">";
	htmlMenuDiv += "  	  <li style=\"width: 105px;\"><a style=\"text-align: left;\" href=\"?p=training_camp\">CE - YP</a></li>";
	htmlMenuDiv += "  	  <li style=\"width: 105px;\"><a style=\"text-align: left;\" href=\"?p=training_report\">Reporte</a></li>";
	htmlMenuDiv += "  	  <li style=\"width: 105px;\"><a style=\"text-align: left;\" href=\"?p=training\">General</a></li>";		
	htmlMenuDiv += "    </ul>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('lentre2').style.display='none'\" onmouseover=\"document.getElementById('lentre2').style.display='block'\">";
	htmlMenuDiv += "    <a href=\"?p=trainers\">Entrenadores</a>";
	htmlMenuDiv += "    <ul style=\"position: absolute; width: 200px; margin-left: -40px; display: none;\" id=\"lentre2\">";
	htmlMenuDiv += "      <li style=\"width: 104px;\"><a style=\"text-align: left;\" href=\"?p=trainers&amp;sub=negotiations\">Negociaciones</a></li>";
	htmlMenuDiv += "      <li style=\"width: 104px;\"><a style=\"text-align: left;\" href=\"?p=trainers&amp;sub=freeagents\">Libres</a></li>";
	htmlMenuDiv += "      <li style=\"width: 104px;\"><a style=\"text-align: left;\" href=\"?p=trainers&amp;sub=settings\">Configuración</a></li>";
	htmlMenuDiv += "    </ul>";
	htmlMenuDiv += "  </li>";		
	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('lmerc').style.display='none'\" onmouseover=\"document.getElementById('lmerc').style.display='block'\">";
	htmlMenuDiv += "  	<a href=\"?p=transfer\">Mercado</a>";
	htmlMenuDiv += "  	<ul style=\"position: absolute; width: 200px; margin-left: -40px; display: none;\" id=\"lmerc\">";
	htmlMenuDiv += "  	  <li style=\"width: 102px;\"><a style=\"text-align: left;\" href=\"?p=transfer&amp;sub=yourplayers\">Monitoreo</a></li>";	
	htmlMenuDiv += "  	  <li style=\"width: 102px;\"><a style=\"text-align: left;\" href=\"?p=transfer_history\">Historial</a></li>";
	htmlMenuDiv += "  	  <li style=\"width: 102px;\"><a style=\"text-align: left;\" href=\"?p=transfer&amp;sub=category\">Categorías (C)</a></li>";
	htmlMenuDiv += "  	</ul>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li><a href=\"?p=shortlist\">Seguimiento de Jugadores</a></li>";	
	htmlMenuDiv += "  <li><a href=\"?p=economy&amp;sub=education\">Juveniles</a></li>";
	htmlMenuDiv += "</ul>";


	htmlMenuDiv += "<ul style=\"display: none;\" class=\"subnav\" id=\"top_item_matches_sub\" onmouseover=\"document.getElementById('top_item_matches_sub').style.visibility = 'visible'; document.getElementById('top_item_matches_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_matches_sub').style.visibility = 'hidden'; document.getElementById('top_item_matches_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('lliga').style.display='none'\" onmouseover=\"document.getElementById('lliga').style.display='block'\">";
	htmlMenuDiv += "    <a href=\"?p=series\">Posiciones Liga</a>";
	htmlMenuDiv += "    <ul style=\"position: absolute; width: 200px; margin-left: -40px; display: none;\" id=\"lliga\">";
	htmlMenuDiv += "      <li style=\"width: 113px;\"><a style=\"text-align: left;\" href=\"?p=series&amp;sub=schedule\">Fixture</a></li>";
	htmlMenuDiv += "    </ul>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('ljug2').style.display='none'\" onmouseover=\"document.getElementById('ljug2').style.display='block'\">";
	htmlMenuDiv += "    <a href=\"?p=match&amp;sub=played\">Jugados</a>";
	htmlMenuDiv += "    <ul style=\"position: absolute; width: 200px; margin-left: -40px; display: none;\" id=\"ljug2\">";
	htmlMenuDiv += "      <li style=\"width: 109px;\"><a style=\"text-align: left;\" href=\"?p=match&amp;sub=played&amp;hidescore=1\">Sin Resultados</a></li>";
	htmlMenuDiv += "    </ul>";	
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li><a href=\"?p=match&amp;sub=scheduled\">Próximos</a></li>";
	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('lam').style.display='none'\" onmouseover=\"document.getElementById('lam').style.display='block'\">";
	htmlMenuDiv += "    <a href=\"?p=challenges\">Amistosos</a>";
	htmlMenuDiv += "    <ul style=\"position: absolute; width: 200px; margin-left: -40px; display: none;\" id=\"lam\">";
	htmlMenuDiv += "      <li style=\"width: 83px;\"><a style=\"text-align: left;\" href=\"?p=challenges&amp;sub=friendly\">Aceptados</a></li>";
	htmlMenuDiv += "    </ul>";	
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('lcop').style.display='none'\" onmouseover=\"document.getElementById('lcop').style.display='block'\">";
	htmlMenuDiv += "    <a href=\"?p=cup&amp;sub=cup_home\">Copas</a>";
	htmlMenuDiv += "    <ul style=\"position: absolute; width: 100px; margin-left: -40px; display: none;\" id=\"lcop\">";
	htmlMenuDiv += "      <li style=\"width: 75px;\"><a style=\"text-align: left;\" href=\"?p=cup&amp;sub=list&amp;type=my\">Oficiales</a></li>";
	htmlMenuDiv += "      <li style=\"width: 75px;\"><a style=\"text-align: left;\" href=\"?p=private_cup\">Privadas</a></li>";
	htmlMenuDiv += "      <li style=\"width: 75px;\"><a style=\"text-align: left;\" href=\"?p=private_cup&amp;cuptype=partner\">Socios</a></li>";
	htmlMenuDiv += "    </ul>";
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "  <li><a href=\"?p=friendlyseries\">Ligas Amistosas</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=topteams\">Desafíos Top</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=match&amp;sub=livescores_overview\">Resultados en Vivo</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=national_teams\">Selecciones Nacionales</a></li>";	
	htmlMenuDiv += "</ul>";
		
	htmlMenuDiv += "<ul style=\"display: none;\" class=\"subnav\" id=\"top_item_office_sub\" onmouseover=\"document.getElementById('top_item_office_sub').style.visibility = 'visible'; document.getElementById('top_item_office_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_office_sub').style.visibility = 'hidden'; document.getElementById('top_item_office_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "  <li><a href=\"/?p=office\">Oficina</a></li>";
	htmlMenuDiv += "  <li><a href=\"/?p=economy\">Finanzas</a></li>";
	htmlMenuDiv += "  <li><a href=\"/?p=stadium\">Estadio</a></li>";
	htmlMenuDiv += "  <li><a href=\"/?p=news\">Noticias</a></li>";
	htmlMenuDiv += "  <li><a href=\"/?p=rank\">Ranking</a></li>";
	htmlMenuDiv += "  <li><a href=\"/?p=statistics\">Estadísticas</a></li>";
	htmlMenuDiv += "  <li><a href=\"/?p=history\">Historia</a></li>";
	htmlMenuDiv += "  <li><a href=\"/?p=my_buddies\">Amigos</a></li>";
	htmlMenuDiv += "  <li><a href=\"/?p=profile\">Perfil</a></li>";
	htmlMenuDiv += "  <li><a href=\"/?p=guestbook\">Guestbook</a></li>";
	htmlMenuDiv += "</ul>";

	htmlMenuDiv += "<ul style=\"display: none;\" class=\"subnav\" id=\"top_item_community_sub\" onmouseover=\"document.getElementById('top_item_community_sub').style.visibility = 'visible'; document.getElementById('top_item_community_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_community_sub').style.visibility = 'hidden'; document.getElementById('top_item_community_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "  <li><a href=\"?p=community\">Comienzo</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=forum\">Foro</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=thezone&amp;sport=soccer\">The Zone</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=wiki_hub\">MZ Wiki</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=worldmap\">MapaMundi</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=photo_album\">Album de Fotos</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=xml_content\">Contenido XML</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=mztools\">Herramientas MZ</a></li>";
	htmlMenuDiv += "</ul>";

	htmlMenuDiv += "<ul style=\"display: none;\" class=\"subnav\" id=\"top_item_store_sub\" onmouseover=\"document.getElementById('top_item_store_sub').style.visibility = 'visible'; document.getElementById('top_item_store_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_store_sub').style.visibility = 'hidden'; document.getElementById('top_item_store_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "  <li><a href=\"?p=player_items\">Items Jugadores</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=clubmember&amp;sub=member\">Membresía</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=clubmember&amp;sub=tokens\">Power Tokens</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=clubmember&sub=profile_badges\">Perfil del Escudo</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=clubmember&amp;sub=history\">Historia</a></li>";
	htmlMenuDiv += "</ul>";

	htmlMenuDiv += "<ul style=\"display: none;\" class=\"subnav\" id=\"top_item_help_sub\" onmouseover=\"document.getElementById('top_item_help_sub').style.visibility = 'visible'; document.getElementById('top_item_help_sub').style.display = ''; \" onmouseout=\"document.getElementById('top_item_help_sub').style.visibility = 'hidden'; document.getElementById('top_item_help_sub').style.display = 'none'; \" >";
	htmlMenuDiv += "  <li><a href=\"?p=support_form\">Soporte</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=language_support\">Soporte De Idiomas</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=search\">Buscador</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=tutorial\">Tutorial</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=manual_faq&amp;sub=manual\">Manual</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=manual_faq&amp;sub=FAQ\">FAQ</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=manual_faq&amp;section=0\">Reglas Generales</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=manual_faq&amp;section=1\">Reglas Foro</a></li>";
	htmlMenuDiv += "  <li><a href=\"?p=transfer&amp;sub=rules\">Reglas Mercado</a></li>";
	htmlMenuDiv += "  <li onmouseout=\"document.getElementById('lguias').style.display='none'\" onmouseover=\"document.getElementById('lguias').style.display='block'\">";
	htmlMenuDiv += "    <a href=\"\">Guías</a>";
	htmlMenuDiv += "    <ul style=\"position: absolute; width: 200px; margin-left: -40px; display: none;\" id=\"lguias\">";
	htmlMenuDiv += "      <li style=\"width: 168px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=forum&amp;sub=topic&amp;topic_id=5758296&amp;forum_id=255&amp;sport=soccer\">Estado Físico</a>";
	htmlMenuDiv += "      <li>";
	htmlMenuDiv += "      <li style=\"width: 168px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=forum&amp;sub=topic&amp;topic_id=5098942&amp;forum_id=255&amp;sport=soccer\">Estadios ideales</a>";
	htmlMenuDiv += "      <li>";
	htmlMenuDiv += "      <li style=\"width: 168px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=forum&amp;sub=topic&amp;topic_id=7863198&amp;forum_id=255&amp;sport=soccer \">Contratar Entrenadores</a>";
	htmlMenuDiv += "      <li>";
	htmlMenuDiv += "      <li style=\"width: 168px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=forum&amp;sub=topic&amp;topic_id=8296456&amp;forum_id=255&amp;sport=soccer\">BBcode Foro-GB</a>";
	htmlMenuDiv += "      <li>";
	htmlMenuDiv += "      <li style=\"width: 168px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=forum&amp;sub=topic&amp;sport=soccer&amp;forum_id=255&amp;topic_id=8601002\">Qué es el YP?</a>";
	htmlMenuDiv += "      <li>";
	htmlMenuDiv += "      <li style=\"width: 168px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=forum&amp;sub=topic&amp;sport=soccer&amp;forum_id=255&amp;topic_id=8559525\">Desactivar Publicidades</a>";
	htmlMenuDiv += "      <li>";
	htmlMenuDiv += "      <li style=\"width: 168px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=forum&amp;sub=topic&amp;sport=soccer&amp;forum_id=255&amp;topic_id=8231423\">Tokens via SMS (Argentina)</a>";
	htmlMenuDiv += "      <li>";
	htmlMenuDiv += "      <li style=\"width: 168px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=forum&amp;sub=topic&amp;sport=soccer&amp;forum_id=253&amp;topic_id=8108360\">Tokens via SMS (Chile)</a>";
	htmlMenuDiv += "      <li>";
	htmlMenuDiv += "      <li style=\"width: 168px;\">";
	htmlMenuDiv += "        <a style=\"text-align: left;\" href=\"?p=forum&amp;sub=topic&amp;topic_id=8681042&amp;forum_id=255&amp;sport=soccer\">Training Boost</a>";
	htmlMenuDiv += "      <li>";
	htmlMenuDiv += "    </ul>";		
	htmlMenuDiv += "  </li>";
	htmlMenuDiv += "</ul>";

	htmlMenuDiv += "<div class=\"subnavhr\"></div>";

	document.getElementById("menuDiv").innerHTML = htmlMenuDiv;

}

function addImagen(caja){
	var imagen;
	imagen = prompt('Ingrese URL/link de la imagen');
	var intentos;
	intentos = 0;
	var preUrl = '[image url=';
	var posUrl = ']';
	var rtdo = '';
	if(imagen != '')
	{
		img = new Image();
		img.src = imagen;
		if((img.height == 0) || (img.width==0))
		{
			while(!((img.height == 0) || (img.width==0)) && intentos < 5)
			{
				for(pausa = 0; pausa < 100; pausa ++){}
				img.src = imagen;
			}
		}
		if((img.height == 0) || (img.width==0))
		{
			alert('El link/URL: ' + imagen + ' no es una imagen, y no será convertido.');
		}
		else
		{
			rtdo += preUrl + imagen + posUrl;		
			document.getElementsByName(caja)[0].value = document.getElementsByName(caja)[0].value + rtdo;
		}
	}
}

function armaCodigo(tag,cubo){
 	obj = document.getElementsByName(cubo)[0];
	var inicio = obj.selectionStart;
	var fin = obj.selectionEnd;
	obj.value = obj.value.substr(0, inicio) + '[' + tag +']' + obj.value.substr(inicio, fin - inicio) + '[/' + tag +']' + obj.value.substr(fin, obj.value.length);
}

function posteaIcono(url,area){
 	obj = document.getElementsByName(area)[0];
	var inicio = obj.selectionStart;
	var fin = obj.selectionEnd;
	obj.value = obj.value.substr(0, inicio) + '[image url=' + url +']' + obj.value.substr(fin, obj.value.length);
}

function colorTexto(bbc,cajita){
 	obj = document.getElementsByName(cajita)[0];
	var inicio = obj.selectionStart;
	var fin = obj.selectionEnd;
	obj.value = obj.value.substr(0, inicio) + '[color=' + bbc + ']' + obj.value.substr(inicio, fin - inicio) + '[/color]' + obj.value.substr(fin, obj.value.length);
}

function generarImagen(url, idImg, elementID, tipo, height){
	var bimg = document.createElement('img');
	bimg.setAttribute('src', url);
	bimg.setAttribute('id', idImg);

        if(height != '')
        bimg.setAttribute('height', height+'px');

	if(tipo == 'pizarra')
		var ins = document.getElementById(elementID);
	else
		var ins = document.getElementsByName(elementID)[0];

	ins.parentNode.insertBefore(bimg, ins);
}

function insBR(elementID, tipo){
	var brr = document.createElement('br')

	if(tipo == 'pizarra')
		var ins = document.getElementById(elementID);
	else
		var ins = document.getElementsByName(elementID)[0];

	ins.parentNode.insertBefore(brr, ins);
}

function insertarSelect(elementID, tipo){
	var bsel1 = document.createElement('select');
	bsel1.setAttribute('id', 'sgbf');
	bsel1.setAttribute('class', 'selector');

	if(tipo == 'pizarra')
		var ins = document.getElementById(elementID);
	else
		var ins = document.getElementsByName(elementID)[0];

	ins.parentNode.insertBefore(bsel1, ins);

	var s1=document.getElementById('sgbf');
   	s1.options[0]=new Option("•Color Texto•","selected");
    	s1.options[1]=new Option("Azul");
    	s1.options[1].id="cBlueGB";
    	s1.options[1].className="azul";
   	s1.options[2]=new Option("Azul Oscuro");
   	s1.options[2].id="cDblueGB";
    	s1.options[2].className="dazul";
    	s1.options[3]=new Option("Celeste");  
    	s1.options[3].id="cCelGB";
    	s1.options[3].className="cel";
  	s1.options[4]=new Option("Rosa");
  	s1.options[4].id="cPinkGB";
    	s1.options[4].className="rosa";
    	s1.options[5]=new Option("Violeta"); 
    	s1.options[5].id="cVioletGB";
    	s1.options[5].className="violeta";
   	s1.options[6]=new Option("Turquesa");
   	s1.options[6].id="cTurGB";
    	s1.options[6].className="turq";
    	s1.options[7]=new Option("Verde Flúor"); 
    	s1.options[7].id="cGfluGB";
    	s1.options[7].className="vfluor";
   	s1.options[8]=new Option("Verde");
   	s1.options[8].id="cGreenGB";
    	s1.options[8].className="verde";
    	s1.options[9]=new Option("Amarillo"); 
    	s1.options[9].id="cYellowGB";
    	s1.options[9].className="amar";
   	s1.options[10]=new Option("Dorado");
   	s1.options[10].id="cGoldGB";
    	s1.options[10].className="dora";
    	s1.options[11]=new Option("Naranja"); 
    	s1.options[11].id="cOrangeGB";
    	s1.options[11].className="naran";
   	s1.options[12]=new Option("Rojo");
   	s1.options[12].id="cRedGB";
    	s1.options[12].className="rojo";
    	s1.options[13]=new Option("Rojo Oscuro"); 
    	s1.options[13].id="cDredGB";
    	s1.options[13].className="drojo";
   	s1.options[14]=new Option("Gris");
   	s1.options[14].id="cGreyGB";
    	s1.options[14].className="gris";
    	s1.options[15]=new Option("Blanco");
    	s1.options[15].id="cWhiteGB";
    	s1.options[15].className="blanco";
}

function atajoExtInt(urlImagen, urlPagina, titleImg){
	var ad = document.createElement('a');
	ad.setAttribute('href', urlPagina);
	ad.innerHTML = '<img src=\"'+urlImagen+'\" title=\"'+titleImg+'\" border=\"0\">\n';
	var ins = document.getElementById('contentDiv');
	ins.parentNode.insertBefore(ad, ins);
}

function atajosForosContainer(){
	var d = document.createElement('div');
	d.setAttribute('id', 'atajos-foro');
	d.setAttribute('style', 'float:right; margin: 4px 18px;');
	document.getElementById('logout_etc').appendChild(d);
}

function atajoForo(urlImagen, urlPagina, titleImg){
	var ad = document.createElement('a');
	ad.setAttribute('href', '?'+urlPagina);
	ad.innerHTML = '<img src=\"'+urlImagen+'\" title=\"'+titleImg+'\" border=\"0\">';
	//document.getElementById('logout_etc').appendChild(ad);
	document.getElementById('atajos-foro').appendChild(ad);
}

var mzs = document.createElement('a');
mzs.setAttribute('href', 'http://userscripts.org./scripts/show/77221');
mzs.innerHTML = "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/btn_mzs3.gif' title='Visitar MZScript' border='0'>";
var ins = document.getElementById("top_item_shortcuts");
ins.parentNode.insertBefore(mzs, ins);

document.addEventListener("click", function(event) {
  	switch(event.target.id)
	{
		case "btnaddImagen": 
			addImagen('message');
			break;
		case "btnnegrita": 
			armaCodigo('b','message');
			break;
		case "btncursiva": 
			armaCodigo('i','message');
			break;
		case "btnsubrayado": 
			armaCodigo('u','message');
			break;
		case "btnaddImagen2": 
			addImagen('msg');
			break;
		case "btnnegrita2": 
			armaCodigo('b','msg');
			break;
		case "btncursiva2": 
			armaCodigo('i','msg');
			break;
		case "btnsubrayado2": 
			armaCodigo('u','msg');
			break;
		case "icono1": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_smile.gif','message');
			break;
		case "icono2": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ya.gif','message');
			break;
		case "icono3": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/plz.gif','message');
			break;
		case "icono4": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_xd.gif','message');
			break;
		case "icono5": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sad.gif','message');
			break;
		case "icono6": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_crying.gif','message');
			break;
		case "icono7": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/doh.gif','message');
			break;
		case "icono8": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/07-icon_confused.gif','message');
			break;
		case "icono9": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/thshifty.gif','message');
			break;
		case "icono10": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/08-icon_rolleyes.gif','message');
			break;
		case "icono11": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/09-.png','message');
			break;
		case "icono12": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_surprised.gif','message');
			break;
		case "icono13": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_eek.gif','message');
			break;
		case "icono14": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/staring.gif','message');
			break;
		case "icono15": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_evil.gif','message');
			break;
		case "icono16": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_twisted.gif','message');
			break;
		case "icono17": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/winky.gif','message');
			break;
		case "icono18": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/silly2.gif','message');
			break;
		case "icono19": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/stare.gif','message');
			break;
		case "icono20": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_wink.gif','message');
			break;
		case "icono21": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_cool.gif','message');
			break;
		case "icono22": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/19-uu.png','message');
			break;
		case "icono23": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_exclaim.gif','message');
			break;
		case "icono24": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_question.gif','message')
			break;
		case "icono25": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_arrow.gif','message');
			break;
		case "icono26": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/shh.gif','message');
			break;
		case "icono27": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/umm.gif','message');
			break;
		case "icono28": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/nu.gif','message');
			break;
		case "icono29": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/eeh.gif','message');
			break;
		case "icono30": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/clap.gif','message');
			break;
		case "icono31": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/22-good.gif','message')
			break;
		case "icono32": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/23-bad.gif','message')
			break;
		case "icono33": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/24-rock.gif','message')
			break;
		case "icono34": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/36-omm.gif','message')
			break;
		case "icono35": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/mad.gif','message')
			break;
		case "icono36": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/protest.gif','message')
			break;
		case "icono37": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/jaja.gif','message')
			break;
		case "icono38": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bla.gif','message')
			break;
		case "icono39": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ele.gif','message')
			break;
		case "icono40": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/angel.gif','message')
			break;
		case "icono41": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/devil.gif','message')
			break;
		case "icono42": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/baba.gif','message')
			break;
		case "icono43": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/fool.gif','message')
			break;
		case "icono44": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/fail2.gif','message')
			break;
		case "icono45": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/repost.gif','message')
			break;
		case "icono46": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bu.gif','message')
			break;
		case "icono47": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uh.gif','message')
			break;
		case "icono48": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sleep.gif','message')
			break;
		case "icono49": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/wooh.gif','message')
			break;
		case "icono50": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uhm.gif','message')
			break;
		case "icono51": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/wtf.gif','message')
			break;
 		case "icono52": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/cricri.gif','message')
			break;
 		case "icono53": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/jao.gif','message')
			break;
		case "aIcono0": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_smile.gif','msg')
			break;
		case "aIcono1": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ya.gif','msg')
			break;
		case "aIcono2": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/03-icon_lol.gif','msg')
			break;
		case "aIcono3": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sad.gif','msg')
			break;
		case "aIcono4": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_crying.gif','msg')
			break;
		case "aIcono5": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/07-icon_confused.gif','msg')
			break;
		case "aIcono6": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/08-icon_rolleyes.gif','msg')
			break;
		case "aIcono7": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/09-.png','msg')
			break;
		case "aIcono8": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uhm.gif','msg')
			break;
		case "aIcono9": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_eek.gif','msg')
			break;
		case "aIcono10": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/13-icon_evil.png','msg')
			break;
		case "aIcono11": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/15-icon_razz.gif','msg')
			break;
		case "aIcono12": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_cool.gif','msg')
			break;
		case "aIcono13": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_wink.gif','msg')
			break;
		case "aIcono14": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/19-uu.png','msg')
			break;
		case "aIcono15": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/22-good.gif','msg')
			break;
		case "aIcono16": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/23-bad.gif','msg')
			break;
		case "aIcono17": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/36-omm.gif','msg')
			break;
		case "aIcono18": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/24-rock.gif','msg')
			break;
		case "aIcono19": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/fool.gif','msg')
			break;
		case "aIcono20": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/nu.gif','msg')
			break;
		case "aIcono21": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/plz.gif','msg')
			break;
		case "aIcono22": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_xd.gif','msg')
			break;
		case "aIcono23": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/clap.gif','msg')
			break;
		case "aIcono24": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/mad2.gif','msg')
			break;
		case "aIcono25": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/umm.gif','msg')
			break;
		case "aIcono26": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/doh.gif','msg')
			break;
		case "aIcono27": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/shh.gif','msg')
			break;
		case "aIcono28": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/angel.gif','msg')
			break;
		case "aIcono29": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/devil.gif','msg')
			break;
		case "aIcono30": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ele.gif','msg')
			break;
		case "aIcono31": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/baba.gif','msg')
			break;
		case "aIcono32": 
			posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bla.gif','msg')
			break;
		case "cBlue":
			colorTexto('blue','message');	
			break;
		case "cDblue":
			colorTexto('#000060','message');	
			break;
		case "cCel":
			colorTexto('skyblue','message');	
			break;
		case "cPink":
			colorTexto('palevioletred','message');	
			break;
		case "cViolet":
			colorTexto('slateblue','message');	
			break;
		case "cTur":
			colorTexto('turquoise','message');	
			break;
		case "cGflu":
			colorTexto('lime','message');	
			break;
		case "cGreen":
			colorTexto('green','message');	
			break;
		case "cYellow":
			colorTexto('yellow','message');	
			break;
		case "cGold":
			colorTexto('gold','message');	
			break;
		case "cOrange":
			colorTexto('orange','message');	
			break;
		case "cRed":
			colorTexto('red','message');	
			break;
		case "cDred":
			colorTexto('darkred','message');	
			break;
		case "cGrey":
			colorTexto('dimgray','message');	
			break;
		case "cWhite":
			colorTexto('white','message');	
			break;
		case "cBlueGB":
			colorTexto('blue','msg');	
			break;
		case "cDblueGB":
			colorTexto('#000060','msg');	
			break;
		case "cCelGB":
			colorTexto('skyblue','msg');	
			break;
		case "cPinkGB":
			colorTexto('palevioletred','msg');	
			break;
		case "cVioletGB":
			colorTexto('slateblue','msg');	
			break;
		case "cTurGB":
			colorTexto('turquoise','msg');	
			break;
		case "cGfluGB":
			colorTexto('lime','msg');	
			break;
		case "cGreenGB":
			colorTexto('green','msg');	
			break;
		case "cYellowGB":
			colorTexto('yellow','msg');	
			break;
		case "cGoldGB":
			colorTexto('gold','msg');	
			break;
		case "cOrangeGB":
			colorTexto('orange','msg');	
			break;
		case "cRedGB":
			colorTexto('red','msg');	
			break;
		case "cDredGB":
			colorTexto('darkred','msg');	
			break;
		case "cGreyGB":
			colorTexto('dimgray','msg');	
			break;
		case "cWhiteGB":
			colorTexto('white','msg');	
			break;
	}
}, true);

atajosForosContainer();

atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/mer1.png', 'p=forum&sub=topics&forum_id=254&sport=soccer', 'Ir a Mercado');
atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/ami1.png', 'p=forum&sub=topics&forum_id=249&sport=soccer', 'Ir a Amistosos');
atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/mzh1.png', 'p=forum&sub=topics&forum_id=253&sport=soccer', 'Ir a MZ Habla');
atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/pyr1.png', 'p=forum&sub=topics&forum_id=255&sport=soccer', 'Ir a Preguntas y Respuestas');
atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/da1.png', 'p=forum&sub=topics&forum_id=250&sport=soccer', 'Ir a Discusión Abierta');
atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/fed1-1.gif', 'p=forum&sub=topics&forum_id=251&sport=soccer', 'Ir a Federaciones');

atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/mon_btn.gif', '?p=transfer&sub=yourplayers', 'Ir al Monitoreo');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/seg_btn.gif', '?p=shortlist', 'Ir a Seguimiento');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/vis_btn.gif', '?p=players&sub=alt', 'Ver Vista Alternativa');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/sk_btn.gif', 'http://www.mzplus.com.ar/p', 'Ir al Skiller');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/img_btn.gif', 'http://imgur.com/', 'Ir a Imgur');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/fin_btn.gif', '?p=economy', 'Ver Finanzas');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/mer_btn.gif', '?p=transfer', 'Ver Mercado');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/imp_btn.gif', 'http://www.mzplus.com.ar/tax', 'Calcular Impuestos');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/jug_btn.gif', '?p=match&sub=played', 'Ver los Partidos Jugados');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/prox_btn.gif', '?p=match&sub=scheduled', 'Ver los Próximos Partidos');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/tac_btn.gif', '?p=tactics&myTactic=1', 'Ir a Tácticas');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/les_btn.gif', '?p=players&sub=unavailable', 'Ver Lesionados/Sancionados');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/cple_btn.gif', 'http://www.mzplus.com.ar/cumple', 'Ver Cumpleaños de Jugadores');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/rep_btn.gif', '?p=training_report', 'Ver el Reporte de Entrenamiento');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/gen_btn.gif', '?p=training', 'Ir al Entrenamiento General');

fixDropDownMenus();

// ==Sub-Menúes==
var sede = document.getElementById('top_item_clubhouse_sub');
sede.innerHTML = '<li><a href="?p=clubhouse">Comienzo</a></li><li onmouseover="document.getElementById(\'lequipo\').style.display=\'block\'" onmouseout="document.getElementById(\'lequipo\').style.display=\'none\'"><a href="?p=team">Mi Equipo</a><ul id="lequipo" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:137px;"><a href="?p=team&sub=alter" style="text-align:left;">Editar Información</a></li><li style="width:137px;"><a href="?p=team&sub=alterbadge" style="text-align:left;">Editar Escudo</a></li><li style="width:137px;"><a href="?p=team&sub=alterjersey" style="text-align:left;">Editar Camiseta</a></li><li style="width:137px;"><a href="?p=team&sub=sponsor " style="text-align:left;">Sponsor</a></li>><li style="width:137px;"><a href="?p=team&sub=press" style="text-align:left;">Anuncios Prensa (C)</a></li></ul></li></li><li onmouseover="document.getElementById(\'ljug\').style.display=\'block\'" onmouseout="document.getElementById(\'ljug\').style.display=\'none\'"><a href="?p=players">Jugadores</a><ul id="ljug" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:120px;"><a href="?p=players&sub=alt" style="text-align:left;">Vista Alternativa</a></li><li style="width:120px;"><a href="?p=players&sub=unavailable" style="text-align:left;">Les./Sanc.</a></li><li style="width:120px;"><a href="?p=players&sub=changenumbers" style="text-align:left;">Cambiar Número</a></li><li style="width:120px;"><a href="?p=players&sub=retired" style="text-align:left;">Retirados</a></li><li style="width:120px;"><a href="?p=players&sub=stats " style="text-align:left;">Estadísticas (C)</a></li></ul></li><li onmouseover="document.getElementById(\'ltact\').style.display=\'block\'" onmouseout="document.getElementById(\'ltact\').style.display=\'none\'"><a href="?p=tactics&myTactic=1">Tácticas</a><ul id="ltact" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:122px;"><a href="?p=tactics&sub=availability" style="text-align:left;">Disponibilidad (C)</a></li></ul></li><li onmouseover="document.getElementById(\'lentre\').style.display=\'block\'" onmouseout="document.getElementById(\'lentre\').style.display=\'none\'"><a href="?p=training_home">Entrenamiento</a><ul id="lentre" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:105px;"><a href="?p=training_camp" style="text-align:left;">CE - YP</a></li><li style="width:105px;"><a href="?p=training_report" style="text-align:left;">Reporte</a></li><li style="width:105px;"><a href="?p=training" style="text-align:left;">General</a></li></ul></li><li onmouseover="document.getElementById(\'lentre2\').style.display=\'block\'" onmouseout="document.getElementById(\'lentre2\').style.display=\'none\'"><a href="?p=trainers">Entrenadores</a><ul id="lentre2" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:104px;"><a href="?p=trainers&sub=negotiations" style="text-align:left;">Negociaciones</a><li style="width:104px;"><a href="?p=trainers&sub=freeagents" style="text-align:left;">Libres</a><li style="width:104px;"><a href="?p=trainers&sub=settings" style="text-align:left;">Configuración</a></li></ul></li><li onmouseover="document.getElementById(\'lmerc\').style.display=\'block\'" onmouseout="document.getElementById(\'lmerc\').style.display=\'none\'"><a href="?p=transfer">Mercado</a><ul id="lmerc" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:102px;"><a href="?p=transfer&sub=yourplayers" style="text-align:left;">Monitoreo</a></li><li style="width:102px;"><a href="?p=transfer_history" style="text-align:left;">Historial</a><li style="width:102px;"><a href="?p=transfer&sub=category" style="text-align:left;">Categorías (C)</a></li></ul></li><li><a href="?p=shortlist">Seguimiento de Jugadores</a></li><li><a href="?p=economy&sub=education">Juveniles</a></li>';

var partidos = document.getElementById('top_item_matches_sub');
partidos.innerHTML = '<li onmouseover="document.getElementById(\'lliga\').style.display=\'block\'" onmouseout="document.getElementById(\'lliga\').style.display=\'none\'"><a href="?p=series">Posiciones Liga</a><ul id="lliga" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:113px;"><a href="?p=series&sub=schedule" style="text-align:left;">Fixture</a></li><li style="width:113px;"><a href="?p=series&sub=topscorer" style="text-align:left;">Goleadores</a></li><li style="width:113px;"><a href="?p=series&sub=unavailable" style="text-align:left;">Suspendidos</a></li><li style="width:113px;"><a href="?p=series&sub=board" style="text-align:left;">Pizarra de Mensajes</a></li><li style="width:113px;"><a href="?p=series&sub=promotions" style="text-align:left;">Temp. Anterior</a></li></ul></li><li onmouseover="document.getElementById(\'ljug2\').style.display=\'block\'" onmouseout="document.getElementById(\'ljug2\').style.display=\'none\'"><a href="?p=match&sub=played">Jugados</a><ul id="ljug2" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:109px;"><a href="?p=match&sub=played&hidescore=1" style="text-align:left;">Sin Resultados</a></li></ul></li><li><a href="?p=match&sub=scheduled">Próximos</a></li><li onmouseover="document.getElementById(\'lam\').style.display=\'block\'" onmouseout="document.getElementById(\'lam\').style.display=\'none\'"><a href="?p=challenges">Amistosos</a><ul id="lam" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:83px;"><a href="?p=challenges&sub=friendly" style="text-align:left;">Aceptados</a></li></ul></li><li onmouseover="document.getElementById(\'lcop\').style.display=\'block\'" onmouseout="document.getElementById(\'lcop\').style.display=\'none\'"><a href="?p=cup&sub=cup_home">Copas</a><ul id="lcop" style="position:absolute;width:100px;margin-left:-40px;display:none;"><li style="width:75px;"><a href="?p=cup&sub=list&type=my" style="text-align:left;">Oficiales</a></li><li style="width:75px;"><a href="?p=private_cup" style="text-align:left;">Privadas</a></li><li style="width:75px;"><a href="?p=private_cup&cuptype=partner" style="text-align:left;">Socios</a></li></ul></li><li><a href="?p=friendlyseries">Ligas Amistosas</a></li><li><a href="?p=topteams">Desafíos Top</a></li><li><a href="?p=match&sub=livescores_overview">Resultados en Vivo</a></li><li><a href="?p=national_teams">Selecciones Nacionales</a></li><li><a href="?p=head2head">Head 2 Head</a></li>';

var ayuda = document.getElementById('top_item_help_sub');
ayuda.innerHTML = '<li><a href="?p=support_form">Soporte</a></li><li><a href="?p=language_support">Soporte De Idiomas</a></li><li><a href="?p=search">Buscador</a></li><li><a href="?p=tutorial">Tutorial</a></li><li><a href="?p=manual_faq">FAQ</a></li><li><a href="?p=rules&sub=rules_game">Reglas Generales</a></li><li><a href="?p=rules&sub=rules_forum">Reglas Foro</a></li><li><a href="?p=rules&sub=rules_nc">Reglas Sel. Nacionales</a></li><li onmouseover="document.getElementById(\'lguias\').style.display=\'block\'" onmouseout="document.getElementById(\'lguias\').style.display=\'none\'"><a href=>Guías</a><ul id="lguias" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:168px;"><a href="?p=forum&sub=topic&topic_id=5758296&forum_id=255&sport=soccer" style="text-align:left;">Estado Físico</a></li><li style="width:168px;"><a href="?p=forum&sub=topic&topic_id=5098942&forum_id=255&sport=soccer" style="text-align:left;">Estadios ideales</a></li><li style="width:168px;"><a href="?p=forum&sub=topic&topic_id=7863198&forum_id=255&sport=soccer " style="text-align:left;">Contratar Entrenadores</a></li><li style="width:168px;"><a href="?p=forum&sub=topic&topic_id=8296456&forum_id=255&sport=soccer" style="text-align:left;">BBcode Foro-GB</a></li><li style="width:168px;"><a href="?p=forum&sub=topic&sport=soccer&forum_id=255&topic_id=8601002" style="text-align:left;">Qué es el YP?</a></li><li style="width:168px;"><a href="?p=forum&sub=topic&sport=soccer&forum_id=255&topic_id=8559525" style="text-align:left;">Desactivar Publicidades</a></li><li style="width:168px;"><a href="?p=forum&sub=topic&sport=soccer&forum_id=255&topic_id=8231423" style="text-align:left;">Tokens via SMS (Argentina)</a></li><li style="width:168px;"><a href="?p=forum&sub=topic&sport=soccer&forum_id=253&topic_id=8108360" style="text-align:left;">Tokens via SMS (Chile)</a></li><li style="width:168px;"><a href="?p=forum&sub=topic&topic_id=8681042&forum_id=255&sport=soccer" style="text-align:left;">Training Boost</a></li></ul></li>';

function armaPanel(elementID, tipo){
    var height = '';
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/img_gbbtn.png', 'btnaddImagen2', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negri_gbbtn.png', 'btnnegrita2', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/curs_gbbtn.png', 'btncursiva2', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/subra_gbbtn.png', 'btnsubrayado2', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/iNYhB.gif', 'aIcono0', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ya.gif', 'aIcono1', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/03-icon_lol.gif', 'aIcono2', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sad.gif', 'aIcono3', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_crying.gif', 'aIcono4', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/07-icon_confused.png', 'aIcono5', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/08-icon_rolleyes.gif', 'aIcono6', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/09-2h728f4.png', 'aIcono7', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uhm.gif', 'aIcono8', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_eek.gif', 'aIcono9', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/13-icon_evil.png', 'aIcono10', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/15-icon_razz.png', 'aIcono11', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_cool.gif', 'aIcono12', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/17-icon_wink.png', 'aIcono13', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/19-uu.png', 'aIcono14', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/22-good.gif', 'aIcono15', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/23-bad.gif', 'aIcono16', elementID, tipo, height);
	insBR(elementID, tipo);
	insertarSelect(elementID, tipo);
	height = 15;
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/36-omm.gif', 'aIcono17', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/24-rock.gif', 'aIcono18', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/fool.gif', 'aIcono19', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/nu.gif', 'aIcono20', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/plz.gif', 'aIcono21', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/clap.gif', 'aIcono23', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/umm.gif', 'aIcono25', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/doh.gif', 'aIcono26', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/shh.gif', 'aIcono27', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/angel.gif', 'aIcono28', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/devil.gif', 'aIcono29', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ele.gif', 'aIcono30', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/baba.gif', 'aIcono31', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/mad2.gif', 'aIcono24', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_xd.gif', 'aIcono22', elementID, tipo, height);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bla.gif', 'aIcono32', elementID, tipo, height);
}

function insProximo(numPag, uid)
{
	var brr = document.createElement('b');
	brr.appendChild(document.createTextNode(numPag/10+'   '));

   	document.getElementsByTagName('center')[0].appendChild(brr);
   
	var aux = document.createElement('a');

	aux.setAttribute('href', '/?p=guestbook&uid='+uid+'&o='+numPag);
	aux.appendChild(document.createTextNode('Próximo'));

   	document.getElementsByTagName('center')[0].appendChild(aux);
}

var url = window.location.href.split('=');
if(url[1] == "guestbook&uid" || url[1] == "guestbook")
{
	armaPanel('writeForm', 'gb');
        if((url[3] != null) && (url[3] > 0))
	{
	  	var numPag = parseInt(url[3])+10;
	  	var uid = url[2].split('&');
      		insProximo(numPag, uid[0]);
        }

}

var url = window.location.href.split('&');
if(url[1] == "sub=topics"){
	var tabla = document.getElementsByName('forumform')[0].parentNode;
}
else if(url[1] == "sub=board"){
	armaPanel('writeform', 'pizarra');
}
else if(url[1] == "sub=topic"){
	var tabla= document.getElementById("forumform").childNodes[1];
}

filaNueva = tabla.insertRow(2);
var botones = '<td>CC-Bar</td><td>';
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/imagen2_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/imagen2_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/imagen2_btn2.png\"' title='Insertar imagen' alt='Insertar img' id='btnaddImagen'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negrita_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negrita_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negrita_btn2.png\"' title='Negrita' alt='Negrita' id='btnnegrita'/>&nbsp;";  
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/cursiva_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/cursiva_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/cursiva_btn2.png\"' title='Cursiva' alt='Cursiva' id='btncursiva'/>&nbsp;";  
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/subra_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/subra_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/subra_btn2.png\"' title='Subrayado' alt='Subrayado' id='btnsubrayado'/>&nbsp;";    
botones += '<select class="selector"><option selected="selected">•Color Texto•</option><option id="cBlue" class="azul">Azul</option><option id="cDblue" class="dazul">Azul Oscuro</option><option id="cCel" class="cel">Celeste</option><option id="cPink" class="rosa">Rosa</option><option id="cViolet" class="violeta">Violeta</option><option id="cTur" class="turq">Turquesa</option><option id="cGflu" class="vfluor">Verde Flúor</option><option id="cGreen" class="verde">Verde</option><option id="cYellow" class="amar">Amarillo</option><option id="cGold" class="dora">Dorado</option><option id="cOrange" class="naran">Naranja</option><option id="cRed" class="rojo">Rojo</option><option id="cDred" class="drojo">Rojo Oscuro</option><option id="cGrey" class="gris">Gris</option><option id="cWhite" class="blanco">Blanco</option></select>&nbsp;';
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_exclaim.gif' title='!' alt='!' id='icono23'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_question.gif' title='?' alt='?' id='icono24'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_arrow.gif' title='>' alt='>' id='icono25'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/22-good.gif' title='(y)' alt='(y)' id='icono31'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/23-bad.gif' title='(n)' alt='(n)' id='icono32'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/wtf.gif' height='20px' title='wtf' alt='wtf' id='icono51'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/fail2.gif' height='20px' title='fl' alt='fl' id='icono44'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/repost.gif' height='20px' title='rp' alt='rp' id='icono45'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/cricri.gif' title='cri' alt='cri' id='icono52'/>";
filaNueva.innerHTML = botones;

filaNueva = tabla.insertRow(3);
botones = '<td>&nbsp;</td><td>';
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_smile.gif' title=':)' alt=':)' id='icono1'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ya.gif' title=':D' alt=':D' id='icono2'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/jao.gif' title='D' alt='D' id='icono53'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_xd.gif' title='xD' alt='xD' id='icono4'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bu.gif' title=':/' alt=':/' id='icono46'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sad.gif' title=':(' alt=':(' id='icono5'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_crying.gif' title=':*(' alt=':*(' id='icono6'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/07-icon_confused.gif' title=':S' alt=':S' id='icono8'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/thshifty.gif' title='erm' alt='erm' id='icono9'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/08-icon_rolleyes.gif' title='8-)' alt='8-)' id='icono10'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/09-.png' title='¬¬' alt='¬¬' id='icono11'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/staring.gif' title='o.O' alt='o.O' id='icono14'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_eek.gif' title='O.O' alt='O.O' id='icono13'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uhm.gif' title='_hm' alt='_hm' id='icono50'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/wooh.gif' title='evil' alt='evil' id='icono49'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_evil.gif' title='>:(' alt='>:(' id='icono15'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_twisted.gif' title='>:)' alt='>:)' id='icono16'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/winky.gif' title='flirt' alt='flirt' id='icono17'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/silly2.gif' title=':P' alt=':P' id='icono18'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/stare.gif' title='|-(' alt='|-(' id='icono19'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_wink.gif' title=';)' alt=';)' id='icono20'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_cool.gif' title='(h)' alt='(h)' id='icono21'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/19-uu.png' title='u.u' alt='u.u' id='icono22'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/shh.gif' title='shh' alt='shh' id='icono26'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uh.gif' title='uh' alt='uh' id='icono47'/>";
filaNueva.innerHTML = botones;

filaNueva = tabla.insertRow(4);
botones = '<td>&nbsp;</td><td>';
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/24-rock.gif' height='23px' title='rock' alt='rock' id='icono33'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/protest.gif' title='grr' alt='grr' id='icono36'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/jaja.gif' height='23px' title='jaja' alt='jaja' id='icono37'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/eeh.gif' title='eah' alt='eah' id='icono29'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/clap.gif' title='clap' alt='clap' id='icono30'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bla.gif' title='bla' alt='bla' id='icono38'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ele.gif' title='l' alt='l' id='icono39'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/mad.gif' title='grr' alt='grr' id='icono35'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/angel.gif' title='angel' alt='angel' id='icono40'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/devil.gif' title='diablo' alt='diablo' id='icono41'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/baba.gif' title='baba' alt='baba' id='icono42'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/fool.gif' height='23px' title='x)' alt='x)' id='icono43'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/nu.gif' title='nana' alt='nana' id='icono28'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/plz.gif' title='plz' alt='plz' id='icono3'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/umm.gif' title='umm' alt='umm' id='icono27'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/doh.gif' title=':|' alt=':|' id='icono7'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sleep.gif' title='zzz' alt='zzz' id='icono48'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/36-omm.gif' title='om' alt='om' id='icono34'/>";
filaNueva.innerHTML = botones;


var url = window.location.href.split('&');
if(url[1] == "sub=topics"){
	var htmlCountPost = document.evaluate('/html/body/div[3]/div/div[4]/div[2]/div/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null);
    	var tablaDePost = htmlCountPost.iterateNext();
    
	for(post = 2; post < tablaDePost.rows.length; post++)
	{
		link = tablaDePost.rows[post].cells[0].childNodes[0].href;
		celda = tablaDePost.rows[post].cells[1].innerHTML;
		datosPost = celda.split(" / ");
		cantidadDePaginas = Math.floor(parseInt(datosPost[1])/50);
		nuevo = "";
		if(cantidadDePaginas > 0)
			nuevo += "<a title='Ir a la página 2' href='" + link + "&offset=50'>2</a>&#160;"
		if(cantidadDePaginas > 1)
			nuevo += "<a title='Ir a la página 3' href='" + link + "&offset=100'>3</a>&#160;"
		if(cantidadDePaginas > 2)
			nuevo += "<a title='Ir a la página 4' href='" + link + "&offset=150'>4</a>&#160;"
		if(cantidadDePaginas > 3)
			nuevo += "<a title='Ir a la última página' href='" + link + "&offset=" + (cantidadDePaginas*50) + "'>&#187;</a>"
		if(cantidadDePaginas > 0)
			nuevo = "&#160;[" + nuevo + "]";
		tablaDePost.rows[post].cells[1].innerHTML = celda + nuevo;
	}
} else if(url[1] == "sub=topic"){
	var id;
	var nombre;
	var TDs = document.getElementsByTagName('TD');
	for(fila = 0; fila < TDs.length; fila++)
	{
		if(TDs[fila].className == 'listsecondary')
		{
			if(TDs[fila].childNodes[1].tagName == 'TABLE')
			{
				celdaSacarId = TDs[fila].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[0].cells[0];
				if(celdaSacarId.childNodes[3].tagName == "A")
				{
					id = celdaSacarId.childNodes[3].href.split("&")[1].replace("uid=", "");
					nombre = celdaSacarId.childNodes[3].text;
				}
				else
				{
					nombre = celdaSacarId.childNodes[5].text;
					id = celdaSacarId.childNodes[5].href.split("&")[1].replace("uid=", "");
				}

				celdaSacarId.innerHTML = celdaSacarId.innerHTML + " <a title='GB de "+ nombre +"' href='/?p=guestbook&uid=" + id + "' style='color:black;text-decoration:none;border:1px solid;'><b>&nbsp;GB&nbsp;</b></a> ";
			}
		}
	}
}

function trim (str) {
	
        if ( typeof(str) == 'undefined') return '';

        str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}

function deleteBottonSponsor() {

	var secondCol = document.getElementsByClassName("col_2_of_3");

	var countSecondCol = secondCol.length;
	var i = 0;
	var j = 0;
	var k = 0;
	var l = 0;

	for ( i = 0 ; i < countSecondCol ; i++ ) {

		var bazElements = secondCol[i].childNodes;
		var countBazElements = bazElements.length;

		for ( j = 0 ; j < countBazElements ; j++ ) {
			if (bazElements[j].className == 'baz') {
				var bazChildren = bazElements[j].childNodes;
				var countBazChildren = bazChildren.length;
				for ( k = 0 ; k < countBazChildren ; k++ ) {
					var divs = bazChildren[k].childNodes;
					var countDivs = divs.length;
					for ( l = 0 ; l < countDivs ; l++ ) {
						var iHtml = divs[l].innerHTML;
						if ( trim(iHtml) == '<span>A word from our Sponsors</span>') {
							var delNode = divs[l].parentNode.parentNode;
							delNode.parentNode.removeChild(delNode);
							return;
						}
					}
				}
			}
		}

	}

}

