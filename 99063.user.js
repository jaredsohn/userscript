// ==UserScript==
// @name           YtHideIt
// @namespace      YTH
// @include        http://www.youtube.com/watch*
// ==/UserScript==


function remove(id)
{
	var mc = document.getElementById(id);
	if( mc && mc.parentNode )
	{ 
		mc.parentNode.removeChild(mc);
	}
}

function hide()
{	
	document.title = "Test - " + (parseInt(Math.random() * 1000));
	var link = document.createElement("link");
	link.type = "image/x-icon";
	link.rel = "shortcut icon";
	link.href = '';
	document.body.appendChild(link);
	

	remove('masthead-container');
	remove('watch-headline-container');
	remove('watch-sidebar');
	remove('watch-panel');
	remove('footer-container');

	var container = document.getElementById('watch-video-container');
	container.style.margin = "20px";
	
	var vid = document.getElementById('watch-player');
	//vid.style.marginTop = "20px";
	vid.style.width = '1020px';
	vid.style.height = '600px';
	
}


var title = document.getElementById( 'watch-headline-user-info' );
var link = document.createElement( 'a' );
link.addEventListener(  'click', hide, false );
link.style.cursor = "pointer";
link.style.right = "5px";
link.style.fontSize = "14px";
link.style.fontWeight = "bold";
link.innerHTML = '(hide)';
title.appendChild( link );