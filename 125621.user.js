// ==UserScript==
// @name          Exclude All iFrames
// @namespace     http://sixside.com/
// @description   This script hides all the iframes on a website
// ==/UserScript==
var alliFrames, thisiFrame;
alliFrames = document.getElementsByTagName('iframe');
for (var i = 0; i < alliFrames.length; i++) {
    thisiFrame = alliFrames[i];
    // do something with iFrame
	thisiFrame.width = 0;
	thisiFrame.height = 0;
}

