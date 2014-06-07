// ==UserScript==
// @name           Instapaper: add article count
// @namespace      http://relaxedcolumn.blog8.fc2.com/
// @description    add article count of "Unread" and "Starred"
// @include        http://www.instapaper.com/u*
// @include        http://www.instapaper.com/starred*
// ==/UserScript==

(function() {

var node,          // a node that will be attached article count
    original_text, // original text of the node
    count;         // article count

// find the node
Array.slice(
    document.querySelectorAll("#categoryHeader > span")
).forEach(function(dot) {
    var next = dot.nextSibling;

    // that is the node whose next sibling contains non-blank characters
    if(next.textContent.match(/\S+/)) {
        // preserve parameter
        node = next;
        original_text = next.textContent;
        count = document.querySelectorAll("#bookmark_list > div").length

        // add count
        next.textContent += "(" + count + ") ";
    }
});

// add event to archive buttons
Array.slice(
    document.querySelectorAll("#bookmark_list .archiveButton")
).forEach(function(button) {
    button.addEventListener("click", function() {
        node.textContent = original_text + "(" + (--count) + ") ";
    }, false);
});

// incriment count with AutoPagerize
document.addEventListener('AutoPagerize_DOMNodeInserted', function() {
    count = document.querySelectorAll("#bookmark_list > div").length
    node.textContent = original_text + "(" + count + ") ";
}, false);

})();