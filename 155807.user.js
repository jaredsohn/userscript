// ==UserScript==
// @name TEST MC
// @version 3.0
// @description TEST
// @match *://*/*
// @license MIT License
// @updateURL http://userscripts.org/scripts/source/128626.meta.js
// @downloadURL https://userscripts.org/scripts/source/128626.user.js
// ==/UserScript==

//Transform all instances of 'everything' in a string into 'morse code'
function leopardize(str) {
	str = str.replace("A", " .- ")
	str = str.replace("a", " .- ")
                str = str.replace("B", " -... ")
                str = str.replace("b", " -.... ")
                str = str.replace("C", " -.-. ")
                str = str.replace("c", " -.-. ")
                str = str.replace("D", " -.. ")
                str = str.replace("d", " -.. ")
                str = str.replace("E", " . ")
                str = str.replace("e", " . ")
                str = str.replace("F", " ..-.")
                str = str.replace("f", "..-.")
                str = str.replace("G", " --. ")
                str = str.replace("g", " --. ")
                str = str.replace("H", " .... ")
                str = str.replace("h", " .... ")
                str = str.replace("I", " .. ")
                str = str.replace("i", " .. ")
                str = str.replace("J", " .--- ")
                str = str.replace("j", " .--- ")
                str = str.replace("K", " -.- ")
                str = str.replace("k", " -.- ")
                str = str.replace("L", " .-.. ")
                str = str.replace("l", " .-.. ")
                str = str.replace("M", " -- ")
                str = str.replace("m", " -- ")
                str = str.replace("N", " -. ")
                str = str.replace("n", " -. ")
                str = str.replace("O", " --- ")
                str = str.replace("o", " --- ")
                str = str.replace("P", " .--. ")
                str = str.replace("p", " .--. ")
                str = str.replace("Q", " --.- ")
                str = str.replace("q", " --.- ")
                str = str.replace("R", " .-. ")
                str = str.replace("r", " .-. ")
                str = str.replace("S", " ... ")
                str = str.replace("s", " ... ")
                str = str.replace("T", " - ")
                str = str.replace("t", " - ")
                str = str.replace("U", " ..-- ")
                str = str.replace("u", " ..-- ")
                str = str.replace("V", " ...- ")
                str = str.replace("v", " ...- ")
                str = str.replace("W", " .-- ")
                str = str.replace("w", " .-- ")
                str = str.replace("X", " -..- ")
                str = str.replace("x", " -..- ")
                str = str.replace("Y", " -.-- ")
                str = str.replace("y", " -.-- ")
                str = str.replace("Z", " --.. ")
                str = str.replace("z", " --.. ")
                str = str.replace("1", " .---- ")
                str = str.replace("2", " ..--- ")
                str = str.replace("3", " ...-- ")
                str = str.replace("4", " ....- ")
                str = str.replace("5", " ..... ")
                str = str.replace("6", " -.... ")
                str = str.replace("7", " --... ")
                str = str.replace("8", " ---.. ")
                str = str.replace("9", " ----. ")
                str = str.replace("0", " ---- " )
              
  return str.replace("0", " ----- ")
}

var TEXT_NODE = Node.TEXT_NODE || 3
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