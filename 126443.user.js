// ==UserScript==
// @name           imdb
// @author         1allen (1all3n@gmail.com)
// @description    imdb filming locations
// @include        http://www.imdb.com/*
// @include        http://imdb.com/*
// ==/UserScript==

(function(){
	document.addEventListener('DOMContentLoaded', function(){
		$('a[href^=/search/title?locations]')
		.after(function(){
				jQuery.noop();
				//return ' <a href="http://www.google.com/maps?q='+$(this).attr('href').split('locations=')[1]+'">ololo</a>'
				return '<sup>(' + $('<div>').append(
								$('<a>').
									attr('href', 'http://www.google.com/maps?q=' + $(this).attr('href').split('locations=')[1]).
									attr('target', '_blank').
									html('G')
							).html() + ')</sup>';
				}
		);
	}, false);

})();
