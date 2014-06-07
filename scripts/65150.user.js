// ==UserScript==
// @name            FlashHack
// @namespace       https://userscripts.org/users/jaxo
// @description     Fixes links, removes ads, shows images & youtube videos in thread
// @version         1.3
// @author          Jaxo
// @include         https://www.flashback.org/*
// ==/UserScript==


// Script options

var thumb_width  = 100;
var thumb_height = 130;
var link_color   = "yellow";

// --------------

var allItems, buffer, i, e;   // Global variables

// Remove Ads & Cleanup..

if (e = document.getElementById("top-banner-container"))               // Hide top/right/bottom banners on page
    e.parentNode.removeChild(e);
if (e = document.getElementById("right-banner-container"))
    e.parentNode.removeChild(e);
if (e = document.getElementById("bottom-banner-container"))
    e.parentNode.removeChild(e);

allItems = document.getElementsByClassName("post-banner-container");   // Hide img/flash banners (between posts, in threads)
for (var i=0; i < allItems.length; i++)
   allItems[i].parentNode.removeChild(allItems[i]);

allItems = document.getElementsByClassName("banner_text");             // Hide text banners (between posts, in threads)
for (var i=0; i < allItems.length; i++)
   allItems[i].parentNode.removeChild(allItems[i]);

allItems = document.evaluate("//img[contains(@src,'static.flashback.org/img/banners/')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i=0; i < allItems.snapshotLength; i++)
    allItems.snapshotItem(i).style.display = "none";                   // Hide all ad images (in case we miss some ads/banners)

// Fix Links..

if (/^https?\:\/\/www\.flashback\.org\/t\d+(p\d+)?$/i.test(location.href))      // Only fix links in threads
{
   allItems = document.getElementsByTagName("a");
   for (i=0; i < allItems.length; i++)
   {
      buffer = unescape(allItems[i].href);
   
      if (/flashback\.org\/leave\.php\?u\=/i.test(buffer))             // Fix external links
          allItems[i].href = buffer = buffer.split(/flashback\.org\/leave\.php\?u\=/i)[1];

      if (!InSig(allItems[i]) && !/^https?\:\/\/(www\.)?flashback\.(org|se)/i.test(buffer) && allItems[i].href)   // Mark external links
          allItems[i].setAttribute("style", "background-color:" + link_color);

      if (!InSig(allItems[i]) && !InQuote(allItems[i]))                // Show images & youtube vids (but not inside signatures or quotes)
      {
          if (buffer.match(/\.(jpg||jpeg||gif||bmp||png)$/i) && !/\.php\?/i.test(buffer))
              allItems[i].innerHTML = "<p><img src='" + buffer + "' height='" + thumb_height + "' width='" + thumb_width + "' alt='" + buffer + "'></p>";
          if (/^https?\:\/\/(www\.|m\.)?youtube\.com\/watch\?(v\=[A-Za-z0-9_-]{11}|.+v\=[A-Za-z0-9_-]{11})/i.test(buffer))
              allItems[i].innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/v/' + buffer.split(/watch\?/i)[1].split(/v\=/i)[1].split("&")[0] + '" frameborder="0" allowfullscreen></iframe>';
          if (/^https?\:\/\/((www\.|m\.)youtube\.com\/v\/.+|youtube\.googleapis\.com\/v\/.+|youtu\.be\/.+)/i.test(buffer))
              allItems[i].innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/v/' + buffer.split("/")[buffer.split("/").length-1] + '" frameborder="0" allowfullscreen></iframe>';
      }
   }
}


// Fuctions..

function InSig(e)
// Determines if the given element e is itself or is inside a posts signature
{
   while (e){
      if (e.className == "clear signature")
         return true;
      e = e.parentNode;
   }
   return false;
}

function InQuote(e)
// Determines if the given element e is itself or is inside a post quote
{
   while (e){
      if (e.className == "alt2 post-quote")
         return true;
      e = e.parentNode;
   }
   return false;
}



