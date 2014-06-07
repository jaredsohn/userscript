// Module exemple de démonstration pour un script Greasemonkey particulier.


// ==UserScript==
// @name          Demo (module)
// @namespace     D-
// @description   Module de demo
// @include       http://dummy/*
// ==/UserScript==

// Auteur: bluflonalgul

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

/////////////////////////////////////////////////////////////////////////////
// Module bidon de démonstration.
// sert d'inspiration pour en faire d'autres.
// en plus du nom du module, les lignes à modifier sont signalées par //EDIT//
var DummyModule = {  
  mcode: "Dummy", //EDIT// code (nom court) du module. Propriété 'mcode' obligatoire!
  nodeId: "DummyId", //EDIT// identifiant DOM pour le bidule à insérer, penser à en mettre un unique (le changer)
  label: "Module Demo", //EDIT// libellé du module dans la liste
  options: { // diverses options facultatives
    htmldesc: "Module bidon de démonstration. Voir les onglets de forum.",
    credits: "Bluflonalgul.",
  },
}

DummyModule.init = function() {
  ModMan.RegMod(this);
  ModMan.RegPlug(this,'FRUM', this.install); //EDIT// c'est ici qu'on indique les pages où il doit se charger.
}

DummyModule.install = function() {
  // PAS DE this ICI
  //alert('Installation de '+DummyModule.mcode); // DEMO
  if( $(DummyModule.nodeId) != null ) { //EDIT// impératif: tester si l'ajout est déjà installé.
    //GM_log("DummyModule: bidule déjà là"); //DEBUG
    return false;
  }
  var MF= $('saloon_menu');
  if ( MF == null ) {
    GM_log("DummyModule: Menu Forum non trouvé"); //DEBUG
    return false;
  }
  var node= document.createElement('li'); // éventuellement fait dans un init2 qui est appelé lors du premier install.
  // idéalement construire les élément, pour faire cours ici: fait avec innerHTML
  node.innerHTML= "<a href=\"#saloon\" onclick=\"alert('Module de démonstration. A vous de coder! :)'); return false;\"> Demo</a>";
  node.id=DummyModule.nodeId;
  MF.appendChild(node);
}

DummyModule.init();

