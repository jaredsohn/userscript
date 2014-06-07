// ==UserScript==
// @name           Helgon.net preload gallery
// @namespace      http://henrik.nyh.se
// @description    Preload the previous and next gallery images on Helgon.net.
// @include        http://*helgon.net/Gallery2/view.asp?*
// ==/UserScript==

// Locate gallery index

	var galleryIndex = location.href.replace(/.*UserID=(\d+)&?.*/, 'http://www.helgon.net/Gallery2/Gallery.asp?ID=$1');
	
// Take a note of the image URL

	var imageURL = unescape(document.getElementsByTagName('img')[0].src);

// Retrieve gallery index contents

	GM_xmlhttpRequest({
	method:"GET",
	url:galleryIndex,
	onload:function(result) {
		
		lines = result.responseText.split("\n");  // Make an array out of the HTML, since each image will be on a line of its own
		var thumbs = new Array();  // Prepare an array for image URLs
		
		for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML
		
			var line = lines[i];  // This line
		
			if (line.indexOf('img src') != -1) {  // This line contains an image
				var img = line.replace(/.*<img src="(.+?)_tmb.jpg".*\r?/, '$1.jpg');  // Extract image URL
				thumbs.push(img);  // Add image URL to the thumbs array
			}
		
		}
		
		// We now have all image URLs in the thumbs array
		
		for (i = 0; i < thumbs.length; i++) {  // Loop through image URLs. Wish we had array.indexOf!
		
			var img = thumbs[i];  // This image URL

			if (img == imageURL) {  // If it matches the URL of the image being viewed:
				var prevURL = (i > 0) ? thumbs[i-1] : '';  // Previous URL is the one before it
				var nextURL = (i < thumbs.length-1) ? thumbs[i+1] : '';  // Next URL is the one after it
				break;  // Stop looking
			}
		
		}
		
		// Preload next image
		var preloadImageNext = new Image;
		preloadImageNext.src = nextURL;
		
		// Preload previous image
		var preloadImagePrev = new Image;
		preloadImagePrev.src = prevURL;
	
	}
	});
