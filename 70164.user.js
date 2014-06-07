// ==UserScript==
// @name          Bloglines navigation
// @namespace     http://jeffpalm.com/bloglines
// @description   Allows you to navigate articles in bloglines using alt+arrows
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/myblogs_display*
// ==/UserScript==

var currentAnchor = -1;
var maxAnchor = -1;

function anchorName(i) {
  return "_" + i;
}

function addAnchors() {
  var hs = document.getElementsByTagName("H3");
  for (var i=0; i<hs.length; i++) {
    var a = document.createElement("A");
    var h = hs[i];
    a.name = anchorName(i);
    maxAnchor++;
    h.parentNode.insertBefore(a,h);
  }
}

function scrollByInc(inc) {
  var newAnchorNum = currentAnchor+inc;
  if (newAnchorNum < 0 || newAnchorNum > maxAnchor) {
    return;
  }
  var newAnchor = anchorName(currentAnchor = newAnchorNum);
  var loc = String(document.location);
  var ihash = loc.indexOf("#");
  if (ihash != -1) {
    loc = loc.substring(0,ihash);
  }
  var newLoc = loc + "#" + newAnchor;
  document.location = newLoc;
}

function addEventListeners() {
  window.addEventListener('keydown',function(e) {
    if      (e.keyCode == 38 && e.altKey) scrollByInc(-1);
    else if (e.keyCode == 40 && e.altKey) scrollByInc(+1);
  },true);
}

function main() {
  addAnchors();
  addEventListeners();
}

main();
