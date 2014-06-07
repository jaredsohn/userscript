// ==UserScript==
// @name           Reddit - Overlay Post Images
// @namespace      reddit
// @copyright      2011+, Thomas Schüßler (http://www.idontblog.de)
// @include        http://www.reddit.com/r/*
// ==/UserScript==
//

var $ = unsafeWindow.jQuery;
$('body').append('<div id="vindolin_image_container" style="position:absolute;left:0px;top:0px;display:none;border-radius:10px;z-index:100;background:-moz-linear-gradient(top,rgba(20,15,10,0.95) 100%,rgba(20,15,10,0.95) 100%);color:white !important;box-shadow:3px 3px 5px rgba(0,0,0,0.2);padding:10px;"></div>');
var $image_container = $('#vindolin_image_container');

$('div.md').find('a').each(function(i, link) {
	
	$link = $(link);
	var link_href = $link.attr('href');

	// FTFY imgur user
	if(matches = link_href.match(/http:\/\/imgur\.com\/(\w+)/)) {
		link_href = 'http://i.imgur.com/' + matches[1] + '.jpg';
	}

	if(matches = link_href.match(/(\.gif|\.png|\.jpg)$/)) {

		$link.css('color', 'green');
		$link.mouseenter(function(event) {
			with($image_container) {
				hide();
				css('top', event.pageY + 'px');
				css('left', event.pageX + 'px');
				html('<img src="'+ link_href +'" />');
				fadeIn('fast');
			}
		});

		$link.mouseout(function(event) {
			$image_container.fadeOut('fast');
		});
	}

});

