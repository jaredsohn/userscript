// ==UserScript==
// @name           douban pt.sjtu.edu.cn
// @include        http://movie.douban.com/subject/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
  var name = $('div[id="wrapper"]>h1>span[property="v:itemreviewed"]');
  var name_part = name.html().split(' ');
  name='';
  var n = '';
  for ( n in name_part) {
    name += encodeURIComponent(name_part[n]) + "+";
  }
  var url = "https://pt.sjtu.edu.cn/torrents.php?"
  +"incldead=0&spstate=0&inclbookmarked=0&picktype=0&search="
  +name
  +"&search_area=0&search_mode=0"
  +"&XfromDouban=true";
  $(".related_info").prepend(
    "<div>"
    +"<h2>PT.SJTU</h2><br>"
    +"<iframe class='article' frameborder='0' src='"+url+"'/> </div>");
});
