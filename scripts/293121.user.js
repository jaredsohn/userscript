// ==UserScript==
// @name           caoliu
// @namespace      caoliu2
// @author         FrankXU
// @description    Test
// @include        http://t66y.com/*
// @version        1.1.7
// @grant          none
// @require			http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==\
$().ready(function() {
   $("body ").css({"font-family":"\'Helvetica Neue\'"});
   $(".tips").remove();
  $("a").each(function() {
    var getHref, link, text;
    getHref = $(this).attr("href");
    if (getHref !== void 0) {
      if (getHref.indexOf("http://www.viidii.info/") !== -1) {
        link = $(this).html();
        if (link.indexOf("http://") !== -1) {
          $(this).find("img").remove();
          return $(this).attr("href", $(this).html());
        } else {
          $(this).find("img").remove();
          text = $(this).text().replace(/\s/g, '');
          return $(this).attr("href", text);
        }
      }
    }
  });
  return $("a").not("[href^=\"http\"],[href^=\"https\"],[href^=\"mailto:\"],[href^=\"#\"]").each(function() {
    return $(this).attr("href", function(index, value) {
      if (value.substr(0, 7) !== "http://" && value.substr(0,9) !== "../../../" ) {
        return "http://" + value;
      }
    });
  });
});
