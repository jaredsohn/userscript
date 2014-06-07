// ==UserScript==
// @name           SI - MyMenu
// @namespace      Spaceinvasion
// @description   Menu de SpaceInvasion .. façon JC
// @version       0.1
// @date          19-12-2009
// @include        *.spaceinvasion.*/indexInternal.es?action=internalMenu*
// @include        http://spaceinvasion.*/indexInternal.es?action=internalMenu*
// ==/UserScript==

function Langue() {
	
	if(location.href.indexOf("spaceinvasion.ru/")+1) language = 'ru' ;
	if(location.href.indexOf("spaceinvasion.en/")+1) language = 'en';
	if(location.href.indexOf("spaceinvasion.de/")+1) language = 'de';
	if(location.href.indexOf("spaceinvasion.fr/")+1) language = 'fr';
	
}

function Menu() {


	AL00 = document.getElementsByTagName("a")[8] ; // adresse lien coalition
	AL01 = document.getElementsByTagName("a")[15] ; // adresse lien forum SI
	AL02 = document.getElementsByTagName("a")[14] ; // adresse lien quitter
	AT01 = document.getElementsByTagName("a")[15].innerHTML ; //  forum 
	AT02 = document.getElementsByTagName("a")[14].innerHTML ; //  quitter 
	AD02 = document.getElementsByTagName("th")[01].innerHTML ; // avatar
	AD03 = document.getElementsByTagName("th")[02].innerHTML ; // pseudo
	AD04 = document.getElementsByTagName("th")[04].innerHTML ; // points
	AD05 = document.getElementsByTagName("th")[05].innerHTML ; // rang
	AD06 = document.getElementsByTagName("td")[01].innerHTML ; // coalition
	AD07 = document.getElementsByTagName("td")[02].innerHTML ; // zone attaque
	AD08 = document.getElementsByTagName("td")[03].innerHTML ; // numero identifiant
	AD09 = document.getElementsByTagName("td")[04].innerHTML ; // Bâtiment
	AD10 = document.getElementsByTagName("td")[05].innerHTML ; // points bâtiment
	AD11 = document.getElementsByTagName("td")[06].innerHTML ; // classement bâtiment
	AD12 = document.getElementsByTagName("td")[07].innerHTML ; // Recherche
	AD13 = document.getElementsByTagName("td")[08].innerHTML ; // points recherche
	AD14 = document.getElementsByTagName("td")[09].innerHTML ; // classement recherche
	AD15 = document.getElementsByTagName("td")[10].innerHTML ; // Flotte
	AD16 = document.getElementsByTagName("td")[11].innerHTML ; // points flotte
	AD17 = document.getElementsByTagName("td")[12].innerHTML ; // classement flotte
	AD18 = document.getElementsByTagName("td")[13].innerHTML ; // Total
	AD19 = document.getElementsByTagName("td")[14].innerHTML ; // points total
	AD20 = document.getElementsByTagName("td")[15].innerHTML ; // classement total
	AD21 = document.getElementsByTagName("td")[16].innerHTML ; // Lien Centre de commande
	AD22 = document.getElementsByTagName("td")[17].innerHTML ; // Lien Bâtiment
	AD23 = document.getElementsByTagName("td")[18].innerHTML ; // Lien Economie
	AD24 = document.getElementsByTagName("td")[19].innerHTML ; // Lien Recherche
	AD25 = document.getElementsByTagName("td")[20].innerHTML ; // Lien Usine d armement
	AD26 = document.getElementsByTagName("td")[21].innerHTML ; // Lien Commande flotte
	AD27 = document.getElementsByTagName("td")[22].innerHTML ; // Lien Défense
	AD28 = document.getElementsByTagName("td")[23].innerHTML ; // Lien Galaxie
	AD29 = document.getElementsByTagName("td")[24].innerHTML ; // Lien Coalitions :
	AD30 = document.getElementsByTagName("td")[25].innerHTML ; // Lien Messages
	AD31 = document.getElementsByTagName("td")[26].innerHTML ; // Lien Configuration
	AD32 = document.getElementsByTagName("td")[27].innerHTML ; // Lien Liste des rangs
	AD33 = document.getElementsByTagName("td")[28].innerHTML ; // Lien Arbre technologique
	AD34 = document.getElementsByTagName("td")[29].innerHTML ; // Lien Régles
	AD35 = document.getElementsByTagName("td")[30].innerHTML ; // Lien Quitter

        origin = document.getElementsByTagName("table")[3] ;
        origin.style.display = "none";
            
	tb = document.createElement("tbody");
	tb.innerHTML = "<br /><table width=\"188\" cellspacing=0 cellpadding=2 border=0 height=20 ><tr><td class=\"rahmen\"><b>Menu du jeu</b></td></tr><tr><td class=\"nachricht\">"+AD21+"</td></tr><tr><td class=\"nachricht\">"+AD26+"</td></tr><td class=\"nachricht\">"+AD30+"</td></tr><tr><td class=\"nachricht\">"+AD23+"</td></tr><tr><td class=\"nachricht\">"+AD28+"</td></tr><tr></table><br /><table width=\"188\" cellspacing=0 cellpadding=2 border=0 height=20 ><tr><td class=\"rahmen\"><b>Constructions</b></td></tr><tr><td class=\"nachricht\">"+AD22+"</td></tr><tr><td class=\"nachricht\">"+AD24+"</td></tr><tr><td class=\"nachricht\">"+AD27+"</td></tr><tr><td class=\"nachricht\">"+AD25+"</td></tr></table><br /><table width=\"188\" cellspacing=0 cellpadding=2 border=0 height=20 ><tr><td class=\"rahmen\"><b>Liens & options</b></td></tr><tr><td class=\"nachricht\"><a href="+AL00+" class=\"menu\">"+AD06+"</a></td></tr><tr><td class=\"nachricht\"><a href="+AL01+" class=\"menu\">"+AT01+" BigPoint</a></td></tr><tr><td class=\"nachricht\"><a href=\"http://si.spy.online.fr/\" class=\"menu\">SI-Spy</a></td></tr><tr><td class=\"nachricht\"><a href=\"http://www.si-master.com/"+language+"/\" class=\"menu\">SI-Master</a></td></tr><tr><td class=\"nachricht\"><a href=\"http://si.gamestats.org/?lang="+language+"\" class=\"menu\">GameStats</a></td></tr><tr><td class=\"nachricht\">"+AD32+"</td></tr><tr><td class=\"nachricht\">"+AD33+"</td></tr></table><br /><br /><table width=\"188\" cellspacing=0 cellpadding=2 border=0 height=20 ><tr><td class=\"nachricht\">"+AD31+"</td></tr></table><table align=\"right\" ><tr><th><img src=\"../img/a_pfeil.gif\" width=10 height=8 ><a href="+AL02+" onclick='logout()'>"+AT02+"</a></th></tr></table>";

	insertAfter(tb,  document.getElementsByTagName("table")[2]);

}

function insertAfter(newNode, node) {return node.parentNode.insertBefore(newNode, node.nextSibling);}
Langue(); Menu();
