// ==UserScript==
// @name           IndexOf
// @namespace      nowhere
// @include        *
// @description	 Adds a "Show Images" link to top of "Index of /" pages
// ==/UserScript==

// does page title have 'index of /' ?
if (document.title.indexOf('Index of /') != -1) {

	var js;

	// is this an apache site?
	var appache = document.getElementsByTagName('address');
	
	if (appache != null) {
	   // create a javascript function that loops thru the image icon to the left of each image link and replace the "href" with the link src.
		js = "javascript:(function() {var images = document.getElementsByTagName('img');var links = document.getElementsByTagName('a');for (var i=0; i< images.length; i++) {images[i+1].src = links[i+5].href;}})();"
	}
	else {
	// non-apache are a work in-progress.  
	// this was working but now seems broken.  
	// will look at someday when need is there.
	//	js = "javascript:(function() {var links = document.getElementsByTagName('a');for (var i=0; i< links.length - 5; i++) {var image = doument.createElement('image'); image.src = links[i+5].href; links[i+5].insertBefore(image, links[i+5].firstChild);   }})();"
	}

	// add "show images" link
  var link = document.createElement('a');
  link.setAttribute('href', js);
  link.setAttribute('title', 'Show Images');
  link.innerHTML 	= '<strong>Show Images</strong>';
   	  
  var elmInsertPoint = document.body;
  elmInsertPoint.insertBefore(link, elmInsertPoint.firstChild);
}
