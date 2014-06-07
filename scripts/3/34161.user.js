// ==UserScript==
// @name           IMEEM Slick Playlist
// @namespace      tcr
// @description    Makes the imeem Quick Playlist much cleaner
// @include        http://www.imeem.com/dialogs/standaloneplaylist/*
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

// All your GM code must be inside this function  
function letsJQuery() {  
	$('#TopBlackBar').remove();
	$('body').removeClass('yui-skin-sam');
	var player = $('#Player_flashcontent');
	$('#left, #StandaloneContainer, #flashContainer, #Player_flashcontent, #Playerfoo').width('100%').height('100%').css({marginLeft: 0, marginTop: 0, marginRight: 0, padding: 0});
	$('#right').remove();
	$('#StandaloneContainer, #left').attr('id', '');
}  