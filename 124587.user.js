// ==UserScript==
// @name           PlentyMarkets - Menge in Nachbestellungen auf 0 setzen
// @namespace      Piccar-Automotive GmbH
// @description    Nachbestellungen verhalten sich wieder so wie vor der PlentyMarkets Version 4.306
// @include        *://*/plenty/admin/gui_call.php?Object=mod_stock2/reorder@GuiReorderChange&reorder_id=*
// ==/UserScript==

// Sets every part delivery field to zero and reruns itself to make changes to further fields addes to the list
// TODO: Change the setTimeout part to something more event driven, for now it's a bit quick and dirty but it works ;)
function setToZero() {
	var inputs = document.getElementsByTagName("input");
	for(var i = inputs.length-1; i >= 0; i--) {
		if(inputs[i].name.indexOf("[part_delivery]") != -1 || inputs[i].name.indexOf("[quantity]") != -1) {
			if(fieldsDone.indexOf(inputs[i]) != -1 ) {
				// Break here because we don't need to look any further
				break;
			}
			inputs[i].value = "0";
			fieldsDone.push(inputs[i]);
		}
	}
	window.setTimeout(setToZero, 1000);
}
var fieldsDone = [];
setToZero();