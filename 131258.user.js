// ==UserScript==
// @name        HootSuite Hacks
// @namespace   http://dev.radsectors.com/userscripts
// @updateURL   http://dev.radsectors.com/userscripts/hootsuitehacks.user.js
// @description Remove Shift+Enter submit, Mini columns, Hide promoted, Disable wake up
// @include     http*://hootsuite.tld/*
// @grant		none
// ==/UserScript==
// Notes:
// 
// 

if ( typeof console=='undefined' ) console = { log:function() {} };

init();

function init() {
	
	removeshiftentersubmit();
	
	disablewakeup();
	
	minicolumns();
	
	hidepromoted();
}


// REMOVE SHIFT+ENTER SUBMIT
function removeshiftentersubmit() {
	console.log('remove shift enter submit...');

	var msgboxfocus = function() {
		console.log('searching for .messageBoxMessage keydown events...');
		$keydowns = $('.messageBoxMessage').data('events').keydown;
		for ( key in $keydowns ) {
			if ( typeof $keydowns[key]!=undefined ) {
				if ( key!='delegateCount' ) {
					if ( $keydowns[key].handler.toString().indexOf('._submitAddMessage:visible')>=0 ) {
						console.log('shift+enter submit keydown event handler found...');
						console.log( $keydowns[key].handler.toString() );
						var replacement = function(e) { };
						$keydowns[key].handler = replacement;
						console.log('event handler replaced with: '+replacement.toString());
					}
				}
			}
		}
		$('.messageBoxMessage').die('focus', msgboxfocus);
	};
	
	$('.messageBoxMessage').live('focus', msgboxfocus);
	
}


// DISABLE WAKE UP
function disablewakeup() {
	console.log('disable wake up...');
	
	var script = document.createElement('script');
	script.innerHTML = 'setInterval( function() { resetUserInactiveTimer(); }, 1200000 );';
	$('head').append(script); // TODO: make sure this still works
}


// MINI COLUMNS
function minicolumns() {
	console.log('mini column layout...');
	
	var style = "";
	style += "#streamsContainer .stream { width:240px !important; margin-right:0; }";
	style += "#streamsContainer .stream .header {  }";
	style += "#streamsContainer .stream .header .streamName { font-size:12px; line-height:14px; margin-top:5px; }";
	style += "#streamsContainer .stream .header .streamName .subTitle { display:none; }";
	style += "#streamsContainer .stream .stream-scroll { ; }";
	style += "#streamsContainer .stream .stream-scroll .messageOptions { right:20px; background:transparent; padding:0; }";
	style += "#streamsContainer .stream .message { text-shadow:1px 1px 2px #000; padding:2px 0 4px 2px; border-top:0; }";
	style += "#streamsContainer .stream .message .networkAvatarLink { position:absolute; top:2px; left:2px; border-width:0; }";
	style += "#streamsContainer .stream .message .networkAvatar { position:static; float:left; margin:0 3px 0 0; }";
	style += "#streamsContainer .stream .message .networkName { display:block; float:none; }";
	style += "#streamsContainer .stream .message .postTime { display:block; float:none; clear:none; }";
	style += "#streamsContainer .stream .message .commentContent { display:inline; margin:0; }";
	addStyle(style);
	
	// $urmsg = $('#streamsContainer .stream .streamMessage .content');
	// $urmsg.html($urmsg.html().replace('unread', 'undead'));
}


// HIDE PROMOTED
function hidepromoted() {
	console.log('hide promoted...');
	
	$('div#sidebarAdContainer.promo').remove();
	
	var style = "";
	style += "#streamsContainer .stream ._promoted { display:none; }";
	addStyle(style);
}

function addStyle(styleOverride) {
	var style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.setAttribute('media', 'screen');
	style.innerHTML = styleOverride;
	$('head').append(style);
}