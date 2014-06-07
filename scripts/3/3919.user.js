// ==UserScript==
// @name        Denest Newsvine        		 
// @author      Lukas Fragodt
// @namespace   http://lukas.fragodt.com/
// @description Denests the new nested comments on Newsvine.
// @include     http://newsvine.com/_news/*
// @include     http://*.newsvine.com/_news/*
// ==/UserScript==

//Note: The comments are sorted in chronological order rather
//than kept in nested order. (Because, really, what would
//be the point otherwise?)

function getElementsByClassRegExp (element, className) {
  var elements = document.getElementsByTagName(element);
  var retVal = new Array();
  for (var i = 0; i < elements.length; i++) {
    if (className.exec(elements[i].className)) {
      retVal.push(elements[i]);
    }
  }
  return retVal;
}

function idSort(a,b) {
  if (a.id > b.id) {
    return 1;
  } else if (b.id > a.id) {
    return -1;
  } else { //Shouldn't happen.
    return 0;
  }
}

var commentsDiv = document.getElementById('commentsDiv');
var comments = getElementsByClassRegExp('div',/^commentbody\ .*$/);
comments.sort(idSort);
for (var i = 1; i < comments.length; i++) {
  commentsDiv.appendChild(comments[i]);
}
commentsDiv.appendChild(comments[0]); //Moves reply block to bottom

//Strip reply icons.
var replyAnchors = getElementsByClassRegExp('a',/^reply$/);
for (var i = 0; i < anchorTags.length; i++) {
    replyAnchors[i].parentNode.removeChild(replyAnchors[i]);
}
