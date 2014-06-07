// ==UserScript==
// @name           MeFi preview
// @namespace      http://www.metafilter.com/username/Tobu
// @description    Display Flickr images and oEmbed-compatible content without leaving MetaFilter
// @include        http://www.metafilter.com/*
// @include        http://ask.metafilter.com/*
// @include        http://projects.metafilter.com/*
// @include        http://metatalk.metafilter.com/*
// ==/UserScript==

// Inject jQuery and oEmbed support
// We can't use @require, because jquery.oembed doesn't see the jQuery var.
// Too bad, because @require saves the resources to disk at install.
// Consider making the request async?
function inject(src) {
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.setAttribute('src', src);
	document.documentElement.appendChild(script);
	document.documentElement.removeChild(script);
}
inject('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
// XXX might become incompatible, renamed, served slowly…
inject('http://jquery-oembed.googlecode.com/svn/trunk/jquery.oembed.min.js');

function preview() {
	// noConflict(true) makes us entirely invisible to the window namespace
	window.jQuery.noConflict(true)(document).ready(function($) {
			// Disjunction of filters on href prefix
			var selector = $.map([
					'www.flickr.com',
					'twitter.com',
					'vimeo.com',
					'www.youtube.com',
				],
				function (hostname) {
					return "a[href^='http://" + hostname + "/']";
				}
				).join(', ');
			// Bloats the page. Use a lightbox? Make oembed request on demand?
			$(selector).oembed(null, { embedMethod: 'append'});
	});
}

// http://wiki.greasespot.net/Content_Script_Injection
function contentEval(fn) {
	// Convert function to source code of no-arg anon call
	source = '(' + fn.toString() + ')();'

	// Create a script node holding this source code
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = source;

	// Run and clean up
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(preview);

