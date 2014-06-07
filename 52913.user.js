// ==UserScript==
// @name           show flic.kr link
// @namespace      http://mattbannon.com/
// @description    Includes the shortened flic.kr link on any flickr image
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

window.addEventListener('load', function () {
	GM_addStyle('#flicdotkrlink { background-color: #0063DC; color: #FF0084; display: block; position: fixed; top: 0; right: 0; padding: 10px; min-height: 30px; text-decoration: none;');
	linkTags = document.getElementsByTagName( 'link' );
	for(tag=0;tag<linkTags.length;tag++)
	{
		thisTag = linkTags[tag];
		if( 'text/html' == thisTag.type )
		{
			theUrl = thisTag.href;
			linker = document.createElement( 'a' );
			linker.setAttribute('id', 'flicdotkrlink');
			words = document.createTextNode( theUrl );
			linker.appendChild( words );
			linker.setAttribute( 'href' , theUrl );
			document.body.appendChild( linker );
		}
	}
}, true);