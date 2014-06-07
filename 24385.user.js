// ==UserScript==
// @name           UStream FLV Embed
// @namespace      http://www.xinu.org/scripts
// @description    Embeds the FLV link beneath the other URLs.
// @include        http://www.ustream.tv/recorded/*
// ==/UserScript==

var allDivs, thisDiv;
var allMatches, thisMatch;

// Single out the div we want to find.
allDivs = document.evaluate(
    "//div[@class='channelEmbed channelBox']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// Make the adjustment.
thisDiv = allDivs.snapshotItem(0);
allMatches = document.getElementById('ustream.tv').innerHTML.match(/flash\d+.ustream.tv[^\&]*/);
thisMatch = allMatches[0];

thisDiv.innerHTML = thisDiv.innerHTML + '<br /><label style="padding-right:19px;"><strong>FLV:</strong></label> <input type="text" value="http://' + thisMatch + '" onclick="this.select();" size="60"/>'