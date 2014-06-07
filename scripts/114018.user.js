// ==UserScript==
// @name           RSC ad removal
// @namespace      rsc
// @description    Remove ad areas
// @include        http://forums.zybez.net/*
// ==/UserScript==

function removeElement(node) {
    node.parentNode.removeChild(node);
}
removeElement(document.getElementById("aleader"));
removeElement(document.getElementById("bleader"));
