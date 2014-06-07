// ==UserScript==
// @name           Tumblr  - Display only reblogs
// @namespace      http://www.carr-it.net
// @description    Display only reblogged posts in Tumblr dashboard and likes page
// @include        http*://www.tumblr.com/dashboard*
// @include        http*://www.tumblr.com/likes* 
// @grant          none
// @version        1.2
// ==/UserScript==

void(function() {
var CLASS_NAME = "post";
var REBLOGGED = "reblogged";

var lastLength = 0;
var running = false;

var REPLACE = function() {
  if (running == true) {
    return;
  }
  running = true;
  var elements = document.getElementsByClassName(CLASS_NAME);
  if (elements.length == lastLength) {
	running = false;
	return;
  }

  for (var i = lastLength; i < elements.length; i++, lastLength++) {
    if (elements[i].style.display != 'none') {
		elements[i].style.display = 'none';
	}
	if (-1 < elements[i].innerHTML.indexOf(REBLOGGED)) {
      if (elements[i].style.display != 'block') {
		elements[i].style.display = 'block';
	  }
      continue;
    }
  }
  running = false;
  return;
  }

setInterval(REPLACE, 1000)
// running = false;
// REPLACE.addEventListener('DOMSubtreeModified', REPLACE,true);

})();