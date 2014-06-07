// ==UserScript==
// @name          Farmville.com Kill iFrame
// @namespace     http://www.farmville.com/
// @description   This script hides the iframe on farmville.com so you only get the user feed requires booking with ?ref=killframe
// @include       http://www.farmville.com/index.php?ref=killframe
// ==/UserScript==
var alliFrames, thisiFrame;
alliFrames = document.getElementsByTagName('iframe');
for (var i = 0; i < alliFrames.length; i++) {
	thisiFrame = alliFrames[i];
	thisiFrame.width = 0;
	thisiFrame.height = 0;
}
