// ==UserScript==
// @name           Music Brainz Import Concert Online
// @namespace      MBCLI
// @description    Import Concert Online Track Lists to MB
// @include        http://concert-online.com/en/artist/*
// ==/UserScript==

// remove multiple, leading or trailing spaces
function trim(s) {
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	return s;
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null ) {
		node = document;
	}
	if ( tag == null ) {
		tag = '*';
	}
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var productDetailBox = getElementsByClass( 'product-detail-box', document, 'div' );

if ( productDetailBox.length == 1 ) {
	var releaseArtist = productDetailBox[0].getElementsByTagName('h1')[0].innerHTML;
	var releaseTitle = productDetailBox[0].getElementsByTagName('h2')[0].innerHTML;
}

var trackRows = getElementsByClass( 'row clearfix', document, 'div' );

var mbURL = 'http://musicbrainz.org/cdi/enter.html?hasmultipletrackartists=0&artistid=2&artistedit=1&artistname=' + encodeURI(releaseArtist) + '&releasename=' + encodeURI(releaseTitle);

var lastTrack = 0;
for (i = 0; i < trackRows.length; i++) {
	var data = trackRows[i].getElementsByTagName('div');
	var trackNum = data[6].innerHTML.replace(/\.$/g,'');
	var trackTitle = trim(data[7].innerHTML);
	var trackLen = data[8].innerHTML.replace(/ Min./g,'');
	var trackIdx = trackNum - 1;
	mbURL += '&track'+trackIdx+'='+encodeURI(trackTitle);
	mbURL += '&tracklength'+trackIdx+'='+trackLen.replace(/:/g,'%3A');
	lastTrack = trackNum;
}
mbURL += '&tracks='+lastTrack+'&attr_type=9&attr_status=100';

var trackList = getElementsByClass( 'song-list clearfix', document, 'div' )[0].getElementsByTagName('h1')[0];

trackList.innerHTML += '&nbsp;&nbsp;<small><a target="_blank" href="'+mbURL+'">Submit to MusicBrainz</a></small>';