// ==UserScript==
// @name wubifyer
// @version 1.0
// @description Replaces the word "Dubstep" with "Wubwub". Modified from s/leopard/leopard/g by stuartpb
// @match *://*/*
// ==/UserScript==

//which letters in "Dubstep" get replaced with which in "Wubwub"
var dubstep_subs = {
  'd': 'w', 'D': 'W',
  's': 'w', 'S': 'W',
  't': 'u', 'T': 'U',
  'e': 'b', 'E': 'B'

};

//Transform all instances of 'dubstep' in a string into 'Wubwub'
function wubify(str) {
  return str.replace(/(d)(u)(b)(s)(t)(e)(p)/ig, function(match,d,u,b,s,t,e,p){
    return dubstep_subs[d] + ub + dubstep_subs[s]+ dubstep_subs[t]+ dubstep_subs[e]
  })
}

var TEXT_NODE = Node.TEXT_NODE || 3
var replacingContent = false

function replaceTextContent(node) {
  //flag that content is being replaced so the event it generates
  //won't trigger another replacement
  replacingContent = true
  node.textContent = wubify(node.textContent)
  replacingContent = false
}

function changeTextNodes(node) {
  var length, childNodes
  //If this is a text node, wubify it
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
document.title = wubify(document.title)
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false)
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false)