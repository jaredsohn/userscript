// ==UserScript==
// @name unLkt.es
// @description Elimina los enlaces de lkt.es
// @author Santies
// @include *
// ==/UserScript==
function removelkt(node){
node.innerHTML = node.innerHTML
    node.replace("http://lkt.es/16=", "");
}
function nodeInserted(event) {
    removelkt(event.target);
}
removelkt(document);
document.addEventListener('DOMNodeInserted', function(event) {
        removelkt(event.target);
    }, false);