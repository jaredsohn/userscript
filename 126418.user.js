// ==UserScript==
// @name           disablemusic
// @namespace      http://userscripts.org/users/436779
// @include        http://boards.4chan.org/b/*
// ==/UserScript==

function replace() {
	
	var elements = document.getElementsByTagName('embed');

	for (var i = 0; i < elements.length; i++) {

		var element = elements[i];

		if (element.getAttribute('src').match(/swf/i)) {
			element.setAttribute('src', 'aaa');
		}
		
	}
}

replace();