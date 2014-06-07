// ==UserScript==
// @name           deviantART Deviation Comments Pages
// @namespace      http://davidjcobb.deviantart.com
// @description    Adds "First Page" and "Last Page" to the comment-page-links on Deviations pages.
// @include        http://*.deviantart.com/art/*
// @exclude        http://deviantwear.deviantart.com/*
// ==/UserScript==

if(unsafeWindow.jQuery) { // dA has jQuery, we might as well use it.
   var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;

   holder=$("#deviation div.alink.nav2>span.shadow>span")[0];
   if(!holder) return false*GM_log("deviantART Deviation Comments Pages - Unable to find page number holder.");

   query=window.location.search.substring(1).split("&");
   offset=0;
   for(i=0,ql=query.length;i<ql;i++) {
      query[i]=query[i].split("=");
      if(query[i][0]=="offset") {
         offset=Number(query[i][1]||"0");
         break;
      }
   }

   if (offset) {
      (fPage=document.createElement("a")).href=window.location.pathname+"?offset=0#comments";
   } else {
      fPage=document.createElement("del");
   }
   fPage.className="l";
   fPage.innerHTML="First Page";

   pPage=$(holder).find(".l:first-child:contains('Previous Page')")[0];
   if(!pPage)return !1;

   holder.insertBefore(fPage,pPage);
   
   cAmount=($("#artist-comments").find("div.details").html().match(/Comments\: (\d+)<br>/i)||[0,0])[1];
   cPerPage=Number($("#commentslimit>option:selected").attr("value"));

   if (offset<cAmount-cAmount%cPerPage) {
      (lPage=document.createElement("a")).href=window.location.pathname+"?offset="+(cAmount-cAmount%cPerPage)+"#comments";
   } else {
      lPage=document.createElement("del");
   }
   lPage.innerHTML="Last Page";
   lPage.className="r";
   holder.appendChild(lPage);
} else {
   return false*GM_log("deviantART Deviation Comments Pages - Couldn't find unsafeWindow.jQuery!");
}