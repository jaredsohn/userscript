// ==UserScript==
// @name           Instagram & Photobucket Show Image Thumbnail
// @description    Offers a thumbnail of the image for easy access to URL, contextual menu, drag-and-drop functions, etc.
// @namespace      http://www.donnelly-house.net/
// @include        http://instagram.com/p/*
// @include        http://*.photobucket.com/user/*
// ==/UserScript==

function addImageThumbnail ()
{
      // <meta property="og:image" content="http://distilleryimage1.ak.instagram.com/whatever.jpg">
   var oMetas = document.getElementsByTagName ("meta");
   sImageSrc = "";

   for (nMeta = 0;  nMeta < oMetas.length;  nMeta++) {

      if (oMetas[nMeta].getAttribute ("property") == "og:image") {
         sImageSrc = oMetas[nMeta].getAttribute ("content");
         break;
      }

   } // for

   eDiv = document.getElementsByClassName ("iWithTransition")[0];    // instagram

   if (eDiv === undefined) {     // photobucket
      eDiv = document.getElementById ("mediaTemplate");
      eInput = document.getElementById ("linksModule_ccinput_1");
      sImageSrc = eInput.value;
   }

   var eThumbnail = document.createElement ("img");
   eThumbnail.setAttribute ("src", sImageSrc);
   eThumbnail.setAttribute ("width", 50);

      // Create the link
   var nText = document.createTextNode ("Image URL");
   var eLink = document.createElement ("a");
   eLink.setAttribute ("href", sImageSrc);
   eLink.setAttribute ("class", "Plain");
   eLink.setAttribute ("target", "_blank");
   eLink.appendChild (eThumbnail);
   eLink.appendChild (nText);

      // Add it to the top of the right-side column
   var eNewDiv = document.createElement ("div");
   eNewDiv.setAttribute ("style", "position: relative; left: 2px;");
   eNewDiv.appendChild (eLink);

   eDiv.parentNode.insertBefore (eNewDiv, eDiv);

   return;
} // addImageThumbnail

window.addEventListener ("load", addImageThumbnail, false);    // perform mods at onload
