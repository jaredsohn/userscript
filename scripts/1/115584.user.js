// ==UserScript==
// @name           idnesReader
// @namespace      http://code.google.com/p/greasemonkey-readers/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://userscripts.org/scripts/create
// @include        http://*.idnes.cz/diskuse.aspx*
// ==/UserScript==

//var discUrl=$(".but-disc").parent().parent().attr("action");
var discUrl=$('#discblog-prep-1>h3>a').attr('href')
if (!discUrl) discUrl=$(".ico-next").attr("href");
$("#hlavniz").remove();
 
var art = $(".entry-content>div, .art-full>div, .moot-list, .list-art>div, .article>div");
art.find("script").remove();
art.find(".vvword").each( function() {
    var w = $(this).text();
    $(this).replaceWith("<span>" + w + "</span>");
  }
);

var anch = $("#main").parent();
//anch.append($("menu")).find("li").css("margin", "0").css("padding",0);
var menu = $("#webs, #webs2");
menu.find("script").remove();
anch.append(menu);
menu.find("li").css("float", "left").css("list-style-type", "none").css("margin", "0px 2px 2px");
anch.append(art);
anch.append("<a id='disMonkey' href='" + discUrl +"'>Cela Diskuse</a>");
$("#main").remove();
$(".opener").addClass("text");
art.css("font-size", "250%");
$(".related, .art-add-2").remove();


if (discUrl) {
 $.ajaxSetup({
    'beforeSend' : function(xhr) {
        xhr.overrideMimeType('text/html; charset=windows-1250');
    }
 });
$.ajax({   
        url: discUrl + '&show=all',
        dataType: 'html',
        contentType: "text/html; charset=windows-1250",
        success: function(data) {
          var disc = $(data).find('.moot-list');
          disc.css("font-size", "200%");
          disc.find("h5").css("font-size", "80%").append("<hr />");
          disc.find("ul").remove();
          $(".opener").parent().append(disc);
          //$(".opener").parent().append($("#disMonkey").css("font-size", "150%"));
          }
  });
}
 
