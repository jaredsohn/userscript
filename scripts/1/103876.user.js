// ==UserScript==
// @name           imagebam imageonly
// @description    Remove the bloat of imagebam, show only the image.
// @include        http://www.imagebam.com/image/*
// ==/UserScript==
//
//
imgs = document.getElementsByTagName('img');
for (var i =  0; i < imgs.length;i++) {
	if (imgs[i].alt == "loading")
		document.body.innerHTML = '<img src="' + imgs[i].src + '" />';
        //window.location = imgs[i].src;
}
