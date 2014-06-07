// ==UserScript==
	 
	// @name          Webmonkey's Hiding Elements
	 
	// @namespace     http://www.webmonkey.com
	 
	// @description   An example Greasemonkey script that hides every image.
	 
	// @include       *
	 
	// ==/UserScript==
	 
	 
	 
	var imgs = document.getElementsByTagName('img');
	 
	for (i=0; i<imgs.length; i++)
	 
	{
	 
	  imgs[i].style.visibility = 'hidden';
	 
	}