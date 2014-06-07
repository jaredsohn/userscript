// ==UserScript==
// @name          Comunio Auto-Login
// @namespace     http://www.svenaldo.de/
// @description   Automatisches einloggen bei Comunio.de
// @version       2
// @date          2008-09-24
// @source        http://userscripts.org/scripts/show/34410
// @include       http://*.comunio.de/*
// @include       http://comunio.de/*
// @author        Sven Kalow
// ==/UserScript==

/* ChangeLog
v2 Sep 24 Metadaten geändert
v1 Sep 24 erste Version
*/

/* ToDo
- Optionen über Menü steuern
- Zähler
*/

// OPTIONEN:
var timeoutInterval = 3000; // Intervall in ms wie oft Seite neu geladen werden soll

function comuniologin() {
  var elem = document.getElementsByTagName('form');
  for (var i = 0; i < elem.length; i++){
    if (elem[i].name == 'login'){
      var frm = elem[i];
      var inputs = frm.getElementsByTagName('input');
      var unExists = false;
      var passExists = false;
      
      for (var j = 0; j < inputs.length; j++){
        if (inputs[j].name == 'login' && inputs[j].value != ''){
          unExists = true;
        }
        
        if (inputs[j].name == 'pass' && inputs[j].value != ''){
          passExists = true;
        }
      }
      
      if (unExists && passExists){
        frm.submit();
        return;
      }
    } 
  }
}

window.setTimeout(comuniologin, timeoutInterval);