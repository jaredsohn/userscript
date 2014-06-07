// ==UserScript==
// @name                Neopets : Magic Shop : Alert
// @namespace           http://www.neocheats.org
// @description         Alerts when a morphing potion restocks.
// @include		http://www.neopets.com/objects.phtml?type=shop&obj_type=13
// @include		http://www.neopets.com/objects.phtml?obj_type=13&type=shop
// @exclude             http://www.neopets.com/haggle.phtml   
// ==/UserScript==

// if installed/upload elsewhere, please contact me at
// neocheats @ userscripts.org

setTimeout("location.reload(true);",3200);

(function() {
if (document.body.innerHTML.indexOf("Herbal Scrambled Eggs") > -1) {
alert("RESTOCKED! A medicine has restocked in the Neopian Magic Shop. Click okay and quickly enter your haggle.");
}
else if (document.body.innerHTML.indexOf("Medicinal Soap") > -1) {
alert("Restocked banned! This generally means you have refreshed too much in the Neopian Shops.");
}
})();
