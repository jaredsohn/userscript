// ==UserScript==
// @name           FC iFrame resize
// @namespace      http://www.w3.org/1999/xhtml
// @description    Resize Flash
// @include        http://fantasticcontraption.com/flash.php*
// @include        http://www.fantasticcontraption.com/flash.php*
// ==/UserScript==

// maximise game
	var win_width = document.body.clientWidth - 40 ;
	var win_height = document.body.clientHeight - 40 ;
	var win_ratio = win_width / win_height;

	var flv_width = 694;
	var flv_height = 500;
	var flv_ratio = flv_width / flv_height;

	var new_height = null;
	var new_width = null;

	if(top.location != location){  // anti-frame
		return
	};
	
	if ( win_ratio > flv_ratio ) {
		// height is the limiter
		new_width = Math.floor( ( 694 * win_height ) / 500 )
		new_height = win_height;
	} else {
		// width is the limiter
		new_width = win_width;
		new_height = Math.floor( ( 500 * win_width ) / 694 ) 
	}


	var links = document.getElementsByTagName('object');
	for (var i = 0; i < links.length; i++) {
		links[i].width=new_width;
		links[i].height=new_height;
	}