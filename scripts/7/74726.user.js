// Module Ajoute une fonction d'Anti-AntiFlood


// ==UserScript==
// @name          Anti-AntiFlood (module)
// @namespace    D-
// @description  Permet le contournement de la fonction d'antiflood
// @include      http://dummy/*
// ==/UserScript==
// $Id: aaflood.module.js 150 2009-09-15 06:49:09Z bluflonalgul $

// Auteur: Shuny
// Merci à Bluflonalgul et SirVek pour leurs aides respectives.

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

/////////////////////////////////////////////////////////////////////////////
// Module Permet le contournement de la fonction d'antiflood

var aaflood = { 
  mcode: "aaflood", // code (nom court) du module. Propriété 'mcode' obligatoire!
  nodeId: "aafloodId", // identifiant DOM pour le bidule à insérer, penser à en mettre un unique
  label: "Anti-AntiFlood", // libellé du module pour la liste
  options: {
    icon: "gfx/forum/smiley/h_chat.gif", // choix d'icone
    htmldesc: "Permet le contournement de la fonction d'antiflood", // description plus longue
    credits: "Shuny", // penser à créditer les auteurs et aides
		group: "Forum",
  },
}

aaflood.init = function() {
  ModMan.RegMod(this); // inscription du module
  ModMan.RegPlug(this,'FXEC', this.install); //  c'est ici qu'on indique les pages où il doit se charger (un seul code de page à la fois)
}

aaflood.install = function() {

  // PAS DE this ICI
  if( $(aaflood.nodeId) != null ) { // impératif: tester si l'ajout est déjà installé.
    return false;
  }

  // Installation:
  aaflood.submit = $xpath("//input[@type='submit']", document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  if (!aaflood.submit) {
    GM_log("AAFlood.install: submit non trouvé!"); // Avertissement
    return false;
  }
  aaflood.activer = document.createElement('div');
  aaflood.activer.id = aaflood.nodeId;
  aaflood.activer.className = 'check';
  aaflood.activer.innerHTML = '<input name="checkAAFlood" id="checkAAFlood" checked="checked" value="1" type="checkbox">&nbsp;<label for="checkAAFlood">Activer l\'Anti-Antiflood</label></div>';
  aaflood.submit.parentNode.insertBefore(aaflood.activer, aaflood.submit);
  aaflood.submit.addEventListener('click', function() { aaflood.active(); }, false);
}

aaflood.active = function() {
   
   // Si l'utilisateur n'a pas souhaité utiliser l'Anti-Antiflood, il n'y a aucune raison de lui imposer.
   if ($('checkAAFlood').checked == false) {
      
      return false;
   
   }
   
   aaflood.textarea = $xpath("//textarea[@name='ed_forum_content']", document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
   aaflood.codesRP=new RegExp("(\\[d4\\])|(\\[d6\\])|(\\[d8\\])|(\\[d10\\])|(\\[d12\\])|(\\[d20\\])|(\\[d100\\])|(\\[pfc\\])|(\\[pf\\])|(\\[carte\\])","gi");
   aaflood.codesRPdansTextArea = aaflood.textarea.value.match(aaflood.codesRP);
   aaflood.contenuSansCodesRP = aaflood.textarea.value.replace(aaflood.codesRP, '');
   aaflood.contenuSansCodesRPniEspaces = aaflood.contenuSansCodesRP.replace(new RegExp(' ', 'gi'), '');   
   
   if(aaflood.contenuSansCodesRPniEspaces.length < 3) {
   
      aaflood.textarea.value += '[g][/g]';
      
   }
   
   if(aaflood.codesRPdansTextArea == null) {
   
      // GM_log('aaflood.active : Aucune balise RP.');
      return false;
   
   }
   
   else if(aaflood.codesRPdansTextArea.length <= 8) {
   
      // GM_log('aaflood.active : Il y a des balises RP mais pas assez pour déclencher une protection antiflood.');
      return false;
      
   }
   
   aaflood.codesRPenSurplus = aaflood.codesRPdansTextArea.length - 8;
   aaflood.nombreBalisesAAjouter = Math.ceil((((105+(10*aaflood.codesRPenSurplus)) - aaflood.contenuSansCodesRPniEspaces.length)/7));
   // GM_log('aaflood.active : Codes RP en surplus = '+aaflood.codesRPenSurplus);
   // GM_log('aaflood.active : Longueur du contenu sans balises RP = '+aaflood.contenuSansCodesRPniEspaces.length);
   // Oui, les variables à rallonge ça donne des for à rallonge.
   for(aaflood.compteur = 0; aaflood.compteur < aaflood.nombreBalisesAAjouter; aaflood.compteur++) {
   
      aaflood.textarea.value += '[g][/g]';
   
   }
}

aaflood.init();
