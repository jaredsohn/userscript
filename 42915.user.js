// ==UserScript==
// @name           fonatk
// @namespace      http://userscripts.org/users/81603
// @description    epic
// @include        *fallofnations.com/game/index.asp?action=attack*
// ==/UserScript==
var $ = unsafeWindow.jQuery;

unsafeWindow.doAttacks = function() {
	for (x=1;x<=$("#numAttacks").val();x++) {
		unsafeWindow.attackUpdate();
	}
}


var attackButton = document.getElementById("attackButton");
var nom = document.createElement('tr');
var nomih = "<th>Number of Attacks:</th><td><select id=\"numAttacks\" name=\"attacks\">"
for (x=1;x<=500;x++) {
	nomih += "<option value=" + x +">" + x + "</option>";
}
nomih += "</select></td>";
nom.innerHTML = nomih;
attackButton.parentNode.parentNode.parentNode.insertBefore(nom, attackButton.parentNode.parentNode);
var buttan = document.createElement("input");
buttan.type = "button"; buttan.value = "gogog"; buttan.id="buttanofwin";
buttan.setAttribute("onClick", "doAttacks();");
$("#attackButton").replaceWith(buttan);