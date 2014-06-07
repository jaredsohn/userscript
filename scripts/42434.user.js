// ==UserScript==
// @name          Anti-Santa L5
// @namespace     
// @description	  Vote for Santa L5
// @include       http://*.engadget.com/*
// ==/UserScript==

var PostNames=unsafeWindow.document.evaluate('//*[@class="commentlinks"]/div/h4/a',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0 ; i< PostNames.snapshotLength; ++i)
    if (PostNames.snapshotItem(i).text=="Satan_L5" || PostNames.snapshotItem(i).text=="Satan L5")
       PostNames.snapshotItem(i).parentNode.parentNode.childNodes[0].childNodes[2].onclick();

