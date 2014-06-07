// ==UserScript==
// @name        RetinaImages
// @namespace   http://userscripts.org/users/negaton
// @description Load larger images when possible
// @include     http://*
// @version     1.1
// ==/UserScript==


// Version history:
// 1.0
//   Initial release
// 1.1 (2013-10-02)
//   Works with more image urls (specifically, those with a question mark
//      after the image file name extension)
//   Workaround for bug in Chrome (use document.createElement() instead
//       of new Image())


function replaceImage(oldImage, newImage) {
	newImage.style.width = "" + oldImage.clientWidth + "px";
	newImage.style.height = "" + oldImage.clientHeight + "px";
    newImage.className = oldImage.className;
    newImage.id = oldImage.id;
    newImage.alt = oldImage.alt;
	oldImage.parentNode.replaceChild(newImage, oldImage);
}

function asyncReplaceImage(imgNode, href) {
    var newImage = document.createElement("img");
	newImage.onload = function() {
		if (imgNode.complete || imgNode.width && imgNode.width > 0) {
			replaceImage(imgNode, newImage);
		}
		else {
			imgNode.onload = function() {
				replaceImage(imgNode, newImage);
			}
		}
	}
	newImage.src = href;
}


// Find all a/img with the img node being the only child and the a.href links to an image
var imgs = document.evaluate('//a[count(*) = 1]/img',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var kImgUrlRe = /.*\.(jpg|jpeg|png|gif)(\?.*)?/i;

for (var i = 0; i < imgs.snapshotLength; i++) {
	var img = imgs.snapshotItem(i);
	var a = img.parentNode;
    if (kImgUrlRe.test(a.href)) {
        asyncReplaceImage(img, a.href);
    }
}
