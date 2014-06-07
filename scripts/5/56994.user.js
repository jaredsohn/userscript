// ==UserScript==
// @name           Neopets: Money Tree
// @namespace      http://userscripts.org/users/106594
// @description    Tries to pick NP when appear on Money Tree
// @include        http://www.neopets.com/donations.phtml
// @include        http://www.neopets.com/takedonation_new.phtml?donation_id=*&xcn=*&location_id=*
// @copyright      jcmaximus
// ==/UserScript==

// XPath but the array returned is a normal array[x]
// Syntax: $x("//a", 7);
function $x(p, type) {
  var i, arr = [], t = type || 6, xpr = document.evaluate(p,document,null,t,null);
  for (i = 0; item = xpr.snapshotItem(i); i++) {arr.push(item);}
  return arr;
}

function checkmoney() {
var i,highest=0,am=new Array(),amounts = $x("//b[contains(text(), 'NP')]",7);
if(amounts.length==0) {window.location.reload();}
else if(amounts.length==1) {location.href = amounts[0].parentNode.firstChild.href;}
else {
for(i=0; i<amounts.length; i++) {am[i] = parseInt(amounts[i].innerHTML);}
for(i=0; i<am.length; i++) {if(am[i+1]!=undefined) {if(am[i] > am[i+1]) {highest = i;} else {highest=i+1;}}}
location.href = amounts[highest].parentNode.firstChild.href;
}
}

function main() {
if(/takedonation_new\.phtml/.test(location.href)) {location.href = 'http://www.neopets.com/donations.phtml';}
if(/donations\.phtml$/.test(location.href)) {checkmoney();}
}

setTimeout(main, 0);