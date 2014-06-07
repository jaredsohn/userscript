// Ported from http://userscripts.org/scripts/show/62993

// ==UserScript==
// @name          Remove Redundant Punctuation from Twitter
// @namespace     http://userscripts.org/users/jaysonjphillips
// @description   Reduces redundant punctuation to a single instance. Twitter version
// @include       http://twitter.com/*
// @version       0.3.1 -  added window.load, target span.entry-content specifically
							
// ==/UserScript==

window.addEventListener("load", documentLoaded, false);
document.addEventListener("DOMNodeInserted", documentChanged, false);

function documentLoaded(event) {
	removeRedundant();
}

function documentChanged(event) {
	removeRedundant();
}

function removeRedundant(){
  var replacements, regex, key, textNodes, node, nodeData;
  replacements = { 
    
		"[!]{2,}": "!",
                "[?]{2,}": "?",
		"[.]{4,}": "...",
		"[>]{2,}": ">",
		

  };

  regex = {};
  for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
  }

	textNodes = document.evaluate("//span[@class='entry-content']//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
																
	for (var i = 0; i < textNodes.snapshotLength; i++) {
  	node = textNodes.snapshotItem(i);
    	if(!(node.data.match(/^\s*$/))) {
				nodeData = node.data;
        for (key in replacements) {
          nodeData = nodeData.replace(regex[key], replacements[key]);
        }
        node.data = nodeData;
    }
	}
}