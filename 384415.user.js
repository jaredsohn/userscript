// ==UserScript==
// @name        Google1YearShow
// @namespace   https://twitter.com/akameco
// @description 検索ツールの期間1年を表示
// @include     https://www.google.co.jp/search?*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @version     1.00
// @grant       none
// ==/UserScript==
(function($) {
    let google = {
      isYear: function(url) {
        return url.match(/tbs=qdr:y/) ? true : false;
      },
      link: function(url, text) {
        $('#appbar').after('<div id="gmyear"><a href=' + url + '>' + text + '</a></div>');
        $('#gmyear a').css({
            'color': '#777777',
            'display':'inline-block',
            'text-decoration': 'none',
            'margin': '10px 6px 0 135px'})
        .hover(
          function() {
            $(this).css('color','#222222');
          },
          function() {
            $(this).css('color','#777777');
          }
        )
        .click(function() {
            $(this).css('color','red');
        });
      }
    };
    $(document).ready(function() {
        let url = decodeURIComponent(document.URL);
        if (google.isYear(url)) {
          google.link(url.replace(/&tbs=qdr:y/,'&tbs=0'),'期間指定なし');
        } else {
          url = url.match(/&tbs=0/) ? url.replace(/&tbs=0/,'&tbs=qdr:y') : url + '&tbs=qdr:y';
          google.link(url,'一年以内');
        }
    });
})(jQuery);

