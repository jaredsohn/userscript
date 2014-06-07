// ==UserScript==
// @name           BvS Hide Unattackable Villages
// @namespace      Razithel
// @description    Hides unattackable villages
// @include        http://www.animecubed.com/billy/bvs/villageattack.html
// ==/UserScript==


var myInputs=document.getElementsByTagName("input");
var myAttacks = new Array();

// Makes an array of the Attack Check radios
for (var i=0; i<myInputs.length; i++) {
	var myElement = myInputs[i];
	if (myElement.getAttribute("name") == "attackcheck") {
		myAttacks.push(myElement);
	}
}
/* for each Attack Check radio, if it's disabled, eat the next three elements 
 * (the village hyperlink, the village size, and the newline)
 * then eat itself
*/
for (var i=0; i<myAttacks.length;i++) {
	var myAttack = myAttacks[i];
	if (myAttack.disabled == true) {
		myAttack.parentNode.removeChild(myAttack.nextSibling);
		myAttack.parentNode.removeChild(myAttack.nextSibling);
		myAttack.parentNode.removeChild(myAttack.nextSibling);
		myAttack.parentNode.removeChild(myAttack);
	}
}