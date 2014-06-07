// ==UserScript==
// @name          Douban Goucheng Blocker
// @description   Block all comments by Goucheng on www.douban.com.
// @include       http://www.douban.com/group/topic/*
// ==/UserScript==

var allComments, thisComment;
var id = "1255125"; // Goucheng's id

allComments = document.evaluate(
"//tr/td/span/h4/a[@href='/people/" + id + "/']",
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);

// remove comments
if(allComments){
  for(var i = 0; i < allComments.snapshotLength; ++i){
    thisComment = allComments.snapshotItem(i)
      .parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    thisComment.parentNode.removeChild(thisComment.nextSibling);
    thisComment.parentNode.removeChild(thisComment);
  }
}