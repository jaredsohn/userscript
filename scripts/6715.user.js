// ==UserScript==
// @author		tomasz.frelik (at) enzo.pl
// @namespace	http://frelo.enzo.pl/userscript
// @name		Travian: Mark Messages Read
// @description	Mark all unread messages read in one go on the Reports page. Note that it will only mark messages from the list on the current page. International version. Uses AJAX. The way it works is it loads all the unread messages in the background, so that the server marks them read. It may take a while sometimes. 
// @include		http://s*.travian.com/berichte.php
// ==/UserScript==

// EDIT HERE
// this is the text of the link
var markMessagesReadInYourLanguage = 'Mark MSGs Read';
// STOP EDITING


// this is obsolete and doesn't need editing
// this is the text that shows after unread message's title
//var newInYourLanguage = '(new)';

var msgURLs;
var menuFindPattern = "//table[1]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr[1]/td[1]/br[1]";

//var newMessageFindPattern = "//table[1]/tbody[1]/tr[1]/td[3]/form[1]/table[1]/tbody[1]//tr/td[2][contains(text(),'" + newInYourLanguage + "')]/a[1]";
var newMessageFindPattern = "//table[1]/tbody[1]/tr[1]/td[3]/form[1]/table[1]/tbody[1]//tr/td[2][contains(text(),'(')][contains(text(),')')]/a[1]";


window.addEventListener( 'load', function( e ) {
			
	var resultLinks = document.evaluate( menuFindPattern, document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	//alert( resultLinks.snapshotLength );      
	res = resultLinks.snapshotItem(0);
	//alert( res );

	xPathResults = document.evaluate( newMessageFindPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	//alert( xPathResults.snapshotLength ); 	
	//alert( xPathResults.snapshotItem(0));
	
	i = 0;
	msgURLs = new Array();
	while (( a = xPathResults.snapshotItem(i)) != null ) {
		//alert( a.href + " " + typeof( a.href ));
		//a_href= a.href;
		msgURLs.push( a.href );
		i++;
	}	

	// add link to mark messages as read
	if ( msgURLs.length > 0 ) {
		var markReadLink = document.createElement( 'a' );
		markReadLink.href = "#";
		markReadLink.addEventListener( 'click', markRead, false );
		markReadLink.appendChild( document.createTextNode( markMessagesReadInYourLanguage ));
		
		res.parentNode.insertBefore( markReadLink, res );
	}	

}, false );

function markRead( e ) {
	while ( msgURLs.length > 0 ) {
		msgURL = msgURLs.pop();
		request( msgURL );
	}
	
	// and make the link disappear
	// srcElement for Opera, target for Firefox
	if ( e.srcElement ) {
		e.srcElement.parentNode.removeChild( e.srcElement );
	} else if ( e.target ) {
		e.target.parentNode.removeChild( e.target );
	}	
}

// make ajax request
function request( url ) {
	var ajax = new XMLHttpRequest();
	ajax.open( 'GET', url, false );
	ajax.send( '' );
}