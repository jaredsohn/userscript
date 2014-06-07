// ==UserScript==
// @name         Nexus Clash Leave Faction Confirmation
// @namespace    http://www.quasimorto.com
// @description  Display a confirmation dialog when clicking "Leave Faction".
// @include      http://nexusclash.com/modules.php?*op=faction*
// @include      http://www.nexusclash.com/modules.php?*op=faction*
// ==/UserScript==

var inputs = document.getElementsByTagName('input');
for (var i=0; i<inputs.length; i++){
	var type = inputs[i].getAttribute("type");
	var value = inputs[i].getAttribute("value");
	if (type == "submit" && value == "Leave Faction") {
		inputs[i].setAttribute("onclick", 'return confirm("Leave faction?");');
	}
}
