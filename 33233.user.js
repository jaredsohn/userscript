//#special_signs_helpy.user.js
// ==UserScript==
// @name          AlloCine - Critiques dans les profils
// @author        Motty Katan
// @namespace     http://moppy.4free.co.il
// @description	  Ajute un lien aux profils pour les crituques.  
// @include       http://*.mon.allocine.fr/
// ==/UserScript==
// Build Changes:

var critiqueUrl = "http://www.allocine.fr/communaute/membre/critiques_membre_gen_userid=";
var critiqueUrlExt = ".html"; 

var linkTags = document.evaluate("//a[contains(@href,'http://www.allocine.fr/monallocine/mesamis/amis_compare_gen_userid=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
if (linkTags.snapshotLength>0)
{
	var oLink = linkTags.snapshotItem(0);
	critiqueUrl += oLink.href.match(/userid=([^&\.]*)/)[1] + critiqueUrlExt;
	var oLinkCritique = document.createElement("A");
	oLinkCritique.href = critiqueUrl;
	oLinkCritique.innerHTML = "Critiques";   	
	oLink.parentNode.appendChild(oLinkCritique);
}
