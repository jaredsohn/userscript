// ==UserScript==
// @name fb-fun
// @version 1.0.0
// @description replaces POOPED with pooped.
// @match *://*/*
// ==/UserScript==

function blooperize(str) {
  return str.replace(/tagged/gi,"POOPED")
}

var TEXT_NODE = Node.TEXT_NODE || 3

function replaceTextContent(node) {
  var length, childNodes
  if (node.nodeType == TEXT_NODE) {
    node.textContent = blooperize(node.textContent)
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      replaceTextContent(childNodes[i])
    }
  }
}

replaceTextContent(document.body)
document.title = blooperize(document.title)