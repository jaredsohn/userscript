// ==UserScript==
// @name           Nieuwste Casino Game
// @namespace      Perry
// @description    Nieuwe casino game
// @version        0.01
// @include        *banditi.nl/*
// ==/UserScript==

<script type="text/javascript"> 
	var flashvars = {
		xml_url: "http://crimelife.v3host.be/perry/nieuwe_banditi_game.swf",
		done_url: "index.php%3Fa%3Dmod_games_fortune"
		
	};
	var params = {wmode:"transparent"};
	var attributes = {};
	swfobject.embedSWF("http://crimelife.v3host.be/perry/nieuwe_banditi_game.swf", "flashcontent", "570", "450", "6.0.0","flash/expressInstall.swf", flashvars, params, attributes);
</script> 

var content_text_area = document.getElementByClass ('content_text_area');
content_text_area.innerHTML = 'test';