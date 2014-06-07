// ==UserScript==
// @name		Robot Unicorn Attack Script
// @namespace		http://ksit.org/RUACheatFB
// @description		Vergrößert die Sichtweite, basiert auf http://ksit.org/RUACheatFB
// @version		1
// @contributor		hardbass
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// @include		http://apps.facebook.com/robotunicorn/play.html*
// @include		http://games.adultswim.com/fb-game-files/robotunicornattack/play_frame.html*
// @include		http://games.adultswim.com/robot-unicorn-attack-twitchy-online-game.html*
// ==/UserScript==

var $ = jQuery.noConflict(true);
		 
if($('#title_bar')) //Frame
{
	$('#content').css('width','100%');
	$('#flashContainer').css('width','100%');
	$('#altFlashContent').width('100%');

	robotunicornhackfb=document.createElement('link');
	robotunicornhackfb.rel='stylesheet';
	robotunicornhackfb.href='http://robotunicornattack.slicknfresh.com/robotunicornstyle.css';
	document.getElementsByTagName('head')[0].appendChild(robotunicornhackfb);
}