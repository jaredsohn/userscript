// ==UserScript==
// @name           CooksIllustrated.com - shrink recipies to index card width for printing
// @namespace      http://curious-attempt-bunny.blogspot.com/
// @include        http://www.cooksillustrated.com/recipes/print/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('body').append('<div id="gm_shrink">shrink</div>');

$('#gm_shrink').css(
	'position', 'fixed').css(
	'top', '2px').css(
	'right', '2px').css(
	'background-color', '#991111').css(
	'color', 'white').css(
	'cursor', 'pointer').css(
	'padding', '2px 4px 2px 4px').css(
	'border', 'solid 1px #000000').css(
	'font-weight', 'bold').click(function() {
	var shrink = function(el) {
		el.css('font-size', '9px').css('margin', '0')
			.css('line-height', 'normal');
	}

	$('body').css('width', '500px');
	$('.pageSectionTop').after('<p><b>'+$('h1').text()+'</b></p>');
	$('b').css('font-size', '12px');
	$('.dek').hide();
	shrink($('em'));
	shrink($('p'));
	shrink($('td'));
	shrink($('a'));
	$('.pageSectionTop').hide();
	$('.pageSection').hide();
	$('img').hide();
	$('br').hide();
	$('td').css('padding', '0');
	$('#contentFooter').hide();
	$('.footerText').hide();
	$('#gm_shrink').hide();
});
