// ==UserScript==

// @name           Remove ads from Temple Run site Gamepop.co

// @namespace      http://gamepop.co

// @description    Remove all Google ads from http://gamepop.co. These ads can get in the way whilst playing Angry Birds or Temple Run Online so why not just remove them completely? This may also work on other game related websites.

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