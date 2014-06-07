// ==UserScript==
// @name           Google Code Repository Link
// @namespace      www.google.com
// @description    Set default "Source" link to the source repository.
// @include        http://code.google.com/p/*
// ==/UserScript==

/*
* Yes, I always want to see the source first, then I'll think about checking it
* out, thank you!
*/

var GoogleCodeRepoLink = function () {
  var links = document.getElementsByTagName('a');
  var done = false;
  for (var i in links) {
    if (done) {
      break;
    }
    var l = links[i];
    var h = l.getAttribute("href");
    if (h.match('source/checkout')) {
      l.href = l.href.replace('source/checkout', 'source/browse');
      done = true;
    }
  }
}

GoogleCodeRepoLink();



