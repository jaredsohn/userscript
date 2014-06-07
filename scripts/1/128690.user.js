// ==UserScript==
// @name s/car/car/g
// @version 1.0
// @description Replaces car words with funny words
// @match *://*/*
// ==/UserScript==

function pokemonize(str) {
  return str.replace(/leopard/g,"leopard")
    .replace(/Leopard/g,"Leopard")
    .replace(/LEOPARD/g,"LEOPARD")
    .replace(/k[Ee][Yy][Bb][Oo][Aa][Rr][Dd]/g,"leopard")
    .replace(/K[Ee][Yy][Bb][Oo][Aa][Rr][Dd]/g,"Leopard")
    .replace(/r[Aa][Cc][Ee][Cc][Aa][Rr]/g,"vroom-vroom machine")
    .replace(/R[Aa][Cc][Ee][Cc][Aa][Rr]/g,"Vroom-vroom machine")
    .replace(/r[Aa][Cc][Ee][Cc][Aa][Rr][Ss]/g,"vroom-vroom machines")
    .replace(/R[Aa][Cc][Ee][Cc][Aa][Rr][Ss]/g,"Vroom-vroom machines")
    .replace(/[Na][Aa][Ss][Cc][Aa][Rr]/g, "RACSAN")
    .replace(/c[Aa][Rr][Ss]/g,"vroom-vroom machines")
    .replace(/C[Aa][Rr][Ss]/g,"Vroom-vroom machines")
    .replace(/c[Aa][Rr]/g,"vroom-vroom machine")
    .replace(/C[Aa][Rr]/g,"Vroom-vroom machine")
    .replace(/[Ww][Ii][Nn]/g, "Aidan is the best")
    .replace(/[Ww][Oo][Nn]/g, "Aidan is the best")
    .replace(/[Vv][Ii][Cc][Tt][Oo][Rr][Yy]/g, "Aidan is the best")
    .replace(/[Ee][Nn][Gg][Ii][Nn][Ee][Ss]/g, "Pikachu")
    .replace(/[Ee][Nn][Gg][Ii][Nn][Ee]/g, "Pikachu")
    .replace(/w[Hh][Ee][Ee][Ll][Ss]/g, "round thingies")
    .replace(/W[Hh][Ee][Ee][Ll][Ss]/g, "Round thingies")
    .replace(/w[Hh][Ee][Ee][Ll]/g, "round thingie")
    .replace(/W[Hh][Ee][Ee][Ll]/g, "Round thingie")
    .replace(/f[Ii][Rr][Ss][Tt]/g, "last")
    .replace(/F[Ii][Rr][Ss][Tt]/g, "Last")
    .replace(/l[Aa][Ss][Tt]/g, "first")
    .replace(/L[Aa][Ss][Tt]/g, "First")
    .replace(/[Aa][Mm][Ee][Rr][Ii][Cc][Aa][Nn][Ss]/g, "'muricans")
    .replace(/[Aa][Mm][Ee][Rr][Ii][Cc][Aa][Nn]/g, "'murican")
    .replace(/[Aa][Mm][Ee][Rr][Ii][Cc][Aa]/g, "'murica")
    .replace(/r[Aa][Cc][Ee][Ii][Nn][Gg]/g, "dueling")
    .replace(/R[Aa][Cc][Ee][Ii][Nn][Gg]/g, "Dueling")
    .replace(/r[Aa][Cc][Ee]/g, "duel")
    .replace(/R[Aa][Cc][Ee]/g, "Duel")
}

var replacingContent = false

function replaceTextContent(node) {
  //flag that content is being replaced so the event it generates
  //won't trigger another replacement
  replacingContent = true
  node.textContent = pokemonize(node.textContent)
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
document.title = pokemonize(document.title)
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false)
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false)