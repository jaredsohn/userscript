// ==UserScript==
// @name The Morror!
// @version 1.0
// @description s/\bH/M/ig
// @match *://*/*
// @license MIT License
// ==/UserScript==

// The pattern to match
//var sub_pattern = /\b[hHmM]/g
var sub_pattern = /\b[hH]/g

// which letters get replaced with which
var letter_subs = {
  'h': 'm', 'H': 'M',
//  'm': 'h', 'M': 'H',
};

function replacement_letter(match){
    return letter_subs[match]
}

function morrify(str) {
  return str.replace(sub_pattern, replacement_letter)
}

// define the noteType value for TEXT_NODEs (the kind we want to replace)
// Some browsers may fail to make this value available - it's 3
var TEXT_NODE = Node.TEXT_NODE || 3

// Flag to signal that we're replacing text, so that change doesn't trigger
// another replacement (technically, that can't happen if all the instances
// of "keyboard" that would trigger a replacement have been replaced with
// "leopard", but it's still good practice)
var replacingContent = false

function replaceTextContent(node) {
  if (~node.textContent.search(sub_pattern)) {
    //flag that content is being replaced so the event it generates
    //won't trigger another replacement
    replacingContent = true
    node.textContent = morrify(node.textContent)
    replacingContent = false
  }
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
document.title = morrify(document.title)
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false)
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false)
