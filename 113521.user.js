// ==UserScript==
// @name           User Checkbox
// @namespace      Auto-check invites chechbox
// @description    Auto-check
// ==/UserScript==
function check() {
	var ids = new Array("93894");
	for (i = 0; i < ids.length; i++)
		document.getElementById(ids[i]).checked = true;
	}	
}

check();