// Module de recherche d'âme pour un script Greasemonkey particulier.


// ==UserScript==
// @name          CherchAme (module)
// @namespace     D-
// @description   Une case de recherche d'âme partout.
// @include       http://dummy/*
// ==/UserScript==

// Auteur: Bluflonalgul

// v1.0
// TP1

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html


/////////////////////////////////////////////////////////////////////////////
// Module qui propose une case de recherche d'âme partout.

// TODO : cheztilo.../dgm/ame.php
// caractères jocker

var CherchAme = {  
  mcode: "cherchame", // code (nom court) du module. Propriété 'mcode' obligatoire!
  nodeId: "CherchAmeId", // identifiant DOM pour le bidule à insérer, penser à en mettre un unique
  label: "Cherche Ame", // libellé du module pour la liste
  options: {
    icon: "gfx/forum/smiley/h_ghost.gif", // âme bleue
    htmldesc: "Une case de recherche d'âme partout. Voir sous le bouton d'âme.", 
    credits: "Bluflonalgul", 
  },
  classdiv: "cherchame", // classe du div contenant la form
}

CherchAme.init = function() {
  ModMan.RegMod(this); // inscription du module
  ModMan.RegPlug(this,'LOGD', this.install); //  c'est ici qu'on indique les pages où il doit se charger (un seul code de page à la fois)
  window.wrappedJSObject.js.CherchAme_submited= CherchAme.submited; // en test, pour permettre l'appel depuis le js en ligne du submit.
  CherchAme.css();
}
CherchAme.css = function() {
  GenTools.addStyle("div.cherchame{top:175px;margin-left:285px;position:absolute;z-index:3;}");
  GenTools.addStyle("div.cherchame form {width:auto !important;background-color:transparent !important;}");
  GenTools.addStyle("div.cherchame input {display: none !important;}");
  GenTools.addStyle("div.cherchame:hover input,div.cherchame input:focus {display: inline !important;}");
/*
  GenTools.addStyle("div.cherchame{top:55px;margin-left:710px;position:absolute;z-index:4;}");
  GenTools.addStyle("div.cherchame form {width:200px !important;}");
*/
}

CherchAme.makeFormNode = function() { // retourne l'élément de recherche à installer
  var node= document.createElement('div');
  node.id= this.nodeId;
  node.className= this.classdiv;
  node.innerHTML=
"<form onsubmit=\"js.CherchAme_submited(this); js.XmlHttp.post('ghost/search?sk="+GenTools.getsk()+"',this); return false;\" class=\"form\">"+
"<img alt=\"\" src=\"gfx/forum/smiley/h_ghost.gif\"/> "+
"<input type=\"text\" value=\"\" class=\"field\" name=\"name\" maxlength=\"20\""+ "id=\"destField\"/>"+
"</form>";
/*
"<form onsubmit=\"js.CherchAme_submited(this); js.XmlHttp.post('ghost/search?sk="+GenTools.getsk()+"',this); return false;\" class=\"form\">"+
"<label for=\"destField\">Nom de l'âme :</label> <input type=\"text\" value=\"\" class=\"field\" name=\"name\" maxlength=\"20\""+ "id=\"destField\"/>"+
"<input type=\"submit\" tabindex=\"1\" value=\"Sonder les abysses de la mort\" name=\"submit\" class=\"button\"/>"+
"</form>";
*/
  return node;
}

CherchAme.submited = function(that) { // that est le this de la form soumise, d'où il est appelé. (ne sert pas actuellement)
  // PAS DE this ICI
  //GM_log("CherchAme.submited: début");
  // Important: changer le focus...
  var elem= $xpath("//div[@id='gameBodyLight']//a", document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // un quelconque élément "a"
  elem.focus(); // en test
  // TODO: récupérer le pagecode de pageDiag pour éviter replaceGBL dans ce cas:
  //var toreset= ('LAME' in pagecodes ? 'false' : 'true' );
  CherchAme.replaceGBL();
  HorTools.showLoading(); // après le replace car le loading section est remplacé dans GBL...
}

CherchAme.replaceGBL = function() { // pour remplacer le contenu de gameBodyLight
  var content=
"<div id=\"loading_section\" style=\"display: none;\"><img alt=\"[icon]\" src=\"http://data.hordes.fr/gfx/design/loading.gif\"/>"+
"<img alt=\"Loading...\" src=\"http://data.hordes.fr/gfx/design/loadingLabel.gif\"/></div>"+
"<a onclick=\"js.Js.reboot(); return false;\" href=\"#\" id=\"backReboot\">Retour au site</a> "+
"<div class=\"ghost\"><div class=\"gblock\"><div class=\"header\"><div class=\"footer\">"+
"<table class=\"ghostLayout\"><tbody><tr><td class=\"leftPanel\">"+
"<div id=\"ghost_pages\"></div>"+
"<div class=\"clear\"/></td><td class=\"rightPanel\">"+
"<div id=\"ghostImg\"></div>"+
"</td></tr></tbody></table></div></div></div></div>";
  var GBL= $('gameBodyLight');
  if (GBL) {
    GBL.innerHTML= content; // en test car des doc indiquent que dans ce cas les identifiants id= ne sont pas forcément répertoriés dans le DOM
  }else{
    GM_log("CherchAme.replaceGBL: gameBodyLight non trouvé !"); // Avertissement
  }
}

CherchAme.install = function(pc) { // installe un élément
  // PAS DE this ICI
  var stddiv= $xpath("//div[@class='footSearch']", document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  if ( stddiv ) { // enlever la recherche standard pour éviter des id en double, on ne sait jamais...
    stddiv.parentNode.removeChild(stddiv);
  }
  var node=$(CherchAme.nodeId);
  if( node ) { // impératif: tester si l'ajout est déjà installé.
    //GM_log("CherchAme.install: bidule déjà là"); //DEBUG
    var saisie= $('destField'); // logiquement présent
    saisie.value="";// vider la zone de saisie
    return false; // ne rien faire d'autre
  }

  // Installation:
  $('content').appendChild(CherchAme.makeFormNode(pc));
}

CherchAme.init();

