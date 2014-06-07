// ==UserScript==
// @name        MusicBrainz: Approve directly from the edit search page
// @description The approve link on the edit search results page will approve an edit without reloading the page and then replace the link with "Approved". It's probably oblivious to edits which can't be approved without an edit note.
// @version     2012-09-24
// @author      -
// @namespace   http://userscripts.org/users/41307
//
// @include     *://musicbrainz.org/*
// @include     *://beta.musicbrainz.org/*
// @include     *://test.musicbrainz.org/*
// ==/UserScript==
//**************************************************************************//

var nodes = document.getElementsByTagName("a");
for (var i = 0; i < nodes.length; i++) {
	if (nodes[i].href.match(/\/approve\?/)) {
		nodes[i].onclick = function(){
			var r = new XMLHttpRequest();
			r.open('GET', this.href, true);
			r.onreadystatechange = approved(this);
			r.send(null);

			return false;
		};
	}
}

function approved(link) {
	link.innerHTML = 'Approved';
	link.onclick = function(){ return false; };
	link.style.color = 'black';
};

