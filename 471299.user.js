// ==UserScript==
// @name        GameFAQs WebM Support
// @namespace   Kraust
// @description WebM Support for GameFAQs Forums
// @include     *.gamefaqs.com/boards/*
// @version     0.5.0
// @grant       none
// ==/UserScript==


/****************************************************************************
* Please Note: The URL parsing on this is not 100%. Some characters         *
* (namely ()'s) will not parse.												*
****************************************************************************/


$('td.msg').each(function() {
		var text = $(this).html();
		var regex = /http:\/\/[^"]*\.webm|https:\/\/[^"]*\.webm/g;
		var	matches = regex.exec(text);				
		
		while(matches = regex.exec(text)) {
			var text = $(this).html();
			if ( matches !== null) {
				if ( matches !== null) {
					if( matches !== undefined) {
						console.log(matches);
						var video_regex = new RegExp('<a href="' + matches + '">' + matches + '<\/a>');
						
						console.log(video_regex);
					
						$(this).html(text.replace(video_regex, '<video width=\"720\" height=\"480\" controls ><source src=\"' + matches[0] + '\" type=\'video/webm; codecs=\"vp8, vorbis\"\'></video>'));
					}
				}

			}
		}
		
		
		
});


// /<a href="http:\/\/.*\.webm">http:\/\/.*\.webm<\/a>/