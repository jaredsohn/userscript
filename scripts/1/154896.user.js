// ==UserScript==
// @name C2B Test 01  DO NOT INSTALL
// @version 1.0
// @description Replaces the word "city" with "boob".  This script may not work, if you can fix this, please feel free to do so and upload it to this site, leaving a link in the comments box for this script. Thank you.
// @match *://*/*
// @license MIT License
// ==/UserScript==

//based on http://userscripts.org/scripts/review/128626

//which letters in "city" get replaced with which in "boob"
var leopard_subs = {
  'c': 'b', 'C': 'B',
  'i': 'o', 'I': 'O',
  't': 'o', 'T': 'O',
  'y': 'b', 'Y': 'B'
};

//Transform all instances of 'city' in a string into 'boob'
function leopardize(str) {
  return str.replace(/(c)(i)(t)(y)/ig, function(match,c, i, t, y){
    return leopard_subs[s]+leopard_subs[h]+leopard_subs[i]+leopard_subs[t]
  })
}

var TEXT_NODE = Node.TEXT_NODE || 3
var replacingContent = false

function replaceTextContent(node) {
  //flag that content is being replaced so the event it generates
  //won't trigger another replacement
  replacingContent = true
  node.textContent = leopardize(node.textContent)
  replacingContent = false
}

function changeTextNodes(node) {
  var length, childNodes
  //If this is a text node, leopardize it
  if (node.nodeType == TEXT_NODE) {
    replaceTextContent(node)
  //If this is anything other than a text node, recurse any children
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      changeTextNodes(childNodes[i])
    }
  }
}

function insertion_listener(event) {
  //change any new text nodes in a node that is added to the body
  changeTextNodes(event.target)
}

function cdm_listener(event) {
  //avoid infinite loop by ignoring events triggered by replacement
  if(!replacingContent){
    replaceTextContent(event.target)
  }
}

changeTextNodes(document.body)
document.title = leopardize(document.title)
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false)
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false)