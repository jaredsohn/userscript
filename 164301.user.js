// ==UserScript==
// @name           arkTeamTrack
// @description    TeamTrack tuning
// @namespace      chooz
// @author         chooz
// @version        1.1.201309
// @updateURL      http://userscripts.org/scripts/source/164301.user.js
// @include        http://gcp.gicm.net:8080/tmtrack*
// @icon           http://gcp.gicm.net:8080/tmtrack/favicon.ico
// ==/UserScript==

// change le titre
document.title = document.title.replace(/^Crédit Mutuel Arkéa TeamTrack$/, "TeamTrack");

if (location.href==window.parent.window.location) { //	Empeche l'execution du script sur les iframes et assimiles
	// recupere l'ID de l'enregistrement teamtrack
	var recID = document.body.innerHTML.match(/RecordId=([0-9]+)/);
	unsafeWindow.top.recID = recID[1];
}

var divTitre = document.getElementById("itemtitle");
if (divTitre) {
	// recupere le span dans lequel est inscrit le descriptif de l'incident
	var xPathResLigne = document.evaluate("span[2]", divTitre, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var spanID = xPathResLigne.singleNodeValue;
	var incID = spanID.innerHTML.match(/([A-Z]+[0-9]+):&nbsp;/);
	spanID.innerHTML = "<a href='http://gcp.gicm.net:8080/tmtrack/tmtrack.dll?View&T=1006&I=" + unsafeWindow.top.recID + "' target='_blank'>teamtrack " + incID[1] + "</a>&nbsp;:&nbsp;";
}

var lstLiens = document.getElementsByTagName("a");
for (var i = 0; i < lstLiens.length; i++) {
	var incID = lstLiens[i].href.match(/tmtrack\.dll\?IssuePage&RecordId=([0-9]+)&.*Template=view/);
	if (incID) {
		lstLiens[i].href = "http://gcp.gicm.net:8080/tmtrack/tmtrack.dll?View&T=1006&I=" + incID[1];
		lstLiens[i].target = "_blank";
		//alert(lstLiens[i].href);
	}
}