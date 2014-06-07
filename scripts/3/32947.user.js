// Generated with the WebVocab online generator, v1.3 
// modify ver rapid*share
 
 
// ==UserScript== 
// @name          WebVocab_rapid*share 
// @namespace     http://userscripts.org
// @description   Substitute second language vocab you're studying into your primary language Web reading!
// @include       http://*kaskus.us* 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);  

for (var i = 0; i < textnodes.snapshotLength; i++){ 
	node = textnodes.snapshotItem(i); 

	if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue)){

	s = node.data; 

	s = s.replace( /\brapid\*share\b/gi, "rapidshare");

node.data = s; 
}
}

})();


// SUCCESS! If you can see this, you're vocab file was deemed acceptable and SHOULD work fine! Enjoy!