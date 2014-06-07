// ==UserScript==
// @name           Yahoo Meme Infinite Scroll
// @description    Infinite scroll (Auto-Pager) to Yahoo Meme Dashboard 
// @include        http://meme.yahoo.com/dashboard/
// @require        http://updater.usotools.co.cc/62123.js
// @Version        0.1.1_20091116 - Initial Version
// @Licence        MIT
// @Author         Bruno Caimar - bruno.caimar@gmail.com
//
// ==/UserScript==
(function () {
  $ = unsafeWindow.jQuery;
  $(window).scroll(function () {
    try {
      if ($('#button_next')) {
        var nextButtonPosition = $('#button_next').offset().top;
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if (scrollPosition >= nextButtonPosition) {
          $('#button_next').click();
        }
      }
    } catch (err) {
      GM_log('Too Bad! Some error occurred! ' + err);
    }
  });
})();