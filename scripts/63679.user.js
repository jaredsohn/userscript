// ==UserScript==
// @name          Download H264 YouTube Video - 
// @description   adds a download link and various quality settings
// @include       http://youtube.com/*v=*
// @include       http://*.youtube.com/*v=*
// ==/UserScript==



// This is just a modified version of Download YouTube Video - Vaibhav Saran
// This is just a modified version of Download H264 YouTube Video by sujeshtc

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

function getAddressVariable(address, variable) {
	address = "&"+address;
	return address.toString().split("&"+variable+"=")[1].split("&")[0];

}

// All your GM code must be inside this function
function letsJQuery() {
	$("#watch-headline-user-info").append(' - <select id="dlquality"></select> ');
	$("#dlquality").append('<option value="34">Standard (flv)</option>');
	$("#dlquality").append('<option value="18" selected="selected">Medium (mp4)</option>');
	$("#dlquality").append('<option value="35">High (flv)</option>');
	$("#dlquality").append('<option value="22">720p (mp4)</option>');
	$("#dlquality").append('<option value="37">1080p (mp4)</option>');
	$("#watch-headline-user-info").append('<a id="dllink"><strong>Download</strong></a>');
	$("#dlquality").change(function () {
		var flAddress = document.getElementById("movie_player").getAttribute("flashvars");
		var video_id = getAddressVariable(flAddress, "video_id");
		var t = getAddressVariable(flAddress, "t");
		$("#dllink").attr("href", "http://youtube.com/get_video?video_id="+video_id+"&t="+t+"&fmt="+$("#dlquality").val());
	});
	$("#dlquality").change();
}