// ==UserScript==
// @name           Gallery.Thumb.Replace
// @namespaces     oliveJar
// @include        http://*/thumbnails.php*
// @include        http://*/imageFolio.cgi*
// @include        http://www.flickr.com/*
// @include        http://egotastic.com/*
// @include        http://www.egotastic.com/*
// @version        0.0.6a
// ==/UserScript==

function fWindex() {
	var u = window.location.href;

	if (u.indexOf('thumbnails.php') > -1) {
		var a = u.indexOf('album=');
		var album = u.substring(a+6,a+7);
		try {
			var number = album * 1;
			if (number == album * 1) { ThumbChopper('thumb_',''); };
		} catch(err) {

		}
	}
	if (u.indexOf('imageFolio.cgi') > -1) {
		ThumbChopper('tn_','');
	}
	if (u.indexOf('www.flickr.com') > -1) {
		FlickrLinkSwapper();
	}
	if (u.indexOf('egotastic.com') > -1) {
		ThumbChopper('thumbs','pictures');
	}
	
}

window.addEventListener("load", fWindex, false);

function ThumbChopper(pattern,replacement)
{
	var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
		try {
			var l = imgs[i].parentNode;
			l.href = imgs[i].src.replace(pattern, replacement);
			
		} catch(err) {

		}
    }
}

function FlickrLinkSwapper()
{
	var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
		try {
			var l = imgs[i].parentNode;
			if (imgs[i].className == 'pc_img' || l.className == 'image_link') {
				l.href = l.href.replace('/in/set', '/sizes/o/in/set');
			}
		} catch(err) {

		}
    }
}