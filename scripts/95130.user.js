// ==UserScript==
// @name          Comunio AutoLogin
// @description   Inicio de sesión automático en Comunio.es y Comunio-cl.com
// @version       1.0
// @date          2011-01-22
// @source        
// @include       http://*.comunio.es/*
// @include       http://comunio.es/*
// @include       http://*.comunio-cl.com/*
// @include       http://comunio-cl.com/*
// @author        Carlos
// ==/UserScript==

var timeoutInterval = 300; 

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