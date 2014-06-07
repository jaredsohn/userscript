// ==UserScript==
// @name           CSM Admin - renameFL
// @namespace      None
// @include        http://*.cs-manager.com/csm/other/?p=other_info&s=admin&u=*
// ==/UserScript==

// FIX FOR SINGLE QUOTES
single = document.getElementsByClassName('dev');
for (var i = 0; i < single.length; i++) {
	var regex = single[i].innerHTML.match(", '(.*?)'(.*?)'", 'gi');

	if (regex != null) {
		for (var a = 0; a < regex.length; a++) {
			single[i].innerHTML = single[i].innerHTML.replace(regex[a], ", 'NEW FL NAME'");
		}
	}
}

div = document.getElementById('nav');
newEl = document.createElement('div');
cnt = "<script type=\"text/javascript\">function getPos(oTarget){var oPos = {	x: 0,	y: 0	};	while (oTarget != document.body && oTarget != null)	{		oPos.y += oTarget.offsetTop+500;		oPos.x += oTarget.offsetLeft+350;		oTarget = oTarget.offsetParent;	}	return oPos;} function showRename() { var oPopup = document.getElementById('rename_fl_div'); var oPos = getPos(document.getElementById('rename_fl_div')); oPopup.style.display = 'none'; oPopup.style.left = (oPos.x + 10) + 'px'; oPopup.style.top = (oPos.y - 20) + 'px'; oPopup.style.display = 'block'; } function closeRenameFL() { var oPopup = document.getElementById('rename_fl_div'); oPopup.style.display = 'none'; } function renameFL(flID, flName) { showRename(); flNameBis = document.getElementById('fl_default_name');flNameBis.value = flName;flIDBis = document.getElementById('fl_id');flIDBis.value = flID;}</script>";
newEl.innerHTML = cnt;
div.parentNode.insertBefore(newEl, div);