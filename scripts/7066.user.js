// hackdoubleclickpriberamd.user.js
// version 0.1
// 2007-01-11
// Copyright (c) 2007, Bruno Caimar 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name            Hack DoubleClick Priberam Dict
// @author          Bruno Caimar <bruno.caimarATgmail.com/>
// @namespace
// @description     English:    Hack DoubleClick results screen - Priberam Dictionary
//                  Portuguese: Hack no doubleClick no Dicionario Priberam 
//                              que não funciona no Firefox
// @include         http://www.priberam.pt/dlpo/definir_resultados.aspx*

// ==/UserScript==
function MySeleccionaEntrada() {
  var _word = window.getSelection() + '';
  var re = /([ ]*)$/ ; 
  // Call Page Function
  unsafeWindow.SeleccionaEntrada(_word.replace(re, ""), '0');
}
(function() {
  try {
    var _span = top.document.getElementsByTagName("span") ;
    for (var i = 0 ; i < _span.length ; i++) {
      if (_span[i].getAttribute('ondblclick')) {
        _span[i].setAttribute('ondblclick', '') ;
        _span[i].addEventListener("dblclick", MySeleccionaEntrada, false);
      }
    }
  } catch (erro) {
    // some error ocurred
    GM_log("Error:" + erro.description) ;
  }
})();
