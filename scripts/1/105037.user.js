// ==UserScript==
// @name           eRepublik Spain
// @namespace      http://yelidmod.com
// @include        http://*erepublik.com/*
// ==/UserScript==

var allHTMLTags = new Array();
var allHTMLTags = document.getElementsByTagName('div');
var actual = "";

var menu = new Array();
menu[0]="<li><a href='http://erepublikspain.superforos.com/viewforum.php?f=1' class='ambient_toggler'>Nacional</a></li>";
menu[1]="<li><a href='http://erepublikspain.superforos.com/viewforum.php?f=206' class='ambient_toggler'>Política Nacional</a></li>";
menu[2]="<li><a href='http://erepublikspain.superforos.com/viewforum.php?f=205' class='ambient_toggler'>Internacional</a></li>";
menu[3]="<li><a href='http://erepublikspain.superforos.com/viewforum.php?f=14' class='ambient_toggler'>Ayuda y Dudas</a></li>";
menu[4]="<li><a href='http://erepublikspain.superforos.com/viewforum.php?f=214' class='ambient_toggler'>Religiones</a></li>";
menu[5]="<li><a href='http://erepublik-market.com/hospital.html' class='ambient_toggler'>Hospitales</a></li>";



for (i=0; i<allHTMLTags.length; i++) {
	if (allHTMLTags[i].className=='ath') {

	

	for (o=0; o<menu.length; o++) {
	actual = actual+menu[o];
	}

	allHTMLTags[i].innerHTML = "<a href='javascript:;' class='ambient_toggler'><span>Ambient on/off</a><style>ul.muertet{list-style:none;}ul.muertet ul

{display:none;list-style:none;} ul.muertet li:hover > ul{display:block;}</style><ul class='muertet'><li><a class='ambient_toggler'><img 

src='http://www.foreclosurelistingsnationwide.com/images/spanish-flag.gif'/>Foro Español</a><ul>"+actual+"</ul></li></ul></span>";




}}
