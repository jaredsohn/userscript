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
// @name		Royaumes Renaissants
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

if (elDivSite != null) elDivSite.innerHTML+="<br>Vous utilsez l'extension GreaseMonkey For RR<br/>design By <a href='#' onClick='javascript:popupPerso(\"FichePersonnage.php?login=lavevaisselle\")'>Lavevaisselle</a>";

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
		m+= "<a href='EcranPrincipal.php?l=2'>Chez Moi</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=23'>Votre propriété</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=23&choix=2'>Inventaire</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=23&choix=4'>Offre emploi</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=17&champ=0'>Champ 1</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=17&champ=1'>Champ 2</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=1'>Votre inventaire</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=3'>Achats & Ventes</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=2&choix=11'>Menu transcendant</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=14'>Désobéissance</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=37&b=5'>Mes connaissances</a></li>";
			m+="</ul>";
		m+="</li>";
		
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=0'>Village</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=3'>Mairie</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=1'>Information</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=2'>Offre emploi</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=3&choix=5'>Marché foncier</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=6'>Marché</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=6&choix=2'>Mairie</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=6&choix=1'>Joueurs</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=5'>Taverne</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=4'>Eglise</a></li>";
			m+="</ul>";
		m+="</li>";
		
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=1'>Duché</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=7'>Chateau</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=2'>Salle du conseil</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=4'>Election</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=7&choix=8'>Lois & décrets</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=21'>Cours de justice</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=21&choix=1'>Affaire en cours</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=21&choix=2'>registre des prisons</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=37'>Université</a>";
					m+="<ul>";
						m+="<li><a href='EcranPrincipal.php?l=37&b=10'>Informations</a></li>";
						m+="<li><a href='EcranPrincipal.php?l=37&b=3'>Enseigner</a></li>";					
						m+="<li><a href='EcranPrincipal.php?l=37&b=4'>Bibliothéque</a></li>";
					m+="</ul>";
				m+="</li>";
				m+="<li><a href='EcranPrincipal.php?l=10'>Caserne</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=32'>Travailler</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=43'>Cathédrale</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=8'>Foire</a></li>";
			m+="</ul>";
		m+="</li>";

		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=31'>Déplacement</a>";
			m+="<ul>";
				m+="<li><a href='EcranPrincipal.php?l=31'>Carte</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=25'>Liste des villages</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=2'>Options</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=3'>Actions</a></li>";
				m+="<li><a href='EcranPrincipal.php?l=31&c=1'>Groupe</a></li>";
				m+="<li><a href='#' onClick='var perso =  prompt(\"Entrez le nom du personnage à rechercher\", \"Nom du personnage\");popupPerso (\"FichePersonnage.php?login=\" + perso);'>Rechercher un ami</a></li>";
			m+="</ul>";
		m+="</li>";
		
	m+="</ul>";
			
	elDivPub.innerHTML = m;
}
