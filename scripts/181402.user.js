// ==UserScript==
// @name           InoReader: enlarge NASA Earth Observatory images
// @namespace      http://userscripts.org/users/joshg253
// @version        0.2
// @description    Enlarges images in NASA Earth Observatory feed.
// @include        http*://beta.inoreader.com/*
// ==/UserScript==

document.getElementById('reader_pane').addEventListener('DOMNodeInserted', function(e) {
  if(e.target.tagName && e.target.tagName == 'DIV' && /article_content/.test(e.target.className)) {
    var imgs = e.target.getElementsByTagName('img');
    for(var x in imgs) {
      var i = imgs[x];
      if(/.*eoimages\.gsfc\.nasa\.gov.*_tn\.\w+$/.test(i.src)) {
        i.style.width = i.style.height = "inherit";
        i.src = i.src.replace(/_tn\.(\w+)$/, ".$1");
      }
    }
  }
}, false);
