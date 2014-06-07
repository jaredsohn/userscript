// Ceci n'est pas vraiment un script Greasemonkey.

// ==UserScript==
// @name          PageDiag
// @namespace     D-
// @description   Identification de page
// @include       http://dummy/*
// ==/UserScript==

// Auteur bluflonalgul 2009-03

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

// Dépendances:
// - fonctions raccourcis de misc.part.js

//v1.2
// TP1
//v1.3

///////////////////////////////////////////////
// Diagnostic de page: identifie la page par type et famille. Voir l'arbre de repérage avec les codes à 4 lettres.
var PageDiag = {
// variables globales à PageDiag (hou! le vilain)
//positionnées par la fonction principale avant les appels aux autres fonctions de détection
	GSnode: null, // noeud du div id=generic_section
	GS_childClass: null, // classe du "1er" fils de div generic_section (1ère balise fille)
	urlOnData: "", // url reçu par le js OnData
}

// pour étudier les pages: 
PageDiag.getIdsAndClasses= function(el,root) {
  // vu sur http://pastie.org/247537
  // id utiles à repérer mais non pertinents:
  var idbof={ gameBodyLight:null, gamebody:null, main:null, content:null, contentBg:null };
  //Ids non pertinents et inutiles:
  var idbofbof={sqlLog:null, footer:null, "haxe:trace":null, FlashMap:null, swfCont:null, loading_section:null, debug:null, anims:null, counter:null, tooltipContent:null, tooltip:null, banner:null, notificationText:null, notification:null,  cache:null, body:null, title:null};
  //ids pertinents: loggerContainer

  //Classes utiles à repérer mais non pertinentes:
  var clbof={ eventInfos:null, event:null, art:null };
  //Classes non pertinentes et inutiles
  var clbofbof={ clear:null, trace:null,  button:null, content:null, separator:null, inner:null, swf:null, drop:null, footer:null, header:null, dynamicTipCategoryHere:null, box:null, black:null, ieWarning:null};

  var d       = document,
      ids     = [],
      classes = [],
      known   = {},clz,
      EMPTY   = '',
      nodes,n,
      i,j;

    el = el || '*';
    if (typeof root === 'string') {
        root = d.getElementById(root);
    }
    if (!root || !root.getElementsByTagName) {
        root = d;
    }
    nodes = root.getElementsByTagName(el);
    i = nodes.length;
    while (i--) {
        n = nodes[i];
        if (n.id !== EMPTY && !(n.id in idbof) && !(n.id in idbofbof)) {
            ids.push(n.id);
        }
        if (n.className !== EMPTY) {
            clz = n.className.split(/\s+/);
            j = clz.length;
            while (j--) {
                known[clz[j]] = true;
            }
        }
    }
    i = 0;
    for (clz in known) {
        if (known.hasOwnProperty(clz) && !(clz in clbof) && !(clz in clbofbof)) {
            classes[i++] = clz;
        }
    }
    return { ids : ids, classes : classes };
}


PageDiag.isCitySaloonEnter = function (){ //FVAC// forum ville mais pas sur un sujet.
	var titre = $xpath("//div[@id='generic_section']/h2", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // .singleNodeValue finalement nécessaire...
	if ( titre==null )
    return false;
	return ( titre.innerHTML == "Règlement Forum Ville"); // Espérons qu'il n'y aura pas de pb avec l'accent
}
//<li menuid="saloon" class="selected">
//<div id="generic_section"><div class="thread"><h1>Sujet: « La Banque »</h1>
PageDiag.isCityTopic = function (){ //FVSJ// forum ville mais sur un sujet.
	var elem = $xpath("//li[@menuid='saloon' and @class='selected']", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // .singleNodeValue finalement nécessaire...
	if ( elem==null )
		return false;
	var titre = $xpath("//div[@id='generic_section']/div[@class='thread']//h1", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; 
	if ( titre==null )
		return false;
  return 	( titre.innerHTML.substr(0,7) == "Sujet: ");
}
//<div id="generic_section"><div class="editor">
PageDiag.isCityReply = function (){ //FVEC// forum ville mais écriture d'une réponse
	var elem = $xpath("//li[@menuid='saloon' and @class='selected']", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // .singleNodeValue finalement nécessaire...
	if ( elem==null )
		return false;
	var titre = $xpath("//div[@id='generic_section']/div[@class='editor']", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; 
	return ( titre!=null );
}
PageDiag.isWorldSaloonEnter = function (){ //FMAC// forum monde mais pas sur un sujet.
	var titre = $xpath("//div[@id='generic_section']/h2", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // .singleNodeValue finalement nécessaire...
	if ( titre==null )
    return false;
  // Règlement du forum Aide, Discussions // Règlement du forum Saloon // Règlement du forum Bugs
  var debtitre= "Règlement du forum ";
  return ( titre.innerHTML.substr(0,debtitre.length) == debtitre ); // Espérons qu'il n'y aura pas de pb avec l'accent
}
PageDiag.isWorldTopic = function (){ //FMSJ// forum monde mais sur un sujet.
	var elem = $xpath("//li[@menuid='saloon_world' and @class='selected']", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // .singleNodeValue finalement nécessaire...
	if ( elem==null )
		return false;
	var titre = $xpath("//div[@id='generic_section']/div[@class='thread']//h1", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; 
	if ( titre==null )
		return false;
  return 	( titre.innerHTML.substr(0,7) == "Sujet: ");
}
PageDiag.isWorldReply = function (){ //FMEC// forum monde mais écriture d'une réponse
	var elem = $xpath("//li[@menuid='saloon_world' and @class='selected']", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // .singleNodeValue finalement nécessaire...
	if ( elem==null )
		return false;
	var titre = $xpath("//div[@id='generic_section']/div[@class='editor']", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; 
	return ( titre!=null );
}

// "Historique de mes parties" => indique l'âme du joueur lui-même
PageDiag.isMySoul = function (){
  var contenu= $xpath("//div[@class='guser']/div[@class='right']/div[@class='tinyAction']/a[2]", document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  return ( contenu != null ); // à priori pas besoin de tester l'innerHTML, le 1er <a> étant toujours présent, ce 2e est là ssi âme joueur.
}

PageDiag.isSomeSoul = function (){ // une âme, autre que le joueur si MySoul traité avant.
  var contenu= $xpath("//div[@class='guser']", document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  return ( contenu != null );
}

PageDiag.isOldCity = function (){ // L'historique d'une ville: qui était dedans
  var contenu= $xpath("//div[@id='ghost_pages']/div[@class='ghistory']", document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  return ( contenu != null );
}


PageDiag.isAtGates = function (){ //TCTC// vrai si on est dehors, à la porte
	var titre = $xpath("//table[@id='gameLayout' and @class='outside']//h1", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // .singleNodeValue finalement nécessaire...
	if ( titre==null )
		return false;
	return ( titre.innerHTML == "Les Portes de la Ville");
}
PageDiag.isBank = function (){
  var contenu= $xpath("//div[@class='cityBank']", document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  return ( contenu != null );
}
PageDiag.isClosable = function () {
  var mainNode= $('generic_section');
  if ( mainNode == null ) {
    //GM_log("PageDiag.isClosable: pas de generic_section");//DEBUG
    return false;
  }
  var btn= $xpath('div[@class="door"]/div[@class="left"]/a[@class="button"]', mainNode,	XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
  //GM_log("PageDiag.isClosable: "+btn.toString()); // DEBUG
  if ( btn == null ) {
    //GM_log("PageDiag.isClosable: pas de bouton");//DEBUG
    return false;
  }
  if ( /Fermer les portes/.test(btn.innerHTML))
    return true;
  // TODO finir
}
PageDiag.isAttack = function (){
  var contenu= $('gameBodyLight');
  if ( contenu==null )
		return false;
  return ( /Impossible de se connecter/.test(contenu.innerHTML) ); 
}

PageDiag.isMaintenance = function (){
  var contenu= $('gamebody');
  if ( contenu==null )
		return false;
  return ( /Maintenance du Site/.test(contenu.innerHTML) ); 
}

PageDiag.isDead = function (){
  var contenu= $('gameBodyLight');
  if ( contenu==null )
		return false;
	return ( $xpath('div[@class="death"]', contenu,	XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue != null ); 
}

PageDiag.isRandom = function (){
  var contenu= $('ghost_pages');
  if ( contenu==null )
		return false;
	return ( $xpath('div[@class="maps"]/div[@class="random"]', contenu,	XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue != null ); 
}

PageDiag.isGazette = function () { // TODO a finir.
  var mainNode= $('generic_section');
  if ( mainNode == null ) {
    return false;
  }
  //
  if ($xpath('div[@class="article dayOne"]', mainNode,	XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue != null ){
    return true;
  }
  return false;
}

PageDiag.isCityHome = function () { 
  var mainNode= $('generic_section');
  if ( mainNode == null ) {
    return false;
  }
  return ($xpath('div[@class="cityHome"]', mainNode,	XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue != null );
}

PageDiag.isCitizens = function () { 
  var mainNode= $('generic_section');
  if ( mainNode == null ) {
    return false;
  }
  return ($xpath('div[@class="citizens"]', mainNode,	XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue != null );
}


PageDiag.checkLoad = function (){ // vérifie s'il y a des éléments pas encore chargés sur la page... hum?
  // Fonction utilisée lors de tests, pas en service maintenant.
  var check= {};
  var body= $xpath("//body", document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // TODO voir si y'a pas plus simple
  if ( body==null ) {
    GM_log("PageDiag.checkLoad: BUG: pas trouvé le body!"); // DEBUG?
  }
  if ( /XmlHttp.enqueue/.test(body.innerHTML) ) check.enqueue= null; // ou =true, peu importe, c'est la clé qu'on veut
  if ( /<!\[CDATA\[/.test(body.innerHTML) ) check.CDATA= null; 
  if ( /<load>/.test(body.innerHTML) ) check.LOAD= null; 
  //if ( /motion/.test(body.innerHTML) ) check.motion= null;  // DEBUG (ok: trouvé: motion)
  for ( var akey in check ) GM_log("PageDiag.checkLoad: key= "+akey); // DEBUG
  return check;
}

// Important, à optimiser:
PageDiag.varInit= function(){ 
  // ré-actualise à chaque appel PageDiag ce qui sert de variables globales partout ailleurs
  // pas très propre mais efficace et suffisant vu la taille de PageDiag ça reste lisible
  // TODO: généraliser l'emploi de certaines variables globales pour optimiser
  this.GSnode= $('generic_section');
  if ( this.GSnode != null ) {
    var GSCN= this.GSnode.firstChild; // premier GM Child Node
    while( GSCN != null && GSCN.nodeType != 1 ) { // 1=> Node.ELEMENT_NODE on cherche une balise après la section générique
      GM_log("PageDiag.varInit: this.GSnode Child de type: "+GSCN.nodeType); //DEBUG
      GSCN= GSCN.nextSibling;
    }
    if ( GSCN != null ) { // donc Node.ELEMENT_NODE
      GM_log("PageDiag.varInit: OK this.GSnode Child de type: "+GSCN.nodeType); //DEBUG
      this.GS_childClass= GSCN.getAttribute("class");
    }else{
      GM_log("PageDiag.varInit: this.GSnode.firstChild est null !"); //DEBUG
    }
  }else{
    GS_childClass= null;
  }
}

PageDiag.setUrlOnData= function(url) { // mémorise l'url nécessaire pour HMUpdater, pourrait servir à l'identification aussi. TODO à exploiter
  this.urlOnData= url;
}

PageDiag.lastUrlOnData= function(url) { //
  return this.urlOnData;
}


// Principale fonction qui teste la page et retourne un hash dont seules les clés sont testée avec un 'in'
PageDiag.getPageCode = function() {

  // ré-actualisations indispensable pour les fonctions: // TODO pas encore exploité, à voir quand pageDiag plus complet pour optimiser
  //this.varInit();
  //GM_log("PageDiag.getPageCode: GS_childClass= "+this.GS_childClass); //DEBUG

// TESTS:
//var result= this.getIdsAndClasses(); //DEBUG
//GM_log("PageDiag.getIdsAndClasses:\nIds= "+result.ids.join(", ")+"\nClasses= "+result.classes.join(", ")); //DEBUG


  // classer les tests par fréquence d'apparition des pages visitées

  if (this.isAtGates())         return { TCTC:null, HORS:null,            PLAY:null, LOGD:null, DISP:null, TOUT:null };//! à placer avant DSRT ou réviser DSRT
  if ( $('sideMap') != null )   return { DSRT:null, HORS:null,            PLAY:null, LOGD:null, DISP:null, TOUT:null };
  if (this.isCityTopic())       return { FVSJ:null, FOVI:null, FXSJ:null, FRUM:null, LOGD:null, DISP:null, TOUT:null };//TODO parfois FVAC quand shift reload sur FOVI
  if (this.isCityReply())       return { FVEC:null, FOVI:null, FXEC:null, FRUM:null, LOGD:null, DISP:null, TOUT:null };
  if (this.isCitySaloonEnter()) return { FVAC:null, FOVI:null, FXAC:null, FRUM:null, LOGD:null, DISP:null, TOUT:null };// FM après FV
  if (this.isWorldTopic())      return { FMSJ:null, FOMO:null, FXSJ:null, FRUM:null, LOGD:null, DISP:null, TOUT:null };
  if (this.isWorldReply())      return { FMEC:null, FOMO:null, FXEC:null, FRUM:null, LOGD:null, DISP:null, TOUT:null };
  if (this.isWorldSaloonEnter())return { FMAC:null, FOMO:null, FXAC:null, FRUM:null, LOGD:null, DISP:null, TOUT:null }; 
  //if ( $('cityBoard') != null ) return { VENS:null, CITY:null,            PLAY:null, LOGD:null, DISP:null, TOUT:null }; // il n'y a pas tjs le tableau ?
  if (this.isCityHome())        return { VENS:null, CITY:null,            PLAY:null, LOGD:null, DISP:null, TOUT:null };
  if (this.isCitizens())        return { ANNU:null, CITY:null,            PLAY:null, LOGD:null, DISP:null, TOUT:null };
  if (this.isBank())            return { BNQU:null, CITY:null,            PLAY:null, LOGD:null, DISP:null, TOUT:null }; 
  if (this.isMySoul())          return { MAME:null, LAME:null,            MENU:null, LOGD:null, DISP:null, TOUT:null };
  if (this.isSomeSoul())        return { OAME:null, LAME:null,            MENU:null, LOGD:null, DISP:null, TOUT:null };
  if (this.isOldCity())         return { VLLE:null,                       MENU:null, LOGD:null, DISP:null, TOUT:null };
  if (this.isGazette())         return { GAZT:null, CITY:null,            PLAY:null, LOGD:null, DISP:null, TOUT:null }; //TODO: finir
  if (this.isClosable())        return { FERM:null,                       PLAY:null, LOGD:null, DISP:null, TOUT:null };
  if ( $('logger') != null )    return { LGIN:null,                                             DISP:null, TOUT:null };
  if ( $('job#1') != null )     return { CMET:null,                                  LOGD:null, DISP:null, TOUT:null };
  if (this.isAttack() )	      	return { ATTQ:null,                                             NDSP:null, TOUT:null };
  if (this.isRandom() )         return { RAND:null,                       MENU:null, LOGD:null, DISP:null, TOUT:null }; // n'apparait pas après login parfois...
  if (this.isDead())            return { VMOR:null,                                  LOGD:null, DISP:null, TOUT:null };
  if (this.isMaintenance())     return { MTNC:null,                                             NDSP:null, TOUT:null };
  // dernière ligne:
  return { TOUT:null };
}

/***********************************************
TOUT . . . Toutes les pages /ok
+-- NDSP . . . Site Non Disponible #
|  +-- MTNC*. . . Maintenance #
|  +-- ATTQ*. . . Attaque de minuit /ok
|  +-- INCO . . . Autre/Page non repérée #
+-- DISP . . . Site disponible #
    +-- LGIN*. . . Non logué, page de login /ok
    +-- LOGD . . . Logué, authentifié #
        +-- AIDE . . . L'aide
        +-- MENU . . . Barre de menu de l'âme
        |  +-- RAND*. . . Réincarnation au hasard  /ok
        |  +-- CVIL*. . . Choix de ville (héros)
        |  +-- NEWS*. . . Les nouvelles
        |  +-- REGL*. . . Réglages
        |  +-- EVOL*. . . Evolutions
        |  +-- ECHL*. . . Echelle
        |  +-- ECRT*. . . Ecrits
        |  +-- COAL . . . Coalition
        |  |  +-- CONH*. . . Coa non héros #
        |  |  +-- COHE*. . . Coa héros  #
        |  +-- LAME . . . L'âme d'un joueur
        |  |  +-- MAME*. . . Mon âme /ok
        |  |  +-- OAME*. . . Autre âme #
        |  +-- VILL*. . . Habitants d'une ville passée #
        |  +-- COMV*. . . Mon historique et saisie commentaires de ville
        +-- FRUM . . . Forum
        |  +-- FOMO . . . Forum monde
        |  |  +-- FMAC*. . . Accueil FM /ok
        |  |  +-- FMSJ*. . . Lecture sujet FM /ok
        |  |  +-- FMEC*. . . Ecriture sujet FM /ok
        |  +-- FOVI . . . Forum ville
        |    +-- FVAC*. . . Accueil FV /ok
        |    +-- FVSJ*. . . Lecture sujet FV /ok
        |    +-- FVEC*. . . Ecriture sujet FV /ok
        +-- NPLY  Pas en jeu, transition
        |  +-- VMOR*. . . Validation de mort /ok
        |  +-- CMET . . . Choix du métier
        |      +-- MET1* Métier habitant (non héros) #
        |      +-- MET3* Métier spécialisé (héros)
        +-- JOUE En jeu, bandeau joueur
            +-- HORS . . . Dehors
            |   +-- TCTC*. . . Portes dehors toc!toc! ('en ville' si msg)  /ok
            |   +-- DSRT*. . . Dans le désert (distinct. bloqué, bât...?) /ok
            +-- CITY . . . En ville
                +-- GAZT*. . . Gazette en ville avec registre général
                +-- VENS*. . . Vue d'ensemble /ok
                +-- PUIT*. . . Le puits
                +-- BNQU*. . . La banque /ok
                +-- ANNU*. . . Annuaire citoyens #
                +-- CHTR*. . . Les chantiers
                +-- PROJ . . . Vote du projet (dist. voté/resultat/rien?)
                +-- TOUR . . . Tour de guet (dist. voté/resultat/rien?)
                +-- ATEL*. . . Atelier
                +-- SORT . . . Aux portes, en ville
                |  +-- EXPE . . .  Expéditions (? à développer ?)
                |  +-- PRTE . . . Manoeuvre de porte
                |      +-- OUVR*. . . Ouverture de porte #
                |      +-- FERM*. . . Fermeture de porte /ok
                |      +-- PTFA*. . . A la porte mais Fatigué
                +-- HOME . . . A la maison
                    +-- WELC*. . . Welcome
                    +-- MSGP . . . Messages privés (? à développer ?)
                    +-- AMNG*. . . Aménagements
                    +-- TRVX*. . . Travaux

Groupes /ok:

(FVAC ou FMAC) =>  FXAC . . . Accueil d'un des forum ville ou monde
(FVSJ ou FMSJ) =>  FXSJ . . . Lecture Sujet d'un des forum ville ou monde
(FVEC ou FMEC) =>  FXEC . . . Ecriture Sujet d'un des forum ville ou monde

***********************************************/
