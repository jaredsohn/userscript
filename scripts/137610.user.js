// ==UserScript==
// @name       Tweet LineBreaker for Twitter.com
// @namespace  http://twitter.com/foooomio
// @version    1.0.1
// @description  Replace linebreak codes with BR tags in tweets
// @include    http://twitter.com/*
// @include    https://twitter.com/*
// ==/UserScript==

(function(d) {
  
  function func() {
    var tweets = d.getElementsByClassName('js-tweet-text');
    
    for(var i = 0, max = tweets.length; i < max; i++) {
      var tw = tweets[i];
      if(tw.getAttribute('data-linebreak'))
        continue;
      
      var tx = tw.innerHTML;
      if(tx.indexOf("\n") == 0) {
        tx = tx.replace(/\n/, "");
      }
      tw.innerHTML = tx.replace(/\n/g, "<br>");
      tw.setAttribute('data-linebreak', 'done');
    }
  }
  
  var timer = null;
  d.addEventListener('DOMNodeInserted', function(e) {
    var cn = e.target.className;
    if(cn && !cn.indexOf("stream-item"))
      return;
    
    clearTimeout(timer);
    timer = setTimeout(func, 50);
  }, false);
  
  func();
  
})(document);
