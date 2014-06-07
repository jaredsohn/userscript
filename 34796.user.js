// ==UserScript==
// @name           userscripts blog new comment notifier
// @namespace      znerp
// @description    Shows when new comments have been made to blog posts on us.o
// @include        http://userscripts.org/articles
// ==/UserScript==

var blogPosts = document.evaluate("//div[@id='content']/p/a[contains(@href,'/articles/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var oldComments = eval(GM_getValue("comment count","new Array()"));
var newComments = new Array();
var totalCommentDiff = 0

for (i = blogPosts.snapshotLength - 1; i >= 0; i--) {
  var postNumber = blogPosts.snapshotItem(i).href.match(/articles\/(\d+)/)[1] - 1;
  var commentCount = blogPosts.snapshotItem(i).parentNode.textContent.match(/(\d+) comment/)[1];
  newComments[postNumber] = commentCount;
  
  if (oldComments[postNumber])
    commentDiff = newComments[postNumber] - oldComments[postNumber]
  else
    commentDiff = 0
  
  if (commentDiff != 0) {
    totalCommentDiff += commentDiff
    newComment = document.createElement("font")
    newComment.color = (commentDiff > 0 ? "green" : "red")
    newComment.textContent = "   (" + (commentDiff > 0 ? "+" : "") + commentDiff + ")"
    blogPosts.snapshotItem(i).parentNode.appendChild(newComment)
  }
}

if (totalCommentDiff != 0) {
  subHeading = document.createElement("p")
  subHeading.setAttribute("class", "subtitle")
  subHeading.setAttribute("style", "color: " + (totalCommentDiff > 0 ? "green" : "red"))
  subHeading.textContent = "(" + commentDiff + " new comment" + (Math.abs(commentDiff) == 1 ? '' : 's') + ")"
  h1 = document.evaluate ("//div[@id='content']/h1", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  h1.parentNode.insertBefore(subHeading, h1.nextSibling)
}  

GM_setValue("comment count", uneval(newComments));