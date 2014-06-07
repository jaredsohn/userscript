// ==UserScript==
// @name          phpBB image resizer
// @namespace     http://www.grauw.nl/projects/pc/greasemonkey/
// @description   Resizes images which exceed the page width in phpBB forums.
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

var phpBB = false;
var aA = document.getElementsByTagName('a');
for (i=0; i<aA.length; i++) {
	if (aA[i].href == 'http://www.phpbb.com/' && aA[i].target == '_phpbb') phpBB = true;
}

if (phpBB) {
	var aSpan = document.getElementsByTagName('span');
	for (i=0; i<aSpan.length; i++) {
		if (aSpan[i].className == 'postbody') {
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