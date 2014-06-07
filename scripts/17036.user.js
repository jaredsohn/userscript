// ==UserScript==
// @name           Current Music in Vox
// @namespace      http://dimrub.vox.com/
// @description    Add the current music line to Vox posts
// @include        http://www.vox.com/compose*
// ==/UserScript==

var username = '';

function addCurrentMusic() {
	url = 'http://ws.audioscrobbler.com/1.0/user/' + username + '/recenttracks.txt';
	GM_xmlhttpRequest({
	    'method' : 'GET',
	    'url' : url,
	    'headers' : {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
	    onload : function(r) {
		tracks = r.responseText;
		line = tracks.split(/\n/)[0];
		track = line.replace(/^[^,]*,/, '');

		// Now add the retrieved track to the post's body
        composeEntryIframe = document.getElementById("compose-entry-iframe");
		doc = composeEntryIframe.contentDocument || 
			composeEntryIframe.contentWindow.document;
		body = doc.getElementsByTagName("body")[0];
		p = doc.createElement('p');
		b = doc.createElement('b');
		text = doc.createTextNode("Current music: " + track);
		b.appendChild(text);
		p.appendChild(b);
		body.appendChild(p);
	    }
	});

}

username = GM_getValue("last_fm_username");
if (username == undefined) {
    username = prompt("Enter your Last.FM username ");
    GM_setValue("last_fm_username", username);
}

spellCheckButton = document.evaluate(
    '//a[@class = "command-spell-check toolbar button"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);

musicLink = document.createElement('a');
musicTitle = document.createTextNode('[♫]');
musicLink.href = 'javascript:void(0)';
musicLink.appendChild(musicTitle);
musicLink.addEventListener('click', addCurrentMusic, false);
spellCheckButton.parentNode.insertBefore(musicLink, spellCheckButton.nextSibling);

