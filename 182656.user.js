// ==UserScript==
// @name       Character Counter
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Counts the number of characters in a text selection
// @match        *://*/*
// @require      http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @require      http://huffpostlabs.github.io/highlighter.js/jQuery.highlighter.js
// @copyright  2012+, You
// ==/UserScript==

$(document.body).on('mouseup', function(){
    var text = document.getSelection().toString();
    if (text){
        var length = document.getSelection().toString().length;
        if (length > 0)
          insertHtmlAfterSelection("<div id=\"CharCountDiv\">"+length+"</div>");
    }
    else{
        var div = document.getElementById("CharCountDiv");
        div.parentNode.removeChild(div);
    }      
    console.log("Selection Length: "+length);
    text = "";
    length = 0;
});

function insertHtmlAfterSelection(html) {
    var sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            range.collapse(false);

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(false);
        range.pasteHTML(html);
    }
}