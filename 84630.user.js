// header {{{1
// vim: set ts=4 sw=4 noet:
/****************************

Next-generation Greased Lightbox
Copyright (c) Milly
http://d.hatena.ne.jp/MillyC/searchdiary?word=%2a%5blightbox%5d

Released under a Creative Commons License
http://creativecommons.org/licenses/by-nc-sa/2.5/

Credits
-------
Based on Greased Lightbox by Joe Lencioni (http://shiftingpixel.com/lightbox)
  Based on Lightbox JS by Lokesh Dhakar (http://www.huddletogether.com)
    and Flickrbox by Gavin Montague (http://www.leftbrained.co.uk)
  Creammonkey support by Gavin Montague and KATO Kazuyoshi (http://8-p.info)
  Timed slideshow by fearphage
  Extra thanks to Justin Delegard, Sami Haahtinen, Matt Parrett, Alex Nicksay,
    Christian Neubauer, eXtreme, Britt Torrance, Jason Sundram, Drew Burden,
    Nick Wisniewski, Stoen, CereS, Vurlix, Hamilton Cline, and Hiroshi MURASHITA

Translations
------------
Spanish by Martín Melado (http://mdug.es/)
French by MorphX and François
Japanese by KATO Kazuyoshi
Dutch by Lode Claassen (http://lodeclaassen.nl)
Hungarian by Lőrincz Attila (http://codemonkey.blogter.hu)
Finnish by Sami Haahtinen (http://ressukka.net)
Italian by millenomi
Traditional Chinese by Arphen Lin
German by Alex Brem (http://freQvibez.net)
Polish by s3kvir pascon
Czech by Arteal (http://arteal.name)
Slovak by Ezimír Totislav
Swedish by Magnus Claesson
Portuguese by Harlley Roberto (http://webtoo.com.br)
Other translations by AltaVista Babel Fish (http://babelfish.altavista.com)
  and Google Translate (http://translate.google.com)

*****************************/

// ==UserScript==
// @name			NG Lightbox
// @version			1.0.20130915
// @author			Milly
// @namespace		http://d.hatena.ne.jp/MillyC/
// @description		Enhances browsing on websites that link to images such as Google Image Search, Wikipedia, MySpace, deviantART, FFFFOUND!, and Blogger blogs. Use left and right arrow keys to cycle through images on page.
// @include			http*
// @grant           GM_addStyle
// @grant           GM_openInTab
// @grant           GM_xmlhttpRequest
// ==/UserScript==

/*jshint sub:true, smarttabs:true, funcscope:true, shadow:true */

// ngLightbox {{{1
var ngLightbox = {

	debug: false,

// properties {{{2

	// slide show interval time (user setting)
	slideShowIntervalTime : 4, // seconds
	slideShowErrorSkipTime : 0.5, // seconds

	// animation effects enable flag (user setting)
	animationEnabled : true,

	// check setTimeout useable
	timerEnabled : false,

	// image datas
	aspectRatio : null,
	originalWidth : null,
	originalHeight : null,
	currentImage : null,
	currentAddress : null,
	currentContext : null,
	currentCaption : null,
	currentExLinks : null,
	prefetchedImage : null,
	currentRotate : 0,
	preloadFallbackFunction : null,
	prefetchFallbackFunction : null,

	// initialized flags
	controlsInitialized : false,
	requireUpdate : true,

	// timers id or close function
	slideShowTimerID : null,
	scrollTimerID : null,
	fadeTimerCloser : null,
	imageScrollTimerCloser : null,

	// position of currently showed image in allImageLinks[]
	currentImagePosition : 0,

	// An array of image links and their functions.
	allImageLinks : [],

	// keeps track of which arrow key user last used (1 = right, -1 = left)
	lastMove : 1,

	// true if lightbox is currently showing. updated by show() and hide()
	isShowing : false,

	// true if slideShow has been initiated
	isSlideShow : false,

	// image dragging datas
	dragData : null,
	isDragging : false,
	isDragMoved : false,

	// Array of event listener datas.
	events : [],

	// searchDefsToUse
	// initialized by init().
	searchDefsToUse : [],

// methods {{{2

	win : ('object' == typeof unsafeWindow) ? unsafeWindow : window,

	log : function() {
		if (ngLightbox.debug && ngLightbox.win.console) {
			var args = Array.prototype.slice.call(arguments);
			for (var i = 0; i < args.length; ++i)
				if ('function' == typeof args[i])
					args[i] = args[i].call(ngLightbox);
			ngLightbox.win.console.log.apply(ngLightbox.win.console, args);
		}
	},

	getSearchDef : function(name) {
		var searchDefs = ngLightbox.searchDefs;
		for (var i = 0; i < searchDefs.length; i++) {
			var searchDef = searchDefs[i];
			if (searchDef['name'] == name)
				return searchDef;
		}
	},

	// Generic helper function that calls show() with the correct parameters
	showFrom : function(link) {
		var pos = ngLightbox.findImageLinkPosition(link);
		var linkData = ngLightbox.allImageLinks[pos];
		var searchDef = linkData['searchDef'];
		var address = link.getAttribute('href');
		var caption = ngLightbox.makeCaption(link, searchDef['captionXPath']);
		var exLinks = searchDef['getExLinksFunction'] && searchDef['getExLinksFunction'](linkData) || [];
		var fallbackFunction = null;
		ngLightbox.log('showFrom: searchDef', searchDef['name']);
		if (searchDef.hasOwnProperty('fallbackDefName')) {
			fallbackFunction = function() {
				linkData['searchDef'] = ngLightbox.getSearchDef(searchDef['fallbackDefName']);
				delete linkData['image'];
				ngLightbox.showFrom(link);
			};
		}
		var loaded = false;
		ngLightbox.getImageByListener(linkData, function(img) {
			if (img) {
				loaded = true;
				ngLightbox.show(link, img, address, caption, exLinks, fallbackFunction);
			} else if (fallbackFunction) {
				fallbackFunction();
			}
		});
		if (!loaded) {
			ngLightbox.initControls();
			ngLightbox.showLightboxOverlay();
			ngLightbox.showLoadingMessage();
		}
	},

	// get image url and call listener.
	getImageByListener : function(linkData, listener) {
		if (linkData['image']) {
			ngLightbox.log('getImageByListener: result', linkData['image']);
			listener(linkData['image']);
			return;
		}

		var link = linkData['link'];
		var searchDef = linkData['searchDef'];
		var address = link.getAttribute('href');
		ngLightbox.log('getImageByListener: address', address);

		function hookListener(img) {
			linkData['image'] = img;
			if (1 < arguments.length) {
				var pos = ngLightbox.findImageLinkPosition(linkData['link']);
				var spliceArgs = [pos + 1, 0];
				for (var i = 1; i < arguments.length; ++i) {
					spliceArgs.push({
						image     : arguments[i],
						link      : link,
						searchDef : searchDef
					});
				}
				Array.prototype.splice.apply(ngLightbox.allImageLinks, spliceArgs);
			}
			ngLightbox.log('getImageByListener: result', img);
			listener(img);
		}
		function replace(str, searchName, replaceName) {
			str = str.replace(searchDef[searchName], searchDef[replaceName]);
			if (searchDef['decodeURI']) str = decodeURIComponent(str);
			return str;
		}

		if (searchDef['findImageFunction'] || searchDef['imageInPageRegExp']) {
			address = link.href;
			if (searchDef.hasOwnProperty('linkReplaceString'))
				address = replace(address, 'linkRegExp', 'linkReplaceString');
			if (searchDef['findImageFunction']) {
				searchDef['findImageFunction'].call(ngLightbox, address, searchDef, hookListener);
			} else {
				ngLightbox.loadPageAndFindImage(address, searchDef, hookListener);
			}
		} else if (searchDef['findImageRegExp']) {
			hookListener(ngLightbox.containsThumb(link, searchDef, true));
		} else if (searchDef.hasOwnProperty('linkReplaceString')) {
			hookListener(replace(address, 'linkRegExp', 'linkReplaceString'));
		} else if (searchDef.hasOwnProperty('replaceString')) {
			hookListener(replace(address, 'linkRegExp', 'replaceString'));
		} else {
			hookListener(address);
		}
	},

	loadPageAndFindImage : function(url, searchDef, listener) {
		GM_xmlhttpRequest({
			method : 'GET',
			url    : url,
			onload : function(r) {
				var html = r.responseText;
				if (ngLightbox.debug) ngLightbox.win.ngLightbox_html = html;
				var reg = new RegExp(searchDef['imageInPageRegExp']);
				var match, matches = [];
				while ( (match = reg.exec(html)) ) {
					if (searchDef.hasOwnProperty('replaceString')) {
						matches.push(match[0].replace(new RegExp(reg), searchDef['replaceString']));
					} else {
						matches.push(match[0]);
					}
					if (!reg.global) break;
				}
				ngLightbox.log('loadPageAndFindImage: onload: matches', matches);
				listener.apply(ngLightbox, matches);
			}
		});
	},

	containsThumb : function(elem, searchDef, verbose) {
		var srcs = document.evaluate('.//img/@src|.//img/@data-src', elem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < srcs.snapshotLength; i++) {
			var src = srcs.snapshotItem(i).nodeValue;
			if (searchDef['findImageRegExp'].test(src)) {
				if (!verbose) return true;
				if (searchDef.hasOwnProperty('replaceString')) {
					return src.replace(searchDef['findImageRegExp'], searchDef['replaceString']);
				} else {
					return src;
				}
			}
		}
		return false;
	},

	// Extracts an address out of a linkObj
	getAddress : function(linkObj) {
		var address = linkObj.getAttribute('href');

		// for GreaseKit users because Safari doesn't like stopping events even though it says it does...
		if (/Safari/.test(navigator.userAgent)) {
			linkObj.onclick = function() { return false; };
		}
		return address;
	},

	// Returns page scroll, page size and window size
	getView : function() {
		var scrollLeft   = document.body.scrollLeft || document.documentElement.scrollLeft;
		var scrollTop    = document.body.scrollTop  || document.documentElement.scrollTop;
		var windowWidth  = window.innerWidth  || document.documentElement.clientWidth;
		var windowHeight = window.innerHeight || document.documentElement.clientHeight;
		var pageWidth    = document.body.scrollWidth  || document.documentElement.scrollWidth;
		var pageHeight   = document.body.scrollHeight || document.documentElement.scrollHeight;
		return {
			left   : scrollLeft,
			top    : scrollTop,
			right  : scrollLeft + windowWidth,
			bottom : scrollTop  + windowHeight,
			width  : windowWidth,
			height : windowHeight,
			pageWidth  : Math.max(pageWidth,  windowWidth),
			pageHeight : Math.max(pageHeight, windowHeight)
		};
	},

	getElementOffset : function(element, base) {
		var left = 0, top = 0;
		var width = element.offsetWidth, height = element.offsetHeight;
		var parent = element;

		while (parent && parent != base) {
			left += parent.offsetLeft;
			top  += parent.offsetTop;
			parent = parent.offsetParent;
		}

		if ('inline' == getComputedStyle(element, '').display) {
			var childHeight = [];
			for (var i = 0; i < element.childNodes.length; ++i)
				childHeight.push(element.childNodes[i].offsetHeight);
			height = Math.max.apply(Math, childHeight);
			top -= height - element.offsetHeight;
		}

		return {
			left   : left,
			top    : top,
			right  : left + width,
			bottom : top  + height,
			width  : width,
			height : height,
			ancestor : parent
		};
	},

	// Centers the object in the page
	center : function(objToCenter, options) {
		options = options || {};
		var container = options.container || objToCenter;
		var view = options.view || ngLightbox.getView();

		var offset = ngLightbox.getElementOffset(objToCenter, container);
		if (offset.ancestor == container) {
			var minTop  = (undefined === options.minTop ) ? -Infinity : options.minTop;
			var minLeft = (undefined === options.minLeft) ? -Infinity : options.minLeft;
			var newTop  = (view.height - objToCenter.offsetHeight) / 2 - offset.top;
			var newLeft = (view.width  - objToCenter.offsetWidth ) / 2 - offset.left;
			if ('fixed' != getComputedStyle(container, '').position) {
				newTop  += view.top;
				newLeft += view.left;
				minTop  += view.top;
				minLeft += view.left;
			}
			container.style.top  = Math.round(Math.max(minTop,  newTop )) + 'px';
			container.style.left = Math.round(Math.max(minLeft, newLeft)) + 'px';
		}
	},

	// Preloads images. Pleaces new image in lightbox then centers and displays.
	show : function(link, img, context, caption, exLinks, fallbackFunction) {
		ngLightbox.preloadFallbackFunction = fallbackFunction;
		ngLightbox.currentImagePosition = ngLightbox.findImageLinkPosition(link);
		ngLightbox.isShowing      = true;
		ngLightbox.currentAddress = link.href;
		ngLightbox.currentImage   = img || link.href;
		ngLightbox.currentContext = context;
		ngLightbox.currentCaption = caption || ngLightbox.makeCaption(link);
		ngLightbox.currentExLinks = exLinks;
		ngLightbox.currentRotate  = ngLightbox.allImageLinks[ngLightbox.currentImagePosition]['rotate'] || 0;
		ngLightbox.initControls();
		ngLightbox.showLightboxOverlay();

		// if not prefetched, show loading message
		if (ngLightbox.prefetchedImage != ngLightbox.currentImage) {
			ngLightbox.showLoadingMessage();
		}

		var objPreload = document.getElementById('ngLightboxPreload');
		if (objPreload.src != ngLightbox.currentImage) {
			objPreload.src = ngLightbox.currentImage;
		} else {
			ngLightbox.eventListeners.preloaderDone();
		}

		if (!ngLightbox.isSlideShow) {
			ngLightbox.windowScrollTo(link, { center:true, smooth:true, focus:true });
		}

		if (ngLightbox.allImageLinks.length > 1) {
			ngLightbox.prefetchNextImage();
		}
	},

	showLightboxOverlay : function() {
		var objOverlay = document.getElementById('ngLightboxOverlay');

		if ('block' != objOverlay.style.display) {
			objOverlay.style.display = 'block';
			ngLightbox.setOverlaysVisibility(false);
		}
	},

	showLoadingMessage : function() {
		if (!ngLightbox.isSlideShow) {
			var objLoading = document.getElementById('ngLightboxLoading');
			var objMenu    = document.getElementById('ngLightboxMenu');

			objLoading.style.display = 'block';
			ngLightbox.center(objLoading);
			objMenu.style.bottom = 0;
		}
	},

	hideLoadingMessage : function() {
		var objLoading = document.getElementById('ngLightboxLoading');
		var objMenu    = document.getElementById('ngLightboxMenu');

		if (!ngLightbox.isSlideShow && 'none' != objLoading.style.display) {
			objLoading.style.display = 'none';
//			ngLightbox.scrollElement(objMenu, { bottom:-35 });
			if (ngLightbox.animationEnabled && ngLightbox.timerEnabled) {
				var pos = 0;

				var scroll = function() {
					pos -= 7;
					if (pos <= -35) {
						objMenu.style.bottom = '';
					} else {
						objMenu.style.bottom = pos + 'px';
						setTimeout(scroll, 100);
					}
				};

				setTimeout(scroll, 300);
			} else {
				objMenu.style.bottom = '';
			}
		}
	},

	showMessage : function(message, context) {
		var objLightbox     = document.getElementById('ngLightboxBox');
		var objError        = document.getElementById('ngLightboxError');
		var objErrorMessage = document.getElementById('ngLightboxErrorMessage');
		var objErrorContext = document.getElementById('ngLightboxErrorContext');

		ngLightbox.showLightboxOverlay();
		objError.style.display = 'block';

		objErrorMessage.innerHTML = '';
		objErrorMessage.appendChild(document.createTextNode(message));
		if (context) {
			objErrorContext.setAttribute('href', context);
			objErrorContext.style.display = '';
		} else {
			objErrorContext.style.display = 'none';
		}
		ngLightbox.center(objError);

		ngLightbox.hideLoadingMessage();
		objLightbox.style.display = 'none';
	},

	// Loads another image from allImageLinks[]
	showNext : function(moveByAmount) {
		if (ngLightbox.allImageLinks.length > 1) {
			if (moveByAmount) {
				ngLightbox.lastMove = moveByAmount;
			}
			var objError = document.getElementById('ngLightboxError');
			objError.style.display = 'none';
			ngLightbox.currentImagePosition = ngLightbox.getNextPosition();
			var linkData = ngLightbox.allImageLinks[ngLightbox.currentImagePosition];
			ngLightbox.showFrom(linkData['link']);
		}
	},

	showPrevious : function() {
		var dir = ngLightbox.lastMove;
		ngLightbox.lastMove = -dir;
		ngLightbox.showNext();
		ngLightbox.lastMove = dir;
	},

	// Cycles through all of the lightboxable images.
	startSlideShow : function() {
		if (!ngLightbox.isSlideShow && ngLightbox.timerEnabled) {
			ngLightbox.isSlideShow = true;

			var objOverlay    = document.getElementById('ngLightboxOverlay');
			var objBackground = document.getElementById('ngLightboxBackground');
			objOverlay.setAttribute('class', 'ngLightboxSlideShow');
			ngLightbox.fadeElement(objBackground, { from:0.8, to:1, onfinish:function() {
				ngLightbox.resize('=', true);
				var interval = ngLightbox.slideShowIntervalTime * 1000; // msec
				ngLightbox.slideShowTimerID = setTimeout(function() { ngLightbox.showNext(); }, interval);
			} });
		}
	},

	// stop slide show.
	stopSlideShow : function() {
		if (ngLightbox.isSlideShow) {
			ngLightbox.isSlideShow = false;
			clearTimeout(ngLightbox.slideShowTimerID);
			ngLightbox.slideShowTimerID = null;

			var objOverlay    = document.getElementById('ngLightboxOverlay');
			var objBackground = document.getElementById('ngLightboxBackground');
			objOverlay.removeAttribute('class');
			ngLightbox.fadeElement(objBackground, { from:1, to:0.8 });
		}
	},

	// Start or stop slide show
	toggleSlideShow : function() {
		if (ngLightbox.isSlideShow) {
			ngLightbox.stopSlideShow();
		} else {
			ngLightbox.startSlideShow();
		}
	},

	// Stops the preloader in case it hasn't finished and then hides all of the lightbox components
	hide : function() {
		ngLightbox.isShowing = false;
		ngLightbox.stopSlideShow();
		ngLightbox.setOverlaysVisibility(true);

		var elements = [
			'ngLightboxLoading',
			'ngLightboxError',
			'ngLightboxBox',
			'ngLightboxOverlay'
		];
		for (var i = 0; i < elements.length; ++i) {
			document.getElementById(elements[i]).style.display = 'none';
		}

		var link = ngLightbox.allImageLinks[ngLightbox.currentImagePosition]['link'];
		ngLightbox.windowScrollTo(link, { center:true, smooth:true, focus:true });
	},

	// Window scrool to element
	windowScrollTo : function(element, opt) {
		clearInterval(ngLightbox.scrollTimerID);
		ngLightbox.scrollTimerID = null;

		var offset = ngLightbox.getElementOffset(element);
		var view = ngLightbox.getView();

		if (offset.top < view.top || view.bottom < offset.bottom) {
			var newTop = offset.top;
			if (opt.center) {
				newTop = Math.max(0, newTop - Math.max(0, (view.height - offset.height) / 2));
			}
			newTop = Math.min(view.pageHeight - view.height, newTop);

			if (opt.smooth && ngLightbox.animationEnabled && ngLightbox.timerEnabled) {
				var i     = 0;
				var top   = view.top;
				var steps = opt.steps || 5;
				var step  = (newTop - top) / steps;

				var scroll = function() {
					if (++i < steps) {
						top += step;
						window.scrollTo(view.left, top);
					} else {
						clearInterval(ngLightbox.scrollTimerID);
						window.scrollTo(view.left, newTop);
						if (opt.focus) element.focus();
					}
				};

				ngLightbox.scrollTimerID = setInterval(scroll, opt.interval || 10);
				scroll();
			} else {
				window.scrollTo(view.left, newTop);
				if (opt.focus) element.focus();
			}
		} else {
			if (opt.focus) element.focus();
		}
	},

	// evaluate XPath
	evaluateXPath : function(xpath, contextNode, resultType) {
		var regCurrent = /\bcurrent\(\)(?:[^\[\]\(\),=]|\[(?:[^\]]|".*?"|'.*?')*\]|\(.*?\))*/.source;
		var reg = new RegExp('\\b(?:count|local-name|name|namespace-uri)\\((?:' + regCurrent + ')\\)|(?:' + regCurrent + ')', 'g');
		xpath = xpath.replace(reg, function(match) {
			match = match.replace(/\bcurrent\(\)/g, '.');
			var res = document.evaluate(match, contextNode, null, XPathResult.STRING_TYPE, null).stringValue;
			if (0 <= res.indexOf('"'))
				return 'concat("' + res.replace('"', '",\'"\',"') + '")';
			return '"' + res + '"';
		});
		return document.evaluate(xpath, contextNode, null, resultType || XPathResult.ANY_TYPE, null);
	},

	// make caption text
	makeCaption : function(link, xpaths /* string or array */) {
		xpaths = ('string' == typeof xpaths) ? [xpaths] : (xpaths || []);
		xpaths = xpaths.concat(['.//@title', './/img/@alt']);
		for (var i = 0; i < xpaths.length; ++i) {
			var res = ngLightbox.evaluateXPath(xpaths[i], link, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
			if (0 < res.snapshotLength) {
				var caption = [];
				for (var j = 0; j < res.snapshotLength; ++j)
					caption.push(res.snapshotItem(j).nodeValue);
				return caption.join('').replace(/^\s+|\s+$/gm, '');
			}
		}
		return '';
	},

	// Show Hide flash movies that peek through the overlay
	setOverlaysVisibility : function(visible) {
		var visibility = visible ? 'visible' : 'hidden';
		var xpath = '//object[not(starts-with(@id,"ngLightbox"))]|//embed|//iframe';
		var obtrusives = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < obtrusives.snapshotLength; i++) {
			var thisObtrusive = obtrusives.snapshotItem(i);
			thisObtrusive.style.visibility = visibility;
		}
	},

	findImageLinkPosition : function(link) {
		var pos = ngLightbox.currentImagePosition;
		if (ngLightbox.allImageLinks[pos]['link'] == link) return pos;

		for (var i = 0; i < ngLightbox.allImageLinks.length; i++) {
			if (ngLightbox.allImageLinks[i]['link'] == link) {
				return i;
			}
		}
		return null;
	},

	getNextPosition : function() {
		var firstPos = ngLightbox.currentImagePosition;
		var firstData = ngLightbox.allImageLinks[firstPos];
		var pos = firstPos;
		do {
			pos += ngLightbox.lastMove;
			if (pos < 0) pos = ngLightbox.allImageLinks.length - 1;
			if (ngLightbox.allImageLinks.length <= pos) pos = 0;
			if (pos == firstPos || ngLightbox.allImageLinks[pos]['image'] != firstData['image']) break;
		} while (ngLightbox.allImageLinks[pos]['link'].href == firstData['link'].href);
		return pos;
	},

	// for some reason this pre-fetching breaks lightbox in opera
	prefetchNextImage : function() {
		if (window.opera) return;

		var pos = ngLightbox.getNextPosition();
		var nextImage = ngLightbox.allImageLinks[pos];
		var searchDef = nextImage['searchDef'];
		ngLightbox.prefetchFallbackFunction = null;
		if (searchDef.hasOwnProperty('fallbackDefName')) {
			ngLightbox.prefetchFallbackFunction = function() {
				nextImage['searchDef'] = ngLightbox.getSearchDef(searchDef['fallbackDefName']);
				delete nextImage['image'];
				ngLightbox.prefetchNextImage();
			};
		}
		ngLightbox.getImageByListener(nextImage, function(img) {
			ngLightbox.prefetchedImage = null;
			if (img) {
				var objPrefetch = document.getElementById('ngLightboxPrefetch');
				objPrefetch.src = img;
			} else {
				ngLightbox.eventListeners.prefetchError();
			}
		});
	},

	// Resize the image.
	// resizeByAmount = 0   : set to default size
	//                  '=' : fit to screen
	//                  0 > : increase size
	//                  0 < : decrease size
	resize : function(resizeByAmount, notShowImageAmount, angle) {
		angle = angle || 0;
		var objLightbox = document.getElementById('ngLightboxBox');
		var objImage    = document.getElementById('ngLightboxImage');
		var view        = ngLightbox.getView();

		function resizeByWidth(width) {
			// check min size
			if (ngLightbox.originalHeight > ngLightbox.originalWidth) {
				var minWidth = Math.min(50, ngLightbox.originalWidth);
			} else {
				var minWidth = Math.min(50, ngLightbox.originalHeight) / ngLightbox.aspectRatio;
			}
			objImage.width  = width = Math.max(width, minWidth);
			objImage.height = width * ngLightbox.aspectRatio;
		}

		objImage.style.display = 'block';

		if (!resizeByAmount) { // default size
			objImage.removeAttribute('width');
			objImage.removeAttribute('height');
			ngLightbox.rotate(angle);
			ngLightbox.center(objImage, { container:objLightbox, view:view });
		} else if (resizeByAmount == '=') { // fit to screen
			var newWidth  = ngLightbox.originalWidth;
			var vertical = Math.round((ngLightbox.currentRotate + angle) / 90) * 90 % 180;
			var viewSides = vertical ? [view.width, view.height] : [view.height, view.width];
			if (ngLightbox.originalHeight > viewSides[0])
				newWidth = viewSides[0] / ngLightbox.aspectRatio;
			if (newWidth > viewSides[1])
				newWidth = viewSides[1];
			resizeByWidth(newWidth);
			ngLightbox.rotate(angle);
			ngLightbox.center(objLightbox, { minLeft:0, minTop:0, view:view });
		} else { // resize by amount
			var amount   = (resizeByAmount < 0) ? 100 / (100 - resizeByAmount) : (100 + resizeByAmount) / 100;
			var oldWidth = objImage.width;
			var newWidth = objImage.width * amount;
			if (Math.abs(newWidth / ngLightbox.originalWidth - 1) < 0.03) {
				newWidth = ngLightbox.originalWidth;
			}
			var screenCenterX = view.width / 2;
			var screenCenterY = view.height / 2;
			if ('fixed' != getComputedStyle(objLightbox, '').position) {
				screenCenterX += view.left;
				screenCenterY += view.top;
			}
			var centerX = screenCenterX - (objLightbox.offsetLeft + objImage.offsetLeft);
			var centerY = screenCenterY - (objLightbox.offsetTop  + objImage.offsetTop);
			resizeByWidth(newWidth);
			amount = objImage.width / oldWidth;
			ngLightbox.rotate(angle);
			objLightbox.style.left = (screenCenterX - objImage.offsetLeft - centerX * amount) + 'px';
			objLightbox.style.top  = (screenCenterY - objImage.offsetTop  - centerY * amount) + 'px';
		}

		if (!notShowImageAmount) {
			ngLightbox.showImageAmount();
		}
	},

	rotate : function(angle, noAnimate) {
		angle = angle || 0;
		var objLightbox       = document.getElementById('ngLightboxBox');
		var objImage          = document.getElementById('ngLightboxImage');
		var objImageContainer = document.getElementById('ngLightboxImageContainer');

		// adjust to 0, 90, 180, 270
		var lastAngle = ngLightbox.currentRotate;
		var newAngle = Math.round((lastAngle + angle) / 90) * 90 % 360;
		if (newAngle < 0) newAngle += 360;
		ngLightbox.currentRotate = newAngle;
		ngLightbox.allImageLinks[ngLightbox.currentImagePosition]['rotate'] = newAngle;

		var width   = objImage.width;
		var height  = objImage.height;
		var w2      = width / 2;
		var h2      = height / 2;
		var sides   = (newAngle % 180) ? [height, width] : [width, height];
		var offsets = (newAngle % 180) ? [h2 - w2, w2 - h2] : [0, 0];
		var fixAngle = (180 < (newAngle - lastAngle)) ? 360 :
		               (180 < (lastAngle - newAngle)) ? -360 : 0;

		objLightbox.style.width  = sides[0] + 'px';
		objLightbox.style.height = sides[1] + 'px';
		objImageContainer.style.left = Math.round(offsets[0]) + 'px';
		objImageContainer.style.top  = Math.round(offsets[1]) + 'px';
		setStyle('transform-origin', Math.round(w2) + 'px ' + Math.round(h2) + 'px', '');
		if (!noAnimate && ngLightbox.timerEnabled) {
			if (fixAngle) {
				enableTransition(false);
				rotate(lastAngle + fixAngle);
			}
			setTimeout(function() {
				enableTransition(true);
				rotate(newAngle);
			}, 0);
		} else {
			enableTransition(false);
			rotate(newAngle);
		}

		function rotate(angle) {
			setStyle('transform', 'rotate(' + angle + 'deg)', 'important');
		}
		function enableTransition(enabled) {
			if (enabled) {
				setStyle('transition', '', '');
			} else {
				setStyle('transition', 'none', 'important');
			}
		}
		function setStyle(property, value, important) {
			var prefix = ['-moz-', '-webkit-', ''];
			for (var i = 0; i < prefix.length; ++i)
				objImageContainer.style.setProperty(prefix[i] + property, value, important);
		}
	},

	showImageAmount : function() {
		if (ngLightbox.animationEnabled && ngLightbox.timerEnabled) {
			var objImage = document.getElementById('ngLightboxImage');
			var objSize  = document.getElementById('ngLightboxSize');

			objSize.style.display = 'block';
			objSize.innerHTML = Math.round(objImage.width / ngLightbox.originalWidth * 100) + '%';
			ngLightbox.center(objSize);

			ngLightbox.fadeElement(objSize, { from:2, steps:10, interval:50 });
		}
	},

	fadeElement : function(element, opt) {
		if (ngLightbox.fadeTimerCloser) ngLightbox.fadeTimerCloser();

		var from = opt.from || 0;
		var to   = opt.to || 0;
		element.style.opacity = Math.max(0, Math.min(1, from));
		element.style.display = 'block';
		element.style.visibility = 'visible';

		var timerID;
		var onfinish = opt.onfinish;
		ngLightbox.fadeTimerCloser = function() {
			ngLightbox.fadeTimerCloser = null;
			clearInterval(timerID);
			element.style.opacity = Math.max(0, Math.min(1, to));
			if (to <= 0) element.style.display = 'none';
			if (onfinish) onfinish();
		};

		if (from != to && ngLightbox.animationEnabled && ngLightbox.timerEnabled) {
			var i        = 0;
			var opacity  = from;
			var steps    = opt.steps || 5;
			var step     = (to - from) / steps;

			var fade = function() {
				opacity += step;
				if (++i < steps) {
					element.style.opacity = Math.max(0, Math.min(1, opacity));
				} else {
					ngLightbox.fadeTimerCloser();
				}
			};

			timerID = setInterval(fade, opt.interval || 10);
			fade();
		} else {
			ngLightbox.fadeTimerCloser();
		}
	},

	scrollElement : function(element, opt) {
		if (ngLightbox.imageScrollTimerCloser) ngLightbox.imageScrollTimerCloser();

		var left = element.offsetLeft;
		var top  = element.offsetTop;
		if (opt.relative) {
			var leftTo = (opt.left || -opt.right  - element.offsetWidth  || 0) + left;
			var topTo  = (opt.top  || -opt.bottom - element.offsetHeight || 0) + top;
		} else {
			var leftTo = (undefined !== opt.left ) ? opt.left :
						 (undefined !== opt.right) ? -opt.right - element.offsetWidth :
						 left;
			var topTo  = (undefined !== opt.top   ) ? opt.top :
						 (undefined !== opt.bottom) ? -opt.bottom - element.offsetHeight :
						 top;
		}

		var timerID;
		var onfinish = opt.onfinish;
		ngLightbox.imageScrollTimerCloser = function() {
			ngLightbox.imageScrollTimerCloser = null;
			clearInterval(timerID);
			element.style.left = leftTo + 'px';
			element.style.top  = topTo  + 'px';
			if (onfinish) onfinish();
		};

		if ((left != leftTo || top != topTo) && ngLightbox.animationEnabled && ngLightbox.timerEnabled) {
			var i        = 0;
			var view     = ngLightbox.getView();
			var steps    = opt.steps || Math.floor(Math.max(5, (leftTo - left) / view.width * 2, (topTo - top) / view.height * 2));
			var stepX    = (leftTo - left) / steps;
			var stepY    = (topTo  - top ) / steps;

			var scroll = function() {
				left += stepX;
				top  += stepY;
				if (++i < steps) {
					element.style.left = left + 'px';
					element.style.top  = top  + 'px';
				} else {
					ngLightbox.imageScrollTimerCloser();
				}
			};

			timerID = setInterval(scroll, opt.interval || 10);
			scroll();
		} else {
			ngLightbox.imageScrollTimerCloser();
		}
	},

	imageScrollTo: function(pos_or_opt) {
		var objLightbox = document.getElementById('ngLightboxBox');
		var view        = ngLightbox.getView();

		function parsePos(pos, offset, pageSize, imageSize) {
			var last = pageSize - imageSize;
			var relative = true;
			switch (pos) {
				case 'head': pos = 0; relative = false; break;
				case 'last': pos = last; relative = false; break;
				case 'up'  : pos = -pageSize; break;
				case 'down': pos = pageSize; break;
			}
			if (relative) pos = Math.min(0, Math.max(last, offset + pos));
			return pos;
		}

		if ('object' == typeof pos_or_opt) {
			ngLightbox.scrollElement(objLightbox, pos_or_opt);
		} else if (objLightbox.offsetHeight > view.height) {
			ngLightbox.scrollElement(objLightbox, {
				top : parsePos(pos_or_opt, objLightbox.offsetTop, view.height, objLightbox.offsetHeight)
			});
		} else if (objLightbox.offsetWidth > view.width) {
			ngLightbox.scrollElement(objLightbox, {
				left : parsePos(pos_or_opt, objLightbox.offsetLeft, view.width, objLightbox.offsetWidth)
			});
		}
	},

	// Update all image links event.
	updateAllImageLinks : function() {
		ngLightbox.requireUpdate = false;
		var allImageLinks = [];
		for (var i = 0; i < ngLightbox.allImageLinks.length; ++i) {
			var data = ngLightbox.allImageLinks[i];
			if (data['searchDef']['resetEverytime']) {
				var link = data['link'];
				ngLightbox.removeEvent(link, 'click', ngLightbox.eventListeners.imageLinkClick, true);
				link.setAttribute('rel', (link.getAttribute('rel') || '').replace(/\s*(ng|not)Lightbox\b/, ''));
			} else {
				allImageLinks.push(data);
			}
		}
		var links = document.evaluate('//a[@href]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < links.snapshotLength; ++i) {
			var link = links.snapshotItem(i);
			var rel = link.getAttribute('rel') || '';
			if (!rel.match(/\b(ng|not)Lightbox\b/)) {
				var searchDef = ngLightbox.findSearchDefForLink(link);
				if (searchDef) {
					allImageLinks.push({
						searchDef : searchDef,
						link      : link
					});
					// prevents doubling lightboxes
					if (!ngLightbox.timerEnabled || !rel.match(/lightbox/i)) {
						link.setAttribute('rel', (rel + ' ngLightbox').replace(/^\s+/, ''));
						ngLightbox.addEvent(link, 'click', ngLightbox.eventListeners.imageLinkClick, true);
					}
				} else if (!rel.match(/lightbox/i)) {
					link.setAttribute('rel', (rel + ' notLightbox').replace(/^\s+/, ''));
				}
			}
		}
		ngLightbox.allImageLinks = allImageLinks;
	},

	// Find link element from ancestor or self.
	findLink : function(element /* or event */) {
		if (element.currentTarget) element = element.target;
		var res = document.evaluate('ancestor-or-self::a', element, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return res.singleNodeValue;
	},

	// Find SearchDef for link.
	findSearchDefForLink : function(link) {
		var searchDefsToUse = ngLightbox.searchDefsToUse;
		var href = link.getAttribute('href');
		if (location.href.match(/^http:\/\/(?:[^\/]+\.)google\.(?:com|co\.[a-z]{2})\//))
			href = href.replace(/^\/url\?(?=\bq=([^&]+)).*$/, '$1');
		for (var i = 0; i < searchDefsToUse.length; ++i) {
			var searchDef = searchDefsToUse[i];
			if ( searchDef['linkRegExp'].test(href) &&
				 (!searchDef['findImageRegExp'] || ngLightbox.containsThumb(link, searchDef)) &&
				 (!searchDef['excludeLinkRegExp'] || !searchDef['excludeLinkRegExp'].test(href)) ) {
				return searchDef;
			}
		}
		return false;
	},

	// Add event listener.
	addEvent : function(element, type, listener, capture) {
		element.addEventListener(type, listener, capture);
		ngLightbox.events.push([element, type, listener, capture]);
	},

	// Remove event listener.
	removeEvent : function(element, type, listener, capture) {
		var events = ngLightbox.events;
		for (var i = 0, l = events.length; i < l; ++i) {
			var e = events[i];
			if (e && element === e[0] && type === e[1] && listener === e[2] && capture === e[3]) {
				element.removeEventListener(type, listener, capture);
				events[i] = null;
				break;
			}
		}
	},

	stopEvents : function(event) {
		if (event && event.currentTarget) {
			if (event.stopPropagation) event.stopPropagation();
			if (event.preventDefault) event.preventDefault();

			// for GreaseKit users because Safari doesn't like stopping events even though it says it does...
			if (/Safari/.test(navigator.userAgent)) {
				var target = ngLightbox.findLink(event);
				if (target) {
					target.onclick = function() { return false; };
				}
			}
		}
	},

// initialize methods {{{2

	// Initialize NG Lightbox.
	init : function() {
		// check setTimeout useable
		setTimeout(function() {
			ngLightbox.timerEnabled = true;
			ngLightbox.log('init: timerEnabled', true);
		}, 0);

		// set up list of searchDefs to use based on how includeRegExp matches window.location.href
		var currentURL = window.location.href;
		var searchDefsToUse = [];
		var searchDefs = ngLightbox.searchDefs;
		for (var i = 0; i < searchDefs.length; ++i) {
			if (searchDefs[i]['includeRegExp'].test(currentURL)) {
				searchDefsToUse.push(searchDefs[i]);
			}
		}
		ngLightbox.searchDefsToUse = searchDefsToUse;
		ngLightbox.log('init: currentURL', currentURL);
		ngLightbox.log('init: searchDefsToUse', function() { var r = [], i = 0; for (;i < searchDefsToUse.length; ++i) r.push(searchDefsToUse[i].name); return r; });

		if (searchDefsToUse.length) {
			ngLightbox.text.init();
			ngLightbox.addEvent(window, 'unload', ngLightbox.eventListeners.windowUnload, false);
			ngLightbox.addEvent(window, 'resize', ngLightbox.eventListeners.windowResize, true);
			ngLightbox.addEvent(document, 'keydown', ngLightbox.eventListeners.captureKeyDown, true);
			ngLightbox.addEvent(document, 'keypress', ngLightbox.eventListeners.captureKeyPress, true);
			ngLightbox.addEvent(document, 'keyup', ngLightbox.eventListeners.captureKeyUp, true);
			ngLightbox.addEvent(document, 'click', ngLightbox.eventListeners.captureClick, true);
			ngLightbox.addEvent(document, 'load', ngLightbox.eventListeners.captureLoad, true);
			/*
			if (ngLightbox.win.AutoPagerize && 'function' == tnLightbox.win.AutoPagerize.addFilter) {
				AutoPagerize.addFilter(function() { ngLightbox.requireUpdate = true; });
			}
			*/
		}
	},

	// Initialize elements.
	initControls : function() {
		if (ngLightbox.controlsInitialized) return;
		ngLightbox.controlsInitialized = true;

		// add style sheet
		GM_addStyle(ngLightbox.data.styleSheet.replace(/\$(\w+)\$/g, function(m, n) { return ngLightbox.data[n] || m; }));

		function _(text) { return ngLightbox.text.get(text); }

		function build(data) {
			if ('string' == typeof data) { // create text node
				var element = document.createTextNode(data);
			} else { // create element
				var element    = data[0];
				var attributes = data[1] || {};
				var children   = data.slice(2, data.length);

				if ('string' == typeof element) {
					element = document.createElement(element);
				}

				// set attributes and events
				for (var name in attributes) {
					if (attributes.hasOwnProperty(name)) {
						var value = attributes[name];
						var eventType = (name.match(/^on(.*)$/) || [])[1];
						if (eventType) {
							ngLightbox.addEvent(element, eventType, value, false);
						} else {
							element.setAttribute(name, value);
						}
					}
				}

				// append childs
				for (var i = 0; i < children.length; ++i) {
					element.appendChild(build(children[i]));
				}
			}
			return element;
		}

		var listeners = ngLightbox.eventListeners;

		build([ document.body, {},
			[ 'div', { id:'ngLightboxOverlay',
					   onclick:ngLightbox.hide,
					   onmousemove:listeners.imageDragMove },
				[ 'div', { id:'ngLightboxBackground' } ],
				[ 'div', { id:'ngLightboxMenu',
						   onclick:listeners.menuBarClick },
					[ 'div', { id:'ngLightboxCaption' } ],
					[ 'div', { id:'ngLightboxButtons' },
						[ 'a', { id:'ngLightboxButtonPlus',
								 title:_('magnify'),
								 onclick:listeners.magnifyButtonClick }, '+' ],
						[ 'a', { id:'ngLightboxButtonMinus',
								 title:_('shrink'),
								 onclick:listeners.shrinkButtonClick }, '-' ],
						[ 'a', { id:'ngLightboxButtonDefaultSize',
								 title:_('defaultSize'),
								 onclick:listeners.defaultSizeButtonClick }, '1:1' ],
						[ 'a', { id:'ngLightboxButtonFitToScreen',
								 title:_('fitToScreen'),
								 onclick:listeners.fitToScreenButtonClick }, '\u2750' ],
						[ 'a', { id:'ngLightboxButtonRotateLeft',
								 title:_('rotateLeft'),
								 onclick:listeners.rotateLeftButtonClick }, '\u21ba' ],
						[ 'a', { id:'ngLightboxButtonRotateRight',
								 title:_('rotateRight'),
								 onclick:listeners.rotateRightButtonClick }, '\u21bb' ],
						'\u00a0\u00a0', // &nbsp;&nbsp;
						[ 'a', { id:'ngLightboxButtonLeft',
								 title:_('next'),
								 onclick:listeners.nextButtonClick }, '\u2190' ],
						[ 'a', { id:'ngLightboxButtonSlide',
								 title:_('slideshow'),
								 onclick:listeners.slideShowButtonClick },
							[ 'span', { id:'ngLightboxSlideStart' }, '\u25b6' ],
							[ 'span', { id:'ngLightboxSlideStop' }, '\u25ae\u25ae' ] ],
						[ 'a', { id:'ngLightboxButtonRight',
								 title:_('previous'),
								 onclick:listeners.previousButtonClick }, '\u2192' ],
						'\u00a0\u00a0', // &nbsp;&nbsp;
						[ 'a', { id:'ngLightboxButtonContext' }, _('context') ],
						[ 'div', { id:'ngLightboxExButtons' } ] ] ],
				[ 'div', { id:'ngLightboxLoading' },
					[ 'img', { src:ngLightbox.data.loadingIcon } ],
					[ 'p', { id:'ngLightboxLoadingText' }, _('loading') ],
					[ 'p', { id:'ngLightboxLoadingHelp' }, _('loadingSub') ] ],
				[ 'div', { id:'ngLightboxError' },
					[ 'p', { id:'ngLightboxErrorMessage' }, _('error') ],
					[ 'a', { id:'ngLightboxErrorContext' }, _('context') ] ],
				[ 'div', { id:'ngLightboxBox' },
					[ 'div', { id:'ngLightboxImageContainer' },
						[ 'img', { id:'ngLightboxImage',
								   onload:listeners.loaderDone,
								   onmousedown:listeners.imageDragStart,
								   onmouseup:listeners.imageDragEnd,
								   onDOMMouseScroll:listeners.imageMouseScroll,
								   onclick:ngLightbox.stopEvents } ] ],
					[ 'div', { id:'ngLightboxLeftArrow',
							   title:_('next'),
							   onclick:listeners.nextButtonClick },
						[ 'img', { class:'ngLightboxArrowTransImage' } ],
						[ 'div', { class:'ngLightboxArrowBox' },
							[ 'div', { class:'ngLightboxArrowTip' } ] ] ],
					[ 'div', { id:'ngLightboxRightArrow',
							   title:_('previous'),
							   onclick:listeners.previousButtonClick },
						[ 'img', { class:'ngLightboxArrowTransImage' } ],
						[ 'div', { class:'ngLightboxArrowBox' },
							[ 'div', { class:'ngLightboxArrowTip' } ] ] ] ],
				[ 'div', { id:'ngLightboxSize' } ],
				[ 'img', { id:'ngLightboxPreload',
						   onload:listeners.preloaderDone,
						   onerror:listeners.preloaderError } ],
				[ 'img', { id:'ngLightboxPrefetch',
						   onload:listeners.prefetchDone,
						   onerror:listeners.prefetchError } ] ] ]);

		// enable slideshow
		if (ngLightbox.timerEnabled) {
			var objMenuButtonSlide = document.getElementById('ngLightboxButtonSlide');
			objMenuButtonSlide.style.display = 'inline-block';
		}
	},

// event listeners {{{2

	eventListeners : {

		// Runs onunload to clear up possible memory leaks.
		windowUnload : function() {
			var events = ngLightbox.events;
			ngLightbox.events = [];
			for (var i = events.length; 0 <= --i;) {
				var e = events[i];
				if (e) e[0].removeEventListener(e[1], e[2], e[3]);
			}
		},

		windowResize : function() {
			if (ngLightbox.isSlideShow) {
				var objLightbox = document.getElementById('ngLightboxBox');
				var objLoading  = document.getElementById('ngLightboxLoading');
				var objError    = document.getElementById('ngLightboxError');
				var view        = ngLightbox.getView();
				ngLightbox.center(objLightbox, { view:view });
				ngLightbox.center(objLoading,  { view:view });
				ngLightbox.center(objError,    { view:view });
			}
		},

		// Handles key down.
		captureKeyDown : function(event) {
			if (!ngLightbox.isShowing || event.altKey) return true;

			var HANDLED        = 1;
			var STOP_SLIDESHOW = 2;
			var handled = false;
			var keycode = event.keyCode;
			var key_or_keycode = (48 <= keycode && keycode <= 57 || 65 <= keycode && keycode <= 90) ? String.fromCharCode(keycode).toLowerCase() : keycode;
			var invert = event.shiftKey ? -1 : 1;

			if (event.ctrlKey) { // with <CTRL>
				switch (key_or_keycode) {
					// move to view left
					case 37:    // <LEFT> (firefox)
					case 63234: // <LEFT> (safari)
						ngLightbox.imageScrollTo({ left:100 * invert, relative:true, steps:1 });
						handled = STOP_SLIDESHOW;
						break;
					// move to view right
					case 39:    // <RIGHT> (firefox)
					case 63235: // <RIGHT> (safari)
						ngLightbox.imageScrollTo({ left:-100 * invert, relative:true, steps:1 });
						handled = STOP_SLIDESHOW;
						break;
					// move to view up
					case 38:    // <UP> (firefox)
					case 63232: // <UP> (safari)
						ngLightbox.imageScrollTo({ top:100 * invert, relative:true, steps:1 });
						handled = STOP_SLIDESHOW;
						break;
					// move to view down
					case 40:    // <DOWN> (firefox)
					case 63233: // <DOWN> (safari)
						ngLightbox.imageScrollTo({ top:-100 * invert, relative:true, steps:1 });
						handled = STOP_SLIDESHOW;
						break;
					// open original page
					case 13:    // <ENTER>
						GM_openInTab(ngLightbox.currentAddress);
						handled = STOP_SLIDESHOW;
						break;
				}

			} else { // without <CTRL>
				switch (key_or_keycode) {
					// nop
					case 9:     // <TAB>
						handled = HANDLED;
						break;
					// close lightbox
					case 'x':
					case 27:    // <ESC>
						if (!ngLightbox.isSlideShow) {
							ngLightbox.hide();
						}
						handled = STOP_SLIDESHOW;
						break;
					// rotate
					case 'r':
						ngLightbox.resize('=', true, 90 * invert);
						handled = STOP_SLIDESHOW;
						break;
					// increase size
					case 43:    // '+'
					case 107:   // '+' key (keypad)
					case 61:    // '+' key (firefox)
					case 187:   // '+' key (ie)
					case 38:    // <UP> (firefox)
					case 63232: // <UP> (safari)
						ngLightbox.resize(15);
						handled = STOP_SLIDESHOW;
						break;
					// decrease size
					case 45:    // '-'
					case 109:   // '-' key (firefox)
					case 189:   // '-' key (ie)
					case 40:    // <DOWN> (firefox)
					case 63233: // <DOWN> (safari)
						ngLightbox.resize(-15);
						handled = STOP_SLIDESHOW;
						break;
					// set to screen fit size
					case '0':
						ngLightbox.resize('=');
						handled = STOP_SLIDESHOW;
						break;
					// set to default size
					case '1':
						ngLightbox.resize();
						handled = STOP_SLIDESHOW;
						break;
					// move to next
					case 'n':
					case 37:    // <LEFT> (firefox)
					case 63234: // <LEFT> (safari)
						ngLightbox.showNext(-1);
						handled = STOP_SLIDESHOW;
						break;
					// move to previous
					case 'p':
					case 39:    // <RIGHT> (firefox)
					case 63235: // <RIGHT> (safari)
						ngLightbox.showNext(1);
						handled = STOP_SLIDESHOW;
						break;
					// move to last direction
					case 32:    // <SPACE>
						ngLightbox.showNext();
						handled = STOP_SLIDESHOW;
						break;
					// move to backward direction
					case 8:     // <BACKSPACE>
						ngLightbox.showPrevious();
						handled = STOP_SLIDESHOW;
						break;
					// start or stop slide show
					case 's':
						ngLightbox.toggleSlideShow();
						handled = HANDLED;
						break;
					// move to image top or left
					case 36:    // <HOME>
						ngLightbox.imageScrollTo('head');
						handled = STOP_SLIDESHOW;
						break;
					// move to image bottom or right
					case 35:    // <END>
						ngLightbox.imageScrollTo('last');
						handled = STOP_SLIDESHOW;
						break;
					// move to image up or left
					case 33:    // <PAGEUP>
						ngLightbox.imageScrollTo('down');
						handled = STOP_SLIDESHOW;
						break;
					// move to image down or right
					case 34:    // <PAGEDOWN>
						ngLightbox.imageScrollTo('up');
						handled = STOP_SLIDESHOW;
						break;
					// open original page
					case 13:    // <ENTER>
						window.location.href = ngLightbox.currentAddress;
						handled = STOP_SLIDESHOW;
						break;
				}
			}

			if (handled) {
				if (STOP_SLIDESHOW == handled)
					ngLightbox.stopSlideShow();
				ngLightbox.stopEvents(event);
				ngLightbox.keyHandled = true;
				return false;
			}
			ngLightbox.keyHandled = false;
			return true;
		},

		// Handles key press.
		captureKeyPress : function(event) {
			if (ngLightbox.isShowing && ngLightbox.keyHandled) {
				ngLightbox.stopEvents(event);
				return false;
			}
			return true;
		},

		// Handles key up.
		captureKeyUp : function(event) {
			if (ngLightbox.isShowing && ngLightbox.keyHandled) {
				ngLightbox.stopEvents(event);
				return false;
			}
			ngLightbox.keyHandled = false;
			return true;
		},

		// Handle global mouse click.
		captureClick : function(event) {
			if (!ngLightbox.isShowing && 0 === event.button) {
				var link = ngLightbox.findLink(event);
				ngLightbox.log('captureClick: link', link);
				if (link && (ngLightbox.requireUpdate || !link.rel || !(/lightbox/i).test(link.rel))) {
					if (ngLightbox.findSearchDefForLink(link)) {
						ngLightbox.updateAllImageLinks();
					}
				}
			}
			return true;
		},

		// Handle global load event.
		// checking Auto Pager, AutoPagerize or other dynamic loading page
		captureLoad : function(event) {
			var id = event.target.id || '';
			if (0 !== id.indexOf('ngLightbox')) {
				ngLightbox.requireUpdate = true;
			}
			return true;
		},

		// Handle image link clicked.
		imageLinkClick : function(event) {
			// let shift+click and ctrl+click (but not ctrl+shift+click) through without lightbox
			if (!event.shiftKey && !event.ctrlKey || (event.shiftKey && event.ctrlKey)) {
				var link = ngLightbox.findLink(event);
				if (link) {
					ngLightbox.stopEvents(event);

					// make ctrl+shift+click follow link without lightbox
					if (event.shiftKey && event.ctrlKey) {
						window.location.href = link.href;
					} else {
						ngLightbox.showFrom(link);
					}
					return false;
				}
			}
			return true;
		},

		magnifyButtonClick : function(event) {
			ngLightbox.stopEvents(event);
			ngLightbox.stopSlideShow();
			ngLightbox.resize(15);
		},

		shrinkButtonClick : function(event) {
			ngLightbox.stopEvents(event);
			ngLightbox.stopSlideShow();
			ngLightbox.resize(-15);
		},

		defaultSizeButtonClick : function(event) {
			ngLightbox.stopEvents(event);
			ngLightbox.stopSlideShow();
			ngLightbox.resize(0);
		},

		fitToScreenButtonClick : function(event) {
			ngLightbox.stopEvents(event);
			ngLightbox.stopSlideShow();
			ngLightbox.resize('=');
		},

		rotateLeftButtonClick : function(event) {
			ngLightbox.stopEvents(event);
			ngLightbox.stopSlideShow();
			ngLightbox.resize('=', true, -90);
		},

		rotateRightButtonClick : function(event) {
			ngLightbox.stopEvents(event);
			ngLightbox.stopSlideShow();
			ngLightbox.resize('=', true, 90);
		},

		nextButtonClick : function(event) {
			ngLightbox.stopEvents(event);
			ngLightbox.stopSlideShow();
			ngLightbox.showNext(-1);
		},

		previousButtonClick : function(event) {
			ngLightbox.stopEvents(event);
			ngLightbox.stopSlideShow();
			ngLightbox.showNext(1);
		},

		slideShowButtonClick : function(event) {
			ngLightbox.stopEvents(event);
			ngLightbox.toggleSlideShow();
		},

		menuBarClick : function(event) {
			ngLightbox.stopEvents(event);
			event.target.blur();

			// open link, if exists href attribute
			if ( 'A' == event.target.nodeName.toUpperCase() && event.target.getAttribute('href') ) {
				ngLightbox.stopSlideShow();
				if (event.ctrlKey) {
					GM_openInTab(event.target.href);
				} else {
					window.location.href = event.target.href;
				}
			}
		},

		// Start image dragging.
		imageDragStart : function(event) {
			ngLightbox.stopSlideShow();
			if (ngLightbox.isDragging || !event || 0 !== event.button || event.ctrlKey || event.shiftKey) {
				ngLightbox.isDragMoved = true;
				ngLightbox.eventListeners.imageDragEnd();
				return true;
			}

			ngLightbox.isDragging = true;
			ngLightbox.isDragMoved = false;
			var objLightbox = document.getElementById('ngLightboxBox');
			var objImage    = document.getElementById('ngLightboxImage');
			var view        = ngLightbox.getView();
			var pageX = view.left + (event.screenX || event.clientX);
			var pageY = view.top  + (event.screenY || event.clientY);
			var offset = ngLightbox.getElementOffset(objLightbox);
			ngLightbox.dragData = {
				X : pageX - offset.left,
				Y : pageY - offset.top,
				pageX : pageX,
				pageY : pageY,
				startAt : new Date().getTime()
			};
			objImage.style.cursor = 'move';

			ngLightbox.stopEvents(event);
			return false;
		},

		// End image dragging.
		imageDragEnd : function(event) {
			if (!event || 0 !== event.button || !ngLightbox.isDragging) return true;

			ngLightbox.isDragging = false;
			var objImage = document.getElementById('ngLightboxImage');
			objImage.style.cursor = '';
			var buttonDownTime = new Date().getTime() - ngLightbox.dragData.startAt;
			if (!ngLightbox.isDragMoved && buttonDownTime < 800 /* milliseconds */) {
				ngLightbox.hide();
			}

			ngLightbox.stopEvents(event);
			return false;
		},

		// Tracking image dragging.
		imageDragMove : function(event) {
			if (!ngLightbox.isDragging) return true;

			var objLightbox = document.getElementById('ngLightboxBox');
			var view = ngLightbox.getView();
			var pageX = view.left + (event.screenX || event.clientX);
			var pageY = view.top  + (event.screenY || event.clientY);
			var dragData = ngLightbox.dragData;
			if (ngLightbox.isDragMoved || 2 < Math.abs(dragData.pageX - pageX) || 2 < Math.abs(dragData.pageY - pageY)) {
				objLightbox.style.left = (pageX - dragData.X) + 'px';
				objLightbox.style.top  = (pageY - dragData.Y) + 'px';
				ngLightbox.isDragMoved = true;
			}

			ngLightbox.stopEvents(event);
			return false;
		},

		// Resize by mouse wheel scroll.
		imageMouseScroll : function(event) {
			if (ngLightbox.isShowing) {
				ngLightbox.stopEvents(event);
				var wheel = (-event.detail) || (event.wheelDelta / 40);
				ngLightbox.resize(wheel);
				return false;
			}
			return true;
		},

		prefetchDone : function() {
			ngLightbox.prefetchFallbackFunction = null;
			var objPrefetch = document.getElementById('ngLightboxPrefetch');
			ngLightbox.prefetchedImage = objPrefetch.src;
			return false;
		},

		prefetchError : function() {
			var fallbackFunction = ngLightbox.prefetchFallbackFunction;
			ngLightbox.prefetchFallbackFunction = null;
			if (fallbackFunction) fallbackFunction();
			return false;
		},

		preloaderDone : function() {
			ngLightbox.preloadFallbackFunction = null;
			if (ngLightbox.isShowing) {
				var objLightbox = document.getElementById('ngLightboxBox');
				var objImage    = document.getElementById('ngLightboxImage');
				var objImages   = objLightbox.getElementsByClassName('ngLightboxArrowTransImage');
				var objPreload  = document.getElementById('ngLightboxPreload');

				var done = function() {
					objLightbox.style.display = 'none';
					objImage.src = ngLightbox.currentImage;
					for (var i = 0; i < objImages.length; ++i)
						objImages[i].src = ngLightbox.currentImage;
					objPreload.removeAttribute('src');
				};

				if (ngLightbox.isSlideShow && 'none' != objLightbox.style.display) {
					ngLightbox.fadeElement(objLightbox, { from:1, onfinish:done });
				} else {
					done();
				}
			}
			return false;
		},

		preloaderError : function() {
			var fallbackFunction = ngLightbox.preloadFallbackFunction;
			ngLightbox.preloadFallbackFunction = null;
			if (ngLightbox.isShowing) {
				var objPreload = document.getElementById('ngLightboxPreload');

				if (objPreload.getAttribute('src')) {
					objPreload.removeAttribute('src');

					if (fallbackFunction) {
						fallbackFunction();
					} else {
						// Displays error message when no image can be found.
						ngLightbox.showMessage(ngLightbox.text.get('error'), ngLightbox.currentAddress);

						if (ngLightbox.isSlideShow) {
							var interval = ngLightbox.slideShowErrorSkipTime * 1000; // msec
							ngLightbox.slideShowTimerID = setTimeout(function() { ngLightbox.showNext(); }, interval);
						}
					}
				}
			}
			return false;
		},

		loaderDone : function() {
			if (ngLightbox.isShowing) {
				var objLightbox  = document.getElementById('ngLightboxBox');
				var objImage     = document.getElementById('ngLightboxImage');
				var objCaption   = document.getElementById('ngLightboxCaption');
				var objContext   = document.getElementById('ngLightboxButtonContext');
				var objExButtons = document.getElementById('ngLightboxExButtons');

				objCaption.innerHTML = '';
				objCaption.appendChild(document.createTextNode(ngLightbox.currentCaption));

				if (ngLightbox.currentContext) {
					objContext.setAttribute('href', ngLightbox.currentContext);
				} else {
					objContext.removeAttribute('href');
				}

				while (objExButtons.hasChildNodes())
					objExButtons.removeChild(objExButtons.firstChild);
				var exLinks = ngLightbox.currentExLinks || [];
				for (var i = 0; i < exLinks.length; ++i) {
					var exLink = exLinks[i];
					var button = document.createElement('a');
					button.href = exLink.href;
					button.appendChild(document.createTextNode(exLink.text || i));
					if (undefined !== exLink.title)
						button.setAttribute('title', exLink.title);
					objExButtons.appendChild(button);
				}

				objImage.removeAttribute('width');
				objImage.removeAttribute('height');

				objLightbox.style.visibility = 'hidden';
				objLightbox.style.display    = 'block';
				objImage.style.display       = 'block';

				ngLightbox.aspectRatio    = objImage.height / objImage.width;
				ngLightbox.originalHeight = objImage.height;
				ngLightbox.originalWidth  = objImage.width;
				ngLightbox.rotate(0, true);
				ngLightbox.resize('=', true);

				ngLightbox.hideLoadingMessage();

				if (ngLightbox.isSlideShow) {
					ngLightbox.fadeElement(objLightbox, { to:1, onfinish:function(){
						var interval = ngLightbox.slideShowIntervalTime * 1000; // msec
						ngLightbox.slideShowTimerID = setTimeout(function() { ngLightbox.showNext(); }, interval);
					} });
				} else {
					objLightbox.style.visibility = 'visible';
				}
			}
			return false;
		}

	}

// }}}2

};

// ngLightbox.searchDefs {{{1
// searchDefs stores regular expressions used to find and execute functions for image links within the page.
// these are executed in the order that they appear.
//
// **require fields
//  name               : self-explanitory, must be unique (used for internal references)
//  includeRegExp      : regular expression that window.location.href needs to match
//  linkRegExp         : regular expression that link must match
//
// **optional fields
//  excludeLinkRegExp  : regular expression that link must not match
//  findImageRegExp    : regular expression that image must match for replaceString
//  imageInPageRegExp  : regular expression that image-url must sub-match in html
//                       ex.) /<img src="(image/.*?\.jpg)"/
//  replaceString      : replace string used by imageInPageRegExp, findImageRegExp or linkRegExp
//  linkReplaceString  : replace string used by linkRegExp
//  decodeURI          : decode string, after replacing
//  captionXPath       : XPath that caption-text match
//                       ex.) '../div[@class="caption"]/text()'
//  getExLinksFunction : function that create additional link buttons data
//                       ex.) function(linkData) {
//                              return [ {href:linkData.link.href+'?q=new', text:'New', title:'Open New'} ];
//                            }
//  fallbackDefName    : other searchDef name that called when image loading errored
//
// **field priorities
//  (high) imageInPageRegExp
//         findImageRegExp
//         linkReplaceString
//  (low)  replaceString
ngLightbox.searchDefs = [

	// wikipedia (needs to come before 'show') {{{2
	{
		name				: 'wikipedia',
		includeRegExp		: /^https?:\/\/(.*?\.)?wiki(?:pedia|media)\.org/i,
		linkRegExp			: /.*?\/(Fi(le?|xter|txategi|gura|n?ch(ier|eiro))|Fa(il|sciculus)|Dat(oteka|ei)|Delwedd|Dosiero|Be(stand|rkas)|Billede|Skeudenn|Soubor|Slika|Pilt|Archivo|Mynd|Vaizdas|Tiedosto|Larawan|Resim|%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB|%ED%8C%8C%EC%9D%BC|%D7%A7%D7%95%D7%91%D7%A5):.*\.(jpe?g|gif|png|svg)$/i,
		findImageRegExp		: /(.+?)\/thumb\/(.+?)\.(jpe?g|gif|png|svg).*$/i,
		replaceString		: '$1/$2.$3'
	},

	// ITmedia (needs to come before 'show') {{{2
	// *** send fake referrer
	{
		name				: 'itmedia',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^(http:\/\/image\.itmedia\.co\.jp\/)(?:l\/im\/)?(.*\.jpg)$/,
		replaceString		: '$1$2'
	},

	// Mynavi (needs to come before 'show') {{{2
	{
		name				: 'mynavi',
		includeRegExp		: /^http:\/\/(?:[^\/]*\.)*mynavi\.jp\//,
		linkRegExp			: /\/photo\//,
		replaceString		: '/'
	},

	// cocolog (needs to come before 'show') {{{2
	{
		name				: 'cocolog',
		includeRegExp		: /^http:\/\/(?:[^\/]*\.)*cocolog-nifty\.com\//,
		linkRegExp			: /\/\.shared\/image\.html\?\//,
		replaceString		: '/'
	},

	// regular links to images {{{2
	{
		name				: 'show',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /[^?]*?\.(jpe?g|gif|png|bmp)(\?[a-z0-9=_-]*)?$/i
	},

	// javascript link {{{2
	{
		name				: 'javascript',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^javascript:.*'([^']*?\.(?:jpe?g|gif|png))'.*$/i,
		replaceString		: '$1'
	},

	// imagesocket {{{2
	{
		name				: 'imagesocket',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^https?:\/\/(?:.*?\.)?imagesocket\.com\/((?:[a-z]+\/){1,2}\d+)(?:\/|$)/i,
		imageInPageRegExp	: /\.attr\('src',\s*'(http:[^']+)'\)\.load/,
		replaceString		: '$1'
	},

	// twimg {{{2
	{
		name				: 'twimg',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^https?:\/\/(?:t\.co\/\w+|twitter.com\/.*\/photo\/[0-9]+)/i,
		findImageRegExp		: /^https?:\/\/p\.twimg\.com\/[^:]+/i,
		replaceString		: '$&:large'
	},

	// twitpic {{{2
	{
		name				: 'twitpic',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^(http:\/\/(?:www\.)?twitpic\.com\/\w+).*$/i,
		linkReplaceString	: '$1/full',
		imageInPageRegExp	: /<img(?=[^>]*src="(http:[^"]*large[^"]*)").*?>/,
		replaceString		: '$1'
	},
	{
		name				: 'twitpic2',
		includeRegExp		: /^http:\/\/(?:www\.)?twitpic\.com\//i,
		linkRegExp			: /^(\/(?!(?:upload|photos|tag|account|logout)\b)\w+).*$/i,
		linkReplaceString	: '$1/full',
		imageInPageRegExp	: /<img(?=[^>]*src="(http:[^"]*large[^"]*)").*?>/,
		replaceString		: '$1'
	},

	// lockerz(plixi,tweetphoto) {{{2
	{
		name				: 'lockerz',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/(?:www\.)?(?:lockerz|plixi|tweetphoto)\.com\/(?:[sp]\/)?(\d+)/i,
		replaceString		: 'http://api.plixi.com/api/tpapi.svc/imagefromurl?size=big&url=$&'
	},

	// movapic {{{2
	{
		name				: 'movapic',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/movapic.com\/pic\/([^\/]+)$/i,
		replaceString		: 'http://image.movapic.com/pic/m_$1.jpeg'
	},

	// twipple {{{2
	{
		name				: 'twipple',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^(http:\/\/p\.twipple.jp)\/(\w)(\w)(\w)(\w)(\w)$/i,
		replaceString		: '$1/data/$2/$3/$4/$5/$6.jpg'
	},

	// mobypicture {{{2
	{
		name				: 'mobypicture',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/(?:(?:www\.)?mobypicture\.com|moby\.to)\/(?!user|home|groups|mobileapps|login|logout|signup|iphoneapp)\w+$/i,
		replaceString		: '$&:full'
	},
	{
		name				: 'mobypicture2',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^(http:\/\/(?:(?:www\.)?mobypicture\.com|moby\.to)\/user\/[^\/]+\/view\/\d+).*$/i,
		linkReplaceString	: '$1/sizes/full',
		imageInPageRegExp	: /<a\b(?=[^>]*\bclass="original")(?=[^>]*\bhref="(http:[^"]+)")(?:[^>"]|"[^"]*")*>/,
		replaceString		: '$1'
	},

	// Hatena Fotolife {{{2
	{
		name				: 'f.hatena',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/f\.hatena\.ne\.jp\/[^\/]*\/\d+/i,
		imageInPageRegExp	: /<img\b(?=[^>]*\bclass="foto")(?=[^>]*\bsrc="(http:[^"]+)\.jpg").*?>(?:[\s\S]*<a\b(?=[^>]*\bhref="http:[^"]*(_original)\.jpg").*?>)?/,
		replaceString		: '$1$2.jpg'
	},

	// yfrog {{{2
	{
		name				: 'yfrog',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/yfrog\.com\/(?:z\/)?(\w+)/i,
		linkReplaceString	: 'http://yfrog.com/z/$1',
		imageInPageRegExp	: /<div\b(?=[^>]*\bid="the-image")[\s\S]*?<img(?=[^>]*\bsrc="(http:[^"]+)").*?>/,
		replaceString		: '$1'
	},

	// BIG CANVAS PhotoShare {{{2
	{
		name				: 'bcphotoshare',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/(?:www\.)?bcphotoshare\.com\/photos\/\d+\/(\d+)/i,
		replaceString		: 'http://images.bcphotoshare.com/storages/$1/large.jpg'
	},
	{
		name				: 'bcphotoshare2',
		includeRegExp		: /^http:\/\/(?:www\.)?bcphotoshare\.com\//i,
		linkRegExp			: /^\/photos\/\d+\/(\d+)/i,
		replaceString		: 'http://images.bcphotoshare.com/storages/$1/large.jpg'
	},
	{
		name				: 'bcphotoshare3',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/bctiny\.com\/\w+/i,
		imageInPageRegExp	: /<img(?=[^>]*\bsrc="(http:[^"]+\/large.jpg)").*?>/,
		replaceString		: '$1'
	},

	// twitgoo {{{2
	{
		name				: 'twitgoo',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/twitgoo\.com\/\d\w+$/i,
		imageInPageRegExp	: /<img\b(?=[^>]*\bid="fullsize")(?=[^>]*\bsrc="([^"]+?)").*?>/,
		replaceString		: '$1'
	},

	// img.ly {{{2
	{
		name				: 'img.ly',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/img\.ly\/\d\w+$/i,
		imageInPageRegExp	: /<img\b(?=[^>]*\bid="the-image")(?=[^>]*\bsrc="([^"]+?)\/\w+\.(jpg|png|gif)").*?>/,
		replaceString		: '$1/original.$2'
	},
	{
		name				: 'img.ly2',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/img\.ly\/images\/\d+\/full$/i,
		imageInPageRegExp	: /<div\b(?=[^>]*\bid="image-full")[\s\S]*?<img\b(?=[^>]*\bsrc="([^"]+?)").*?>/,
		replaceString		: '$1'
	},

	// ow.ly {{{2
	{
		name				: 'ow.ly',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/ow\.ly\/i\/(\w+)/i,
		replaceString		: 'http://static.ow.ly/photos/original/$1.jpg'
	},

	// Instagram {{{2
	{
		name				: 'instagram',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^(http:\/\/instagr\.am\/p\/\w+).*/i,
		replaceString		: '$1/media/?size=l'
	},

	// PHOTOZOU {{{2
	{
		name				: 'photozou',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/photozou\.jp\/photo\//i,
		imageInPageRegExp	: /<div\b(?=[^>]*\b(?:id="indivi_media"|class="align_center"))[\s\S]*?<img\b(?=[^>]*\bsrc="([^"]+?\d+)(?:_org)?(\.v\d+\.\w+)").*?>/,
		replaceString		: '$1_org$2'
	},

	// search engine images (google) {{{2
	{
		name				: 'google',
		resetEverytime		: true,
		includeRegExp		: /^https?:\/\/(.*?\.)?google\.(?:com|co\.\w+)\//i,
		linkRegExp			: /.*?imgurl=(http(s?):\/\/)?(.*?)&.*/i,
		replaceString		: 'http$2://$3',
		captionXPath		: 'ancestor::table//td[@id=concat("tDataText",substring-after(current()/parent::td/@id,"tDataImage"))]//text()'
	},

	// search engine images (yahoo, ask jeeves, blingo) {{{2
	{
		name				: 'search',
		includeRegExp		: /^https?:\/\/(.*?\.)?(search\.yahoo\.com|blingo\.com\/images)/i,
		linkRegExp			: /.*?(image|img)(ur[il]|src)=(http(s?):\/\/)?(.*?)&.*/i,
		replaceString		: 'http$4://$5'
	},

	// flickr {{{2
	{
		name				: 'flickr',
		includeRegExp		: /^https?:\/\/(.*?\.)?flickr\.com/i,
		linkRegExp			: /\/photos\/[^\/]+\/[0-9]+/i,
		findImageRegExp		: /_[tsm]\.jpg/i,
		replaceString		: '_b.jpg'
	},
	{
		name				: 'flickr2',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^(https?:\/\/(?:(?:.*?\.)?flickr\.com\/photos\/[^\/]+\/[0-9]+|flic\.kr\/p\/[a-z1-9]+$)).*$/i,
		linkReplaceString	: '$1',
		imageInPageRegExp	: /<div\b(?=[^>]*\b(?:class="photo-div"|id="allsizes-photo"))[\s\S]*?<img\b(?=[^>]*\bsrc="([^"]+?)(?:_[tsmbz]|)\.(jpg|png|gif)").*?>/,
		replaceString		: '$1_b.$2'
	},

	// myspace {{{2
	{
		name				: 'myspace1',
		includeRegExp		: /^https?:\/\/(.*?\.)?myspace\.com/i,
		linkRegExp			: /imageID=[0-9]+/i,
		findImageRegExp		: /m_(.+)\.jpg/i,
		replaceString		: 'l_$1.jpg'
	},
	{
		name				: 'myspace2',
		includeRegExp		: /^https?:\/\/(.*?\.)?myspace\.com/i,
		linkRegExp			: /imageID/i,
		findImageRegExp		: /_m/i,
		replaceString		: '_l'
	},

	// deviantart {{{2
	{
		name				: 'deviantart',
		includeRegExp		: /^https?:\/\/(.*?\.)?deviantart\.com/i,
		linkRegExp			: /deviantart\.com\/(deviation|print|art)\/.+/i,
		findImageRegExp		: /^http(s)?:\/\/(?![a-z]+\.).*?\.deviantart\.(com|net)\/([^\/]*)\/[^\/]*\/(.*?\.(?:jpe?g|gif|png))$/i,
		replaceString		: 'http$1://fc01.deviantart.$2/$3/$4'
	},

	// gmail {{{2
	{
		name				: 'gmail',
		resetEverytime		: true,
		includeRegExp		: /^https?:\/\/mail\.google\.\w+\//i,
		linkRegExp			: /^(\?.*?\bview=att\b.*?\bdisp=)inline\b(.*)$/i,
		replaceString		: '$1emb$2'
	},

	// imagefap {{{2
	{
		name				: 'imagefap',
		includeRegExp		: /^https?:\/\/(.*?\.)?imagefap\.com/i,
		linkRegExp			: /(image.php\?id=|gallery\/)[0-9]+/i,
		findImageRegExp		: /\/images\/(thumb|mini)\/([0-9]+)\/([0-9]+)\/([0-9]+)\.jpg/i,
		replaceString		: '/full/$2/$3/$4.jpg'
	},

	// ffffound! {{{2
	{
		name				: 'ffffound',
		includeRegExp		: /^https?:\/\/(.*?\.)?ffffound\.com/i,
		linkRegExp			: /\/image\/[\w]+$/i,
		findImageRegExp		: /img(-thumb)?\.ffffound\.com\/static-data\/assets\/([\w\/]+?)_[\w]+\.(jpe?g|gif|png)$/i,
		replaceString		: 'img.ffffound.com/static-data/assets/$2.$3'
	},

	// ImageShack! {{{2
	{
		name				: 'imageshack',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/(?:img\d+.imageshack\.us\/[if]|imageshack\.us\/photo\/my-images\/\d+)\/\w+\.(?:jpg|gif|png)\/$/i,
		imageInPageRegExp	: /<img\b(?=[^>]*\bid="(?:main_image|fullimg)")(?=[^>]*\bsrc="(http:\/\/[^"]+)")(?:[^>"]|"[^"]*")*>/,
		replaceString		: '$1'
	},

	// IMAGEBAM {{{2
	// *** remove referrer
	{
		name				: 'imagebam',
		includeRegExp		: /./, // used on every page
		linkRegExp			: /^http:\/\/www\.imagebam\.com\/image\/\w+$/i,
		imageInPageRegExp	: /<img\b(?=[^>]*\bsrc="(http:\/\/\d+\.imagebam.com\/dl\.php\?[^"]+)")(?:[^>"]|"[^"]*")*>/,
		replaceString		: '$1'
	},

	// Tumblr {{{2
	// *** send fake referrer
	{
		name				: 'tumblr',
		includeRegExp		: /^http:\/\/(?:[^.\/]+\.)?tumblr\.com\//,
		linkRegExp			: /^(http:\/\/(?:[^.\/]+\.)?tumblr\.com\/photo)\/\d+\/(.*)$/i,
		replaceString		: '$1/1280/$2'
	},

	// Amazon {{{2
	{
		name				: 'amazon',
		includeRegExp		: /^http:\/\/(?:[^.\/]+\.)?amazon\.(?:at|ca|cn|co\.jp|co\.uk|com|de|fr)\//i,
		linkRegExp			: /\/(?:images|customer-media)\//,
		findImageRegExp		: /^http:\/\/ec.\.images-amazon\.com\/images\/I\/([\w-]+?)\._\w+_\.jpg$/i,
		replaceString		: 'http://ec2.images-amazon.com/images/I/$1.jpg'
	},

	// Yahoo! Auction Japan {{{2
	{
		name				: 'yauctionjp',
		includeRegExp		: /^http:\/\/[^\/]*?auction[^\/]*\.yahoo\.co\.jp\/(?:jp\/)?(?:user|(?:str)?search|.*-category\.html|list|show\/mystatus)/i,
		linkRegExp			: /^(?:http:\/\/ord\.yahoo\.co\.jp\/.*\*-)?http(?::|%3A)\/\/(?:.*?\.)?auctions\.yahoo\.co\.jp\/jp\//,
		findImageRegExp		: /\.yimg\.(?:jp|com)\/.+\.auctions\.yahoo\.co\.jp\/.+\.jpg$/,
		captionXPath		: '../../td[2]/a/text()',
		imageInPageRegExp	: /<img(?= )(?=[^>]* id="imgsrc\d")(?=[^>]* src="([^"]+)").*?>/gm,
		replaceString		: '$1'
	},

	// Yahoo! Photos Japan {{{2
	{
		name				: 'yphotojp',
		includeRegExp		: /^http:\/\/photos\.yahoo\.co\.jp\/ph\//i,
		linkRegExp			: /^http:\/\/photos\.yahoo\.co\.jp\/ph\/[^\/]*\/vwp\?.*/i,
		linkReplaceString	: '$&&.hires=t',
		findImageRegExp		: /(?:)/,
		imageInPageRegExp	: /<img(?= )(?=[^>]* src="(http:\/\/proxy\.[\w.]*\.yahoofs\.jp\/users\/[^"]+)").*?>/,
		replaceString		: '$1'
	},

	// Yahoo! Blog Japan {{{2
	{
		name				: 'yblogjp',
		includeRegExp		: /^http:\/\/blogs\.yahoo\.co\.jp\//i,
		linkRegExp			: /^javascript:popup(?:ImgGal|_img_view)/i,
		findImageRegExp		: /^(?:(.*)_thumb)?(.*)$/,
		replaceString		: '$1$2'
	},

	// danbooru {{{2
	{
		name				: 'danbooru',
		includeRegExp		: /^http:\/\/danbooru\.donmai\.us(\/|$)/i,
		linkRegExp			: /^\/post\/show\/\d+/i,
		imageInPageRegExp	: /href="(http:\/\/danbooru\.donmai\.us\/data\/(?!preview)[^"]+)"/,
		replaceString		: '$1'
	},

	// Pixiv {{{2
	{
		name				: 'pixiv',
		includeRegExp		: /^http:\/\/www\.pixiv\.net\/member_illust\.php\?.*\billust_id=\d+/i,
		linkRegExp			: /\bmember_illust\.php\?.*\bmode=(?!manga).*\billust_id=\d+/i,
		findImageRegExp		: /_(?:s|m|100)(?=\.\w+(?:\?.*)?$)/i,
		replaceString		: '',
		fallbackDefName		: 'pixiv-manga',
		captionXPath		: './h1/text()|..//h2//text()',
		getExLinksFunction	: function(linkData) {
			var id = linkData['link'].href.match(/illust_id=(\d+)/)[1];
			return [ { href:'/bookmark_add.php?type=illust&illust_id=' + id, text:'Bookmark', title:'Bookmark this illust.' } ];
		}
	},
	{
		name				: 'pixiv-list',
		includeRegExp		: /^http:\/\/www\.pixiv\.net\/(?!member_illust\.php\?.*\billust_id=\d+)/i,
		linkRegExp			: /\bmember_illust\.php\?.*\bmode=(?!manga).*\billust_id=\d+/i,
		imageInPageRegExp	: /<img(?= )(?=[^>]* src="([^"]*\.pixiv\.net\/img[^"]*)_m(\.\w+(?:\?[^"]*)?)").*?>/,
		replaceString		: '$1$2',
		fallbackDefName		: 'pixiv-manga',
		captionXPath		: './h1/text()|..//h2//text()',
		getExLinksFunction	: function(linkData) {
			var id = linkData['link'].href.match(/illust_id=(\d+)/)[1];
			return [ { href:'/bookmark_add.php?type=illust&illust_id=' + id, text:'Bookmark', title:'Bookmark this illust.' } ];
		}
	},
	{
		name				: 'pixiv-manga',
		includeRegExp		: /^http:\/\/www\.pixiv\.net\//i,
		linkRegExp			: /\bmember_illust\.php\?.*\b(illust_id=[^&]*)/i,
		linkReplaceString	: 'member_illust.php?mode=manga&$1',
		imageInPageRegExp	: /\bdata-src="(http:\/\/\w+\.pixiv\.net\/img[^"]*)"/ig,
		replaceString		: '$1',
		captionXPath		: './h1/text()|..//h2//text()',
		getExLinksFunction	: function(linkData) {
			var id = linkData['link'].href.match(/illust_id=(\d+)/)[1];
			return [ { href:'/bookmark_add.php?type=illust&illust_id=' + id, text:'Bookmark', title:'Bookmark this illust.' } ];
		}
	},

	// TINAMI {{{2
	{
		name				: 'tinami',
		includeRegExp		: /^http:\/\/www\.tinami\.com\//i,
		linkRegExp			: /\/view\/(\d+)$/i,
		_imageInPageRegExp	: /<img(?=[^>]*\bsrc="(http:\/\/img\.tinami\.com\/[^"]*)")(?=[^>]*\bclass="captify")[^>]*>/,
		_replaceString		: '$1',
		findImageFunction	: function(url, searchDef, listener) {
			var m, matches = [];
			function send(method, data, onload) {
				GM_xmlhttpRequest({
					method: method,
					url: url,
					data: data,
					onload: onload
				});
			}
			send('GET', '', function(r) {
				var html = r.responseText;
				var form = (html.match(/<form(?=[^>]*\bid="open_original_content")[^>]*>([\s\S]*?)<\/form>/) || [])[1];
				if (form) {
					var data = [];
					var reg = /<input(?=[^>]*\bname="([^"]*)")(?=[^>]*\bvalue="([^"]*)")[^>]*>/g;
					while ( (m = reg.exec(form)) )
						data.push(encodeURIComponent(m[1]) + '=' + encodeURIComponent(m[2]));
					send('POST', data.join('&'), function(r) {
						var html = r.responseText;
						var reg = /<img(?=[^>]*\bsrc="(http:\/\/img\.tinami\.com\/[^"]*)")(?=[^>]*\bclass="captify")[^>]*>/;
						if ( (m = reg.exec(html)) ) matches.push(m[1]);
						listener.apply(ngLightbox, matches);
					});
				} else {
					listener.apply(ngLightbox, matches);
				}
			});
		},
		captionXPath		: 'ancestor::li/@original-title'
	},

	// Niconico seiga {{{2
	{
		name				: 'nicoseiga',
		includeRegExp		: /^http:\/\/seiga\.nicovideo\.jp\//i,
		linkRegExp			: /(?:^\/image\/source\?.*\bid=(\d+)\b|(?:.*\.jp)?\/seiga\/im(\d+)\b).*$/i,
		replaceString		: '/image/source?id=$1$2',
		captionXPath		: 'id("main")//div[@class="title_text"]/text()'
	},

	// Impress {{{2
	{
		name				: 'impress1',
		includeRegExp		: /^http:\/\/(?:.*\.)?impress\.co\.jp\//,
		linkRegExp			: /^\/cda\/parts\/image_for_link\//,
		findImageRegExp		: /^(\/cda\/static\/image\/.*?)(?:[-_]?s\.jpg|\.gif)(?:\?.*)?$/i,
		captionXPath		: 'ancestor::tr/following-sibling::tr[1]/td[count(current()/parent::td/preceding-sibling::td)+1]//text()|ancestor::tr/following-sibling::tr[1]/td[1][@colspan]//text()',
		replaceString		: '$1.jpg'
	},
	{
		name				: 'impress2',
		includeRegExp		: /^http:\/\/(?:.*\.)?impress\.co\.jp\//,
		linkRegExp			: /^\/cda\/parts\/image_for_link\//,
		findImageRegExp		: /^(\/cda\/static\/image\/.*?[^s])\.jpg(?:\?.*)?$/i,
		captionXPath		: 'ancestor::tr/following-sibling::tr[1]/td[count(current()/parent::td/preceding-sibling::td)+1]//text()|ancestor::tr/following-sibling::tr[1]/td[1][@colspan]//text()',
		replaceString		: '$1l.jpg'
	},
	{
		name				: 'impress3',
		includeRegExp		: /^http:\/\/(?:.*\.)?impress\.co\.jp\//,
		linkRegExp			: /^(\/img\/.*\/)html\/([^\/]*\.(?:jpg|gif|png))\.html$/,
		captionXPath		: 'ancestor::tr/following-sibling::tr[1]/td[count(current()/parent::td/preceding-sibling::td)+1]//text()|ancestor::tr/following-sibling::tr[1]/td[1][@colspan]//text()',
		replaceString		: '$1$2'
	},
	{
		name				: 'impress4',
		includeRegExp		: /^http:\/\/(?:.*\.)?impress\.co\.jp\//,
		linkRegExp			: /^image\d*\/|^\/img\/|^[^\/]*_\d+r\.html$|^http:.*\/tmp\/blog\//,
		findImageRegExp		: /^(image\d*\/.*?|\/img\/.*?|http:.*\/tmp\/blog\/.*?)_?s?\.(?:jpg|gif|png)(?:\?.*)?$/i,
		captionXPath		: 'ancestor::tr/following-sibling::tr[1]/td[count(current()/parent::td/preceding-sibling::td)+1]//text()|ancestor::tr/following-sibling::tr[1]/td[1][@colspan]//text()',
		replaceString		: '$1.jpg'
	},
	{
		name				: 'impress5',
		includeRegExp		: /^http:\/\/(?:.*\.)?impress\.co\.jp\//,
		linkRegExp			: /^image\d*\/|^\/img\/|^[^\/]*_\d+r\.html$|^http:.*\/tmp\/blog\//,
		findImageRegExp		: /^([^\/]*_\d+)_?s?\.(?:jpg|gif|png)(?:\?.*)?$/i,
		captionXPath		: 'ancestor::tr/following-sibling::tr[1]/td[count(current()/parent::td/preceding-sibling::td)+1]//text()|ancestor::tr/following-sibling::tr[1]/td[1][@colspan]//text()',
		replaceString		: '$1r.jpg'
	},

	// NikkeiBP {{{2
	{
		name				: 'nikkeibp',
		includeRegExp		: /^http:\/\/(?:.*\.)?nikkeibp\.co\.jp\//,
		linkRegExp			: /\?SS=/,
		findImageRegExp		: /^thumb_\d+_(.*)\.(jpg)$/i,
		replaceString		: '$1.$2'
	},

	// Ascii {{{2
	{
		name				: 'ascii',
		includeRegExp		: /^http:\/\/(?:.*\.)?ascii\.jp\//,
		linkRegExp			: /^\/elem\/.*\/img\.html$/,
		imageInPageRegExp	: /<img(?= )(?=[^>]*\bRefBack\b)(?=[^>]* src="(\/elem\/[^"]+)").*?>/,
		replaceString		: '$1'
	},

	// Minkara {{{2
	{
		name				: 'minkara',
		includeRegExp		: /^http:\/\/minkara\.carview\.co\.jp\//,
		linkRegExp			: /^\/image\.aspx\?src=/,
		replaceString		: '',
		decodeURI			: true
	},

	// 4Gamer.net {{{2
	{
		name				: '4gamer',
		includeRegExp		: /^http:\/\/www\.4gamer\.net\//,
		linkRegExp			: /\/screenshot\.html\?num=(\d+)$/,
		replaceString		: '/SS/$1.jpg'
	},

	// famitsu.com {{{2
	{
		name				: 'famitsu',
		includeRegExp		: /^http:\/\/www\.famitsu\.com\//,
		linkRegExp			: /(\/images\/.*)\/([0-9a-f]+)\.html$/,
		replaceString		: '/$1/l_$2.jpg'
	},

	// Sankaku Channel {{{2
	{
		name				: 'sankakuchan',
		includeRegExp		: /^http:\/\/chan\.sankakucomplex\.com\//,
		linkRegExp			: /\/post\/show\/([0-9]+)$/,
		imageInPageRegExp	: /\b(?:src|href)="(http:\/\/cs\.sankakucomplex\.com\/data\/(?!preview)[^"]*)"/,
		replaceString		: '$1'
	}

	// }}}2

]; // ngLightbox.searchDefs

// ngLightbox.data {{{1
ngLightbox.data = {

	// Global css. {{{2
	styleSheet : [
		'#ngLightboxOverlay, #ngLightboxOverlay * { margin:0 !important; padding:0 !important; border:0 none !important; background-color:transparent !important; color:inherit !important; }',
		'#ngLightboxBackground, #ngLightboxOverlay { position:fixed !important; top:0; left:0; z-index:10000000 !important; width:100%; height:100%; overflow:hidden !important; }',
		'#ngLightboxBackground { background-color:#000 !important; opacity:0.8 !important; }',
		'#ngLightboxMenu { position:fixed !important; bottom:-35px; left:0; width:100%; height:53px; z-index:10000100 !important; background-color:#000 !important; text-align:center !important; font-family:"Terbuchet MS", Tahoma, Arial, Verdana, sans-serif !important; overflow:hidden !important; white-space:nowrap !important; opacity:0.2 !important; }',
		'.ngLightboxSlideShow #ngLightboxMenu { opacity:0 !important; }',
		'#ngLightboxMenu:hover { bottom:0; opacity:0.9 !important; }',
		'#ngLightboxCaption { width:100%; height:18px; line-height:18px; font-size:12px !important; z-index:10000400 !important; color:#aaa !important; }',
		'#ngLightboxButtons { height:35px; line-height:33px; font-size:18px !important; z-index:10000400 !important; }',
		'#ngLightboxButtons a { display:inline-block; min-width:33px; height:33px; border:1px solid #000 !important; border-radius:5px !important; cursor:pointer; text-align:center !important; color:#aaa !important; text-decoration:none !important; z-index:10000450 !important; }',
		'#ngLightboxButtons a:hover { border-color:orange !important; background-color:#333 !important; color:#fff !important; }',
		'#ngLightboxSlideStop, .ngLightboxSlideShow #ngLightboxSlideStart { display: none; }',
		'.ngLightboxSlideShow #ngLightboxSlideStop { display: inline; }',
		'#ngLightboxExButtons { display:inline-block; }',
		'#ngLightboxButtonContext, #ngLightboxExButtons a { padding:0 0.5em !important; font-size:14px !important; }',
		'#ngLightboxLoading { position:fixed !important; z-index:10000070 !important; background-color:#000 !important; color:#fff !important; padding:10px !important; border:1px solid #444 !important; border-radius:10px !important; font-weight:bold !important; font-family:"Trebuchet MS", Tahoma, Arial, Verdana, sans-serif !important; text-align:center !important; line-height:2em; opacity:0.8 !important; }',
		'#ngLightboxLoading img { width:64px; height:64px; }',
		'p#ngLightboxLoadingText { padding:25px 0 5px 0 !important; font-size:45px !important; color:#fff !important; font-weight:bold !important; font-family:"Trebuchet MS", Tahoma, Arial, Verdana, sans-serif !important; line-height:1em; text-align:center !important; }',
		'p#ngLightboxLoadingHelp { padding:5px 0 !important; font-weight:normal !important; font-size:11px !important; color:#fff !important; font-family:"Trebuchet MS", Tahoma, Arial, Verdana, sans-serif !important; line-height:1em; text-align:center !important; }',
		'#ngLightboxError { position:fixed !important; z-index:10000050 !important; text-align:center !important; background:#000 !important; color:#aaa !important; padding:10px !important; border:1px solid #444 !important; border-radius:10px !important; font-family:verdana, sans-serif !important; font-size:11px !important; }',
		'p#ngLightboxErrorMessage { color:#fff !important; font-size:45px !important; font-weight:bold !important; margin:10px 20px !important; font-family:"Trebuchet MS", Tahoma, Arial, Verdana, sans-serif !important; text-decoration:none !important; text-align:center !important; }',
		'#ngLightboxError a { color:#aaa !important; text-decoration:none !important; border-bottom:1px solid #777; }',
		'p#ngLightboxErrorContext { display:block; padding:5px 0 !important; font-weight:normal !important; font-size:11px !important; color:#fff !important; font-family:"Trebuchet MS", Tahoma, Arial, Verdana, sans-serif !important; line-height:1em; text-align:center !important; text-decoration:none !important; }',
		'#ngLightboxBox { position:fixed !important; z-index:10000050 !important; }',
		'#ngLightboxImageContainer { position:relative !important; display:inline-block !important; background:#fff !important; -moz-transition:-moz-transform 300ms ease 0s !important; -webkit-transition:-webkit-transform 300ms ease 0s !important; transition:transform 300ms ease 0s !important; }',
		'img#ngLightboxImage, img#ngLightboxPreload, img#ngLightboxPrefetch { max-height:none; max-width:none; }',
		'#ngLightboxSize { position:fixed !important; z-index:10000060 !important; padding:0.2em 1em !important; border-radius:8px !important; background-color:#444 !important; color:#fff !important; font-weight:bold !important; }',
		'#ngLightboxBox .ngLightboxArrowTransImage { display:block; opacity:0 !important; width:100% !important; height:100% !important; }',
		'#ngLightboxBox .ngLightboxArrowBox { display:none; position:fixed !important; left:0; top:45%; z-index:10000060 !important; padding:5px !important; border-radius:5px !important; background-color:#888 !important; box-shadow: 4px 4px 8px 0 #000 !important; }',
		'#ngLightboxLeftArrow, #ngLightboxRightArrow { position:absolute !important; left:0; top:0; width:33%; height:100%; }',
		'#ngLightboxRightArrow, #ngLightboxRightArrow .ngLightboxArrowBox { left:auto; right:0; }',
		'#ngLightboxLeftArrow:hover .ngLightboxArrowBox, #ngLightboxRightArrow:hover .ngLightboxArrowBox { display:block; }',
		'#ngLightboxBox .ngLightboxArrowTip { display:inline-block; width:0; height:0; border:40px solid transparent !important; background-color:transparent !important; }',
		'#ngLightboxLeftArrow .ngLightboxArrowTip { border-right-color:#fff !important; border-right-width:20px !important; border-left-width:0 !important; }',
		'#ngLightboxRightArrow .ngLightboxArrowTip { border-left-color:#fff !important; border-left-width:20px !important; border-right-width:0 !important; }',
		'#ngLightboxBox, #ngLightboxOverlay, #ngLightboxError, #ngLightboxLoading, #ngLightboxSize, #ngLightboxPreload, #ngLightboxPrefetch, a#ngLightboxButtonSlide { display:none; }',
		'a[rel$="ngLightbox"] { cursor:url("$lightboxCursor$") 5 0, auto; }'
	].join(''),

	// Loading animation icon. {{{2
	loadingIcon : [
		'data:image/gif;base64,',
		'R0lGODlhIAAgAPYAAAAAAP///wQEBBwcHCwsLCoqKhAQEAICAggICEZGRpKSkrq6urCwsHZ2digo',
		'KAoKCjg4OLKysvr6+uDg4B4eHhQUFGBgYFhYWAwMDHR0dOTk5MjIyERERCAgICQkJISEhMLCwtbW',
		'1tLS0lZWVoiIiPDw8Nzc3FRUVKioqBISEnh4eN7e3vLy8lJSUuLi4jY2Nujo6PT09NjY2Hp6ejw8',
		'PMDAwOzs7IqKimxsbG5ububm5nJyckhISM7OzkJCQmpqary8vCYmJlpaWj4+PjQ0NDIyMqSkpNra',
		'2nBwcICAgIyMjH5+fvb29kBAQFBQUIKCgmhoaJaWlpSUlEpKSiIiIp6enkxMTE5OToaGhjAwMHx8',
		'fKampszMzDo6OhoaGgYGBg4ODhgYGNTU1JycnKCgoBYWFo6OjgAAAAAAAAAAAAAAAAAAAAAAAAAA',
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+',
		'GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwA',
		'AAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjQeGCCkCjoYpBDQFKYMCHDMElYQeKgw1DA1BkAg5QAmh',
		'ghUfKxK0Jh8VBwcOPBWFFR0PiQIJILTGGwmQALmEKUtGTgiIDxYhxrUW0ocEGyUKBogIFyLXEiEn',
		'lIcVz9GIBwQMLNcMRMrqHsGJBiMLGjYuC4RgeFXoAAYPLVSQ2OEDHMFBCCBkIJGBwwAD6Rwx45Qg',
		'goYSAF+8cmDBAoVBAxSUu5GvUYUnE0zscEhgQbkFvRxRMEJLQc4CDMoxyNkIA5QaC0YMBGCgwQRj',
		'LnBkbGSACBGHyxwo2GBiA4mTDwtS4HAigQOMYQ89eGEhBy97iZg2uoOAQsYEED82xSVigcZSdSRg',
		'GAMyJC6HGi42ZEPUAUUMYyFGKEOAQRtTEiVoRaGCqIKCzLRA+AAgoAiSJCdyYlABg0kJKUQLdtSg',
		'o8eMAbqMwCjRwwK4d0ZqGJkytdCDBDM+WOhwQJwMY0Y8CDrgoUkBy4gEVKiQD4GQI7RKRCcENxQB',
		'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',
		'ToQEAgA7AAAAAAAAAAAA'
	].join(''),

	// Lightbox target link's hover cursor. {{{2
	lightboxCursor : [
		'data:image/png;base64,',
		'iVBORw0KGgoAAAANSUhEUgAAACQAAAAmCAYAAACsyDmTAAAB9ElEQVRYw+WWS04CQRCGayRiIBkT',
		'MZrIQkx8RSWEqDEGX3dx69Kdh3Dhgnu49AKewBVx5YJjTFsFf5O200A3DD0kdvKFmcAw31T1VBWR',
		'eymwxqRAjleogKWwMj4W9sAWpJKihHSU2mCfWWdKRQhlhtA1OGU2mNWihTqgxWwzldhps4U058wu',
		'U4NUGelLogpZ+0lho9eZTeypCtKYRBcy3j4td8DsYG/lXhYSpCBzSDiPEa0WxGR/VfOQMlORTpMY',
		'k8oL5hhSc9cq+88zpGwUKXs5rrmFVC61Shk3z8y9ojwWhB7yrlXOpw8UklrVRFmYWyjRqTI3dZFC',
		'FBqZGEJkRCcreg/NFCVD5p65Qj3KfSLwjpIhdEPDEaVOC2i+s0RI0nWG/lZeRD+bGqVY6fKOkvV2',
		'tdBkFzYr6d6mJtBBqmROOqLhzF3FGxaK11xVQrNtMCeoMTb2nKQCqaFMpOQxUyX4UYqLag5smVCp',
		'Jh62gftM3X96RhoX6mzOCEnaLyGVT1MO7X3WOJx7yxkJ9ft99fSpxqK/jyb0+jW8KT3T4FPOhV6v',
		'NziXT+pSPKH3H6XuPkgdspBIyblGy0QVkpuJjEiJkBawiSb0okXA27ebqEJC95FGxy6iCS3Vaz9D',
		'QfyfQkvROnyngkkENVef5TMVTOLP+PELLJ+AmbEcGlQAAAAASUVORK5CYII='
	].join(''),

	// }}}2

};

// ngLightbox.text {{{1
ngLightbox.text = {

// languages {{{2

	// english {{{3
	en : [
		{
			loading			: "Loading image",
			loadingSub		: "Click anywhere to cancel",
			context			: "View image in its original context",
			error			: "Image unavailable",
			next			: "Next image (right arrow key)",
			previous		: "Previous image (left arrow key)",
			magnify			: "Magnify image (+ key)",
			shrink			: "Shrink image (- key)",
			defaultSize		: "Shown at actual size (1 key)",
			fitToScreen		: "Fit to screen (0 key)",
			rotateLeft		: "Rotate left (<SHIFT>+R)",
			rotateRight		: "Rotate right (R)",
			slideshow		: "Start/stop slideshow"
		}
	],

	// spanish {{{3
	es : [
		{
			loading			: "Cargando imagen",
			loadingSub		: "Haz clic en cualquier sitio para cancelar",
			context			: "Ver imagen en su contexto original",
			error			: "La imagen no est\u00E1 disponible",
			next			: "Siguiente imagen (tecla derecha)",
			previous		: "Anterior imagen (tecla izquierda)",
			magnify			: "Aumentar imagen (tecla +)",
			shrink			: "Reducir imagen (tecla -)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: ""
		}
	],

	// portuguese {{{3
	pt : [
		{
			loading			: "Carregando imagem",
			loadingSub		: "Clique em qualquer lugar para cancelar",
			context			: "Imagem no contexto original",
			error			: "Imagem indispon\u00edvel",
			next			: "Pr\u00f3xima imagem (tecle na seta da direita)",
			previous		: "Imagem anterior (tecle na seta da esquerda)",
			magnify			: "Aumente o zoom (tecle +)",
			shrink			: "Diminua o zoom (tecle -)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: "Iniciar/cancelar apresenta\u00e7\u00e3o"
		}
	],

	// german {{{3
	de : [
		{
			loading			: "Bild wird geladen",
			loadingSub		: "Zum Abbrechen irgendwo klicken",
			context			: "Bild im urspr\u00fcnglichen Kontext anzeigen",
			error			: "Bild nicht verf\u00fcgbar",
			next			: "N\u00e4chstes Bild (Pfeil rechts)",
			previous		: "Vorheriges Bild (Pfeil links)",
			magnify			: "Bild vergr\u00f6\u00dfern (+ Taste)",
			shrink			: "Bild verkleinern (- Taste)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: "Diashow starten/beenden"
		}
	],

	// french {{{3
	fr : [
		{
			loading			: "Chargement de l'image",
			loadingSub		: "Cliquez n'importe où pour annuler",
			context			: "Voir cette image dans son contexte original",
			error			: "Image indisponible",
			next			: "Image suivante (Touche flèche droite) ",
			previous		: "Image précédente (Touche fléche gauche)",
			magnify			: "Agrandir l'image (Touche +)",
			shrink			: "Reduire l'image (Touche -)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: ""
		}
	],

	// dutch {{{3
	nl : [
		{
			loading			: "Laden",
			loadingSub		: "Klik ergens om terug te keren",
			context			: "Bekijk het plaatje in zijn originele context",
			error			: "Plaatje niet beschikbaar",
			next			: "Volgend plaatje (rechter pijltjestoets)",
			previous		: "Vorig plaatje (linker pijltjestoets)",
			magnify			: "Vergoot plaatje (+ toets)",
			shrink			: "Verklein plaatje (- toets)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: "Start/stop diavoorstelling"
		}
	],

	// italian {{{3
	it : [
		{
			loading			: "Scarico immagine",
			loadingSub		: "Fai clic sullo sfondo per annullare",
			context			: "Mostra nel suo contesto originale",
			error			: "Immagine non disponibile",
			next			: "Successiva (tasto freccia a destra)",
			previous		: "Precedente (tasto freccia a sinistra)",
			magnify			: "Ingrandisci (tasto +)",
			shrink			: "Riduci zoom (tasto -)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: "Avvia/ferma presentazione"
		}
	],

	// hungarian {{{3
	hu : [
		{
			loading			: "K\u00E9p bet\u00F6lt\u00E9se",
			loadingSub		: "Kattints a visszal\u00E9p\u00E9shez",
			context			: "Megtekint\u00E9s az eredeti k\u00F6rnyezet\u00E9ben",
			error			: "K\u00E9p nem el\u00E9rhet\u0151",
			next			: "K\u00F6vetkez\u0150 k\u00E9p (jobbra gomb)",
			previous		: "El\u0150z\u0150 k\u00E9p (balra gomb)",
			magnify			: "Nagy\u00EDt\u00E1s (+ gomb)",
			shrink			: "Kicsiny\u00EDt\u00E9s (- gomb)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: ""
		}
	],

	// finnish {{{3
	fi : [
		{
			loading			: "Ladataan kuvaa",
			loadingSub		: "Napsauta kerran keskeytt\u00e4\u00e4ksesi",
			context			: "N\u00e4yt\u00e4 kuva alkuper\u00e4isess\u00e4 kontekstissa",
			error			: "Kuvaa ei saatavissa",
			next			: "Seuraava kuva (oikea nuolin\u00e4pp\u00e4in)",
			previous		: "Edellinen kuva (vasen nuolin\u00e4pp\u00e4in)",
			magnify			: "Suurenna kuvaa (+ n\u00e4pp\u00e4in)",
			shrink			: "Pienenn\u00e4 kuvaa (- n\u00e4pp\u00e4in)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: "K\u00e4ynnist\u00e4/Pys\u00e4yt\u00e4 dia esitys"
		}
	],

	// japanese {{{3
	ja : [
		{
			loading			: "\u8AAD\u307F\u8FBC\u307F\u4E2D",
			loadingSub		: "\u30AF\u30EA\u30C3\u30AF\u3067\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u307E\u3059",
			context			: "\u5143\u306E\u753B\u50CF\u3092\u8868\u793A",
			error			: "\u753B\u50CF\u304C\u5B58\u5728\u3057\u307E\u305B\u3093",
			next			: "\u6B21\u306E\u753B\u50CF",
			previous		: "\u524D\u306E\u753B\u50CF",
			magnify			: "\u753B\u50CF\u3092\u62E1\u5927 (+)",
			shrink			: "\u753B\u50CF\u3092\u7E2E\u5C0F (-)",
			defaultSize		: "\u5b9f\u30b5\u30a4\u30ba\u3067\u8868\u793a (1)",
			fitToScreen		: "\u753b\u9762\u306b\u53ce\u3081\u308b (0)",
			rotateLeft		: "\u5de6\u56de\u8ee2 (<SHIFT>+R)",
			rotateRight		: "\u53f3\u56de\u8ee2 (R)",
			slideshow		: "\u30B9\u30E9\u30A4\u30C9\u30B7\u30E7\u30FC\u3092\u958B\u59CB\u002F\u505C\u6B62"
		}
	],

	// chinese (simplified) {{{3
	zh : [
		{
			loading			: "\u8BFB\u53D6\u56FE\u7247",
			loadingSub		: "\u6309\u4EFB\u610F\u952E\u6765\u53D6\u6D88",
			context			: "\u4EE5\u539F\u6587\u672C\u67E5\u770B\u56FE\u7247",
			error			: "\u56FE\u7247\u4E0D\u53EF\u8BFB",
			next			: "\u4E0B\u4E00\u4E2A\u56FE\u7247 (\u53F3\u952E)",
			previous		: "\u524D\u4E00\u4E2A\u56FE\u7247 (\u56FE\u7247)",
			magnify			: "\u653E\u5927\u56FE\u7247 (+\u952E)",
			shrink			: "\u7F29\u5C0F\u56FE\u7247 (-\u952E)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: ""
		}
	],

	// chinese (traditional) {{{3
	tw : [
		{
			loading			: "\u8F09\u5165\u5716\u7247\u4E2D",
			loadingSub		: "\u6309\u4EFB\u610F\u9375\u53D6\u6D88",
			context			: "\u6253\u958B\u5716\u7247\u539F\u59CB\u7DB2\u5740",
			error			: "\u7121\u6CD5\u8F09\u5165\u5716\u7247",
			next			: "\u4E0B\u4E00\u5F35\u5716 (\u53F3\u9375)",
			previous		: "\u4E0A\u4E00\u5F35\u5716 (\u5DE6\u9375)",
			magnify			: "\u653E\u5927\u5716\u7247 (+\u9375)",
			shrink			: "\u7E2E\u5C0F\u5716\u7247 (-\u9375)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: "\u958B\u59CB/\u505C\u6B62\u5FAA\u5E8F\u64AD\u653E"
		}
	],

	// polish {{{3
	pl : [
		{
			loading			: "\u0141aduj\u0119 obraz",
			loadingSub		: "Kliknij aby przerwa\u010B",
			context			: "Zobacz obraz w oryginalnym kontek\u015Bcie",
			error			: "Obraz niedost\u0119pny",
			next			: "Nast\u0119pny obraz (klawisz \u2192)",
			previous		: "Poprzedni obraz (klawisz \u2190)",
			magnify			: "Powi\u0119ksz obraz (klawisz +)",
			shrink			: "Zmniejsz obraz (klawisz -)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: "Uruchom/zatrzymaj pokaz slajd\u00F3w"
		}
	],

	// czech {{{3
	cs : [
		{
			loading			: "Nahr\u00E1v\u00E1m obr\u00E1zek",
			loadingSub		: "Klikn\u011bte kamkoliv pro zru\u0161en\u00ed",
			context			: "Prohl\u00ed\u017eet obr\u00E1zek v orign\u00E1ln\u00edm kontextu",
			error			: "Obr\u00E1zek nen\u00ed dostupn\u00fd",
			next			: "Dal\u0161\u00ed obr\u00E1zek (\u0161ipka doprava)",
			previous		: "P\u0159edchoz\u00ed obr\u00E1zek (\u0161ipka doleva)",
			magnify			: "P\u0159ibl\u00ed\u017eit obr\u00E1zek (kl\u00E1vesa +)",
			shrink			: "Odd\u00E1lit obr\u00E1zek (kl\u00E1vesa -)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: "Spustit/zastavit slideshow"
		}
	],

	// slovak {{{3
	sk : [
		{
			loading			: "Nahr\u00E1vam obr\u00E1zok",
			loadingSub		: "Pre zru\u0161enie kliknite kdeko\u013evek",
			context			: "Prezrie\u0165 obr\u00E1zok v orign\u00E1lnom kontexte",
			error			: "Obr\u00E1zok nie je dostupn\u00fd",
			next			: "\u010eal\u0161\u00ed obr\u00E1zok (\u0161\u00edpka doprava)",
			previous		: "Predch\u00E1dzaj\u00faci obr\u00E1zok (\u0161\u00edpka do\u013eava)",
			magnify			: "Pribl\u00ed\u017ei\u0165 obr\u00E1zok (kl\u00E1vesa +)",
			shrink			: "Oddiali\u0165 obr\u00E1zok (kl\u00E1vesa -)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: ""
		}
	],

	// swedish {{{3
	sv : [
		{
			loading			: "Laddar bild",
			loadingSub		: "Klicka f\u00f6r att avbryta",
			context			: "Visa originalbild",
			error			: "Bild inte tillg\u00e4nglig",
			next			: "N\u00e4sta bild (h\u00f6ger piltangent)",
			previous		: "F\u00f6reg\u00e5ende bild (v\u00e4nster piltangent)",
			magnify			: "F\u00f6rstora bild (+ tangent)",
			shrink			: "F\u00f6rminska bild (- tangent)",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: "Starta/stoppa bildspel"
		}
	],

	// template {{{3
	langcode : [
		{
			loading			: "",
			loadingSub		: "",
			context			: "",
			error			: "",
			next			: "",
			previous		: "",
			magnify			: "",
			shrink			: "",
			defaultSize		: "",
			fitToScreen		: "",
			rotateLeft		: "",
			rotateRight		: "",
			slideshow		: ""
		}
	],

// methods {{{2

	// The correct language for localization is set in init()
	language : null,

	// Get named text for current language.
	get : function(name) {
		return ngLightbox.text[ngLightbox.text.language][0][name] || ngLightbox.text['en'][0][name];
	},

	// Sets ngLightbox.text.language to the correct value based on navigator.language
	init : function() {
		var lang = navigator.language.substring(0,2);
		ngLightbox.text.language = ngLightbox.text[lang] ? lang : 'en';
	}

// }}}2

};

// initialize {{{1
if (document.body) ngLightbox.init();
