// ==UserScript==
// @name           4chanEnhanced
// @namespace      mkshft.4chan
// @description    Revamps GUI, Mutes Background Music, Auto Redirection, Removes Advertising
// @include        http://*.4chan.org*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function()
{
	// Prevents us from knowing what The Rock is cookin'
	$('embed').remove();

	// move logo to right
	$('div.logo').css('position', 'fixed');
	$('div.logo').css('width', '550px');
	$('div.logo').css('text-align', 'center');
	$('div.logo').css('top', '20px');
	$('div.logo').css('right', '0');
	
	// Make Forum Title a refresh button
	$('div.logo').find('span').css('cursor', 'pointer')
				 .click(function()
				 {
					document.location = document.location
				});
	
	// Enables post redirect after form submission
	$('input[name="email"]').val('noko');
	
	// Moves postarea to float to the right of content
	$('div.postarea').css('position', 'fixed');
	$('div.postarea').css('right', '0');
	$('div.postarea').css('bottom', '0');
	
	// Deletes advertising
	$('center > a').remove();
	$('div').each(function(i)
	{
		if($(this).css('text-align') == 'center')
		{
			if($(this).find('a').find('img').css('border') == '1px solid black')
				$(this).remove();
		}
	});
	
	// shorten the width of the posts so postarea isn't overlapping
	$('form[name=delform]').css('width', '800px');
	
	// delete four <hr> tags from body element
	$('body>hr').remove();
});
