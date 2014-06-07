// ==UserScript==
// @name           MangaFox.com - Simple View
// @description    Leaves Only Resized Image (Original Resolution or 98% Screen Width) Over a Black Background
// @include        http://www.mangafox.com/manga/*/v*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.0
// ==/UserScript==
(function(){
  $("#body").css("background","#000000");
  $("#viewer>a").prependTo("#body");
  $("#top_bar").prependTo("#body").hide();
  $("#body>div,#body>ul").remove();
  $("#image").removeAttr("width");
  $("#image").load(function(){
    if(this.naturalWidth > screen.width){
      $(this).width("98%");
    }
  });
}());