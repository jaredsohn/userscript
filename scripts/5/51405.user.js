// ==UserScript==
// @name           vidachok player
// @namespace      vidachok.com
// @description    vidachok.com alternative flv player
// @include        http://vidachok.com/*
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

var style = 'st=http://www.residenciasananda.com.uy/misha/video13-38.txt&amp;';
var embed = '';


// All your GM code must be inside this function
function letsJQuery() {
	$('*').css('color','white');
	$('*').css('font-family','"Trebuchet MS", Verdana, Arial  !important');
	$('input,select').css('color','#222');
	
	var flashvars = $('#video0>embed').attr('flashvars');
	if(flashvars!='undefined') {
		var regexp = /file=(.*)flv/gi;
		url = flashvars.match(regexp);
		embed = style + url;
		var videoplayer = '<object width="700" height="400"><param name="bgcolor" value="#000000" /><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="movie" value="http://www.residenciasananda.com.uy/misha/uppod.swf" /><param name="flashvars" value="'+embed+'" /><embed src="http://www.residenciasananda.com.uy/misha/uppod.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" flashvars="'+embed+'" bgcolor="#000000" width="700" height="400"></embed></object>';
		$('#video0').html(videoplayer);
	}
}
