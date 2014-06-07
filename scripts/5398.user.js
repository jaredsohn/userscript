// ==UserScript==
// @name           Amazon Plogs Die Die Die
// @author         David Cuthbert
// @namespace      http://www.kanga.org/greasemonkey
// @description    Remove plogs.
// @include        http://www.amazon.tld/*
// @version        1.2 (8-25-2006)
// ==/UserScript==

function plogs_die_die_die()
{
    var plogsDivs = document.evaluate(
	'//div[@class="plogMicroContent"]|//div[@class="plog"]',
	document, null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
    
    for (var i = 0; i < plogsDivs.snapshotLength; ++i) {
	var plogsContainer = plogsDivs.snapshotItem(i).parentNode;
	var plogsParent = plogsContainer.parentNode;

	plogsParent.removeChild(plogsContainer);
    }

    return;
}

plogs_die_die_die();
