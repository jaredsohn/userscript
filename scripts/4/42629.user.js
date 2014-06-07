// ==UserScript==
// @name           Display MBID
// @description    MusicBrainz.org : Exposes various MBIDs (artist, release, tracks) with optional tool/search link pattern utility.
// @version        2010-07-12_1425
// @author         Tristan "jesus2099" DANIEL (http://j2.ions.fr), I took some techniques in murdos's scripts again
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
//
// @include        http://musicbrainz.org/artist/*
// @include        http://musicbrainz.org/show/artist/*
// @include        http://musicbrainz.org/release/*
// @include        http://musicbrainz.org/show/release/*
// @include        http://musicbrainz.org/album/*
// @include        http://musicbrainz.org/show/album/*
// @include        http://musicbrainz.org/release-group/*
// @include        http://musicbrainz.org/show/release-group/*
// @include        http://musicbrainz.org/show/puid/*

// ==/UserScript==

(function () {

var artistMBIDsearchURL, releaseMBIDsearchURL, trackMBIDsearchURL;

/* - --- - --- - --- - START OF CONFIGURATION - --- - --- - --- -

You can configure here two URL search strings (one for artist MBID and one for release MBID)
with a parameter "%s". "%s" will be replaced by the "MBID".

You can use, for instance Muz's parsertext.php with the release MBID
and Muz's artisttracks.php with the artist MBID.
See here for more information http://wiki.musicbrainz.org/Muz
(replace "muz-server-here" by Muz's actual server name that you can find on this wiki)

Some samples:
artistMBIDsearchURL = "http://muz-server-here/artisttracks.php?mbid=%s";
releaseMBIDsearchURL = "http://muz-server-here/parsertext.php?mbid=%s";
trackMBIDsearchURL = "http://whatever.com/toto?mbid=%s&amp;action=showLyrics";
*/


/* optional track MBID display */

var display_track_MBID = true;

/* styling */

var style_color = "black";
var style_backgroundColor = "white";
var style_padding = "0 4px";
var style_fontSize = "10px";
var style_fontWeight = "lighter";



/* - --- - --- - --- - END OF CONFIGURATION - --- - --- - --- - */

// Get pageType (label or artist) (murdos)
var pageType = undefined;
if (window.location.href.match(/artist/)) {
	pageType = "artist";
} else if (window.location.href.match(/(release|album)/)) {
	pageType = "release";
	if (window.location.href.match(/(release-group)/)) {
		pageType = "release-group";
	}
}

showArtistMBID();
if (pageType == "release") {
	showReleaseMBID();
	if (display_track_MBID) showTracksMBID();
}

// exposes each track's MBID
function showTracksMBID() {
	var tracks = getElementsByClassName(document, "tr", "track");
	for (var i=0 ; i < tracks.length ; i++) {
		var mbid = tracks[i].getElementsByTagName("a")[0].href.match(/track\/(.+)\.html$/)[1];
		var trackTitleCell = getElementsByClassName(tracks[i], "td", "title")[0];
		var mbidFragment = createMBIDFragment(mbid, trackMBIDsearchURL);
			mbidFragment.style.cssFloat = "right";
			mbidFragment.style.styleFloat = "right"; //ie
		trackTitleCell.insertBefore(mbidFragment, trackTitleCell.firstChild);
	}
}

// Obtain the MBID of the current page entity by type (release of artist) (ugly rip-off from a murdos function)
function getEntityMBID(type) {
	var entity_mbid = "";
	switch (type) {
		case "artist":
			var artistbox = getElementsByClassName(document, "td", "links")[0];
			var link = artistbox.getElementsByTagName("a")[0];
			entity_mbid = link.href.match(/id=(.+)&/)[1];
			break;
		case "release":
			var releasebox = getElementsByClassName(document, "td", "info")[1];
			var link = releasebox.getElementsByTagName("a")[0];
			entity_mbid = link.href.match(/id=(.+)&/)[1];
			break;
	}
	return entity_mbid;
}


// Function which displays the artist MBID
function showArtistMBID() {
	var artistinfobox = getElementsByClassName(getElementsByClassName(document, "table", "artisttitle")[0], "td", "info")[0];
	var mbid = getEntityMBID("artist");
	var BRs = artistinfobox.getElementsByTagName("br");
	var sortname = BRs[BRs.length-1].nextSibling;
	sortname = sortname? sortname.nodeValue : null;

	var fragment= document.createDocumentFragment();
	if (sortname) { fragment.appendChild(document.createElement("br")); }
	fragment.appendChild(createMBIDFragment(mbid, artistMBIDsearchURL));
	
	artistinfobox.appendChild(fragment);
}

// Function which displays the release MBID
function showReleaseMBID() {
	var ReleaseNameZone = getElementsByClassName(document, "table", "releasebegin");
	ReleaseNameZone = ReleaseNameZone[ReleaseNameZone.length-1];
	ReleaseNameZone = getElementsByClassName(ReleaseNameZone, "td", "title")[0];
	var mbid = getEntityMBID("release");

	var fragment= document.createDocumentFragment();
	fragment.appendChild(document.createElement("br"));
	fragment.appendChild(createMBIDFragment(mbid, releaseMBIDsearchURL));
	
	ReleaseNameZone.appendChild(fragment);
}

function createMBIDFragment(mbid, url) {
	var mbidelt;
	if (url) {
		mbidelt = document.createElement("a");
		mbidelt.setAttribute("href", url.replace(/%s/, mbid) );
	}
	else {
		mbidelt = document.createElement("span");
	}
	mbidelt.style.color = style_color;
	mbidelt.style.backgroundColor = style_backgroundColor;
	mbidelt.style.padding = style_padding;
	mbidelt.style.fontSize = style_fontSize;
	mbidelt.style.fontWeight = style_fontWeight;
	mbidelt.appendChild( document.createTextNode(mbid) );
	return (mbidelt);
}

function debug(coucou) {
	try {
		opera.postError(coucou);
	} catch(e) {/*alert(coucou);*/}
}


// Helper function for getting html element by class name
// Written by Jonathan Snook, http://www.snook.ca/jonathan
// Add-ons by Robert Nyman, http://www.robertnyman.com
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements);
}

})();