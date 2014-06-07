// ==UserScript==
// @name           TwitterLogo t
// @namespace      http://zundamaru.blogspot.com/
// @description    Twitterのロゴを[t]一文字に変更します
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function () {
   var logo_img = document.getElementsByTagName('img')[1];
   if (logo_img) {
       logo_img.setAttribute('src','http://a0.twimg.com/a/1269020849/images/twitter_t_logo_outline.png');
       logo_img.setAttribute('width','36');
       logo_img.setAttribute('height','44');
   }

})();