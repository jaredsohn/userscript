// ==UserScript==
// @name                Neopets : Mutant Graveyard of Doom Avatar : Alert
// @namespace           userscripts.org
// @description         Alerts when you get the avatar.
// @include		http://www.neopets.com/halloween/gamegraveyard.phtml
// @exclude		http://www.neopets.com/halloween/gamegraveyard2.phtml
// ==/UserScript==


setTimeout("location.reload(true);",1000);

(function() {
if (document.body.innerHTML.indexOf("Something Has Happened!") > -1) {
alert("Avatar Found!");
}
else if (document.body.innerHTML.indexOf("---") > -1) {
alert("Do not delete this..");
}
})();