// ==UserScript==
// @name s/teclado/leopardo/g
// @version 4.2
// @description Replaces the word "teclado" with "leopardo".
// @match *://*/*
// ==/UserScript==
//
// traduccion de la extension s/keyboard/leopard : https://userscripts.org/scripts/show/128626

function leopardize(str) {
  return str.replace(/teclado/g,"leopardo")
    .replace(/Teclado/g,"Leopardo")
    .replace(/TECLADO/g,"LEOPARDO")
    .replace(/t[Ee][Cc][Ll][Aa][Dd][Oo]/g,"leopardo")
    .replace(/T[Ee][Cc][Ll][Aa][Dd][Oo]/g,"Leopardo")
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