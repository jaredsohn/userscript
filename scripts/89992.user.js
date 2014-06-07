// ==UserScript==
// @name           Storm Thinber
// @namespace      shaldengeki
// @description    Attempting the impossible: making Storm Chamber look normal.
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// @include        http://archives.endoftheinter.net/showmessages.php*
// ==/UserScript==

function normalizeImages() {
	var posts=document.getElementsByClassName('message-top');
	for (var i=0; i<posts.length; i++) {
		if (posts[i].innerHTML.indexOf('<b>From:</b> <a href="//endoftheinter.net/profile.php?user=5545">Storm Chamber</a>') != -1) {
			var imageDivs = posts[i].nextSibling.getElementsByClassName("img-loaded");
			for (var j = 0; j < imageDivs.length; j++) {			
				var inimages = imageDivs[j].getElementsByTagName("img");
				for (var k = 0; k < inimages.length; k++) {
					if (inimages[k].className != "resizedImageGM") {
						inimages[k].className = "resizedImageGM";
						inimages[k].width /= 2;
						imageDivs[j].setAttribute('style', 'width: '+inimages[k].width);
					}
				}
			}
		}
	}
}

var repeated = setInterval(normalizeImages, 250);

document.addEventListener('scroll', normalizeImages, true);