// ==UserScript==
// @name          Sherdog JXS
// @version       1.3
// @namespace     http://userscripts.org/users/jaxo
// @description   Fixes outgoing links, Auto-embeds YouTube links, Adds fullscreen capability to YouTube embeds, Removes ads, Blocks popups
// @include       http://www.sherdog.net/forums/*
// @include       http://sherdog.net/forums/*
// ==/UserScript==


   var allItems, e, i;


// ----------------------------------------------------------------
// Fix Outgoing Links (remove annoying redirection)
// ----------------------------------------------------------------

   allItems = document.evaluate("//a[contains(@href,'.craveonline.com/index.php#')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (i=0; i < allItems.snapshotLength; i++)
       allItems.snapshotItem(i).href = allItems.snapshotItem(i).href.split(".craveonline.com/index.php#")[1];

// ----------------------------------------------------------------
// Add Fullscreen Capability To YouTube Embeds
// ----------------------------------------------------------------

   allItems = document.evaluate("//embed[contains(@src,'youtube.com/')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (i=0; i < allItems.snapshotLength; i++){
       allItems.snapshotItem(i).setAttribute("allowfullscreen", "true");
       allItems.snapshotItem(i).src += "&fs=1";
   }

// ----------------------------------------------------------------
// Auto-embed YouTube Links
// ----------------------------------------------------------------

   allItems = document.evaluate("//a[contains(@href,'youtube.com/watch')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (i=0; i < allItems.snapshotLength; i++){
       e = allItems.snapshotItem(i);
       e.innerHTML = "<object><embed width='425' height='350' allowfullscreen='true' src='http://www.youtube.com/v/" +e.href.substr(e.href.indexOf("v=")+2,11)+ "&fs=1'></embed></object>";
   }

// ----------------------------------------------------------------
// Remove Ads (image, flash and iframe ads)
// ----------------------------------------------------------------

   if (e = document.getElementById("promotion_container"))
       e.parentNode.removeChild(e);
   if (e = document.getElementById("aswift_0_anchor"))
       e.parentNode.parentNode.removeChild(e.parentNode);

   e = document.getElementsByTagName("*");

   for (i = 0; i < e.length; i++)
       if (e[i] && /^(img|embed|object|iframe)$/i.test(e[i].nodeName))
           if (!isInsidePost(e[i]) && (!e[i].src || !/^http\:\/\/[^\/]*sherdog.net\//i.test(e[i].src)))
               e[i].parentNode.removeChild(e[i]);

// ----------------------------------------------------------------
// Block Popups (only allows sherdogs buddylist popup)
// ----------------------------------------------------------------

   location.href = "javascript:var fc=window.open;window.open=function(a,b,c,d){if(a=='misc.php?do=buddylist&focus=1')fc(a,b,c,d);};void(0);";

// ----------------------------------------------------------------
// Script Functions
// ----------------------------------------------------------------

   function isInsidePost(e){
       while (e)
           if ((e=e.parentNode) && /^post\d+$/i.test(e.id))
               return true;
       return false;
   }

