// ==UserScript==
// @name           deviantART Go to Last Page of Topic
// @namespace      http://davidjcobb.deviantart.com
// @description    Adds a "Last Page" link to topics in deviantART's forums.
// @include        http://forum.deviantart.com/*/*/
// ==/UserScript==

if(unsafeWindow.jQuery) { // dA uses jQuery, we might as well take advantage of it.
   $=unsafeWindow.jQuery;
   $("table.forum.f.full tr+tr").each(
      function() {
         if(this.cells.length<4)return !0;
         var url,count,a;
         URL=$(this.cells[1]).find("a").attr("href");
         count=($(this.cells[3]).html().match(/([\d,]+)/)||[0,"0"])[1].replace(/\D/g,"")*1;
         $(this.cells[3]).html('<a href="'+URL+"?offset="+(count-count%25)+'">'+count+'</a>');
      }
   );
}