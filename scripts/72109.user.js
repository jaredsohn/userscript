// ==UserScript==
// @name           TwitterLogo mini
// @namespace      http://zundamaru.blogspot.com/
// @description    Twitterのロゴを極小にします
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function () {
   var logo_img = document.getElementsByTagName('img')[1];
   if (logo_img) {
       logo_img.setAttribute('src','http://a0.twimg.com/a/1269020849/images/twitter_logo_header.png');
       logo_img.setAttribute('width','4');
       logo_img.setAttribute('height','16');
   }

})();