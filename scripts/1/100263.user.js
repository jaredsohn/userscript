// ==UserScript==
// @name           BookWeb 選書ヘルパー
// @namespace      http://penguinlab.jp/
// @include        http://bookweb.kinokuniya.co.jp/*
// ==/UserScript==

(function () {
  // set up jQuery variable
  var $, GM_JQ, checker, letsJQuery;

  // Add jQuery
  GM_JQ = document.createElement("script");
  GM_JQ.src = "http://code.jquery.com/jquery-latest.min.js";
  GM_JQ.type = "text/javascript";

  document.body.appendChild(GM_JQ);

  // Check if jQuery's loaded
  checker = setInterval(function () {
    if (typeof($ = unsafeWindow.jQuery) !== "undefined") {
      clearInterval(checker);
      letsJQuery();
    }
  }, 100);

  // All your GM code must be inside this function
  letsJQuery = function () {
    $("div.pro-des").each(function(){
      var title, subtitle, author, publisher, isbn, price, output;
      title = $("h3 a", this).text();
      subtitle = $("h3", this).text().substring(title.length, 1024);
      author = $(this).text().split(/\n/)[2].split(" ／ ")[0];
      publisher = $(this).text().split(/\n/)[2].split(" ／ ")[1] || "";
      isbn = $("h3 a", this).attr("href").replace(/^.*\/([\dX]+)\.html$/, "$1");
      price = $(this).text().split(/\n/)[4].replace(/^.*￥([\d,]+).*$/, "$1");
      output = '<textarea class="bib" style="font-size:small;width:100%;font-family:sans-serif;">' + title + "\t" + subtitle + "\t" + author + "\t" + publisher + "\t" + isbn + "\t" + price + "</textarea>";
      $(this).append(output);
    });  
  };
}());
