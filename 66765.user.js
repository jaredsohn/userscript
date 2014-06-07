// ==UserScript==
// @name           Redirect to the iframed URL
// @namespace      http://wp.serpere.info/
// @description    Extracts and redirects to the source URLs iframed in the URL shorters, such as ow.ly.
// @copyright      2010+, Takayuki Miwa (http://wp.serpere.info)
// @license        The MIT License; http://www.opensource.org/licenses/mit-license.php
// @include        http://ow.ly/*
// @include        http://oneclip.jp/*
// @include        http://am6.jp/*
// @include        http://eeg.jp/*
// @include        http://onc.li/*
// ==/UserScript==
/*
Some URL shorters load original URLs into iframes rather than redirect to them.
This UserScript extracts the iframes and replaces the location to the URLs.
*/

(function(){
    var iframe = getOriginalIframe();
    if(iframe) {
	location.replace(iframe.src);
    }

    function isLargeEnough(elm) {
	var ratio = 0.5;
	var body = document.body;
	return elm.offsetWidth > body.offsetWidth * ratio &&
	    elm.offsetHeight > body.offsetHeight * ratio;
    }

    function getOriginalIframe() {
	var iframes = document.getElementsByTagName('iframe');
	for(var i = 0; i < iframes.length; ++i) {
	    if(isLargeEnough(iframes[i])) {
		return iframes[i];
	    }
	}
	return false;
    }
})();
