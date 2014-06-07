// version 0.1 BETA
// 12:15 03/09/2007
// Copyright (c) 2007, Lavevaisselle
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Translated by Julek  :)
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Royaumes Renaissants", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		Renesansowe Królestwa
// @namespace    	http://userscripts.org/scripts/
// @description	Pozwala na szybkie poruszanie się po miejscach w RK
// @include	http://www.krolestwa.com/*
// @include	http://krolestwa.com/*
// @exclude	
// ==/UserScript==

var iStyle = null;
var elStyle = document.createElement("style");
var s ="";
s+="#pub{padding:5px;z-index=99;overflow:visible;}";
s+="#nav, #nav ul {padding: 0;margin: 0;list-style: none;line-height:1;}";
s+="#nav a {display: block;width: 10em;padding:0px 3px 0px 0px;}";
s+="#nav li {float: left;width: 10em;background:#FFFFDF;border:1px solid black;padding:2px;height:13px;}";
s+="#nav li li {background:#F3EBBC;}";
s+="#nav li ul {position: absolute;width: 10em;left: -999em;margin-left:-3px;}";
s+="#nav li ul ul {margin: -17px 0 0 10em;}";
s+="#nav li:hover ul ul{left: -999em;}";
s+="#nav li:hover ul, #nav li li:hover ul {left: auto;}";

elStyle.innerHTML=s;
document.body.insertBefore(elStyle, iStyle);

var elDivSite = document.getElementById("site");

if (elDivSite != null) elDivSite.innerHTML+="<br>Skrypt GreaseMonkey do RK<br/>design by <a href='#' onClick='javascript:popupPerso(\"FichePersonnage.php?login=lavevaisselle\")'>Lavevaisselle</a><br/>Tlumaczenie by <a href='#' onClick='javascript:popupPerso(\"FichePersonnage.php?login=julek\")'>Julek</a>";

var elDivPub = document.getElementById("pub");
if (elDivPub != null){
	elDivPub.style.left="165";
	elDivPub.style.width="600";
	elDivPub.style.height="20";
	elDivPub.style.overflow="visible";
	//elDivPub.style.z-index="99";
	var m ="";

	m += "<ul id='nav'>";
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=2'>Mój dom</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=23'>Moja posiadłość</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=23&choix=2'>Inwentarz posiadłości</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=23&choix=4'>Oferty pracy</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=17&champ=0'>Pole 1</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=17&champ=1'>Pole 2</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=1'>Mój stan posiadania</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=3'>Zakup & Sprzedaż</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=11'>Sprawy duchowe</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=14'>Bunty</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=37&b=5'>Moje umiejętności</a></li>";
			m+="</ul>";
		m+="</li>";
		
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=0'>Miasto</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=3'>Ratusz</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=1'>Informacje o mieście</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=2'>Oferty parcy</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=5'>Handel gruntami</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=6'>Rynek</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=6&choix=2'>Ratusza</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=6&choix=1'>Graczy</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=5'>Karczma</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=4'>Kościół</a></li>";
			m+="</ul>";
		m+="</li>";
		
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=1'>Województwo</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=7'>Zamek</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=2'>Sala Rady</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=4'>Wybory Rady</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=8'>Prawa i dekrety</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=21'>Sąd powiatu</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=21&choix=1'>Procesy w toku</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=21&choix=2'>Lista więźniów</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=37'>Uniwersytet</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=37&b=10'>Informacje</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=37&b=3'>Praca</a></li>";					
						m+="<li><a href='EcranPrincipal.php?l=37&b=4'>Biblioteka</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=10'>Koszary</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=32'>Praca</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=43'>Katedra</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=8'>Giełda</a></li>";
			m+="</ul>";
		m+="</li>";

		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=31'>Podróż</a>";
			m+="<ul>";
				m+="<li><a href='EcranPrincipal.php?l=31'>Mapa</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=25'>Lista miast</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=2'>Opcje ruchu</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=3'>Działania</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=1'>Grupy</a></li>";
				m+="<li><a href='#' onClick='var perso =  prompt(\"Wpisz imię postaci\", \"\");popupPerso (\"FichePersonnage.php?login=\" + perso);'>Informacje o postaci</a></li>";
			m+="</ul>";
		m+="</li>";
		
	m+="</ul>";
			
	elDivPub.innerHTML = m;
}
