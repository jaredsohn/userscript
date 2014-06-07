// ==UserScript==
// @name          twitter-auto-scroll-on-new-tweet
// @namespace     http://userscripts.org/users/kawaz
// @description   新しいツイートの挿入後に読み途中のツイートまで自動でスクロールする。
// @include       http://twitter.com/*
// ==/UserScript==
(function(){
  var latest = null;
  var stream = document.querySelector(".stream");
  if(stream) {
    stream.addEventListener('mousedown', function(e){
      if(e.target.id == 'new-tweets-bar'){
        latest = document.querySelector(".stream-items .stream-item");
      }
    });
    stream.addEventListener('click', function(e){
      if(e.target.id == 'new-tweets-bar' && latest){
        window.setTimeout(function(){
          latest.scrollIntoViewIfNeeded(true);
          latest.style.borderTop = '2px red solid';
          latest.style.marginTop = '-2px';
        }, 100);
      }
    });
  } else {
    window.setTimeout(arguments.callee, 1000);
  }
})();
