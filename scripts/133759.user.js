// ==UserScript==
// @name        webop.me.tracking
// @namespace   phoc2kx2
// @description Keeps track of torrents (visited/downloaded) - Big thanks to cacafiesta & Ultralisk
// @include     http://webop.me/*
// @version     0.1
// ==/UserScript==

const VISITED_TORRENT_BACKCOLOR = "#330000";
const DOWNLOADED_TORRENT_BACKCOLOR = "#003300";

function lt(a, b) {
	return a - b;
}

function getTIDS( sName ) {
	var siA = GM_getValue( sName, "" )
	if ( siA == "" ) return [];
	
	siA = siA.split(',');
	var ia = [];
  
	for (var i = 0; i < siA.length; i++) {
		n = parseInt( siA[i] );
		if ( !isNaN(n) ) {
			ia.push( n );
		}
	}

	return ia;
}

function setTIDS( sName, iA ) {
  iA.sort(lt)
  iA.reverse()
  GM_setValue( sName, iA.join(",") );
}

function addTID( sName, iA, TID ) {
	if ( iA.indexOf(TID) == -1 ) {
		iA.push(TID);
	}
	setTIDS( sName, iA );
}

function delTID( sName, iA, TID ) {
	var index;
	iA = getTIDS( sName );
	do {
		index = iA.indexOf(TID);
		if ( index != -1 ) {
			iA.splice(index,1);
			setTIDS( sName, iA );
		}
	} while (index != -1)
}

function checkTID( sName, iA, iTID ) {
	iA = getTIDS( sName );
	return iA.indexOf(iTID);
}

function extractTID( sHREF ) {
	aParts = sHREF.split("/torrents/");

	if (aParts.length != 2) {
		return "";
	}
	else {
		iTID = parseInt( aParts[1] );
		if ( isNaN(iTID) ) {
			return "";
		}
		else {
			return iTID;
		}
	}
}

function hrefMatches( sHref, iA ) {
	if ( sHref.indexOf("/torrents/") == -1 ) {
  		return false;
  	}
  	var thisTID = extractTID( sHref );
	if ( iA.indexOf(thisTID) == -1 ) {
		return false;
	}
	return true;
}

function downloadEvntLstnr (iaV, iaD, iTID) {
	iaV = getTIDS("visited");
	iaD = getTIDS("downloaded");
	addTID( "downloaded", iaD, iTID);
	iaD = getTIDS("downloaded");
	delTID( "visited", iaV, iTID);
	iaV = getTIDS("visited");
}

function modifyTorrentList( iaV, iaD ) {
	var i,j,td

	tBody = document.getElementById( "torrentList" ).firstElementChild.nextElementSibling.nextElementSibling;
	i = tBody.childNodes.length - 1
	
	if (i < 0) return;
	while ( i >= 0 ) {
		var thisRow = tBody.childNodes[i];
		try {
			theHref = thisRow.firstChild.nextSibling.firstChild.nextSibling.firstChild.href;
			if (hrefMatches( theHref, iaD )) {
				for ( j = 0; j < thisRow.children.length; j++ ) {
					td = thisRow.children[j];
					td.style.background = DOWNLOADED_TORRENT_BACKCOLOR;
				} 
			}
			if (hrefMatches( theHref, iaV )) {
				for ( j = 0; j < thisRow.children.length; j++ ) {
					td = thisRow.children[j];
					td.style.background = VISITED_TORRENT_BACKCOLOR;
				}
			}
		}
		catch (err) {
			i = i-1;
			continue;
		}
		i = i - 1;
	}
}

function modifyTorrentPage( iaV, iaD, iTID) {
	var dlLink = document.getElementById("torrentcontrols").firstElementChild.nextElementSibling.firstElementChild;
	dlLink.addEventListener('click', 	function(){downloadEvntLstnr(iaV, iaD, iTID);}, false);
	
	if ( checkTID( "visited", iaV, iTID ) != -1) {
		document.getElementById("torrentcontrols").style.backgroundColor= VISITED_TORRENT_BACKCOLOR;
	} else if ( checkTID( "downloaded", iaD, iTID ) != -1 ) {
		document.getElementById("torrentcontrols").style.backgroundColor= DOWNLOADED_TORRENT_BACKCOLOR;
	} else addTID( "visited", iaV, iTID );
}

var iaVisited = getTIDS( "visited" );
var iaDownloaded = getTIDS( "downloaded" );

var pathParts = window.location.pathname.split("/");

if ((pathParts.length == 2) || (pathParts.length == 3 && pathParts[1] == "tags") || (pathParts.length == 4 && pathParts[1] == "users" && pathParts[3] == "torrents")){
	modifyTorrentList( iaVisited, iaDownloaded );
}
else if (pathParts.length == 3 && pathParts[1] == "torrents") {
	modifyTorrentPage( iaVisited, iaDownloaded, parseInt(pathParts[2]) );
}
