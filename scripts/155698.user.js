// ==UserScript==
// @name        Yahoo! Mail Vertical Preview
// @namespace   http://localhost
// @description Updates Yahoo! Mail GUI so that we can continue to use the preview pane on the side
// @include     http://*mail.yahoo.com/*
// @grant		none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
// Change Log:
// 13/01/04: published

// make changes to the existing CSS
function updateCss() {
	$('div#msg-list').width('30%').css('float','left').css('height','auto');
	$('div#rail-resize-hori').hide();
	$('.messagepane').attr('style','top:0;');
	$('#msg-preview').attr('style','left:30%;');
}

// 'reset' the CSS when clicking an email in the list
$('.list-view-items').click(function() {
	updateCss();
});

// init
$(document).ready(function() {
	updateCss();
});