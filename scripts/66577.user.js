// ==UserScript==
// @name           Poll Link Changer
// @namespace      PollLinkChanger
// @description    Poll links to Poll of the Day instead of Board 8
// @include        *gamefaqs.com/poll/index.html?poll=*
// @include        *gamefaqs.com/poll/index.html
// ==/UserScript==

// Poll of the Day Linkage in the Poll durring Contest Season
// By Kraust (1337_FF_GoD)



(function() {
    var PotD =  document.evaluate("//text()", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var node = null;
    for (var i = 0; i < PotD.snapshotLength; i++) {
        node = PotD.snapshotItem(i);
	node.data = node.data.replace(/Contest Message Board/gi, 'PotD')
    }

    var link2 =  document.evaluate("//text()", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var node = null;
    for (var i = 0; i < link2.snapshotLength; i++) {
        node = link2.snapshotItem(i);
	node.data = node.data.replace(/discuss the contest on the/gi, 'just link me to')
    }

    var srchlnk = "http://www.gamefaqs.com/boards/8-gamefaqs-contests";
    var replclnk ="http://www.gamefaqs.com/boards/3-poll-of-the-day";
    for (var i=0; i<(document.links.length); i++)
    {
	if (document.links[i].href == srchlnk)
	{document.links[i].href = replclnk;}
    }

})();

