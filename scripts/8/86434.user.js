// ==UserScript==
// @name          Flickr Tag Lineariser
// @namespace     http://github.com/jufemaiz/jmc_flickr_gm_flickr-tag_lineariser
// @description   Changes back the tags to a linear arrangement with option to hide the hover element.
// @include       http://*flickr.com*
//
// ==/UserScript==
//

// Options - use either true or false.
var options = {
	lineariseTags : true,
	hideHoverMessage : false
};

var cssElements = {
	lineariseTags : 'body #thetags .tag-element, body #thetags li {float: none; display: block !important; clear:both;}',
	hideHoverMessage : 'body #thetags .tag-element div.tag-global-search, body #thetags .tag-element div.tag-global-search div.bd, body #thetags .tag-element div.tag-global-search div.global-search-message {display: none;}'
};

var	cssNode = document.createElement('style');
	cssNode.type = 'text/css';
	cssNode.media = 'screen';
	for (var key in options) {
		if(options[key])
			cssNode.textContent += cssElements[key];
	}
	document.getElementsByTagName("head")[0].appendChild(cssNode);