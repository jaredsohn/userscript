// ==UserScript==
// @name        SEL
// @namespace   test
// @description test
// @grant       none
// @include     http://mercadosmasivos.cantv.com.ve/sia/actualizar_orden.php?*
// @version     1
// ==/UserScript==

var inputs, input, newValue, i,ad;
var elmNewContent = document.createElement('textNodes');

textNodes = document.evaluate( 
"//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

inputs = document.getElementsByTagName('input');
for (i=0; i<inputs.length; i++) {
 input = inputs[i];

 if (input.name == "NroTelefono") {
  ad = input.value;
  newValue='('+ad[0]+ad[1]+ad[2]+')'+' '+ad[3]+ad[4]+ad[5]+'-'+ad[6]+ad[7]+ad[8]+ad[9];
  break;
 }
}
var searchRE = new RegExp(ad,'gi'); 
for (var i=0;i<textNodes.snapshotLength;i++) { 
  var node = textNodes.snapshotItem(i); 
  node.data = node.data.replace(searchRE, newValue); 
}
