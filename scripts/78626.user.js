// Flickr Large Image + Keyboard shortcuts
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr Large Image + Keyboard shortcuts", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           	Flickr Large Image + Keyboard shortcuts
// @namespace      	http://premii.com
// @creator       	Dharmesh Patel
// @description    	Change regular image to large or orignial whenever possible
// @include			http://flickr.com/photos/*
// @include			http://www.flickr.com/photos/*
// ==/UserScript==

// ==Features==
//  * Replace regular page image with large or original image
//  * Add shadow to the main image
//  * View on black without leaving flickr site.
//  * New keyboard shortcuts  
//  ***   Left Arrow - previous image
//  ***   Right Arrow - next image
//  ***   Shift + left/right arrow - toggle large/orignal image on black background
//  ***   Esc - If on view on black mode - Back to Flickr page.
//  ***       - If on flickr page - go to current set page.
// ==Features==

// ==Changelog==
// 2010-06-16  0.2:
//  * Resizing page before image loads, (less jumpy)
//  * Added link for "view on black"
//	* Updated "Esc" Keyboard shortcut - pressing "esc" in "view on black" mode will go back to flickr page.
//
// 2010-05-30  0.1:
//  * Replace regular page image with large or original image
//  * Add shadow to the main image
//  * New keyboard shortcuts  
//  *   Left Arrow - previous image
//  *   Right Arrow - next image
//  *   Shift + left/right arrow - toggle large/orignal image on black background
//  *   Esc - go to current set page.
// ==/Changelog==

var premii = {};
function premiifn(e){  premii.f()};
function addGlobalStyle(css, media) {
   var head, style;
   head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
   style = document.createElement('style');
   style.type = 'text/css';
	if(media){
		style.media = media;
	}
   style.innerHTML = css;
   head.appendChild(style);
}

premii.flickr = function() {
	addGlobalStyle( [
		'.photoImgDiv img, .pc_img {width: auto !important;height: auto !important;-moz-box-shadow: 0 0 6px rgba(0,0,0,0.953);}',
		'.StreamView .pc_img {border: 4px solid #fff!important;-moz-box-shadow: 0 0 8px rgba(0,0,0,0.3653);}',
		'.photoImgDiv {width: auto !important;}',
		'#Main {max-width: 1320px;margin: 0 10%;}',
		'#photoswftd h1{width:1075px;!important}',
		'.ContextTop {clear: both;}',
		'.blackbg .photoImgDiv {position: absolute!important; top: 0px;left: 0;right: 0;bottom: -5px;background: #111;z-index: 10000!important;text-align: center;}',
		'.blackbg .photoImgDiv img {border: 1px solid #000!important;}',
		'.view-on-black{-moz-border-radius:5px 5px 5px 5px; -moz-box-shadow:0 0 5px #000000; background:none repeat scroll 0 0 #111111; color:#DDEEFF; cursor:pointer; font-family:trebuchet MS; font-size:15px; letter-spacing:2px; margin:0px 0 10px; padding:7px; text-align:center; text-shadow:0 0 3px #FFFFFF;}',
		' '
	].join('\n'));

	var photoContainer = document.getElementsByClassName("photoImgDiv")[0];
	if (!photoContainer) { 
		return;
	}
	var	image = photoContainer.getElementsByTagName("img")[0],
		imgSrc = image.src,
		largeSrc = imgSrc.replace(".jpg", "_b.jpg"),
		origSrc = imgSrc.replace(".jpg", "_o.jpg"),
		count = 1,
		newImage;
	
	//document.getElementById('photoswftd').width = '1075';
		
	//	return;
	//image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
	premii.flickrImg = image;
	premii.flickrImg.scrollIntoView();
	
	var onComplete = function ( newImg ) {
		if (newImg.height == 375 || newImg.height == 0) {
			if (count == 1) {
				loadImage(origSrc);
			} 
			else if (count == 2) {
			//	loadImage(imgSrc);
			}
			count = 2;
		}
		else {
			image.src = newImg.src;	
			document.getElementById("Main").style.width  = '90%';
			photoContainer.style.width = 'auto' ;
			document.getElementById('photoswftd').width = '';
			image.removeAttribute('width');
			image.removeAttribute('height');
		}
		premii.flickrImg = image;
		premii.flickrImg.scrollIntoView();
		
	};
	var loadImage = function( src ) {
		newImage = null;
		newImage = new Image();
		newImage.src = src;
		newImage.addEventListener ('load', premiifn, false);
	};
	var imageOnLoad = function(){
		onComplete(newImage);
	};
	
	loadImage(largeSrc);
	
	return imageOnLoad;
};

premii.keyPressed = function (key)
{
	if ( key['altKey'] ) {
		return;
	}

	var unicode= key.keyCode || key.charCode,
		//left arrow
		prevKeys = {
			"37" : true
		},
		//right arrow
		nextKeys = {
			"39" : true
		},
		//esc
		homeKeys = {
			"27" : true
		},
		thumbsCont = document.getElementsByClassName('nextprev_thumb'),
		isShift = key.shiftKey;
	
	if ( homeKeys[unicode] ) {
		if ( document.body.className.indexOf("blackbg") != -1 ) {
			premii.toggleViewOnBlack();
		}
		else {
			var link = document.getElementsByClassName('currentContextLink');
			if (link) {
				link = link[0];
				key.preventDefault();
				location.href = link.href;
			}
		}
	}
	if (!isShift && thumbsCont) {
		var links = thumbsCont,
			url = prevKeys[unicode] ? links[0].parentNode : ( nextKeys[unicode] ? links[1].parentNode : null );
		
		if (url && url.href) {
			key.preventDefault();
			this.location.href = url.href;
		}
	}
	
	if (isShift && (nextKeys[unicode] || prevKeys[unicode])) {
		if (typeof(premii.bodyClassNames) == "undefined") {
			premii.bodyClassNames = document.body.className || "";
		}
		document.body.className = premii.bodyClassNames + (document.body.className.indexOf("blackbg") == -1 ? " blackbg" : ""); 
		premii.flickrImg.scrollIntoView();		
	}
}
premii.initViewOnBlack = function() {

	document.getElementsByClassName('photoImgDiv')[0].addEventListener('click', function() {
		if (document.body.className.indexOf("blackbg") != -1) {
			premii.toggleViewOnBlack();
		}
	}, false);
	
	var adCont = document.getElementsByClassName('Widget');
	if (adCont) {
		adCont = adCont[0].nextElementSibling;
		console.log(adCont);
		var black = document.createElement('div');
		black.className = 'view-on-black';
		black.innerHTML = 'View On Black';
		black.addEventListener('click', premii.toggleViewOnBlack, false);
		adCont.parentNode.insertBefore(black, adCont);
	}
};
premii.toggleViewOnBlack = function() {
	document.body.className = premii.bodyClassNames + (document.body.className.indexOf("blackbg") == -1 ? " blackbg" : ""); 
	premii.flickrImg.scrollIntoView();		
};

premii.onLoad = function(){
	premii.f = premii.flickr();
	document.addEventListener ('keypress', premii.keyPressed, false);
	premii.initViewOnBlack();
	
}()
//setTimeout(premii.onLoad, 1);
