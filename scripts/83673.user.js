// ==UserScript== 
// @name          Eliminate all excessive punctuation
// @namespace     http://fourcoffees.com
// @description   Removes atrocities like "!??!?", replacing them with .
// @include       * 
// ==/UserScript== 

document.addEventListener("DOMNodeInserted", documentChanged, false);

function documentChanged(event) {
  removeRedundant();
}

function removeRedundant(){
	var replacements, regex, key, textnodes, node, s; 

	replacements = { 
	  
	  "[!\\?]{2,}": ".",
	
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

};

(function() {
	removeRedundant();
})();