// ==UserScript==
// @name       Impressionist Slideshow
// @namespace  http://www.reddit.com/u/pocams/
// @version    0.1
// @description  Turns mattdesl's impressionist app demo into a picture slideshow
// @match      http://mattdesl.github.io/impressionist/app/
// @copyright  http://creativecommons.org/publicdomain/zero/1.0/
// @require    http://code.jquery.com/jquery-1.11.0.min.js

// Images to use - as many as you want
// @resource   image01 http://mattdesl.github.io/impressionist/app/img/skyline2.png
// @resource   image02 http://i.imgur.com/QD6fe.jpg
// @resource   image03 http://i.imgur.com/x8jfl.jpg
// ==/UserScript==

secondsPerImage = 300

settings = {
    'grain': '0.25'
}



function setUiValue(key, value) {
	$('span.property-name:contains("' + key + '")').parent().find(':text').focus().val(value).blur();
}

function loadImage(imageUrl) {
	width = $(window).width();
	height = $(window).height();

    $('img.overlay').attr('src', imageUrl).width(width).height(height);
    $('canvas').width(width).height(height);
    $('div.noise').width(width).height(height);
}

function nextImage() {
    if (++imageIndex >= images.length) { imageIndex = 0; }
    
    loadImage(GM_getResourceURL(images[imageIndex].name));

    unsafeWindow.setTimeout(nextImage, secondsPerImage * 1000);
}

$.each(settings, function (k, v) { setUiValue(k, v) });

$('#text').hide();
$('div.dg.ac').hide();

images = GM_info.script.resources
imageIndex = -1;
nextImage();
