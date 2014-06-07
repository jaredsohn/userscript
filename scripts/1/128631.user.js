// ==UserScript==
// @name s/clavier/leopard/g
// @version 4.2
// @description Replaces the word "clavier with "léopard".
// @match *://*/*
// ==/UserScript==
//
// traduit de l'extension s/keyboard/leopard : https://userscripts.org/scripts/show/128626

function leopardize(str) {
  return str.replace(/clavier/g,"léopard")
    .replace(/Clavier/g,"Léopard")
    .replace(/CLAVIER/g,"LÉOPARD")
    .replace(/c[Ll][Aa][Vv][Ii][Ee][Rr]/g,"léopard")
    .replace(/C[Ll][Aa][Vv][Ii][Ee][Rr]/g,"Léopard")
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