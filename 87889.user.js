// ==UserScript==
// @name          Flickr and Picasa Thumbnail Enlarger
// @description   Right click and click 'Open image'
// @version        3.0
// @include     *://*.staticflickr.com/*
// @include     *://*.googleusercontent.com/*
// @include     *://*.ggpht.com/*
// @include     *://*.bp.blogspot.com/*
// @include     *://*.blogger.com/*
// @include     *://*.files.wordpress.com/*
// @include     *://*.ak.fbcdn.net/*
// @include     *://*.myspacecdn.com/*
// @include     *://*.pics.livejournal.com/*
// @include     *://*.photobucket.com/*
// @include     *://*.cloudfront.net/*
// @include     *://*.instagram.com/*
// @include     *://*.amazonaws.com/*
// @include     *://*.twimg.com/*
// @include     *://*.ytimg.com/*
// @include     *://*.youtube.com/*
// @include     *://*.yelpcdn.com/*
// @include     *://content.foto.mail.ru/*
// @include     *://*.content.foto.mail.ru/*
// @include     *://img.pics.livedoor.com/*
// ==/UserScript==

var url = (
	location.href
		// Flickr
		.replace(/^(http[^/]+\/\/farm1\.staticflickr\.com\/[^/]+\/[^/]+\_)m(\.[^/]+)$/i,"$1o$2")
		.replace(/^(http[^/]+\/\/farm1\.staticflickr\.com\/[^/]+\/[^/]+\_)t(\.[^/]+)$/i,"$1o$2")
		.replace(/^(http[^/]+\/\/farm1\.staticflickr\.com\/[^/]+\/[^/]+\_)s(\.[^/]+)$/i,"$1o$2")
		.replace(/^(http[^/]+\/\/[^/]+\.staticflickr\.com\/[^/]+\/[^/]+\_)m(\.[^/]+)$/i,"$1b$2")
		.replace(/^(http[^/]+\/\/[^/]+\.staticflickr\.com\/[^/]+\/[^/]+\_)t(\.[^/]+)$/i,"$1b$2")
		.replace(/^(http[^/]+\/\/[^/]+\.staticflickr\.com\/[^/]+\/[^/]+\_)s(\.[^/]+)$/i,"$1b$2")

		// Picasa
		.replace(/^(http[^/]+\/\/lh[^/]+\.googleusercontent\.com\/(?:[^/]+\/){4})[^/]+\/([^/]+)$/i,"$1s0/$2")
		.replace(/^(http[^/]+\/\/lh[^/]+\.ggpht\.com\/(?:[^/]+\/){4})[^/]+\/([^/]+)$/i,"$1s0/$2")

		// Blogger
		.replace(/^(http[^/]+\/\/[^/]+\.bp\.blogspot\.com\/(?:[^/]+\/){4})[^/]+\/([^/]+)$/i,"$1s0/$2")
		.replace(/^(http[^/]+\/\/[^/]+\.blogger\.com\/(?:[^/]+\/){4})[^/]+\/([^/]+)$/i,"$1s0/$2")

		// WordPress
		.replace(/^(http[^/]+\/\/[^/]+\.files\.wordpress\.com\/([^/]+\/){2}[^/]+)\?w=[^/]+$/i,"$1")

		// Facebook
		.replace(/^(http[^/]+\/\/[^/]+\.ak\.fbcdn\.net\/([^/]+\/){1}[^/]+\_)[^/]+\.jpg$/i,"$1n.jpg")
		.replace(/^(http[^/]+\/\/[^/]+\.ak\.fbcdn\.net\/([^/]+\/){2}[^/]+\_)[^/]+\.jpg$/i,"$1n.jpg")
		.replace(/^(http[^/]+\/\/[^/]+\.ak\.fbcdn\.net\/([^/]+\/){3}[^/]+\_)[^/]+\.jpg$/i,"$1n.jpg")

		// Myspace
		.replace(/^(http[^/]+\/\/[^/]+\.myspacecdn\.com\/([^/]+\/){3})([^/]+\.jpg)$/i,"$1l.jpg")

		// LiveJournal
		.replace(/^(http[^/]+\/\/[^/]+\.pics\.livejournal\.com\/([^/]+\/){3})([^/]+\.jpg)$/i,"$1original.jpg")

		// Photobucket
		.replace(/^(http[^/]+\/\/[^/]+\.photobucket\.com\/([^/]+\/){3})th_([^/]+\.[^/]+)$/i,"$1$3")

		// DailyBooth
		.replace(/^(http[^/]+\/\/[^/]+\.cloudfront\.net\/[^/]+\/pictures+\/)[^/]+\/([^/]+)$/i,"$1original/$2")

		// Instagram
		.replace(/^(http[^/]+\/\/distilleryimage[^/]+\.instagram\.com\/[^/]+\_)[^/]+(\.[^/]+)$/i,"$17$2")
		.replace(/^(http[^/]+\/\/distilleryimage[^/]+\.amazonaws\.com\/[^/]+\_)[^/]+(\.[^/]+)$/i,"$17$2")

		// Twitter
		.replace(/^(http[^/]+\/\/[^/]+\.twimg\.com\/[^/]+\/[^/]+\/[^/]+)_normal+$/i,"$1")
		.replace(/^(http[^/]+\/\/[^/]+\.twimg\.com\/[^/]+\/[^/]+\/[^/]+)_normal+(\.[^/]+)$/i,"$1$2")
		.replace(/^(http[^/]+\/\/[^/]+\.twimg\.com\/[^/]+\/[^/]+\/[^/]+)_reasonably_small+/i,"$1")
		.replace(/^(http[^/]+\/\/[^/]+\.twimg\.com\/[^/]+\/[^/]+\/[^/]+)_reasonably_small+(\.[^/]+)$/i,"$1$2")
		.replace(/^(http[^/]+\/\/[^/]+\.twimg\.com\/[^/]+):thumb+$/i,"$1")

		// Youtube
		.replace(/^(http[^/]+\/\/[^/]+\.ytimg\.com\/vi\/[^/]+\/)([^/]+\.jpg)$/i,"$1hqdefault.jpg")
		.replace(/^(http[^/]+\/\/[^/]+\.youtube\.com\/vi\/[^/]+\/)([^/]+\.jpg)$/i,"$1hqdefault.jpg")

		// Yelp
		.replace(/^(http[^/]+\/\/[^/]+\.yelpcdn\.com\/([^/]+\/){2})([^/]+\.jpg)$/i,"$1o.jpg")

		// * International *
		.replace(/^(http[^/]+\/\/[^/]+\.foto\.mail\.ru\/([^/]+\/){3})p(-[^/]+\.[^/]+)$/i,"$1i$3")
		.replace(/^(http[^/]+\/\/img\.pics\.livedoor\.com\/([^/]+\/){3}[^/]+\-)([^/]+\.jpg)$/i,"$11024.jpg")
	);
if(url !== location.href){
	location.replace(url);
}


(function() {
	var kil = document.createElement('style'); 
	kil.setAttribute('type','text/css'); 
	kil.appendChild(document.createTextNode('.spaceout {display:none !important;} .facade-of-protection {display:none !important;}'));
	kil.appendChild(document.createTextNode('.spaceball {display:none !important;} .facade-of-protection {display:none !important;}'));
	// kil.appendChild(document.createTextNode('.zoom-trigger {display:none !important;} .facade-of-protection {display:none !important;}'));
	document.body.insertBefore(kil, document.body.firstChild); 
})();