// ==UserScript==
// @name        uitzendinggemist - oude/old player
// @namespace   http://twitter.com/depositado
// @description Adds option to open episode in popup with the OLD player
// @include     http://www.uitzendinggemist.nl/afleveringen/*
// @require     http://update.sizzlemctwizzle.com/180304.js
// @version     1.1
// @grant       none
// ==/UserScript==

// URL:		https://userscripts.org/scripts/review/180304

if (typeof console == "undefined") {
	window.console = {
		log: function () {}
	};
}


// script details/updates
var us_180304_Name      = GM_info.script.name;
var us_180304_Version   = GM_info.script.version;

// first run?
function firstRun(){
	if( $.cookie('us_180304_name') == null){    
		//set cookies
		$.cookie('us_180304_name',    us_180304_Name, {expires: 365, path: '/'});
		$.cookie('us_180304_version', us_180304_Version, {expires: 365, path: '/'});
		console.info('Hi, thanks for using userscript: '+us_180304_Name+' v'+us_180304_Version);
	}
}
function checkIfUpdated(){
	if( $.cookie('us_180304_version') != us_180304_Version){    
		//re-set cookies
		$.cookie('us_180304_name',    us_180304_Name, {expires: 365, path: '/'});
		$.cookie('us_180304_version', us_180304_Version, {expires: 365, path: '/'});
		console.info('Userscript updated to version: '+us_180304_Version);
	}
}

/*
    --------    --------    --------    --------    --------    --------    --------    --------    --------
*/

var popupURL = 'http://dl.dropboxusercontent.com/u/3899/userscripts/uitzendinggemist-old-player/popup.html';

function openPopup(url,w,h,pID){
	w = w+20;
	h = h+20;   
	playerPopup = window.open(url+'?episode='+pID,"popup_"+pID,"fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,directories=no,location=yes,width="+w+",height="+h+",left=0,top=0,screenX=0,screenY=0");
}


$(function(){

	console.log('USERSCRIPT LOADED: uitzendinggemist - oude/old player');

	firstRun();    
	checkIfUpdated();

	var playerID = $('#episode-data').data('player-id');

	console.info('player-id: '+playerID);

	if (playerID.length > 0) {

		// add link to #player-meta
		$('#player-meta').prepend('<a href="javascript:;" id="oldplayer" class="popout oldplayer">Oude player</a>');

		$('#oldplayer').click(function() {
			// we assume that you don't want to old video to continue playing, remove the bastard
			$('#player-wrapper').remove();
			// finally, open the popup with the eposide within the old player
			openPopup(popupURL,800,450,playerID);
		});

	}

});