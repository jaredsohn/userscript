// ==UserScript==
// @name          Remove experts-exchange.com from Bing Search
// @namespace     http://www.bing.com
// @description	  Removes results for any "experts-exchange.com" page from Bing.
// @include       http://*.bing.*/search*
// @include       https://*.bing.*/search*
// ==/UserScript==

// Based on http://userscripts.org/scripts/show/84677
// with ancestor() method from http://www.sitepoint.com/finding-an-ancestor-node/

function ancestor(node, match) {
  if(!node) {
    return null;
  }
  else if(!node.nodeType || typeof(match) != 'string') {
    return node;
  }
    
  if((match = match.split('.')).length === 1) {
    match.push(null);
  }
  else if(!match[0]) {
    match[0] = null;
  }
    
  do {
    if((!match[0] || match[0].toLowerCase() == node.nodeName.toLowerCase())
      && (!match[1] || new RegExp('( |^)(' + match[1] + ')( |$)').test(node.className))
    ) {
      break;
    }
  }
  while(node = node.parentNode);
 
  return node;
}

var results=document.evaluate('//a[contains(@href, "experts-exchange.com/")]/..', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var result=null, i=0; result=results.snapshotItem(i); i++) {
	ancestor(result, 'li.sa_wr').style.display='none';
}