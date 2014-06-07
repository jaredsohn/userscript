// ==UserScript==
// @author		tomasz.frelik (at) enzo.pl
// @namespace	http://frelo.enzo.pl/userscript
// @name		Travian: Reports On Main Page (Opera only)
// @description	Shows new report messages on main page (dorf1.php). 
// @include http://s*.travian.com/dorf1.php
// ==/UserScript==

// EDIT HERE
var messagesInYourLanguage = "Messages:";
// STOP EDITING


var berichteURL = "berichte.php";
var newMessageFindPattern = "//table[1]/tbody[1]/tr[1]/td[3]/form[1]/table[1]/tbody[1]//tr/td[2][contains(text(),'(')][contains(text(),')')]/a[1]";
var rightMenuFindPattern = "//div[5]/br[1]";
var messagesGreenFindPattern = "//img[@src = 'img/un/l/m3.gif']";

var newIframe;

window.addEventListener( 'load', function( e ) {

	// check if messages icon is green
	xPathResults = document.evaluate( messagesGreenFindPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	//alert( xPathResults.snapshotLength ); 	
	if ( xPathResults.snapshotLength < 1 ) {
		return;
	}

	newIframe = document.createElement( 'iframe' );
	newIframe.style.display = "none";
	document.body.appendChild( newIframe );	
	newIframe.onload = parseBerichte;
	newIframe.src = "berichte.php";
	
},false);


function parseBerichte( e ) {
	
	xPathResults = newIframe.document.evaluate( newMessageFindPattern, newIframe.document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	if ( xPathResults.snapshotLength == 0 ) {
		return;
	}
	
	xPathResults2 = document.evaluate( rightMenuFindPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	var res = xPathResults2.snapshotItem( 0 );	
	
	// insert new line and header
	brElement = document.createElement( 'br' );
	res.parentNode.insertBefore( brElement, res );	
	
	messagesElement = document.createElement( 'b' );
	messagesElement.appendChild( document.createTextNode( messagesInYourLanguage ));
	res.parentNode.insertBefore( messagesElement, res );	
	
	i = 0;
	var message;
	//messages = new Array();
	while (( a = xPathResults.snapshotItem(i)) != null ) {
		
		message = document.createElement('div');
		message.appendChild( a );	
		res.parentNode.insertBefore( message, res );
		
		i++;
	}	
}