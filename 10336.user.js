// ==UserScript==
// @name           BayImg Show Large Images
// @author        BitVector
// @namespace      no.name.space
// @description    Click on "Show Large Images" link to convert all thumbnails to full-size images.
// @include        http://bayimg.com/album/*
// @include        http://www.bayimg.com/album/*
// @include        http://bayimg.com/tag/*
// @include        http://www.bayimg.com/tag/*
// ==/UserScript==

function largeImg() {
	var thumbs = document.getElementsByTagName('img');
	
	for (var i = 0; i < thumbs.length; i++) {
		if (thumbs[i].src.match(/thumbs.bayimg.com/)) {
			var thumbnail = thumbs[i].src.match(/http:\/\/thumbs.bayimg.com\/(.+?\.jpg)/)[1];
			var fullsize = "http://image.bayimg.com/" + thumbnail;
			var directLink = document.createElement('p');
			var a = document.createElement('a');
			
			// Convert thumbnail to full-size image
			thumbs[i].src = fullsize;
			
			// Create a direct link to the full-size image
			a.href = fullsize;
			a.innerHTML = "[Direct Link]";
			directLink.appendChild(a);
			thumbs[i].parentNode.parentNode.insertBefore(directLink,thumbs[i].parentNode.nextSibling);
		}
	}
}

// Place link on thumbnail page
var wrapper = document.getElementById('wrapper');

if (wrapper) {
	var showLargeImages = document.createElement('h2');
	
	showLargeImages.innerHTML = '<center><a href="#">Show Large Images</a></center>';
	wrapper.parentNode.insertBefore(showLargeImages,wrapper);
	showLargeImages.addEventListener('click',largeImg,false);
}