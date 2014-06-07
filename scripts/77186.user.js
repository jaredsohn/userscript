// ==UserScript==
// @name           Twitter Inline Pictures
// @namespace      http://userscripts.org/users/56580
// @description    View tweeted pictures directly on Twitter.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        0.5.0
// ==/UserScript==


// enablePrefetch - set to false to disable prefetching
var enablePrefetch = true;

var websiteData = [
	{"domain":"yfrog.com", "picSelector":"#main_image"},
	{"domain":"twitpic.com", "picSelector":"#photo-display"},
	{"domain":"ping.fm/p/", "picSelector":"#fl"},
	{"domain":"tweetphoto.com", "picSelector":"#medium_photo"},
	{"domain":"wikipedia.org/wiki/Image", "picSelector":"#file a img"},
	{"domain":"flickr.com/photos/", "picSelector":".photo-div img"},
	{"domain":"pikchur.com", "picSelector":"#pik img"},
	{"domain":"picktor.com", "picSelector":"#picktwitPhotoContainer a img"},
	{"domain":"xkcd.com", "picSelector":"#middleContent .bd .c .s img"},
	{"domain":"twitgoo.com", "picSelector":"#fullsize"}
	//{"domain":"", "picSelector":""},
],
	websiteDatalength = websiteData.length,
	loadings = {};


// runOnTweets - http://userscripts.org/scripts/show/82719
// By: themiddleman - http://userscripts.org/users/56580
// Send this a function to run once on each tweet as soon as it is loaded.
function runOnTweets(callback) {
	function hasClass(elm, className) {
		var classes = elm.getAttribute("class").split(" ");
		for(var i = 0; i < classes.length; i++) {
			if(classes[i] === className) {
				return true;
			}
		}
		return false;
	}
	// tweets on page load.
	var statuses = document.getElementsByClassName("status");
	statusesLength = statuses.length;
	for(var i = 0; i < statusesLength; i++) {
		callback(statuses[i]);
	}
	document.addEventListener("DOMNodeInserted", function(e) {
		// tweets loaded after the page was loaded.
		if(hasClass(e.target, "status")) {
			callback(e.target);
		}
		// When twitter loads a new page via ajax the tweets are all in a <ol>.
		if(hasClass(e.target, "statuses")) {
			var statuses = e.target.getElementsByTagName("li");
			for(var i = 0; i < statuses.length; i++) {
				callback(statuses[i]);
			}
		}
	}, true);
}

// Checks to see if the given string matches one the supported websites.
function isImageSite(url) {
	if(url) {
		if(url.length) {
			for(var i = 0; i < websiteData.length; i++) {
				if(url.indexOf(websiteData[i].domain) != -1) {
					return websiteData[i].picSelector;
				}
			}
		}
	}
	return null;
}

// Takes a selector, page as text, url, and calls back with the src of the image that matches the selector and the url.
function getSrc(selector, html, url, callback) {
	var frame = document.createElement("iframe");
	frame.style.display = "none";
	document.body.appendChild(frame);
	frame.contentWindow.document.write(html);
	
	var frameLoad = function(e) {
		var pic = frame.contentWindow.document.querySelectorAll(selector)[0];
		if(pic) {
			callback(pic.src, url);
			// the load CB is called more than once
			frame.contentWindow.document.removeEventListener("load", frameLoad, true);
			document.body.removeChild(frame);
		}
	}
	frame.contentWindow.document.addEventListener("load", frameLoad, true);
}

// Takes a url and a selector and calls back with the selector, image url and the page url.
function getImageUrl(url, selector, callback) {
	// workaround for: http://github.com/greasemonkey/greasemonkey/issues/issue/1001
	setTimeout(function() {
		GM_xmlhttpRequest({
			method: "GET",
			overrideMimeType: "text/html",
			url: url,
			onload: function(page) {
				// get rid of some links to css files and scripts to avoid 404s, we dont do imgs because we kind of need that :)
				getSrc(selector, page.responseText.replace(/\<link/g, "<a").replace(/\<style/g, "<a").replace(/\<script/g, "<a"), url, callback);
			}
		});
	}, 0);
}


// Takes a image url and preloads the image.
function preloadImage(imgUrl) {
	var image = document.createElement("img");
	image.src = imgUrl;
	image.style.display = "none";
	document.body.appendChild(image);
	preview.addEventListener("load", function() {
		image.parentNode.removeChild(image);
	}, false);
}

function Thumbnailer() {
	var thumb = this;
	this.moveListener;
	this.thumbnailUrl = "";
	
	this.createThumbnail = function() {
		var thumbnail = document.createElement("img");
		thumbnail.style.position = "absolute";
		thumbnail.style.maxWidth = "200px";
		thumbnail.style.zIndex = "10001";
		document.body.appendChild(thumbnail);
		return thumbnail;
	}
	
	this.thumbnail = this.createThumbnail();
	
	this.move = function(e) {
		thumb.thumbnail.style.left = (e.pageX + 15) + "px";
		thumb.thumbnail.style.top = (e.pageY + 15) + "px";
	}
	
	this.show = function(imageUrl, e) {
		if(thumb.thumbnailUrl !== imageUrl) {
			thumb.thumbnailUrl = imageUrl;
			thumb.thumbnail.src = imageUrl;
			thumb.thumbnail.style.display = "block";
			thumb.move(e);// Run on the event that triggered this all.
			document.addEventListener("mousemove", thumb.move, false);
		}
	}
	
	this.hide = function() {
		if(thumb.thumbnailUrl !== "") {
			thumb.thumbnailUrl = "";
			thumb.thumbnail.style.display = "none";
			document.removeEventListener("mousemove", thumb.move, false);
			this.thumbnail.parentNode.removeChild(this.thumbnail);
			this.thumbnail = this.createThumbnail();
			
		}
	}
	
	this.isShowing = function() {
		return thumb.thumbnailUrl !== "";
	}
	
	this.getThumbnailPosition = function() {
		return {
			"x": parseInt(thumb.thumbnail.style.left),
			"y": parseInt(thumb.thumbnail.style.top)
		};
	}
	
	return this;
}


function ImageControls() {
	var ImageControls = this;
	this.maxZoomInPercent = 500;
	
	// This switches to false when they move/zoom the image, if it is false we (re)center the image on window resize
	this.imageMoved = false;
	
	document.body.style.margin = "0";
	
	this.zoomTopImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAdCAYAAABbjRdIAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEFws0C2eSmZEAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACGElEQVRIx+2Vv4pUMRSHv2SSGwd0HBBdhgGVkW1UXCzcUosVO99AKwXrfQFn9AWmFrTaN9BSLGxtdkGwsNhCEFGb9Q+M4eYmNslyGebeuzO7Iyj+IM1Ncj7OOb+TK2hQURQj771wzsm00p5SyqclpQytVmtUF0vUQZxz0hgzBlaAPtADuoAGcmAP+AR8BD5bazeVUr4KOhOW5/kjrfUYGABrwCXgHHAaOF6C/QS+Ah+Ad8A2sJvn+abWetgIs9Y+NsY8Ba4BN4ArwBnARIgsHfcRaoEvwFvgNfDGWnvfGPOwEhZBW8AtYANYBToR0iQHfAfeA6+Al9baO2WgmCrdM+B2XBeA9lQmTfLABNgFngMv8jy/l0oqkxlij9ZjRouAUrx27PUGsK61HhdFMQKQIYRhtPMAuB5LtwhoGrga4w2cczKEMJTeexHtvRbN0DkEqAw8GeNdNcaMvfdCeu9FnKPL0XUtjkYqxrsIrHjvRXoR+sDZQ5ZvltrAeaDvnJMqwnpxYBuzCiE82beyEA8ajreAU0DPOSdTZt34MhxlVql3J4Cuc06m4OaAg7sITAHHQghChhBEHG7JciTLjqEOVO5R015FD/cTkSXYsrKTyXjLKl3l4NVqujRzWn928/6E/l2YmvfCvH3637O/3CBCiAD8An4cAN6d8W2v4c43YCKE6Kgsywpgp/RnrdLdmr2tmr0JsJNl2c3fKha37tOR2X8AAAAASUVORK5CYII=";
	this.zoomBarImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAADhCAYAAAAec0/CAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEFws0NNH0tKwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAUElEQVRo3u3KMQ2AUBQEsAMDJE8fgvCBv8uXgAAmZtq5W9trZlaSM8nkbSW52x57PpBlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZbln+QH2VoLFJG0bPoAAAAASUVORK5CYII=";
	this.zoomSliderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAALCAYAAACOAvbOAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEFws1COeA+WoAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAxUlEQVQ4y+2UMYoCUQxAX5xPiA4oeIxlCw8xXsHKg2hn595pL2HhQVyWj58wn28zpTMjumzlKxPCIyGJ5JwPKaXg7lUpRbjPjnG+7gVFpKhqNrM2pJRCXdffwAqY8jyXnvgVOMUY18Hdq060ARY9BVvgc0B0Hsj9ALh7FbrRTTvR8smuhuomwKyUIhP+kbfsTwgiUoAE/L4gv4xs41VE5kFVM3DqEn13dhyRfQD7oTtT1SaYWRtjbEY+yCMsej7IXFUbM2tvcxFANIQuSJcAAAAASUVORK5CYII=";
	this.zoomBottomImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAdCAYAAABbjRdIAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEFws0HgpPfXoAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACBElEQVRIx+2WMYsTQRTHf/N2llUino2KCBYWFoKgja2F+hms0gnW+wU0EfurBTv9FOIVWp6FnqjNYVAhHMkhxNPlnJ3NjM3bI8TkEs9EBO8P08zOvN++92beG1MUxYNGo/EMuAwcZbqawIkJ8wPg8T77doHXRVHcsGVZJgq6BaxwMDX3+fYVoCzLxMYYjXq0MuXPZ2nWngAciTEa4S/qEHYI+3dgdtaCGOPDeY0ZY+7832Ecaln57dDMUapibVvGJpelMB7GsERQNMZEMcZE4AdQLQnoAQcg1tqgDfDbEmAB+A4MrLWhhm0BX/SgLFJDYBvYGoV1gY/awhfp1S7wGehaa4OISAR6wHugr7lblFd94C3QE5EoIhKdcznwCnijb4awAK921N6Gcy4XkSjGmLaGsgO8ADbV/fCH4dtUex1rbTDGtAUgSZKW9z4H1oE1BR8EWIM+qJ11732eJEkLwIyudM7dz7LsCXATuA5cAI7P0x30Pu2oR2vAU+dcM8uyu3ulb3yHAh8BV4FrwCXgFJAB6YSqU1/avuboOfDSOXd7FDQRBuC9b6dpugqcB64AF4FzwEngmEK9Xtht4BPwDtgAOt77PE3Te78U9anndjhsVVUlWZatAqeBs8AZfZTWsIEWhC7Qc87l1tpQ52hu2Cg0hGCqqpJ67PUna0M9RCROg9T6CQlnzrTGkL28AAAAAElFTkSuQmCC";
	this.closeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQBJREFUWMPVmEkOgzAMRd/PkutwDq7TLeJMXKOcyV2USkgVY4zrZoUEMS8efpwIMN5jAkYzQ9JAwDCzXhJAB7QAZfG+BTpJmFn/C5gP0BQNtQYDTAUYI6G2YICxmBlRUHswZoYOf1iZ6Ef/obMT7oQB0NWJd8B8AXlDXbElL0NeNuRtsHauvFdZ61155oFHqOWVnAAexSCv8p2fqytTjpqCh3bJUXXxEFI5bwXVW00h2fjvkKVK6lRlv4B5AM2dwlhOeqZZ7fSkwaMd/p/NNVX7kapBS9XCpmryUx2DUh0UI2DOQJUomFnJd8VTwDMC5qintLhBC71F27qwCofZCt8Lhkjz70BW4zUAAAAASUVORK5CYII=";
	
	this.actualImageHeight;
	this.actualImageWidth;
	this.imageAspect;
	
	this.hudZoomSliderTimer = null;
	
	
	this.imageControls = function() {
		this.frame = this.writeFrame();
		this.pan = this.writePan(this.frame);
		this.image = this.writeImage(this.pan);
		
		this.hudZoom = this.writeZoom();
		this.hudZoomPlus = this.writeZoomTop(this.hudZoom, this.zoomTopImage);
		this.hudZoomBar = this.writeZoomBar(this.hudZoom, this.zoomBarImage);
		this.hudZoomSlider = this.writeZoomSlider(this.hudZoom, this.zoomSliderImage);
		this.hudZoomMinus = this.writeZoomBottom(this.hudZoom, this.zoomBottomImage);
		this.hudZoomLevel = this.writeZoomLevel();
		this.background = this.writeBackground();
		this.close = this.writeClose(this.closeImage);
		
		this.hudSliderMin = parseInt(this.hudZoom.style.top) + parseInt(this.hudZoomBar.style.top) + 6;
		this.hudSliderMax = this.hudSliderMin + parseInt(this.hudZoomBar.style.height) - 12;
		
		this.viewHeight = window.innerHeight;
		this.viewWidth = window.innerWidth;
		
		this.setVisible(false);
		
		this.frame.addEventListener("mousedown", this.frameMouseDown, false);
		this.frame.addEventListener("click", this.frameClick, false);
		window.addEventListener("resize", this.resize, false);
		
		document.addEventListener("mousewheel", this.wheel, false);
		document.addEventListener("DOMMouseScroll", this.wheel, false);
		
		this.hudZoomPlus.addEventListener("click", this.zoomIn, false);
		this.hudZoomMinus.addEventListener("click", this.zoomOut, false);
		this.hudZoomSlider.addEventListener("mousedown", this.sliderClick, false);
		this.close.addEventListener("click", this.closeClick, false);
	}
	
	this.frameMouseDown = function(e) {
		// Don't let broser do a drag on images.
		e.preventDefault();
		
		ImageControls.imageMoved = true;
		
		// The position of the pan when clicked.
		var clickPanPosX = 0;
		var clickPanPosY = 0;

		clickPanPosX = parseInt(ImageControls.pan.style.left);
		clickPanPosY = parseInt(ImageControls.pan.style.top);

		var clickPageX = e.pageX;
		var clickPageY = e.pageY;
		
		function move(e) {
			var relPosX = (e.pageX - clickPageX + clickPanPosX);
			var relPosY = (e.pageY - clickPageY + clickPanPosY);
			ImageControls.pan.style.left = relPosX + "px";
			ImageControls.pan.style.top = relPosY + "px";
		}
		document.addEventListener("mousemove", move, true);
		
		function unbind(e) {
			document.removeEventListener("mousemove", move, true);
			document.removeEventListener("mouseup", unbind, true);
			document.removeEventListener("mouseleave", unbind, true);
		}
		document.addEventListener("mouseup", unbind, true); 
		document.addEventListener("mouseleave", unbind, true);
	}
	
	this.frameClick = function(e) {
		if(e.target == ImageControls.frame) {
			ImageControls.hideImage();
		}
	}
	
	this.closeClick = function(e) {
		ImageControls.hideImage();
	}
	
	this.resize = function(e) {
		ImageControls.viewHeight = window.innerHeight;
		ImageControls.viewWidth = window.innerWidth;
		ImageControls.frame.style.width = ImageControls.viewWidth + "px";
		ImageControls.frame.style.height = ImageControls.viewHeight + "px";
		
		if(! ImageControls.imageMoved) {
			ImageControls.centerImage();
		}
	}
	
	this.onScroll = function(direction,x,y) {
		if(direction == 'd') {
			this.zoom(-15, x / ImageControls.viewWidth, y / ImageControls.viewHeight);
		}
		else {
			this.zoom(15, x / ImageControls.viewWidth, y / ImageControls.viewHeight);
		}
	}
	this.wheel = function(e){
		var wheelDelta = e.wheelDelta || (e.detail * -1);
		var x = e.clientX;
		var y = e.clientY;
		
		if (wheelDelta < 0) { 
			ImageControls.onScroll('d',x,y);
		}
		else { 
			ImageControls.onScroll('u',x,y);
		}
		return false;
	}
	
	this.zoom = function(zoomPercent, x, y, isAbsolute) {
		ImageControls.imageMoved = true;
		var newZoomLevel;
		var oldZoomLevel = (parseInt(ImageControls.image.style.width) / ImageControls.actualImageWidth) * 100;
		if(isAbsolute) {
			newZoomLevel = zoomPercent;
		}
		else {
			newZoomLevel = ((zoomPercent / 100) + 1) * oldZoomLevel;
		}
		
		if(newZoomLevel > ImageControls.maxZoomInPercent) {
			newZoomLevel = ImageControls.maxZoomInPercent;
		}
		if(newZoomLevel < 2) {
			newZoomLevel = 2;
		}
		
		var newZoomLevelDecimal = (newZoomLevel / 100);
		
		var newWidth = ImageControls.actualImageWidth * newZoomLevelDecimal;
		var newHeight = ImageControls.actualImageHeight * newZoomLevelDecimal;
		var relativeZoomLevel = newZoomLevel / oldZoomLevel;
		
		// Center the pan so It zooms straight.
		// The location on the screen to zoom to/from. eg 0.5 is the center.
		var zoomPosX = parseInt(ImageControls.viewWidth) * x;
		var zoomPosY = parseInt(ImageControls.viewHeight) * y;
		
		// The new center of the pan.
		var newPanCenterX = (zoomPosX - parseInt(ImageControls.pan.style.left)) * relativeZoomLevel;
		var newPanCenterY = (zoomPosY - parseInt(ImageControls.pan.style.top)) * relativeZoomLevel;
		
		// The new top left positions of the pan.
		var panX = (newPanCenterX - zoomPosX) * -1;
		var panY = (newPanCenterY - zoomPosY) * -1;
		
		ImageControls.image.style.width = newWidth + "px";
		ImageControls.image.style.height = newHeight + "px";
		ImageControls.pan.style.left = panX + "px";
		ImageControls.pan.style.top = panY + "px";
		
		this.updateHudZoom();
	}
	
	this.centerImage = function() {
		var imgWidth = ImageControls.actualImageWidth;
		var imgHeight = ImageControls.actualImageHeight;
		ImageControls.imageMoved = false;
		
		if(imgWidth > ImageControls.viewWidth) {
			imgWidth = ImageControls.viewWidth;
			imgHeight = imgWidth / ImageControls.imageAspect;
		}
		if(imgHeight > ImageControls.viewHeight) {
			imgHeight = ImageControls.viewHeight;
			imgWidth = imgHeight * ImageControls.imageAspect;
		}
		
		var newLeft = (ImageControls.viewWidth / 2) - (imgWidth / 2);
		var newTop = (ImageControls.viewHeight / 2) - (imgHeight / 2);
		
		ImageControls.image.style.width = imgWidth + "px";
		ImageControls.image.style.height = imgHeight + "px";
		ImageControls.pan.style.left = newLeft + "px";
		ImageControls.pan.style.top = newTop + "px";
		
		this.updateHudZoom();
	}
	
	this.updateHudZoom = function() {
		/*
		 * Basically we take the slider and divide it into 2 parts:
		 * between 100% and maxZoomInPercent
		 * and between 100% and 0
		 * otherwise the zoom speed is very inconsistant
		 */
		var zoomPercent = parseInt((parseInt(ImageControls.image.style.width) / ImageControls.actualImageWidth) * 100);
		
		var sliderPercent;
		if(zoomPercent > 100) {
			sliderPercent = ((zoomPercent - 100) * 50) / (ImageControls.maxZoomInPercent - 100) + 50;
		}
		else {
			sliderPercent = (zoomPercent * 50) / 100;
		}
		
		var sliderMax = ImageControls.hudZoomBar.height - ImageControls.hudZoomSlider.height;
		var newSliderTop = ((sliderPercent / 100) * sliderMax);
		
		newSliderTop += ImageControls.hudZoomPlus.height;
		
		ImageControls.hudZoomSlider.style.top = newSliderTop + "px";
		ImageControls.hudZoomLevel.innerHTML = zoomPercent + "%";
	}
	
	this.sliderClick = function(e) {
		// Don't let broser do a drag on images.
		e.preventDefault();
		
		var clickSliderPosY = parseInt(ImageControls.hudZoomSlider.style.top);
		var clickSliderY = e.clientY;
		
		function move(e) {
			var pos = Math.min(Math.max(e.clientY, ImageControls.hudSliderMin), (ImageControls.hudSliderMax)),
				relPosY = (pos - clickSliderY + clickSliderPosY),
				percent = ((pos - ImageControls.hudSliderMin) / (ImageControls.hudSliderMax - ImageControls.hudSliderMin)) * 100,
				good;
			
			// Snap to 50%.
			if(percent > 47 && percent < 53) {
				percent = 50;
			}
			
			if(percent > 50) {
				good = (((percent - 50) / 50) * (ImageControls.maxZoomInPercent - 100)) + 100;
			}
			else {
				good = percent * 2;
			}
			if(percent > 0) {
				ImageControls.zoom(good, 0.5, 0.5, true);
			}
			ImageControls.hudZoomSlider.style.top = relPosY + "px";
		}
		document.addEventListener("mousemove", move, true);
		
		function unbind(e) {
			document.removeEventListener("mousemove", move, true);
			document.removeEventListener("mouseup", unbind, true);
			document.removeEventListener("mouseleave", unbind, true);
		}
		document.addEventListener("mouseup", unbind, true); 
		document.addEventListener("mouseleave", unbind, true);
	}
	
	
	
	this.zoomIn = function(e) {
		ImageControls.zoom(15, 0.5, 0.5);
		return false;
	}
	this.zoomOut = function(e) {
		ImageControls.zoom(-15, 0.5, 0.5);
		return false;
	}
	
	this.css = function(elm, styles) {
		for(style in styles) {
			if(styles.hasOwnProperty(style)) {
				elm.style[style] = styles[style];
			}
		}
	}
	
	this.setVisible = function(visible) {
		var display = visible ? "block" : "none";
		this.hudZoom.style.display = display;
		this.frame.style.display = display;
		this.hudZoomLevel.style.display = display;
		this.background.style.display = display;
		this.close.style.display = display;
	}
	
	this.displayImage = function(imageSrc) {
		this.image.src = imageSrc;
		// We have to init the css width and height or some browsers fail
		this.image.style.width = this.image.width + "px";
		this.image.style.height = this.image.height + "px";
		
		this.imageMoved = false;
		
		this.image.addEventListener("load", function() {
			document.body.style.overflow = "hidden";
			
			ImageControls.actualImageHeight = parseInt(ImageControls.image.height);
			ImageControls.actualImageWidth = parseInt(ImageControls.image.width);
			ImageControls.imageAspect = ImageControls.image.width / ImageControls.image.height;
			
			ImageControls.resize();
			ImageControls.updateHudZoom();
			ImageControls.setVisible(true);
		}, false);
	}
	
	this.hideImage = function() {
		this.setVisible(false);
		document.body.style.overflow = "";
		this.image.parentNode.removeChild(this.image);
		this.image = this.writeImage(this.pan);
	}
	
	this.writeFrame = function() {
		var frame = document.createElement("div");
		this.css(frame, {
			"left":"0px",
			"marginLeft":"auto",
			"marginRight":"auto",
			"overflow":"hidden",
			"position":"fixed",
			"top":"0px",
			"zIndex":"10004"
		});
		document.body.appendChild(frame);
		return frame;
	}
	this.writePan = function(frame) {
		var pan = document.createElement("div");
		this.css(pan, {
			"cursor":"move",
			"overflow":"hidden",
			"position":"fixed"
		});
		frame.appendChild(pan);
		return pan;
	}
	this.writeImage = function(pan) {
		var image = document.createElement("img");
		pan.appendChild(image);
		return image;
	}
	this.writeZoom = function() {
		var zoom = document.createElement("div");
		this.css(zoom, {
			"height":"285px",
			"position":"fixed",
			"top":"20px",
			"left":"20px",
			"width":"27px",
			"zIndex":"10005"
		});
		document.body.appendChild(zoom);
		return zoom;
	}
	this.writeZoomTop = function(zoom, src) {
		var zoomTop = document.createElement("img");
		zoomTop.src = src;
		this.css(zoomTop, {
			"cursor":"pointer",
			"height":"29px",
			"position":"absolute",
			"top":"0px",
			"left":"0px",
			"width":"27px"
		});
		zoom.appendChild(zoomTop);
		return zoomTop;
	}
	this.writeZoomBar = function(zoom, src) {
		var zoomBar = document.createElement("img");
		zoomBar.src = src;
		this.css(zoomBar, {
			"cursor":"pointer",
			"height":"225px",
			"marginLeft":"8px",
			"overflow":"hidden",
			"position":"absolute",
			"top":"29px",
			"left":"0px",
			"width":"11px"
		});
		zoom.appendChild(zoomBar);
		return zoomBar;
	}
	this.writeZoomSlider = function(zoom, src) {
		var zoomSlider = document.createElement("img");
		zoomSlider.src = src;
		this.css(zoomSlider, {
			"cursor":"pointer",
			"height":"11px",
			"position":"absolute",
			"top":"40px",
			"left":"0px",
			"width":"27px"
		});
		zoom.appendChild(zoomSlider);
		return zoomSlider;
	}
	this.writeZoomBottom = function(zoom, src) {
		var zoomBottom = document.createElement("img");
		zoomBottom.src = src;
		this.css(zoomBottom, {
			"cursor":"pointer",
			"height":"29px",
			"position":"absolute",
			"top":"254px",
			"left":"0px",
			"width":"27px"
		});
		zoom.appendChild(zoomBottom);
		return zoomBottom;
	}
	this.writeZoomLevel = function() {
		var zoomLevel = document.createElement("div");
		zoomLevel.innerHTML = "&nbsp";
		this.css(zoomLevel, {
			"color":"white",
			"left":"0px",
			"position":"fixed",
			"textAlign":"center",
			"textShadow":"0 0 8px black, 0 0 8px black, 0 0 8px black, 0 0 8px black, 0 0 8px black",
			"top":"310px",
			"width":"70px",
			"zIndex":"10005"
		});
		document.body.appendChild(zoomLevel);
		return zoomLevel;
	}
	this.writeClose = function(src) {
		var close = document.createElement("img");
		close.src = src;
		this.css(close, {
			"cursor":"pointer",
			"position":"fixed",
			"top":"10px",
			"right":"10px",
			"zIndex":"10005"
		});
		document.body.appendChild(close);
		return close;
	}
	this.writeBackground = function() {
		var bg = document.createElement("div");
		this.css(bg, {
			"backgroundColor":"black",
			"height":"100%",
			"left":"0px",
			"margin":"0px",
			"opacity":"0.6",
			"padding":"0px",
			"position":"fixed",
			"top":"0px",
			"width":"100%",
			"zIndex":"10003"
		});
		document.body.appendChild(bg);
		return bg;
	}

	this.imageControls();
}

var imageControls = new ImageControls();
var thumbnailer = Thumbnailer();




document.addEventListener("click", function(e) {
	var target = e.target;
	// On a search page the search term is bolded with a <em> and we want the <a>
	while(target.tagName.toLowerCase() === "em") {
		target = target.parentNode;
	}
	thumbnailer.hide();
	// links
	var site = isImageSite(target.href);
	if(site !== null) {
		if(loadings[target.href] === "l" || loadings[target.href] === "s") {// If the image is loading mark it to show when it loads
			loadings[target.href] = "s";
		}
		else if(loadings[target.href] === undefined) {
			getImageUrl(target.href, site, function(src) {
				imageControls.displayImage(src);
				loadings[target.href] = src;
			});
		}
		else {
			imageControls.displayImage(loadings[target.href]);
		}
		e.preventDefault();
		return false;
	}
}, true);

document.addEventListener("mousemove", function(e) {
	var target = e.target,
		thumbnailableLink = false;
	// On a search page the search term is bolded with a <em> and we want the <a>
	while(target.tagName.toLowerCase() === "em") {
		target = target.parentNode;
	}
	
	if(target.tagName.toLowerCase() === "a") {
		if(target.href) {
			if(loadings[target.href]) {
				var imgSrc = loadings[target.href];
				if(imgSrc !== "l" && imgSrc !== "s" && imgSrc !== "") {
					thumbnailableLink = true;
					thumbnailer.show(imgSrc, e);
				}
			}
		}
	}
	if( ! thumbnailableLink) {
		thumbnailer.hide();
	}
	
}, false);

// prefetch images
if(enablePrefetch) {
	runOnTweets(function(tweet) {
		var as = tweet.getElementsByTagName("a");
		for(var i = 0; i < as.length; i++) {
			var href = as[i].href;
			var site = isImageSite(href);
			if(site !== null) {
				loadings[href] = "l";// mark the image as loading.
				getImageUrl(href, site, function(src, href) {
					if(loadings[href] === "s") {
						loadings[href] = src;
						imageControls.displayImage(src);
					}
					else {
						loadings[href] = src;//could check if its already prefetching
						preloadImage(src);
					}
				});
			}
		}
	});
}

