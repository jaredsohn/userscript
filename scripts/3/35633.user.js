// ==UserScript==
// @author         mOBSCENE
// @name           Neopets Quick-Till
// @namespace      diceroll123
// @description    Sets withdraw value to amount in till.
// @include        http://www.neopets.com/market.phtml?type=till
// ==/UserScript==

var frm = document.forms[1];

var np = document.body.innerHTML.match(/You currently have <b>([0-9,\,]*) NP<\/b> in your till./)[1];
np = np.replace(/,/g,'');

if(np > 0){frm.elements[1].value = np;}