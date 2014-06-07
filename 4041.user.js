// ==UserScript==
// @name          Softpedia  forum Adbot Killer
// @namespace     http://mozilla.wikicities.com/
// @include       http://forum.softpedia.com/index.php?*showtopic=*
// @description	  Kills the adbot on the softpedia forum
// ==/UserScript==

(function() {
  if(document.location.href.match(/showtopic\=\d/)) {
    var spans = document.getElementsByTagName('span');
    if(!spans) return;
    for(i = 0; i < spans.length; i++) {
      var span = spans[i];
      if(span.className == 'normalname') {
        if(span.firstChild.firstChild.nodeValue == 'SoftPedia Ad') {
          span.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        }
      }
    }
  }
})();

