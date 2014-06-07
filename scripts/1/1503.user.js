// ==UserScript==

// @name            Newsgator with CSS Frames
// @author          Bruno Torres <http://www.brunotorres.net/>
// @namespace       http://www.brunotorres.net/greasemonkey/
// @description     Adds position:fixed to newsgator sidebar to emulate a framed layout
// @include         http://www.newsgator.com/ngs/subscriber/WebEd2*

// ==/UserScript==

(function() {
	var sidebar = document.getElementById('sidebar');
	var content = document.getElementById('content-wrapper');
	var height = (window.innerHeight - 98) + 'px';
	var width = (window.innerWidth - 260) + 'px';
	sidebar.style['width'] = '260px';
	content.style['width'] = width;
	sidebar.style['height'] = height;
	content.style['height'] = height;
	sidebar.style['position'] = 'fixed';
	content.style['position'] = 'fixed';
	sidebar.style['overflow'] = 'auto';
	content.style['overflow'] = 'auto';
	window.onresize = function(){
		height = (window.innerHeight - 98) + 'px';
		width = (window.innerWidth - 260) + 'px';
		content.style['width'] = width;
		sidebar.style['height'] = height;
		content.style['height'] = height;
	}
})();