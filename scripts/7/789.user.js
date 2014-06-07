/*
 Amazon Music Helper

 Version 0.02
 (C) 2005 Jesse Andrews - Licensed under the GPL v2 or later

 Useful on pages like: http://www.amazon.com/exec/obidos/tg/browse/-/561964/anotherjesse-20/102-0929667-6847321

 Changelog: 
  0.03 - wrap it with a (function() { code })(); to help stop problems?
  0.02 - rewrite urls on pages that say "Music Downloads"

*/

// ==UserScript==
// @name          Amazon Music Helper
// @namespace     http://overstimulate.com/
// @description   Creates a direct link to the download from Free Music Downloads
// @include       http://amazon.com*
// @include       http://www.amazon.com*
// ==/UserScript==

(function() {
if (document.title.match('Music Downloads')) {
  links = document.getElementsByTagName('A')
  for (i=0; i<links.length; i++) {
    link = links[i];
    d = link.href.match('amazon.com/exec/obidos/tg/detail/-/\([^/]*\)/\([^?]*\)?')
    if (d && link.parentNode.tagName == 'B') {
      link.href= 'http://www.amazon.com/exec/obidos/clipserve/' + d[1] + '001001' + '/1/' + d[2];
    }
  } 
}

})();
