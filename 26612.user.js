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
		BUILDINGS=1,
		MARBLE=2,
		WINE=3,
		SULFUR=4,
		FORUM=5,
		SCORE=6,
		OPTIONS=7,
		LOGOUT=8,
		PLUSSZ=9,
		CRYSTAL=10;
		

switch(lang){
	case'.fr':
		title = 'Autres Options'
		langfile=['Recherche','Unités','Navires','Bâtiments','Miracle', 'Forum', 'Scores', 'Options', 'Quitter']
		langfile_title=['Recherche','Unités','Navires','Bâtiments','Miracle', 'Forum', 'Scores', 'Options', 'Finir la séance de jeu']
		break;
case '.hu':
       title = 'Újabb beállítások'
       langfile=['Súgó','Súgó:Épületek','Márványsziget','Borsziget','Kénsziget',
'Fórum', 'Statisztika', 'Beállítások', 'Kilépés', 'Plussz', 'Kristálysziget']
       langfile_title=['Súgó','Súgó:Épuletek','Márványsziget','Borsziget','Kénsziget',
'Fórum', 'Statisztika', 'Beállítások', 'Kilépés', 'Ikariam PLUSSZ', 'Kristálysziget']
       break;

	case'.es':
        title = 'Otras Opciones'
        langfile=['Investigación','Tropa','Flota','Edificios','Maravillas', 'Forum', 'Estadísticas', 'Opciones', 'Salir']
       langfile_title=['Investigación','Tropa','Flota','Edificios','Maravillas', 'Forum', 'Estadísticas', 'Opciones', 'Salir']
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
HTML += '<li class="Súgó"><a href="/index.php?view=informations&articleId=10000&mainId=10000" title="'+langfile_title[SEARCH]+'">'
HTML += '<span class="textLabel">'+langfile[SEARCH]+'</span></a></li>'

HTML += '<li class="Épületek"><a href="/index.php?view=buildingDetail&buildingId=4" title="'+langfile_title[BUILDINGS]+'">'
HTML += '<span class="textLabel">'+langfile[BUILDINGS]+'</span></a></li>'

HTML += '<li class="Márványsyiget"><a href="/index.php?view=island&id=101" title="'+langfile_title[MARBLE]+'">'
HTML += '<span class="textLabel">'+langfile[MARBLE]+'</span></a></li>'

HTML += '<li class="Borsziget"><a href="/index.php?view=island&id=106" title="'+langfile_title[WINE]+'">'
HTML += '<span class="textLabel">'+langfile_title[WINE]+'</span></a></li>'

HTML += '<li class="Kristálysziget"><a href="/index.php?view=island&id=104" title="'+langfile_title[CRYSTAL]+'">'
HTML += '<span class="textLabel">'+langfile_title[CRYSTAL]+'</span></a></li>'

HTML += '<li class="Kénsziget"><a href="/index.php?view=island&id=103" title="'+langfile_title[SULFUR]+'">'
HTML += '<span class="textLabel">'+langfile[SULFUR]+'</span></a></li>'

HTML += '<li class="Plussz"><a href="/index.php?view=premium" title="'+langfile_title[PLUSSZ]+'">'
HTML += '<span class="textLabel">'+langfile[PLUSSZ]+'</span></a></li>'

HTML += '<li class="forum"><a href="http://board.ikariam.hu" title="'+langfile_title[FORUM]+'" target="_blank ">'
HTML += '<span class="textLabel">'+langfile[FORUM]+'</span></a></li>'

HTML += '<li class="Statisztika"><a href="/index.php?view=highscore&amp;showMe=1" title="'+langfile_title[SCORE]+'">'
HTML += '<span class="textLabel">'+langfile[SCORE]+'</span></a></li>'

HTML += '<li class="options"><a href="/index.php?view=options" title="'+langfile_title[OPTIONS]+'">'
HTML += '<span class="textLabel">'+langfile[OPTIONS]+'</span></a></li>'

HTML += '<li class="logout"><a href="/index.php?action=loginAvatar&function=logout" title="'+langfile_title[LOGOUT]+'">'
HTML += '<span class="textLabel">'+langfile[LOGOUT]+'</span></a></li>'

HTML += document.getElementById("GF_toolbar").getElementsByTagName("li")[6].innerHTML;

document.getElementById("GF_toolbar").innerHTML = HTML;