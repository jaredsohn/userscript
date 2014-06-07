// ==UserScript==
// @name  SpyTrap
// @description Lable known SpyTraps
// @include http://oilempires.com/*
// @include http://www.oilempires.com/*
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 

		if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
		     {

    s = node.data; 
s = s.replace( /Brave_\u005BA\u005D/gi, "Brave_\u005BSPY TRAP!!!!\u005D");
s = s.replace( /AKMerc/gi, "AKMerc_\u005BSPY TRAP!!!!\u005D");
s = s.replace( /therealshIzz_\u005BA\u005D/gi, "therealshIzz_\u005BSPY TRAP!!!!\u005D");
s = s.replace( /Jester_\u005BA\u005D/gi, "Jester_\u005BSPY TRAP!!!!\u005D");
s = s.replace( /Multi_Accounts_\u005BA\u005D/gi, "Maddyn99_\u005BSPY TRAP!!!!\u005D");
s = s.replace( /Swatucallme_\u005BA\u005D/gi, "Swatucallme_\u005BSPY TRAP!!!!\u005D");
s = s.replace( /pbdaileyfl/gi, "pbdaileyfl_\u005BSPY TRAP!!!!\u005D");
s = s.replace( /Dirty_Martini_\u005BA\u005D/gi, "Dirty_Martini_\u005BSPY TRAP!!!!\u005D");
s = s.replace( /hammerstone/gi, "hammerstone_\u005BSPY TRAP!!!!\u005D");
 
    node.data = s; 
		}
} 

})();

