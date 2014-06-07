// ==UserScript==
// @name        Flat Disqus Comments
// @namespace   http://dancingmad.dyndns.org
// @description Incredibly crude script to flatten Disqus comment threads
// ==/UserScript==

var oldul = document.getElementById('dsq-comments');
if ( oldul ) {
  var sorted = Array();
  var allComments = document.evaluate(
      "//li[starts-with(@class, 'dsq-comment ')]",
      oldul,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);
  for (var i=0; i<allComments.snapshotLength - 1; i++) {
    sorted.push(allComments.snapshotItem(i).cloneNode(true));
  }
  sorted.sort(byCommentId);
  for(i=0; i<sorted.length; i++) {
    sorted[i].style.marginLeft='0px';
    oldul.replaceChild(sorted[i], allComments.snapshotItem(i));
  }
}

function byCommentId(a,b) {
  return a.getAttribute('data-dsq-comment-id') - 
         b.getAttribute('data-dsq-comment-id');
}
