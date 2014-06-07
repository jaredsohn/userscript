// ==UserScript==
// @name          Radium is incompetent. Also GA owns
// @namespace     GentlyAutistic
// @version       0.0001-dev-RMS
// @description   Makes quoted images display fullsize on click on ~the forums~
// @include       [url]http://forums.somethingawful.com/*[/url]
// ==/UserScript==


function toggleTimg(e) {
	var old_width = this.getAttribute('old_width');
	if ( old_width !== null ) {
		this.setAttribute('width', old_width);
		this.removeAttribute('old_width');
	} else {
		this.setAttribute('old_width', this.getAttribute('width'));
		this.removeAttribute('width');
	}
}

// Supported in Chrome, welcome to the future
var quoteImages = document.getElementsByClassName('timg');

for (var i=0;i<quoteImages.length;i++) {
	quoteImages[i].onclick = toggleTimg;
	quoteImages[i].style.border = '2px solid #2D9F09';
}
