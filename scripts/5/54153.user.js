// ==UserScript==
// @name           Remove PBN Top Crap
// @namespace      http://userscripts.org/users/100459
// @description    Remove PBN Top Crap
// @include        http://*.pbnation.com/*
// ==/UserScript==

var alliFrames, thisiFrame;
alliFrames = document.getElementsByTagName('iframe');
for (var i = 0; i < alliFrames.length; i++) {
    thisiFrame = alliFrames[i];
    // do something with iFrame
	thisiFrame.width = 0;
	thisiFrame.height = 0;
}


var allTds, thisTds;

allTds = document.evaluate(
    "//td[@rowspan='2']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allTds.snapshotLength; i++) {
    thisTds = allTds.snapshotItem(i);

	thisTds.parentNode.removeChild(thisTds)
    // do something with thisTds
}


(function () {
var tags = document.getElementsByTagName('table');
for (var key in tags)
with (tags[key])
if (getAttribute('id') == 'logocontainer') style.display = 

'none';
})();