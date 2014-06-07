// version 0.1 BETA
// 12:15 03/09/2007
// Copyright (c) 2007, Lavevaisselle
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Translated by Libertius :)
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
// select "Regni Rinascimentali", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Regni Rinascimentali
// @namespace   http://userscripts.org/scripts/
// @description	Consente di navigare più rapidamente tra le pagine di RR
// @include     http://www.lesroyaumes.com/*
// @include     http://www.iregni.com/*
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

if (elDivSite != null) elDivSite.innerHTML+="<br>State usando l'estensione GreaseMonkey per RR<br/>creata da <a href='#' onClick='javascript:popupPerso(\"FichePersonnage.php?login=lavevaisselle\")'>Lavevaisselle</a>";

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
		m+= "<a href='EcranPrincipal.php?l=2'>La mia casa</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=23'>La vostra propriet&agrave;</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=23&choix=2'>Inventario</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=23&choix=4'>Offerte di lavoro</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=17&champ=0'>1&ordm; campo</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=17&champ=1'>2&ordm; campo</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=1'>Inventario</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=3'>Acquisti e vendite</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=11'>Menu trascendentale</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=14'>Ribellione</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=37&b=5'>Le mie conoscenze</a></li>";
			m+="</ul>";
		m+="</li>";
		
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=0'>Citt&agrave;</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=3'>Municipio</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=1'>Informazioni</a></li>"; 
						m+="<li><a href='EcranPrincipal.php?l=3&choix=2'>Offerte di lavoro</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=5'>Il mercato fondiario</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=6'>Mercato</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=6&choix=2'>Citt&agrave;</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=6&choix=1'>Giocatori</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=5'>Taverna</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=4'>Chiesa</a></li>";
			m+="</ul>";
		m+="</li>";
		
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=1'>Principato</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=7'>Castello</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=2'>Sala del consiglio</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=4'>Elezione del consiglio</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=8'>Leggi e decreti</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=21'>Corte di giustizia</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=21&choix=1'>Cause in sospeso</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=21&choix=2'>Registro della prigione</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=37'>Universit&agrave;</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=37&b=10'>Informazioni</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=37&b=3'>Insegnare</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=37&b=4'>Biblioteca</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=10'>Caserma</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=32'>Lavoro</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=43'>Cattedrale</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=8'>Fiera</a></li>";
			m+="</ul>";
		m+="</li>";

		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=31'>Viaggiare</a>";
			m+="<ul>";
				m+="<li><a href='EcranPrincipal.php?l=31'>Mappa</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=25'>Elenco delle citt&agrave;</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=2'>Opzioni di viaggio</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=3'>Azioni</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=1'>Gruppi</a></li>";
				m+="<li><a href='#' onClick='var perso =  prompt(\"Inserite il nome del personaggio da cercare\", \"Nome del personaggio\");popupPerso (\"FichePersonnage.php?login=\" + perso);'>Cercate un amico</a></li>";
			m+="</ul>";
		m+="</li>";
		
	m+="</ul>";
			
	elDivPub.innerHTML = m;
}
