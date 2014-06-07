// ==UserScript==
// @name           Google Video Cleaner
// @namespace      http://userscripts.org/users/24068
// @description    Formats Google Video to look more like the rest of Google
// @include        http://video.google.com/?*
// @include        http://video.google.com/
// @include        http://video.google.com
// ==/UserScript==



//get all divs
divs = document.getElementsByTagName('div');

//hide all but the first five
for(i=4; i<divs.length; i++){
  divs[i].style.display="none";
}