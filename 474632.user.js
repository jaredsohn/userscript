// ==UserScript==
// @name         Check_MK - WATO Shortcut to services
// @namespace    https://userscripts.org/people/5587
// @description  Generates icon which opens the host's services configuration. For best result deactivate automatic reload of the respective page (icon vanishes after first ajax reload).
// @downloadURL  https://userscripts.org/scripts/source/474632.user.js
// @grant        none
// @include      *check_mk/view.py?*
// @updateURL    https://userscripts.org/scripts/source/474632.meta.js
// @version      1.0.1
// @date         2014-04-21
// @creator      Arne Dieckmann (aka "Mithrandir")
// ==/UserScript==

(function() {
	var nodes = document.evaluate(
		"//td[@class='icons']/a[contains(@href,'&mode=edithost')]|//td[@class='tr icons']/a[contains(@href,'&mode=edithost')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for(var i=0; i<nodes.snapshotLength; i++) {
		var thisNode = nodes.snapshotItem(i);
		var oAnchor = document.createElement("a");
		var oImg = oAnchor.appendChild(document.createElement("img"));
		oImg.setAttribute('class','icon');
		oImg.title = 'Open services of this host in WATO - the Check_MK Web Administration Tool';
		oImg.setAttribute('src', 'images/icon_services.png');
		oAnchor.href = thisNode.href.replace('&mode=edithost','&mode=inventory');
		thisNode.parentNode.insertBefore(oAnchor, thisNode);
	}

	var oWatoDiv = document.getElementById("wato");
	if (oWatoDiv !== null) {
		var oServDiv = oWatoDiv.cloneNode(true);
		oServDiv.id='cb_watoserv';
		oServDiv.setAttribute('style','display:none');
		oServDiv.firstChild.href = oWatoDiv.firstChild.href.replace('mode=edithost','mode=inventory');
		oServDiv.firstChild.firstChild.src = 'images/icon_services.png';
		oServDiv.firstChild.firstChild.nextSibling.nodeValue='Services';
		oWatoDiv.parentNode.insertBefore(oServDiv, oWatoDiv.nextSibling);
	};

})();

