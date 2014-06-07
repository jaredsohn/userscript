// ==UserScript==
// @name         delicious 2.0 Thumbs
// @description  A script to add thumbnails previews to the links posted on delicious 
// @include      http://delicious.com/*
// @exclude      http://delicious.com/
// @exclude      http://delicious.com/rss/*
// ==/UserScript==

(function(){

function init() { 
	add_style();
	
	var tags = document.getElementsByTagName('h4'); 
	for (i = 0; i < tags.length; i++) { 
		add_thumbnail(tags[i].childNodes[1]);
	}
}
function add_thumbnail(link) {
	var thumb = document.createElement('img');
	thumb.src = "http://open.thumbshots.org/image.pxf?url=" + link;
	thumb.style.width = "120px";
	thumb.style.height = "90px";
	thumb.style.border = "1px solid #999";
	thumb.style.display = "block";
	thumb.style.cssFloat = "left";
	thumb.style.margin = "0 5px 5px 0";
	link.parentNode.insertBefore(thumb, link);
}

function add_style() {
	var style = document.createElement('style');
	style.type = 'text/css';
	var css = 'li.post {clear:left !important;}';
	css = document.createTextNode(css)
	style.appendChild(css);
	document.body.appendChild(style);
}

init();
}())
