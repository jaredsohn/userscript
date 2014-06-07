// ==UserScript==
// @name         vBulletin 5 Photo Slideshow Enhancer
// @namespace    http://userscripts.org/users/527495
// @description  Enlarge the vB5 Photo Slideshow Lightbox. Can navigate slideshow using arrow keys.
// @downloadURL  http://userscripts.org/scripts/show/175365
// @grant        none
// @include      http*
// @version      1.1
// @date         2013-08-08
// @creator      noypiscripter
// ==/UserScript==

(function() {		

	var main = function() {

		$(function() {

		    var dialogWidth,
				dialogHeight,
				$slideshowDialog = $('#slideshow-dialog'),
				ns = '.vb5PhotoLightboxEnhancer',
				clickedPhotoIndex = -1;

			function fixSlideshow() {

				if (!Function.prototype.debounce) {
					Function.prototype.debounce = function (threshold, execAsap) {
					    var func = this, timeout;
					 
					    return function () {
					        var obj = this, args = arguments;
					        var delayed = function() {
					            if (!execAsap)
					                func.apply(obj, args);
					            timeout = null; 
					        };
					 
					        if (timeout)
					            clearTimeout(timeout);
					        else if (execAsap)
					            func.apply(obj, args);
					 
					        timeout = setTimeout(delayed, threshold || 100); 
					    };
					 
					}
				}
				$(window).on('resize' + ns, (function() {
					fixSlideshow();
					fixImageSize();
					fixSlideshowListWidth(false, true);
				}).debounce(200));

				dialogWidth = $(window).width() - 100;
				dialogHeight = Math.min(dialogWidth/1.5, $(window).height() - 180);

				var $style = $('#vb5PhotoLightboxEnhancerByNoypiscripter_slideshowCssRules'),
					dialogOuterWidth = dialogWidth + 2;

				if (!$style.length) {
					$('<style>.slideshow-dialog { width: ' + dialogOuterWidth + 'px !important; }</style>').attr('id', 'vb5PhotoLightboxEnhancerByNoypiscripter_slideshowCssRules').appendTo('head');
					$('<style>.slideshow-dialog { border: 1px solid #000 !important; }</style>').appendTo('head');
				}
				else if ($slideshowDialog.parent().width() != dialogOuterWidth) {
					$style.empty().append('.slideshow-dialog { width: ' + dialogOuterWidth + 'px !important; }');
				}

				$slideshowDialog.parent().css('box-shadow', '0px 0px 10px #FFF');
				
				$('.slideshow-wrapper > .jcarousel-clip-horizontal, .slideshow-wrapper > .jcarousel-clip .jcarousel-item', $slideshowDialog).width(dialogWidth).height(dialogHeight);
				$slideshowDialog.width(dialogWidth).css('height', 'auto');
				$('.slideshow-wrapper > .jcarousel-prev-horizontal, .slideshow-wrapper > .jcarousel-next-horizontal', $slideshowDialog).css({'top': '50%', 'margin-top': '-21px'});	
				
				$slideshowDialog
					.dialog('option', 'position', 'center')
					.off('dialogclose' + ns)
					.on('dialogclose' + ns, function(e) {
						$(window).off('resize' + ns);
						$(document).off('keydown' + ns);
					});

			}

			function fixImageSize() {
				//these elements are only available after the ajax call to fetch the images is complete
				$('.jcarousel-item .image', $slideshowDialog).css({'max-width': dialogWidth + 'px', 'max-height': dialogHeight + 'px'});
				$('.thumbnails > .jcarousel-clip-horizontal', $slideshowDialog).css('width', '100%');
				$('.slideshow-wrapper > .jcarousel-clip-horizontal, .slideshow-wrapper > .jcarousel-clip .jcarousel-item', $slideshowDialog).width(dialogWidth).height(dialogHeight);			

				$slideshowDialog.dialog('option', 'position', 'center');
			}

			function fixSlideshowListWidth(scroll, adjustLeft) {
				var $slideshowList = $('.slideshow-list', $slideshowDialog),
					$slideshowListItems = $slideshowList.find('li'),
					slideWidth = $slideshowListItems.outerWidth(true),
					currentSlideIndex;

				if (adjustLeft) {
					currentSlideIndex = vBulletin.gallery.slideshow.data('jcarousel').first;
				}

				if (scroll) {
					$slideshowDialog.data('thumbclick', true);
	                vBulletin.gallery.slideshow.jcarousel('scroll', 0, false);
	                $slideshowList.css('left', 0);
	                vBulletin.gallery.slideshow.jcarousel('scroll', clickedPhotoIndex + 1, false);
	                $slideshowDialog.removeData('thumbclick');
				}

				if (adjustLeft && currentSlideIndex >= 0) {
					$slideshowDialog.data('thumbclick', true);
					 vBulletin.gallery.slideshow.jcarousel('scroll', 0, false);
	                $slideshowList.css('left', 0);
	                vBulletin.gallery.slideshow.jcarousel('scroll', currentSlideIndex, false);
	                $slideshowDialog.removeData('thumbclick');
				}

				$slideshowList.width($slideshowListItems.length * slideWidth);
			}

			function activateArrowKeys() {
				$(document).on('keydown' + ns, function(e) {
					switch (e.keyCode) {
						case 39: //right arrow key
							e.preventDefault();
							$('.jcarousel-next:not(.jcarousel-next-disabled)', $slideshowDialog).trigger('click');
							break;
						case 37: //left arrow key
							e.preventDefault();
							$('.jcarousel-prev:not(.jcarousel-prev-disabled)', $slideshowDialog).trigger('click');
							break;
						default:;
					}					
				});
			}

			$(document).off('click' + ns, '.b-gallery-thumbnail-list__item').on('click' + ns, '.b-gallery-thumbnail-list__item', function() {
				clickedPhotoIndex = $(this).closest('.photoPreviewBox').length ? $(this).closest('.photoPreviewBox').index() : $(this).index();
				fixSlideshow();
				activateArrowKeys();
			});	

			$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
				if (options.url.indexOf('/filedata/gallery') != -1) {
					var origSuccess = options.success;
					options.success = function() {
						origSuccess.apply(this, arguments);
						fixSlideshowListWidth(false, true);					}

					var origComplete = options.complete || $.noop;
					options.complete = function() {					
						origComplete.apply(this, arguments);				
						fixImageSize();					

						if (clickedPhotoIndex > 0) {
							fixSlideshowListWidth(true);
						}
					};
				}
			});

		});

	};

	var lazyLoader = function() {
		//this script applies to all vBulletin 5+ sites only
		if (typeof window.vBulletin === 'object' && typeof window.vBulletin.gallery == 'object') {
			var lazyScript = document.getElementById('vb5PhotoLightboxEnhancerByNoypiscripter_lazyScript'),
				lazyScriptBody = (lazyScript.textContent || '').replace(/\/\*/, '').replace(/\*\//, '');
			eval(lazyScriptBody);
		}
	}
	
	var lazyScript = document.createElement('script');
	lazyScript.type = 'text/javascript';
	lazyScript.id = 'vb5PhotoLightboxEnhancerByNoypiscripter_lazyScript';
	lazyScript.textContent = '/* (' + main.toString() + ')(); */';
	document.body.appendChild(lazyScript);

	var lazyLoaderScript = document.createElement('script');
	lazyLoaderScript.type = 'text/javascript';
	lazyLoaderScript.id = 'vb5PhotoLightboxEnhancerByNoypiscripter_lazyScriptLoader';
	lazyLoaderScript.textContent = '(' + lazyLoader.toString() + ')();';
	document.body.appendChild(lazyLoaderScript);

})();