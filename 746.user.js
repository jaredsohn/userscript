// ==UserScript==
// @name          Myspace Tag Remover
// @namespace     http://www.kenmickles.com/greasemonkey
// @include       http://myspace.com/*
// @include       http://*.myspace.com/*
// @description   Just sets some annoying HTML tags not to show
// @exclude

// ==/UserScript==
(function() {

	// tags to hide
	var hideme = new Array('iframe', 'embed');

	// show mp3 player on music pages?
	var showMp3Player = 1;
	
	// loop thru the hidden tags array
	for ( x = 0; x < hideme.length; x++ )
	{
		// get all tags of that name
		var tags = document.getElementsByTagName(hideme[x]);

		// loop thru those tags and set them not to show
		for ( y = 0; y < tags.length; y++ )
		{
			// set the element not to show *if*...
			// the mp3 player isn't set to show
			// the current tag isn't embed
			// the current tag is an embed, but not one of the myspace music mp3 players
			if ( !showMp3Player || hideme[x] != 'embed' || tags[y].src.indexOf('http://music.myspace.com/') == -1 )
			{
				tags[y].style['display'] = 'none';
			}
		}		
	}
})();
