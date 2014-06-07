// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Danbooru Pools - Arrow Key Navigation
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Allows you to navigate in image pools with the arrow keys of your keyboard
// @include        *
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

var postViewDiv = document.getElementById("post-view");
var postViewContent;
var poolDiv;
var poolDivContent;
var previousImageURI;
var nextImageURI;

if (postViewDiv) {
   postViewContent = postViewDiv.getElementsByTagName("div");
}

if (postViewContent) {
   for (i = 0; i < postViewContent.length; i++) {
      if (postViewContent[i].getAttribute("id"))
      if (postViewContent[i].getAttribute("id").indexOf("pool") != -1) {
         poolDivContent = postViewContent[i].getElementsByTagName("a");
      }
   }
}

if (poolDivContent) {
   for (i = 0; i < poolDivContent.length; i++) {
      if (poolDivContent[i].textContent.indexOf("<<") != -1) {
	     previousImageURI = poolDivContent[i].getAttribute("href");
	  }
	  else if (poolDivContent[i].textContent.indexOf(">>") != -1) {
	     nextImageURI = poolDivContent[i].getAttribute("href");
	  }
	  if (previousImageURI || nextImageURI) {
	     window.addEventListener("keydown", function (e) {keyListener(e)}, false);
	  }
   }
}

function keyListener(event) {
 //DEBUG:
 //alert(previousImageURI + "\n" + nextImageURI  + "\n" + event.keyCode)
   if ((event.keyCode == 37) && (previousImageURI)) {
      window.location = previousImageURI;
   }
   else if ((event.keyCode == 39) && (nextImageURI)) {
      window.location = nextImageURI;
   }
}