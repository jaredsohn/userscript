// ==UserScript== 
// @name          Julius, Eat Your Heart Out 
// @namespace     http://userscripts.org
// @description   Rename the months of the year to their super-magnetized, electrico-radioactive, solar and alchimerical values. Warning: might induce thought. 
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//html//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 

		if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
		     {

    s = node.data; 
s = s.replace( /\bJanuary\b/gi, "Snotviper");
s = s.replace( /\bFebruary\b/gi, "Loosecorn");
s = s.replace( /\bMarch\b/gi, "Dripwobble");
s = s.replace( /\bApril\b/gi, "Imsquelchy");
s = s.replace( /\bM[aA][yY]\b/g, "Wetmold");
s = s.replace( /\bJune\b/gi, "Cleanpants");
s = s.replace( /\bJuly\b/gi, "Strangelymoist");
s = s.replace( /\bAugust\b/gi, "Fatflaps");
s = s.replace( /\bSeptember\b/gi, "Rottenchops");
s = s.replace( /\bOctober\b/gi, "Blackndangley");
s = s.replace( /\bNovember\b/gi, "Stinkmuch");
s = s.replace( /\bDecember\b/gi, "Catspit");

/* Replace abbreviated months.  Only use this if you are especially bold of fetlock.
I suspect it will replace more than just months. */
/*
s = s.replace( /\bJan\b/g, "Snotviper");
s = s.replace( /\bFeb\b/g, "Loosecorn");
s = s.replace( /\bMar\b/g, "Dripwobble");
s = s.replace( /\bApr\b/g, "Imsquelchy");
s = s.replace( /\bJun\b/g, "Cleanpants");
s = s.replace( /\bJul\b/g, "Strangelymoist");
s = s.replace( /\bAug\b/g, "Fatflaps");
s = s.replace( /\bSept\b/g, "Rottenchops");
s = s.replace( /\bOct\b/g, "Blackndangley");
s = s.replace( /\bNov\b/g, "Stinkmuch");
s = s.replace( /\bDec\b/g, "Catspit");
*/

    node.data = s; 
		}
} 

})();

