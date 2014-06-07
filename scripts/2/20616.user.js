// ==UserScript==
// @name          frameset
// @namespace     http://zzo38computer.cjb.net/userjs/
// ==/UserScript==

// Makes frames resizable, all borders visible, and scrolling if necessary

// Latest version is available at:
//  http://zzo38computer.cjb.net/userjs/frameset.user.js

frames = document.getElementsByTagName("frame");
 
for (var i = 0; i < frames.length; i++) {
 frames[i].removeAttribute("noresize");
 frames[i].setAttribute("frameborder","1");
 frames[i].setAttribute("scrolling","auto");
}
