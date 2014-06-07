// ==UserScript==
// @name           Ikariam: Extended Menu
// @namespace      Neuromancien
// @include        http://*ikariam.*/index.php*
// ==/UserScript==

var ScriptName='Ikariam: Extended Menu';
var ScriptAutor='Neuromancien';
var ScriptVersion='0.9.9';
var ScriptUrl = 'http://userscripts.org/scripts/show/23330';

var lang=window.location.href.match(/ikariam\d*(\.[a-zA-Z\.]+)/).pop();
var langfile=new Array();

const SEARCH=0,
		UNITS=1,
		VESSELS=2,
		BUILDINGS=3,
		MIRACLE=4,
		FORUM=5,
		SCORE=6,
		OPTIONS=7,
		LOGOUT=8;
		

switch(lang){
	case'.fr':
		title = 'Autres Options'
		langfile=['Recherche','Unités','Navires','Bâtiments','Miracle', 'Forum', 'Scores', 'Options', 'Quitter']
		langfile_title=['Recherche','Unités','Navires','Bâtiments','Miracle', 'Forum', 'Scores', 'Options', 'Finir la séance de jeu']
		break;
case '.hu':
       title = 'Újabb beállítások'
       langfile=['Súgó','Egységek','Hajók','Épület','Csodák',
'Fórum', 'Statisztika', 'Beállítások', 'Kilépés']
       langfile_title=['Súgó','Egységek','Hajók','Épület','Csodák',
'Fórum', 'Statisztika', 'Beállítások', 'Kilépés']
       break;

	case'.es':
        title = 'Otras Opciones'
        langfile=['Investigación','Tropa','Flota','Edificios','Maravillas', 'Forum', 'Estadísticas', 'Opciones', 'Salir']
       langfile_title=['Investigación','Tropa','Flota','Edificios','Maravillas', 'Forum', 'Estadísticas', 'Opciones', 'Salir']
   break;

case'.de':
        title = 'Optionen'
        langfile=['Hilfe','Einheiten','Schiffe','Forschung','Wunder', 'Forum', 'Highcore', 'Optionen', 'Ausloggen']
        langfile_title=['Hilfe','Einheiten','Schiffe','Forschung','Wunder', 'Forum', 'Highscore Tabelle', 'Optionen', 'Loggt Dich aus dem Spiel aus']
        break;


case'.pl':
               title = 'Other options'
               langfile=['Badania','Jednostki','Statki','Budynki','Cuda', 'Forum',
'Ranking', 'Ustawienia', 'Wyloguj']
               langfile_title=['Badania','Jednostki','Statki','Budynki','Cuda',
'Forum', 'Ranking', 'Ustawienia', 'Wyloguj']
  break;

case'.si':
       title = 'Ostale moznosti'
       langfile=['Iskanje','Enote','Plovila','Gradnja','Cudez',
'Forum', 'Rezultati', 'Moznosti', 'Odjava']
       langfile_title=['Iskanje','Enote','Plovila','Gradnja','Cudez',
'Forum', 'Rezultati', 'Moznosti', 'Odjava']
   break;

        default:
		title = 'Other options'
		langfile=['Search','Units','Vessels','Building','Miracle', 'Forum', 'Scores', 'Options', 'Logout']
		langfile_title=['Search','Units','Vessels','Building','Miracle', 'Forum', 'Scores', 'Options', 'Logout']
		break;
};

var HTML = '<h3>'+title+'</h3>'
HTML += '<ul>'
HTML += '<li class="Forschung"><a href="/index.php?view=researchDetail&researchId=1010" title="'+langfile_title[SEARCH]+'">'
HTML += '<span class="textLabel">'+langfile[SEARCH]+'</span></a></li>'

HTML += '<li class="Einheiten"><a href="/index.php?view=unitdescription&unitId=301" title="'+langfile_title[UNITS]+'">'
HTML += '<span class="textLabel">'+langfile[UNITS]+'</span></a></li>'

HTML += '<li class="Schiffe"><a href="/index.php?view=shipdescription&shipId=210" title="'+langfile_title[VESSELS]+'">'
HTML += '<span class="textLabel">'+langfile[VESSELS]+'</span></a></li>'

HTML += '<li class="Gebäude"><a href="/index.php?view=buildingDetail&buildingId=4" title="'+langfile_title[BUILDINGS]+'">'
HTML += '<span class="textLabel">'+langfile_title[BUILDINGS]+'</span></a></li>'

HTML += '<li class="Wunder"><a href="/index.php?view=wonderDetail&wonderId=1" title="'+langfile_title[MIRACLE]+'">'
HTML += '<span class="textLabel">'+langfile[MIRACLE]+'</span></a></li>'

HTML += '<li class="forum"><a href="http://board.ikariam.fr" title="'+langfile_title[FORUM]+'" target="_blank">'
HTML += '<span class="textLabel">'+langfile[FORUM]+'</span></a></li>'

HTML += '<li class="highscore"><a href="/index.php?view=highscore&amp;showMe=1" title="'+langfile_title[SCORE]+'">'
HTML += '<span class="textLabel">'+langfile[SCORE]+'</span></a></li>'

HTML += '<li class="options"><a href="/index.php?view=options" title="'+langfile_title[OPTIONS]+'">'
HTML += '<span class="textLabel">'+langfile[OPTIONS]+'</span></a></li>'

HTML += '<li class="logout"><a href="/index.php?action=loginAvatar&function=logout" title="'+langfile_title[LOGOUT]+'">'
HTML += '<span class="textLabel">'+langfile[LOGOUT]+'</span></a></li>'

HTML += document.getElementById("GF_toolbar").getElementsByTagName("li")[6].innerHTML;

HTML += '<li class="version"><a href="'+ScriptUrl+'" title="'+ScriptName+'">'
HTML += '<span class="textLabel">ExtMenu '+ScriptVersion+'</span></a></li>'

document.getElementById("GF_toolbar").innerHTML = HTML;