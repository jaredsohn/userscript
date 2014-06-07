// ==UserScript==
// @name            4chan sage removal
// @description     Collapse sage posts on 4chan.org
// @author          Anonymous
// @version         0.3 (April 25rd, 2007)
// @include         http://*.4chan.org/*
// ==/UserScript==
// History:
// 0.1 And so it begins.
// 0.2 Forgot.
// 0.3 Is 'sage' really case-insensitive? Crapflooders think so.

    sages = document.evaluate("//a[translate(@href,'MAILTOSAGE','mailtosage')='mailto:sage']/parent::*/parent::*",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
    for (i = 0; td = sages.snapshotItem(i); i++) {
	if (td.nodeName == 'TD') {
	    GM_log(i + ": " + td.id + ": " + td);
	    bb = td.getElementsByTagName('blockquote');
	    if (bb.length) {
		bb[0].style.display = 'none';
	    }
	    aa = td.getElementsByTagName('a');
	    for (a = 0; a < aa.length; ++a) {
		if (aa[a].href.toLowerCase() == 'mailto:sage') {
		    aa[a].href = 'javascript:gm4chanSage(' + td.id + ')';
		}
	    }
	}
    }
    
    unsafeWindow.gm4chanSage = function (id) {
	var td = document.getElementById(id);
	var bb = td.getElementsByTagName('blockquote');
	if (bb.length) {
	    if (bb[0].style.display == 'none') {
		bb[0].style.display = 'block';
	    } else {
		bb[0].style.display = 'none';
	    }
	}
    }