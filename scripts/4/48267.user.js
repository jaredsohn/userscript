// ==UserScript==
// @name           YouTube cycling thumbnails
// @namespace      Gracenotes
// @author         Gracenotes
// @description    Enable YouTube thumbnail preview for more pages
// @include        http://*.youtube.com/*
// ==/UserScript==

//Included everywhere in the YouTube domain, just to keep things simple. Otherwise there would be a dozen URLs.
//It is known there are some places this won't work, like /my_subscriptions

window.addEventListener("load", function() {
    var scriptElem = document.createElement("script");
    scriptElem.setAttribute("src", "http://s.ytimg.com/yt/js/thumbnail_preview.js");
    scriptElem.setAttribute("type", "text/javascript"); //to be safe
	document.getElementsByTagName("head")[0].appendChild(scriptElem);

    /**
      * The following is exercepted from the source of http://www.youtube.com/browse. These changes have been made:
      *     1. YouTube's addListener wrapper has been replaced with the DOM-compliant addEventListener
      *     2. unsafeWindow is required to access thumbnailPreview
      * If YouTube changes their code, this'll need to be changed too.
      */
    // START EXERCPT
	var images = document.getElementsByTagName('img');
	for (var x = 0; x < images.length; ++x) {
		if (images[x].src.indexOf('default.jpg') != -1 ||
					(images[x].getAttribute('thumb') && images[x].getAttribute('thumb').indexOf('default.jpg') != -1) ||
					(images[x].getAttribute('onload') && images[x].getAttribute('onload').toString().indexOf('delayLoad') != -1 && images[x].getAttribute('onload').toString().indexOf('default.jpg') != -1)) {
			images[x].parentNode.addEventListener("mouseover", function(e) { unsafeWindow.thumbnailPreview.startThumbnailPreview(e, this); }, true);
		}
	}
    document.addEventListener("mouseover",  function(e) { unsafeWindow.thumbnailPreview.stopThumbnailPreview(e, this); }, true);
    //END EXERCPT
}, true);