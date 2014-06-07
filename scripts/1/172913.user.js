// ==UserScript==
// @name s/love/hate/g
// @version 0.4
// @description Replaces the word "love" with "hate".
// @match *://*/*
// @license MIT License
// @updateURL http://userscripts.org/scripts/source/172913.meta.js
// @downloadURL https://userscripts.org/scripts/source/172913.user.js
// ==/UserScript==

// The pattern to match
var love_pattern = /(l)(o)(v)e/ig

// which letters in "love" get replaced with which in "hate"
var hate_subs = {
  'l': 'h', 'L': 'H',
  'o': 'a', 'O': 'A',
  'v': 't', 'V': 'T'
};

// construct "hate" replacement for "love" components
function replacement_hate(match,l,o,v){
    return hate_subs[l] +  hate_subs[o] + hate_subs[v] + e
}

// Transform all instances of 'love' in a string into 'hate'
function hatify(str) {
  return str.replace(love_pattern, replacement_hate)
}

// define the noteType value for TEXT_NODEs (the kind we want to replace)
// Some browsers may fail to make this value available - it's 3
var TEXT_NODE = Node.TEXT_NODE || 3

// Flag to signal that we're replacing text, so that change doesn't trigger
// another replacement (technically, that can't happen if all the instances
// of "love" that would trigger a replacement have been replaced with
// "hate", but it's still good practice)
var replacingContent = false

function replaceTextContent(node) {
  if (~node.textContent.search(love_pattern)) {
    //flag that content is being replaced so the event it generates
    //won't trigger another replacement
    replacingContent = true
    node.textContent = hatify(node.textContent)
    replacingContent = false
  }
}

function changeTextNodes(node) {
  var length, childNodes
  //If this is a text node, hatify it
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
document.title = hatify(document.title)
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false)
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false)