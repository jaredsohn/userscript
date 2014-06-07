// ==UserScript==
// @name        Plus1Times0
// @namespace   https://github.com/kvonhorn/Plus1Times0
// @description Removes +1 comments from github issues
// @downloadURL https://github.com/kvonhorn/Plus1Times0/raw/master/Plus1Times0.user.js
// @include     https://github.com/*/issues/*
// @version     20120524
// @run-at      document-end
// ==/UserScript==

// I found the following github issue: https://github.com/twitter/bootstrap/issues/1679,
// which contained far too many +1 comments for my taste.  This script culls those comments.

// License info: This software is free and in the public domain.

/*if(!('undefined' === typeof(unsafeWindow)) && unsafeWindow.console && unsafeWindow.console.log) {
    // Use Firebug's console if it's available
    GM_log = unsafeWindow.console.log;
}*/

function plus1Times0() {
  GM_log('plus1Times0()');
  var regexPlus1 = /\n.{0,20}?\s\+[1-9](\s.{0,80}?)??\n|^\s*\+[1-9]|\+[0-9]\W{1,10}?$|^\s+?$/;

  // Iterate over every comment
  commentContainers = document.getElementsByClassName('js-comment-container');
  for(var n = commentContainers.length - 1; n > 0; n--) {
    frag = commentContainers[n];

    // Get article title text
    contentBodies = frag.getElementsByClassName('content-body');
    comment = contentBodies[0];
    commentText = comment.textContent;
    GM_log("Comment " + n + ": " + commentText);

    plus1Comment = regexPlus1.test(commentText, 'i');
    if(plus1Comment) {
        // Remove the offending js-comment-container
        GM_log('Removing the comment: ' + commentText);
        parentNode = frag.parentNode;
        parentNode.removeChild(frag);
    }
  }
  return true;
}

plus1Times0();
