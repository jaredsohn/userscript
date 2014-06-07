// Ceci n'est pas vraiment un script Greasemonkey .

// ==UserScript==
// @name          Dispatcher
// @namespace     D-
// @description   Element dispatcher
// @include       http://dummy/*
// ==/UserScript==

// Auteur bluflonalgul 2009-02 2009-03

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

// v1.2

/////////////////////////////////////////////////////////////////////////////

var Dispatcher = {
}

// Appel des fonctions d'installation de tous les modules actifs concernés par la page courante.
Dispatcher.installations = function(callnum) { // numéro d'appel, suivant l'événement qui la fait appeler, pas encore exploité.
  var pc= PageDiag.getPageCode();
  ModMan.callMod4Page(pc);  
}

Dispatcher.retryModMan = function(callnum) { // rustine pour quand le marteau disparaît
  var modmantool= $(DGM_ModMan_boxID);
  if ( modmantool==null  ) {
    Dispatcher.installations(4);
    //alert('install 4');//DEBUG
  }
}
Dispatcher.init = function() { // se greffe partout où il faut
  if( typeof(window.wrappedJSObject.js) != 'undefined' ) {
  // On s'intercalle à la suite de la méthode js.XmlHttp.onData() pour les appels d'installation
    //
    window.wrappedJSObject.js.XmlHttp._dgm_onData = window.wrappedJSObject.js.XmlHttp.onData;
    window.wrappedJSObject.js.XmlHttp.onData = function(data) {
      PageDiag.setUrlOnData(this.urlForBack); // initialement pour HMUpdater
      this._dgm_onData(data);
      
      var timerinit= setTimeout( // pas super propre et peut-être pas fiable
        function(){
          Dispatcher.installations(3)
        }
        ,10); // 200 avant, là 10 en test (milièmes de secondes)
      
      //Dispatcher.installations(3); // GM access violation de la unsafewindow
    };
    //Dispatcher.installations(2);
  }
  window.wrappedJSObject.addEventListener('load',function(){Dispatcher.installations(1);} ,false); // à voir lequel est le mieux
  // v1.2 :
  var banner= $('banner');
  if ( banner ) { // rustine pour quand le marteau disparaît
    //GM_log( "Dispatcher.init: " );
    banner.addEventListener('mouseover',function(){  Dispatcher.retryModMan(); } ,false);
  }
//Dispatcher.installations(1);
}

// Code principal:
Dispatcher.init();
