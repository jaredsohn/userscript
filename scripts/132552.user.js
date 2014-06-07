// ==UserScript==
// @name           pt douban.com/movie
// @include        https://pt.sjtu.edu.cn/torrents.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
  var url = window.location.href;
  if ( url.match(/XfromDouban=true/i)) {
    var pager = $("html>body>table.mainouter>tbody>tr>td.outer>table.main>tbody>tr>td.embedded>p");
    var torrents =$("html>body>table.mainouter>tbody>tr>td.outer>table.main>tbody>tr>td.embedded>table.torrents");
    var new_body = "<body>"
      +"<table>"
      +$(torrents[0]).html()
      +"</table>"
      +"<p align=center>"
      +$(pager[0]).html()
      +"</p>"
      +"</body>";
    $("body").replaceWith(
      new_body
      );
    $("*").css({
      'background-color' : 'transparent',
      'color' : '#111111'
    });
  }
});
