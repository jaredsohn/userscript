// ==UserScript==
// @name        RetailMeNot Plain Text Coupon Codes
// @namespace   RetailMeNot Plain Text Coupon Codes
// @include     http*://*retailmenot.*
// @version     1.26
// @require     http://code.jquery.com/jquery-latest.min.js 
// ==/UserScript==

var codeLabel = 'Coupon Code: ';

// Search
$('.description').each( function() {
	var code = $(this).find('.code').text();
	$(this).find('.codelabel').text(codeLabel + code);
	$(this).find('.crux.attachFlash').remove();
});

// Store listing
$('.js-outclick.button.code-button').each( function() {
	var labelStyle = 'font-size:12px;font-weight:700;font-size:1em;';
	var codeStyle = 'font-weight:0;';
	var code = $(this).find('.code-text').text();
	var codeWrapper = $(this).find('.code-wrapper');
	codeWrapper.parent().before('<span style="' + labelStyle + '">' + codeLabel + '</span><br /><span style="' + codeStyle + '">' + code + '</span>');
	codeWrapper.remove();
	$(this).find('.code-cover').remove();
	
});

// Home page
$('.caterpillar-code-wrapper').each( function() {
	var codeElem = $(this).find('.code');
	var codeStyle = 'font-size:1.25em;font-weight:700;';
	var code = codeElem.text();
	if (code.length > 0){
		$(this).find('.button')
			.html(codeLabel + '<br /><span style="' + codeStyle + '">' + code + '</span>')
			.css('float','left')
			.css('font-size','1.5em')
			.css('padding-top','10px')
			.css('line-height','30px')
			.insertAfter(this);
		$(this).parent().find('.exclusive').css('margin','30px 0 0 20px');
		codeElem.remove();
	}
});