// ==UserScript==
// @name           RSI Chatroll Tools for GreaseMonkey (FireFox)
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      http://WWW.VSAlpha.com/
// @description    Adds Mute(r-click)/Nuke(shft+r-click after mute) & Highlight(alt+r-click) actions to user icons +Better Name Visibility 
// @include        http://chatroll-cloud-1.com/embed/chat/roberts-space-industries*
// @grant          GM_addStyle
// @grant          GM_listValues
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @version        3.12.14.1604
// @copyright      Void Singer 2013 [ http://Forum.VSAlpha.com/ ]
// @license        CC0 [ http://creativecommons.org/publicdomain/zero/1.0 ]
// @licesne.ext    Public Domain, w/ thanks to John Tennyson, Koros, Rod Sterling, Sansom, SnowCrash, Mape and many others.
// ==/UserScript==

/*//-- ToDo:
	add code for pm detection, try to distinguish between opening and responding
	add code for autocomplete
	add code for cowbell detection
	add code for user joins
	fix Banner
--//*/


//-- set up a temporary cache to hold our muted and hilighted users keys
var gMarkList = {};

var gLstStaff = [
//-- confirmed CIG staff markers: "Moniker" (Handle) Full Name - Position
	'-VK2Hc5Zudh', //-- Hannes (Hannes) Hannes Appell - ???
	'_7m3gIE7Lsw', //-- Alway (Alway) Joshua ??? - ???
	'51hKuNIp8QX', //-- Drast (Drast) ??? ??? - "Staff"
	'BXigdyZwWCk', //-- devoinc (devoninc) Nate Blaisdell - Senior Designer
	'C5FxpoXT6Iq', //-- Rock (TwentyGrams) ??? ??? - ???
	'CR3l4ZwwdIF', //-- Zamzoph (czamzow_cig) ??? ??? - "Developer"
	'Dtkj2AJjirv', //-- Rocktavious (Rocktavious) Kyle Rockman - Tools Programmer
	'dANTJ1ksnVF', //-- Ron "The Producer" LaJoie (Ronnies) Ron LaJoie - Producer
	'ERXbFX3RGD9', //-- Chelsea (chelsea) Chelsea ??? - Customer Support
	'fqGL3C7R95L', //-- Alexis (patterned) Alexis ??? - ???
	'gYBI-cRjPwm', //-- . (scitaborea) ??? ??? - ???
	'H14AOdBNqrr', //-- kozmiq (kozmiq) ??? ??? - UI Designer @ Behaviour Interactive
	'HmNCJtFCcIH', //-- Prestidigitorium (DanielC) ??? ??? - ???
	'I_FLL8gvkeF', //-- Void Spider (jarred-jacobs-cig) Jarred Jacobs - ???
	'Jg0_q7_zcFX', //-- holoKitten (holoKitten) Pete Mackay - designer
	'JR907j_2_IV', //-- ItchyNick (ItchyNick) Ted  Beargeon - ???
	'JRQcTFTFPl9', //-- Forrest (fstephan) Forrest Stephen - CTO
	'jzs6-JpFLBN', //-- Huntokar CIG(bevans_cig) ??? ??? - ???
	'NBcLvBJrezN', //-- Martin_Galway (Martin_Galway) Martin Galway - Director Of Audio 
	'NEqpH3ym0Pa', //-- Rico.CIG (Rico) Rico Acosta - IT Director
	'NPqaaaYrKoU', //-- -Starlight- (-Starlight-) ??? ??? - ???
	'ohHst-DdIrG', //-- Designopotamus (RobIrving) Rob Irving - Lead Designer
	'p028ta5NcIN', //-- Stormwind (Stormwind) Jason Spangler - Chief Technical Officer
	'PkE5qDDMUuR', //-- Zane Bien (zanebien) Zane Bien - Web/Interface
	'pvFlfBRzXe_', //-- Travis Day (MightyMonkey) Travis Day - Associate Producer
	'rxFxhzbqEPx', //-- Yakaru Dezaki (Yakaru) Yakaru Dezaki - ???
	's3RPni2kR2A', //-- WingMan (WingMan) Eric Peterson - President Development / Production
	'sWNKELzt1-R', //-- Jeff Uriarte (LastCall) Jeff Uriarte - ???
	'v5mKcwAKM2l', //-- Mark (mabent_cig) ??? ??? - ???
	'WqU1UVtM7wl', //-- SuperMoof (tdavies-cig) ??? ??? - ???
	'XqaTY4y7j-p', //-- EL1J4H (EL1J4H) Elijah McNeal - Concept Artist
	'xnx4GPsqtvN', //-- Viewmaster (Viewmaster) Michael Morlan - Media Project Manager
	'xTUcIKdIZ9U', //-- Maz (Mazerati) Tom Sawyer - Network Programmer
	'Y61bWEMqhan', //-- Ben Lesnick (wcloaf) Ben Lesnick - Community Manager
	'Ybflm5zyOfo', //-- Jeffery.Zhu (JefferyZhu) Jeffery Zhu - ???
	'YWa8z2mZ4l4', //-- DavidOPreska (DaveOP) David Opreska - ???
	//-- Sumasshu () Tom Oliphant - Gameplay Programmer
	//-- PixelPunisher () Brendan Jackson - Graphics Programmer
	//-- Mark Skelton () Mark Skelton - 3D Artist
	//-- LiquidMesh3D () Bryan Brewer - Lead Animator
	//-- chrismsmith () Chris Smith - 3D Artist
	//-- MaximusOlivia () Chris Olivia - Chief Visual Officer
	//-- Adam Poole () Adam Poole - Art Associate Producer
//-- confirmed "new site" Turbulent staff markers
	'jmFwde82VeA', //-- Baulthus (Bault) Benoit Beausejour - CTO
	'EdwhxNvAK-j', //-- Void (void42) Felix Courtemanche - Turbulent Senior Programmer
	'V38kPj3gIRO' //-- Garatth (Garatth) Ben F - ???
];

var gLstMods = [
//-- Moderators
	'\\30 r7pwq-M3OE', //-- RpTheHotrod "Logante" (Logante)
	'\\32 J4IBcV2Fix', //-- Slavik (WarpDust)
	'APB82Tp1g6R', //-- AllGamer (Captain_Harlock)
	'BHDNFymwMan', //-- Valkyrie (Valkyrie)
	'Ff0BTZT5Ze-', //-- Xelfer Wols (slowreflex)
	'gYBI-cRjPwm', //-- Lala
	'IB8F3_Gdtye', //-- Manic (Manic)
	'KuAkPl9VKeH', //-- Toast (Toast)
	'MV60qLK5vER', //-- Risembool (Risembool)
	'pzhPskxpYPv', //-- Choctah Armstrong (Choctah)
	'UzrccA025zD', //-- Sophine (Sophine)
	'v7S_Xdqw0wc', //-- Boraxx (Boraxx)
	'vkOVMFxCsni', //-- AD (AwesomeAD)
	'wgf7975yWzx' //-- Atom (JohnnyAtom)
//	'Y6H6B1APR_I' //-- Void Singer (Void-Singer)
];

var gIntUseColor = 0;
var gLstColors = [
	'darkorange' //-- add more after testing
];

/*//-- IMPOTANT NOTE:
	This is a HORRIBLE way to handle css changes... REALY need to change this to set up a style sheet at the
	 begining with a callback handle and just edit it on the fly, rather than repeatedly inserting new rules
	 to override the old ones. This is only acceptable because so far we only needed to make minimal additions
	 and it was fast to bang out. GM_addStyle does NOT give a calback reference to the css element it creates,
	 so that will have to be re-implemented
--//*/
 //-- takes (safe) css user hash and an integer 0 to 3
 //--  0: Reset Style to default
 //--  1: Highlight
 //--  2: Mute
 //--  3: Nuke
function uChangeStyle( vHash, vStyle ){
	vStrCSS = '.' + vHash;                                 //-- otherwise add mute style
	if (!vStyle){
		vStrCSS += //-- remove style
		 ' .message-text{ color: #AACAE1; }\n.' + vHash +
		 ' .message-text, .' + vHash + ' .message-group-items{ display: inline; }\n.' +
		 vHash + ' .message-profile-name:after{ content: ""; }\n';
	}else if (1 == vStyle){
		vStrCSS += //-- Highlighting Style
		 ' .message-text{ color: ' + gLstColors[gIntUseColor = (++gIntUseColor % gLstColors.length)] + '; }\n.' +
		 vHash + ' .message-text, .' + vHash + ' .message-group-items{ display: inline; }\n.' +
		 vHash + ' .message-profile-name:after{ content: ""; }\n';
	}else if (2 == vStyle){
		vStrCSS += //-- Mute Style
		 ' .message-text, .' + vHash + ' .message-group-items{ display: none; }\n.' + vHash +
		 ' .message-profile-name:after{ content: " ~MUTED~ "; font-weight: bolder; color: darkgreen; background-color: black; }\n';
	}else{
		vStrCSS += //-- Nuke Style
		 '{ display: none; }';
	}
	return vStrCSS;
}

function uLoad(){ //-- encapsulated load as a function to keep variable spaces clear
	var vBaseCSS = '.message-profile-name{ color: #AACAE1; }\n' +
	 '.chat-sticky-message { margin: 0px -9px 0px -7px !important; }\n';
	
	gLstStaff.forEach( function( vStaff ){ //-- Go through list of staff an highlight name and text
		vBaseCSS += '.' + vStaff + ' .message-text { color: orangered; }\n';
		vBaseCSS += '.' + vStaff + ' .message-profile-name a{ color: gold; }\n';
	});
	gLstMods.forEach( function( vMod ){ //-- go through list of moderators and highlight name
		vBaseCSS += '.' + vMod + ' .message-profile-name a{ color: goldenrod; }\n';
	});
	
	var vLstStored = GM_listValues();
	if (0 < vLstStored.length){                      //-- do we have any hilights/mutes stored?
		vLstStored.forEach( function( vUser ){       //-- get each user key in saved list
			gMarkList[vUser] = GM_getValue( vUser ); //-- move the saved value to our cache
			if ('highlight' == gMarkList[vUser]){    //-- if it's a hilight entry add hilight style
				vBaseCSS += uChangeStyle( vUser.slice( 0 ), 1 );
			}else{  
				vBaseCSS += uChangeStyle( vUser, 2 );
			}
		});
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
		
		if (!~gLstStaff.indexOf( vStrKey )){
			vNewStyle = '';
			vOldStyle = gMarkList[vStrKey];
			if (event.shiftKey && 'mute' == vOldStyle){
				vNewStyle = uChangeStyle( vStrKey, 3 );
			}else{
				if (event.altKey){
					if ('highlight' != vOldStyle){
						vNewStyle = uChangeStyle( vStrKey, 1 );
						gMarkList[vStrKey] = 'highlight';
					}else{
						vNewStyle = uChangeStyle( vStrKey, 0 );
						GM_deleteValue( vStrKey );
						delete gMarkList[vStrKey];
					}
				}else if (!~gLstMods.indexOf( vStrKey ) && 'mute' != vOldStyle){
					vNewStyle = uChangeStyle( vStrKey, 2 );
					gMarkList[vStrKey] = 'mute';
				}else if (vOldStyle){
					vNewStyle = uChangeStyle( vStrKey, 0 );
					GM_deleteValue( vStrKey );
					delete gMarkList[vStrKey];
				}
			}
			if (vNewStyle){
				GM_addStyle( vNewStyle );
				if (gMarkList[vStrKey]){
					GM_setValue( vStrKey, gMarkList[vStrKey] );
				}
			}
		}
		
		//-- so the event doesn't bubble up
		event.preventDefault();
		return false;
	}else{ //-- drop right, middle, or custom click events
		return true; //-- true so the click event does bubble
	}
}
uLoad(); //-- load defaults

//-- jQuery click capture for chat avatars (we start an element class below the link code to avoid links popping from the pic)
$( '.profile-icon-image' ).live( 'click', uToggle )
