// ==UserScript==
// @name           InoReader: enlarge Blogspot photos
// @namespace      http://userscripts.org/users/joshg253
// @version        0.2
// @description    Enlarges Blogspot images in feeds.
// @include        http*://beta.inoreader.com/*
// ==/UserScript==

document.getElementById('reader_pane').addEventListener('DOMNodeInserted', function(e) {
  if(e.target.tagName && e.target.tagName == 'DIV' && /article_content/.test(e.target.className)) {
    var imgs = e.target.getElementsByTagName('img');
    for(var x in imgs) {
      var i = imgs[x];
        var a = i.src
        if(a.indexOf("blogspot") > -1){
          i.src = i.src.replace("/s400/", "/s1600/");
          i.onerror = function () {
  		    this.src = this.src.replace("/s1600/", "/s400/");
		  };
		  i.style.width = i.style.height = "inherit";
        }
    }
  }
}, false);