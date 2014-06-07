// ==UserScript==
// @name			GoogleBot
// @description		Replaces the Google-logo, with an picture you could choose.
// @version			0.1
// @include			http://www.google.de/
// ==/UserScript==

function make() {
	alt.src = img_src;
	theImage.parentNode.replaceChild(alt, theImage);	
}

var theImage, w, img_src, alt
theImage = document.getElementById('hplogo');
alt = document.createElement('img');

w = true
while ( w ) {
	w = false;
	img_src = prompt(
				'Type in a picture-url to change the logo!',
				' ... ' );
	window.status = img_src;
	if( img_src != "" && img_src != null && img_src != ' ... ' )
		make()
	else
		w = confirm( "No Picture has been chosen. Again?" );
}
window.status = "";