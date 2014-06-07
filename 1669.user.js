
// ==UserScript==

// @name           Google syndication frames (ver. 0.0.1)

// @namespace      http://larytet.sf.net/myscripts

// @description    remove all Google ads from all websites

// @include        *

// ==/UserScript==


var allFrames, frame, frameSrc;

// discover all <frame> tags 
allFrames = document.evaluate('//iframe', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allFrames.snapshotLength; i++) 
{
  frame = allFrames.snapshotItem(i);

  frameSource = frame.src;
  if (frameSource.indexOf("google") != -1)  
  {
     frame.parentNode.removeChild(frame);
     GM_log("frame = "+frameSource+" removed");
  }
}

