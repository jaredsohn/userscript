// ==UserScript==
// @version     1.0
// @name        Douban Rating
// @author      Zhou Meng
// @description Show Douban Rating in Douban List
// @include     http://*.douban.com/doulist/*
// ==/UserScript==

var $;
(function waitJquery() {
  if (!unsafeWindow.jQuery) {
    setTimeout(waitJquery, 100);
  } else {
    $ = unsafeWindow.jQuery;
    doScript();
  }
})();

function doScript() {
  $("div.article table").each(function(i, table) {
    var url = $(table).find("a").attr("href");
    $.get(url, function(data) {
      var rating = $(data).find("strong.rating_num").text();
      if (rating) {
        $(table).find("p.pl").append("<br />" + "评分 : " + rating);
      }
    });
  });
}