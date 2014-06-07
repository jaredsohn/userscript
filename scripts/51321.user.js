// ==UserScript==
// @name           Just say no To CheckBoxs
// @namespace      *
// @include        *
// ==/UserScript==

function CheckTheBoxes() {
	var inputboxes=document.getElementsByTagName('input');
	for (var i=0; i < inputboxes.length; i++) {
		//Click All the "no" boxes
		if (inputboxes[i].type=="radio" && inputboxes[i].value.toLowerCase().indexOf("no")!=-1) {
			inputboxes[i].click();
		}
		if (inputboxes[i].type=="radio" && inputboxes[i].id.toLowerCase().indexOf("no")!=-1) {
			inputboxes[i].click();
		}
		//Click all the diffent versions of skip button
		if (inputboxes[i].type=="submit" && inputboxes[i].value.toLowerCase().indexOf("skip")!=-1) {
			inputboxes[i].click();
		}
		if (inputboxes[i].type=="button" && inputboxes[i].value.toLowerCase().indexOf("not interested")!=-1) {
			inputboxes[i].click();
		}
		if (inputboxes[i].type=="button" && inputboxes[i].value.toLowerCase().indexOf("skip")!=-1) {
			inputboxes[i].click();
		}
		if (inputboxes[i].type=="button" && inputboxes[i].name.toLowerCase().indexOf("pass")!=-1) {
			inputboxes[i].click();
		}
		if (inputboxes[i].type=="image" && inputboxes[i].alt.toLowerCase().indexOf("skip")!=-1) {
			inputboxes[i].click();
		}
		if (inputboxes[i].type=="image" && inputboxes[i].name.toLowerCase().indexOf("skip")!=-1) {
			inputboxes[i].click();
		}
		if (inputboxes[i].type=="image" && inputboxes[i].alt.toLowerCase().indexOf("continue")!=-1) {
			inputboxes[i].click();
		}
		if (inputboxes[i].type=="hidden" && inputboxes[i].id.toLowerCase().indexOf("bt_cancel")!=-1) {
			inputboxes[i].click();
		}
		
	}	
}

window.addEventListener("load", CheckTheBoxes, false);