// ==UserScript==
// @name           Ikariam: Geliştirilmiş Menü
// @namespace      terrior
// @include        http://*.ikariam.*/index.php*
// ==/UserScript==

var ScriptName='Ikariam: Geliştirilmiş Menü';
var ScriptAutor='terrior';
var ScriptVersion='0.1.0';
var ScriptUrl = 'http://userscripts.org/scripts/show/23384';

var lang=window.location.href.match(/ikariam\d*(\.[a-zA-Z\.]+)/).pop();
var langfile=new Array();

const ARAMA=0,
		UNITE=1,
		GEMI=2,
		BINA=3,
		TAPINAK=4,
		FORUM=5,
		SIRALAMA=6,
		AYAR=7,
		CIKIS=8;
		

switch(lang){
	case'.fr':
		title = 'Autres Options'
		langfile=['Recherche','Unités','Navires','Bâtiments','Miracle', 'Forum', 'Scores', 'Options', 'Quitter']
		langfile_title=['Recherche','Unités','Navires','Bâtiments','Miracle', 'Forum', 'Scores', 'Options', 'Finir la séance de jeu']
		break;
	
case'.si':
       title = 'Ostale moznosti'
       langfile=['Iskanje','Enote','Plovila','Gradnja','Cudez',
'Forum', 'Rezultati', 'Moznosti', 'Odjava']
       langfile_title=['Iskanje','Enote','Plovila','Gradnja','Cudez',
'Forum', 'Rezultati', 'Moznosti', 'Odjava']
   break;

        case'.net':
		title = 'Diger Ayarlar'
		langfile=['Arama','Unite Bilgileri','Gemi Bilgileri','Binalar','Tapinak', 'Forum', 'Siralama', 'Ayarlar', 'Cikis']
		langfile_title=['Arama','Unite Bilgileri','Gemi Bilgileri','Binalar','Tapinak', 'Forum', 'Siralama', 'Ayarlar', 'Cikis']
		break;
};

var HTML = '<h3>'+title+'</h3>'
HTML += '<ul>'
HTML += '<li class="Forschung"><a href="/index.php?view=researchDetail&researchId=1010" title="'+langfile_title[ARAMA]+'">'
HTML += '<span class="textLabel">'+langfile[ARAMA]+'</span></a></li>'

HTML += '<li class="Einheiten"><a href="/index.php?view=unitdescription&unitId=301" title="'+langfile_title[UNITE]+'">'
HTML += '<span class="textLabel">'+langfile[UNITE]+'</span></a></li>'

HTML += '<li class="Schiffe"><a href="/index.php?view=shipdescription&shipId=210" title="'+langfile_title[GEMI]+'">'
HTML += '<span class="textLabel">'+langfile[GEMI]+'</span></a></li>'

HTML += '<li class="Gebäude"><a href="/index.php?view=buildingDetail&buildingId=4" title="'+langfile_title[BINA]+'">'
HTML += '<span class="textLabel">'+langfile_title[BINA]+'</span></a></li>'

HTML += '<li class="Wunder"><a href="/index.php?view=wonderDetail&wonderId=1" title="'+langfile_title[TAPINAK]+'">'
HTML += '<span class="textLabel">'+langfile[TAPINAK]+'</span></a></li>'

HTML += '<li class="forum"><a href="http://board.ikariam.de" title="'+langfile_title[FORUM]+'" target="_blank">'
HTML += '<span class="textLabel">'+langfile[FORUM]+'</span></a></li>'

HTML += '<li class="highscore"><a href="/index.php?view=highscore&amp;showMe=1" title="'+langfile_title[SIRALAMA]+'">'
HTML += '<span class="textLabel">'+langfile[SIRALAMA]+'</span></a></li>'

HTML += '<li class="options"><a href="/index.php?view=options" title="'+langfile_title[AYAR]+'">'
HTML += '<span class="textLabel">'+langfile[AYAR]+'</span></a></li>'

HTML += '<li class="logout"><a href="/index.php?action=loginAvatar&function=logout" title="'+langfile_title[CIKIS]+'">'
HTML += '<span class="textLabel">'+langfile[CIKIS]+'</span></a></li>'

HTML += document.getElementById("GF_toolbar").getElementsByTagName("li")[6].innerHTML;

HTML += '<li class="version"><a href="'+ScriptUrl+'" title="'+ScriptName+'">'
HTML += '<span class="textLabel">GelismisMenu '+ScriptVersion+'</span></a></li>'

document.getElementById("GF_toolbar").innerHTML = HTML;