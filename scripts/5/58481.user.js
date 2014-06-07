// ==UserScript==
// @name           flickr par flickr
// @namespace      http://userscripts.org/users/109643
// @description    Je crois que c'est clair!
// @include        http://*.flickr.com/*
// @include        http://flickr.com/*
// ==/UserScript==


(function() {

	window.addEventListener('load', function(e) {
	 try {
  	 var result = document.getElementById('FlickrLogo');
  	 if (result) {
        result.src = 'http://l.yimg.com/g/images/flickr_logo_gamma.gif.v59899.14';
        result.width = "98";
        result.height = "26";
      }
    } catch(er) {
    }
	}, false);

})();