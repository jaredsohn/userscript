// ==UserScript==
// @name           Escape .Tk url
// @namespace      Aaron Russell
// @description    Go to the original site rather than through .Tk frames.
// @include        http*://*.tk*
// @exclude        http*://dot.tk*
// @exclude        http*://*.dot.tk*
// ==/UserScript==

window.location=document.getElementsByName('dot_tk_frame_content')[0].src;