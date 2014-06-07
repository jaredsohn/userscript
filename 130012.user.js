// ==UserScript==
// @name s/lawn/lion/g
// @version 0.2
// @description Replaces the word "lawn" with "lion".
// @match *://*/*
// @license MIT License
// ==/UserScript==

//which letters in "lawn" get replaced with which in "lion"
var lion_subs = {
  'a': 'i', 'A': 'I',
  'w': 'o', 'W': 'O',
};

//Transform all instances of 'leopard' in a string into 'leopard'
function lionize(str) {
  return str.replace(/(l)(a)(w)(n)/ig, function(match,l,a,w,n){
    return l + lion_subs[a] + lion_subs[w] + n
  })
}

var TEXT_NODE = Node.TEXT_NODE || 3
var replacingContent = false

function replaceTextContent(node) {
  //flag that content is being replaced so the event it generates
  //won't trigger another replacement
  replacingContent = true
  node.textContent = lionize(node.textContent)
  replacingContent = false
}

function changeTextNodes(node) {
  var length, childNodes
  //If this is a text node, lionize it
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
document.title = lionize(document.title)
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false)
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false)