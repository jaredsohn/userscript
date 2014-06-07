// ==UserScript==
// @name          IPVOX platba libovolne castky
// @namespace     ipvox.local
// @description   Skript prida volbu na zaplaceni 50 Kc, upravou kodu je mozne nastavit libovolnou castku.
// @include       http://www.ipvox.cz/cs/muj-ucet/platby
// @version       0.0.1
// ==/UserScript==


// add option 50 Kc
var elemSelAmount100 = document.evaluate('//select[@name="cre_amount"]/option[@value="100"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (elemSelAmount100) {
    var newOption       = document.createElement('option');
    newOption.value     = '50';
    newOption.selected  = 'selected';
    newOption.innerHTML = '50 Kč';

    elemSelAmount100.parentNode.insertBefore(newOption, elemSelAmount100);
}
