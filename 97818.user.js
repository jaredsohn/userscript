// ==UserScript==
// @name          ibethelPauze
// @namespace     seb@s
// @description   Get unlimited preview time on ibethel.tv
// @include       http://www.ibethel.tv/*
// @exclude       http://www.ibethel.tv/foo
// @version       0.1
// @icon          http://29.media.tumblr.com/avatar_cf0d021ac7bc_64.png
// ==/UserScript==

window.setTimeout(function()
{
	if($('#preview_time_remaining') && $('#free_preview_banner'))
	{
		$('#free_preview_banner .clear').before('<a href="javascript:pauzeClosePreview();" style="float: right; font-size: 14px; font-weight: bold;">(pauze timer and close previewbar)</a>');
	}
}, 1000);

function window.pauzeClosePreview(){
	$('#preview_time_remaining').countdown('pause');
	$('#free_preview_banner').hide();
}