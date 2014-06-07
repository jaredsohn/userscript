// ==UserScript==
// @name          Douban Comment Counter
// @description   Display comment number (e.g. the 56th comment will be marked "#56") in www.douban.com topics.
// @include       http://www.douban.com/group/topic/*
// ==/UserScript==

var allComments, thisComment, newElement, thisPage, index = 0;

allComments = document.evaluate(
'//tr/td/span/h4', 
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);

thisPage = document.evaluate(
"//span[@class='thispage']", 
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);

if(thisPage && thisPage.snapshotLength > 0){
  var number = parseInt(thisPage.snapshotItem(0).textContent);
  if(!isNaN(number))
    index += (number - 1) * 100;
}

if(allComments){
  for(var i = 0; i < allComments.snapshotLength; ++i){
    thisComment = allComments.snapshotItem(i);
    thisComment.innerHTML = '<b>#'+ (++index).toString() + ' </b>' + thisComment.innerHTML;
  }
}
