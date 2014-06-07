// ==UserScript==
// @name           Twitter to Favstar
// @namespace      http://twitter.com/foooomio
// @version        1.0.4
// @description    各ツイートにFavstarへのリンクを追加します。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function(d) {
  
  var LINK = d.createElement('a');
  LINK.setAttribute("class", "favstar-link pretty-link");
  LINK.innerHTML = "<b>★Favstar</b>";
  
  var BASE_URL = "http://favstar.fm/users";
  
  function func() {
    var tweets = d.getElementsByClassName('tweet');
    
    for(var i = 0, max = tweets.length; i < max; i++) {
      var context = tweets[i].getElementsByClassName('context')[0];
      if(context.getElementsByClassName('favstar-link')[0])
        continue;
      
      var clone = LINK.cloneNode(true);
      var tweetId = tweets[i].getAttribute('data-tweet-id');
      var screenName = tweets[i].getAttribute('data-screen-name');
      clone.href = [BASE_URL, screenName, "status", tweetId].join("/");
      
      context.insertBefore(clone, context.firstChild);
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