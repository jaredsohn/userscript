// ==UserScript==
// @name	Wykop AutoPager
// @namespace	http://userscripts.org/scripts/show/117555
// @author	kasper93
// @description	Automatycznie ładuje kolejną stronę po osiągnięciu końca poprzedniej.
// @include	http://*.wykop.pl/*
// @exclude	/^http://www\.wykop\.pl/(info|regulamin|reklama|polityka-prywatnosci|pomoc|kontakt|osiagniecia|grupy|developers|gry)//
// @exclude	/^http://[a-z]+\.wykop\.pl/(ramka|link|dodaj)/*/
// @downloadURL	https://userscripts.org/scripts/source/117555.user.js
// @updateURL	https://userscripts.org/scripts/source/117555.meta.js
// @version	2.2.3
// @grant	none
// @run-at	document-end
// ==/UserScript==


function main() {
	$(function () {
		var buttonoff = '<div class="quickpoint fright rel">' + '<a id="autopager" title="Wyłącz automatyczne ładowanie stron" class="fright cfff tdnone quickicon tcenter" href="javascript:void(0)">' + '<span class="icon inlblk off"><span>Autopager</span></span>' + '</a>' + '</div>';
		var buttonup = '<a id="up" title="Do góry" href="#">' + '<img style="position:fixed; bottom:50px; left:0px;" src="data:image/png;base64,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" alt="Do góry" />' + '</a>';
		$('nav.main.medium.rel').append(buttonoff);
		$('#body-con').append(buttonup);
		$('#autopager').click(function () {
			var on = ($(this).attr("title") == "Wyłącz automatyczne ładowanie stron");
			$('.scale').parent().infinitescroll((on ? 'pause' : 'resume'));
			$(this).attr("title", (on ? 'Włącz' : 'Wyłącz') + " automatyczne ładowanie stron");
		});
		var mousefollow = false;
		if (mousefollow) {
			$(document).mousemove(function (e) {
				if (e.clientX < 20) {
					$('#up span').css({
						top: e.clientY - 12
					});
				}
			});
		}
	});

	function nastepnaStrona() {
		var url = $("div.pager a.button:contains('następna')", ".scale:last").attr('href');
		if (url == 'undefined') {
			return false;
		}
		return url;
	}

	/*jshint undef: true */
	/*global jQuery: true */

	/*
   --------------------------------
   Infinite Scroll
   --------------------------------
   + https://github.com/paulirish/infinite-scroll
   + version 2.0b2.120519
   + Copyright 2011/12 Paul Irish & Luke Shumard
   + Licensed under the MIT license

   + Documentation: http://infinite-scroll.com/
*/

	(function (window, $, undefined) {
		"use strict";

		$.infinitescroll = function infscr(options, callback, element) {
			this.element = $(element);

			// Flag the object in the event of a failed creation
			if (!this._create(options, callback)) {
				this.failed = true;
			}
		};

		$.infinitescroll.defaults = {
			loading: {
				finished: undefined,
				finishedMsg: "<em>Przekopałeś już wszystko co tylko mogłeś.</em>",
				img: "http://www.wykop.pl/img/progress.gif",
				msg: null,
				msgText: "<em>Wykopuję kolejną stronę...</em>",
				selector: null,
				speed: 'fast',
				start: undefined
			},
			state: {
				isDuringAjax: false,
				isInvalidPage: false,
				isDestroyed: false,
				isDone: false, // For when it goes all the way through the archive.
				isPaused: false,
				currPage: 1
			},
			debug: false,
			behavior: undefined,
			binder: $(window), // used to cache the selector
			nextSelector: "div.navigation a:first",
			navSelector: "div.navigation",
			contentSelector: null, // rename to pageFragment
			extraScrollPx: 150,
			itemSelector: "div.post",
			animate: false,
			pathParse: undefined,
			dataType: 'html',
			appendCallback: true,
			bufferPx: 40,
			errorCallback: function () {},
			infid: 0, //Instance ID
			pixelsFromNavToBottom: undefined,
			path: nastepnaStrona, // Either parts of a URL as an array (e.g. ["/page/", "/"] or a function that takes in the page number and returns a URL
			prefill: false, // When the document is smaller than the window, load data until the document is larger or links are exhausted
			maxPage: undefined // to manually control maximum page (when maxPage is undefined, maximum page limitation is not work)
		};

		$.infinitescroll.prototype = {

			/*	
            ----------------------------
            Private methods
            ----------------------------
            */

			// Bind or unbind from scroll
			_binding: function infscr_binding(binding) {

				var instance = this,
					opts = instance.options;

				opts.v = '2.0b2.120520';

				// if behavior is defined and this function is extended, call that instead of default
				if ( !! opts.behavior && this['_binding_' + opts.behavior] !== undefined) {
					this['_binding_' + opts.behavior].call(this);
					return;
				}

				if (binding !== 'bind' && binding !== 'unbind') {
					this._debug('Binding value  ' + binding + ' not valid');
					return false;
				}

				if (binding === 'unbind') {
					(this.options.binder).unbind('smartscroll.infscr.' + instance.options.infid);
				} else {
					(this.options.binder)[binding]('smartscroll.infscr.' + instance.options.infid, function () {
						instance.scroll();
					});
				}

				this._debug('Binding', binding);
			},

			// Fundamental aspects of the plugin are initialized
			_create: function infscr_create(options, callback) {

				// Add custom options to defaults
				var opts = $.extend(true, {}, $.infinitescroll.defaults, options);
				this.options = opts;
				var $window = $(window);
				var instance = this;

				// Validate selectors
				if (!instance._validate(options)) {
					return false;
				}

				// Validate page fragment path
				var path = $(opts.nextSelector).attr('href');
				if (!path) {
					this._debug('Navigation selector not found');
					return false;
				}

				// Set the path to be a relative URL from root.
				opts.path = opts.path || this._determinepath(path);

				// contentSelector is 'page fragment' option for .load() / .ajax() calls
				opts.contentSelector = opts.contentSelector || this.element;

				// loading.selector - if we want to place the load message in a specific selector, defaulted to the contentSelector
				opts.loading.selector = opts.loading.selector || opts.contentSelector;

				// Define loading.msg
				opts.loading.msg = opts.loading.msg || $('<div id="infscr-loading"><img alt="Loading..." src="' + opts.loading.img + '" /><div>' + opts.loading.msgText + '</div></div>');

				// Preload loading.img
				(new Image()).src = opts.loading.img;

				// distance from nav links to bottom
				// computed as: height of the document + top offset of container - top offset of nav link
				if (opts.pixelsFromNavToBottom === undefined) {
					opts.pixelsFromNavToBottom = $(document).height() - $(opts.navSelector).offset().top;
				}

				var self = this;

				// determine loading.start actions
				opts.loading.start = opts.loading.start || function () {
					$(opts.navSelector).hide();
					opts.loading.msg
						.appendTo(opts.loading.selector)
						.show(opts.loading.speed, $.proxy(function () {
						this.beginAjax(opts);
					}, self));
				};

				// determine loading.finished actions
				opts.loading.finished = opts.loading.finished || function () {
					opts.loading.msg.fadeOut(opts.loading.speed);
				};

				// callback loading
				opts.callback = function (instance, data, url) {
					if ( !! opts.behavior && instance['_callback_' + opts.behavior] !== undefined) {
						instance['_callback_' + opts.behavior].call($(opts.contentSelector)[0], data, url);
					}

					if (callback) {
						callback.call($(opts.contentSelector)[0], data, opts, url);
					}

					if (opts.prefill) {
						$window.bind("resize.infinite-scroll", instance._prefill);
					}
				};

				if (options.debug) {
					// Tell IE9 to use its built-in console
					if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log === "object") {
						["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"]
							.forEach(function (method) {
							console[method] = this.call(console[method], console);
						}, Function.prototype.bind);
					}
				}

				this._setup();

				// Setups the prefill method for use
				if (opts.prefill) {
					this._prefill();
				}

				// Return true to indicate successful creation
				return true;
			},

			_prefill: function infscr_prefill() {
				var instance = this;
				var $document = $(document);
				var $window = $(window);

				function needsPrefill() {
					return ($document.height() <= $window.height());
				}

				this._prefill = function () {
					if (needsPrefill()) {
						instance.scroll();
					}

					$window.bind("resize.infinite-scroll", function () {
						if (needsPrefill()) {
							$window.unbind("resize.infinite-scroll");
							instance.scroll();
						}
					});
				};

				// Call self after setting up the new function
				this._prefill();
			},

			// Console log wrapper
			_debug: function infscr_debug() {
				if (true !== this.options.debug) {
					return;
				}

				if (typeof console !== 'undefined' && typeof console.log === 'function') {
					// Modern browsers
					// Single argument, which is a string
					if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
						console.log((Array.prototype.slice.call(arguments)).toString());
					} else {
						console.log(Array.prototype.slice.call(arguments));
					}
				} else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
					// IE8
					Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
				}
			},

			// find the number to increment in the path.
			_determinepath: function infscr_determinepath(path) {

				var opts = this.options;

				// if behavior is defined and this function is extended, call that instead of default
				if ( !! opts.behavior && this['_determinepath_' + opts.behavior] !== undefined) {
					return this['_determinepath_' + opts.behavior].call(this, path);
				}

				if ( !! opts.pathParse) {

					this._debug('pathParse manual');
					return opts.pathParse(path, this.options.state.currPage + 1);

				} else if (path.match(/^(.*?)\b2\b(.*?$)/)) {
					path = path.match(/^(.*?)\b2\b(.*?$)/).slice(1);

					// if there is any 2 in the url at all.    
				} else if (path.match(/^(.*?)2(.*?$)/)) {

					// page= is used in django:
					// http://www.infinite-scroll.com/changelog/comment-page-1/#comment-127
					if (path.match(/^(.*?page=)2(\/.*|$)/)) {
						path = path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
						return path;
					}

					path = path.match(/^(.*?)2(.*?$)/).slice(1);

				} else {

					// page= is used in drupal too but second page is page=1 not page=2:
					// thx Jerod Fritz, vladikoff
					if (path.match(/^(.*?page=)1(\/.*|$)/)) {
						path = path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
						return path;
					} else {
						this._debug('Sorry, we couldn\'t parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.');
						// Get rid of isInvalidPage to allow permalink to state
						opts.state.isInvalidPage = true; //prevent it from running on this page.
					}
				}
				this._debug('determinePath', path);
				return path;

			},

			// Custom error
			_error: function infscr_error(xhr) {

				var opts = this.options;

				// if behavior is defined and this function is extended, call that instead of default
				if ( !! opts.behavior && this['_error_' + opts.behavior] !== undefined) {
					this['_error_' + opts.behavior].call(this, xhr);
					return;
				}

				if (xhr !== 'destroy' && xhr !== 'end') {
					xhr = 'unknown';
				}

				this._debug('Error', xhr);

				if (xhr === 'end') {
					this._showdonemsg();
				}

				opts.state.isDone = true;
				opts.state.currPage = 1; // if you need to go back to this instance
				opts.state.isPaused = false;
				this._binding('unbind');

			},

			// Load Callback
			_loadcallback: function infscr_loadcallback(box, data, url) {
				var opts = this.options,
					callback = this.options.callback, // GLOBAL OBJECT FOR CALLBACK
					result = (opts.state.isDone) ? 'done' : (!opts.appendCallback) ? 'no-append' : 'append',
					frag;

				// if behavior is defined and this function is extended, call that instead of default
				if ( !! opts.behavior && this['_loadcallback_' + opts.behavior] !== undefined) {
					this['_loadcallback_' + opts.behavior].call(this, box, data);
					return;
				}

				switch (result) {
				case 'done':
					this._showdonemsg();
					return false;

				case 'no-append':
					if (opts.dataType === 'html') {
						data = '<div>' + data + '</div>';
						data = $(data).find(opts.itemSelector);
					}
					break;

				case 'append':
					var children = box.children();
					// if it didn't return anything
					if (children.length === 0) {
						return this._error('end');
					}

					// use a documentFragment because it works when content is going into a table or UL
					frag = document.createDocumentFragment();
					while (box[0].firstChild) {
						frag.appendChild(box[0].firstChild);
					}

					this._debug('contentSelector', $(opts.contentSelector)[0]);
					$(opts.contentSelector)[0].appendChild(frag);
					// previously, we would pass in the new DOM element as context for the callback
					// however we're now using a documentfragment, which doesn't have parents or children,
					// so the context is the contentContainer guy, and we pass in an array
					// of the elements collected as the first argument.

					data = children.get();
					break;
				}

				// loadingEnd function
				opts.loading.finished.call($(opts.contentSelector)[0], opts);

				// smooth scroll to ease in the new content
				if (opts.animate) {
					var scrollTo = $(window).scrollTop() + $('#infscr-loading').height() + opts.extraScrollPx + 'px';
					$('html,body').animate({
						scrollTop: scrollTo
					}, 800, function () {
						opts.state.isDuringAjax = false;
					});
				}

				if (!opts.animate) {
					// once the call is done, we can allow it again.
					opts.state.isDuringAjax = false;
				}

				callback(this, data, url);

				if (opts.prefill) {
					this._prefill();
				}
			},

			_nearbottom: function infscr_nearbottom() {

				var opts = this.options,
					pixelsFromWindowBottomToBottom = 0 + $(document).height() - (opts.binder.scrollTop()) - $(window).height();

				// if behavior is defined and this function is extended, call that instead of default
				if ( !! opts.behavior && this['_nearbottom_' + opts.behavior] !== undefined) {
					return this['_nearbottom_' + opts.behavior].call(this);
				}

				this._debug('math:', pixelsFromWindowBottomToBottom, opts.pixelsFromNavToBottom);

				// if distance remaining in the scroll (including buffer) is less than the orignal nav to bottom....
				return (pixelsFromWindowBottomToBottom - opts.bufferPx < opts.pixelsFromNavToBottom);

			},

			// Pause / temporarily disable plugin from firing
			_pausing: function infscr_pausing(pause) {

				var opts = this.options;

				// if behavior is defined and this function is extended, call that instead of default
				if ( !! opts.behavior && this['_pausing_' + opts.behavior] !== undefined) {
					this['_pausing_' + opts.behavior].call(this, pause);
					return;
				}

				// If pause is not 'pause' or 'resume', toggle it's value
				if (pause !== 'pause' && pause !== 'resume' && pause !== null) {
					this._debug('Invalid argument. Toggling pause value instead');
				}

				pause = (pause && (pause === 'pause' || pause === 'resume')) ? pause : 'toggle';

				switch (pause) {
				case 'pause':
					opts.state.isPaused = true;
					break;

				case 'resume':
					opts.state.isPaused = false;
					break;

				case 'toggle':
					opts.state.isPaused = !opts.state.isPaused;
					break;
				}

				this._debug('Paused', opts.state.isPaused);
				return false;

			},

			// Behavior is determined
			// If the behavior option is undefined, it will set to default and bind to scroll
			_setup: function infscr_setup() {

				var opts = this.options;

				// if behavior is defined and this function is extended, call that instead of default
				if ( !! opts.behavior && this['_setup_' + opts.behavior] !== undefined) {
					this['_setup_' + opts.behavior].call(this);
					return;
				}

				this._binding('bind');

				return false;

			},

			// Show done message
			_showdonemsg: function infscr_showdonemsg() {

				var opts = this.options;

				// if behavior is defined and this function is extended, call that instead of default
				if ( !! opts.behavior && this['_showdonemsg_' + opts.behavior] !== undefined) {
					this['_showdonemsg_' + opts.behavior].call(this);
					return;
				}

				opts.loading.msg
					.find('img')
					.hide()
					.parent()
					.find('div').html(opts.loading.finishedMsg).animate({
					opacity: 1
				}, 2000, function () {
					$(this).parent().fadeOut(opts.loading.speed);
				});

				// user provided callback when done    
				opts.errorCallback.call($(opts.contentSelector)[0], 'done');
			},

			// grab each selector option and see if any fail
			_validate: function infscr_validate(opts) {
				for (var key in opts) {
					if (key.indexOf && key.indexOf('Selector') > -1 && $(opts[key]).length === 0) {
						this._debug('Your ' + key + ' found no elements.');
						return false;
					}
				}

				return true;
			},

			/*	
            ----------------------------
            Public methods
            ----------------------------
            */

			// Bind to scroll
			bind: function infscr_bind() {
				this._binding('bind');
			},

			// Destroy current instance of plugin
			destroy: function infscr_destroy() {
				this.options.state.isDestroyed = true;
				this.options.loading.finished();
				return this._error('destroy');
			},

			// Set pause value to false
			pause: function infscr_pause() {
				this._pausing('pause');
			},

			// Set pause value to false
			resume: function infscr_resume() {
				this._pausing('resume');
			},

			beginAjax: function infscr_ajax(opts) {
				var instance = this,
					path = opts.path,
					box, desturl, method, condition;

				// increment the URL bit. e.g. /page/3/
				opts.state.currPage++;

				// Manually control maximum page 
				if (opts.maxPage != undefined && opts.state.currPage > opts.maxPage) {
					this.destroy();
					return;
				}

				// if we're dealing with a table we can't use DIVs
				box = $(opts.contentSelector).is('table') ? $('<tbody/>') : $('<div/>');

				if (typeof path === 'function' && !nastepnaStrona()) {
					this._showdonemsg();
					return false;
				}

				desturl = (typeof path === 'function') ? path(opts.state.currPage) : path.join(opts.state.currPage);
				instance._debug('heading into ajax', desturl);

				method = (opts.dataType === 'html' || opts.dataType === 'json') ? opts.dataType : 'html+callback';
				if (opts.appendCallback && opts.dataType === 'html') {
					method += '+callback';
				}

				switch (method) {
				case 'html+callback':
					instance._debug('Using HTML via .load() method');
					box.load(desturl + ' ' + opts.itemSelector, undefined, function infscr_ajax_callback(responseText) {
						instance._loadcallback(box, responseText, desturl);
					});

					break;

				case 'html':
					instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
					$.ajax({
						// params
						url: desturl,
						dataType: opts.dataType,
						complete: function infscr_ajax_callback(jqXHR, textStatus) {
							condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
							if (condition) {
								instance._loadcallback(box, jqXHR.responseText, desturl);
							} else {
								instance._error('end');
							}
						}
					});

					break;
				case 'json':
					instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
					$.ajax({
						dataType: 'json',
						type: 'GET',
						url: desturl,
						success: function (data, textStatus, jqXHR) {
							condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
							if (opts.appendCallback) {
								// if appendCallback is true, you must defined template in options.
								// note that data passed into _loadcallback is already an html (after processed in opts.template(data)).
								if (opts.template !== undefined) {
									var theData = opts.template(data);
									box.append(theData);
									if (condition) {
										instance._loadcallback(box, theData);
									} else {
										instance._error('end');
									}
								} else {
									instance._debug("template must be defined.");
									instance._error('end');
								}
							} else {
								// if appendCallback is false, we will pass in the JSON object. you should handle it yourself in your callback.
								if (condition) {
									instance._loadcallback(box, data, desturl);
								} else {
									instance._error('end');
								}
							}
						},
						error: function () {
							instance._debug("JSON ajax request failed.");
							instance._error('end');
						}
					});

					break;
				}
			},

			// Retrieve next set of content items
			retrieve: function infscr_retrieve(pageNum) {
				pageNum = pageNum || null;

				var instance = this,
					opts = instance.options;

				// if behavior is defined and this function is extended, call that instead of default
				if ( !! opts.behavior && this['retrieve_' + opts.behavior] !== undefined) {
					this['retrieve_' + opts.behavior].call(this, pageNum);
					return;
				}

				// for manual triggers, if destroyed, get out of here
				if (opts.state.isDestroyed) {
					this._debug('Instance is destroyed');
					return false;
				}

				// we dont want to fire the ajax multiple times
				opts.state.isDuringAjax = true;

				opts.loading.start.call($(opts.contentSelector)[0], opts);
			},

			// Check to see next page is needed
			scroll: function infscr_scroll() {

				var opts = this.options,
					state = opts.state;

				// if behavior is defined and this function is extended, call that instead of default
				if ( !! opts.behavior && this['scroll_' + opts.behavior] !== undefined) {
					this['scroll_' + opts.behavior].call(this);
					return;
				}

				if (state.isDuringAjax || state.isInvalidPage || state.isDone || state.isDestroyed || state.isPaused) {
					return;
				}

				if (!this._nearbottom()) {
					return;
				}

				this.retrieve();

			},

			// Toggle pause value
			toggle: function infscr_toggle() {
				this._pausing();
			},

			// Unbind from scroll
			unbind: function infscr_unbind() {
				this._binding('unbind');
			},

			// update options
			update: function infscr_options(key) {
				if ($.isPlainObject(key)) {
					this.options = $.extend(true, this.options, key);
				}
			}
		};


		/*	
        ----------------------------
        Infinite Scroll function
        ----------------------------

        Borrowed logic from the following...

        jQuery UI
        - https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js

        jCarousel
        - https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

        Masonry
        - https://github.com/desandro/masonry/blob/master/jquery.masonry.js		

*/

		$.fn.infinitescroll = function infscr_init(options, callback) {


			var thisCall = typeof options;

			switch (thisCall) {

				// method 
			case 'string':
				var args = Array.prototype.slice.call(arguments, 1);

				this.each(function () {
					var instance = $.data(this, 'infinitescroll');

					if (!instance) {
						// not setup yet
						// return $.error('Method ' + options + ' cannot be called until Infinite Scroll is setup');
						return false;
					}

					if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
						// return $.error('No such method ' + options + ' for Infinite Scroll');
						return false;
					}

					// no errors!
					instance[options].apply(instance, args);
				});

				break;

				// creation 
			case 'object':

				this.each(function () {

					var instance = $.data(this, 'infinitescroll');

					if (instance) {

						// update options of current instance
						instance.update(options);

					} else {

						// initialize new instance
						instance = new $.infinitescroll(options, callback, this);

						// don't attach if instantiation failed
						if (!instance.failed) {
							$.data(this, 'infinitescroll', instance);
						}

					}

				});

				break;

			}

			return this;
		};



		/* 
		 * smartscroll: debounced scroll event for jQuery *
		 * https://github.com/lukeshumard/smartscroll
		 * Based on smartresize by @louis_remi: https://github.com/lrbabe/jquery.smartresize.js *
		 * Copyright 2011 Louis-Remi & Luke Shumard * Licensed under the MIT license. *
		 */

		var event = $.event,
			scrollTimeout;

		event.special.smartscroll = {
			setup: function () {
				$(this).bind("scroll", event.special.smartscroll.handler);
			},
			teardown: function () {
				$(this).unbind("scroll", event.special.smartscroll.handler);
			},
			handler: function (event, execAsap) {
				// Save the context
				var context = this,
					args = arguments;

				// set correct event type
				event.type = "smartscroll";

				if (scrollTimeout) {
					clearTimeout(scrollTimeout);
				}
				window.setTimeout(function () {
					$(context).trigger('smartscroll', args);
				}, execAsap === "execAsap" ? 0 : 100);
			}
		};

		$.fn.smartscroll = function (fn) {
			return fn ? this.bind("smartscroll", fn) : this.trigger("smartscroll", ["execAsap"]);
		};


	})(window, $);


	$('.scale').parent().infinitescroll({
		navSelector: ".pager",
		nextSelector: ".pager a:contains('następna')",
		itemSelector: ".scale",
	},

	function (nowe) {
		var ukryjbelke = false;
		var ukryjform = true;
		var ukryjurwisko = false;



		if (ukryjbelke) {
			$('div.clr', nowe).remove()
		}
		if (ukryjform) {
			$('form[id=add-comment-profile]', nowe).hide();
			$("h4.c2c:contains('Mikroblog')", nowe).click(function () {
				$('form[id=add-comment-profile]', nowe).show();
			})
		}
		if (ukryjurwisko) {
			$("#dying-links-box", nowe).remove();
		}

		if ($.isFunction($.ukryj)) {
			$.ukryj();
		}

		$(".categories", nowe).remove();

		// Wykop CORE start
		window.$w = window.$w || {};
		window.$w.body = $(nowe);
		window.$w.stream = $('#activities-stream', nowe);
		window.$w.comments = $("#comments-list-entry", nowe);
		window.$w.related = $("#related-media", nowe);
		window.$w.tabindex = 0;
		var bindComments = window.$w.comments.length > 0;
		var bindMyWykop = window.$w.stream.length > 0;
		var bindCommentsForm = $("#add-comment-entry", nowe).length > 0;
		var bindFrame = $("#frame-top", nowe).length > 0;
		var bindArticle = $('#owncontent', nowe).length > 0;
		var isLazy = false;
		var submit_on_enter = false; // nie chce mi się tego sprawdzać, później dodam ;)

		$('ul.slidemenu', window.$w.body).on('click', function (e) {
			if (!$(e.target).is('.href') && (!$(this).is('.manual.active') || $(e.target).is('.inlblk, .close, input[type="submit"]'))) {
				$(this).find('ul').toggleClass('dnone');
				$(this).toggleClass('active');
				$(this).addClass('rel');
				var position = $(this).find('.slideoptions').position();
				var width = $(this).width();
				var height = $(this).height();
				if (!$(this).find('ul').is(':visible')) {
					$(this).css({
						'width': 'auto',
						'height': 'auto'
					});
					$(this).find('.slideoptions').css({
						'position': 'static'
					});
				} else {
					$(this).css({
						'width': width - 20,
						'height': height - 10
					});
					$(this).find('.slideoptions').css({
						'position': 'absolute',
						'left': position.left - 10,
						'top': position.top - 5
					});
				}
				return false;
			}
		}).on('mouseleave', function (e) {
			if ($(this).is('.active')) {
				$(this).find('.label').trigger('click');
			}
		}).on('mouseenter', function (e) {
			if (!$(this).is('.active') && !$(this).is('.manual') && !$(this).is('.jbury')) {
				$(this).find('.label').trigger('click');
			}
		});
		$('ul.slidebutton').on('mouseleave', function (e) {
			$(this).find('ul').addClass('dnone');
			$(this).removeClass('active');
			return false;
		}).on('click', function (e) {
			if (!$(e.target).is('.href') && (!$(this).is('.manual.active') || $(e.target).is('.inlblk, .close'))) {
				$(this).find('ul').toggleClass('dnone');
				$(this).toggleClass('active');
				return false;
			}
		});
		$('ul.slideselect', window.$w.body).on('click', function (e) {
			if (!$(e.target).is('.href') && (!$(this).is('.manual.active') || $(e.target).is('.inlblk, .close'))) {
				$(this).find('ul').toggleClass('dnone');
				$(this).toggleClass('active');
				return false;
			}
		});
		$("ul.slidemenu.categories", window.$w.body).on('click', 'a.customize', function () {
			if (!$(this).next('ul').is(':visible')) {
				$(this).closest('ul').find('li ul').slideUp();
				$(this).next('ul').slideDown();
			} else {
				$(this).next('ul').slideUp();
			}
			return false;
		});
		if ($('#dying-links-box', nowe).length > 0) {
			var $scope = $('#dying-links-box', nowe);
			$('.prev-link', $scope).on('click', function () {
				var $parent = $(this).closest('article');
				var $prev;
				if ($parent.prev().length > 0) {
					$prev = $parent.prev();
				} else {
					$prev = $parent.closest('div').children(':last');
				}
				$prev.show();
				$parent.hide();
				return false;
			});
			$('.next-link', $scope).on('click', function () {
				var $parent = $(this).closest('article');
				var $next;
				if ($parent.next().length > 0) {
					$next = $parent.next();
				} else {
					$next = $parent.closest('div').children(':first');
				}
				$next.show();
				$parent.hide();
				return false;
			});
		}
		$("a.closelink", nowe).click(function () {
			var caller = $(this);
			$.getJSON(www_base + "ajax/notlogged/close/" + $(this).data().item, function (r) {
				if (r.error) {
					alert(r.error);
					return;
				}
				caller.closest(".closelinkcontainer").hide();
			});
			return false;
		});
		$("a.diggit", nowe).on('click', function () {
			var $ref = $(this);
			var $counterEl = $ref.find('span.diggcount');
			var $actionEl = $ref.find('span.action');
			if ($actionEl.length == 0) {
				return false;
			}
			var action = $actionEl.html() == "cofnij" ? "cancel" : "vote";
			var id = $ref.data().id || $ref.closest('article').data().id;
			var url = www_base + "ajax/link/" + action + "/link/" + id + "/hash/" + hash;
			$.getJSON(url, {}, function (r) {
				if (r.error) {
					if (r.error == "Musisz być zalogowany.") {
						document.location = $ref.attr("href");
						return;
					}
					alert(r.error);
					return;
				}
				$counterEl.text(r.vote);
				if (action == "vote") {
					$actionEl.html("cofnij");
					$ref.addClass('digout');
					$ref.next('.jbury').addClass('dnone');
				} else {
					$actionEl.html("wykop");
					$ref.removeClass('digout');
					$ref.next('.jbury').removeClass('dnone');
				}
			});
			return false;
		});
		$("ul.jbury ul li", nowe).on('click', function () {
			var url = www_base + 'ajax/link/bury/type/' + $(this).data().reason + '/link/' + $(this).closest('article').data().id + '/hash/' + hash + '/group/' + group_domain;
			var ref = $(this);
			$.getJSON(url, {}, function (r) {
				if (r.error) {
					alert(r.error);
					return;
				}
				ref.parent().closest("ul.jbury").fadeOut(150).replaceWith('<a href="#" class="small"><span>zakopane</span> (<i class="cff5917 x-small">' + r.bury + '</i>)</a>').fadeIn(150);
			});
			return false;
		});
		if (bindFrame) {
			$("a.framediggit span.wykop", nowe).off('click').on('click', function () {
				$(this).next('span.text').trigger('click');
				return false;
			});
			$("a.framediggit span.text", nowe).on('click', function () {
				var $counterEl = $(this).closest("li.fleft").find("span.minicount");
				var $actionEl = $(this);
				if ($actionEl.html() == 'zakopane') return false;
				var action = $actionEl.html() == "cofnij" ? "cancel" : "vote";
				var id = $(this).closest("ul.slidebutton").data().id;
				var url = www_base + "ajax/link/" + action + "/link/" + id + "/hash/" + hash;
				$.getJSON(url, {}, function (r) {
					if (r.error) {
						if (r.error == "Musisz być zalogowany.") {
							document.location = $actionEl.closest("a").attr("href");
							return;
						}
						alert(r.error);
						return;
					}
					$counterEl.text(r.vote);
					if (action == "vote") {
						$actionEl.html("cofnij");
						$actionEl.addClass('digout');
						$actionEl.next("span.icon").addClass("dnone");
					} else {
						$actionEl.html("wykop");
						$actionEl.removeClass('digout');
						$actionEl.next("span.icon").removeClass("dnone");
					}
				});
				return false;
			});
			$("body").on("click", "a.framejbury", function () {
				var url = www_base + 'ajax/link/bury/type/' + $(this).data().reason + '/link/' + $(this).closest("ul.slidebutton").data().id + '/hash/' + hash + '/group/' + group_domain;
				var ref = $(this);
				$.getJSON(url, {}, function (r) {
					if (r.error) {
						alert(r.error);
						return;
					}
					ref.closest("ul.slidebutton").find("a.framediggit").attr("href", "#").removeClass('framediggit');
					ref.closest("ul.slidebutton").find("span.text").text('zakopane').fadeIn(150);
					ref.closest("ul.slidebutton").find("span.text").next("span.icon").addClass("dnone");
				});
				return false;
			});
		}
		$("#microblogForm", nowe).on('click', function () {
			$(this).closest("ul").next("form.dnone").show();
			$(this).closest("ul").next("form").find("textarea").focus();
			$(this).hide();
			return false;
		});
		$("#add-comment-profile", nowe).on("submit", function () {
			if ($(this).find("textarea").val().length == 0) {
				alert('Wpis musi zawierać tekst');
				return false;
			}
			$(this).find("input[type=submit]").val("...").attr("disabled", "disabled");
		});
		window.$w.stream.on("click", "a.favorite", function () {
			var caller = $(this);
			$.getJSON(www_base + "ajax/favorites/entry/" + caller.data().id + "/hash/" + hash, function (r) {
				if (r.error) {
					alert(r.error);
					return;
				}
				if (r.favorite) {
					caller.addClass('fbold').removeClass('fnormal');
				} else {
					caller.addClass('fnormal').removeClass('fbold');
				}
			});
			return false;
		});
		window.$w.stream.on("click", "a.showAllComments", function () {
			if ($(this).hasClass("aCCreload")) {
				getCommentsForEntry($(this).closest(".aC").data().id, $(this).closest(".aC").find("div.replyForm"));
			} else {
				$(this).closest(".aC").find(".aCC li.dnone").removeClass("dnone");
			}
			$(this).hide();
			return false;
		});
		window.$w.stream.on("click", "a.replyEntryComment", function (e, emptyForm) {
			var formBox = $(this).closest('li.aC').find('div.replyForm:eq(0)');
			var formAttached = false;
			if (formBox.find('form').length == 0) {
				formBox.html("<form method=\"post\" class=\"default addcommentin marginbott30 margintop10\">" + $("#add-comment-profile").html() + "</form>");
				window.$w.tabindex += 2;
				formBox.find('textarea').val('').attr('tabindex', window.$w.tabindex);
				formBox.find('input[type="submit"]').attr('tabindex', window.$w.tabindex + 1);
				formAttached = true;
			}
			var emptyForm = emptyForm || false;
			if (!emptyForm) {
				var login = $(this).closest('li').find('header a strong.fbold').eq(0).text();
				var body = formBox.find('textarea').val();
				formBox.find('textarea').focus().val(formBox.find('textarea').val() + (body.length > 0 && !body.match(/\s$/) ? ' ' : '') + '@' + login + ': ').keyup();
			}
			if (formAttached) {
				formBox.find('textarea').elastic().suggest(www_base + "ajax/suggest/", {
					natural: true
				});
				updateOnEnterButton(formBox);
			}
			getCommentsCountForEntry($(this).closest(".aC"));
			return false;
		});
		if ($("#add-comment-profile.open").length > 0) {
			$("a.replyEntryComment:eq(0)").trigger('click', [true]);
		}
		window.$w.body.on("keydown", "form.addcommentin textarea", function (e) {
			if (submit_on_enter && e.which == 13 && !e.shiftKey && $(this).closest("form").find("input[type=submit]").attr("disabled") != 'disabled') {
				$(this).closest("form").submit();
				return false;
			}
		});
		window.$w.stream.on("submit", "form", function () {
			var caller = $(this);
			input = caller.find("textarea");
			if ($.trim(input).length < 5 || $.trim(input).length > 5000) {
				alert('Wiadomość może mieć od 5 do 5000 znaków');
				return false;
			}
			var prev = $(this).find("input[type=submit]").val();
			$(this).find("input[type=submit]").val("...").attr("disabled", "disabled");
			$.post(www_base + "ajax/entries/addcomment/" + caller.closest("div.replyForm").data().id, $(this).serialize(), function (r) {
				if (r.error) {
					alert(r.error);
					caller.find("input[type=submit]").val(prev).removeAttr("disabled");
				}
				getCommentsForEntry(caller.closest("div.replyForm").data().id, caller.closest("div.replyForm"));
				caller.closest("div.replyForm").html("");
			}, 'json');
			return false;
		});
		window.$w.stream.on('click', 'a.toggle-comment', function () {
			$(this).closest('li').removeClass('hidden');
		});
		window.$w.stream.on("click", "li blockquote header a.plus", function () {
			var caller = $(this).closest("li");
			var item = caller.hasClass("aC") ? 1 : 2;
			var itemID = caller.data().id;
			var parent = "";
			if (!caller.hasClass("aC")) {
				parent = "/parentid/" + $(this).closest("li.aC").data().id;
			}
			if (!caller.find("blockquote:first header a.plus").hasClass("voted")) {
				$.getJSON(www_base + 'ajax/entries/vote/item/' + item + '/itemid/' + itemID + '/value/1/hash/' + hash + parent, {}, function (r) {
					if (r.error) {
						alert(r.error);
						return;
					}
					caller.find("header span.votC:first").html(r.vote_count);
					caller.find("p.votLiC:first").html(r.voters);
					caller.find("blockquote:first header a.plus").addClass("voted selected");
				});
			} else {
				$.getJSON(www_base + 'ajax/entries/unvote/item/' + item + '/itemid/' + itemID + '/value/1/hash/' + hash + parent, {}, function (r) {
					if (r.error) {
						alert(r.error);
						return;
					}
					caller.find("header:first span.votC").html(r.vote_count);
					caller.find("p.votLiC:first").html(r.voters);
					caller.find("blockquote:first header a.plus").removeClass("voted selected");
				});
			}
			return false;
		});
		window.$w.stream.on("click", "a.showVoters", function () {
			var caller = $(this).closest("li");
			var item = caller.hasClass("aC") ? 1 : 2;
			var itemID = caller.data().id;
			$.getJSON(www_base + 'ajax/entries/voters/item/' + item + '/itemid/' + itemID, {}, function (r) {
				if (r.error) {
					alert(r.error);
					return;
				}
				caller.find("header:first span.votC").html(r.vote_count);
				caller.find("p.votLiC:first").html(r.voters);
			});
			return false;
		});
		$("body").on("click", "a.deleteItem", function () {
			var result = confirm("Czy jesteś pewny?");
			if (result) {
				$(this).attr("href", appendGetParam($(this).attr("href"), "areYouSure=yEs"));
				var caller = $(this);
				$.getJSON($(this).attr("href"), function (r) {
					if (r.error) {
						alert(r.error);
						return;
					}
					caller.closest(".dC").remove();
				});
			}
			return false;
		});
		if (bindCommentsForm || bindMyWykop) {
			$("body").on("click", "a.submit_on_enter_toggle", function () {
				submit_on_enter = !submit_on_enter;
				updateOnEnterButton($(this).closest("form"));
				$.getJSON(www_base + "ajax/profile/option/name/submit_on_enter/value/" + (submit_on_enter ? 1 : 0));
				return false;
			});
		}
		$('a.slideBox', nowe).on('click', function () {
			var listTag = $(this).data().tag == undefined ? "ul" : $(this).data().tag;
			if ($(this).parent().next(listTag).is(':visible')) {
				$(this).find('.inlblk').html('rozwiń');
				$(this).find('.icon').removeClass('up').addClass('down');
			} else {
				$(this).find('.inlblk').html('zwiń');
				$(this).find('.icon').addClass('up').removeClass('down');
			}
			$(this).parent().next(listTag).slideToggle();
			return false;
		})
		if (bindComments || bindMyWykop) {
			var $scope = $('#activities-stream, #comments-list-entry');
			$scope.on('click.preview', "a", function (e) {
				var $this = $(this);
				if (e.which <= 1 && typeof $this.attr('href') !== "undefined" && ($this.attr('href').match(/\.(jpg|jpeg|png|gif)$/i) || $this.attr('href').match(/(youtube\.|youtu\.be|vimeo\.com)/i))) {
					if (bindMultimedia($this, true, true)) {
						e.preventDefault();
					}
				}
			});
			window.$w.body.on('click', "a.open_media_overlay", function () {
				var $this = $(this);
				var $form = $this.closest('form');
				var loaded = $('span.icon', $this).data('loaded');
				addSlimOverlay('<div class="pding0_10 tabs"><a href="#" title=""  class="c000">dodaj zdjęcie</a> | <a href="#" title="">wklej adres</a></div>' + '<div class="lheight30 tleft large overh pding5_10_10_10 file">' + '<div class="progress-bar"><input id="qbfile" name="#" type="file"></div>' + '</div>' + '<div class="lheight30 tright large overh pding5_10_10_10 dnone">' + '<div class="progress-bar"><input name="media_url" placeholder="URL zdjęcia lub filmu" type="text" class="pding5_0 fleft width280">' + '<a href="#" title="dodaj zdjęcie lub film" class="button blue fleft cfff marginleft10 normal closeOverlayAndSubmit"><span>Dodaj</span></a></div>' + '</div>', 'Dodaj zdjęcie lub film', $this.parent());
				var $overlay = $('#newOverlay');
				var attachMedia = function (media) {
					$('#newOverlay').fadeOut(function () {
						$(this).remove();
					});
					$('.addmedia', $form).removeClass('addmedia').addClass('addedmedia');
					$('input[name="media"]', $form).val(media.hash);
					$('div.previewBox div.bgfa', $form).remove();
					$('div.previewBox', $form).append('<div class="bgfa"><div class="preview"><img src="' + media.preview + '" width="30" height="30"/><b>' + media.name + '</b>' + '<span class="closelist marginleft10 caf small tdnone"><input type="checkbox" name="adultmedia" value="1" id="adultmedia"><label for="adultmedia">dla dorosłych</label></span>' + '<a href="#" class="closelist marginleft10 caf small tdnone"><span class="icon inlblk closelist mini vmiddle margintop">&nbsp;</span> <span class="hvline c347baa">usuń</span></a></div></div>');
					$('div.previewBox a.closelist', $form).on('click', function () {
						$('.addmedia', $form).removeClass('addedmedia').addClass('addmedia');
						$('input[name="media"]', $form).val('');
						$('div.previewBox div.bgfa', $form).remove();
						return false;
					});
				}
				$('.tabs a', $overlay).each(function (i) {
					var $ref = $(this);
					$ref.on('click', function () {
						$ref.addClass('c000').siblings().removeClass('c000');
						$ref.parent().nextAll('div.large').eq(i).show().siblings('div.large').hide();
						return false;
					});
				});
				$('input[name=media_url]', $overlay).blur(function () {
					var url = $(this).val();
					if (url.length > 2 && url.substring(0, 4) != 'http' && url.substring(0, 3) != 'ftp') {
						$(this).val('http://' + url);
					}
				});
				$('input[type="file"]', $overlay).ajaxfileupload({
					'action': www_base + 'ajax/embed/upload',
					'params': {
						'hash': hash
					},
					'onComplete': function (response) {
						if (response.error || response.message) {
							$overlay.fadeOut(function () {
								$(this).remove();
							});
							alert(response.error || response.message);
							return false;
						}
						attachMedia(response);
					},
					'onStart': function () {
						$(this).closest('.progress-bar').css({
							'width': '100%',
							'height': '30px',
							'background': 'url(/img/progress.gif) no-repeat center center'
						});
						$(this).hide();
					},
					'onCancel': function () {}
				});
				$('a.closeOverlayAndSubmit', $overlay).on('click', function () {
					$(this).closest('.progress-bar').css({
						'width': '100%',
						'height': '30px',
						'background': 'url(/img/progress.gif) no-repeat center center'
					}).children().hide();
					$.post(www_base + 'ajax/embed/url', {
						'url': $('input[name=media_url]', $overlay).val(),
						'hash': hash
					}, function (response) {
						if (response.error) {
							$overlay.fadeOut(function () {
								$(this).remove();
							});
							alert(response.error);
							return false;
						}
						attachMedia(response);
					});
					return false;
				});
				return false;
			});
			$scope.on('click', 'a.openEmbed', function () {
				var $this = $(this);
				$.getJSON(www_base + 'ajax/embed/html/type/' + $this.data('type') + '/id/' + $this.data('id'), function (r) {
					if (r.html) {
						$this.parent('p').replaceWith(r.html);
					}
				});
				return false;
			});
			$scope.on('click', 'a.tooLongPicture', function () {
				$(this).removeClass('tooLongPicture').find('.tooLongPictureHint').remove();
				return false;
			});

			function bindMultimedia(item, bindVideo, bindExternalImage) {
				if (!item.data().open) {
					var embed;
					var useLazy = isLazy;
					if (item.attr('href').match(/youtube\.|youtu\.be/)) {
						if (bindVideo) {
							var start = 0;
							var m = item.attr('href').match(/t=([0-9]+)s/);
							if (m) {
								start = parseInt(m[1]);
							}
							var m = item.attr('href').match(/t=([0-9]+)h([0-9]+)m([0-9]+)s/);
							if (m) {
								start = parseInt(m[1]) * 60 * 60 + parseInt(m[2]) * 60 + parseInt(m[3]);
							}
							var m = item.attr('href').match(/t=([0-9]+)m([0-9]+)s/);
							if (m) {
								start = parseInt(m[1]) * 60 + parseInt(m[2]);
							}
							var id = '';
							var m = item.attr('href').match(/youtu.be\/([^&#/\?]+)/);
							if (m) {
								id = m[1];
							}
							var m = item.attr('href').match(/v[=/]([^&#/\?]+)/);
							if (m) {
								id = m[1];
							}
							if (id.length > 0) {
								s = '';
								if (start > 0) {
									s = '&start=' + start;
								}
								useLazy = false;
								embed = '<iframe class="youtube-player vtop" type="text/html" width="800" height="485" src="http://www.youtube.com/embed/' + id + '?wmode=opaque' + s + '" frameborder="0"></iframe>';
							}
						}
					} else if (item.attr('href').match(/vimeo\.com/)) {
						if (bindVideo) {
							var id = '';
							var m = item.attr('href').match(/vimeo.com\/([^&#/\?]+)/);
							if (m) {
								id = m[1];
							}
							if (id.length > 0) {
								useLazy = false;
								embed = '<iframe id="vi-' + id + '" src="http://player.vimeo.com/video/' + id + '" width="800" height="485" frameborder="0" class="vtop"></iframe>';
							}
						}
					} else {
						var imgSrc;
						if (item.attr('href').match(/^http:\/\/[^\/]+\wykop.pl|http:\/\/[^\/]+\.demotywatory.pl|http:\/\/[^\/]+\.kwejk.pl|http:\/\/[^\/]+\.blogspot.com|http:\/\/[^\/]+\.yfrog.com|http:\/\/[^\/]+\.imageshack.us|http:\/\/[^\/]+\.tinypic.com|http:\/\/[^\/]+\.fotosik.pl/)) {
							imgSrc = item.attr('href');
						} else if (item.attr('href').match(/^http:\/\/i\.imgur\.com/)) {
							imgSrc = item.attr('href').replace(/([^l])(\..{3})$/, '$1l$2');
						} else if (item.attr('href').match(/^http:\/\/[^\/]+media\.tumblr\.com/)) {
							imgSrc = item.attr('href').replace(/_([0-9]+)(\..{3})$/, '_500$2');
						} else if (bindExternalImage) {
							imgSrc = item.attr('href');
						}
						if (imgSrc) {
							embed = '<img src="' + imgSrc + '" style="max-width: 400px;" />';
						}
					}
					if (embed) {
						item.data('open', 1);
						var html = (useLazy ? '<div class="lazy"><!--' : '') + '<span class="img_att block">' + embed + '<span class="block">źródło: <a href="' + item.attr('href') + '" target="_blank" data-open="1">' + item.attr('href').split('/')[2] + "</a></span></span>" + (useLazy ? "--></div>" : '');
						item.addClass('c222').after(html);
						if (item.text().match('^http:') || item.text().match('^https:')) {
							item.addClass('dnone');
						}
						item.next('.img_att').on('click', 'img', function (e) {
							e.preventDefault();
							$parent = $(this).closest('span.img_att');
							$parent.prev('a.dnone').removeClass('dnone').removeClass('c222');
							$parent.fadeOut();
						});
						return true;
					}
				}
			}
		}
		$('#upc, #activities-stream', nowe).on('click', 'a.show-more', function () {
			$(this).prev('.text-expanded').slideDown();
			$(this).hide();
			return false;
		});
		/* $('textarea.oneline, #add-comment-profile textarea').elastic().suggest(www_base + "ajax/suggest/", {
        natural: true
    }); */
		$(".lazy", nowe).lazyLoad();
		$('a.loadEmbed', window.$w.body).bind('click.preview', function (e) {
			if (e.which <= 1) {
				var bigPrev = $(this).hasClass("bigPrev");
				e.preventDefault();
				$(this).off('click.preview');
				var $article = $(this).closest('article');
				$article.addClass('link-' + $article.data().id);
				$.get(www_base + 'ajax/link/embed/' + $article.data().id, function (r) {
					if (r.html) {
						var $embed = $(r.html);
						if (bigPrev) {
							$embed.find('.close').remove();
							$('article.link-' + r.id + ' a.loadEmbed').replaceWith($embed.html());
						} else {
							$('article.link-' + r.id).find('div.content').after($embed);
							$embed.find('.close').on('click', function () {
								$(this).parent().slideUp(function () {
									$(this).remove();
								});
								return false;
							});
							$embed.slideDown();
							initFacebookAndGooglePlus();
						}
					}
				});
			}
		});
		$('#links-list a.showLink', nowe).on('click', function () {
			$(this).closest('article').removeClass('slim');
			$(this).fadeOut();
			return false;
		});
		if (bindArticle) {
			$('#owncontent img', nowe).error(function () {
				var res = $(this).attr('src').match(/\/([0-9A-Za-z]+_[0-9A-Za-z]+),w600\.jpg$/);
				if (res && res.length > 1) {
					$(this).attr('src', www_base + 'addpreview/m/' + res[1]);
					$(this).css('max-width', '600px');
					$(this).parent().attr('href', $(this).attr('src'));
				}
			});
		}
		/* $("body").delegate("a.showSpoiler", "click", function () {
        $(this).hide();
        $(this).next("code").show();
    }); */

		function updateOnEnterButton(form) {
			if (submit_on_enter) {
				form.find("a.submit_on_enter_toggle").addClass("blue");
				form.find("input[type='submit']").addClass("dnone");
				form.find("input[type='submit']").closest("span.button").addClass("dnone");
				if (form.find(".mainspace").is(".marginright104")) {
					form.find(".mainspace").addClass("marginright63").removeClass("marginright104");
				}
			} else {
				form.find("a.submit_on_enter_toggle").removeClass("blue");
				form.find("input[type='submit']").removeClass("dnone");
				form.find("input[type='submit']").closest("span.button").removeClass("dnone");
				if (form.find(".mainspace").is(".marginright63")) {
					form.find(".mainspace").addClass("marginright104").removeClass("marginright63");
				}
			}
		}

		function getCommentsCountForEntry(container) {
			$.get(www_base + "ajax/entries/commentscount/" + container.data().id + "/", function (r) {
				if (r.error) {
					alert(r.error);
				}
				if (checkAction('entries')) {
					$('#recent').remove();
				}
				var visibleComments = container.find('.aCC ul > li').length;
				var newComments = r.c;
				if (newComments > visibleComments) {
					newComments -= visibleComments;
					showNewEntryNewCommentsCount(container, newComments);
				}
			});
		}

		function checkAction(name) {
			return typeof _action !== "undefined" && _action == name;
		}

		function getCommentsForEntry(entryId, replyForm) {
			$.get(www_base + "ajax/entries/comments/" + entryId + "/", function (r) {
				if (r.error) {
					alert(r.error);
				}
				if (checkAction('entries')) {
					$('#recent').remove();
				}
				var prev = replyForm.prev();
				if (prev.hasClass("aCC")) {
					prev.replaceWith($(r.r).find(".aCC"));
				} else {
					prev.after($(r.r).find(".aCC"));
				}
				replyForm.closest(".aC").find("div.newInfo").remove();
			});
		}

		function appendGetParam(url, param) {
			return url + (url.indexOf('?') > 0 ? '&' : '?') + param;
		}

		function showNewEntryNewCommentsCount(container, count) {
			container.remove("newInfo");
			container.find(".newInfo").off("click");
			if (container.find(".aCC").length > 0) {
				if (container.find(".aCC .showAllComments span").text() < count) {
					container.find(".aCC").append("<div class=\"newInfo\"><span class=\"icon mini arrow\">&nbsp;</span>" + count + "</div>");
					container.find(".aCC .showAllComments span").text(count);
				}
			} else {
				container.find(".aCI").append("<div class=\"newInfo\"><span class=\"icon mini arrow\">&nbsp;</span>" + count + "</div>");
			}
			container.find(".newInfo").bind("click", function () {
				$(this).remove();
				getCommentsForEntry(container.data().id, container.find(".replyForm"));
			});
		}
		// Wykop CORE end
	});
}

if (document.getElementsByClassName('pager').length > 0) {
	if (typeof $ == 'undefined') {
		if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
			// Firefox
			var $ = unsafeWindow.jQuery;
			var hash = unsafeWindow.hash;
			var group_domain = unsafeWindow.group_domain;
			var www_base = unsafeWindow.www_base;
			main();
		} else {
			// Chrome
			addJQuery(main);
		}
	} else {
		// Opera
		main();
	}
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}