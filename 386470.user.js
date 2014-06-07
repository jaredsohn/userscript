// ==UserScript==
// @name        Youtube feather - Always expand description
// @namespace   dx
// @include     *://*.youtube.com/*
// @include     *://youtube.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

(function() {
    if (!window.setFeatherOption) {
        // no feather
        return;
    }
    var ded = document.getElementById("ded");
    var node = document.getElementById("de");
    
    if (!ded || !node) {
        // nothing to work with
        return
    }
    
    ded.removeAttribute("id");
    
    var pnode = node.parentNode;
    pnode.removeChild(node);
    
    var clonode = node.cloneNode(true);
    clonode.style.color = "inherit";
    clonode.style.backgroundColor = "transparent";
    clonode.style.cursor = "auto";
    pnode.appendChild(clonode);
})();