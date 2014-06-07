// Module qui masque un pseudo sur le forum ville, pour un script Greasemonkey particulier.


// ==UserScript==
// @name          PariaForum (module)
// @namespace     D-
// @description   Permet d'exclure un pseudo du forum de ville (option en cliquant le nom).
// @include       http://dummy/*
// ==/UserScript==

// dépend de pariaforum.css

// Auteur: Bluflonalgul
// v 1.0
// TP1

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

/////////////////////////////////////////////////////////////////////////////
// Module qui permet d'exclure un pseudo du forum de ville (option en cliquant le nom).

var PariaForum = {  
  mcode: "pariaforum", // code (nom court) du module. Propriété 'mcode' obligatoire!
  nodeId: "PariaForumId", // identifiant DOM pour le bidule à insérer, penser à en mettre un unique
  label: "Paria de Forum", // libellé du module pour la liste
  options: {
    icon: "gfx/forum/smiley/h_ban.gif", // icone banni
    htmldesc: "Exclure un pseudo du forum de ville (option en cliquant le nom).", 
    credits: "Code de Bluflonalgul, suivant une idée de nombreux joueurs.",
  },
   PARIAVARNAME: "pariaforumlist", // nom de paramètre GM persistant pour la liste des parias
  allParias: {}, // liste des parias, chargés
}

PariaForum.modmanToggle = function(active) {
  // PAS DE this ICI
  if ( ! active ) {
    PariaForum.removeToggleNode();
  }
  PariaForum.syncThread(active);
}

PariaForum.removeToggleNode = function() {
  var oldnode= $(this.nodeId);
  if ( oldnode != null ) {// déjà installé une fois dans la userBox
    oldnode.parentNode.removeChild(oldnode);//Retirer l'ancien noeud, plus simple. (sinon contenu et event à changer)
  }
}

PariaForum.addToggleBox = function(name) { // ajoute l'élément à installer
  // PAS DE this ICI
  PariaForum.removeToggleNode(); // plus simple : retirer avant d'ajouter.
  var prevNode= $('userBoxMail');
  if ( prevNode == undefined ) {
    GM_log("PariaForum.addCheckBox: userBoxMail non trouvé !");// DEBUG
    return false;
  }
  var data= PariaForum.isParia(name)? // opérateur ternaire
    ["L'écouter au forum","gfx/forum/smiley/h_calim.gif",PariaForum.ecouter]:
    ["L'ignorer au forum","gfx/forum/smiley/h_rage.gif",PariaForum.ignorer];
    
  var node= document.createElement('a');
  node.id= PariaForum.nodeId;
  node.className= "action";
  node.href= "#";
  node.innerHTML= "<img alt=\"\" src=\""+data[1]+"\"/>"+data[0]; // url icone et texte
  
  node.addEventListener('click', function(evt) { // attention à la closure ici
    evt.preventDefault();
    data[2](name); // PariaForum.ecouter ou PariaForum.ignorer
  }, false);
  prevNode.parentNode.insertBefore(node,prevNode.nextSibling); // inséré à la suite de prevNode ("lui écrire")
}

PariaForum.syncThread = function(checkparia) { // met à jour les classes des messages pour les parias ou pas parias
  // PAS DE this ICI
  if ( checkparia == undefined ) // cas général
    checkparia=true; // cas général, on cherche qui est paria ou non, donc oui vérifier
  var GS= $('generic_section');
  if ( GS == null ) {
    GM_log("PariaForum.syncThread: pas de generic_section"); //Avertissement
    return false; // TODO avertir
  }
  var thread= $xpath('div[@class="thread"]', GS,   XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
  if ( thread == null ) {
    GM_log("PariaForum.syncThread: pas de thread"); //Avertissement
    return false; // TODO avertir
  }

  var clattr,infos,content,auteur,paria;
  var elem= thread.firstChild;
  //GM_log("PariaForum.syncThread: avant while"); //DEBUG
  while ( elem ) { // NOTE: pour ce while ç'a été dur, les itérator pas bon, les autres trucs qui passaient pas, etc, d'où ce code.
    //GM_log("PariaForum.syncThread: elem next="+elem.toString()); //DEBUG
    if ( elem.getAttribute != undefined ) {
      clattr= elem.getAttribute("class");
      if ( clattr != null && clattr.match(/message/)) {
        infos= $xpath('div[@class="infos" or @class="infos fparia"]', elem,   XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
        // TODO test ok
        //GM_log("PariaForum.syncThread: infos."); //DEBUG
        auteur= $xpath('div[@class="author"]/a[@class="userLink"]', infos,   XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
        if ( auteur == null ) {
          elem= elem.nextSibling;
          continue;
        }
        //GM_log("PariaForum.syncThread: auteur1=\n"+auteur.innerHTML); //DEBUG
        auteur= GenTools.trimSpace(auteur.innerHTML);
        //GM_log("PariaForum.syncThread: Traitement de '"+auteur+"'"); //DEBUG
        content= $xpath('div[@class="content" or @class="content fparia"]', elem,   XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
        //GM_log("PariaForum.syncThread: content ."); //DEBUG
        // TODO test ok

        // la partie intéressante c'est là.
        paria= PariaForum.isParia(auteur) && checkparia;
        infos.setAttribute( 'class', paria?'infos fparia':'infos' ); // opérateur ternaire
        content.setAttribute( 'class',paria?'content fparia':'content' );// opérateur ternaire
        // TODO double clic pour voir le paria
      }
    }
    elem= elem.nextSibling;
  }
  /* MARCHE PAS CAR ON CHANGE LE NOEUD
  var allMessages= $xpath("//div[@class='thread']/div[@class='message']", document, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
  if ( allMessages == null ) // à vérifier: le test
    return false; // ajouter warning ?
  
  var infos,content,auteur;
  var msg= allMessages.iterateNext(); // init boucle
  while ( msg != null ) {
    infos= $xpath('div[@class="infos"]', msg,   XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
    auteur= $xpath('//a[@class="userLink"]', infos,   XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
    auteur= GenTools.trimSpace(auteur.innerHTML);
    GM_log("PariaForum.syncThread: Traitement de '"+auteur+"'"); //DEBUG
    infos.setAttribute( // la partie intéressante c'est là.
      'class',
      PariaForum.isParia(auteur)? // opérateur ternaire
        'infos fparia':
        'infos'
      );
    // TODO le reste  
    msg= allMessages.iterateNext(); // itération de boucle 
  }*/
}
PariaForum.isParia = function(name) { 
  return ( name in this.allParias );
}

PariaForum.ignorer = function(name) { 
  // PAS DE this ICI
  PariaForum.allParias[name]= null; // seule la clé compte // du coup pas de doublons...
  PariaForum.saveParia();
  PariaForum.syncThread();
  window.wrappedJSObject.js.UserBox.hide();
}

PariaForum.ecouter = function(name) { 
  // PAS DE this ICI
  //GM_log("PariaForum.ecouter: 1"); //DEBUG
  delete PariaForum.allParias[name];
  //GM_log("PariaForum.ecouter: 2"); //DEBUG
  PariaForum.saveParia();
  //GM_log("PariaForum.ecouter: 3"); //DEBUG
  PariaForum.syncThread();
  //GM_log("PariaForum.ecouter: 4"); //DEBUG
  window.wrappedJSObject.js.UserBox.hide();
  //GM_log("PariaForum.ecouter: 5"); //DEBUG
}

PariaForum.saveParia = function() {
  var str= "";
  var sep= "";
  for ( var key in this.allParias) {
    str+= sep + key;
    sep=';';
  }
  GM_setValue(this.PARIAVARNAME, str);
}

PariaForum.loadParia = function() {
  var liste= GM_getValue(this.PARIAVARNAME, "").split(';');
  for ( i=0; i<liste.length; i++ ) {
    if ( liste[i] != "" ) // =="" cas du 1er je crois, si liste vide
      this.allParias[liste[i]]= null; // seule la clé compte // du coup pas de doublons...
  }
}

PariaForum.init = function() {
  this.options.togglefn= this.modmanToggle; // changement d'état d'activation depuis modman.
  ModMan.RegMod(this); // inscription du module
  // OU BIEN: ModMan.RegMod(this,"PariaForum", {icon: this.icon}); // libellé du module
  ModMan.RegPlug(this,'FVSJ', this.syncThread); //  c'est ici qu'on indique les pages où il doit se charger (un seul code de page à la fois)
  GenTools.addManyStyles( GM_getResourceText("pariaforumcss"));
  this.loadParia();
  // branchement
  if( typeof(window.wrappedJSObject.js) != 'undefined' ) {
    window.wrappedJSObject.js.UserBox._dgm_show = window.wrappedJSObject.js.UserBox.show;
    window.wrappedJSObject.js.UserBox.show = function(obj,id,name,avatar,about,urle) {
      window.wrappedJSObject.js.UserBox._dgm_show(obj,id,name,avatar,about,urle);
      if ( ModMan.isEnabledWrappedCall( PariaForum.mcode ) )
        PariaForum.addToggleBox(name);
    }
  }
}

PariaForum.init();

