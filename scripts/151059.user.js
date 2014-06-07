// ==UserScript==
// @name        C&C Tiberium Alliances: Hide Mission Panel
// @namespace   BoVII
// @description Hide mission Panel & increase notification panel height
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @version     0.1.2
// @grant       none
// ==/UserScript==

(function (){
  var script_main = function() {
    function initialize() {
      
      console.log("C&C Tiberium Alliances: Hide Mission Panel Loaded");

      var mb = qx.core.Init.getApplication().getMissionsBar();
      var nb = qx.core.Init.getApplication().getNotificationBar();
      var bounds = mb.getBounds();
      mb.setVisibility('hidden');
      nb.$$parent.add(nb, bounds);
      nb.addListener('resize', function(){
        nb.$$parent.add(nb, bounds);
      });   
    }
 
    function script_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(script_checkIfLoaded, 1000);
        } else {
          window.setTimeout(script_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(script_checkIfLoaded, 1000);
    }
  }
  var scriptScript = document.createElement("script");
  scriptScript.innerHTML = "(" + script_main.toString() + ")();";
  scriptScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(scriptScript);
  }
})();
