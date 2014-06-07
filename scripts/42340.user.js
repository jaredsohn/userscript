// ==UserScript==
// @name           Red Envelope
// @namespace      redditred
// @description    Makes the orange envelope on Reddit red.
// @include        http://reddit.com
// @include        http://reddit.com/*
// @include        http://www.reddit.com
// @include        http://www.reddit.com/*
// @include        http://*.reddit.com
// @include        http://*.reddit.com/*
// ==/UserScript==

/*
	Now with less JavaScript Console warnings.

	Obviously, this is my first GreaseMonkey script. FIVE REVISIONS.
*/

// The image (PNG format, pngcrush'd)
var img_src = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAKCAIAAADkeZOuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8' +
	'YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAFhJREFUKFONkFES' +
	'ABAIRLmNY7qccxGrJCaavtq3q8SSYvgvoqnrq4AFoL5BmEk7Bgla2VjkfEFPLF1zNjJN5KKdZgEHLZua' +
	'894q4/I9Q+VsH4V7LNmz/7sBhAgx5vqK8DQAAAAASUVORK5CYII=';


// On window load
window.addEventListener("load", function(e) {

	// See if the image exists
	if(document.getElementById('mail')) {

		// Get the image node
		var img_node = document.getElementById('mail').firstChild;
	
		// Replace source
		// Oh, fuck you JavaScript. You return -1, not FALSE? HOW CAN THIS CODE TAKE ME THREE REVISIONS?
		// ...Oh, I didn't test it, right.
		if( img_node.src.search("mailgray.png") == -1 ) {
		img_node.src = img_src;
		}

	}
		
}, false);