// Flickr Next/Previous Keyboard Navigation
// Version 0.2 - Oct 9, 2008
// by Ben McMath
// with some help from userscripts.org user kyle1 (thanks!)
//
// ==UserScript==
// @name          Flickr Next/Previous Keyboard Navigation
// @namespace     http://userscripts.org/
// @description   Allows navigation by keyboard on Flickr. Left arrow, d, k move to the previous image.  Right arrow, f, j move to the next imagee.
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*

// ==/UserScript==

// Function to handle on key presses
function keyPressed(key)
{
	// Get URLs for next and previous images
	// using xpath since getElementsByClassName is not implemented in FF2
	var links = document.evaluate("//a[@class='currentContextLink']/ancestor::div[starts-with(@class,'ContextTop')]//a[@class='contextThumbLink']/@href", document, null, XPathResult.ANY_TYPE, null);
	// the first link is the previous image URL
	var previousURL = links.iterateNext().value;
	// the second link is the next image URL
	var nextURL = links.iterateNext().value;
	
	// if there are only two links, then the second one was actually the link to the photostream
	if (links.iterateNext() == null) 
		nextURL = previousURL;

	// Define the Unicode char for various keys
	var left = 37;
	var right = 39;
	var j = 106;
	var k = 107;
	var f = 102;
	var d = 100;
	
	// handle key mapping
	var unicode=key.keyCode? key.keyCode : key.charCode;
	
	// go previous
	if(unicode == left || unicode == k || unicode == d)
	{
		key.preventDefault();
		this.location.href = previousURL;
	}
	// go next
	if(unicode == right || unicode == j || unicode == f)
	{
		key.preventDefault();
		this.location.href = nextURL;		
	}
}
// Register Listener for key presses
unsafeWindow.document.onkeypress = keyPressed