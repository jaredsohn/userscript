// ==UserScript==
// @name          No YouTube G+ Comments
// @description   YouTube G+ comments are less than useless. Remove them.
// @version       0.1
// @include       http://*.youtube.com/*
// ==/UserScript==

(function() {
var holder = document.getElementById("watch-discussion");
if (holder) {
    while(holder.hasChildNodes()){
        holder.removeChild(holder.lastChild);
    }
}
})();
