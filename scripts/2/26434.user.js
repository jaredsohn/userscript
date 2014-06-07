// ==UserScript==
// @name          Fix-ml
// @namespace     http://smc.org.in 
// @description   This script helps people to read the pages using Atomic chillu characters by converting them to Unicode 5.0 standard.
// @include       *
// ==/UserScript==



if (document.title) 
	document.title = replaceAanava(document.title);

traverseDomTree();


function replaceAanava(s) {
s = s.replace (/\u0D7A/g, "\u0D23\u0D4D\u200D").replace (/\u0D7B/g,
"\u0D28\u0D4D\u200D").replace (/\u0D7C/g, "\u0D30\u0D4D\u200D").replace
(/\u0D7D/g, "\u0D32\u0D4D\u200D").replace (/\u0D7E/g, "\u0D33\u0D4D\u200D");

return s;
}


function traverseDomTree() {
  var body_element = document.getElementsByTagName("body").item(0);
  traverseDomTree_recurse(body_element, 0);
}

function traverseDomTree_recurse(curr_element, level) {

  var i;

  if (!curr_element) return; // fix current_element is null alert bug

  if(curr_element.childNodes.length <= 0) {
    // leaf node.
    if(curr_element.nodeName == "#text" && curr_element.data) {
		curr_element.data = replaceAanava(curr_element.data);
     }
  } else {
    // traverse each of the children of this node.
    for(i=0; curr_element.childNodes.item(i); i++) {
      traverseDomTree_recurse(curr_element.childNodes.item(i), level+1);
    }
  }
}


