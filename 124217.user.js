// ==UserScript==
// @name          Gist to dabblet
// @namespace     gist2dabblet
// @description   Add a dabblet.com link button to any gist with dabblet information
// @version       1.4.1
// @include       https://gist.github.com/*
// @author        Rob Garrison >> http://github.com/Mottie
// @icon          http://mottie.github.io/gist-to-dabblet/images/g2d.png
// ==/UserScript==

var main = function () {
	var dab, b, b2, loc = window.location,
		gist = $('#file-dabblet-css'),
		list = $('.css-truncate-target:contains(dabblet.css)');
	if ( gist.length || list.length ){
		b = '<span style="display:inline-block;width:18px;background:url(http://mottie.github.io/gist-to-dabblet/images/dabblet';
		b2 = ' no-repeat;">&nbsp;</span>&nbsp;dabblet</a></li>';
		if (gist.length) {
			b += '.png) center 2px' + b2; // use black icon
			dab = '<li><a href="http://dabblet.com/gist/' + loc.pathname.match(/\d+$/) + '" class="minibutton dabblet">' + b;
			$('.pagehead-actions').prepend(dab);
		} else {
			b += '-g.png) center top' + b2; // use grey icon
			list.each(function(){
				dab = '<li><a href="' + $(this).parent().attr('href') + '" class="dabblet" title="Open at dabblet.com">' + b;
				$(this).closest('.byline').prev().css('z-index',1).prepend(dab);
			});
			$('.dabblet').tipsy({ gravity: 'n' });
		}
	}
};

// Inject our main script
// Chrome seems to inject the script on all pages, so lets check first
if (/gist\.github\.com/.test(window.location.href)) {
	var script = document.createElement('script');
	script.textContent = '(' + main.toString() + ')();';
	document.body.appendChild(script);
}