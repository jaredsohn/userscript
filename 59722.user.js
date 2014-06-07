// Time-stamp: <2009-10-13 17:30:10 ferk>
//
// ==UserScript==
// @name          <Audio>play
// @description   Add an audio player (using HTMLv5) next to every link to an audio file
// @namespace      http://userscripts.org/users/53838
// @include       *
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
//
// By Fernando Carmona Varo (ferkiwi@gmail.com)
//
// This simple script that will add an audio player next to each mp3, ogg or oga link,
// using the HTMLv5 capabilities (it requires a web browser that supports it).
//
// The size and style of the audio player depends on the browser you are using.
//
// ==/UserScript==

(function() {

   var page_links = document.links;
   for (var i=0; i<page_links.length; i++){
     if (page_links[i].href.match(/\.((mp3)|(og[ga]))$/i)) {
       var span = document.createElement("span");
       var url = page_links[i].href;
       var code_str = " <audio src=\""+url+"\" "
         + " controls=\"true\" "
         + " autoplay=\"false\""
         + "></audio> ";
       span.innerHTML = code_str;
       page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling);
     }
   }

 })();