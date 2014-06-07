// ==UserScript==
// @name s/duke/douche/g
// @description replaces instances of duke with douche
// ==/UserScript==

function douche(str) {
    return str.replace(/duke/g,"douche")
        .replace(/Duke/g,"Douche")
        .replace(/DUKE/g,"DOUCHE")
        .replace(/d[Uu][Kk][Ee]/g,"douche")
        .replace(/D[Uu][Kk][Ee]/g,"Douche")
}
var TEXT_NODE = Node.TEXT_NODE || 3

function replaceTextContent(node) {
    var length, children
    if (node.nodeType == TEXT_NODE) {
        node.textContent = douche(node.textContent)
    } else {
        children = node.childNodes
        length = children.length
        for (var i = 0; i < length; ++i) {
            replaceTextContent(children[i])
        }
    }
}

replaceTextContent(document.body)
document.title = douche(document.title)  
