// ==UserScript==
// @name           deviantART - Deviation Times in Message Center
// @namespace      http://davidjcobb.deviantart.com/
// @description    Shows the time that a deviation arrived in your inbox.
// @include        http://my.deviantart.com/messages
// @include        http://my.deviantart.com/messages/*
// ==/UserScript==

run=
function(){
   var pager=null,i=0,u=unsafeWindow;
   var l=u.da_minish_messages.local;

   document.documentElement.appendChild(document.createElement("style")).innerHTML="div.mcbox-inner-thumb abbr.mcb-ts,div.mcbox-inner-full-deviation abbr.mcb-ts{position:absolute;top:4px;left:4px;color:#89A08E}\ndiv.mcbox-sel div.mcbox-inner-thumb abbr.mcb-ts,div.mcbox-sel div.mcbox-inner-full-deviation abbr.mcb-ts{top:5px;left:5px}";

   u.MESSAGE_TEMPLATES.full.deviation=u.MESSAGE_TEMPLATES.thumb.generic="%abbr.ts%%div.midview%%span.line%%orphaned%";
   u.MESSAGE_TEMPLATES.thumb.deviation="%abbr.ts%%div.midview%%span.line%%div.tab%%orphaned%";
   // the Message Center uses Message Templates to dictate how different kinds of messages are displayed.
   // all I'm doing is taking the one used for deviations and modding it to show the timestamp in 
   // bold superscripted text.
   // The syntax is %tagname.varname% where tagname is the HTML tag and varname is a property of a 
   // message's object (not to be confused with the Messages object).

   // we changed the template after the deviations were added to the page;
   // we need to refresh the MessagePager which keeps track of the deviations 
   // and what page of them we're viewing.
   for(;l["message pager "+i];i++) { // find the right pager
      if(l["message pager "+i].mcid=="dw_deviations") {
         pager=l["message pager "+i];
         pager.uiLoadPage(1); // only way I could find to force a refresh is to go to another page
         pager.uiLoadPage(0); // and then we have to go back
         break;
      }
   }
};

window.addEventListener("load",run,!0);