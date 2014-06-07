// ==UserScript==
// @name           Less Google
// @namespace      kol.interface.unfinished
// @description    Removes google indirections from google search results
// @include        http://*google.com/*
// @exclude        http://*google.com/imghp*
// @exclude        http://*google.com/images*
// @exclude        http://*google.com/maps*
// @exclude        http://*google.com/bkshp*
// @include        http://*google.ca/*
// @include        http://*google.ca/*
// @exclude        http://*google.ca/imghp*
// @exclude        http://*google.ca/images*
// @exclude        http://*google.ca/maps*
// @exclude        http://*google.ca/bkshp*
// @include        https://*google.com/*
// @exclude        https://*google.com/imghp*
// @exclude        https://*google.com/images*
// @exclude        https://*google.com/maps*
// @exclude        https://*google.com/bkshp*
// @include        https://*google.ca/*
// @include        https://*google.ca/*
// @exclude        https://*google.ca/imghp*
// @exclude        https://*google.ca/images*
// @exclude        https://*google.ca/maps*
// @exclude        https://*google.ca/bkshp*
// @version        1.2
// ==/UserScript==

//Version 1.2
// add https targets
//Version 1.1
// - change include to only apply to search results
//   (maps and images are too slow)
//Version 1.0

document.addEventListener('DOMSubtreeModified',doPage,false);

function doPage() {
    var ts = document.evaluate('//a[@class="l"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0;i<ts.snapshotLength;i++) {
        var t = ts.snapshotItem(i);
        var href = t.getAttribute('href');
        if (href) {
			var m = href.match(/&url=([^&]*)/);
			if (m) {
				t.setAttribute('href',decodeURIComponent(m[1]));
				break;
			}
        }
    }
    var m=document.getElementsByTagName("BODY");
    if (m[0].innerHTML.indexOf('return rwt')>=0)
        m[0].innerHTML=m[0].innerHTML.replace(/return rwt/g, "return");
}

doPage();
