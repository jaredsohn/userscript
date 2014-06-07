// ==UserScript==
// @name s/facebook/MEDIA WHORE/g
// @version 2.1
// @description Replaces the word "keyboard" with "leopard".
// @match *://*/*
// @updateURL http://userscripts.org/scripts/source/128626.meta.js
// @downloadURL https://userscripts.org/scripts/source/128626.user.js
// ==/UserScript==

function leopardize(str) {
  return str.replace(/facebook/g,"MEDIA WHORE")
    .replace(/Facebook/g,"MEDIA WHORE")
    .replace(/FACEBOOK/g,"MEDIA WHORE")
    .replace(/f[Aa][Ce][Ee][Bb][Oo][Oo][Kk]/g,"MEDIA WHORE")
    .replace(/F[Aa][Ce][Ee][Bb][Oo][Oo][Kk]/g,"MEDIA WHORE")
}

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
  if (node.nodeType == Node.TEXT_NODE) {
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