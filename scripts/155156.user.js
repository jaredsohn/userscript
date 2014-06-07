// ==UserScript==
// @name        YouTube - Title ON Top
// @namespace   smk
// @include     http://www.youtube.com/watch?v=*
// @include		https://www.youtube.com/watch?v=*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

$(function() {
	var style = {};

	if(document.body.className.match('site-center-align')) {
		style.type = 'width';
		style.style = '890px';
	} else {
		style.type = 'margin-left';
		style.style = '225px';
	}

	var t = $('.yt-uix-expander-head');
	var nt;
	t.each(function() {
		$_ = $(this);
		if($_.attr('title')) {
			nt = $_.attr('title');
		}
	});

	$('#watch7-container').before('<div id="_newtitle"></div>').css('margin-top', '-5px');
	$('#_newtitle').css('font-weight', 'bold')
	.css('font-size', '20px')
		.css('margin-top', '5px').css('margin', '0 auto')
			.css(style.type, style.style)
				.html(nt);

	t.first().remove();
	$('#guide').remove();
});