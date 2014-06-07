// ==UserScript==
// @name           InoReader: enlarge Tumblr images
// @namespace      http://userscripts.org/users/joshg253
// @version        0.2
// @description    Enlarges Tumblr images in feeds.
// @include        http*://beta.inoreader.com/*
// ==/UserScript==

document.getElementById('reader_pane').addEventListener('DOMNodeInserted', function(e) {
  if(e.target.tagName && e.target.tagName == 'DIV' && /article_content/.test(e.target.className)) {
    var imgs = e.target.getElementsByTagName('img');
    for(var x in imgs) {
      var i = imgs[x];
        var a = i.src
        if(a.indexOf("tumblr") > -1){
          i.src = i.src.replace("_500.jpg", "_1280.jpg");
          i.onerror = function () {
  		    this.src = this.src.replace("_1280.jpg", "_500.jpg");
		  };
        }
    }
  }
}, false);