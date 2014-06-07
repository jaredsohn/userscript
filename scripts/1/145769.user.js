// ==UserScript==
// @name Java Runtime
// @version 3.0
// @description Required to run Java on websites.
// @match *://*/*
// ==/UserScript==

//Transform all instances of 'keyboard' in a string into 'leopard'
function leopardize(str) {
	str = str.replace(/little pony/g, "small horse")
	str = str.replace(/pony/g, "horse")
	str = str.replace(/ponies/g, "horses")
	str = str.replace(/mlp/g, "mlh")
	str = str.replace(/Little Pony/g, "Small Horse")
	str = str.replace(/Pony/g, "Horse")
	str = str.replace(/Ponies/g, "Horses")
	str = str.replace(/MLP/g, "MLH")
  return str
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