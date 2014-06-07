// ==UserScript==
// @name           Image Resizer
// @namespace      http://vinz.nl/greasemonkey/
// @description    Resize images in a document to fit the window.
// @include        http://*
// ==/UserScript==

// SETTINGS, go ahead and change them to suit you.

// Log stuff to the error console.
var debug = true;

// Minimum width of images to be considered and the minimum width to resize to.
// This can prevent your document from getting small enough if set too high.
var minwidth = 100;

// Maximum amount of images that can be resized every try.
var maxloops = 50;

// Maximum time the script can run, in milliseconds, in case the onLoad event
// gets lost somehow.
var maxtime = 3 * 60 * 1000;

// Milliseconds between resize runs, default is to resize 4 times a second.
var resizetime = 250;

// This number is used to score images, but also represents the maximum width
// a document can have before things start getting screwy. Shouldn't need to be
// changed in normal circumstances, but it's there if you need to anyway. Keep
// it a nice round number if you want your logs to remain somewhat readable.
var maxoffset = 100000;


// No user-serviceable parts below this line.
var starttime = new Date();
var resizedimgs = [];
var origwidth = 0;

function log(msg) {
	if (!debug) return;
	GM_log(msg);
}

function getWindowWidth() {
	return document.documentElement.clientWidth;
}

function getScrollWidth() {
	// Documents in different rendering modes need a different property,
	// max() is the easiest way to select it, even though it's a bit ugly.
	return Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
}

function getOffsetLeft(elem) {
	// Return the x coordinate where the image starts.
	if (elem.offsetParent) {
		// Recurse up to the parent element, all the way to the root element.
		return getOffsetLeft(elem.offsetParent) + elem.offsetLeft;
	} else {
		// Root element found, the +1 is because this offset returns a distance, and we want a coordinate.
		return elem.offsetLeft + 1;
	}
} 

function undoResize() {
	// Reset every resized image to it's original width.
	if (resizedimgs.length == 0) return;
	//log('Undoing previous resize.');
	for (i=0; i < resizedimgs.length; i++) {
		var img = resizedimgs[i];
		img.ref.width = img.origwidth;
	}
	resizedimgs = [];
}

function doResize () {
	// Check if we need to start resizing, calculate resizetarget if we do.
	var windowwidth = getWindowWidth();
	var scrollwidth = getScrollWidth();
	if (scrollwidth <= windowwidth) return false;
	var resizetarget = scrollwidth - windowwidth;
	log('Resizing from a width of '+scrollwidth+' to '+windowwidth+', resizetarget is '+resizetarget);
	
	// Record maximum size this document reaches, to see if our efforts have any effect.
	if (scrollwidth > origwidth) {
		if (origwidth > 0) log('Increasing origwidth from '+origwidth+' to '+scrollwidth);
		origwidth = scrollwidth;
	}
	
	// Loop through all images in the document, find the widest image,
	// and select the rightmost one if there are multiple of the same width.
	var candidate = {};
	var imgs = document.getElementsByTagName('img');
	// Label for continue statements.
	checkimage:	for (i=0; i < imgs.length; i++) {
		var img = imgs[i];
		
		// Check for client- or server-side image maps.
		if (img.isMap || img.useMap) continue checkimage;
		
		// Check for minimum width.
		if (img.width <= minwidth) continue checkimage;
		
		// Score the image. Image width is the normal score.
		// Being wide enough to resize the document in one go is a huge plus (+maxoffset).
		// OffsetLeft is used to differentiate images of the same width (+offsetLeft/maxoffset).
		var offsetLeft = getOffsetLeft(img);
		var score = img.width + (offsetLeft/maxoffset);
		if (offsetLeft + img.width + resizetarget > windowwidth) score += maxoffset;
		
		// Check if image scores higher than previously recorded images.
		if (candidate.score && candidate.score > score) continue checkimage;
		
		// Check if image is already resized
		for (j=0; j < resizedimgs.length; j++) {
			if (resizedimgs[j].ref == img) {
				//log('Ignoring resized img at '+offsetLeft+' width '+img.width+' origwidth '+resizedimgs[j].origwidth+' src '+img.src);
				continue checkimage;
			}
		}
		
		// Record image as a candidate
		//log('Considering img at '+offsetLeft+' width '+img.width+' score '+score+' src '+img.src);
		candidate.offsetLeft = offsetLeft;
		candidate.score = score;
		candidate.img = i;
	}
	// Return if nothing found.
	if (!candidate.img) return false;
	
	// Calculate and log new width.
	var img = imgs[candidate.img];
	var offsetLeft = candidate.offsetLeft;
	var newwidth = windowwidth - offsetLeft - (scrollwidth - offsetLeft - img.width);
	if (newwidth < minwidth) newwidth = minwidth;
	log('Changing img at '+offsetLeft+' from '+img.width+' to '+newwidth+', src '+img.src);
	if (img.width == newwidth) return false;
	
	// Record image parameters before the actual resizing takes place.
	var resizedimg = {};
	resizedimg.ref = img;
	resizedimg.origwidth = img.width;
	resizedimgs.push(resizedimg);
	
	// Resize image, Firefox is nice enough to preserve the aspect ratio.
	img.width = newwidth;
	return true;
}

function checkResize() {
	// Check to see if maxtime time has passed and clean up the timer if so.
	var now = new Date();
	if (now.getTime() > starttime.getTime() + maxtime) window.clearInterval(myinterval);
	
	// Check if we need to start resizing.
	if (getScrollWidth() <= getWindowWidth()) return false;
	
	// Undo changes before starting over.
	undoResize();
	
	// Try a maximum of maxloops times to resize an image.
	var resized = false;
	var loop = 0;
	do {
		resized = doResize();
		loop++;
	} while (loop < maxloops && resized);
	
	// If we resized anything, check to see if we had any succes.
	if (resizedimgs.length == 0) return;
	var width = getScrollWidth();
	if (width < origwidth) return; // Hooray, succes!
	log('Original width was '+origwidth+' and width is now '+width+' so we failed, reverting changes.');
	undoResize();
}

function loadedResize() {
	// onLoad has fired, clean up the timer, undo all changes and recheck.
	// Only log if it looks like we did something earlier.
	if (origwidth > 0 && origwidth != getScrollWidth()) log('Document loaded, rechecking.');
	window.clearInterval(myinterval);
	undoResize();
	checkResize();
}

function redoResize() {
	// onResize has fired, undo all changes and recheck.
	log('Window resized, rechecking.');
	undoResize();
	checkResize();
}

// First run to find early loading images (probably from the cache).
checkResize();

// Set up timer to resize every resizetime milliseconds.
var myinterval = window.setInterval(checkResize, resizetime);

// Add onLoad event for final resize and timer cleanup.
window.addEventListener('load', loadedResize, true);

// Add onResize event to reresize everything if the browser size changes
window.addEventListener('resize', redoResize, true);
