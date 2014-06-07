// ==UserScript==
// @name Smacky Bum Face
// @version 1.0
// @description Replaces all occurrences of "David Cameron" with "Smacky Bum Face"
// @match *://*/*
// ==/UserScript==

function smackem(str) {
  return str.replace(/David Cameron/ig,"Smacky Bum Face")
    .replace(/George Osborne/ig,"Sniveling Oik")
}

function replaceTextContent(node) {
  var length, childNodes
  if (node.nodeType == Node.TEXT_NODE) {
    node.textContent = smackem(node.textContent)
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      replaceTextContent(childNodes[i])
    }
  }
}

replaceTextContent(document.body)
document.title = smackem(document.title)
