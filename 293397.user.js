// ==UserScript==
// @name        Youtube
// @namespace   a
// @include     http://www.youtube.com/
// @include     https://www.youtube.com/
// @version     1
// ==/UserScript==




!(function() {
  window.setTimeout(function check() {
      main();
    window.setTimeout(check, 250);
  }, 250);

  function main() {


a=document.querySelector('a[href="/feed/recommended"]');
//alert(a.href);
a.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';

a=document.querySelector('a[href="/channel/HCwMoMlb5Z8xA"]');
//alert(a[0].href);
a.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';

a=document.querySelector('span[class="yt-subscription-button-subscriber-count-branded-horizontal"]');
//alert(a.title);
a.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';


//    var a = document.getElementsByClassName('feed-author-bubble');
//    for(var i = 0, len = a.length; i < len; i++) {
//      if (/\/feed\/recommended$/.test(a[i].href)) {
//        a[i].parentNode.parentNode.style.display = 'none';
//      }
//    }
  }
})();




