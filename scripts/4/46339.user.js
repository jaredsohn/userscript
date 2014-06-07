// ==UserScript==
// @name          Jauge de banque
// @namespace     D-
// @description   Jauge de prise en banque pour savoir quand on est bloqué/débloqué.
// @include       http://dummy/*
// ==/UserScript==

// Auteurs:
// bluflonalgul 2009-03-24
// et bientôt gmotw

//TP1

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

/////////////////////////////////////////////////////////////////////////////
// Module: Jauge de prise en banque pour savoir quand on est bloqué/débloqué.
var JaugeBanque = {  
	mcode: "JaugeB", // code (nom court) du module. Propriété 'mcode' obligatoire!
	nodeId: "JaugeBId", // identifiant DOM pour le bidule à insérer, penser à en mettre un unique 
	label: "Jauge de banque",
	options: { // options d'installation ou autre
	   htmldesc: "Indique la marge d'emprunt qu'on a en banque et une minuterie permet de savoir le temps restant avant déblocage ou levé partielle de limitation.<br>"+
               "Pour se dire: \"Ah! dans l'immédiat je ne peux prendre qu'un truc, et dans 8mn je pourrai en prendre 4\".<br>"+
               "PAS ENCORE OPERATIONNEL. Juste une maquette pour le moment.",
    credits: "Idée, maquette et intégration: Bluflonalgul. Code principal: Gmotw (en cours).",
  },
	dtnode: null, // titre Minuterie et jauge
	ddnode: null, // délais d'attente
}

JaugeBanque.build = function() {
	this.dtnode= document.createElement('dt'); 
	this.dtnode.innerHTML="Minuterie <font color=\"#660000\">5/5 max! <img alt=\"\" src=\"http://data.hordes.fr/gfx/icons/small_warning.gif\"/></font>"; // TODO A FAIRE AU PROPRE ET CSS ET ID DE NODE VALEUR
	this.ddnode= document.createElement('dd'); 
	this.ddnode.innerHTML=
"<strong>4'40</strong><font size=\"1\" color=\"#444444\"> 21h38</font> &lt;"+
"<strong>5'55</strong><font size=\"1\" color=\"#444444\"> 21h39</font> &lt;"+
"<strong>6'05</strong><font size=\"1\" color=\"#444444\"> 21h39</font> &lt;"+
"<strong>8'30</strong><font size=\"1\" color=\"#444444\"> 21h41</font> &lt;"+
"<strong>12'30</strong><font size=\"1\" color=\"#444444\"> 21h45</font> [DEMO]"; // TODO A FAIRE AU PROPRE ET CSS ET ID DE NODE VALEUR
}

JaugeBanque.install = function() {
	// PAS DE this ICI
	if( $(JaugeBanque.nodeId) != null ) { //EDIT// impératif: tester si l'ajout est déjà installé.
		GM_log("JaugeBanque: bidule déjà là"); //DEBUG
		return false;
	}
	var GS= $('generic_section');
	if ( GS == null ) {
		GM_log("JaugeBanque: generic_section non trouvée"); //DEBUG
		return false;
	}
	var dlnode= $xpath("//div[@class='cityBank']/dl", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	if ( dlnode == null ) {
		GM_log("JaugeBanque: balise dl non trouvée"); //DEBUG
		return false;
	}
	if ( JaugeBanque.dtnode == null )
		JaugeBanque.build();
	dlnode.appendChild(JaugeBanque.dtnode);
	dlnode.appendChild(JaugeBanque.ddnode);
}

JaugeBanque.init = function() {
	ModMan.RegMod(this); 
	ModMan.RegPlug(this,'BNQU', this.install); 
}

JaugeBanque.init();

