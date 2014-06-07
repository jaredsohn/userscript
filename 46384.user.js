// Module de vérification de version pour un script Greasemonkey particulier.


// ==UserScript==
// @name          VeriVersion (module)
// @namespace     D-
// @description   Module de vérification de version
// @include       http://dummy/*
// ==/UserScript==

// Auteur: Bluflonalgul

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html


// http://userscripts.org/scripts/review/26062

/////////////////////////////////////////////////////////////////////////////
// Module de vérification de version

var VeriVersion = {  
  mcode: "veriversion", // code (nom court) du module. Propriété 'mcode' obligatoire!
  nodeId: "VeriVersionId", // identifiant DOM pour le bidule à insérer, penser à en mettre un unique
  label: "Vérifier Version", // libellé du module pour la liste
  options: {
    hide: true, // caché
    //icon: "XXXurl_iconXXX", // choix d'icone
    //htmldesc: "XXX XXX XXX", // description plus longue
    //credits: "XXXvotreNomXXX et autres participants", // penser à créditer les auteurs et aides
  },
  VERSIONPAR: 'veriversion_mainver', // dernière version constatée sur site (pas la version courante qu'on ne connait pas)
  LASTCHECKPAR: 'veriversion_lastcheck', // minutes de date
  checkdelay: 60, // 60 minutes, 1 vérif par heure. // 1 minute pour les tests
}

VeriVersion.curMinutes = function() {
  var date_jour=new Date();
  return Math.round(date_jour.getTime()/60000);
}

VeriVersion.LastCheck = function() {
  return GM_getValue(this.LASTCHECKPAR, 0);
}

VeriVersion.Checked = function() {
  GM_setValue(this.LASTCHECKPAR, this.curMinutes());
}

VeriVersion.InitialMainVersion = function() {
  return GM_getValue(this.VERSIONPAR, 0); // convention: 0, jamais initialisé, donc installation toute fraîche à priori.
}

VeriVersion.setMainVersion = function(ver) {
  //GM_log("VeriVersion.setMainVersion: type de ver: "+typeof(ver)); // DEBUG
  //GM_log("VeriVersion.setMainVersion: ver= "+ver); // DEBUG
  GM_setValue(this.VERSIONPAR, ver); 
}

VeriVersion.FetchOnlineMainVersion = function(id,signal) {
  var params= {
    url:  'http://userscripts.org/scripts/source/'+id+'.meta.js',
    method: 'GET',
    onload: function(resp) { VeriVersion.CheckCallBack(resp,signal); }, // closure sur signal.
    }
  //GM_log("VeriVersion.FetchOnlineMainVersion: appel GM http..."); // DEBUG
  GM_xmlhttpRequest(params); 
}

VeriVersion.QuickCheck = function(signal) { // mettre true sinon fait juste la mise à jour des date & version
  //GM_log("VeriVersion.QuickCheck: début..."); // DEBUG
  if ( this.curMinutes() <= this.LastCheck() + this.checkdelay ) {
    //GM_log("VeriVersion.QuickCheck: Pas le moment."); // DEBUG
    return false;
  }
  this.FetchOnlineMainVersion(DGM_SELF_ID,signal);
}

VeriVersion.CheckCallBack = function(resp,signal) {
  // PAS DE this ICI
  //GM_log("VeriVersion.CheckCallBack: début..."); // DEBUG
  if ( resp.status != 200 ) {
    GM_log("VeriVersion.CheckCallBack: code retour: "+resp.status); // DEBUG
    return false;
  }
  try {
    var curver= resp.responseText.match(/\@uso\:version\s+(\d+)/)[1];
    //GM_log("VeriVersion.CheckCallBack: type de curver: "+typeof(curver)); // DEBUG
    if ( signal && ( curver > VeriVersion.InitialMainVersion() ) ) { // nouveauté à signaler
      //TODO fonction de signalement au lieu d'un alert.
      alert("Nouvelle version disponible pour les modules. Voir l'aide.");
    }else{
      //GM_log("VeriVersion.CheckCallBack: pas de nouvelle version."); // DEBUG
    }
    VeriVersion.setMainVersion(curver);
    VeriVersion.Checked();
  }
  catch(e) {
    GM_log("VeriVersion.CheckCallBack: exception:"+e.toString()); // DEBUG
  }
}

VeriVersion.trigger = function() { 
  // PAS DE this ICI
  // DGM_SELF_ID est une constante éventuellement positionnée par le script maître, c'est son n° sur userscripts
  if ( typeof(DGM_SELF_ID) != 'number' ) {
    return false; // rien à faire si pas d'identifiant userscripts
  }
  VeriVersion.QuickCheck( VeriVersion.InitialMainVersion() != 0 ); // booléen: faux si version à 0, càd jamais initialisé, dans ce cas on ne signale rien.
}

VeriVersion.init = function() {
  //GM_log('VeriVersion.init: début...'); //DEBUG
  //GM_log('VeriVersion.init: DGM_SELF_ID de type '+typeof(DGM_SELF_ID) ); //DEBUG
  ModMan.RegMod(this); // inscription du module
  ModMan.RegPlug(this,'TOUT', this.trigger); //  c'est ici qu'on indique les pages où il doit se charger (un seul code de page à la fois)
}

VeriVersion.init();

