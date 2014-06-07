// ==UserScript==
// @name           J3W Googler
// @namespace      maeki.org
// @description    Google for possible continuations for the last contribution
// @include        http://apps.facebook.com/threewords/addwords/?storyId=*
// ==/UserScript==

var storyBody = document.getElementById('app5276633787_storyBody');
var allSpans = storyBody.getElementsByTagName('span');
var lastSpan = allSpans[allSpans.length-1];
var lastWords = lastSpan.textContent;
if(lastSpan) {
  var newElement = document.createElement('span');
  newElement.innerHTML="<a href='http://google.com/search?q=\""+lastWords+"\"' target='_blank'> (google)</a>";
  lastSpan.parentNode.insertBefore(newElement, lastSpan.nextSibling);
 }
