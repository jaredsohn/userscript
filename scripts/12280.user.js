// ==UserScript==
// @name           RPM Backgoogle!
// @namespace 	http://www.expansivestudios.com
// @description   	It changes the white background of google by an image.
// @include        http://*google.com/
// ==/UserScript==

// By: RPM - rpm@hackerss.com
// RPM Backgoogle!
// It changes the white background of google by an image.
// You can change the following image:
// http://www.youimg.net/uploads/c0449b337e.jpg

(function() {
	// It puts the image
    document.body.style.backgroundImage='url(http://www.youimg.net/uploads/d55a58885b.jpg)';
	//It does not repeat it
	document.body.style.backgroundRepeat='no-repeat';
	//Position
	document.body.style.backgroundPosition='top left';
	//Extra
	document.linkColor = '#000000';
	document.alinkColor = '#ffffff';
	document.vlinkColor = '#666666';
})();