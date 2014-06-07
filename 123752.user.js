// ==UserScript==
// @name Inline Thumbnail for GooglePlus
// @namespace inline_thumbnail_for_gplus
// @description Miniaturization of thumbnails.
// @run-at document-end
// @include https://plus.google.com/*
// @version 0.0.9
// ==/UserScript==

(function() {
function source() { // source code

function main() { // main logic

function $E(tagName, attributes) {
	var e = $(document.createElement(tagName));
	attributes && e.attr(attributes);
	return e;
}
function unique(array, prop) {
	if (array == null) {
		return null;
	}
	var uniqueSet = {};
	return $.grep(array, function(value) {
		var key = value[prop];
		var result = !(key in uniqueSet);
		if (result) {
			uniqueSet[key] = true;
		}
		return result;
	});
}

function createThumbnailElement(urlEntries) {
	var ul = $E('ul', { 'class':'ithumb-gp-ul' });
	for (var i = 0; i < urlEntries.length; i++) {
		var urlEntry = urlEntries[i];
		ul.append(
			$E('li', { 'class':'ithumb-gp-li' }).append(
				$E('a', { 'class':'ithumb-gp-a', 'target':'_blank', 'href':urlEntry.url }).append(
					$E('img', { 'src':urlEntry.thumbUrl, 'class':'ithumb-gp-img' })
				)
			)
		);
	}
	return $E('div', { 'class':'ithumb-gp-container' }).append(ul);
}

function applyElements(context) {
	$('.Ry:not([ithumb-gp])', context)												// change
		.each(function() {
			var gThumb = $(this).attr('ithumb-gp','ithumb-gp');
			var gLink = gThumb.find('.Mn, .ot-anchor:not(.a-n)');	// change
			if (gLink.length == 0) {
				return;
			}
			if (gThumb.parents('div[guidedhelpid="sharebox"]').length > 0) {
				return;
			}
			var urlEntries = gLink.map(function() {
				var elem = $(this);
				var img = elem.find('img:first');
				if (img.length == 0) {
					img = gThumb.find('img:first');
				}
				return img.length == 0 ?
								null : { url: elem.attr('href'), thumbUrl: img.attr('src') };
			});
			urlEntries = unique(urlEntries, 'thumbUrl');
			if (urlEntries.length != 0) {
				gThumb.addClass('ithumb-gp-close').children(':first').before($E('div', {'class': 'ithumb-gp-layer'}));
				gThumb.before(createThumbnailElement(urlEntries));
			}
		})
		.filter('.ithumb-gp-close')
		.one('click', function(event) {
			var elem = $(this);
			elem.removeClass('ithumb-gp-close').find('.ithumb-gp-layer').remove();
			elem.prev('.ithumb-gp-container').remove();
		});
}

// initial apply
setTimeout(function() { applyElements(document); }, 200);

$(document).bind('DOMNodeInserted', function(e) { applyElements(e.target); });

} // /main logic

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
document.body.appendChild(script);

var cssArry = [
	'.ithumb-gp-close {' +
		'position: relative;' +
		'overflow: hidden;' +
		'height: 20px;' +
		'border-color: DarkGray;' +
		'border-width: 2px 2px 2px 25px;' +
		'border-top-left-radius: 8px;' +
		'border-bottom-left-radius: 8px;' +
		'border-style: solid;' +
	'}',
	'.ithumb-gp-close:hover {' +
		'opacity: 0.5;' +
		'border-color: PaleGreen;' +
		'cursor: pointer;' +
	'}',
	'.ithumb-gp-close > div {' +
		'margin-top: 0;' +
	'}',
	'.ithumb-gp-layer {' +
		'position: absolute;' +
		'height: 100%;' +
		'width: 100%;' +
		'z-index: 10;' +
	'}',
	'.ithumb-gp-container {' +
		'z-index: 10;' +
		'position: absolute;' +
		'width: 30%;' +
		'height: 0;' +
		'margin-top: -22px;' +
		'margin-left: 87%;' +
	'}',
	'.ithumb-gp-a {' +
		'outline: none;' +
	'}',
	'.ithumb-gp-img {' +
		'vertical-align: top;' +
		'height: 40px;' +
		'width: 40px;' +
		'border: solid white 1px;' +
		'box-shadow: 1px 1px 3px rgba(0,0,0,0.3);' +
		'-moz-transform: rotate(-10deg);' +
		'-webkit-transform: rotate(-10deg);' +
		'-o-transform: rotate(-10deg);' +
	'}',
	'.ithumb-gp-ul {' +
		'list-style: none;' +
		'height: 0;' +
	'}',
	'.ithumb-gp-li {' +
		'display: inline;' +
		'width: 0;' +
	'}',
	'.ithumb-gp-li:not(:first-child) > .ithumb-gp-a {' +
		'margin-left: -38px;' +
	'}',
	'.sb .ithumb-gp-container' +
	'{' +
		'z-index: 20;' +
	'}',
	'.sb .ithumb-gp-li' +
	'{' +
		'display: list-item;' +
	'}',
	'.sb .ithumb-gp-img' +
	'{' +
		'height: auto;' +
		'width: auto;' +
		'max-height: 280px;' +
		'max-width: 280px;' +
		'-moz-transform: none;' +
		'-webkit-transform: none;' +
		'-o-transform: none;' +
	'}',
	'.sb .ithumb-gp-li > .ithumb-gp-a' +
	'{' +
		'margin-left: 10px;' +
	'}'
];
var style = document.createElement('style');
style.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(style);
var sheet = style.sheet;
for (var i = 0; i < cssArry.length; i++){
	sheet.insertRule(cssArry[i], sheet.cssRules.length);
}

// load
(function load(tryCount) {
	if (tryCount < 20 && !(window.jQuery)) {
		setTimeout(function() { load(tryCount + 1); }, 60);
		return;
	}
	main();
})(0);

} // /source code

var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = '(' + source.toString() + ')();';
document.body.appendChild(script);

})();
