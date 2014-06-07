// ==UserScript==
// @name empornium_markread
// @description Hides/modifies posts marked as read on empornium
// @include http://torrents.empornium.me/*
// @namespace none
// @version 0.1
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

// reads environment variable as csv of int strings, returns parsed int array
function uncook( envVarName ) {
	var siA = GM_getValue( envVarName, "" )
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

// writes environment variable as csv of int strings
function cook( envVarName, iA ) {
  iA.sort(lt) // might get expensive over time
  iA.reverse()
  GM_setValue( envVarName, iA.join(",") );
}
// adds a value to the list and cooks into ff config
function addCook( envVarName, iA, newval ) {
	if ( iA.indexOf(newval) == -1 ) { // not currently in set
		iA.push(newval)
  	cook( envVarName, iA );
  }
}

function getTID( sHREF ) {
	aParts = sHREF.split("id=");
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
	document.body.childNodes[4].appendChild( marButton );
	
	marButton = document.getElementById( 'MarkAllReadButton' );
	marButton.addEventListener('click', markAllRead, true);
}

function modifyBrowseTorrents( iaVisited ) {
  function modifyRow( row ) {
  	if ( HIDE_VISITED ) {
      row.style.display = "none";
  	}
  	else {
	 	  for ( var i = 0; i < row.children.length; i++ ) {
    	  var td = row.children[i];
  	    td.style.background = VISITED_TORRENT_COLOR;
  	  } // for
  	}
  }

  allRows = document.getElementsByClassName( "tr11" );
  
  var i = 0;
  for (i=0; i<allRows.length; i++) {
  	var thisRow = allRows[i];
    try {
  	  var theHref = thisRow.childNodes[3].firstChild.firstChild.firstChild.href;
      var theTID = getTID(theHref);

      allTorrentNumbers.push( theTID );

	    if (TIDMatches( theTID, iaVisited )) {
    	  modifyRow( thisRow );
      }
    }
    catch (err) {
    	continue;
    }
  }
  addMarkAllReadButton();
} // modifyBrowseTorrents

//
// main body, execute immediately
//

switch( window.location.pathname ) {
	case "/browse.php":
	  modifyBrowseTorrents( iaVisited );
    break;
  case "/details.php":
    var torrentID = getTID(location.search)
    addCook( "visited", iaVisited, torrentID );
  	break;
  default:
    break;
}