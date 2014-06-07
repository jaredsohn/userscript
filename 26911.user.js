// ==UserScript==
// @name           Gmail Last.fm Signature
// @description    Automatically inserts a signature containing current listening information for a specified Last.fm user
// @namespace      http://www.prehensile.co.uk/greasemonkey/lastfm
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==
//
// Version: 0.31 (09/06/08) 
// Version History:
// 0.31		Fixed a minor bug where artist / track name contains commas
// 0.3		First public release
// Based on: Gmail HTML Signatures 1.07 by Jerome Dane, http://blankcanvasweb.com/gmail2_html_sigs/
// Based on: Gmail: Random Signature Remote 1.0 by Stuart Langridge (sil at kryogenix dot org)
// Author: Henry Cooke
// Latest Information: http://prehensile.co.uk/blog/?cat=27

// --------------------------------------------------------------------------------------
// ---------- Do not edit below this line unless you really know what you are doing -----
// --------------------------------------------------------------------------------------

var version = '0.31';
var gmail = null;
var bodyArea = null;
var msg_retry;
var arrCurrentTrackData;
var context = "";
var lastfmUserName = "";
var sigFileURL = "";
var gmailAve;
var replyListening = false;
var inserted = false;
var initialised = false;


// begin the insert process by fetching last.fm data
function begin_insert(){
	if( !inserted ){
		inserted = true;
		wrapper_getLastFmData();		
	}
}

function getLastFmData(){
	checkLastfmUser(); 
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://ws.audioscrobbler.com/1.0/user/' + lastfmUserName + '/recenttracks.txt',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'text/plain',
	    },
	    onload: function( responseDetails ) {
  	   		onLastFmData( responseDetails );
	    }
		});
}

function fetchSigFile() {
	checkSigFileURL();
	  GM_xmlhttpRequest({
	    method: 'GET',
	    url: sigFileURL,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'text/plain',
	    },
	    onload: function(responseDetails) {
	    	onSigFile( responseDetails );
	    }
		});
}

// parse recieved last.fm data into an array. will need to change if last fm's recenttracks.txt data format changes
function onLastFmData( responseDetails ){
	var arrEntries = responseDetails.responseText.split('\n');
	var parts = arrEntries[0].split(",");
	var trackData = "";
	if( parts.length > 2 ) trackData = parts.slice( 1 ).join( "," ); //0.31 - deal with artist / track names that contain commas
	else trackData = parts[1];
	arrCurrentTrackData = trackData.split( " – " ); // save track data into an array to use later
	fetchSigFile();
}

// response handler for receiving a sig file
function onSigFile( responseDetails ){	
	if( !checkText( bodyArea.value, responseDetails.responseText ) ){ // check message box doesn't already contain sig
		var sig = parseSig( responseDetails.responseText, arrCurrentTrackData );
		insertSig( sig );
	}
}

// replace tokens in sig file with last.fm data
function parseSig( sigText, trackData ){
	var parsed = "";
	
	// insert data from array 
	parsed = sigText.replace( "%artist%", trackData[0] ); 
	parsed = parsed.replace( "%track%", trackData[1] ); 
	
	return( parsed );
}

// insert signature into gmail message body area
function insertSig( sigText ){
	if( bodyArea ){		
		if( context == "Conversation" ) bodyArea.value = sigText + bodyArea.value;
		else bodyArea.value = bodyArea.value + sigText;		
		inserted = true;		
	}
}	

// event handler, used in conversation view to listen for user opening reply box
function onDOMNodeInserted( event ){	
	var eventContainsBody = getMessageTextarea( event.target ); 
	if( eventContainsBody ){	
		bodyArea = eventContainsBody;
		begin_insert();		
	}
}

// event handler, used in conversation view to listen for user closing reply box
function onDOMNodeRemoved( event ){		
	var eventContainsBody = getMessageTextarea( event.target ); 
	if( eventContainsBody ) inserted = false;	
}

function init(){
	
	if( !initialised ){
		
		if (unsafeWindow.gmonkey) {							 
			unsafeWindow.gmonkey.load('1.0', function(gmail) {
			   function setViewType() {             	
			   		
			   	var str = '';
		              	
				   	switch (gmail.getActiveViewType()) {
						case 'tl': str = 'Threadlist'; break;
						case 'cv': str = 'Conversation'; break;
						case 'co': str = 'Compose'; break;
						case 'ct': str = 'Contacts'; break;
						case 's': str = 'Settings'; break;
		            	default: str = 'Unknown';
		          	}
					
					context = str;				
					bodyArea = false;
					inserted = false;
					
					if( gmailAve ) removeReplyListeners( gmailAve );
					gmailAve = gmail.getActiveViewElement();																	
					
					if( str == 'Compose' ) {
						compose_context( gmailAve );
					} else if( str == 'Conversation'){
						conversation_context( gmailAve );
					}
	           	}
				
				function message_box_listener( ave ) {			
					var gmt = getMessageTextarea( ave );				
					if( gmt ) {
						bodyArea = gmt;
						return true;
					} else {
						return false;
					}
				}
				
				function compose_context( ave ) {				
					if( message_box_listener( ave ) ) {
						begin_insert();	
					} else {
						if( msg_retry-- > 0 ) setTimeout(compose_context, 500);	
					}
				}
				
				function conversation_context( ave ){				
	        		addReplyListeners( ave );
				}
										
				msg_retry = 2;
				
	            gmail.registerViewChangeCallback(setViewType);
	        	setViewType();
		});
		}
		
		initialised = true;
	}
}

window.addEventListener('load', init, true );
window.addEventListener( 'unload', unInit, false );


// ***
// UTILITY FUNCTIONS
// ***

function unInit(){
	removeReplyListeners( gmailAve );
	window.removeEventListener( 'load', init, true );
	window.removeEventListener( 'unload', unInit, false );
}

function addReplyListeners( ave ){
	if( !replyListening ){
		ave.addEventListener( "DOMNodeInserted", onDOMNodeInserted, false );
		ave.addEventListener( "DOMNodeRemoved", onDOMNodeRemoved, false );
		replyListening = true;
	}
}

function removeReplyListeners( ave ){
	if( replyListening  ){
		ave.removeEventListener( "DOMNodeInserted", onDOMNodeInserted, false );
		ave.removeEventListener( "DOMNodeRemoved", onDOMNodeRemoved, false );
		replyListening = false;
	}
}


// check if bodyText contains sigText
function checkText( bodyText, sigText ){
	var ret = false;
	if( bodyText && sigText ){
		var parts = sigText.split( "%" ); // split sig on token delimiter
		var positives = 0;
		for( var i=0; i< parts.length; i++ ){
			if( i % 2 == 0 ){ // clever bit: in theory, if we split on the delimiter, even-numbered array entries will contain the plaintext portions of the sig ( & odd-numbered  will contain token names )
				var chunk = parts[ i ];
				if( bodyText.indexOf( chunk ) > -1 ) positives ++;					
			}
		}
		if( positives >= (parts.length/2) ) ret = true;
	}
	return( ret );
}

// check if a last.fm username has been provided. if not, prompt user for it
function checkLastfmUser(){
	var lfmu = GM_getValue( "lastfmUser" );
	if( !lfmu ){
		lfmu = prompt( "Please enter your last.fm user name");
		GM_setValue( "lastfmUser", lfmu );
	}
	lastfmUserName = lfmu;
}

// check if a sigfile URL has been provided. if not, prompt user for it
function checkSigFileURL(){
	var sfURL = GM_getValue( "sigFile" );
	if( !sfURL ){
		sfURL = prompt( "Please enter a sig file URL");
		GM_setValue( "sigFile", sfURL );
	}
	sigFileURL = sfURL;
}

// get plaintext message input box from activeViewElement (ave)
function getMessageTextarea( ave ){	
	var ret = false;
	//divine gmail message body area
	var elems = document.evaluate( "//textarea[@name='body']", ave, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );	
	if(elems.snapshotLength > 0 ) ret = elems.snapshotItem(0);
	return( ret );
}

// workarounds for unsafewindow's xmlhttprequest security restriction
function wrapper_getLastFmData(){
	window.setTimeout(function() {
    getLastFmData();
  }, 0);
}
function wrapper_fetchSigFile(){
	window.setTimeout(function() {
    fetchSigFile();
  }, 0);
}

