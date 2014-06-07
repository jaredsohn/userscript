// ==UserScript==
// @name s/teclado/leopardo/g
// @version 4.2
// @description Replaces the word "teclado" with "leopardo".
// @match *://*/*
// ==/UserScript==
//
// traduzione dell'estensione s/keyboard/leopard : https://userscripts.org/scripts/show/128626

function leopardize(str) {
  return str.replace(/tastiera/g,"leopardo")
    .replace(/Tastiera/g,"Leopardo")
    .replace(/TASTIERA/g,"LEOPARDO")
    .replace(/t[Aa][Ss][Tt][Ii][Ee][Rr][Aa]/g,"leopardo")
    .replace(/T[Aa][Ss][Tt][Ii][Ee][Rr][Aa]/g,"Leopardo")
}

function replaceTextContent(node) {
  var length, childNodes
  if (node.nodeType == Node.TEXT_NODE) {
    node.textContent = leopardize(node.textContent)
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      replaceTextContent(childNodes[i])
    }
  }
}

replaceTextContent(document.body)
document.title = leopardize(document.title)