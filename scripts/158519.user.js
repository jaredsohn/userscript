// ==UserScript==
// @name           avare be son sayfaya git
// @description    avare be son sayfaya git
// @include        http://avare.be/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version        1.0
// ==/UserScript==
$( "li.item" ).each( function() {
  var href = $(this).children("a.someClass").attr( "href" ).replace('.html','');
  var title = $(this).children("span.desc").attr( "title" ).split(/\s+/);
  var sayfa = Math.ceil(title[1] / 26)
  $(this).children("span.desc").after("<span><a href='http://avare.be/sozluk.php?process=word&q="+href+"&sayfa="+sayfa+"#reklam' target='main'>+</a></span>");
});
$("div.today > a").attr("href","http://avare.be/sozluk.php?process=lastmonth");