// ==UserScript==
// @name           Ikariam Menu Enhanced
// @namespace      Neuromancien
// @description    Enhanced menu for Ikariam
// @include        http://*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*
// ==/UserScript==

//
// History
// 12/03/2008 - Initial Release - Only Alpha
// 13/03/2008 - Works with all servers
//

var ScriptName='Menu Enhanced';
var ScriptAutor='Neuromancien';
var ScriptVersion='0.2';
var ScriptUrl = 'http://userscripts.org/scripts/show/23835';
var GameServer = top.location.host;
var MyId = window.location.href.match(/id=([0-9]{1,})/)[1];

var lang=window.location.href.match(/ikariam\d*(\.[a-zA-Z\.]+)/).pop();
var langfile=new Array();
var _img_arrow = "data:image/gif;base64,R0lGODlhBQAJAIABAH1jQP///yH5BAEAAAEALAAAAAAFAAkAAAIMRB5gp9v2YlJsJRQKADs=";

// title = 'Autres Options'
//         langfile=['Recherche','Unités','Navires','Bâtiments','Miracle', 'Forum', 'Scores', 'Options', 'Quitter']
//         langfile_title=['Recherche','Unités','Navires','Bâtiments','Miracle', 'Forum', 'Scores', 'Options', 'Finir la séance de jeu']
switch(lang){
	case'.fr':
		title = ['Acceuil', 'Forum', 'Villes', 'Troupes', 'Autres']
		title1 = ['Options', 'Version', 'Quitter'];
		title2 = ['Unitées', 'Navires', 'Bâtiments', 'Miracle', 'Recherche', 'Scores']
		break;
	
case'.org':
title = ['Home', 'Forum', 'Cities', 'Troops', 'Other']
title1 = ['Options', 'Version', 'Log Out']
title2 = ['Units', 'Ships', 'Buildings', 'Wonders', 'Research', 'Scores']
break;

case'.dk':
title = ['Info', 'Forum', 'Byer', 'Tropper', 'Andet']
title1 = ['Konto', 'Version', 'Log Ud'];
title2 = ['Enheder', 'Skibe', 'Bygninger', 'vidunder', 'Forskning', 'Highscores']
break;
	
case'.de':
        title = ['Info', 'Forum', 'Städte', 'Truppen', 'Sonstiges']
        title1 = ['Optionen', 'Version', 'Ausloggen'];
        title2 = ['Einheiten', 'Schiffe', 'Gebäude', 'Wunder', 'Forschung', 'Highscores']
        break;

	case'.es':
		title  = ['Otras Opciones', 'Forum', 'Villes','Tropa', 'Other']
		title1 = ['Opciones', 'Version', 'Salir']
		title2 = ['Tropa', 'Flota', 'Edificios', 'Maravillas', 'Recherche', 'Scores']
		break;

	case'.pl':
		title = ['Home', 'Forum', 'Villes', 'Jednostki', 'Other']
		title1 = ['Ustawienia', 'Version', 'Wyloguj']
		title2 = ['Jednostki', 'Statki', 'Budynki', 'Cuda', 'Recherche', 'Scores']
		break;

case'.it':
      title = ['Home', 'Forum', 'Villaggi', 'Esercito', 'Altro']
      title1 = ['Opzioni', 'Versione', 'Esci'];
      title2 = ['Truppe', 'Flotta', 'Edifici', 'Miracoli', 'Ricerche', 'Punteggio']
      break;

		
	default:
		title = ['Acceuil', 'Forum', 'Villes','Troupes', 'Autres']
		title1 = ['Options', 'Version', 'Quitter'];
		title2 = ['Unitées', 'Navires', 'Bâtiments', 'Miracle', 'Recherche', 'Scores']
	
};

var cssStyle = '#nav, #nav ul {float: center;list-style: none;line-height: 1;background: white;padding: 0; background: transparent;';
cssStyle += 'border: solid #eda;	border-width: 0px 0;	margin: 0 0 0 0;}\n';
cssStyle += '#nav a {display: block;width: 10em;w\idth: 6em;color: #7C6240;text-decoration: none;padding: 0.25em 2em;}\n';
cssStyle += '#nav a.daddy {background-image: url('+_img_arrow+') center right no-repeat;}\n';
cssStyle += '#nav li {float: left;padding: 0;width: 10em;}\n';
cssStyle += '#nav li ul {background: white; position: absolute;left: -999em;height: auto;width: 14.4em;w\idth: 13.9em;';	
cssStyle += 'font-weight: normal;border-width: 0.25em;margin: 0;}\n #nav li li {padding-right: 1em;width: 13em}\n';
cssStyle += '#nav li ul a {width: 13em;w\idth: 9em;}\n#nav li ul ul {margin: -1.75em 0 0 14em;}\n';
cssStyle += '#nav li:hover ul ul, #nav li:hover ul ul ul, #nav li.sfhover ul ul, #nav li.sfhover ul ul ul {';
cssStyle += 'left: -999em;}\n';
cssStyle += '#nav li:hover ul, #nav li li:hover ul, #nav li li li:hover ul, #nav li.sfhover ul, ';
cssStyle += '#nav li li.sfhover ul, #nav li li li.sfhover ul {	left: auto;}';
cssStyle += '#nav li:hover, #nav li.sfhover {background: #eda;}\n';
	
GM_addStyle(cssStyle);
	
var _menu = new Array();		
var _sub = new Array();		

_sub["href"] = "http://" + GameServer + "/index.php?view=city&id=" + MyId;
_sub["target"] = "#";		
var _subA = new Array();
_subA[title1[0]] = "http://"+GameServer+"/index.php?view=options";
_subA[title1[1]] = "http://"+GameServer+"/index.php?view=version";
_subA[title1[2]] = "http://"+GameServer+"/index.php?action=loginAvatar&function=logout";
_sub["submenu"]  = _subA;
_menu[title[0]] = _sub;
	
_sub = new Array();
_sub["href"] = "http://board.ikariam.fr/";
_sub["target"] = "blank";
_sub["submenu"] = null;
_menu[title[1]] = _sub;

_sub = new Array();
_sub["href"] = "#";
_sub["target"] = "#";
_sub["submenu"] = null;
_menu[title[2]] = _sub;

_sub = new Array();
_sub["target"] = "#";
_sub["href"] = "#";	
var _subT = new Array();
_subT[title2[0]] = "http://"+GameServer+"/index.php?view=unitdescription&unitId=301";
_subT[title2[1]]= "http://"+GameServer+"/index.php?view=shipdescription&shipId=210";
_subT[title2[2]] = "http://"+GameServer+"/index.php?view=buildingDetail&buildingId=4";
_subT[title2[3]] = "http://"+GameServer+"/index.php?view=wonderDetail&wonderId=1";
_sub["submenu"] = _subT;
_menu[title[3]] = _sub;
	
_sub = new Array();
_sub["target"] = "#";
_sub["href"] = "#";	
var _subT = new Array();
_subT[title2[4]] = "http://"+GameServer+"/index.php?view=researchDetail&researchId=1010";
_subT[title2[5]] = "http://"+GameServer+"/index.php?view=highscore&showMe=1";
_sub["submenu"] = _subT;
_menu[title[4]] = _sub;	

_sub = new Array();
_sub["href"] = ScriptUrl;
_sub["target"] = "blank";
_sub["submenu"] = null;
_menu["ME " + ScriptVersion] = _sub;

	
var _div = document.createElement("div");
var _ul = document.createElement("ul");
_ul.setAttribute("id", "nav");	
for(title in _menu) {		
	var _li = document.createElement("li");
	var _a = document.createElement("a");
	
	if(!(_menu[title]["href"]=="#")) {		
		_a.setAttribute("href", _menu[title]["href"]);
		if(!(_menu[title]["target"]=="#")) {
			_a.setAttribute("target", _menu[title]["target"]);
		}
	}
	
	_a.appendChild(document.createTextNode(title));
	_li.appendChild(_a);		
	
	if(_menu[title]["submenu"] != null) {
		var _ul2 = document.createElement("ul");
		var _li2;
		var _a2;
		for(t in _menu[title]["submenu"]) {
			_li2 = document.createElement("li");
			_a2 = document.createElement("a");
			_a2.setAttribute("href", _menu[title]["submenu"][t]);
			_a2.appendChild(document.createTextNode(t));
			_li2.appendChild(_a2);
			_ul2.appendChild(_li2);								
		}			
		_li.appendChild(_ul2);
	}
	_ul.appendChild(_li);
}
_div.appendChild(_ul);	

document.getElementById("GF_toolbar").innerHTML = _div.innerHTML;