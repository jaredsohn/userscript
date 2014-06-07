// csemaj's KoL Script
// Copyright (c) 2007, James Cammarata
// Based on code written by Byung Kim (Tard) http://kol.dashida.com and OneTonTomato's scripts
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Tattoo Checker Script
// @namespace      http://www.sngx.net
// @include        *kingdomofloathing.com/account_tattoos.php
// @include        *127.0.0.1:*/account_tattoos.php
// @description    Version 0.0.2
// ==/UserScript==


/********************************** Change Log **********************************************

* 5/17/2008 - 0.0.1
- Released first version, 0.0.1

* 8/4/2008 - 0.0.1
- Fixed a lot of cruft that was left over when i copied this from another script.

TODOS:

********************************************************************************************/

//
// Functions
//

function updateTattoosPage() {
   images = document.getElementsByTagName("img");

   for(i=0;i<images.length;i++) {
      // if this is a tattoo gif add a text node after the image node
      if(images[i].src.indexOf("sigils") != -1) {
         var label   = images[i].src.substring(images[i].src.lastIndexOf('/')+1,images[i].src.length);
         var txtNode = document.createTextNode(label);
         var pNode   = document.createElement("p");
         pNode.appendChild(txtNode);
         images[i].parentNode.appendChild(pNode);
      }
   }
}

//
// Globals
//

var nodeBody   = document.getElementsByTagName("body").item(0);
var textBody   = "";
var baseURL    = "";

//
// Main Body Execution
//

if (nodeBody) {
   if (nodeBody.textContent) {
      textBody = nodeBody.textContent;
   }
   else if (nodeBody.text) {
      textBody = nodeBody.text;
   }
   baseURL = nodeBody.baseURI.substring(0,nodeBody.baseURI.lastIndexOf('/')+1);

   updateTattoosPage();
}

