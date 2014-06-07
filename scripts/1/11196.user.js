// ==UserScript==
// @name          Dailymotion Zoom Fix
// @namespace     http://tristan.rivoallan.net
// @description   Fixes zoom for Dailymotion *nix users. 
// @author        Tristan Rivoallan
// @homepage      http://tristan.rivoallan.net
// @include       http://dailymotion.com/*
// @include       http://www.dailymotion.com/*
// ==/UserScript==
 
 
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
 
// Check if jQuery's loaded
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; applyFix(); }
}
GM_wait();
 
/**
 * Fixes dailymotion zooming problem.
 */
function applyFix()
{
	$(document).ready(function() {
		var swf_url = $('#video_player_embed_code_text').attr('value').match(/value="(.*)"><\/param><param/)[1];
		var link = '<a href="'+swf_url+'">(zoom)</a>&nbsp;';
		$('h1.with_uptitle').css('float', 'none').prepend(link);
	})
	
}