// version 0.1 BETA
// 12:15 03/09/2007
// Copyright (c) 2007, Lavevaisselle
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// @name		Koninkrijken der Renaissance
// @namespace    	http://userscripts.org/scripts/
// @description	Permet de gérer plus facilement son environnement dans RR
// @include	http://www.lesroyaumes.com/*
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

if (elDivSite != null) elDivSite.innerHTML+="<br>Vous utilsez l'extension GreaseMonkey For RR<br/>design By <a href='#' onClick='javascript:popupPerso

(\"FichePersonnage.php?login=lavevaisselle\")'>Lavevaisselle</a>";

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
		m+= "<a href='EcranPrincipal.php?l=2'>Mijn Huis</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=23'>My Eigendom</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=23&choix=2'>Inventaris</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=23&choix=4'>Mijn Werkplaats</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=17&champ=0'>Veld 1</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=17&champ=1'>Veld 2</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=1'>Mijn Inventaris</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=3'>In- en Verkoop</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=11'>Transcendentie Menu</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=14'>Ongehoorzaamheid</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=37&b=5'>Mijn Kennis</a></li>";
			m+="</ul>";
		m+="</li>";
		
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=0'>Dorp</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=3'>Gemeentehuis</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=1'>Informatie</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=2'>Vacatures</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=5'>Onroerend Goed</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=6'>Markt</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=6&choix=2'>De Gemeente</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=6&choix=1'>Dorpsgenoten</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=5'>Herberg</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=4'>Kerk</a></li>";
			m+="</ul>";
		m+="</li>";
		
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=1'>Provincie</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=7'>Kasteel</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=2'>Raadszaal</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=4'>Verkiezingen</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=8'>Wetten en Decreten</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=21'>Hof van Justitie</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=21&choix=1'>Lopende Zaken</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=21&choix=2'>Lijst van Gevangenen</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=37'>Universiteit</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=37&b=10'>Informatie</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=37&b=3'>Inschrijvingen</a></li>";					
						m+="<li><a href='EcranPrincipal.php?l=37&b=4'>Bibliotheek</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=10'>Kazerne</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=32'>Werken</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=43'>Kathedraal</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=8'>Markt</a></li>";
			m+="</ul>";
		m+="</li>";

		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=31'>Reizen</a>";
			m+="<ul>";
				m+="<li><a href='EcranPrincipal.php?l=31'>Kaart</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=25'>Lijst van dorpen</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=2'>Opties</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=3'>Akties</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=1'>Groepen</a></li>";
				m+="<li><a href='#' onClick='var perso =  prompt(\"Voer de naam in van de gezochte\", \"Character Name\");popupPerso 

(\"FichePersonnage.php?login=\" + perso);'>Searching a Friend</a></li>";
			m+="</ul>";
		m+="</li>";
		
	m+="</ul>";
			
	elDivPub.innerHTML = m;
}