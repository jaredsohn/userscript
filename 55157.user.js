// ==UserScript==
// @name           blogger.com localize dashboard date
// @namespace      kamhungsoh.com
// @description    Convert date format from m/d/yy to d/m/yy.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include        http://www.blogger.com/posts.g*
// ==/UserScript==

$("td.date > span").each(function() {
  var s = $(this).text().replace(/(\d+)\/(\d+)/, '$2\/$1');
  $(this).text(s);
});
