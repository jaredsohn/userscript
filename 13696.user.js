// ==UserScript==
// @name           zensurf
// @namespace      .
// @description    hot button word replace (Nicked from 'Change sticky into stickam' by http://myspace.com/dh878)

// ==/UserScript==
(function() {
	var replacements;
		replacements = {
		
						"retard":"dork",
						"Retard":"Dork",
						"RETARD":"DORK",
						"spaz":"freak",
						"Spaz":"Freak",
						"SPAZ":"FREAK",
						"short bus":"rollercoaster of dorkitude",
						"Short bus":"Rollercoaster of dorkitude",
						"Short Bus":"Rollercoaster of Dorkitude",
						"SHORT BUS":"ROLLERCOASTER OF DORKITUDE",

					};
	regex = {};
	for (key in replacements) {
		regex[key] = new RegExp(key, 'g');
	}
					
	textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; i < textnodes.snapshotLength; i++) {
			node = textnodes.snapshotItem(i);
			s = node.data;
		for (key in replacements) {
			s = s.replace(regex[key], replacements[key]);
		}
		node.data = s;
		}
 })();