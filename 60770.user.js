// ==UserScript==
// @name        Google Voice SMS Fullscreen
// @namespace   http://userscripts.org/scripts/show/60770
// @description Changes the display of google voice to only display the most recent txt msg in a large font suitable for projecting anonymous txts on a wall or screen.
// @include     https://www.google.com/voice*
// @include     http://*.google.com/voice*
// @include     https://google.com/voice*
// @author      Avindra V.G. + yeahdef
// @timestamp   
// ==/UserScript==

var did = false;
document.addEventListener("DOMNodeInserted", function(e) {
if(did) return;
var only = document.evaluate(".//span[@class='gc-message-sms-text']", e.target, null, 9, null)
          .singleNodeValue;
if(!only) return;
did = true;
only.setAttribute("style", "display:block;font-size:100px;");
document.body.innerHTML="";
document.body.appendChild(only);
}, false);