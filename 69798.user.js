// ==UserScript==
// @name           lernu! last forum page
// @namespace      mailto:jakovATgmxDOTat
// @description    redirect to last forum page
// @include        http://*.lernu.net/komunikado/forumo/temo.php?t=*
// @exclude        http://*.lernu.net/komunikado/forumo/temo.php?t=*&p=*

// ==/UserScript==

var pagxoj = document.evaluate("//div[@class='paghigo']/a", document, null, XPathResult.ANY_TYPE, null);

var alertText = "Pagxoj en tiu dokumento:\n" 
 
var tiupagxo = pagxoj.iterateNext();
while (tiupagxo) {  
  alertText += tiupagxo.textContent + "\n";
  lastapagxo = tiupagxo;
  tiupagxo = pagxoj.iterateNext();
}

window.location.href = lastapagxo;