// ==UserScript==
// @name           RSI Chatroll - Toolkit
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      http://Forum.VSAlpha.com/
// @description    Adds Mute(r-click)/Nuke(shft+r-click after mute) & Highlight(alt+r-click) actions to user icons +Better Name Visibility 
// @include        http://chatroll-cloud-1.com/embed/chat/roberts-space-industries*
// @grant          GM_addStyle
// @grant          GM_listValues
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @version        1.13.06.30.0921
// @copyright      Void Singer 2013 [ http://Forum.VSAlpha.com/ ]
// @license        CC0 [ http://creativecommons.org/publicdomain/zero/1.0 ]
// @licesne.ext    Public Domain, w/ thanks to John Tennyson, Koros, Rod Sterling, Sansom, SnowCrash, and many others.
// ==/UserScript==

//-- jQuery compatibility wrapper. May not be required, uncomment if it acts up
//this.$ = this.jQuery = jQuery.noConflict( true );

/*//-- IMPOTANT NOTE:
	This is a HORRIBLE way to handle css changes... REALY need to change this to set up a style sheet at the
	 begining with a callback handle and just edit it on the fly, rather than repeatedly inserting new rules
	 to override the old ones. This is only acceptable because so far we only needed to make minimal additions
	 and it was fast to bang out. GM_addStyle does NOT give a calback reference to the css element it creates,
	 so that will have to be re-implemented
--//*/

//-- set up a temporary cache to hold our muted and hilighted users keys
var gMarkList = {};
var gBooIsSafe = false; //-- only engage persistance when it's actually supported
function uTest(){ //-- Functionalized test to see if TamperMonkey will behave with it
	if (typeof GM_listValues !== "undefined" || typeof GM_getValue !== "undefined" ||
	    typeof GM_setValue !== "undefined" || typeof GM_deleteValue !== "undefined"){
		gBooIsSafe = true;
	}
}

function uLoad(){ //-- encapsulated load as a function to keep variable spaces clear
	var vBaseCSS = '.message-profile-name{ color: #A0E0FF; }\n' +
//-- confirmed "new site" CIG staff markers
'.ERXbFX3RGD9 .message-text{ color: orangered; }\n' + //-- Chelsea (chelsea) Chelsea ??? - Customer Support
'.BXigdyZwWCk .message-text{ color: orangered; }\n' + //-- devoinc (devoninc) Nate Blaisdell - Senior Designer
'.pvFlfBRzXe_ .message-text{ color: orangered; }\n' + //-- Travis Day (MightyMonkey) Travis Day - Associate Producer
'.NEqpH3ym0Pa .message-text{ color: orangered; }\n' + //-- ??? (Rico.CIG) Rico Acosta - ???
'.PkE5qDDMUuR .message-text{ color: orangered; }\n' + //-- Zane Bien (zanebien) Zane Bien - Web/Interface
//-- confirmed "new site" Turbulent staff markers
'.dRA1nfRAGCv .message-text{ color: orangered; }\n' + //-- Bault () Benoit Beausejour - CTO
'.EdwhxNvAK-j .message-text{ color: orangered; }\n' + //-- Void (void42) Felix Courtemanche - Turbulent Senior Programmer
'.V38kPj3gIRO .message-text{ color: orangered; }\n' + //-- Garrath (???) ??? - ???
'\n'; //-- tweak default name colors and highlight known devs
	if (gBooIsSafe){ //-- prevent dumb environment from choking on features they claim to support
		var vSaved   = GM_listValues();
		if (0 <= vSaved.length){ //-- do we have any hilights/mutes saved in our list?
			for each (var vUser in vSaved){            //-- get each user key in saved list
				gMarkList[vUser] = GM_getValue( vUser ); //-- move the saved value to our cache
				if ('?' == vUser.slice( -1 )){            //-- if it's a hilight entry add to hilight string
					vBaseCSS += '.' + vUser.slice( 0, -1 ) + ' .message-text{ color: orange; }\n';
				}else{                                   //-- otherwise add to muted string
					vBaseCSS += '.' + vUser + ' .message-text, .' + vUser + ' .message-group-items{ display: none; }\n.' + vUser +
						' .message-profile-name:after{ content: " ~MUTED~ "; font-weight: bolder; color: darkgreen; background-color: black; }\n';
				}//-- we get away with if/else because we ONLY save two kinds of users.. hilighted, and muted
			}  //-- we don't need to know the value of their keys, because we save only true, and delete false
		}
	}
	 //-- set starting CSS, hilighted/muted users & tweak default name color, 
	GM_addStyle( vBaseCSS );
}

//-- toggle the Mute status for a particular user name, click captured from jQuery
function uToggle( event ){
	if (event.which == 3){ //-- only process right clicks
		//-- jQuery: store the user-hash-clas from the first ancestor with class '.message'
		var vStrKey = $(this).closest( '.message' ).attr( 'class' ).split( ' ' )[2];
		if (!isNaN( vStrKey.slice( 0, 1 ) )){ //-- CSS doesn't like unescaped numbers starting classes
			vStrKey = '\\3' + vStrKey.slice( 0, 1 ) + ' ' + vStrKey.slice( 1 );
		}//-- css unicode escape sequence for numbers is '\3'+digit+' ' yeah that's a space at the end o.O;
		
		var vBooToggle;
		
		if (event.altKey){ //-- if altKey used, highlight their text... reuse our save list with an added '?' to define hilight entries
			vBooToggle = (gMarkList[vStrKey + '?'] = !gMarkList[vStrKey + '?']);
			GM_addStyle( '.' + vStrKey + ' .message-text{ color: ' + ((vBooToggle) ? 'orange' : '#EAF1FF') + '; }' );
			vStrKey = vStrKey + '?'; //-- cheat way to store the user key as hilight rather than mute
		}else{//-- all other right clicks handled here
			//-- Reverse & store the Mute state for this user-hash-class so we can reverse it later (default is FALSE)
			var vBooNuke   = (gMarkList[vStrKey] && event.shiftKey); //-- already muted + shift key = Nuke
			var vBooToggle = (gMarkList[vStrKey] = (!gMarkList[vStrKey] | vBooNuke));
			
			//-- set new style for user-hash-class :: see Impotant Note at top
			GM_addStyle( ((vBooNuke) ? '.' + vStrKey + '{ display: none; }\n' : //-- this is all you need to nuke a user-hash-class
			    '.' + vStrKey + ' .message-text, .' + vStrKey +' .message-group-items{ display: ' +
			    ((vBooToggle) ? 'none' : 'inline') + '; }\n.' +  vStrKey + ' .message-profile-name:after{ content: "' +
			    ((vBooToggle) ? ' ~MUTED~ "; font-weight: bolder; color: green; background-color: black; }' : '"; }') ) );
		}
		if (gBooIsSafe){ //-- prevent dumb environment from choking on features they claim to support
			if (vBooToggle){ //-- if we toggled the user-key to true permanently store it
				GM_setValue( vStrKey, true );
			}else{           //-- otherwise, it toggled to false from true, so remove it from storage
				GM_deleteValue( vStrKey );
			}
		}
		//-- so the event doesn't bubble up
		event.preventDefault();
		event.stopImmediatePropagation();
		return false;
	}else{ //-- drop right, middle, or custom click events
		return true; //-- true so the click event does bubble
	}
}
uTest(); //-- really hope this works...
uLoad(); //-- load defaults

//-- jQuery click capture for chat avatars (we start an element class below the link code to avoid links popping from the pic)
$( '.profile-icon-image' ).live( 'click', uToggle )