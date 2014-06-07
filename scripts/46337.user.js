// Ceci est un module pour un script Greasemonkey particulier.

// ==UserScript==
// @name          ModMan
// @namespace     D-
// @description   Gestionnaire de modules
// @include       http://dummy/*
// ==/UserScript==

// Auteur bluflonalgul 2009-03 / 2009-04

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

// Dépendances:
// - fonctions raccourcis de misc.part.js
// - ressource modmancss
// - dispatcher aussi à cause du clic sur Modules

// v3.1
// TP1

///////////////////////////////////////////////
// Gestionnaire de modules
const DGM_ModMan_boxID = "modules";
const DGM_ModManHelp_boxID = "moduleshelp";

var ModMan = {
  mcode: "ModMan",
  label: "Module Manager",
  options: {
    hide: true,  
    credits: "Gestionnaire de modules: Bluflonalgul. Intégration hordes d'après HMUpdater.",
  },
  modules: new Array(), // tableau indice= ordre de déclaration, valeur= enregistrement avec "mc"=code module, "label" du module, "hide" true si caché
  callbacks: new Array(), // tableau indice= ordre de traitement (premier=0), valeur= enregistrement avec  "mc"= code module, "pc"= code page, "fn"= fonction,
  box: null, // un truc du genre des liens externes mais pour cocher les modules.
  helpbox: null, // boite d'info/aide/ etc
  modlinks: {}, // hash : key = mcode des modules, valeur = node <a> (pour ceux visibles)
  modlock: {}, // hash : ne sert que pour vérifier simplement si un code module est déjà utilisé (donc installé) et pour bloquer d'autres regplug (si true)
  modmanicon: "http://www.hordes.fr/gfx/forum/smiley/h_refine.gif", // icone marteau
  defmodicon: "http://data.hordes.fr/gfx/icons/item_electro.gif?v=4", // icone composant électronique
  visibleModCount: 0, // nombre de modules visibles, tenu à jour pendant les ModReg
  modcredits: new Array(), // liste des nodes de crédit pour cacher/afficher //TODO: pas utilisé , vérifier.
  BLINKPARNAME: "modman_blinkhelp",
  modEnabledCache: {}, // Copie des valeurs GM (module activé ou non), pour les appels venant d'éléments de page. Pas strictement à jour. clé: code module, valeur: vrai/faux // pour pariaforum
}

// Enregistrement du module, permettra sa désactivation
ModMan.RegMod = function(modself, noarg )   { // module, descriptif du module, caché (bool)
  if (noarg != undefined) {
    GM_log("ModMan.RegMod: l'appel doit se faire avec un seul argument: le module. Appel ignoré."); // Erreur d'appel à RegMod
    return 1;
  };
  var opt=modself.options; // A VOIR: ici c'est un clonage ou une référence ? Pas impactant dans notre cas mais à savoir.
  if ( opt == undefined ) opt= {};
  if (opt.hide == undefined) opt.hide=false; // par défaut non caché
  if (opt.icon == undefined) opt.icon=this.defmodicon;
  if (opt.htmldesc == undefined) opt.htmldesc="(sans description)"; 
  if (opt.credits ==  undefined) opt.credits="";
  
  if ( modself == undefined || typeof(modself.mcode) != "string" ||  typeof(modself.label) != "string" || typeof(opt.hide) != "boolean" || typeof(opt.icon) != "string" ) {
    GM_log("Erreur appel ModMan.RegMod: paramètres incorrects");// Erreur d'appel à RegMod
    return 1;
  }
  if ( typeof(this.modlock[modself.mcode]) == 'boolean' ) {
    GM_log("ModMan.RegMod: ATTENTION: "+modself.mcode+" déjà installé! Appel ignoré.");// Avertissement
    this.modlock[modself.mcode]= true; // déjà vu, ne rien brancher à ce nom
    return 2;
  }
  this.modlock[modself.mcode]=false; // pas déjà vu, mais on note son arrivée avec un booléen (testé au dessus)
  if (!opt.hide) this.visibleModCount++;
  this.modules[this.modules.length]={
    mc: modself.mcode,
    label: modself.label,
    desc: opt.htmldesc, // note: injection html largement possible ici, on fait confiance à la propreté des modules
    hide: opt.hide,
    icon: opt.icon,
    credits: opt.credits,
    togglefn: opt.togglefn, // fonction de callback quand on active / désactive le module. Peut éviter de recharger la page. Rarement utilisé.
  }
}

// Enregistrement des fonctions d'installation des modules
ModMan.RegPlug = function(modself, pagecode, callbackfunc )   { // module, code de page 4 lettres, fonction d'install mod
  if ( modself == undefined || typeof(modself.mcode) != "string" || typeof(pagecode) != "string" || typeof(callbackfunc) != "function" ) {
    GM_log("Erreur appel ModMan.RegPlug: paramètres incorrects");
    return 1;
  }
  
  if ( this.modlock[modself.mcode] === true ) {
    GM_log("ModMan.RegPlug: NOTE: "+modself.mcode+" en double ! Pas d'autre fonctions enregistrées.");// Avertissement
    return false;
  }

  this.callbacks[this.callbacks.length]= {
    mc: modself.mcode,
    pc: pagecode,
    fn: callbackfunc
  }
}

ModMan.Build = function() { // à appeler après les inscriptions des autres modules
  this.box=  document.createElement('div');
  this.box.id = DGM_ModMan_boxID;
  var entete=  document.createElement('h1');
  var divhelp=  document.createElement('div');
  divhelp.setAttribute('class','modhelp');
  divhelp.innerHTML= (GM_getValue(this.BLINKPARNAME, true)?"<span style=\"text-decoration:blink; color:white;\">'</span>":"")+"<img alt=\"Aide et Informations\" src=\"http://data.hordes.fr/gfx/design/helpLink.gif\"/>"; // opérateur ternaire, fixe le blink suivant un param GM, que ça ne clignote pas tout le temps  (cliquer l'aide une fois)
  divhelp.addEventListener('click', function(evt) {// attention à la closure ici !!
      evt.stopPropagation();// pas de bouillonnement sinon déclencherait l'event pour h1
      ModMan.showHelp();
      }, false); 
  entete.appendChild(divhelp);
  var modicon= document.createElement('img');
  modicon.setAttribute('alt','');
  modicon.setAttribute('src',this.modmanicon);
  entete.appendChild(modicon);
  var hspan= document.createElement('span');
  hspan.innerHTML="Modules";
  entete.appendChild(hspan);
  this.box.appendChild(entete);
  entete.addEventListener('click', function(evt) {// attention à la closure ici !!
      Dispatcher.installations(-1); // code -1 pas encore exploité (origine de l'appel)
      }, false);
  var description=  document.createElement('p');
  description.innerHTML= "<strong>ATTENTION !</strong><br>Les modules ne sont plus distribués via userscripts !<br>Désolé pour cette mise à jour qui vous laisse en plan, mais le mieux est de vous référer là où vous avez eu connaissance de ce script pour suivre l'actualité ;)<br>On ne refera pas ce coup là, maintenant la distribution est au point. Ou pas.<br><i>Méfiez vous des scripts greasemonkey, puisqu'on vous le répète !<br>Et ne faites pas de rapport de bug sur le FM pour des modifications que *vous* faites, ça va en énerver plus d'un...</i>";
  this.box.appendChild(description);
  var listck= document.createElement('ul');
  this.box.appendChild(listck);
  // pour avoir une closure à chaque appel dans la boucle, sinon pas bon (subtil)
  closureToggleEvent= function(pnode,pmc,pmi) { 
    pnode.addEventListener('click', function(evt) { // attention à la closure ici !!
      evt.preventDefault(); // car ce sont des liens a
      ModMan.toggle(pmc,pmi); // c'est là que sert la closure
      ModMan.SyncClass();
      }, false);
  }
  // Combien de liens par colonne ?
  var maxincol; // nb de modules maxi par colonne
  if ( this.visibleModCount > 8 ) { // à partir de 8 on fait plusieurs colonnes.
    maxincol= Math.ceil( this.visibleModCount / 2 );
  }else{
    maxincol= this.visibleModCount; // pas de nouvelle colonne
  }
  // Pour chaque module non caché on ajoute un élément à bascule
  var displayedSoFar=0; // combien d'affichés jusqu'à maintenant dans la colonne courante
  for ( var mi=0; mi < this.modules.length; mi++ ) {
    if ( this.modules[mi].hide )
      continue;
    if (displayedSoFar==maxincol) {// nouvelle colonne
      listck= document.createElement('ul'); // variable déclarée avant et initialisée avec la colonnne 1
      this.box.appendChild(listck);
      displayedSoFar=0;
    }
    displayedSoFar++; // un de plus affiché
    var litem= document.createElement('li');
    listck.appendChild(litem);
    var lien= document.createElement('a'); // note: sa class est fixée par SyncClass
    this.modlinks[this.modules[mi].mc]= lien; // hashage
    lien.href="#";
    //lien.setAttribute('mcode', this.modules[mi].mc ); // repérage // ne sert plus...
    lien.innerHTML= "<img alt=\"\" src=\""+this.modules[mi].icon+"\"/><span>"+this.modules[mi].label+"</span>";
    litem.appendChild(lien);
    closureToggleEvent(lien, this.modules[mi].mc, mi); // merci la closure !
  }
  this.SyncClass(); // initialisation des classes suivant module actif ou non
}

ModMan.BuildHelp = function() { // à appeler lors du 1er clic d'aide.
  this.helpbox=  document.createElement('div');
  this.helpbox.id = DGM_ModManHelp_boxID;
  // div de fond bloquant noir ajouté en début de boîte
  var black=  document.createElement('div');
  black.setAttribute('class','black');
  this.helpbox.appendChild(black);
  // div principal de boîte
  var box=  document.createElement('div');
  box.setAttribute('class','helpboxcontent');
  
  var entete=  document.createElement('h1');
  entete.innerHTML= '<img alt="" class="modheader" src="http://data.hordes.fr/gfx/icons/small_help.gif"/><span>Aide des Modules</span>';
  box.appendChild(entete);
  
  //GM_log("ModMan.BuildHelp: typeof: "+ typeof(DGM_SELF_ID)); //DEBUG
  var installref="";
  if ( typeof(DGM_SELF_ID) == 'number' ) { // constante du script maître
    installref="<a href=\"http://userscripts.org/scripts/source/"+DGM_SELF_ID+".user.js\">[ Réinstallation / mise à jour ]</a><br>";
  }
  var description=  document.createElement('p');
  description.innerHTML=
  "Ces modules sont insérés sur les pages du navigateur et peuvent être en partie désactivés. <br>"+
  "Ils modifient votre perception du site officiel.<br>"+
  "Ils ne sont pas fournis par le site officiel, inutile de vous plaindre chez eux par rapport aux modules, ça n'a rien à voir: c'est vous dans votre navigateur qui réalisez les changements. <br>"+
  installref+
  "<br><i>Méfiez vous des scripts greasemonkey. Ils peuvent provoquer diverses erreurs ou anomalies. Ils peuvent compromettre la sécurité de votre navigation web. Ils peuvent transmettre des informations à des sites tiers.<br>Ils peuvent vous trahir.</i>";
  box.appendChild(description);
  
  var btn = document.createElement('a');
  btn.setAttribute('class', 'button');
  btn.setAttribute('href',  '#');
  btn.innerHTML = "<img alt=\"\" src=\"gfx/forum/smiley/h_arrow.gif\"/> <span>J'ai bien tout lu et compris, merci.</span>";
  btn.addEventListener('click', function(evt) {
    evt.preventDefault();
    ModMan.helpbox.setAttribute('class','');
  }, false);
  box.appendChild(btn);
  
  var cleardiv= document.createElement('div');
  cleardiv.className='clear'
  box.appendChild(cleardiv); /* sinon le moddoc à gauche du bouton */
  
  var moddoc=   document.createElement('div');
  moddoc.setAttribute('class','moddoc');
  var titre,desc,credits;
  
  credits=  document.createElement('div');
  this.modcredits[0]= credits; // doit être le premier, il est différencié par le setCreditsDisplay
  credits.className= "creditsShow"; // "creditHide" sinon
  credits.innerHTML= "<span style=\"text-decoration:underline; cursor: pointer;\">Afficher les crédits</span>"; // style en ligne pour une fois... (exception)
  moddoc.appendChild(credits);
  credits.addEventListener('click', function(evt) {
    ModMan.setCreditsDisplay(true);
  }, false);

  credits=  document.createElement('div');
  this.modcredits[this.modcredits.length]= credits;
  credits.className= "creditsHide"; // "creditShow" sinon
  credits.innerHTML= this.options.credits; // crédit du ModMan lui-même
  moddoc.appendChild(credits);
  
  // Pour chaque module affiché :
  for ( var mi=0; mi < this.modules.length; mi++ ) {
    if ( this.modules[mi].hide )
      continue;
    // Entrée de doc module:
    titre= document.createElement('h1');
    titre.setAttribute('class','modheader');
    titre.innerHTML= '<img alt="" class="modheader" src="'+this.modules[mi].icon+'"/><span>'+this.modules[mi].label+'</span>';
    moddoc.appendChild(titre);
    desc= document.createElement('p');
    desc.innerHTML= this.modules[mi].desc;
    credits=  document.createElement('div');
    this.modcredits[this.modcredits.length]= credits;
    credits.className= "creditsHide"; // "creditShow" sinon
    credits.innerHTML= this.modules[mi].credits; // init à "" si non défini par le module.
    desc.appendChild(credits); // j'espère que c'est ok après avoir fixé un innerHTML dans desc
    moddoc.appendChild(desc);
  }
  titre= document.createElement('h1'); // un dernier vide pour espacer
  titre.innerHTML= '<span class="nomoremodules">.</span>'; // si vide: pas de marge, trouver un truc.
  moddoc.appendChild(titre);
  box.appendChild(moddoc);
  this.helpbox.appendChild(box);
  
  /* garde comme exemple de onmouseleave !
  this.helpbox.addEventListener('mouseout', function(evt) {// attention à la closure ici !!
        if ( evt.target == ModMan.helpbox ) // truc à faire que si on quitte le div de boîte, pas un noeud fils
          // inspiré par http://www.quirksmode.org/js/events_mouse.html
          var reltg=evt.relatedTarget; // là où on rentre.
          if (!reltg)
            return; // en test car reltg est undefined
          while (reltg != evt.target && reltg.nodeName != 'BODY')
            reltg= reltg.parentNode;
          if (reltg== evt.target) // on retombe sur notre boîte, donc on l'avait pas quittée
            return; // rien à faire
          ModMan.helpbox.setAttribute('class',hideclass);
      }, false);
      */

}

ModMan.toggle = function(modcode,modind) { // activation ou désactivation d'un module
  // PAS DE this ICI
  var optname= ModMan.mcode+'-'+modcode+'_enable';
  var active= !GM_getValue(optname, true); // on prend le contraire
  GM_setValue(optname, active );
  ModMan.modEnabledCache[modcode]= active;
  var callbackfunc= ModMan.modules[modind].togglefn;
  if ( typeof(callbackfunc) == "function" ) {
    //GM_log("ModMan.toggle: callbackfunc pour "+modcode+" ("+modind+")");//DEBUG
    callbackfunc(active); // avertir le module du changement. rarement utilisé, car généralement il suffit de recharger la page pour annuler l'effet du module.
  }
}

ModMan.showHelp  = function(){
  // PAS DE this ICI
  GM_setValue(ModMan.BLINKPARNAME, false); // fini de clignoter
  if ( $(DGM_ModManHelp_boxID) == null ) { // pas installé ?
    var mainNode= $('content');
    if ( mainNode == null )
       return false; // pas installable. Signaler ?
    if (ModMan.helpbox == null ) // pas encore créé
      ModMan.BuildHelp(); // on construit l'élément html en mémoire
    mainNode.insertBefore(ModMan.helpbox,mainNode.firstChild);
  }
  //ModMan.helpbox.setAttribute('class',''); // on enlève le hide //old
  if ( HorTools.removeTrax )
    HorTools.removeTrax(); // truc qui recouvre l'aide, page de maintenance
  ModMan.helpbox.className="showNotif";
   $('body').className='';
  ModMan.helpbox.lastChild.focus(); /* en test: pour permettre le défilement à la molette sans avoir à cliquer */
}

ModMan.hideHelp  = function(){
  // PAS DE this ICI
  var hb=$(DGM_ModManHelp_boxID);
  if ( hb != null ){
    //hb.setAttribute('class','hiddenHelpBox');//old
    hb.className="";
    $('body').className='hideSwf';
  }
}

ModMan.setCreditsDisplay = function(disp) { // voir BuildHelp
  // PAS DE this ICI
  ModMan.modcredits[0].className= disp?"creditsHide":"creditShow"; // le contraire, car c'est le lien d'affichage  
  for ( var i=1; i < ModMan.modcredits.length; i++)
    ModMan.modcredits[i].className= disp?"creditShow":"creditsHide";  
}
/*
ModMan.enable = function(modcode) { // activation d'un module
  GM_setValue(this.mcode+'-'+modcode+'_enable', true);
}
ModMan.disable = function(modcode) { // désactivation d'un module
  GM_setValue(this.mcode+'-'+modcode+'_enable', false);
}
*/
ModMan.isEnabled = function(modcode) { // test si un module est actif
  return GM_getValue(this.mcode+'-'+modcode+'_enable', true); // si pas initialisé: actif
}

ModMan.isEnabledWrappedCall = function(modcode) { // test si un module est actif, depuis une fonction où on n'a pas accès au fonctions GM_ ... pas strictement aussi fiable pour savoir si actif ou non mais suffira pour les rares cas.
  return ModMan.modEnabledCache[modcode]; 
}

ModMan.SyncClass = function() {// change les classes css suivant les valeurs stockées par GM
  // PAS DE this ICI
  if ( ModMan.box == null ) {
    GM_log("ModMan.SyncClass: BUG à l'appel."); // ne devrait pas arriver, pas critique sinon
    return false;
  }
  var active;
  for ( var mc in ModMan.modlinks ) {
    active= ModMan.isEnabled(mc);
    ModMan.modlinks[mc].setAttribute('class', active?'modon':'modoff'); //hop: opérateur ternaire, vu?
    ModMan.modEnabledCache[mc]= active;
  }
}

// Principale fonction: appel tous les callbacks concernés
ModMan.callMod4Page = function(pagecodes) { // hash de code de page retourné par PageDiag.getPageCode
  for ( var i=0; i<this.callbacks.length; i++) {
    if ( this.isEnabled(this.callbacks[i].mc) && this.callbacks[i].pc in pagecodes) {
      this.callbacks[i].fn(pagecodes); // on passe les codes de  page, ça peut lui servir.
    }
  }
}

ModMan.install =  function() { // PAS DE "this" ICI
  if ( $(DGM_ModMan_boxID) != null ) // déjà installé ?
    return false; 
  var mainNode= $('gamebody');
  if ( mainNode == null )
    return false; // pas installable. Signaler ?
  //GM_log('ModMan.install, mainNode:' + mainNode); // DEBUG
  if (ModMan.box == null ) {
    ModMan.Build(); // on construit l'élément html en mémoire si pas déjà fait.
  }
  mainNode.appendChild(ModMan.box);
  
}

ModMan.init = function() {
  ModMan.RegMod(this); // enregistrement de lui-même (ne servira peut-être pas)
  ModMan.RegPlug(this,'TOUT',this.install); // branchement du module partout, appelé en premier= rang 0, prioritaire
  // normalement ne devrait jamais être désactivé, vérifier parfois si jamais il n'apparait pas
  GenTools.addManyStyles( GM_getResourceText("modmancss"));
}

ModMan.init();