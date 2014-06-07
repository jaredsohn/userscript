// ==UserScript==
// @name           gnome-look.org thumbnail enlarger
// @author         Nigglypuff
// @namespace      meta.ironi.st
// @include        http://gnome-look.org*
// @include        http://*.gnome-look.org*
// ==/UserScript==

var thumbnailPath = '/CONTENT/content-m1/m',
	fullSizePath = '/CONTENT/content-pre1/';

function fixImageExtension(url, callback) {
	// remove extension from original url
	url = url.slice(0, -3);
	
	var extensions = ['jpg', 'gif', 'png'];
	
	function tryNextExtension(){
		var extension = extensions.shift();
		
		if (extension) {
			testImageExists(url + extension, function (exists) {
				if (exists) {
					callback(url + extension);
				} else {
					tryNextExtension();
				}
			});
		} else {
			callback(null);
		}
	};
	
	tryNextExtension();
	
};

function testImageExists(url, callback) {
	var testImg = document.createElement('img');
	
	testImg.addEventListener('load', function () {
		callback(true);
	}, false);
	
	testImg.addEventListener('error', function () {
		callback(false);
	}, false);
	
	testImg.src = url;
};

[].forEach.call(document.images, function(img) {
	var thumbnailName = img.src.split(thumbnailPath)[1];
	
	if (thumbnailName) {
		img.style.maxWidth = '300px';
		fixImageExtension(fullSizePath + thumbnailName, function(fixedUrl) {
			if (fixedUrl) img.src = fixedUrl;
		});
	}
});