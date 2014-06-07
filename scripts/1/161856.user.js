// ==UserScript==
// @name			FBchat Red Bubble: font smaller to allow for 3 digits
// @namespace		http://hostfile.org/fb.user.js
// @description		makes the font on the red alert bubble 1px smaller so it fits 3 digits properly, and changes the colour to yellow. also hacks the chat area smaller
// @version			1.2
// @include			htt*://*.facebook.*
// @exclude			*ajax*
// @exclude			*ticker*
// @exclude			*chat*
// @exclude			*plugins*
// @exclude 		*ak.facebook.*
// @exclude 		*ai.php*
// ==/UserScript==
////////////////////////////////////////////////
//CHANGE.LOG
//1.1 - change chat bar title size and positioning fix for updated fb code
//1.2 - change font positioning for group chats, now aligns properly
///////////////////////////////////////////////
var script = document.createElement('script');									// create new script element placeholder
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';// get jquery
document.getElementsByTagName('head')[0].appendChild(script);					// inject jquery script into page
// When jQuery is loaded, we can use it!
script.addEventListener('load', function(){ 
	$ = unsafeWindow['jQuery'];
	$.noConflict();
	// all jQ code goes below here
	// ---------------------------
	
	function doFont(){
	//alert(document.location.href);	// debugging: shows page load that triggers script - useful for adding excludes
	$('.numMessages').css('font-size','8px');			// change font smaller on red chat bubble
	$('.numMessages').css('color','yellow');			// change font color on red chat bubble
	$('.numMessages').css('top','-4px');				// change red chat bubble height
	$('.fbChatTabSelector .numMessages').css('top','-10px');// change list red chat bubble height
	$('.fbJewel .jewelCount').css('color','yellow');	// change font color of red bubble up top (alert jewel)
	$('.fbDock').css('margin','10px');					// shrink chat tabs
	$('.fbDockWrapper').css('height','27px');			// lower tab height
	$('.fbNubButton').css('padding','0px 5px');			// make tabs tighter
	$('div.fbNubFlyoutFooter textarea').css('font-size','10px');				// make chat input font smaller
	$('div.fbNubFlyoutFooter textarea').css('font-family','"lucida console"');	// change font so it shows onscreen properly (mostly)
	$('div.fbNubFlyoutFooter .uiTextareaAutogrow').css('position','relative');	// allow free movement,
	$('div.fbNubFlyoutFooter .uiTextareaAutogrow').css('top','-4px');			// and lift it up a bit
	$('.titlebarTextWrapper').css({'margin':'-10px 0px', 'padding':'5px 0px 0px 10px'}); /////NEW fb blue bar font positioning
	$('.fbNubFlyoutTitlebar .titlebarLabel').css('line-height','20px');			// blue bar at top of chat window thinner -----NEW moves group chat name into right position
	$('.fbNubFlyoutTitlebar .titlebarLabel').css('font-family','"lucida console"');// blue bar font so it shows onscreen properly
	$('.titlebarButtonWrapper').css({'margin':'-7px'});				/////NEW make blue bar thinner
	$('.fbMercuryChatTab .titlebar .button').css('height','22px');				// move buttons up
	$('.fbMercuryChatTab .titlebar .button').css('margin-top','-5px');			// move buttons up
/*	var greendot = "";
	greendot = /(\-)([0-9]+)?/.exec($('.fbMercuryChatTab.user.active .titlebarTextWrapper').css('background-position')		)
	greendot = 'left '+(greendot[0]-4);
	console.log(greendot);
	$('.titlebarTextWrapper').css('background-position',greendot);// move green dot up in opened chatbox
	//$('.fbMercuryChatTab.user.active .titlebarTextWrapper').css('background-position','left -269');// move green dot up in opened chatbox
	
// ^ this keeps changing - need to find a dynamic way of reading current setting first then bumping it up 5px
*/
	//$('').css('','');// 
	//$('').css('','');// 
	window.setTimeout(doFont, 120000);								// wait 2 mins and loop reapply changes.
	}
	
	window.setTimeout(doFont, 10000);								// wait 10 seconds and apply changes.
	//------------------------------------
	// end jQ code
}, false);
