// ==UserScript==
// @name           youtube-comment-filter
// @namespace      com.kalevil
// @include        http://www.youtube.com/*
// ==/UserScript==


// settings here:

// keep comments with the minimum score of
var THRESHOLD = 2;
//---

function xpath(query, elem) {
    return document.evaluate(query, elem, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getscore(node) {
  r=xpath(".//span[@class='comments-rating-positive']",node);
  if (r.snapshotLength == 0)
    return 0;

  n=r.snapshotItem(0);
  sval = n.textContent.replace(/[ \n]/g,'');
  return parseInt(sval);

}

function deletenode(node) {
  if (node && node.parentNode) {
    node.parentNode.removeChild(node);
  }
}


// comment containers, r as result
rcontainers = xpath(".//div[@class='comment-container']", document)
var deleteThese=new Array();

// fill the deleteThese array
for(var i = 0; i < rcontainers.snapshotLength; ++i)
{
  node = rcontainers.snapshotItem(i);
  if (getscore(node) < THRESHOLD)
    deleteThese.push(node);
}

// remove the crap
for(var i = 0; i < deleteThese.length; ++i) {
  deletenode(deleteThese[i].parentNode);
}



