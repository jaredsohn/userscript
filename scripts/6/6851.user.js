// GreystoneShowPic   (c) 2006-2007 Greystone Communities, by Ned Earle
// for showing Resident Pictures in REPS
//
// modified from  Image Link Tooltip v0.5, (c) 2005-2006, Clem
//
// (The following comment is for Firefox.  For IE, we use GreaseMonkey for IE
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//
// To test it, go on http://postsecret.blogspot.com/ and move your mouse
// on one of the postcard, the full image should popup now ...
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Image Link Tooltip
// @namespace     http://labs.beffa.org/greasemonkey/
// @description   When you stay on a link to an image, load and popup the image in the current webpage.
// @include       *
// ==/UserScript==(function () {var event = null;var lightBoxInitialized = false;var external = document.links; 
	for (var k=0; k<external.length; k++)	{var ext = external[k].href.substr(external[k].href.length-3);ext = ext.toLowerCase();
	    if(ext.match("jpg") || ext.match("jpeg") || ext.match("gif") || ext.match("png") || ext.match("bmp") ) {
		  external[k].addEventListener( "mouseover", linkover, false );
		  external[k].addEventListener( "mouseout", linkout, false );
		  external[k].addEventListener( "click", clickin, false );
		  external[k].style.cursor = "hand";
		}
	  }
	
	function linkover(e) {
	    event = e;
	    href = e.target.href
	    if (!href)
	       href = e.target.parentNode.href;
	       
	    if (!e.ctrlKey)
	      setTimeout(createpopup, 700,e,href);
	}  
	
	function linkout(e) {
	    event = null;
	}  
	
	function clickin(e) {
	    event = null;
	} 
	
	function createpopup(e,href) {
	    if (event == e) {
		   if (!lightBoxInitialized){
			 imtt_initLightbox();
			 lightBoxInitialized = true;
		   }
		   showLightbox(href);
	    }
	}  
	
//
//
//	Lightbox JS: Fullsize Image Overlays 
//	by Lokesh Dhakar - http://www.huddletogether.com
//
//	For more information on this script, visit:
//	http://huddletogether.com/projects/lightbox/
//
//	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
//	(basically, do anything you want, just leave my name and link)
//	
//	Gavin Montague - Removed the image constructors.  GreaseMonkey doesn't like them.  
//				   - Generally hacked up.
//

var loadingImage = 'data:image/gif;base64,R0lGODlhfgAWANUiAFJSUi4uLjAwMElJSVBQUE9PT0xMTEhISCwsLDU1NUFBQUtLSy8vL0VFRUZGRlNTU2pqZy8vLDs7N1paWj09PVNTTkJCPjExMTIyMjY2Njg4ODQ0NDk5OW5ubjo6OkBAQC0tLTMzM%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFAAAiACwAAAAAfgAWAAAG%2F8CQcEgsGo%2FIpHLJbDqfx450Sq1ar9isdsvter%2FTh7DzKZvP6LR6zW673%2FC43Dz%2BgBB4kH7P7%2Fv%2FgIGCg4SFhn94CCBkdQgUDQ0OB5MKegqTmAeVIBhGGHqdRZ%2BcnqClpKKmqahEo6GtqrCsGBcXDAiMIWQIkJIDvwMBAcDEwQEbyMnIwsrKzM3Lx9Abz9DVzdfO0tbb2N0htBe4H42RBwML6QYCAgbu7%2B7sGfP08%2FL19Pf4Gfr4%2FfX%2F8gnYZ28gwYAFMyRYuAGcuFxkQPhaYKCAxVoWM2aspaGjx44cP3oMKVIDSZEnP6YceaEkyJYuV770qLDhJ4h2JlEsQKAnBv8MPYMG%2FcmhqNGiRI8aTaqUA1OlT49GXYqhKdKqVqdeNapBoZBF5HTlRMezJwAhANKqTSvEg9u3btvCfSt3roe6c%2FHC1Us3hN24fv%2FyBeyBa4KGYOuAOLegLNsQa9cOvhvY7uTLlfNm3ru571%2FKn%2BUW1XA4RGKxi8maPQs58uPQnQkLjg16NuzbtnOPLp04AgQJqRsHZe36dW7LtDHjRr5c823DiH9HQK2z4lCgQq9bdYq1qVbu27%2BL7w6VvFTzVLl6NY1TIuOKFy9o1CjTJMyS9fPfR7lfZX%2BWLtkXIEk1gXPaLuagow478MCDED8G7fPghBH6UyFAFwpEEIQbyrN0UGm0jFNOgsAIU0yJ3WgzDTUpJpONiy1Gs%2BKLMk5DI4vKOPRQWLs8Yg4llmQCJCtDuHLKK0XGkiSRQhi5CpJNKhklkwbOUsst7SVyyJZcdunll4jkgRMYZJZp5ploahHWA3O06eabcMb5BhR01mnnnXhCEQQAIfkEBQAAIgAsBAAEABwADgAABnhAxuWCCRkxoqRymVQcnlDFsLipbphY0WDL3RJDm4Q4k2UazugzNZHRuMvLgnwuN7I1nDxcSej7%2B2AJeHkee0kAiImIgYMehYaKioyEj3uRiZOEhiKXiyF3eRybf39rbW%2BGdHRfYWObaWlTYFabXV1CX0ebTlBPCkEAIfkEBQAAIgAsDgAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9%2Br6cfAYCBgHx8fiKCgoR7hoiBin1%2BjYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z%2BTE5NCkEAIfkEBQAAIgAsGAAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9%2Br6cfAYCBgHx8fiKCgoR7hoiBin1%2BjYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z%2BTE5NCkEAIfkEBQAAIgAsIgAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9%2Br6cfAYCBgHx8fiKCgoR7hoiBin1%2BjYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z%2BTE5NCkEAIfkEBQAAIgAsLAAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9%2Br6cfAYCBgHx8fiKCgoR7hoiBin1%2BjYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z%2BTE5NCkEAIfkEBQAAIgAsNgAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9%2Br6cfAYCBgHx8fiKCgoR7hoiBin1%2BjYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z%2BTE5NCkEAIfkEBQAAIgAsQAAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9%2Br6cfAYCBgHx8fiKCgoR7hoiBin1%2BjYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z%2BTE5NCkEAIfkEBQAAIgAsSgAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9%2Br6cfAYCBgHx8fiKCgoR7hoiBin1%2BjYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z%2BTE5NCkEAIfkEBQAAIgAsVAAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9%2Br6cfAYCBgHx8fiKCgoR7hoiBin1%2BjYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z%2BTE5NCkEAIfkEBQAAIgAsXgAEABwADgAABnxATGhIxIiOyORRcWg6Gg3KZkqdKq%2BigXZweDYy4DAYqzQsztynZs1ek5OFuDnNqdvrbyRhXzA3PYCBgHlHAHsEBQtcgoKEIgCGiIoHjIGOkHyTlYOEkZJcd3eOh30LTW1tjnGlaWJijmZoXQ1VVY5baVBCRENGhExOUBRBACH5BAUAACIALAQABAB6AA4AAAavQEqj4TgYFaKkcslsOp%2FQqHRKFWFC2Cxm%2BjgMi4PwoEoum8%2FTjXqtnk684IXcgK7b79GMfq93H%2BIGBYJ4hIV1GoiJiH5GC4EEkIaSk1IclpeWjAMLBZAEAJShokkepaalmpyQAKCjroanp6mdn62vt3axprOetri%2FZbqoUhUWjY%2BRwMpVmJh%2BgIIFy9NSiop%2BRAebc9TdTnx82NliY97mSWxsfkLZR%2BfnV1lYW1JdQQA7';	

//
// getPageScroll()
// Returns array with x,y page scroll values.
// Core code from - quirksmode.org
//
function getPageScroll(){

	var yScroll;

	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
	}

	arrayPageScroll = new Array('',yScroll) 
	return arrayPageScroll;
}

//
// getPageSize()
// Returns array with page width, height and window width, height
// Core code from - quirksmode.org
// Edit for Firefox by pHaez
//
function getPageSize(){
	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}


	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}

//
// pause(numberMillis)
// Pauses code execution for specified time. Uses busy code, not good.
// Code from http://www.faqts.com/knowledge_base/view.phtml/aid/1602
//
function pause(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}


//
// showLightbox()
// Preloads images. Pleaces new image in lightbox then centers and displays.
//
function showLightbox(img)
{
	// prep objects
	var objOverlay = document.getElementById('imtt_overlay');
	var objLightbox = document.getElementById('imtt_lightbox');
	var objImage = document.getElementById('imtt_lightboxImage');
	var objLoadingImage = document.getElementById('imtt_loadingImage');
	
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();
	// center loadingImage if it exists
	if (objLoadingImage) {
		objLoadingImage.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - 35 - objLoadingImage.height) / 2) + 'px');
		objLoadingImage.style.left = (((arrayPageSize[0] - 40 - objLoadingImage.width) / 2) + 'px');
	}

	// set height of Overlay to take up whole page and show
	objOverlay.style.height = (arrayPageSize[1] + 'px');
	objOverlay.style.display = 'block';
	// preload image
	var imgPreload = document.createElement("img");
	imgPreload.setAttribute('id','imtt_ImagePreload');
	imgPreload.addEventListener('load', function(){
		objImage.src = img;
		var ratio = imgPreload.height / imgPreload.width;
		
		objImage.height = imgPreload.height;
		objImage.width = imgPreload.width;
		if (objImage.height > arrayPageSize[3] - 35 - 10) {
			objImage.height = arrayPageSize[3] - 35 - 10;
			objImage.width = objImage.height / ratio;
		}
		if (objImage.width > arrayPageSize[2] - 40 - 10) {
			objImage.width = arrayPageSize[2] - 40 - 10;
			objImage.height = objImage.width * ratio;
		}
		
		// center lightbox and make sure that the top and left values are not negative
		// and the image placed outside the viewport
		var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - objImage.height) / 2);
		var lightboxLeft = ((arrayPageSize[0] - 40 - objImage.width) / 2);
		objLightbox.style.top = (lightboxTop < 0) ? "0px" : lightboxTop + "px";
		objLightbox.style.left = (lightboxLeft < 0) ? "0px" : lightboxLeft + "px";

		objLightbox.style.display = 'block';
		
		return false;
	}, false);
	imgPreload.addEventListener('error', function(){
		hideLightbox();
		return false;
	}, false);
	
	

	imgPreload.src = img;
	
}

//
// hideLightbox()
//
function hideLightbox(event)
{
	if (event) {
	  event.stopPropagation();
	  event.preventDefault();
	}
	// get objects
	objOverlay = document.getElementById('imtt_overlay');
	objLightbox = document.getElementById('imtt_lightbox');
	imgPreload = document.getElementById('imtt_ImagePreload');
	

	// hide lightbox and overlay
	objOverlay.style.display = 'none';
	objLightbox.style.display = 'none';
	delete imgPreload;
}


//
// initLightbox()
// Function runs on window load, going through link tags looking for rel="lightbox".
// These links receive onclick events that enable the lightbox display for their targets.
// The function also inserts html markup at the top of the page which will be used as a
// container for the overlay pattern and the inline image.
//
function imtt_initLightbox()
{
	var objBody = document.getElementsByTagName("body").item(0);	
	// create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
	var objOverlay = document.createElement("div");
	objOverlay.setAttribute('id','imtt_overlay');
	objOverlay.style.display = 'none';
	objOverlay.style.position = 'absolute';
	objOverlay.style.top = '0';
	objOverlay.style.left = '0';
	objOverlay.style.zIndex = '90';
 	objOverlay.style.width = '100%';
 	objOverlay.style.backgroundColor='#000000';
	objOverlay.style.opacity='.8';
 	objOverlay.setAttribute('href','#');
	objOverlay.addEventListener('click', hideLightbox, false);
		
	objBody.insertBefore(objOverlay, objBody.firstChild);
	
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();

	//loading image
	var objLoadingImageLink = document.createElement("a");
	objLoadingImageLink.setAttribute('href','#');
	objLoadingImageLink.addEventListener('click', hideLightbox, false);
	objOverlay.appendChild(objLoadingImageLink);
	var objLoadingImage = document.createElement("img");
	objLoadingImage.src = loadingImage;
	objLoadingImage.setAttribute('id','imtt_loadingImage');
	objLoadingImage.style.position = 'absolute';
	objLoadingImage.style.border = 'none';
	objLoadingImage.style.zIndex = '150';
	objLoadingImageLink.appendChild(objLoadingImage);
	
	// create lightbox div, same note about styles as above
	var objLightbox = document.createElement("div");
	objLightbox.setAttribute('id','imtt_lightbox');
	objLightbox.style.display = 'none';
	objLightbox.style.position = 'absolute';
	objLightbox.style.zIndex = '100';
	objBody.insertBefore(objLightbox, objOverlay.nextSibling);
	
	// create link
	var objLink = document.createElement("a");
	objLink.setAttribute('href','#');
	objLink.setAttribute('title','Click to close');
	objLink.addEventListener('click', hideLightbox, false);
	
	objLightbox.appendChild(objLink);
	
	// create image
	var objImage = document.createElement("img");
	objImage.setAttribute('id','imtt_lightboxImage');
	objImage.style.border = '2px solid #666';
	objLink.appendChild(objImage);
	
}

