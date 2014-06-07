// ==UserScript==
// @name           RSI Chatroll - Mute+
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      http://Pigskinempire.com/
// @description    Adds Mute, Highlight, & Better Name Visibility (click user icon to toggle Mute)
// @include        http://chatroll.com/empire-chat
// @grant          GM_addStyle
// @version        1.05.2
// @copyright      Hidden User 2013 [ http://Pigskinempire.com/ ]
// @license        CC0 
// @licesne.ext    Public Domain
// ==/UserScript==

//-- jQuery compatibility wrapper. May not be required, uncomment if it acts up
//this.$ = this.jQuery = jQuery.noConflict( true );


/*//-- IMPOTANT NOTE:
	This is a HORRIBLE way to handle css changes... REALY need to change this to set up a style sheet at the
	 begining with a callback handle and just edit it on the fly, rather than repeatedly inserting new rules
	 to override the old ones. This is only acceptable because so far we only needed to make minimal additions
	 and it was fast to bang out. GM_addstyle does NOT give a calback reference to the css element it creates,
	 so that will have to be re-implemented
--//*/

//-- Make User Names light blue so they aren't confused with text, unhide user list link.
GM_addStyle( '.message-profile-name{ color: #A0E0FF; }\n' + //-- #85DFFF is a really bright, welcome message blue
             '.chat-contacts-show-button{ display: block !important; }' );
//-- user list link doesn't fully work, I'd have to dig into the chatroll js to get the complete call... something to add.

//-- set up a temporary mute listing (gets flushed each page load)
var gMarkList = {}; //-- you could use this read in permanent storage on load

//-- toggle the Mute status for a particular user name, click captured from jQuery
function uToggle( event ){
	if (event.which == 1){ //-- only process left clicks
		//-- jQuery: store the user-hash-clas from the first ancestor with class '.message'
		var vStrKey = $(this).closest( '.message' ).attr( 'class' ).split( ' ' )[2];
		if (!isNaN( vStrKey.slice( 0, 1 ) )){//-- CSS doesn't like unescaped numbers starting classes
			vStrKey = '\\3' + vStrKey.slice( 0, 1 ) + ' ' + vStrKey.slice( 1 );
		}//-- css unicode escape sequence for numbers is '\3'+digit+' '
		
		var vBooToggle;
		
		if (event.altKey){ //-- if altKey used, highlight their text... reuse our save list with an added '?' to define hilight entries
			vBooToggle = (gMarkList[vStrKey + '?'] = !gMarkList[vStrKey + '?']); //-- easy to add permanent storage here for TRUE
			GM_addStyle( '.' + vStrKey + ' .message-text{ color: ' + ((vBooToggle) ? 'orange' : '#EAF1FF') + '; }' );
		}else{//-- all other left clicks handled here
			//-- Reverse & store the Mute state for this user-hash-class so we can reverse it later (default is FALSE)
			var vBooNuke   = (gMarkList[vStrKey] && event.shiftKey); //-- already muted + shift key = Nuke
			var vBooToggle = (gMarkList[vStrKey] = (!gMarkList[vStrKey] | vBooNuke)); //-- easy to add permanent storage here for TRUE
			
			//-- set new style for user-hash-class :: see Impotant Note at top
			GM_addStyle( ((vBooNuke) ? '.' + vStrKey + '{ display: none; }\n' : //-- this is all you need to nuke a user-hash-class
			    '.' + vStrKey + ' .message-text, .' + vStrKey + ' .message-group-items{ display: ' +
			    ((vBooToggle) ? 'none' : 'inline') + '; }\n.' +  vStrKey + ' .message-profile-name:after{ content: "' +
			    ((vBooToggle) ? ' ~MUTED~ "; font-weight: bolder; color: green; background-color: black; }' : '"; }') ) );
		}
		return false; //-- false so the event doesn't bubble up
	}else{ //-- drop right, middle, or custom click events
		return true; //-- true so the click event does bubble
	}
}

//-- jQuery click capture for chat avatars (we start an element class below the link code to avoid links popping from the pic)
$( '.profile-icon-image' ).live( 'click', uToggle )