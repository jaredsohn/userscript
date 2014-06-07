// ==UserScript==
// @name           deviantART - Fullview ANY Deviation!
// @namespace      http://davidjcobb.deviantart.com/
// @description    Fullview any deviation, even ones where the artist has restricted viewing to users 18+ only!
// @include        http://*.deviantart.com/art/*
// @include        http://www.deviantart.com/deviation/*
// ==/UserScript==

full=
function() {
   var a,b,u=unsafeWindow;
   if(!u.Deviation)return !1;
   var faked=0,uDN=u.Deviation.nodes;

   // if we're on an MC18+, a few nodes will be missing
   // specifically, outView, zoomButton, and zoomButton's previousSibling
   // so we need to create impostors, which'll be automatically garbage-collected 
   // when this function finishes.
   if (!uDN.outView) faked=uDN.outView=document.createElement("SPAN");
   if (!uDN.zoomButton) faked=uDN.zoomButton=document.createElement("SPAN");
   if (!uDN.zoomButton.previousSibling) {
      faked=a=document.createElement("SPAN");
      (b=document.createElement("DIV")).appendChild(a);
      b.appendChild(uDN.zoomButton);
   }
   if (u.Deviation.zoomIn) u.Deviation.zoomIn();
   (document.getElementById("filter-warning")||{style:{}}).style.display="none"; // trap errors
   uDN.inView.childNodes[0].src=u.deviantART.pageData.fullview.src;
};

if (unsafeWindow.Deviation) GM_registerMenuCommand("Fullview Deviation", full);