// ==UserScript== 
// @name          KoL Resistance Numbers 
// @namespace     http://userscripts.org
// @description   Print out the effective % and cumulative level for KoL resistances in the character pane.  Code shamelessly stolen from http://webvocab.sourceforge.net/ and modified.  Values from http://kol.coldfront.net/thekolwiki/index.php/Elemental_Resistance
// @include       http://www*.kingdomofloathing.com/charsheet.php
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 

		if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
		     {

    s = node.data; 

s = s.replace( /^Very\s+Low$/gi, "10.00% (1) Very Low");
s = s.replace( /^Low$/gi, "20.00% (2) Low");
s = s.replace( /^Moderate$/gi, "30.00% (3) Moderate");
s = s.replace( /^Considerable$/gi, "40.00% (4) Considerable");
s = s.replace( /^High$/gi, "48.33% (5) High");
s = s.replace( /^Very\s+High$/gi, "55.28% (6) Very High");
s = s.replace( /^Really\s+Very\s+High$/gi, "61.06% (7) Really Very High");
s = s.replace( /^Extremely\s+High$/gi, "65.89% (8) Extremely High");
s = s.replace( /^Very\s+Extremely\s+High$/gi, "69.91% (9) Very Extremely High");
s = s.replace( /^Really\s+Very\s+Extremely\s+High$/gi, "73.26% (10) Really Very Extremely High");
s = s.replace( /^Amazingly\s+High$/gi, "76.05% (11) Amazingly High");
s = s.replace( /^Very\s+Amazingly\s+High$/gi, "78.37% (12) Very Amazingly High");
s = s.replace( /^Really\s+Very\s+Amazingly\s+High$/gi, "80.31% (13) Really Very Amazingly High");
s = s.replace( /^Extremely\s+Amazingly\s+High$/gi, "81.92% (14) Extremely Amazingly High");
s = s.replace( /^Very\s+Extremely\s+Amazingly\s+High$/gi, "83.27% (15) Very Extremely Amazingly High");
s = s.replace( /^Really\s+Very\s+Extremely\s+Amazingly\s+High$/gi, "84.39% (16) Really Very Extremely Amazingly High");
s = s.replace( /^Extraordinarily\s+High$/gi, "85.33% (17) Extraordinarily High");
s = s.replace( /^Very\s+Extraordinarily\s+High$/gi, "86.11% (18) Very Extraordinarily High");
s = s.replace( /^Really\s+Very\s+Extraordinarily\s+High$/gi, "86.75% (19) Really Very Extraordinarily High");
s = s.replace( /^Extremely\s+Extraordinarily\s+High$/gi, "87.30% (20) Extremely Extraordinarily High");
s = s.replace( /^Very\s+Extremely\s+Extraordinarily\s+High$/gi, "87.75% (21) Very Extremely Extraordinarily High");
s = s.replace( /^Really\s+Very\s+Extremely\s+Extraordinarily\s+High$/gi, "88.12% (22) Really Very Extremely Extraordinarily High");
s = s.replace( /^Incredibly\s+High$/gi, "88.43% (23) Incredibly High");
s = s.replace( /^Very\s+Incredibly\s+High$/gi, "88.70% (24) Very Incredibly High");
s = s.replace( /^Really\s+Very\s+Incredibly\s+High$/gi, "88.91% (25) Really Very Incredibly High");
s = s.replace( /^Extremely\s+Incredibly\s+High$/gi, "89.09% (26) Extremely Incredibly High");
s = s.replace( /^Very\s+Extremely\s+Incredibly\s+High$/gi, "89.25% (27) Very Extremely Incredibly High");
s = s.replace( /^Really\s+Very\s+Extremely\s+Incredibly\s+High$/gi, "89.37% (28) Really Very Extremely Incredibly High");
s = s.replace( /^Staggeringly\s+High$/gi, "89.48% (29) Staggeringly High");
s = s.replace( /^Very\s+Staggeringly\s+High$/gi, "89.56% (30) Very Staggeringly High");
s = s.replace( /^Really\s+Very\s+Staggeringly\s+High$/gi, "89.64% (31) Really Very Staggeringly High");
s = s.replace( /^Extremely\s+Staggeringly\s+High$/gi, "89.70% (32) Extremely Staggeringly High");
s = s.replace( /^Very\s+Extremely\s+Staggeringly\s+High$/gi, "89.75% (33) Very Extremely Staggeringly High");
s = s.replace( /^Really\s+Very\s+Extremely\s+Staggeringly\s+High$/gi, "89.79% (34) Really Very Extremely Staggeringly High");
s = s.replace( /^Mind-Bogglingly\s+High$/gi, "89.82% (35) Mind-Bogglingly High");
s = s.replace( /^Very\s+Mind-Bogglingly\s+High$/gi, "89.85% (36) Very Mind-Bogglingly High");
s = s.replace( /^Really\s+Very\s+Mind-Bogglingly\s+High$/gi, "89.88% (37) Really Very Mind-Bogglingly High");
s = s.replace( /^Extremely\s+Mind-Bogglingly\s+High$/gi, "89.90% (38) Extremely Mind-Bogglingly High");
s = s.replace( /^Very\s+Extremely\s+Mind-Bogglingly\s+High$/gi, "89.92% (39) Very Extremely Mind-Bogglingly High");
s = s.replace( /^Really\s+Very\s+Extremely\s+Mind-Bogglingly\s+High$/gi, "89.93% (40) Really Very Extremely Mind-Bogglingly High");
s = s.replace( /^Inconceivably\s+High$/gi, "89.94% (41) Inconceivably High");
s = s.replace( /^Very\s+Inconceivably\s+High$/gi, "89.95% (42) Very Inconceivably High");
s = s.replace( /^Really\s+Very\s+Inconceivably\s+High$/gi, "89.96% (43) Really Very Inconceivably High");
s = s.replace( /^Extremely\s+Inconceivably\s+High$/gi, "89.97% (44) Extremely Inconceivably High");
s = s.replace( /^Very\s+Extremely\s+Inconceivably\s+High$/gi, "89.97% (45) Very Extremely Inconceivably High");
s = s.replace( /^Really\s+Very\s+Extremely\s+Inconceivably\s+High$/gi, "89.98% (46) Really Very Extremely Inconceivably High");
s = s.replace( /^Unthinkably\s+High$/gi, "89.98% (47) Unthinkably High");
s = s.replace( /^Very\s+Unthinkably\s+High$/gi, "89.98% (48) Very Unthinkably High");
s = s.replace( /^Really\s+Very\s+Unthinkably\s+High$/gi, "89.98% (49) Really Very Unthinkably High");
s = s.replace( /^Extremely\s+Unthinkably\s+High$/gi, "89.98% (50) Extremely Unthinkably High");
s = s.replace( /^Very\s+Extremely\s+Unthinkably\s+High$/gi, "89.99% (51) Very Extremely Unthinkably High");
s = s.replace( /^Really\s+Very\s+Extremely\s+Unthinkably\s+High$/gi, "89.99% (52) Really Very Extremely Unthinkably High");
s = s.replace( /^Indescribably\s+High$/gi, "89.99% (53) Indescribably High");
s = s.replace( /^Very\s+Indescribably\s+High$/gi, "89.99% (54) Very Indescribably High");
s = s.replace( /^Really\s+Very\s+Indescribably\s+High$/gi, "89.99% (55) Really Very Indescribably High");
s = s.replace( /^Extremely\s+Indescribably\s+High$/gi, "89.99% (56) Extremely Indescribably High");
s = s.replace( /^Very\s+Extremely\s+Indescribably\s+High$/gi, "89.99% (57) Very Extremely Indescribably High");
s = s.replace( /^Really\s+Very\s+Extremely\s+Indescribably\s+High$/gi, "89.99% (58) Really Very Extremely Indescribably High");
s = s.replace( /^Impossibly\s+High$/gi, "89.99% (59) Impossibly High");
    node.data = s; 
		}
} 

})();

