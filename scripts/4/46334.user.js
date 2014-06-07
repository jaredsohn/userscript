// Ceci n'est pas vraiment un script Greasemonkey .

// ==UserScript==
// @name          GenTools
// @namespace     D-
// @description   Outils GenTools
// @include       http://dummy/*
// ==/UserScript==

// Auteur bluflonalgul 2008-11 2009-03

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

// version 1.3
// TP1

var GenTools = { // jeu d'outils génériques non spécifiques
  styleSheet: null, // node de feuille de style globale
}

GenTools.getsk = function() {  return 
HorTools.getsk(); }

GenTools.mange_blancs = function (txt){ // conservé pour compatibilité
  return this.trimSpace(txt);
}
GenTools.trimSpace = function (str) { // pour remplacer mange_blancs:
   // piqué ici: http://blog.stevenlevithan.com/archives/faster-trim-javascript
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

GenTools.addStyle = function(rule) { // issu de HMUpdater, appelé par addManyStyle
  if( this.styleSheet == null ) {
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].appendChild(style);
    this.styleSheet = style.sheet;
  }
  
  try {
    return this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length);
  }
  catch(e) {
   GM_log("GenTools.addStyle: exception levée par insertRule");
   return -1;
  }
};

GenTools.addManyStyles = function(rules) { //dgm/ pour intégrer un fichier css en ressource
  // format en entrée: données du fichier css, ensemble de règles, ou format comme dans stylish.
  rules= rules.replace(/\s+/g," "); // remplace les fins de lignes ou toute suite caractère d'espacement par un espace. 
  expcom = new RegExp("/\\*.*?\\*/","g"); // enlève les commentaires /* */
  rules= rules.replace(expcom,"");
  rules= rules.replace(/ +}/g,'}');
  if ( /}}/.test(rules) ) { // format stylish: extraire...
    //GM_log("addManyStyles: format stylish!"); return false;// DEBUG
    rules= rules.substring( rules.indexOf('{')+1 , rules.lastIndexOf('}'));
  }
  //GM_log("addManyStyles: var rules:\n"+rules); // DEBUG
  var allrules= rules.split('}'); // du coup on perd le '}', faudra le rajouter

  for ( var i=0; i<allrules.length-1; i++) { // on s'arrête à l'avant-dernier élément car le dernier '}' n'annonce pas une autre règle.
    //GM_log("addManyStyles: \n"+allrules[i]); // DEBUG
    this.addStyle(allrules[i]+'}');
  }
}


GenTools.closeNotif = function() { return 
HorTools.closeNotif(); }

GenTools.pa_disponible = function (){ return HorTools.pa_disponible();}

GenTools.get_etats = function(){ return 
HorTools.get_etats(); }

GenTools.objets_sac = function(){ return 
HorTools.objets_sac();}

GenTools.objets_sac_hash = function(){ return HorTools.objets_sac_hash();}
GenTools.liste_sac = function(){ return 
HorTools.liste_sac(); }

GenTools.freeSlot= function (){ return 
HorTools.freeSlot(); }
GenTools.get_id_objet = function (obj){ return HorTools.get_id_objet(obj); }

GenTools.liste_prenable_terre = function(){ return  HorTools.liste_prenable_terre();}

GenTools.get_actions= function(){ return
HorTools.get_actions(); }

GenTools.getLayoutClass = function (){ return HorTools.getLayoutClass();}

GenTools.isAtGates = function (){return
HorTools.isAtGates ();}


GenTools.getCrossGatesBtn = function (){ return HorTools.getCrossGatesBtn(); }


GenTools.httpGet= function(url) { return 
HorTools.httpGet(url); }

GenTools.removeNodeId = function (nodeId) {
  if (nodeId==undefined )
    return false; // devrait pas arriver mais ne me gêne pas.
  var mainNode = $(nodeId);
  if( mainNode == null ) {
    GM_log("GenTools.removeNodeId: pas de "+nodeId); //DEBUG
    return false;
  }
  mainNode.parentNode.removeChild(mainNode);
}

GenTools.removeNodeClass = function (nodeType, nodeClass) {
  if (nodeType==undefined )
    return false; // devrait pas arriver mais ne me gêne pas.
  if (nodeClass==undefined )
    return false; // devrait pas arriver mais ne me gêne pas.
  //var nodes = $xpath("//[@class='"+nodeClass+"']", document,XPathResult.UNORDERED_NODE_TYPE); //BUG! pas la bonne expression...
  //GM_log("GenTools.removeNodeClass: snap... "+nodeType+" "+nodeClass); // DEBUG
  var nodesSnap = $xpath("//"+nodeType+"[@class='"+nodeClass+"']", document,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
   
   if( nodesSnap == null ) {
    GM_log("GenTools.removeNodeClass: pas de noeud "+nodeType+" "+nodeClass); //INFO
    return false;
  }
  var node;

  //GM_log("GenTools.removeNodeClass: for ..."); // DEBUG

  for ( var i=0; i < nodesSnap.snapshotLength ; i++ ) {
    //GM_log("GenTools.removeNodeClass: i="+i); // DEBUG
    node= nodesSnap.snapshotItem(i);
    node.parentNode.removeChild(node);
  }
  return false;
}

GenTools.removeNodeTag = function (nodeTag) { // supprime tous les noeud du type passé (exemple: "script" pour tous les <script>)
  if (nodeTag==undefined )
    return false; // devrait pas arriver mais ne me gêne pas.
  var nodesSnap = $xpath("//"+nodeTag, document,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
   
  if( nodesSnap == null ) {
    GM_log("GenTools.removeNodeTag: pas de noeud "+nodeTag); //INFO
    return false;
  }
  var node;

  //GM_log("GenTools.removeNodeTag: for ..."); // DEBUG

  for ( var i=0; i < nodesSnap.snapshotLength ; i++ ) {
    GM_log("GenTools.removeNodeTag: i="+i); // DEBUG
    node= nodesSnap.snapshotItem(i);
    node.parentNode.removeChild(node);
  }
  return false;
  
}


GenTools.getCurrentDiscuNo= function() {return HorTools.getCurrentDiscuNo(); }


