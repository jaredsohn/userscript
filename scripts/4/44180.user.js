// ==UserScript==
// @author      Pioul
// @email		pioulx06@hotmail.fr
// @name		Dev Helper 1.0
// @description	Says what to upgrade depending on your development plans. Only FR is available now.
// @include http://*.travian*.*/*.php*
// @exclude http://*.travian*.*/hilfe.php*
// @exclude http://*.travian*.*/log*.php*
// @exclude http://*.travian*.*/index.php*
// @exclude http://*.travian*.*/anleitung.php*
// @exclude http://*.travian*.*/impressum.php*
// @exclude http://*.travian*.*/anmelden.php*
// @exclude http://*.travian*.*/gutscheine.php*
// @exclude http://*.travian*.*/spielregeln.php*
// @exclude http://*.travian*.*/links.php*
// @exclude http://*.travian*.*/geschichte.php*
// @exclude http://*.travian*.*/tutorial.php*
// @exclude http://*.travian*.*/manual.php*
// @exclude http://*.travian*.*/ajax.php*
// @exclude http://*.travian*.*/ad/*
// @exclude http://*.travian*.*/chat/*
// @exclude http://forum.travian*.*
// @exclude http://board.travian*.*
// @exclude http://shop.travian*.*
// @exclude http://*.travian*.*/activate.php*
// @exclude http://*.travian*.*/support.php*
// @exclude  http://help.travian*.*/*log
// @exclude *.css
// @exclude *.js
// @version     1.1
// ==/UserScript==
/*
	
		Travian Dev Helper 1.0
		Le script est soumis à la licence Attribution-Noncommercial-Share Alike 2.0 France de Creative Commons consultable à l'adresse suivante :
		http://creativecommons.org/licenses/by-nc-sa/2.0/fr/

		© Copyright pioul, 2009-2010

*/
//////////////////////////////////// VARIABLE A MODIFIER SELON VOTRE RACE /////////////////////////////////////////
var type = 'germain'; // Si vous n'êtes pas germain, remplacez 'germain' par 'romain' ou 'gaulois'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vous pouvez utiliser des pourcentages personnels pour votre développement. Pour ça, regardez la zone commentée ci-dessous.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
var productionPerHour = new Array(5);
productionPerHour[4] = 0;
for (var i = 0; i < 4; i++){ // récup de la prod par heure pour chaque type de ressources
	var a = document.getElementById('l' + (4-i));
	if (a != undefined && a != null) {
		productionPerHour[i] = parseInt(a.title);
		productionPerHour[4] += productionPerHour[i];
	}
	}
var prodBois = productionPerHour[0];
var prodTerre = productionPerHour[1];
var prodFer = productionPerHour[2];
var prodCereales = productionPerHour[3];
var diffR = 0;
var toupR = 'Bois';

if(type == 'gaulois'){
	var repBois = 26.67;
	var repTerre = 33.33;
	var repFer = 20;
	var repCereales = 20;
	//rep = (4,5,3,3);
} else if(type == 'germain'){
	var repBois = 33.33;
	var repTerre = 26.67;
	var repFer = 20;
	var repCereales = 20;
	//rep = (5,4,3,3);
} else if(type == 'romain'){
	var repBois = 33.33;
	var repTerre = 26.67;
	var repFer = 26.67;
	var repCereales = 20;
	//rep = (5,4,4,3);
}

/////////////////////////////////////// Lignes à décommenter pour utiliser vos pourcentages personnels //////////////////////////////////
// Le total des 4 valeurs ci-dessous doit être égal à 100. Définissez chaque valeur en fonction de votre type de jeu, votre race, etc.
// Par exemple, si vous êtes dans une période où vous construisez beaucoup d'une unité qui vaut 150Bois 95Terre 110Fer 80Cereales, mettez des valeurs proches de : 34.5 pour repBois, 21.8 pour repTerre, 25.3 pour repFer, 18.4 pour repCereales
// Les valeurs par défaut, bien qu'elles aient été choisies pour correspondre au mieux aux besoins de chaque race pour les premières semaines de jeu, ne sont là qu'à titre d'exemple. A vous de calculer quelles valeurs vous correspondent le mieux.
//
//	A MODIFIER & DECOMMENTER :
//
//	repBois = 0; // Pourcentage de votre production totale voulue pour le Bois
//	repTerre = 0; // Pourcentage de votre production totale voulue pour la Terre
//	repFer = 0; // Pourcentage de votre production totale voulue pour le Fer
//	repCereales = 0; // Pourcentage de votre production totale voulue pour les Céréales
/////////////////////////////////////// Fin ///////////////////////////////////////

if((prodBois*100/(prodBois+prodTerre+prodFer+prodCereales)) < repBois){
	diffP = repBois - (prodBois*100/(prodBois+prodTerre+prodFer+prodCereales));
	if(diffP > diffR){
	toupR = '<img src="http://s7.travian.fr/img/un/r/1.gif" border="0" />Bois';
	diffR = diffP;
	}
}
if((prodTerre*100/(prodBois+prodTerre+prodFer+prodCereales)) < repTerre){
	diffP = repTerre - (prodTerre*100/(prodBois+prodTerre+prodFer+prodCereales));
	if(diffP > diffR){
	toupR = '<img src="http://s7.travian.fr/img/un/r/2.gif" border="0" />Terre';
	diffR = diffP;
	}
}
if((prodFer*100/(prodBois+prodTerre+prodFer+prodCereales)) < repFer){
	diffP = repFer - (prodFer*100/(prodBois+prodTerre+prodFer+prodCereales));
	if(diffP > diffR){
	toupR = '<img src="http://s7.travian.fr/img/un/r/3.gif" border="0" />Fer';
	diffR = diffP;
	}
}
if((prodCereales*100/(prodBois+prodTerre+prodFer+prodCereales)) < repCereales){
	diffP = repCereales - (prodCereales*100/(prodBois+prodTerre+prodFer+prodCereales));
	if(diffP > diffR){
	toupR = '<img src="http://s7.travian.fr/img/un/r/4.gif" border="0" />Céréales';
	diffR = diffP;
	}
}	
	

document.getElementById('lright1').innerHTML += '<div align="center" title="Dev Helper vous permet de développer vos champs de ressources de manière équilibrée en fonction de votre type (Romain, Germain, Gaulois). A chaque étape de votre progression, Dev Helper vous guide en vous conseillant quel champ de ressources augmenter. Modifiez vos préférences personnelles en éditant le code source du script." id="nextbuild" style="width:200px; height:50px; background-color: #EFEFEF; border: 5px solid #DDDDDD; color: #555555;">Prochain champ à améliorer : <strong>' + toupR + '</strong><br><font size=1><span title="Production de Bois par heure">' +prodBois+'</span> | <span title="Production de Terre par heure">' +prodTerre+ '</span> | <span title="Production de Fer par heure">' +prodFer+ '</span> | <span title="Production de Céréales par heure">' +prodCereales+ '</span></font></div>';

