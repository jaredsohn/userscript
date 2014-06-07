// ==UserScript==
// @name           Fix Firefox Google Translate Button
// @description    Replaces the Translate submit button that was broken by Firefox 23+
// @namespace      http://www.donnelly-house.net/
// @include        http*://translate.google.com/*
// ==/UserScript==

function replaceTranslateButton ()
{
   var oSubmit = document.getElementById ("gt-submit");
   var eInput = document.createElement ("input");
   eInput.type = "submit";
   eInput.value = "Translate";
   eInput.id = "newTranslateSubmit";
   eInput.style.backgroundColor = "#4b8ef9";
   eInput.style.color = "#ffffff";
   oSubmit.parentNode.replaceChild (eInput, oSubmit);

   return;
} // addImageThumbnail

window.addEventListener ("load", replaceTranslateButton, false);    // perform mods at onload
