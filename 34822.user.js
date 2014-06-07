// ==UserScript==
// @name           seb.se - Personnummerminne
// @namespace      Qerub
// @include        https://*.vv.sebank.se/cgi-bin/pts3/wow/wo10.c1010.f001?I=
// @version        $Id$
// ==/UserScript==

(function() {
  function getSetting(name, description) {
    var currentValue = GM_getValue(name);
    
    if (currentValue) {
      return currentValue;
    } else {
      var newValue = prompt(description);
      GM_setValue(name, newValue);
      return newValue;
    }
  }
  
  GM_registerMenuCommand("Ändra personnummer...", function() {
    GM_setValue("personnummer", "");
    window.location.reload();
  })
  
  window.addEventListener("load", function() {
    document.getElementById("A1").value = getSetting("personnummer", "Personnummer:")
    document.getElementById("A2").focus();
  }, true)
})();
