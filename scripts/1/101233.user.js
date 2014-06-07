// ==UserScript==
// @name myCheggitMarkRead
// @description Marks Things Read
// @include http://cheggit.net/*
// @namespace none
// @version 0.3
// ==/UserScript==

//
// preferences
//

const HIDE_VISITED = true;
const VISITED_TORRENT_COLOR = "grey";

//
// begin source
//

//
// GLOBALS (due to callbacks needed without parameters)
//

var iaVisited = uncook( "visited" );
var allTorrentNumbers = [];

function lt(a, b) {
	return a - b;
}

// reads ff environment value as csv of int strings, returns parsed int array
function uncook( sValue ) {
	var siA = GM_getValue( sValue, "" )
	if ( siA == "" ) return [];
	
	siA = siA.split(',');
  var ia = [];
  
  for (var i = 0; i < siA.length; i++) {
  	n = parseInt( siA[i] );
  	if ( !isNaN(n) ) {
  		ia.push( n );
  	} // if
  } // for

  return ia;
} // uncook()

// writes ff config value as csv of int strings
function cook( sValue, iA ) {
  iA.sort(lt) // might get expensive over time
  iA.reverse()
  GM_setValue( sValue, iA.join(",") );
}
// adds a value to the list and cooks into ff config
function addCook( sValue, iA, newval ) {
	if ( iA.indexOf(newval) == -1 ) { // not currently in set
		iA.push(newval)
  	cook( sValue, iA );
  }
}

function getTID( sHREF ) {
	aParts = sHREF.split("torrentid=");
	if (aParts.length != 2) {
	  return "";
	} // if
	else {
		iTID = parseInt( aParts[1] );
		if ( isNaN(iTID) ) {
			return "";
		} // if
		else {
			return iTID;
		} // else
	} // else
} //getTID()

function isTorrents( sHref ) {
	return sHref.indexOf("/torrents.php?") >= 0;
}

function TIDMatches( tid, iaVisited ) {
  return iaVisited.indexOf(tid) >= 0;
}

function markAllRead() {
	var theButton = document.getElementById( 'MarkAllReadButton' );
	theButton.setAttribute('onclick', '');
	var i=0;
  for (i = 0; i < allTorrentNumbers.length; i++) {
  	addCook( "visited", iaVisited, allTorrentNumbers[i] );
  }
  theButton.setAttribute('style','background-color: grey');
  theButton.setAttribute('value','Marked all items as read!');
}
function addMarkAllReadButton() {
	var marButton = document.createElement('input');
	marButton.setAttribute('type', 'button');
	marButton.setAttribute('value', 'Mark all as read');
	marButton.setAttribute('id', 'MarkAllReadButton');
	document.getElementById( "torrentList" ).parentNode.appendChild( marButton );
	
	marButton = document.getElementById( 'MarkAllReadButton' );
	marButton.addEventListener('click', markAllRead, true);
}

function modifyBrowseTorrents( iaVisited ) {
  function modifyRow( row ) {
  	if ( HIDE_VISITED ) {
  		row.parentNode.removeChild( thisRow );
  		return;
  	}
	 	for ( var i = 0; i < row.children.length; i++ ) {
  	  var td = row.children[i];
  	  td.style.background = VISITED_TORRENT_COLOR;
  	} // for
  }

  tBody = document.getElementById( "torrentList" ).firstElementChild;

  allTorrentNumbers = [];
 
  var i = tBody.childNodes.length - 1 // index of last child
   while ( i >= 0 ) {
  	var thisRow = tBody.childNodes[i];
  	try {
  		var theHref = thisRow.firstChild.nextSibling.firstChild.nextSibling.firstChild.href;
  		
  		if ( isTorrents(theHref) ) {
  			var theTID = getTID(theHref);

  			allTorrentNumbers.push( theTID );

  		  if (TIDMatches( theTID, iaVisited )) {
  			  modifyRow( thisRow );
  		  } // if
  		} // if
  	} // try
    catch (err) {
    	i = i-1;
    	continue;
    } // catch
  	i = i-1;
  } // while
	addMarkAllReadButton();
} // modifyBrowseTorrents

//
// main body, execute immediately
//

switch( window.location.pathname ) {
	case "/browsetorrents.php":
	  modifyBrowseTorrents( iaVisited );
    break;
  case "/torrents.php":
  case "/download.php":
    var torrentID = getTID(location.search)
    addCook( "visited", iaVisited, torrentID );
  	break;
  default:
    break;
}