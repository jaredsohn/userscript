// ==UserScript==
// @name           Enlarge Flickr Feed Photo on Google Reader
// @namespace      http://userscripts.org/users/40991
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// ==/UserScript==

document.getElementById('chrome').addEventListener('DOMNodeInserted', function(e) {
  if(e.target.tagName && e.target.tagName == 'DIV' && /entry\s?/.test(e.target.className)) {
    var imgs = e.target.getElementsByTagName('img');
    for(var x in imgs) {
      var i = imgs[x];
      if(/.*static\.flickr.*_m\.\w+$/.test(i.src)) {
        i.style.width = i.style.height = "inherit";
        i.src = i.src.replace(/_m\.(\w+)$/, ".$1");
      }
    }
  }
}, false);