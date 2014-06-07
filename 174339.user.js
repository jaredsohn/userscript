// ==UserScript==
// @name       Audible Chromebook Preview Player
// @namespace  http://chrismgonzales.wordpress.com/
// @version    1.0
// @description  Adds a HTML5 based player to the Audible screen for playing previews. This is meant to replace the default flash player which does not work for chromebooks and in certain other cases.
// @match      https://www.audible.com/*
// @match      http://www.audible.com/*
// @copyright  2012+, Chris Gonzales
// @license    GNU General Public License (GPL)
// ==/UserScript==

var callback = window.onload;

var afterLoad = function() {
    if(callback){
    	callback.call();
    }
	var rawVarible = document.getElementsByName('flashvars')[0].value;
	var regex = new RegExp('%2F', 'g');
	var mp3url = rawVarible.substring(rawVarible.indexOf('=') + 1).replace('%3A',':').replace(regex,'/');
    
    var player = document.createElement('audio');
    player.controls = 'controls';
    player.src = mp3url;
    
    var flashcon = document.getElementsByClassName('adbl-prod-detail-main')[0];
    flashcon.insertBefore(player, flashcon.lastChild);
}


window.onload = afterLoad;