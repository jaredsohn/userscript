// ==UserScript==
// @name Prank Script Caesar Cypher
// @version 3.0
// @description Changes all text on webpages and text entered onto pages, such as chatrooms, into caesarian cypher e.g A becomes D, B becomes E etc.
// @match *://*/*
// @license MIT License
// @updateURL http://userscripts.org/scripts/source/128626.meta.js
// @downloadURL https://userscripts.org/scripts/source/128626.user.js
// ==/UserScript==

//Transform all instances of 'everything' in a string into 'morse code'
function leopardize(str) {
	str = str.replace("A", "D")
	str = str.replace("a", "d")
                str = str.replace("B", "E")
                str = str.replace("b", "e")
                str = str.replace("C", "F")
                str = str.replace("c", "f")
                str = str.replace("D", "G")
                str = str.replace("d", "g")
                str = str.replace("E", "H")
                str = str.replace("e", "h")
                str = str.replace("F", "I")
                str = str.replace("f", "i")
                str = str.replace("G", "J")
                str = str.replace("g", "j")
                str = str.replace("H", "K")
                str = str.replace("h", "K")
                str = str.replace("I", "L")
                str = str.replace("i", "l")
                str = str.replace("J", "M")
                str = str.replace("j", "m")
                str = str.replace("K", "N")
                str = str.replace("k", "n")
                str = str.replace("L", "O")
                str = str.replace("l", "P")
                str = str.replace("M", "p")
                str = str.replace("m", "Q")
                str = str.replace("N", "q")
                str = str.replace("n", "R")
                str = str.replace("O", "S")
                str = str.replace("o", "s")
                str = str.replace("P", "T")
                str = str.replace("p", "t")
                str = str.replace("Q", "U")
                str = str.replace("q", "u")
                str = str.replace("R", "V")
                str = str.replace("r", "v")
                str = str.replace("S", "W")
                str = str.replace("s", "w")
                str = str.replace("T", "X")
                str = str.replace("t", "x")
                str = str.replace("U", "Y")
                str = str.replace("u", "y")
                str = str.replace("V", "Z")
                str = str.replace("v", "z")
                str = str.replace("W", "A")
                str = str.replace("w", "a")
                str = str.replace("X", "B")
                str = str.replace("x", "b")
                str = str.replace("Y", "C")
                str = str.replace("y", "c")
                str = str.replace("Z", "D")
                str = str.replace("z", "d")
                str = str.replace("1", "4")
                str = str.replace("2", "5")
                str = str.replace("3", "6")
                str = str.replace("4", "7")
                str = str.replace("5", "8")
                str = str.replace("6", "9")
                str = str.replace("7", "0")
                str = str.replace("8", "1")
                str = str.replace("9", "2")
                str = str.replace("0", "3" )
              
  return str.replace("0", "3")
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