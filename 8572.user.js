// ==UserScript==
// @name            Unthumb
// @description     UNthumb thumbnails
// @author          Nick Gibson
// @namespace       http://sapph.org
// @include         *
// @version         0.10
// ==/UserScript==

 var toReplace = 'tn_';
 var replaceWith = '';
 var imgs = document.getElementsByTagName("img"); 
 for (var i = 0; i < imgs.length; i++) { 
 	imgs[i].setAttribute("height", "");
 	imgs[i].setAttribute("width", "");
  var imgSrcString = imgs[i].getAttribute("src");
  var index = imgSrcString.indexOf(toReplace);
  if (index >= 0) {
   var first = imgSrcString.substring(0, index);
   var second = imgSrcString.substring(index + toReplace.length);
   imgSrcString = first + replaceWith + second;
  }
  imgs[i].setAttribute("src", imgSrcString);
 }
