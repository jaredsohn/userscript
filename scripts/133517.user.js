// ==UserScript==
// @name        Flickr "Fluid" Photo Page: No scrolling for portrait photos
// @namespace   http://userscripts.org/users/115601
// @include     http://www.flickr.com/photos/*
// @version     1.0.1
// ==/UserScript==

function fiddleWithFluidPhoto()
{
	//GM_log('fiddleWithFluidPhoto');

	var photo = document.getElementById('liquid-photo');

	var oldHeight = photo.height;
	var oldWidth = photo.width;
	
	//GM_log('fiddleWithFluidPhoto:oldHeight:' + oldHeight + ',oldWidth:' + oldWidth);

	var maxHeight = window.innerHeight - 200;

	//GM_log('maxHeight:' + maxHeight);

	if (oldHeight > maxHeight)
	{
		var ratio = oldWidth / oldHeight;

		height = maxHeight;
		width = height * ratio;

		//GM_log('fiddleWithFluidPhoto:new height:' + height + ',width:' + width);
 		photo.height = height;
		photo.width = width;

		var photoBuffer = document.getElementById('liquid-photo-buffer');

		photoBuffer.width = width;
		photoBuffer.height = height;

		var overlay = document.getElementById('photo-drag-proxy');

		overlay.style.width = width + 'px';
		overlay.style.height = height + 'px';

		var notes = document.getElementById('notes');

		notes.style.width = width + 'px';
		notes.style.width = height + 'px'; 
		// these sizes currently get changed back by Flickr code, so...
		notes.style.display = 'none';

		// Flickr page seems to remove event listeners, so put it back.
		window.removeEventListener("resize", fiddleWithFluidPhotoOnResize, false);
		window.addEventListener("resize", fiddleWithFluidPhotoOnResize, false);
	}

}

function fiddleWithFluidPhotoOnResize()
{
	//GM_log('RESIZE');
	fiddleWithFluidPhoto();
}

document.addEventListener("DOMNodeInserted", fiddleWithFluidPhoto, false);
window.addEventListener("resize", fiddleWithFluidPhotoOnResize, false);
