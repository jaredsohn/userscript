// ==UserScript==
// @name Salami-san
// @version 0.1
// @description Replaces every instance of "sasami" with "salami."
// @match *://*/*
// ==/UserScript==

// The pattern to match
var pattern = /(sa)(s)(ami)/ig

var TEXT_NODE = Node.TEXT_NODE || 3

var replacingContent = false

var subs = { "S": "L", "s": "l" }

function replacement(match, sa, s, ami) {
  return sa + subs[s] + ami;
}

function replaceTextContent(node) {
  if (~node.textContent.search(pattern)) {
    //flag that content is being replaced so the event it generates
    //won't trigger another replacement
    replacingContent = true
    node.textContent = node.textContent.replace(pattern, replacement);
    replacingContent = false
  }
}

function changeTextNodes(node) {
  var length, childNodes
  //If this is a text node, change it
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
