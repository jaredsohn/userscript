// ==UserScript==
// @version 0.1
// @name ArseWipe
// @namespace http://arsewipe.example.com/
// @description This script filters out the irritating little turds clinging to the comments
// @include /^https?://timworstall\.com/[0-9]+/[0-9]+/[0-9]+/.*/
// ==/UserScript==

var comments = document.evaluate("//div[@id='comments']/ul[@id='comment_list']/li", document,
    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < comments.snapshotLength; i++) {
    var author = document.evaluate("p[@class='comment_meta']/strong/descendant::text()",
        comments.snapshotItem(i), null, XPathResult.STRING_TYPE, null);
        
    if(author.stringValue.substring(0, 6) === "Arnald") {
        var comment = document.evaluate("div[@class='entry']/p", comments.snapshotItem(i),
            null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var j = 0; j < comment.snapshotLength; j++) {
            var para = comment.snapshotItem(j);
            if(j === 0) {
                para.innerHTML = "Usual lefty drivel";
            } else {
                para.innerHTML = "";
            }
        }
    }
}
