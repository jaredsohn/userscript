// ==UserScript==
// @name gm-hover-zoom
// @include http://*
// @include https://*
// @namespace http://github.com/jmoses
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require http://documentcloud.github.com/underscore/underscore-min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js
// ==/UserScript==


// HoverZoom Start
// Copyright (c) 2011 Romain Vallet <romain.vallet@gmail.com>
// Licensed under the MIT license, read license.txt

console.log("Initializing...");

var hoverZoomPlugins = hoverZoomPlugins || [];

var hoverZoom = {
	
	options: {},
	currentLink: null,
	hzImg: null,
	hzImgCss: {
		'border': '1px solid #e3e3e3', 
		'line-height': 0,
		'overflow': 'hidden',
		'padding': '2px',
		'margin': 0,
		'position': 'absolute',
		'z-index': 2147483647,
		'border-radius': '3px',
		'background': '-webkit-gradient(linear, left top, right bottom, from(#ffffff), to(#ededed), color-stop(0.5, #ffffff))',
		'-webkit-box-shadow': '3px 3px 6px rgba(0,0,0,0.46)'
	},
	imgLoading: null,
	pageGenerator: '',
		
	loadHoverZoom: function () {
		var hz = hoverZoom,
			wnd = $(window),
			body = $(document.body),
			hzCaption = null,
			imgFullSize = null,
			imgSrc = '',
			imgHost = '',
			mousePos = {},
			loading = false,
			loadFullSizeImageTimeout,
			preloadTimeout,
			actionKeyDown = false,
			fullZoomKeyDown = false,
			pageActionShown = false,
			skipFadeIn = false,
			titledElements = null,
			body100pct = true,
			linkRect = null;
			
		var progressCss = {
			'opacity': '0.5',
			'position': 'absolute',
			'max-height': '22px',
			'max-width': '22px',
			'left': '3px',
			'top': '3px',
			'margin': '0',
			'padding': '0',
			'border-radius': '2px'
		},
		imgFullSizeCss = {
			'opacity': '1',
			'position': 'static',
			'height': 'auto',
			'width': 'auto',
			'left': 'auto',
			'top': 'auto',
			'max-height': 'none',
			'max-width': 'none',
			'margin': '0',
			'padding': '0',
			'border-radius': '0'
		},
		hzCaptionCss = {
			'font': 'menu',
			'font-size': '11px',
			'font-weight': 'bold',
			'color': '#333',
			'text-align': 'center',
			'max-height': '27px',
			'overflow': 'hidden',
			'vertical-align': 'top'
		};

		// Calculate optimal image position and size
		function posImg(position) {
			if (!imgFullSize) {
				return;
			}
			position = position || {top: mousePos.top, left: mousePos.left};
			
			var offset = 20,
				padding = 10,
				statusBarHeight = 15,
				wndWidth = wnd.width(),
				wndHeight = wnd.height(),
				wndScrollLeft = wnd.scrollLeft(),
				wndScrollTop = wnd.scrollTop(),
				bodyWidth = body.width(),
				displayOnRight = (position.left - wndScrollLeft < wndWidth / 2);
				
			function posCaption() {
				if (hzCaption) {
					hzCaption.css('max-width', imgFullSize.width());
					if (hzCaption.height() > 20) {
						hzCaption.css('font-weight', 'normal');
					}
					// This is looped 10x max just in case something 
					// goes wrong, to avoid freezing the process.
					var i = 0;
					while (hz.hzImg.height() > wndHeight - statusBarHeight && i++ < 10) {
						imgFullSize.height(wndHeight - padding - statusBarHeight - hzCaption.height()).width('auto');
						hzCaption.css('max-width', imgFullSize.width());
					}
				}				
			}
			
			if (displayOnRight) {
				position.left += offset;
			} else {
				position.left -= offset;
			}
			
			if (hz.imgLoading) {
				position.top -= 10;
				if (!displayOnRight) {
					position.left -= 25;
				}
					
			} else {
				
				var fullZoom = options.expAlwaysFullZoom || fullZoomKeyDown;
				
				imgFullSize.width('auto').height('auto');
				
				// Image natural dimensions
				var naturalWidth = imgFullSize.width(),
					naturalHeight = imgFullSize.height();
				if (!naturalWidth || !naturalHeight) {
					return;
				}
				
				// Width adjustment
				if (fullZoom) {
					imgFullSize.width(Math.min(naturalWidth, wndWidth - padding + wndScrollLeft));
				} else {
					if (displayOnRight) {
						if (naturalWidth + padding > wndWidth - position.left) {
							imgFullSize.width(wndWidth - position.left - padding + wndScrollLeft);
						}
					} else {
						if (naturalWidth + padding > position.left) {
							imgFullSize.width(position.left - padding - wndScrollLeft);
						}			
					}				
				}
				
				// Height adjustment
				if (hz.hzImg.height() > wndHeight - padding - statusBarHeight) {
					imgFullSize.height(wndHeight - padding - statusBarHeight).width('auto');
				}

				posCaption();
				
				position.top -= hz.hzImg.height() / 2;

				// Display image on the left side if the mouse is on the right
				if (!displayOnRight) {
					position.left -= hz.hzImg.width() + padding;
				}
				
				// Horizontal position adjustment if full zoom
				if (fullZoom) {
					if (displayOnRight) {
						position.left = Math.min(position.left, wndScrollLeft + wndWidth - hz.hzImg.width() - padding);
					} else {
						position.left = Math.max(position.left, wndScrollLeft);
					}
				}
					
				// Vertical position adjustments
				var maxTop = wndScrollTop + wndHeight - hz.hzImg.height() - padding - statusBarHeight;
				if (position.top > maxTop) {
					position.top = maxTop;
				}
				if (position.top < wndScrollTop) {
					position.top = wndScrollTop;
				}
			}
			

			// This fixes positioning when the body's width is not 100%
			if (body100pct) {
				position.left -= (wndWidth - bodyWidth) / 2;
			}
			
			hz.hzImg.css({top: Math.round(position.top), left: Math.round(position.left)});
		}
		
		function posWhileLoading() {
			if (loading) {
				posImg();
				if (hz.imgLoading && imgFullSize && imgFullSize.height() > 0) {
					displayFullSizeImage();
				} else {
					setTimeout(posWhileLoading, 100);
				}
			}
		}
		
		// Remove the 'title' attribute from all elements to prevent a tooltip from appearing above the zoomed image.
		// Titles are saved so they can be restored later.
		function removeTitles() {
			if (titledElements) { return; }
			titledElements = $('[title]').not('iframe, .lightbox, [rel^="lightbox"]');
			titledElements.each(function () {
				$(this).data().hoverZoomTitle = this.getAttribute('title');
				this.removeAttribute('title');
			});
		}
		
		// Restore the 'title' attributes
		function restoreTitles() {
			if (!titledElements) { return; }
			titledElements.each(function () {
				this.setAttribute('title', $(this).data().hoverZoomTitle);
			});
			titledElements = null;
		}
		
		function hideHoverZoomImg(now) {
			if (!now && !imgFullSize || !hz.hzImg || fullZoomKeyDown) {
				return;
			}
			imgFullSize = null;
			if (loading) { now = true; }
			hz.hzImg.stop(true, true).fadeOut(now ? 0 : options.fadeDuration, function () {
				hzCaption = null;
				hz.imgLoading = null;
				hz.hzImg.empty();
				restoreTitles();
			});
		}

		function documentMouseMove(event) {
			if (!options.extensionEnabled || fullZoomKeyDown || isExcludedSite() || wnd.height() < 30 || wnd.width() < 30) {
				return;
			}

			// Test if the action key was pressed without moving the mouse
			var explicitCall = event.pageY == undefined;

			// If so, the MouseMove event was triggered programmaticaly and we don't have details
			// about the mouse position and the event target, so we use the last saved ones.
			var links,
				target = $(event.target);
			if (explicitCall) {
				links = hz.currentLink;
			} else {
				mousePos = {top: event.pageY, left: event.pageX};
				links = target.parents('.hoverZoomLink');
				if (target.hasClass('hoverZoomLink')) {
					links = links.add(target);
				}
			}
			
			if (options.expAlwaysFullZoom && target.length && 
				(imgFullSize && imgFullSize.length && target[0] == imgFullSize[0] ||
				 hz.hzImg && hz.hzImg.length && target[0] == hz.hzImg[0])) {
				if (mousePos.top > linkRect.top && mousePos.top < linkRect.bottom && mousePos.left > linkRect.left && mousePos.left < linkRect.right)
					return;
			}
			
			if (links && links.length > 0) {
				var hoverZoomSrcIndex = links.data().hoverZoomSrcIndex || 0;
				if (links.data().hoverZoomSrc && links.data().hoverZoomSrc != 'undefined' && 
					links.data().hoverZoomSrc[hoverZoomSrcIndex] && 
					links.data().hoverZoomSrc[hoverZoomSrcIndex] != 'undefined') {
					// Happens when the mouse goes from an image to another without hovering the page background
					if (links.data().hoverZoomSrc[hoverZoomSrcIndex] != imgSrc) {
						hideHoverZoomImg();
					}
					
					removeTitles();
					
					// Is the image source has not been set yet
					if (!imgFullSize) {
						hz.currentLink = links;
						if (!options.actionKey || actionKeyDown) {
							imgSrc = links.data().hoverZoomSrc[hoverZoomSrcIndex];
							clearTimeout(loadFullSizeImageTimeout);
							
							// If the action key has been pressed over an image, no delay is applied
							var delay = explicitCall ? 0 : options.displayDelay;
							loadFullSizeImageTimeout = setTimeout(loadFullSizeImage, delay);
							
							linkRect = links.offset();
							linkRect.bottom = linkRect.top + links.height();
							linkRect.right = linkRect.left + links.width();
							
							loading = true;
						}
					} else {
						posImg();
					}
				} else {
					return;
				}			
			} else if (hz.currentLink) {
				cancelImageLoading();
			}
		}
		
		function documentMouseDown() {
			cancelImageLoading();
			restoreTitles();
		}
						
		function loadFullSizeImage() {
			// If no image is currently displayed...
			if (!imgFullSize) {
				
				hz.createHzImg();
				hz.createImgLoading();
				
				imgFullSize = $('<img style="border: none" />').appendTo(hz.hzImg).load(imgFullSizeOnLoad).error(imgFullSizeOnError).attr('src', imgSrc);
				imgHost = getHostFromUrl(imgSrc);
				
				skipFadeIn = false;
				imgFullSize.css(progressCss);
				if (options.showWhileLoading || imgSrc.substr(-4).toLowerCase() == '.gif') {
					posWhileLoading();
				}
			}
			posImg();
		}
		
		function imgFullSizeOnLoad() {
			// Only the last hovered link gets displayed
			if (imgSrc == $(imgFullSize).attr('src')) {
				loading = false;
				displayFullSizeImage();
			}
		}
		
		function displayFullSizeImage() {
			hz.imgLoading.remove();
			hz.imgLoading = null;
			hz.hzImg.stop(true, true);
			hz.hzImg.offset({top:-9000, left:-9000});	// hides the image while making it available for size calculations
			hz.hzImg.empty();
			imgFullSize.css(imgFullSizeCss).appendTo(hz.hzImg).mousemove(imgFullSizeOnMouseMove);
			if (options.showCaptions && hz.currentLink && hz.currentLink.data().hoverZoomCaption) {
				hzCaption = $('<div/>', {id: 'hzCaption', text: hz.currentLink.data().hoverZoomCaption}).css(hzCaptionCss).appendTo(hz.hzImg);
			}
			if (!skipFadeIn) {
				hz.hzImg.hide().fadeTo(options.fadeDuration, options.picturesOpacity);
			}
			
			// The image size is not yet available in the onload so I have to delay the positioning
			setTimeout(posImg, options.showWhileLoading ? 0 : 10);
			
			//if (options.addToHistory && !chrome.extension.inIncognitoTab) {
			//	chrome.extension.sendRequest({action: 'addUrlToHistory', url: hz.currentLink.context.href});
			//}
			//chrome.extension.sendRequest({action: 'trackEvent', event: {category: 'Actions', action: 'ImageDisplayedOnSite', label: document.location.host}});
			//chrome.extension.sendRequest({action: 'trackEvent', event: {category: 'Actions', action: 'ImageDisplayedFromSite', label: imgHost}});
		}

		function imgFullSizeOnError() {
			if (imgSrc == $(this).attr('src')) {
				var hoverZoomSrcIndex = hz.currentLink ? hz.currentLink.data().hoverZoomSrcIndex : 0;
				if (hz.currentLink && hoverZoomSrcIndex < hz.currentLink.data().hoverZoomSrc.length - 1) {
					// If the link has several possible sources, we try to load the next one
					imgFullSize.remove();
					imgFullSize = null;
					hoverZoomSrcIndex++;
					hz.currentLink.data().hoverZoomSrcIndex = hoverZoomSrcIndex;
					console.info('[HoverZoom] Failed to load image: ' + imgSrc + '\nTrying next one...');
					imgSrc = hz.currentLink.data().hoverZoomSrc[hoverZoomSrcIndex];
					setTimeout(loadFullSizeImage, 100);
				} else {
					hideHoverZoomImg();
					//hz.currentLink.removeClass('hoverZoomLink').removeData();
					console.warn('[HoverZoom] Failed to load image: ' + imgSrc);
					//chrome.extension.sendRequest({action: 'trackEvent', event: {category: 'Errors', action: 'LoadingErrorFromSite', label: imgHost}});
				}
			}
		}
		
		function imgFullSizeOnMouseMove() {
			if (!imgFullSize && !options.expAlwaysFullZoom) {
				hideHoverZoomImg(true);
			}
		}
		
		function cancelImageLoading() {
			hz.currentLink = null;
			clearTimeout(loadFullSizeImageTimeout);
			hideHoverZoomImg();
		}
		
		function prepareImgCaption(link) {
			var titledElement = null;
			if (link.attr('title')) {
				titledElement = link;
			} else {
				titledElement = link.find('[title]');
				if (!titledElement.length) {
					titledElement = link.parents('[title]');
				}
			}
			if (titledElement && titledElement.length) {
				link.data().hoverZoomCaption = titledElement.attr('title');
			} else {
				var alt = link.attr('alt') || link.find('[alt]').attr('alt');
				if (alt && alt.length > 6 && !/^\d+$/.test(alt)) {
					link.data().hoverZoomCaption = alt;
				} else {
					var ref = link.attr('ref') || link.find('[ref]').attr('ref');
					if (ref && ref.length > 6 && !/^\d+$/.test(ref)) {
						link.data().hoverZoomCaption = ref;
					}
				}
			}
		}
		
		// Callback function called by plugins after they finished preparing the links
		function imgLinksPrepared(links) {	
			var showPageAction = false;
			links.each(function () {
				var _this = $(this);
				if (!_this.data().hoverZoomSrc) {

					prepareImgLinksAsync(true);
			
				} else {
								
					// Skip if the image has the same URL as the thumbnail.
					try {
						var url = _this.data().hoverZoomSrc[0],
							skip = (url == _this.attr('src'));
						if (!skip) {
							_this.find('img[src]').each(function() {
								if (this.src == url) {
									skip = true;
								}
							});
						}
						if (skip) { return; }
					} catch(e) {
						console.error(e);
					}
				
					showPageAction = true;
					
					// If the extension is disabled or the site is excluded, we only need to know 
					// whether the page action needs to be shown or not.
					if (!options.extensionEnabled || isExcludedSite()) {
						return;
					}

					_this.addClass('hoverZoomLink');
					
					// Convert URL special characters
					var srcs = _this.data().hoverZoomSrc;
					for (var i=0; i<srcs.length; i++) {
						srcs[i] = deepUnescape(srcs[i]);
					}
					//console.log(srcs);
					_this.data().hoverZoomSrc = srcs;
					
					_this.data().hoverZoomSrcIndex = 0;
					
					// Caption
					if (options.showCaptions && !_this.data().hoverZoomCaption) {
						prepareImgCaption(_this);
					}
				}
			});
			
			//if (options.pageActionEnabled && !pageActionShown && showPageAction) {
			//	chrome.extension.sendRequest({action : 'showPageAction'});
			//	pageActionShown = true;
			//}
		}
		
		function prepareImgLinks() {
      console.log("in prepareImgLinks()");
			//console.time('prepareImgLinks');
			pageActionShown = false;
			
			// Commented this out in version 2.9 for better performances. Keep an eye on it for potential side effects.
			//$('.hoverZoomLink').removeClass('hoverZoomLink').removeData('hoverZoomSrc');
			
      console.log("starting plugin processing");
			for (var i = 0; i < hoverZoomPlugins.length; i++) {
        console.log(" running plugin", hoverZoomPlugins[i].name);
				hoverZoomPlugins[i].prepareImgLinks(imgLinksPrepared);
			}
			prepareImgLinksTimeout = null;
			
      console.log(" trying to preload", options.alwaysPreload);
			if (true) { //options.alwaysPreload) {
				clearTimeout(preloadTimeout);
				preloadTimeout = setTimeout(hz.preloadImages, 800);
			} else {
				chrome.extension.sendRequest({action : 'preloadAvailable'});
			}
			

      console.log("preapring downscaled images");
			prepareDownscaledImages();
			//console.timeEnd('prepareImgLinks');
			
		}
		
		function prepareDownscaledImages() {
      console.log("in prepareDownscaledImages");
			$('img').filter(function () {
				var _this = $(this);
				
				// Using _this.data('hoverZoomSrc') breaks some multi-frames sites (don't know why...)
				if (_this.data().hoverZoomSrc) { return false; }
				
				// Don't process when the image is the only element on the page (well, first element).
				if (this == document.body.firstChild) { return false; }
				
				// Only images with a specified width, height, max-width or max-weight are processed.
				var scaled = this.getAttribute('width') || this.getAttribute('height') || 
					this.style && (this.style.width || this.style.height || this.style.maxWidth || this.style.maxHeight);
				if (!scaled) {
					scaled = scaled || _this.css('width') != '0px' || _this.css('height') != '0px' || _this.css('max-width') != 'none' || _this.css('max-height') != 'none';
				}
				return scaled;
			}).one('mouseover.hoverZoom', function () {
				var img = $(this),
					widthAttr = parseInt(this.getAttribute('width') || this.style.width || this.style.maxWidth || img.css('width') || img.css('max-width')),
					heightAttr = parseInt(this.getAttribute('height') || this.style.height || this.style.maxHeight || img.css('height') || img.css('max-height')),
					hzDownscaled = $('<img id="hzDownscaled" style="position: absolute; top: -10000px;">').appendTo(document.body);
				if (widthAttr >= 300 || heightAttr >= 300) { return; }
				hzDownscaled.load(function () {
					setTimeout(function() {
						if (hzDownscaled.height() > heightAttr * 1.8 || hzDownscaled.width() > widthAttr * 1.8) {
							var srcs = img.data().hoverZoomSrc || [];
							srcs.unshift(img.attr('src'));
							img.data().hoverZoomSrc = srcs;
							img.addClass('hoverZoomLink');
						}
						hzDownscaled.remove();
					}, 10);
				}).attr('src', this.src);
			});
      console.log(" done");
		}
		
		var prepareImgLinksDelay = 500, prepareImgLinksTimeout;
		function prepareImgLinksAsync(dontResetDelay) {
			if (!options.extensionEnabled || isExcludedSite()) {
				return;
			}
			if (!dontResetDelay) {
				prepareImgLinksDelay = 500;
			}
			clearTimeout(prepareImgLinksTimeout);
			prepareImgLinksTimeout = setTimeout(prepareImgLinks, prepareImgLinksDelay);
			prepareImgLinksDelay *= 2;
		}
		
		function deepUnescape(url) {
			var ueUrl = unescape(encodeURIComponent(url));
			while (url != ueUrl) {
				url = ueUrl;
				ueUrl = unescape(url);
			}
			return decodeURIComponent(escape(url));
		}
		
		function applyOptions() {
      console.log("in applyOptions");
			init();
			if (!options.extensionEnabled || isExcludedSite()) {
				hideHoverZoomImg();
				$(document).unbind('mousemove', documentMouseMove);
			}
		}
		
		var webSiteExcluded = null;
		function isExcludedSite() {
			
			// If site exclusion has already been tested
			if (webSiteExcluded != null) {
				return webSiteExcluded;
			}
			
			var excluded = !options.whiteListMode;
			var siteAddress = location.href.substr(location.protocol.length+2);
			if (siteAddress.substr(0, 4) == 'www.') {
				siteAddress = siteAddress.substr(4);
			}
			for (var i = 0; i < options.excludedSites.length; i++) {
				var es = options.excludedSites[i];
				if (es.substr(0, 4) == 'www.') {
					es = es.substr(4);
				}
				if (es && es.length <= siteAddress.length) {
					if (siteAddress.substr(0, es.length) == es) {
						webSiteExcluded = excluded;
						return excluded;
					}
				}
			}
			webSiteExcluded = !excluded;
			return !excluded;
		}
		
		function loadOptions() {
      console.log("in loadOptions");
        options = {};
        
        options.extensionEnabled =      options.hasOwnProperty('extensionEnabled') ? options.extensionEnabled : true;
        options.pageActionEnabled = options.hasOwnProperty('pageActionEnabled') ? options.pageActionEnabled : true;
        options.showCaptions =          options.hasOwnProperty('showCaptions') ? options.showCaptions : true;
        options.showHighRes =           options.hasOwnProperty('showHighRes') ? options.showHighRes : false;
        options.addToHistory =          options.hasOwnProperty('addToHistory') ? options.addToHistory : false;
        options.alwaysPreload =         options.hasOwnProperty('alwaysPreload') ? options.alwaysPreload : false;
        options.displayDelay =          options.hasOwnProperty('displayDelay') ? options.displayDelay : 100;
        options.fadeDuration =          options.hasOwnProperty('fadeDuration') ? options.fadeDuration : 200;
        options.excludedSites =         options.hasOwnProperty('excludedSites') ? options.excludedSites : [];
        options.whiteListMode =         options.hasOwnProperty('whiteListMode') ? options.whiteListMode : false;
        options.picturesOpacity =       options.hasOwnProperty('picturesOpacity') ? options.picturesOpacity : 1;
        options.showWhileLoading =      options.hasOwnProperty('showWhileLoading') ? options.showWhileLoading : true;
        options.expAlwaysFullZoom = options.hasOwnProperty('expAlwaysFullZoom') ? options.expAlwaysFullZoom : false;
        
        // Action keys
        options.actionKey =             options.hasOwnProperty('actionKey') ? options.actionKey : 0;
        options.fullZoomKey =           options.hasOwnProperty('fullZoomKey') ? options.fullZoomKey : 90;
        
        console.log("applying options");
				applyOptions();
		}
		
		function onRequest(request, sender, sendResponse) {
			if (request.action == 'optionsChanged') {
				options = request.options;
				applyOptions();
			}
		}
		
		function windowOnDOMNodeInserted(event) {
			if (event.srcElement) {
				if (event.srcElement.id == 'hzImg' || 
					event.srcElement.parentNode.id == 'hzImg' ||
					event.srcElement.id == 'hzDownscaled') { return; }
				var srcElement = $(event.srcElement);
				if (event.srcElement.nodeName == 'A' || event.srcElement.nodeName == 'IMG' || srcElement.find('a, img').length || srcElement.parents('a, img').length) {
					prepareImgLinksAsync();
				} else if (event.srcElement.nodeName == 'EMBED' || event.srcElement.nodeName == 'OBJECT') {
					fixFlash();
				}
			}
		}
		
		function windowOnLoad(event) {
			prepareImgLinksAsync();
		}
		
		function bindEvents() {
			$(document).mousemove(documentMouseMove).mouseleave(cancelImageLoading).mousedown(documentMouseDown);

			wnd.bind('DOMNodeInserted', windowOnDOMNodeInserted).load(windowOnLoad).scroll(cancelImageLoading);
			
			if (options.actionKey || options.fullZoomKey) {
				$(document).keydown(function (event) {
					if (event.which == options.actionKey && !actionKeyDown) {
						actionKeyDown = true;
						$(this).mousemove();
						if (loading || imgFullSize) {
							return false;
						}
					}
					if (event.which == options.fullZoomKey && !fullZoomKeyDown) {
						fullZoomKeyDown = true;
						posImg();
						if (imgFullSize) {
							return false;
						}
					}
					if (imgFullSize && (event.which == options.actionKey || event.which == options.fullZoomKey)) {
						return false;
					}
				}).keyup(function (event) {
					if (event.which == options.actionKey) {
						actionKeyDown = false;
						hideHoverZoomImg();
					}
					if (event.which == options.fullZoomKey) {
						fullZoomKeyDown = false;
						$(this).mousemove();
					}
				});
			}		
		}
		
		function fixFlash() {
			if (isExcludedSite() || window == window.top && $('.hoverZoomLink').length == 0) { return; }
			$('embed:not([wmode]), embed[wmode="window"]').each(function () {
				if (!this.type || this.type.toLowerCase() != 'application/x-shockwave-flash') { return; }
				var embed = this.cloneNode(true);
				embed.setAttribute('wmode', 'opaque');
				wnd.unbind('DOMNodeInserted', windowOnDOMNodeInserted);
				$(this).replaceWith(embed);
				wnd.bind('DOMNodeInserted', windowOnDOMNodeInserted);
			});
			var wmodeFilter = function() {
				return this.name.toLowerCase() == 'wmode';
			};
			$('object[type="application/x-shockwave-flash"]').filter(function () {
				var param = $(this).children('param').filter(wmodeFilter);
				return param.length == 0 || param.attr('value').toLowerCase() == 'window';
			}).each(function () {
				var object = this.cloneNode(true);
				$(object).children('param').filter(wmodeFilter).remove();
				$('<param name="wmode" value="opaque">').appendTo(object);
				wnd.unbind('DOMNodeInserted', windowOnDOMNodeInserted);
				$(this).replaceWith(object);
				wnd.bind('DOMNodeInserted', windowOnDOMNodeInserted);
			});
		}
		
		function getHostFromUrl(url) {
			var host = '';
			if (url.indexOf('://') > -1) {
				host = url.replace(/.+:\/\/([^\/]*).*/, '$1');
			} else {
				host = window.location.host;
			}
			var aHost = host.split('.'),
				maxItems = 2;
			if (aHost.length > 2) {
				var preTld = aHost[aHost.length - 2];
				if (preTld == 'co' || preTld == 'com' || preTld == 'net' || preTld == 'org') {
					maxItems = 3;
				}
			}
			while (aHost.length > maxItems) {
				aHost.shift();
			}
			return aHost.join('.');
		}
		
		function init() {
      console.log("in init()");
			if (!window.innerHeight || !window.innerWidth) { return; }
			
			webSiteExcluded = null;
			body100pct = (body.css('position') != 'static') || 
						 (body.css('padding-left') == '0px' && body.css('padding-right') == '0px' && body.css('margin-left') == '0px' && body.css('margin-right') == '0px');
			hz.pageGenerator = $('meta[name="generator"]').attr('content');
      console.log("preparing image links");
			prepareImgLinks();		
      console.log("binding events");
			bindEvents();
      console.log("fixing flash");
			fixFlash();
		}
		
    console.log("Loading options");
		//chrome.extension.onRequest.addListener(onRequest);		
		loadOptions();

    console.log(" done");
	},
	
	// __________________________________________________________________
	// Public functions
	
	// Search for links or images using the 'filter' parameter,
	// process their src or href attribute using the 'search' and 'replace' values,
	// store the result in the link and add the link to the 'res' array.
	urlReplace: function (res, filter, search, replace, parentFilter) {
		$(filter).each(function () {
			var _this = $(this), link, url, thumbUrl;
			if (parentFilter) {
				link = _this.parents(parentFilter);
			} else {
				link = _this;
			}
			url = hoverZoom.getThumbUrl(this);
			if (!url) {	return;	}
			thumbUrl = url;
			if (Array.isArray(search)) {
				for (var i=0; i<search.length; i++) {
					url = url.replace(search[i], replace[i]);
				}
			} else {
				url = url.replace(search, replace);
			}
			if (thumbUrl == url) { return; }
			var data = link.data().hoverZoomSrc;
			if (Object.prototype.toString.call(data) === '[object Array]') {
				data.unshift(url);
			} else {
				data = [url];
			}
			link.data().hoverZoomSrc = data;
			res.push(link);
		});
	},
	
	// Extract a thumbnail url from an element, whether it be a link, 
	// an image or a element with a background image.
	getThumbUrl: function (el) {
		var compStyle = getComputedStyle(el),
			backgroundImage = compStyle ? compStyle.backgroundImage : 'none';
		if (backgroundImage != 'none') {
			return backgroundImage.replace(/.*url\s*\(\s*(.*)\s*\).*/i, '$1');
		} else {
			return el.src || el.href;
		}
	},
	
	// Simulates a mousemove event to force a zoom call
	displayPicFromElement: function (el) {
		hoverZoom.currentLink = el;
		$(document).mousemove();
	},
	
	// Create and displays the zoomed image container
	createHzImg: function () {
		hoverZoom.hzImg = hoverZoom.hzImg || $('<div id="hzImg"></div>').appendTo(document.body);			
		hoverZoom.hzImg.css(hoverZoom.hzImgCss);
		hoverZoom.hzImg.empty();
		hoverZoom.hzImg.stop(true, true).fadeTo(options.fadeDuration, options.picturesOpacity);
	},
	
	// Create and displays the loading image container
	createImgLoading: function () {
		hoverZoom.imgLoading = hoverZoom.imgLoading || $('<div style="opacity: 0.8; padding: 0; margin: 0">...</div>');
		hoverZoom.imgLoading.appendTo(hoverZoom.hzImg);
	},
	
	// Preloads zoomed images
	preloadImages: function() {
		
		var links = $('.hoverZoomLink'),
			preloadIndex = 0,
			preloadDelay = 200;
	
		function preloadNextImage() {
			if (preloadIndex >= links.length) { return; }
			var link = links.eq(preloadIndex++);
			if (link.data().hoverZoomPreloaded) {
				preloadNextImage();
				//chrome.extension.sendRequest({action: 'preloadProgress', value: preloadIndex, max: links.length});
			} else {
				var hoverZoomSrcIndex = link.data().hoverZoomSrcIndex || 0;
				$('<img src="' + link.data().hoverZoomSrc[hoverZoomSrcIndex] + '">').load(function() {
					link.data().hoverZoomPreloaded = true;
					setTimeout(preloadNextImage, preloadDelay);
					//chrome.extension.sendRequest({action: 'preloadProgress', value: preloadIndex, max: links.length});
				}).error(function() {
					if (hoverZoomSrcIndex < link.data().hoverZoomSrc.length - 1) {
						link.data().hoverZoomSrcIndex++;;
						preloadIndex--;
					}
					setTimeout(preloadNextImage, preloadDelay);
				});
			}
		}
	
		setTimeout(preloadNextImage, preloadDelay);
	}
};

console.log("HZ parsed");

// HoverZoom End

// imgur_a.js
// Copyright (c) 2011 Romain Vallet
// Licensed under the MIT license, read license.txt

var hoverZoomPlugins = hoverZoomPlugins || [];
hoverZoomPlugins.push( {
	name: 'Imgur',
	version: '0.3',
	prepareImgLinks: function(callback) {
    console.log("Preparing image links for imgur");
	
		var res = [],
			minSplitLength = 4;
		
		function prepareImgLink() {
			var link = $(this), i = 0, data = link.data();
			if (data.hoverZoomSrc) { return; }

      console.log("Preparing", link);
			
			var aHref = link.attr('href').split('/');
			if (aHref.length < minSplitLength) { return; }
			
			if (minSplitLength == 4) {
				// The URL may contain 'imgur.com' but we can be on another domain, so one more test
				if (aHref[2].length < 9 || aHref[2].substr(-9) != 'imgur.com' || aHref[2] == 'api.imgur.com') { return; }
				// Removes the first part (http://*.imgur.com)
				for (i=0; i<3; i++) { 
					aHref.shift(); 
				}
			}
			
			// Excluded words
			var excl = ['delete', 'forum', 'removalrequest', 'contact', 'upgrade', 'tools', 'stats', 'logout', 'signin', 'register', 'blog'];
			if (aHref[0].length < 5 || excl.indexOf(aHref[0]) > -1) { return; }
			
			// This assumes that the hash length is always 5			
			
			var hash = '';
			if (aHref.length == 1) {
			
				if (aHref[0] == 'gallery') {
					return;
				} else if (aHref[0].indexOf('&') > -1) {
					// Several hashes in one URL (first, second, etc).
					// The good one has an 'l' appended to it.
					// If none has an 'l', the default one if the first one.
					var a = aHref[0].split('&');
					hash = a[0].substr(0, 5);
					for (i=1; i<a.length; i++) {
						if (a[i].length > 5) {
							hash = a[i].substr(0, 5);
						}
					}
				} else if (aHref[0].indexOf('#') > -1) {
					hash = aHref[0].substr(aHref[0].indexOf('#') + 1, 5);
				} else {
					hash = aHref[0].substr(0, 5);				
				}
				
			} else if (aHref[0] == 'gallery') {
				hash = aHref[1].substr(0, 5);				
			}

			if (!hash) { return; }
			var url = 'http://i.imgur.com/' + hash;
			var srcs = [url + '.jpg', url + '.png', url + '.gif'];
			// Same array duplicated several times so that a retry is done if an image fails to load
			data.hoverZoomSrc = srcs.concat(srcs).concat(srcs).concat(srcs);
			res.push(link);
		}
	
		// Every sites
		$('a[href*="imgur.com/"]').each(prepareImgLink);
		
		// On imgur.com (galleries, etc)
		if (window.location.host.indexOf('imgur.com') > -1) {
			minSplitLength = 2;
			$('a[href^="/"]').each(prepareImgLink);			
		}
		
		if (res.length) { callback($(res));	}
	}
});

console.log("imgur loaded");
hoverZoom.loadHoverZoom();

console.log("HZ loaded.");

// imgur_a.js

