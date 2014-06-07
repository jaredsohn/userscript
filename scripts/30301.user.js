// ==UserScript==
// @name           deviantART Deviation Comments Pages
// @namespace      http://davidjcobb.deviantart.com
// @description    Adds "First Page" and "Last Page" to the comment-page-links on Deviations pages.
// @include        http://*.deviantart.com/art/*
// ==/UserScript==

unsafeWindow.FFGM_DJC_DA_AddPageLinks=window.FFGM_DJC_DA_AddPageLinks=function(){
   PageLinks=null;
   SPANS=document.getElementById("comments").getElementsByTagName("span");
   for(var i=0;i<SPANS.length;i++) {
      if ((SPANS[i].parentNode.className=="alink nav"||SPANS[i].parentNode.className=="alink nav nav-big")/*&&(SPANS[i].childNodes[0].getElementsByTagName("A").length==SPANS[i].childNodes[0].childNodes.length-1||SPANS[i].childNodes[0].getElementsByTagName("A").length==SPANS[i].childNodes[0].childNodes.length-2)*/) {
         PageLinks=SPANS[i].childNodes[0];
      }
   }
   if(!PageLinks) {
      GM_log("DavidJCobb - Deviation Comments Page Links - ERROR:Unable to find the pagelinks SPAN.");
      return false;
   }

   var Offset=0;
   if (window.location.search.indexOf("offset=")==-1) { Offset=0;
   } else { Offset=parseInt(window.location.search.substring(window.location.search.indexOf("?offset=")+("?offset=").length, ( (window.location.search.indexOf("&",window.location.search.indexOf("?offset="))!=-1)?window.location.search.indexOf("&",window.location.search.indexOf("?offset=")):((window.location.search.indexOf("#",window.location.search.indexOf("?offset="))!=-1)?window.location.search.indexOf("#",window.location.search.indexOf("?offset=")):window.location.search.length) ) )); }


   if (Offset!=0&&Offset!="0") {
      FirstPage=document.createElement("a");
      FirstPage.href=unsafeWindow.location.pathname+"?offset=0#comments";
   } else {
      FirstPage=document.createElement("del");
   }

   PrevPage=null;for(var a=0;a<PageLinks.childNodes.length;a++){if(PageLinks.childNodes[a].innerHTML=="Previous Page"){PrevPage=PageLinks.childNodes[a];break;}}
   if (!PrevPage) { return false; }

   FirstPage.innerHTML="First Page"
   PageLinks.insertBefore(FirstPage,PrevPage);
   Spacing=document.createElement("font");Spacing.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;";/*no way to use &nbsp; in a text node =_=*/
   PageLinks.insertBefore(Spacing,PrevPage);
   
   // get max comments
   var div=document.getElementById("artist-comments").getElementsByTagName("div")[0].innerHTML;
   MaxComments=div.substring(div.indexOf("Comments: ")+("Comments: ").length,div.indexOf("<br>",div.indexOf("Comments: ")));
   // got max comments
   CommentLimit=document.getElementById("commentslimit").options[document.getElementById("commentslimit").selectedIndex].value;

   if (Offset<(parseInt(MaxComments)-(parseInt(MaxComments)%25))) {
      LastPage=document.createElement("a");
      LastPage.href=unsafeWindow.location.pathname+"?offset="+(parseInt(MaxComments)-(parseInt(MaxComments)%25))+"#comments";
   } else {
      LastPage=document.createElement("del");
   }
   LastPage.innerHTML="Last Page"
   //PageLinks.appendChild(LastPage);
   PageLinks.insertBefore(LastPage,PageLinks.childNodes[PageLinks.childNodes.length-1].nextSibling);
   PageLinks.insertBefore(Spacing.cloneNode(1),LastPage);
   PageLinks.style.width="43em";
}
FFGM_DJC_DA_AddPageLinks();