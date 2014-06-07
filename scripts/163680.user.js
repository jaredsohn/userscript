// ==UserScript==
// @name           131 Bulk Loader
// @version        3.3
// @description    利用131.com一页多图功能一次性显示（最多）300页漫画；解除鼠标右键（另存为）限制；取消（除最后一页的）鼠标左键翻页功能以防止误点；图片自适应窗口宽度
// @license        GPLv2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @match          http://comic.131.com/content/*/*/1.*html*
// @run-at         document-start
// @require        http://userscripts.org/scripts/source/164164.user.js
// @require        http://userscripts.org/scripts/source/164411.user.js
// @grant          none
// ==/UserScript==

var timer;
var originalUrl;
var IMAGE_DIV = "mh_zdimg";
var WORKING_INDICATOR = "numwarp";
var PRELOAD_SIZE_PREFIX = "?page=1&size=";
var PRELOAD_SIZE = 300;
var TIME_OUT = 10000;
var PRELOAD_INDICATOR = 'fl opens';

init();
bulkLoad();

function init() {
	timer = '';
	originalUrl = document.location.href;
}

function bulkLoad() {
	var segments = originalUrl.split('/');
	if (segments.length === 7)
	{
		if (segments[6].endsWith('.html')) {
			document.location.href = originalUrl + PRELOAD_SIZE_PREFIX + PRELOAD_SIZE;
		}
		else if(segments[6].endsWith('&size=' + PRELOAD_SIZE)) {
			modifyClicks();
		}
	}
}

function modifyClicks() {
	if (document.addEventListener) {
		document.addEventListener(
			"DOMContentLoaded", 
			loadedHandler, 
			false
		);
	}
}

function getSystemJS() {
	var scriptTags = document.body.getElementsByTagName('script');
	for (var i = 0; i < scriptTags.length; i++) {
		if (scriptTags[i].src.contains('System.js')) {
			return scriptTags[i];
		}
	}
}

function fitWindowWidth() {
	$('#inputAutoFix1, #inputAutoFix2').unbind('click').attr('onclick', "\
		var checked = $(this).prop('checked');\
		$('#inputAutoFix1, #inputAutoFix2').prop('checked', checked);\
		$('.mh_zdimg input[type=\"checkbox\"]').prop('checked', checked);\
		autofix(0, $('.mh_zdimg img'), checked);\
		Response.Cookies('ComicAutoFix', checked ? 1 : 0, 0365, '/', '131.com');");
	
	$(window).resize(function() {
		$('.mh_zdimg input[type="checkbox"]').trigger('change');
	});
}

function checkCheckboxes() {
	var isAutoFix = Request.Cookies('ComicAutoFix');
	if (1 == isAutoFix) {
		$('#inputAutoFix1, #inputAutoFix2').prop("checked", true);
	} else {
		$('#inputAutoFix1, #inputAutoFix2').prop("checked", false);
	}
}

function removedHandler(event) {
	var aTag;
	var imgTag;
	
	var checkboxTag;
	
	var images = document.getElementsByClassName(IMAGE_DIV);
	if (images) {
		document.getElementById('inputAutoFix1').onclick();
		
		for(var i = 0; i < images.length - 1; i++) {
			aTag = images[i].getElementsByTagName('a')[0];
			if (aTag) {
				aTag.style.display = 'inline-block';
				imgTag = aTag.getElementsByTagName('img')[0];
				if (imgTag) {
					imgTag.removeAttribute('oncontextmenu');
					aTag.removeAttribute('href');
				}
			}
		}
		aTag = images[images.length - 1].getElementsByTagName('a')[0];
		if (aTag) {
			aTag.style.display = 'inline-block';
			imgTag = aTag.getElementsByTagName('img')[0];
			if (imgTag) {
				imgTag.removeAttribute('oncontextmenu');
			}
		}
	}
}

function loadedHandler() {
	setTimeout(restoreOnFailure, TIME_OUT);
	
	appendScript(autofix, document.body);
	appendScript(fitWindowWidth, getSystemJS().parentNode, true);
	appendScript(checkCheckboxes, getSystemJS().parentNode, true);
	
	var image = document.getElementsByClassName(IMAGE_DIV)[0];
	if (image) {
		jAddEventListener(image, 'DOMNodeRemoved', removedHandler, 200);	
	}
}

function restoreOnFailure() {
	if (document.getElementsByClassName(PRELOAD_INDICATOR)[0]) {
		if (!document.getElementsByClassName(WORKING_INDICATOR)[0]) {
			if (originalUrl) { 
				document.location.href = originalUrl.replace(PRELOAD_SIZE_PREFIX + PRELOAD_SIZE, '?');
			}
		}
	}
}

function autofix(windowWidth, jQueryImage, isAuto) {
	if (isAuto) {
		var MARGIN = 2;
		jQueryImage.css('maxWidth', $(window).width() - MARGIN);
	}
	else {
		jQueryImage.css('maxWidth', 'none');
	}
}

function appendScript(newFunction, container, isSelfInvoking) {
	var newScript = document.createElement("script");
	
	if (!isSelfInvoking) {
		newScript.innerHTML = newFunction.toString();
	}
	else {
		newScript.innerHTML = '(' + newFunction.toString() + ')()';
	}
	
	if (isElement(container)) {
		container.appendChild(newScript);	
	}
}

function isElement(o) {
	return (
		'object' === typeof HTMLElement ? o instanceof HTMLElement : 
		o && typeof o === 'object' && 1 === o.nodeType && 'string' === typeof o.nodeName
	);
}