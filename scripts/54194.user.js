// ==UserScript==
// @name            InlineOgg
// @description     Append an html5 <video> tag clicking on a link to an ogg file (and remove re-clicking)
// @namespace       http://kirgroup.com/
// @include         http://*
// @require         http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function(){
 $("[href*=.og]").each(function(){
     $(this).click(function(){ 
      url=this.href;
      id=url.replace(/[^a-zA-Z0-9]/g,"");
      if ($(this).siblings("video").size()>0) {
       $(this).siblings("video").remove();
      } else {
       html ="<video src='"+url+"' controls='true' autoplay='false'>You don't have HTML5 video support!</video>";
       //alert(html);
       $(this).after(html);
      }
      return false;
     });
     
 });
});
