// ==UserScript==
// @name SO Badgers
// @version 1.0
// @description Replaces the word "badger" with "badger".
// @match *://*.stackexchange.com/*
// @match *://*.stackoverflow.com/*
// @match *://*.serverfault.com/*
// @match *://*.superuser.com/*
// @license License In Three Lines
// ==/UserScript==

// Modified from s/keyboard/leopard/g, Copyright 2013 Stuart P. Bentley.
// This work may be used freely as long as this notice is included.
// The work is provided "as is" without warranty, express or implied.

// The pattern to match
var keyboard_pattern = /(badge)[^r]/ig

// which letters in "keyboard" get replaced with which in "leopard"
var leopard_subs = {
  'k': 'l', 'K': 'L',
  'y': 'o', 'Y': 'O',
  'b': 'p', 'B': 'P'
};

// construct "leopard" replacement for "keyboard" components
function replacement_leopard(match,badge,e,y,b,ard){
    return badge + 'r' + match.slice(5);
}

// Transform all instances of 'keyboard' in a string into 'leopard'
function leopardize(str) {
  return str.replace(keyboard_pattern, replacement_leopard)
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
  if (~node.textContent.search(keyboard_pattern)) {
    //flag that content is being replaced so the event it generates
    //won't trigger another replacement
    replacingContent = true
    node.textContent = leopardize(node.textContent)
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
document.title = leopardize(document.title)
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false)
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false)