// ==UserScript==
// @name s/shit/poop/g
// @version 1.0
// @description Replaces the word "shit" with "poop".
// @match *://*/*
// @license MIT License
// ==/UserScript==

//based on http://userscripts.org/scripts/review/128626

//which letters in "shit" get replaced with which in "poop"
var leopard_subs = {
  's': 'p', 'S': 'P',
  'h': 'o', 'H': 'O',
  'i': 'o', 'I': 'O',
  't': 'p', 'T': 'P'
};

//Transform all instances of 'shit' in a string into 'poop'
function leopardize(str) {
  return str.replace(/(s)(h)(i)(t)/ig, function(match,s, h, i, t){
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