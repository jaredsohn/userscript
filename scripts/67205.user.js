// ==UserScript==
// @name			Linked Image Viewer PLUS
// @description		Display linked images on ctrl+hover. View full linked images by hovering over the link while holding CTRL.
// @include			*
// @namespace		http://www.orange-byte-design.com
// ==/UserScript==

//========== CHANGING THE MODIFIER KEY ========//
// The decision to use CTRL as the modifier is because if you were to click while viewing an image
// CTRL+CLICK = open like new tab in most browsers. 
// Where SHIFT + CLICK = open in new window. 
//
// You can change the modifier to any key by changing the modifierKey value below
//	shift = 16
//	
//	You can find a list of keycodes here:
//  http://www.cambiaresearch.com/c4/702b8cd1-e5b0-42e6-83ac-25f0306e3e25/Javascript-Char-Codes-Key-Codes.aspx
//=============================================//

//================ NOTES ======================//
// If image is larger than the browser it will be reduced to 100% of browser size it's larger than.
// Clicking generated image will act as clicking on thumbnail or link. 
// So if the site uses a lightbox or anything similar it should open in that.
//=============================================//

//================ UPDATE CHANGES =============//
// - updates changed variable typo that broke functionality from last update.
// - removed redundant code
// - fixed some sites always displaying larger images
// - changed class names to reduce chance of naming conflicts
// - fixed errors in last updated version caused by stupidity and oversight
//============================================//



// Default 17 "CTRL"
var modifierKey = 17;


var imageStyle = document.createElement('style');
imageStyle.setAttribute('type','text/css');
var css = 'img.OBD_viewImage { z-index:1000; display: none; position: fixed; left: 0; top: 0; max-width: 100%; max-height: 100%; margin: 0; border: 0;}';
css += 'img.OBD_hideImage {display: none;}';
css += 'a.OBD_hoverLink:hover img.OBD_viewImage {display: block;}'
css += 'a.OBD_hoverLink:hover img.OBD_hideImage {display: none;}'
imageStyle.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(imageStyle);

var modifierDown = false;
var largeImages = [];
var images = document.getElementsByTagName('a');
for (i=0; i<images.length; i++) {
	if (images[i].href.match(/\.(jpg|jpeg|gif|png)$/)) {
		var imageHover = document.createElement('img');
		imageHover.setAttribute('src',images[i].href);
		imageHover.setAttribute('class','OBD_hideImage');
		largeImages.push(imageHover);
		images[i].appendChild(imageHover);
		images[i].setAttribute('class','OBD_hoverLink')
		//document.body.appendChild(imageHover);
	}
}

function keyDOWN(e)
{
	if(e.keyCode==modifierKey)
	{
		modifierDown = true;
		showImage()
	}else{
		modifierDown = false;
		hideImage()
	}	
}

function keyUP(e)
{
	hideImage()
	modifierDown = false;	
}

window.addEventListener('keydown', keyDOWN, true);
window.addEventListener('keyup', keyUP, true);

function  showImage(){
	for (i=0; i<largeImages.length; i++) {
		largeImages[i].setAttribute('class','OBD_viewImage')
	}
}

function  hideImage(){	
	for (i=0; i<largeImages.length; i++) {
		largeImages[i].setAttribute('class','OBD_hideImage')
	}
}