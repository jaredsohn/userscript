// ==UserScript==
// @name           Image Expander
// @namespace      http://blog.bcse.info/image-expander
// @description    Expand *.jpg, *.jpeg, *.png and *.gif
// @version        0.3.3
// @include        *
// ==/UserScript==

var imgLinks = document.querySelectorAll("a[href$=jpg]>img:only-child,a[href$=jpeg]>img:only-child,a[href$=png]>img:only-child,a[href$=gif]>img:only-child");
for (var i = 0; i < imgLinks.length; i++) {
	var thisLink = imgLinks[i].parentNode;
	if (thisLink.childNodes.length == 1) { // :only-child pseudo-class does not count text nodes as a child
		var imageUri = thisLink.getAttribute('href');
		(function(imageUri, thisLink){
			var img = document.createElement('img');
			img.addEventListener('load', function(){thisLink.parentNode.replaceChild(img, thisLink)}, false);
			img.setAttribute('src', imageUri);
		})(imageUri, thisLink);
	}
}