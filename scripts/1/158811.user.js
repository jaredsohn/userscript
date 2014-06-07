// ==UserScript==
// @name           Big Photos from Tumblr on Google Reader
// @namespace      Haluk ilhan
// @description    Big, Large, High Quality Images, Photos, Pictures from Tumblr rss feeds, blogs on google reader
// @version        0.1.1
// @include        http://*.google.tld/reader/view/*
// @include        https://*.google.tld/reader/view/*
// ==/UserScript==
document.getElementById('chrome').addEventListener('DOMNodeInserted', function(e) {
  if(e.target.tagName && e.target.tagName == 'DIV' && /entry\s?/.test(e.target.className)) {
    var imgs = e.target.getElementsByTagName('img');
    for(var x in imgs) {
      var i = imgs[x];
        i.style.maxHeight = "888px";
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