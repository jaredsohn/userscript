// ==UserScript==
// @name                Neopets : Magic Shop : Alert
// @namespace           http://www.neocheats.org
// @description         Alerts when a morphing potion restocks.
// @include		http://www.neopets.com/objects.phtml?type=shop&obj_type=2
// @include		http://www.neopets.com/objects.phtml?obj_type=2&type=shop
// @exclude             http://www.neopets.com/haggle.phtml   
// ==/UserScript==

setTimeout("location.reload(true);",3200);


(function() {
if (document.body.innerHTML.indexOf("Morphing Potion") > -1) {
alert("RESTOCKED! A Morphing Potion has restocked in the Neopian Magic Shop. Click okay and quickly enter your haggle.");
}
else if (document.body.innerHTML.indexOf("NEOPETS HINT") > -1) {
alert("Restocked banned! This generally means you have refreshed too much in the Neopian Shops.");
}
})();
