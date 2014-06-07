// ==UserScript==
// @name Kiegeszito menu (A.N.A)
// @namespace Anatoxin
// @description Ogame.hu - kiegeszito menu hasznos linkekkel. Az A.N.A szovetseg szamara.
// @version 1.69
// @include http://s101-hu.ogame.gameforge.com/game/*
// ==/UserScript==

//Testreszabas kezdete
//Ezeket a cimeket a Szovetseg menuponton belul a "Belterulet"-ben talaljatok

var chat_address = 'A szovetseg chatjenek a cime';            // A chat cime
var gt_address = 'A szovetseg Galaxy Toolsanak a cime';       // A GalaxyTools cime

//Ezeket a sorokat nem kell szerkeszteni, kiveve, ha valamiert megvaltozik valamelyik link! Koruziben errol ertesulni fogtok.

var site_address = 'http://www.anaportal.tk';                 // A szovetseg honlapjanak a cime
var forum_address = 'http://board.anaportal.tk';              // A szovetseg forumanak a cime
//Testreszabas vege

//A kovetkezo resz eltunteti a felesleges dolgokat az oldalrol:

//mmoContent        - Gameforge toolbar az oldal tetejerol
//officers          - Parancsnokok az oldal jobb felso reszerol
//changelog_link    - Verzio attekintes
//helper            - Tutorial
//siteFooter        - Footer

document.getElementById('mmoContent').style.display = 'none';
document.getElementsByTagName('div')[0].className = document.getElementsByTagName('div')[0].className.replace('no-commander', '');

document.getElementById('officers').style.display = 'none';
document.getElementsByTagName('div')[0].className = document.getElementsByTagName('div')[0].className.replace('no-commander', '');

document.getElementById('changelog_link').style.display = 'none';
document.getElementsByTagName('div')[0].className = document.getElementsByTagName('div')[0].className.replace('no-commander', '');

document.getElementById('helper').style.display = 'none';
document.getElementsByTagName('div')[0].className = document.getElementsByTagName('div')[0].className.replace('no-commander', '');
    
document.getElementById('siteFooter').style.display = 'none';
document.getElementsByTagName('div')[0].className = document.getElementsByTagName('div')[0].className.replace('no-commander', '');

(function(){
	
	var menuNode = document.getElementById('playerName');
	if (menuNode!=null)
	{
		var ally = document.createElement('b');
	
		ally.appendChild(document.createTextNode(' [A.N.A]'));

		var li = document.createElement('li');

        li.appendChild(ally);
		menuNode.appendChild(li);   

	}
    
})();

var usersession = unsafeWindow.session;                               // Ezt meg veletlenul se piszkaljatok!

var allyDiv = document.createElement('div');                          // Ezt meg veletlenul se piszkaljatok!
allyDiv.id = 'allyDiv';
allyDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdnbb/e95e882e8916c0be653cb7a57e9581.gif" height="29" width="38"></span><a class="menubutton " href="' + site_address + '" accesskey="" target="_blank"><span class="textlabel">A.N.A Szövetség</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdnbb/e95e882e8916c0be653cb7a57e9581.gif" height="29" width="38"></span><a class="menubutton " href="' + forum_address + '" accesskey="" target="_blank"><span class="textlabel">A.N.A Fórum</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdnbb/e95e882e8916c0be653cb7a57e9581.gif" height="29" width="38"></span><a class="menubutton " href="' + chat_address + '" accesskey="" target="_blank"><span class="textlabel">A.N.A Chat</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdnbb/e95e882e8916c0be653cb7a57e9581.gif" height="29" width="38"></span><a class="menubutton " href="http://websim.speedsim.net/index.php?lang=hu" accesskey="" target="_blank"><span class="textlabel">WebSim</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdnbb/e95e882e8916c0be653cb7a57e9581.gif" height="29" width="38"></span><a class="menubutton " href="' + gt_address + '" accesskey="" target="_blank"><span class="textlabel">GalaxyTools</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdnbb/e95e882e8916c0be653cb7a57e9581.gif" height="29" width="38"></span><a class="menubutton " href="http://o-calc.com/" accesskey="" target="_blank"><span class="textlabel">O-Calc</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdnbb/e95e882e8916c0be653cb7a57e9581.gif" height="29" width="38"></span><a class="menubutton " href="http://wr.utp.hu/" accesskey="" target="_blank"><span class="textlabel">CR Konverter</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdnbb/e95e882e8916c0be653cb7a57e9581.gif" height="29" width="38"></span><a class="menubutton " href="http://bugs.utp.hu/" accesskey="" target="_blank"><span class="textlabel">Gulverter</span></a></li>';
document.getElementById('menuTable').appendChild(allyDiv); 