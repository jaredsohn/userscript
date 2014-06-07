// ==UserScript==
// @name           Mefight User Blacklist
// @namespace      local
// @include        http://mefightclub.com/comments.php?DiscussionID*
// ==/UserScript==
    
(function () {
    
    // Make an array of all the comment bodies
    var allComments;
    allComments = document.evaluate(
        "//div[@class='CommentBody']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
    var theComment, i, l; 
                   
        
    for(theComment = null, i = 0; (theComment = allComments.snapshotItem(i)); i++) {
        //put u=userid in the following line with a pipe as a delimiter.
        if(theComment.parentNode.innerHTML.match(/u=###|u=###|u=###/)){
            theComment.setAttribute("style","display:none");
        }
    }
}
)();