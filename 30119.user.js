// ==UserScript==
// @name          vBulletin image resizer
// @namespace     http://www.outshine.com/
// @description   Resizes images which exceed the page width in VBulletin forums.
// @include       *
// ==/UserScript==
//
// The images are shown in their original size when you click on them.
//
// Installation notes:
//
// To improve performance, remove the default '*' site inclusion match, and 
// instead explicitly add the forums you want to apply this behaviour to.
//
// The default maximum width of images is optimised for a resolution of 1024x768,
// in combination with the default subSilver PHP theme.
//

maxWidth = 790;		// maximum width of images in pixels

var vB = false;
var dtag = document.getElementsByTagName('div');
for (i=0; i<dtag.length; i++) {
	if (dtag[i].className.indexOf('smallfont') > -1) {
		if (dtag[i].innerHTML.indexOf('Powered by vBulletin') > -1) {
			vB = true;
		}
	}
}
if (vB) {
	var aSpan = document.getElementsByTagName('td');
	for (i=0; i<aSpan.length; i++) {
		if (aSpan[i].className == 'alt1') {
			var aImg = aSpan[i].getElementsByTagName('img');
			for (j=0; j<aImg.length; j++) {
				aImg[j].style.maxWidth = maxWidth + 'px';
				aImg[j].title = 'Click for the original size';
				aImg[j].addEventListener('click', function(event) {
						if (event.currentTarget.style.maxWidth == 'none')
							event.currentTarget.style.maxWidth = maxWidth + 'px';
						else
							event.currentTarget.style.maxWidth = 'none';
					}, false);
			}
		}
	}
}
