// ==UserScript==
// @name           Tumblr - Don't show reblogs
// @namespace      http://www.carr-it.net
// @include        http://www.tumblr.com/dashboard*
// @include        http*://www.tumblr.com/likes* 
// @grant          none
// @version        1.3
// @description    Parse the Stumblr dashboard and set all reblog posts as hidden

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
    if (elements[i].style.display != 'block') {
		elements[i].style.display = 'block';
	}
	if (-1 < elements[i].innerHTML.indexOf(REBLOGGED)) {
      if (elements[i].style.display != 'none') {
		elements[i].style.display = 'none';
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