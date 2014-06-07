// ==UserScript==
// @name s/cloud/clown/g
// @version 1.0
// @description Replaces the word "cloud" with "clown".
// @match *://*/*
// @license MIT License
// ==/UserScript==

//which letters in "cloud" get replaced with which in "clown"
var clown_subs = {
  'u': 'w', 'U': 'W',
  'd': 'n', 'D': 'N',
};

//Transform all instances of 'cloud' in a string into 'clown'
function clownize(str) {
  return str.replace(/(k)(e)(y)(b)o(ard)/ig, function(match,k,e,y,b,ard){
    return clown_subs[k] + e +  clown_subs[y] + clown_subs[b] + ard
  })
}

var TEXT_NODE = Node.TEXT_NODE || 3
var replacingContent = false

function replaceTextContent(node) {
  //flag that content is being replaced so the event it generates
  //won't trigger another replacement
  replacingContent = true
  node.textContent = clownize(node.textContent)
  replacingContent = false
}

function changeTextNodes(node) {
  var length, childNodes
  //If this is a text node, clownize it
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
document.title = clownize(document.title)
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false)
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false)
