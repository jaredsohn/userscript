// ==UserScript==
// @name          Addventure comment board enhancements
// @description	  Rewrite all comment links on the Anime Addventure to auto-scroll to the comment rather than hoping that the comment tree isn't too extensive. Also, change the page titles for more meaningful history entries and add a link to return to the fully un-collapsed view.
// @include       http://addventure.bast-enterprises.de/display_comment.php*
// ==/UserScript==

/* Allow the user to select some potentially unwanted features at runtime (DISABLED DUE TO GREASEMONKEY BUG)*/
var autoscrollToComment = GM_getValue('autoscrollToAddventureComment', true);
/*GM_registerMenuCommand('Addventure Comment Tweaks: '+ (autoscrollToComment ? "Don't a" : "A") +'uto-scroll to the comment itself', function() {
	GM_setValue('autoscrollToAddventureComment', !autoscrollToComment);
	location.reload();
});*/

/* The main body of the script */
(function() {
    try {
        /* Rewriting the page title for more meaningful history entries */
        episodeNum = window.location.search.match(/[?&]episode=(\d+)/)[1];
        commentNum = window.location.search.match(/[?&]n=(\d+)/)[1];
        document.title = "Addventure: Ep. #" + episodeNum + ", Comment #"+ commentNum;
        
        /* Add a "show all comments" link when not already doing so*/
        if ((commentNum != 0) && (results = document.evaluate("//b[contains(text(),'List of Comments:')]", 
                    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null))) {
            temp = results.snapshotItem(0);
            
            nLink = document.createElement("a");
            nLink.setAttribute("href",window.location.href.replace(/([?&])n=\d+/,"$1n=0"));
            nLink.appendChild(document.createTextNode("show all"));
            nClose = document.createTextNode(")");
            temp.parentNode.insertBefore(nClose,temp.nextSibling);
            temp.parentNode.insertBefore(nLink,nClose);
            temp.parentNode.insertBefore(document.createTextNode("  ("),nLink);
        }
        
        /* Scrolling to the comment */
            if (autoscrollToComment && (results = document.evaluate("//b[contains(text(),'Reading Comment:')]", 
                    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null))) {
                if (temp = results.snapshotItem(0)) {                
                    commentTop = temp.offsetTop;
                    while (temp = temp.offsetParent) { commentTop += temp.offsetTop; }
                    window.scroll(0,commentTop);
                }
            }
    } catch (e) { alert("UserScript exception: " + e); }
}
)();
