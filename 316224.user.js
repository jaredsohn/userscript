// ==UserScript==
// @name        Better Status by Grain
// @namespace   lt
// @include     http://fafas.lt/status
// @version     1
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require		http://cachedcommons.org/cache/jquery-cookie/0.0.0/javascripts/jquery-cookie-min.js
// @grant       none
// ==/UserScript==

/**************************************
 *
 *			 by
 *		Grain Storming
 *
 *
 * Script to Check the Daoc-Origins
 * Server Status. Plays Sound when
 * Server goes Online.
 *
 ***************************************/
var localSoundFileON = ''; // Must not be set. If isset it is used
var onlineSoundFileON = 'http://noproblo.dayjo.org/ZeldaSounds/OOT/OOT_Fanfare_Item.wav';//'https://dl.dropbox.com/u/7079101/coin.mp3'; // can also be changed
var localSoundFileOFF = ''; // Must not be set. If isset it is used
var onlineSoundFileOFF = 'http://themushroomkingdom.net/sounds/wav/smb/smb_mariodie.wav'; // can also be changed
var timeToRelaod = 10000; // in milliseconds

var audioON;
var audioOFF
$.cookie.json = true;
createAudioON();
createAudioOFF();

$(document).ready(function(){
	var status = getStatus();
	var cStatus = $.cookie('status');
	console.debug('test');
	
	// Set the actual status as cookie
	$.cookie('status', status.toLowerCase(), { expires: 1 });
	
	// If no cookie isset, set one with the actual status.
	// If the actual status is "online" play the sound.
	if(typeof cStatus == 'undefined' || cStatus == null || !cStatus){
		cStatus = status.toLowerCase();
		if(status == 'online'){
			audioON.play();
		}
	}
	
	// If the status changes and is now "online"
	// play the sound.
	if(status != cStatus && status == 'online'){
		audioON.play();
	}
	
	if(status != cStatus && status == 'offline'){
		audioOFF.play();
	}
	
	// if status is offline reload page after
	// a defined period of time.
	if(status == 'offline'){
		setTimeout(function(){
			location.reload();
		},timeToRelaod);
	}
});

/**
* Gets the Server Status from the corrupt HTML
*/
function getStatus(){
	var s = '';
	$('*', 'body')
		.andSelf()
		.contents()
		.filter(function(){
			return this.nodeType === 3;
		})
		.filter(function(){
			return this.nodeValue.indexOf('Genesis Server') != -1;
		})
		.each(function(){
			s = $(this).next().html().toLowerCase();
		});
	return s;
}

/**
* Creates the Audio Object.
*/
function createAudioON(){
	if(localSoundFileON){
		audioON = new Audio(localSoundFileON);
	}else{
		audioON = new Audio(onlineSoundFileON);
	}
}

function createAudioOFF(){
	if(localSoundFileOFF){
		audioOFF = new Audio(localSoundFileOFF);
	}else{
		audioOFF = new Audio(onlineSoundFileOFF);
	}
}