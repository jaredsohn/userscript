// ==UserScript==
// @id             pclab.pl-f11d6e64-4049-450b-82ff-2eeab1f16d52@scriptish
// @name           PCLab.pl Layout 3.1 (unofficial)
// @version        1.01
// @namespace      erykpiast
// @author         eryk.piast@gmail.com
// @description    Kilka drobnych modyfikacji ułatwiających korzystanie z serwisu PCLab.pl
// @match          http://pclab.pl/*
// @run-at         document-start
// ==/UserScript==

// var cssPath = 'http://duzezuchwy.pl/userscripts/pclab.pl/main.css';
var cssPath = 'http://pclab.pl/zdjecia/artykuly/napierala/000_userscript/main.css';

var verbose = false; // do debugowania

var defaultOptions = { // można śmiało zmieniać
	bottomBar: {
		on: true
	}, // << bottom bar
	liveComments: {
		on: true,
		highlight: true,
		notifier: true
	}, // << live comments 
	lightbox: {
		on: true,
		keyboard: true,
		zoom: true,
		split: true
	} // << lightbox,
};
var options = restoreOptions();
if(!options) {
	options = defaultOptions;

	storeOptions(options);
}

// ----------------------------------------------------------------------------

function storeOptions(options) {
	if(!options) return false;

	setTimeout(function() {
		GM_setValue('options', JSON.stringify(options));
	}, 0);

	if(verbose) {
		console.log("storeOptions_NOTICE: options stored");
	}

	return true;
}


function restoreOptions() {
	var options = GM_getValue('options');

	if(options) {
		options = JSON.parse(options);

		if(verbose) {
			console.log("restoreOptions_NOTICE: options restored");
		}

		return options;
	} else {
		return null;
	}
}


function initPCLabHelper() {
	var vars = {
		pageType: (function getPageType() {
			if((location.pathname == '/') || (location.pathname == '/index.html')) {
				return 'main';
			} else {
				var pattern = /^\/([a-z]{3,6}[-\.0-9]{1})/;
				
				var type = pattern.exec(location.pathname)[1];
				var control = type[type.length];
				type = type.slice(0, -1);
				
				
				if((control == '-') || (control == '.')) {
					if((type == 'art') || (type == 'tip')) {
						type = type+'s';
					}
				} else if(type == 'news') {
					type = type.slice(0, -1);
				}
				
				return type;
			}
		})(),
		cssPrefix: '_erykpiast_',
		labels: options.bottomBar ? {
			nextPageButton: 'Następna strona',
			nextNewsButton: 'Następna aktualność',
			nextCommentsButton: 'Następne komentarze',
			homePageButton: 'Strona domowa',
			topButton: 'Na górę'
		} : null,
		alertIcon: 'http://pclab.pl/zdjecia/artykuly/napierala/000_userscript/favicon-alert.ico'
	};
	var cssPref = vars.cssPrefix;

	// moduły aktywne na danej stronie
	var modules = (function() {
		var o = { };
		var pt = vars.pageType;

		if(pt != 'main') {
			o.bottomBar = true;
			if(pt == 'kom') o.liveComments = true;
			if(OR(pt, [ 'art', 'new', 'tip' ])) o.lightbox = true;
		}

		return o;
	})();

// definicje funkcji >>
	function OR(variable, alternatives) {
		return Array.prototype.some.call(alternatives, function(alt) {
			return (variable == alt);
		});
	}


	function parseInt0(str) {
		if(!str) return 0;

		var nb = parseInt(str);

		return (isNaN(nb) ? 0 : nb);
	}


	function relatedAncestors(node1, node2) {
		if(node1.ownerDocument !== node2.ownerDocument) return [ null, null ];
		else doc = node1.ownerDocument;

		var startAncestor = node1;
		var endAncestor = node2;

		while(startAncestor.parentNode !== doc) {
			while(endAncestor.parentNode !== doc) {
				if(startAncestor.parentNode === endAncestor.parentNode) {
					return [ startAncestor, endAncestor ];
				} else {
					endAncestor = endAncestor.parentNode;
				}
			}
			startAncestor = startAncestor.parentNode;
			endAncestor = node2;
		}

		return [ null, null ];
	}


	Date.now = function() {
		var now = new Date();
		return Date.parse(now) + now.getMilliseconds();
	};


	Array.clear = function(array /*, value */) {
		var value = ((arguments[1] !== undefined) ? arguments[1] : null);

		return array.filter(function(el) { if(el !== value) return true; });
	};


	$.fn.commonAncestor = function() {
	/* @scr: http://stackoverflow.com/questions/3217147/jquery-first-parent-containing-all-children
	*/
		var parents = [];
		var minlen = Infinity;

		$(this).each(function() {
			var curparents = $(this).parents();
			parents.push(curparents);
			minlen = Math.min(minlen, curparents.length);
		});

		for(var i in parents) {
			parents[i] = parents[i].slice(parents[i].length - minlen);
		}

		for(var i = 0; i < parents[0].length; i++) {
			var equal = true;
			for(var j in parents) {
				if(parents[j][i] != parents[0][i]) {
					equal = false;
					break;
				}
			}
			if(equal) return $(parents[0][i]);
		}

		return $([]);
	};

	$.fn.noText = function(ignoreSpaces) {
		ignoreSpaces = !!ignoreSpaces;

		if($(this).text() == '' || ignoreSpaces && !/[\S]+/.test($(this).text())) {
			return true;
		} else {
			return false;
		}
	};

	$.isString = function(obj) {

		return ((typeof(obj) == "string") || (obj instanceof String));
	};

	$.isNumber = function(obj) {

		return ((typeof(obj) == "number") || (obj instanceof Number));
	};
// << definicje funkcji

// definicje obiektów >>

	var Keyboard, keyboard;
	if(modules.lightbox && options.lightbox.on && options.lightbox.keyboard) {
		Keyboard = function(proto) {
			this.handlers = [ ];

			this.codes = this._getCodes();

			this.keys = [];
			this.keys.indexOf = function(value) {
				for(var i = 0; i < this.length; i++) {
					if(this[i].key == value) return i;
				}

				return -1;
			};
			this.keys.push = function(value) {
				Array.prototype.push.call(this, { key: value, timestamp: 0, down: 0, handlers: [] });

				return this.length;
			};

			this.current = [ ];
				this.current.toString = function() {
				return this.join("");
			};

			if(proto) this.init.call(this, proto);
		}

		Keyboard.prototype = {
			minTimeGap: 50,
			init: function(proto) {
				proto = proto || { };

				this.codes = (proto.codes ? proto.codes : this.codes);
				
				this.assignElement(proto.element);

				if(proto.handlers) this.addHandlers(proto.handlers);

				this.enable();

				return true;
			},
			assignElement: function(element) {
				if(element && (element !== this.element)) {

					if(this.element) {
						this.disable(true);
					}

					this.element = element;
					
					this.enable(true);
				}

				return true;
			},
			addHandlers: function(handlers) {
				if(!$.isArray(handlers)) return false;

				this.handlers = this.handlers.concat(handlers.map(function(el) {
					var obj = {
						pattern: ((el.pt !== undefined) && ($.isString(el.pt)) ? el.pt.split("+", 3) : ((el.pattern !== undefined) && ($.isString(el.pattern)) ? el.pattern.split("+", 3) : ((el[0] !== undefined) && ($.isString(el[0])) ? el[0].split("+", 3) : null))),
						fn: (el.fn && ($.isFunction(el.fn)) ? el.fn : (el[1] && ($.isFunction(el[1])) ? el[1] : null)),
						context: (el.fc ? el.fc : (el.context ? el.context : (el[2] ? el[2] : null))),
						preventDefault : (el.pd !== undefined ? !!el.pd : (el.preventDefault !== undefined ? !!el.preventDefault : (el[3] !== undefined ? el[3] : false))),
						onPress: (el.op !== undefined ? !!el.op : (el.onPress !== undefined ? !!el.onPress : (el[4] !== undefined ? el[4] : true))),
						repeat: (el.rp !== undefined ? !!el.rp : (el.repeat !== undefined ? !!el.repeat : (el[5] !== undefined ? el[5] : false)))
					};

					if((obj.pattern === null) || ((obj.fn === null) && (obj.preventDefault === null))) return null;
					else return obj;
				}));

				this.handlers = Array.clear(this.handlers);
				if(this.handlers.length == 0) return false;

				this._buildKeys();

				return true;
			},
			enable: function(force) {
				if((this._active !== true) || force) {
					this._active = true;

					if(this.element) {
						this.element.on('keydown', $.proxy(this._keydownHandler, this));
						this.element.on('keyup', $.proxy(this._keyupHandler, this));
					}
				}

				return true;
			},
			disable: function(force) {
				if((this._active !== false) || force) {
					this._active = false;

					if(this.element) {
						this.element.off('keydown', this._keydownHandler);
						this.element.off('keyup', this._keyupHandler);
					}
				}

				return true;
			},
			_buildKeys: function() {
				this.handlers.forEach(function(el) {
					el.pattern.toString = this.current.toString;

					for(var i = 0; i < el.pattern.length; i++)
					{
						var index = this.keys.indexOf(el.pattern[i]);

						if(index == -1) {
							index = this.keys.push(el.pattern[i]) - 1;
						}

						this.keys[index].handlers.push(el);
					}
				}, this);

				return true;
			},
			_keydownHandler: function(e) {
				if(!this._active) return false;

				if(this.current.length == 3) return false;

				var name = '';
				var code = e.which;
				if(((code < 91) && (code > 64)) || ((code < 123) && (code > 96))) {
					name = String.fromCharCode(code).toUpperCase();
				} else {
					name = this.codes[code];
				}

				if(name && (this.current.indexOf(name) == -1)) {
					this.current.push(name);
				}

				var index = this.keys.indexOf(name);
				if(index != -1) {
					var now = Date.now();

					if(this.keys[index].handlers.length) {
						if(verbose) {
							console.log('Keyboard.prototype._keyupHandler_NOTICE: keys ' + this.current.toString() + ' catched');
						}

						this.keys[index].handlers.forEach(function(handler) {
							if(!handler.onPress) {
								handler.pattern.sort();
								this.current.sort();

								if(handler.pattern.toString() == this.current.toString()) {
									if(handler.preventDefault) {
										e.preventDefault();
									}

									if(!handler.repeat) {
										if((parseInt0(now - this.keys[index].timestamp) < this.minTimeGap) || !this.keys[index].down) {
											this.keys[index].timestamp = now;

											return true;
										}
									}

									this.keys[index].timestamp = now;
									this.keys[index].down = true;

									if(handler.fn) {
										handler.fn.call(handler.context, e);
									}
								}
							}
						}, this);
					}
				}
				
				return true;
			},
			_keyupHandler: function(e) {
				if(!this._active) return false;

				var name = '';
				var code = e.which;
				if(((code < 91) && (code > 64)) || ((code < 123) && (code > 96))) {
					name = String.fromCharCode(code);
				} else {
					name = this.codes[code];
				}

				var index = this.keys.indexOf(name);
				if(index != -1) {
					var now = Date.now();

					if(this.keys[index].handlers.length) {
						if(verbose) {
							console.log('Keyboard.prototype._keyupHandler_NOTICE: keys ' + this.current.toString() + ' catched');
						}

						this.keys[index].handlers.forEach(function (handler) {
							if(handler.onPress) {
								handler.pattern.sort();
								this.current.sort();

								if(handler.pattern.toString() == this.current.toString()) {
									if(handler.preventDefault) {
										e.preventDefault();
									}

									if(handler.repeat || (parseInt0(now - this.keys[index].timestamp) > this.minTimeGap) || !this.keys[index].down) {
										if(handler.fn) {
											handler.fn.call(handler.context, e);
										}
									}
								}
							}
						}, this);
					}

					this.keys[index].timestamp = now;
					this.keys[index].down = false;
				}

				var i = this.current.indexOf(name);
				if(i != -1) {
					this.current.splice(i, 1);
				}

				return false;
			},
			_getCodes: function() {
				var codes = [];

				codes[32] = "Space";
				codes[13] = "Enter";
				codes[9] = "Tab";
				codes[27] = "Esc"; // Escape
				codes[8] = "Back"; // Backspace
				codes[16] = "Shift";
				codes[17] = "Ctrl"; // Control
				codes[18] = "Alt";
				codes[20] = "Caps"; // Caps Lock
				codes[144] = "Num"; // Num Lock
				codes[37] = "LeftArrow";
				codes[38] = "UpArrow";
				codes[39] = "RightArrow";
				codes[40] = "DownArrow";

				return codes;
			}
		};
		keyboard = new Keyboard();
		keyboard.init();
	} // << Keyboard

	var ActivityDetector, activityDetector;
	if(modules.liveComments && (options.liveComments.notifier || options.liveComments.highlight)) {
		ActivityDetector = function(p) {
			def = {
				checkingInterval: 2000, // ms
				inactivityTimeout: 10000 // ms
			};

			var proto = this.proto = (p ? {
				checkingInterval: (((p.checkingInterval !== undefined) && $.isNumber(p.checkingInterval)) ? p.checkingInterval : def.checkingInterval),
				inactivityTimeout: (((p.inactivityTimeout !== undefined) && $.isNumber(p.inactivityTimeout)) ? p.inactivityTimeout : def.inactivityTimeout)
			} : def);

			this._checkingInterval = proto.checkingInterval;
			this._inactivityTimeout = proto.inactivityTimeout;

			this._paused = true;

			this.userHere = true;
			this.userActive = true;

			this._ignore = { };
		}

		ActivityDetector.prototype = {
			toString: function() { return "[object ActivityDetector]"; },
			start: function(force) {
				if(!this._paused && !force) return true;

				if(this._intervalHandler) {
					return false;
				} else {
					var that = this;
					this._intervalHandler = setInterval($.proxy(this._checkActivity, this), this._checkingInterval);

					if(!(this._onfocus && this._onblur)) {
						this._onfocus = $.proxy(this._setUserIsHere, this);
						$(window).on('focus', this._onfocus);

						this._onblur = $.proxy(this._setUserIsOut, this);
						$(window).on('blur', this._onblur);
					}

					this._paused = false;

					return true;
				}
			},
			pause: function(force) {
				if(this._paused) return true;

				if(this._intervalHandler && this._onfocus && this._onblur) {
					window.clearInterval(this._intervalHandler);
					this._intervalHandler = null;

					if(!force) {
						$(window).off('focus', this._onfocus);
						$(window).off('blur', this._onblur);
					}

					this._paused = true;

					return true;
				} else {
					return false;
				}
			},
			ignore: function(/* methods */) {
				for(var i = 0, maxi = arguments.length; i < maxi; i++) {
					var method = arguments[i];
				
					this._ignore[method] = true;
				}

				this._releaseHandlers.apply(this, arguments);

				return true;
			},
			check: function(/* methods */) {
				for(var i = 0, maxi = arguments.length; i < maxi; i++) {
					var method = arguments[i];
				
					delete this._ignore[method];
				}

				return true;
			},
		// internal >>
			_checkActivity: function() {
				this._assignHandlers();

				if(!this._timeoutHandler) {
					var that = this;
					this._timeoutHandler = setTimeout(function() {
						that._setUserIsUnactive();
						that._timeoutHandler = null;
						return true;
					}, this._inactivityTimeout);
				} else {
					return false;
				}

				if(verbose) {
					console.log("ActivityDetector.prototype._checkActivity_NOTICE: checking activity");
				}

				return true;
			},
			_setUserIsActive: function(method, e) {
				this._releaseHandlers();

				this.pause(true);
				this.start(true);

				if(!this.userActive) {
					$(this).trigger('active', [ method ]);
				}

				this.userActive = true;

				if(verbose) console.log("ActivityDetector.prototype._setUserIsActive_NOTICE: user is active (method " + method + ")");

				return true;
			},
			_setUserIsUnactive: function(e) {
				clearInterval(this._intervalHandler);
				this._intervalHandler = null;

				if(this.userActive) {
					$(this).trigger('unactive');
				}
				
				this.userActive = false;

				if(verbose) console.log("ActivityDetector.prototype._setUserIsUnactive_NOTICE: user is unactive");

				return true;
			},
			_setUserIsHere: function(e) {
				if(this.userHere) return true;

				$(this).trigger('here');

				this.userHere = true;

				if(verbose) console.log("ActivityDetector.prototype._setUserIsHere_NOTICE: user is here");

				return true;
			},
			_setUserIsOut: function(e) {
				if(!this.userHere) return false;

				$(this).trigger('out');

				this.userHere = false;

				if(verbose) console.log("ActivityDetector.prototype._setUserIsOut_NOTICE: user is out");

				this._setUserIsUnactive();
				this._assignHandlers();

				return true;
			},
			_assignHandlers: function() {
				if(this._onmousemove && this._onkeydown && this._onscroll) return false;

				if(!this._ignore.mousemove) {
					this._onmousemove = $.proxy(this._setUserIsActive, this, 1);
					$(document.body).on('mousemove', this._onmousemove);
				}

				if(!this._ignore.keydown) {
					this._onkeydown = $.proxy(this._setUserIsActive, this, 2);
					$(document.body).on('keydown', this._onkeydown);
				}

				if(!this._ignore.scroll) {
					this._onscroll = $.proxy(this._setUserIsActive, this, 3);
					$(window).on('scroll', this._onscroll);
				}

				return true;
			},
			_releaseHandlers: function(/* list */) {
				var list = $.makeArray(arguments);

				if(this._onmousemove && (!list.length || list.indexOf('mousemove') > -1)) {
					$(document.body).off('mousemove', this._onmousemove);
					this._onmousemove = null;
				}

				if(this._onkeydown && (!list.length || list.indexOf('keydown') > -1)) {
					$(document.body).off('keydown', this._onkeydown);
					this._onkeydown = null;
				}

				if(this._onscroll && (!list.length || list.indexOf('scroll') > -1)) {
					$(window).off('scroll', this._onscroll);
					this._onscroll = null;
				}

				if(this._timeoutHandler) {
					window.clearTimeout(this._timeoutHandler);
					this._timeoutHandler = null;
				}

				return true;
			}
			/* internal
			 * <<
			 */
		};

		activityDetector = new ActivityDetector();
		activityDetector.start();
	} // << ActivityDetector

	var Favicon;
	if(modules.liveComments && options.liveComments.notifier) {
		Favicon = function() {
			this._icons = [ ];

			this.load.apply(this, arguments);
		}

		Favicon.prototype = {
			toString: function() { return '[object Favicon]'; },
			interval: null,
			defaultInterval: 1000,
			defaultSrc: "favicon.ico",
			srcPrefix: "",
			srcSufix: "",
			load: function(icons, prefix, sufix) {
				if(!icons || !$.isArray(icons)) return false;

				if(prefix !== undefined) this.srcPrefix = prefix;
				if(sufix !== undefined) this.srcSufix = sufix;

				icons.forEach(this._loadIcon, this);

				return true;
			},
			set: function(index, dontStopAnimation) {
				if(!this.initialized) {
					if(verbose) console.log("Favicon.prototype.set_ERROR: Object must be initialized before using!");
					return false;
				}

				if(!dontStopAnimation && (this._interval !== null)) this._clearInterval();

				var src;
				if(!isNaN(parseInt(index))) {
					src = this._icons[index];
				} else if($.isString(index)) {
					src = this._icons[this._icons[index]];
				} else {
					if(verbose) console.log('Favicon.prototype.set_ERROR: index must be a number');
					return false;
				}

				src = this.srcPrefix + src + this.srcSufix;

				var newIcon = $('<link rel="shortcut icon" type="image/x-icon" href="' + src + '">');
				this._currentIcon.replaceWith(newIcon);

				return (this._currentIcon = newIcon);
			},
			animate: function(indexes, interval) {
				if(!$.isArray(indexes)) return false;

				if(this._interval !== null) this._clearInterval();

				var current = 0;
				var iLength = indexes.length;

				this._interval = setInterval($.proxy(function() {
					this.set(indexes[current], true);
					current++;

					if(current >= iLength) current = 0;
				},  this), (interval || this.defaultInterval));
			},
			init: function() {
				this._currentIcon = $('head > link[type="image\/x-icon"][rel="shortcut icon"]');
				
				this.initialized = true;

				if(!this._currentIcon.length) {
					return !!(this._currentIcon = this.set(this.defaultSrc));
				} else {
					return true;
				}
			},
			/*
			* internal >>
			*/
			_clearInterval: function() {
				clearInterval(this._interval);
				this._interval = null;

				return true;
			},
			_loadIcon: function(icon) {
				var src;
				if($.isString(icon)) {
					src = icon;
				} else if($.isString(icon.src)) {
					src = icon.src;
				} else {
					if(verbose) {
						console.log('Favicon.prototype.loadIcon_ERROR: Icon must be a String or object with "src" and "id" properties!');
					}

					return false;
				}

				src = this.srcPrefix + src + this.srcSufix;

				var img = new Image();
				$(img).load($.proxy(this._loadHandler, this, icon));
				img.src = src;

				return true;
			},
			_loadHandler: function(icon, e) {
				var iconSrc = (icon.src || icon);

				var newLength = this._icons.push(iconSrc);

				if($.isString(icon.id)) {
					if(this._icons[icon.id] !== undefined) {
						if(verbose) console.log("Favicon.prototype._loadHandler_WARNING: no icon id");
						return false;
					} else {
						this._icons[icon.id] = (newLength - 1);

						return true;
					}
				}
			}
			/*
			* << internal
			*/
		};
	} // << Favicon

	var Notifier, notifier;
	if(modules.liveComments && options.liveComments.on && options.liveComments.notifier) {
		Notifier = function(alertIcon) {
			if(!alertIcon) {
				alertIcon = 'favicon-alert.ico';
			}

			this.favicon = new Favicon([ { id: 'default', src: 'favicon.ico' }, { id: 'alert', src: alertIcon } ]);
		}

		Notifier.prototype = {
			toString: function() { return '[object Notifier]'; },
			favicon: null,
			activityDetector: activityDetector,
			init: function() {
				this.favicon.init();

				this._onactive = $.proxy(this._activeHandler, this);
				$(this.activityDetector).on('active', this._onactive);
				this.activityDetector.start();

				return true;
			},
			notify: function(force) {
				if(!this.activityDetector.userActive || !!force) {
					this.favicon.animate([ 'default', 'alert' ]);

					return true;
				}

				return false;
			},
			_activeHandler: function() {
				this.favicon.set('default');

				return true;
			}
		};
		notifier = new Notifier(vars.alertIcon);
		notifier.init();
	} // << Notifier

	var UIButton;
	if((modules.bottomBar && options.bottomBar.on) || (modules.lightbox && options.lightbox.on)) {
		UIButton = function(proto) {
			if(!proto) {
				if(verbose) {
					console.log("UIButton.constructor_ERROR: button prototype expected");
				}

				return false;
			}

			this.id = (proto.id ? proto.id.toString() : null);
			this.className = (proto.className ? proto.className.toString() : null);
			this.action = (proto.action && $.isFunction(proto.action) ? proto.action : null);
			this.label = (proto.label ? proto.label.toString() : null);

			var el = this.element = $('<a href="#"' + (this.id ? ' id="' + this.id.toString() + '"' : '') + (this.className ? ' class="' + this.className.toString() + '"' : '') + '><span>' + (this.label ? this.label.toString() : '') + '</span></a>').hover($.proxy(this._hoverHandler, this));
			el.wrapper = this;

			if(this.action) {
				el.click($.proxy(this._clickHandler, this));
			}

			this.enable();

			this._hovered = false;
		}

		UIButton.prototype = {
			toString: function() { return '[object UIButton]'; },
			classNames: {
				active: cssPref + 'active',
				unactive: cssPref + 'unactive',
				hover: cssPref + 'hover'
			},
			enable: function() {
				if(!this.active) {
					this.element.removeClass(this.classNames.unactive);
					this.element.addClass(this.classNames.active);

					this.active = true;
				}

				return true;
			},
			disable: function() {
				if(this.active) {
					this.element.removeClass(this.classNames.active);
					this.element.addClass(this.classNames.unactive);

					this.active = false;
				}

				return true;
			},
			hover: function() {
				this.element.addClass(this.classNames.hover);

				this._hovered = true;

				return true;
			},
			unhover: function() {
				this.element.removeClass(this.classNames.hover);

				this._hovered = false;

				return true;
			},
			setLabel: function(label) {
				if(label === undefined) label = '';

				this.element.children(':first-child').text(label.toString());

				return true;
			},
			_clickHandler: function(e) {
				if(!e) return false;

				if(this.active) {
					e.preventDefault();

					this._runAction();

					return true;
				} else {
					return false;
				}
			},
			_hoverHandler: function(e) {
				if(e) {

					if(this.active && !(this._hovered && e.type == 'mouseenter')) {
						this.element.toggleClass(cssPref + 'hover');

						this._hovered = !this._hovered;
					}
				}

				return true;
			},
			_runAction: function() {
				var ac = this.action;

				if(ac) {
					var cx = ac.context;
					var as = ac.args;

					if(as) {
						if($.isArray(as)) {
							as = [ this ].concat(as);
						} else {
							as = [ this, as ];
						}
					} else {
						as = this;
					}

					setTimeout(function() { ac.apply(cx, as); }, 0);

					return true;
				}

				return false;
			}
		};
	} // << UIButton

	var UISwitch;
	if(modules.liveComments && options.liveComments.on) {
		UISwitch = function(proto) {
			if(!proto) {
				if(verbose) {
					console.log("UISwitch.constructor_ERROR: button prototype expected");
				}

				return false;
			}

			this.id = (proto.id ? proto.id.toString() : null);
			this.className = (proto.className ? proto.className.toString() : null);
			this.actions = (proto.actions && $.isArray(proto.actions) ? proto.actions : null);
			this.label = (proto.label ? proto.label.toString() : null);

			var el = this.element = $('<a href="#"' + (this.id ? ' id="' + this.id.toString() + '"' : '') + (this.className ? ' class="' + this.className.toString() + '"' : '') + '><span>' + (this.label ? this.label.toString() : '') + '</span></a>');
			el.wrapper = this;

			if(this.actions) {
				el.click($.proxy(this._clickHandler, this));
			}

			this.enable();

			this.setState(0);
		}

		UISwitch.prototype = {
			toString: function() { return '[object UISwitch]'; },
			enable: function() {
				if(!this.active) {
					this.element.removeClass(cssPref + 'unactive');
					this.element.addClass(cssPref + 'active');

					this.active = true;
				}

				return true;
			},
			disable: function() {
				if(this.active) {
					this.element.removeClass(cssPref + 'active');
					this.element.addClass(cssPref + 'unactive');

					this.active = false;
				}

				return true;
			},
			toggleState: function() {
				this.element.removeClass(cssPref + 'state_' + this.state);

				this.state = (1 - this.state);

				this.element.addClass(cssPref + 'state_' + this.state);

				return true;
			},
			setState : function(s /* [force] */) {
				if((arguments[1] !== true) && (s == this.state)) return s;

				this.element.removeClass(cssPref + 'state_' + this.state);

				this.state = ((s == 0 || s == 1) ? s : this.state);

				this.element.addClass(cssPref + 'state_' + this.state);

				return true;
			},
			_clickHandler: function(e) {
				if(this.active) {
					e.preventDefault();

					this._runAction();

					this.toggleState();

					return true;
				} else {
					return false;
				}
			},
			_runAction: function() {
				var ac = this.actions[this.state];

				if(ac) {
					var cx = ac.context;
					var as = ac.args;

					if(as) {
						if($.isArray(as)) {
							as = [ this ].concat(as);
						} else {
							as = [ this, as ];
						}
					} else {
						as = this;
					}

					setTimeout(function() { ac.apply(cx, as); }, 0);

					return true;
				}

				return false;
			}
		};
	} // << UISwitch

	var BottomBar;
	if(modules.bottomBar && options.bottomBar.on) {
		BottomBar = function() {
			
		}

		BottomBar.prototype = {
			toString: function() { return '[object BottomBar]'; },
			classNames: {
				button: cssPref + 'button',
				link: cssPref + 'link',
				title: cssPref + 'title',
				wrapper: cssPref + 'wrapper'
			},
			ids: {
				element: cssPref + 'bottom_bar',
				buttons: {
					toTop: cssPref + 'to_top',
					next: cssPref + 'next_pub'
				}
			},
			actions: {
				buttons: {
					toTop: function() {
						return this._goToTop();
					},
					toNextPage: function(button, url) {
						return location.assign(url);
					},
					toHome: function() {
						return location.assign('http://pclab.pl');
					}
				}
			},
			publicationTitleSelector: '#main .content .title h1 a',
			allCommentsSelector: '#main .comments .header .tab span a',
			init: function(container, content, sidebar, scrollableElement, positioner) {
				if((container && container.length) && (content && content.length) && (sidebar && sidebar.length) && (scrollableElement && scrollableElement.length)) {
					this.container = container;
					this._containerTop = this.container.offset().top;

					this.content = content;
					this.sidebar = sidebar;
					this.positioner = (positioner && positioner.length ? positioner : null);
					this._scrollableElement = scrollableElement;

					var el = this.element = $('<div id="' + this.ids.element + '"></div>');
					el.wrapper = this;
					el.css('left', (this.sidebar.offset().left + 5) + 'px');

					var buttons = this.buttons = { };

					this.actions.buttons.toTop.context = this;
					var toTopButton = this.buttons.toTop = new UIButton({ id: this.ids.buttons.toTop, className: this.classNames.button, action: this.actions.buttons.toTop, label: vars.labels.topButton });

					el.append(toTopButton.element);

					var next = $('<span id="' + this.ids.buttons.next + '"></span>');
					el.append(next);
					this._createNextPageButton(next);
						
					this.element.css('visibility', 'hidden');
					this.container.append(el);
					this._setPosition();
					this.element.css('visibility', 'visible');

					$(window).on('scroll', $.proxy(this._setPosition, this));
					$(window).on('resize', $.proxy(function() {
						this.element.css('left', (this.sidebar.offset().left + 5) + 'px');

						this._setPosition();
					}, this));

					return true;
				} else {
					if(verbose) {
						console.log("BottomBar.prototype.init_ERROR: missing or bad argument(s)");
					}

					return false;
				}
			},
			_goToTop: function() {
				this._scrollableElement.animate({ scrollTop: 0 }, 250);

				return true;
			},
			_setPosition: function() {
				var newTop = this._scrollableElement.scrollTop() + window.innerHeight - this.element.height(); 
				var maxTop = Math.max(this.container.offset().top + this.container.height() - this.element.height(), this.sidebar.offset().top + this.sidebar.height() - this.element.height());
				var minTop = Math.min(window.innerHeight + this.container.offset().top, maxTop);


				if(maxTop < minTop) {
					this.sidebar.css('margin-bottom', (this.element.height() + 40) + 'px');
					maxTop = minTop;
				}

				if(newTop > maxTop) {
					this.element.css('bottom', (newTop - maxTop) + 'px');

					if(this.content.css('margin-bottom') == '0px') {
						var margin = (vars.pageType == 'kom' ? 11 : (vars.pageType == 'new' ? 6 : 4)) + 'px'; // dlaczego tak? nie mam czasu zeby sie bawic; this.positioner!
						this.content.css('margin-bottom', margin);
					}
				} else if(newTop < minTop) {
					this.element.css('bottom', (newTop - minTop) + 'px');
				} else {
					this.element.css('bottom', '0');
				}

				return true;
			},
			_createNextPageButton: function(container) {
				var link = $('link[rel="next"]');
				if(!link.length) link = $('#main .content .main .title a');

				var linkToCurrentPage = ((new RegExp('^' + link.attr('href').slice(0, -5))).test(location.pathname.slice(0, -5)));

				if(link.length && !linkToCurrentPage) {
					var art = /\/art/.test(link.get(0).getAttribute('href'));
					var comments = (link.get(0).tagName == 'A');

					if(!(art && comments)) {
						var toNextPage = this.actions.buttons.toNextPage;
						toNextPage.context = this;
						toNextPage.args = link.attr('href');
						var nextButton = this.buttons.next = new UIButton({ className: this.classNames.link, action: toNextPage, label: (art ? vars.labels.nextPageButton : vars.labels.nextNewsButton) });
						container.append(nextButton.element);

						var nextTitle = $('<span class="' + this.classNames.title + '"></span>');
						container.append(nextTitle);

						if(comments) {
							this._createNextCommentButton(link, container, nextButton, nextTitle);
						} else {
							nextTitle.append($('#main .content .substance .navigation .next .name a').clone());

							return true;
						}

						return true;
					}
				}

				this._createHomeButton(container);

				return true;
			},
			_createHomeButton: function(container, replace) {
				this.actions.buttons.toHome.context = this;
				var homeButton = this.buttons.home = new UIButton({ className: this.classNames.link, action: this.actions.buttons.toHome, label: vars.labels.homePageButton });

				var parent;
				if(replace) {
					parent = replace.element.parent();

					replace.element.replaceWith(homeButton.element);
				} else {
					container.append(homeButton.element);

					parent = container;
				}

				parent.addClass(cssPref + 'home');

				return true;
			},
			_createNextCommentButton: function(link, container, button, title) {
				button.element.hide();
				var that = this;
				title.load(link.attr('href') + ' link[rel="next"]', function() {
					var link = title.children('link[rel="next"]');

					if(link.get(0)) {
						var href = link.get(0).getAttribute('href');
						title.empty();

						if(href) {
							title.load(href + that.allCommentsSelector + ', ' + that.publicationTitleSelector, function() {

								if(title.children('a')) {
									var comments = title.children('a:last-child').attr('href');
									that.actions.buttons.toNextPage.args = comments;

									title.children('a:last-child').remove();
									title.children('a:last-child').attr('href', comments);

									button.setLabel(vars.labels.nextCommentsButton);
									container.addClass(cssPref + 'comments');
									button.element.show();
								}
							});

							return true;
						}
					}

					that._createHomeButton(container, button);
				});

				return true;
			}
		};
	} // << BottomBar

	var Lightbox;
	if(modules.lightbox && options.lightbox.on) {
		Lightbox = function(optKeyboard, optZoomAll, optSplit) {
			this.initialized = false;

			this._images = [ ];

			this._allowedFormats.toString = function() {
				var formats = this;
				var res = '';

				for(var i = 0, maxi = formats.length; i < maxi; i++) {
					var format = formats[i];
				
					res += format + '|';
				}

				return res.slice(0, -1);
			};

			this._urlPattern = new RegExp('\.' + this._allowedFormats + '$', 'i');

			/* sĄ dwa typy elementżw 'ukŁadanki':
			 *  - przechowujĄce jedynie to, co nazywajĄ, w ktżrych obiekt $
			 *    jest we wŁaśności `element`
			 *  - przechowujĄce takŻe inne dane, w ktżrych obiekt $ jest we
			 *    wŁasności `container`
			 */

			this.wrapper = {
				element: $('<div id="' + this.ids.container + '"></div>')
			};

			this.overlay = {
				element: $('<div id="' + this.ids.overlay + '"></div>')
			};
			this.overlay.element.on('click', $.proxy(this._overlayClickHandler, this));

			// wŁasność `image` to w poniŻszych obiektach wskaŹnik na element tablicy
			// `this._images`
			// `scale` to jednocześnie element odrżŻniajĄcy `next` i `prev` od `current`
			var curImg = this.currentImage = {
				image: null,
				size: null,
				container: $('<div class="' + this.classNames.image + '" id="' + this.ids.currentImage + '"></div>'),
				loader: this._createLoader()
			};
			curImg.container.append(curImg.loader);
			var prevImg = this.prevImage = {
				image: null,
				size: null,
				container: $('<div class="' + this.classNames.image + '" id="' + this.ids.prevImage + '"></div>'),
				loader: this._createLoader()
			};
			prevImg.container.append(prevImg.loader);
			var nextImg = this.nextImage = {
				image: null,
				size: null,
				container: $('<div class="' + this.classNames.image + '" id="' + this.ids.nextImage + '"></div>'),
				loader: this._createLoader()
			};
			nextImg.container.append(nextImg.loader);

			var nav = this.navigation = {
				element:  $('<div id="' + this.ids.navigation + '"></div>'),
				next: new UIButton({ id: this.ids.nextButton, className: this.classNames.button, action: $.proxy(this.next, this)}),
				prev: new UIButton({ id: this.ids.prevButton, className: this.classNames.button, action: $.proxy(this.prev, this)}),
				close: new UIButton({ id: this.ids.closeButton, className: this.classNames.button, action: $.proxy(this.close, this)})
			};
			var el = nav.element;
			el.append(nav.close.element);
			el.append(nav.prev.element);
			el.append(nav.next.element);
			nav.close.element.hover($.proxy(this._buttonHoverHandler, this, nav.close));
			nav.prev.element.hover($.proxy(this._buttonHoverHandler, this, nav.prev));
			nav.next.element.hover($.proxy(this._buttonHoverHandler, this, nav.next));

			var cont = this.wrapper.element;
			cont.append(prevImg.container);
			cont.append(curImg.container);
			cont.append(nextImg.container);
			cont.append(nav.element);
			cont.append(this.overlay.element);

			cont.hide();
			cont.children('*:not(#' + this.ids.navigation + ')').add(nav.element.children()).add(cont.find('.' + this.classNames.loader)).css('opacity', 0);

			$(window).on('resize', $.proxy(this._windowResizeHandler, this));
			this._windowResizeHandler(true);

			if(optKeyboard) {
				var lightbox = this;

				this.keyboard = keyboard;
				keyboard.addHandlers([
					{ 
						pt: 'RightArrow',
						fn: $.proxy(lightbox._nextKeyHandler, lightbox)
					},
					{ 
						pt: 'LeftArrow',
						fn: $.proxy(lightbox._prevKeyHandler, lightbox)
					},
					{ 
						pt: 'Esc',
						fn: $.proxy(lightbox._closeKeyHandler, lightbox)
					}
				]);
			}

			this.zoomAll = !optZoomAll;
			this.group = !!optSplit;
		}

		Lightbox.prototype = {
			toString: function() { return '[object Lightbox]'; },
			_allowedFormats: [ 'jpg', 'jpeg', 'png', 'gif' ],
			ids: {
				container: cssPref + 'lightbox',
				overlay: cssPref + 'lightbox_overlay',
				navigation: cssPref + 'lightbox_nav',
				currentImage: cssPref + 'lightbox_current_image',
				nextImage: cssPref + 'lightbox_next_image',
				prevImage: cssPref + 'lightbox_prev_image',
				closeButton: cssPref + 'lightbox_close_button',
				nextButton: cssPref + 'lightbox_next_button',
				prevButton: cssPref + 'lightbox_prev_button'
			},
			classNames: {
				button: cssPref + 'active_area',
				image: cssPref + 'lightbox_image',
				empty: cssPref + 'empty',
				loader: cssPref + 'lightbox_loader',
				hover: cssPref + 'hover',
				highlight: cssPref + 'highlight',
				unactive: cssPref + 'unactive'
			},
			margin: {
				y: {
					percent: 3,
					max: 100,
					min: 50
				},
				x: {
					percent: 8,
					max: 200,
					min: 150
				}
			},
			previewWidth: {
				percent: 2,
				max: 30,
				min: 20,
				_actual: null
			},
			previewScale: 0.8,
			imagePadding: 12,
			init: function(cont, imgsCont, scrollableElement) {
				if((cont && cont.length) && (imgsCont && imgsCont.length)) {
					this.container = cont;
					this.imagesContainer = imgsCont;

					this.wrapper.element.hide();
					this.container.append(this.wrapper.element);

					var lightbox = this;
					imgsCont.find('img:not(.image)').each(function(index, img) {
						lightbox.addImage($(img));
					});

					this._fixIframes();

					this._scrollableElement = scrollableElement;

					this.initialized = true;

					return true;
				} else {
					if(verbose) {
						console.log("Lightbox.prototype.init_ERROR: missing or bad argument(s)");
					}

					return false;
				}
			},
			addImage: function(img) {
				if(img && img.length) {
					var href = img.parent().attr('href');
					if(!href) {
						if(this.zoomAll || (parseInt0(img.prop('originalWidth')) > parseInt0(img.width() + 29))) {
							href = img.attr('src');
						} else {
							return false;
						}
					}

					if(this._urlPattern.test(href)) {
						var obj = {
							thumb: img,
							full: $('<img alt="' + img.attr('alt') + '">').css('opacity', 0),
							index: this._images.length,
							loaded: false,
							container: null // wskaŹnik na kontener
						};
						obj.thumb.hover($.proxy(this._thumbHoverHandler, this, obj)).on('click', $.proxy(this._imageClickHandler, this, obj));
						obj.full.on('load', $.proxy(this._imageLoadHandler, this, obj)).attr('src', href);

						this._images.push(obj);

						return true;
					} else {
						if(verbose) {
							console.log("Lightbox.prototype.addImage_WARNING: image did not added");
						}

						return false;
					}
				} else {
					if(verbose) {
						console.log("Lightbox.prototype.addImage_ERROR: missing or bad argument(s)");
					}

					return false;
				}
			},
			show: function() {
				if(!this._visible) {

					this.wrapper.element.show();

					this._resizeCloseButton();

					if(this.overlay) {
						this.overlay.element.animate({ opacity: 1 }, 250);
					}

					setTimeout($.proxy(function() {
						this.wrapper.element.children('.' + this.classNames.image).animate({ opacity: 1 }, 250);
					}, this), 200);

					setTimeout($.proxy(function() {
						this.navigation.element.children(':not(#' + this.ids.closeButton + ')').animate({ opacity: 1 }, 500);
						this.navigation.close.element.animate({ opacity: 0.5 }, 500);
					}, this), 1000);

					this._visible = true;
				}

				return true;
			},
			hide: function() {
				if(this._visible) {

					var delay = 250;
					this.navigation.element.children().add(this.wrapper.element.children('.' + this.classNames.image)).animate({ opacity: 0 }, 250);

					if(this.overlay.element) {
						setTimeout($.proxy(function() {
							this.overlay.element.animate({ opacity: 0 }, 250);
						}, this), 100);
						delay += 100;
					}

					setTimeout($.proxy(function() {
						this.wrapper.element.hide();
					}, this), delay);

					this._visible = false;
				}

				return true;
			},
			next: function() {
				if(!this._visible) return false;

				var next = this.nextImage;
				var prev = this.prevImage;
				var current = this.currentImage;

				if(!next.image) {
					return this.close();
				}

				this.currentImage = next;
				this.nextImage = prev;
				this.prevImage = current;

				this.navigation.prev.enable();
				this.navigation.prev.unhover();
				this._load('next', this._getNext(next.image));

				// sporo tego, ale znacznie upraszcza zapis w animacjach
				var currX = current.size.x;
				var currY = current.size.y;
				var nextX = next.size.x;
				var nextY = next.size.y;
				var prevX = prev.size.x;
				var prevY = prev.size.y;
				var clientX = this.clientSize.x;
				var clientY = this.clientSize.y;
				var pScale = this.previewScale;
				var pWidth = this.previewWidth._actual;
				var imgPad = this.imagePadding;

				prev.container.css('right', '').css('left', (-prevX-imgPad+pWidth) + 'px').animate({ left: (-prevX-imgPad) + 'px'}, 100, $.proxy(this._prevToNext, this));

				current.container.animate({ width: (currX*pScale) + 'px', height: (currY*pScale) + 'px', marginLeft: 0 + 'px', marginTop: (-(currY*pScale+imgPad)/2) + 'px', left: (-currX*pScale-imgPad+pWidth) + 'px', top: (clientY/2) + 'px' }, 450, $.proxy(this._currentToPrev, this));

				next.container.animate({ width: nextX + 'px', height: nextY + 'px', right: (clientX-nextX-imgPad)/2 + 'px', marginTop: -(nextY+imgPad)/2 + 'px'}, 450, $.proxy(this._nextToCurrent, this));

				return true;
			},
			prev: function() {
				if(!this._visible) return false;

				var next = this.nextImage;
				var prev = this.prevImage;
				var current = this.currentImage;

				if(!prev.image) {
					return this.close();
				}

				this.currentImage = prev;
				this.nextImage = current;
				this.prevImage = next;

				this.navigation.close.unhover();
				this.navigation.next.unhover();
				this._load('prev', this._getPrev(prev.image));

				// sporo tego, ale znacznie upraszcza zapis w animacjach
				var currX = current.size.x;
				var currY = current.size.y;
				var nextX = next.size.x;
				var nextY = next.size.y;
				var prevX = prev.size.x;
				var prevY = prev.size.y;
				var clientX = this.clientSize.x;
				var clientY = this.clientSize.y;
				var pScale = this.previewScale;
				var pWidth = this.previewWidth._actual;
				var imgPad = this.imagePadding;

				next.container.css('left', '').css('right', (-nextX-imgPad+pWidth) + 'px').animate({ right: (-nextX-imgPad) + 'px'}, 100, $.proxy(this._nextToPrev, this));

				current.container.animate({ width: (currX*pScale) + 'px', height: (currY*pScale) + 'px', marginLeft: 0 + 'px', marginTop: (-(currY*pScale+imgPad)/2) + 'px', left: (clientX-pWidth) + 'px', top: (clientY/2) + 'px' }, 450, $.proxy(this._currentToNext, this));

				prev.container.animate({ width: prevX + 'px', height: prevY + 'px', left: (clientX-prevX-imgPad)/2 + 'px', marginTop: -(prevY+imgPad)/2 + 'px'}, 450, $.proxy(this._prevToCurrent, this));

				return true;
			},
			close: function() {
				if(!this._visible) return false;

				this.hide();

				var newTop = this.currentImage.image.thumb.offset().top - this.clientSize.y*0.2;
				this._scrollableElement.animate({ scrollTop: newTop }, 250);

				setTimeout($.proxy(function() {
					this._load('current', null);
					this._load('prev', null);
					this._load('next', null);
				}, this), 200);

				return true;
			},
		// internal >>
			_nextToCurrent: function() {
				this.currentImage.container.attr('id', this.ids.currentImage).css('right', '').css('left', '').css('top', '').css('margin-left', -(this.currentImage.size.x+this.imagePadding)/2 + 'px');

				return true;
			},
			_prevToNext: function() {
				this.nextImage.container.css('left', '').css('right', (-this.nextImage.size.x*this.previewScale-this.imagePadding) + 'px').animate({ right: (-this.nextImage.size.x*this.previewScale-this.imagePadding+this.previewWidth._actual) + 'px' }, 100).attr('id', this.ids.nextImage).css('margin-right', '').css('top', '');

				return true;
			},
			_currentToPrev: function() {
				this.prevImage.container.attr('id', this.ids.prevImage).css('top', '').css('margin-left', '');

				return true;
			},
			_prevToCurrent: function() {
				this.currentImage.container.attr('id', this.ids.currentImage).css('right', '').css('left', '').css('top', '').css('margin-left', -(this.currentImage.size.x+this.imagePadding)/2 + 'px');

				return true;
			},
			_currentToNext: function() {
				this.nextImage.container.attr('id', this.ids.nextImage).css('top', '').css('margin-left', '').css('left', '').css('right', (-this.nextImage.size.x*this.previewScale-this.imagePadding+this.previewWidth._actual) + 'px');

				return true;
			},
			_nextToPrev: function() {
				this.prevImage.container.css('right', '').css('left', (-this.prevImage.size.x*this.previewScale-this.imagePadding) + 'px').animate({ left: (-this.prevImage.size.x*this.previewScale-this.imagePadding+this.previewWidth._actual) + 'px' }, 100).attr('id', this.ids.prevImage).css('margin-left', '').css('top', '');

				return true;
			},
			_createLoader: function() {
				var loader = $('<div class="' + this.classNames.loader + '"><div class="' + cssPref + 'loader_circular ' + cssPref + '_1"></div><div class="' + cssPref + 'loader_circular ' + cssPref + '_2"></div><div class="' + cssPref + 'loader_circular ' + cssPref + '_3"></div><div class="' + cssPref + 'loader_circular ' + cssPref + '_4"></div><div class="' + cssPref + 'loader_circular ' + cssPref + '_5"></div><div class="' + cssPref + 'loader_circular ' + cssPref + '_6"></div><div class="' + cssPref + 'loader_circular ' + cssPref + '_7"></div><div class="' + cssPref + 'loader_circular ' + cssPref + '_8"></div></div>');
				loader.hide();

				return loader;
			},
			_load: function(type, imgObj) {
				if(!type) return null;
				var img = this[type+'Image'];
				if(!img) return null;
				this._unload(type, img.image);

				if(imgObj) {
					img.container.removeClass(this.classNames.empty);
					img.container.append(imgObj.full);
					img.image = imgObj;

					imgObj.container = img;
					if(!imgObj.loaded) {
						img.loader.show().animate({ opacity: 1 }, 250);
					} else {
						this._adjustSize(img);
					}

					if(type == 'next') {
						this.navigation.close.unhover();
					} else if(type == 'prev') {
						this.navigation.prev.enable();
					}
				} else {
					if(type != 'current') {
						var animation = { };
						animation['margin' + (type == 'prev' ? 'Left' : 'Right')] = '-100px';
						img.container.addClass(this.classNames.empty);

						if(type == 'next') {
							this.navigation.close.hover();
						} else if(type == 'prev') {
							setTimeout($.proxy(function() {
								this.navigation.prev.disable();
							}, this), 300);  // czeka na animację hover
						}
					}

					img.image = null;
				}

				if(!img.size) img.size = this._maxSize;

				return imgObj;
			},
			_unload: function(type) {
				if(!type) return false;
				var img = this[type+'Image'];
				if(!img) return false;
				
				var imgObj = img.image;
				if(imgObj) {
					img.image = null;
					img.container.children('img').remove();
					imgObj.container = null;
				}

				return true;
			},
			_setCurrent: function(imgObj) {
				this._load('current', imgObj);
				this._load('prev', this._getPrev(imgObj));
				this._load('next', this._getNext(imgObj));

				return true;// tylko na poczĄtku, przed show
			},
			_getPrev: function(imgObj) {
				var prev = null;

				if(imgObj) {
					var index = imgObj.index;
					prev = this._images[index-1];
					if(prev) {
						if(this.group) {
							var anc = imgObj.thumb.add(prev.thumb).commonAncestor();

							if(!anc.noText(true)) {
								var ancs = relatedAncestors(prev.thumb.get(0), imgObj.thumb.get(0));

								if(ancs[1].previousElementSibling != ancs[0]) {
									prev = null;
								}
							}
						}
					}
				}

				return prev;
			},
			_getNext: function(imgObj) {
				var next = null;

				if(imgObj) {
					var index = imgObj.index;
					next = this._images[index+1];
					if(next) {
						if(this.group) {
							var anc = imgObj.thumb.add(next.thumb).commonAncestor();

							if(!anc.noText(true)) {
								var ancs = relatedAncestors(imgObj.thumb.get(0), next.thumb.get(0));

								if(ancs[0].nextElementSibling != ancs[1]) {
									next = null;
								}
							}
						}
					}
				}

				return next;
			},
			_getMaxSize: function() {
				var marginY = this.clientSize.y * this.margin.y.percent / 100;
				if(marginY > this.margin.y.max) {
					marginY = this.margin.y.max;
				} else if(marginY < this.margin.y.min) {
					marginY = this.margin.y.min;
				}

				var marginX = this.clientSize.x * this.margin.x.percent / 100;
				if(marginX > this.margin.x.max) {
					marginX = this.margin.x.max;
				} else if(marginX < this.margin.x.min) {
					marginX = this.margin.x.min;
				}

				var size = { y: this.clientSize.y-2*marginY, x: this.clientSize.x-2*marginX };

				return size;
			},
			_getPreviewWidth: function() {
				var width =this.clientSize.x * this.previewWidth.percent / 100;
				if(width > this.previewWidth.max) {
					width = this.previewWidth.max;
				} else if(width < this.previewWidth.min) {
					width = this.previewWidth.min;
				}

				return width+this.imagePadding/2;
			},
			_adjustSize: function(cont) {
				if(!cont.image) return false;

				var full = cont.image.full;

				var orig = {
					x: full.prop('naturalWidth') || full.attr('width'),
					y: full.prop('naturalHeight') || full.attr('height')
				};
				var max = this._maxSize;
				cont.size = {
					x: orig.x,
					y: orig.y
				};

				var scale = Math.min(max.x/orig.x, max.y/orig.y);
				if(scale < 1) {
					cont.size.x = Math.round(cont.size.x*scale);
					cont.size.y = Math.round(cont.size.y*scale);
				}
				var sizeX = cont.size.x;
				var sizeY = cont.size.y;

				var animation = { };
				if(cont.container.css('width') != sizeX + 'px') {
					if(cont === this.currentImage) {
						animation.width = sizeX + 'px';
						animation.marginLeft = -(sizeX+this.imagePadding)/2 + 'px';
					} else {
						sizeX *= this.previewScale;
						sizeY *= this.previewScale;
						cont.container.css('width', sizeX + 'px');
						if(cont === this.prevImage) {
							cont.container.css('left', (-sizeX - this.imagePadding + (this.previewWidth._actual)) + 'px');
						} else if(cont === this.nextImage) {
							cont.container.css('right', (-sizeX - this.imagePadding + (this.previewWidth._actual)) + 'px');
						}
					}
				}

				if(cont.container.css('height') != sizeY + 'px') {
					animation.height = sizeY + 'px';
					animation.marginTop = -(sizeY+this.imagePadding)/2 + 'px';
				}

				cont.container.animate(animation, 250);

				return true;
			},
			_fixIframes: function() {
				this.imagesContainer.find('iframe[src*="youtube.com"]').each(function(){
				// this.imagesContainer.find('iframe').each(function(){
					var iframe = $(this);
					iframe.attr("src", iframe.attr("src") + "&wmode=opaque");
				});

				return true;
			},
			_resizeCloseButton: function() {
				var size = this.navigation.next.element.width();
				var margin = size*0.15;
				size *= 0.7;
				size -= 4; // border
				this.navigation.close.element.css('height', size + 'px').css('width', size + 'px').css('top', margin + 'px').css('right', margin + 'px').css('line-height', size*0.85 + 'px').css('font-size', size + 'px');

				return true;
			},
			_imageClickHandler: function(imgObj, e) {
				if(!e) return false;
				e.preventDefault();

				this._setCurrent(imgObj);

				this.show();

				return true;
			},
			_imageLoadHandler: function(imgObj, e) {
				if(!e) return false;

				imgObj.loaded = true;

				imgObj.full.animate({ opacity: 1 }, 250);

				if(imgObj.container) {
					this._adjustSize(imgObj.container);
					imgObj.container.loader.animate({ opacity: 0 }, 250).hide();
				}

				return true;
			},
			_thumbHoverHandler: function(imgObj, e) {
				if(!e) return false;

				imgObj.thumb.toggleClass(this.classNames.hover);

				return true;
			},
			_buttonHoverHandler: function(button, e) {
				if(!e) return false;

				if(button === this.navigation.close) {
					this.navigation.next.element.toggleClass(this.classNames.hover);
				} else {
					if(!this.nextImage.image && (e.type == 'mouseenter')) {
						this.navigation.close.element.toggleClass(this.classNames.highlight);
					} else {
						this.navigation.close.element.removeClass(this.classNames.highlight);
					}
				}

				return true;
			},
			_overlayClickHandler: function(e) {
				if(!e || !this._visible) return false;
				e.preventDefault();

				this.close();

				return true;
			},
			_windowResizeHandler: function(e) {
				if(!e) return false;

				this.clientSize = {
					x: document.documentElement.clientWidth,
					y: document.documentElement.clientHeight
				};

				this._maxSize = this._getMaxSize();
				this.previewWidth._actual = this._getPreviewWidth();

				this._resizeCloseButton();

				return true;
			},
			_nextKeyHandler: function(e) {
				if(!e || !this._visible) return false;

				this.navigation.next.element.addClass(this.classNames.hover);
				this.navigation.next._hoverTimeout = setTimeout($.proxy(this._buttonLeave, this, 'next'), 250);

				this.next();

				return true;
			},
			_prevKeyHandler: function(e) {
				if(!e || !this._visible) return false;

				this.navigation.prev.element.addClass(this.classNames.hover);
				this.navigation.prev._hoverTimeout = setTimeout($.proxy(this._buttonLeave, this, 'prev'), 250);

				this.prev();

				return true;
			},
			_closeKeyHandler: function(e) {
				if(!e || !this._visible) return false;

				this.navigation.close.element.addClass(this.classNames.hover);
				this.navigation.close._hoverTimeout = setTimeout($.proxy(this._buttonLeave, this, 'close'), 250);

				this.close();

				return true;
			},
			_buttonLeave: function(type) {
				var button = this.navigation[type];

				if(!button) return false;

				if(button._hoverTimeout) {
					clearTimeout(button._hoverTimeout);
					button._hoverTimeout = null;
				}

				button.element.removeClass(this.classNames.hover);

				return true;
			}
		// << internal
		};
	} // << Lightbox

	var LiveComments;
	if(modules.liveComments && options.liveComments.on) {
		LiveComments = function(optHighlight, optNotifier) {
			this._temp = $('<div></div>');
			this._url = location.href;

			if(optHighlight) {
				this.highlight = true;
				this.activityDetector = activityDetector;
			}

			if(optNotifier) {
				this.notifier = notifier;

				if(!this.activityDetector) {
					this.activityDetector = activityDetector;
				}
			}
		}

		LiveComments.prototype = {
			toString: function() { return '[object LiveComments]'; },
			classNames: {
				highlight: cssPref + 'highlight',
				switchButton: cssPref + 'switch'
			},
			ids: {
				buttons: {
					on: cssPref + 'on_live_comments'
				}
			},
			actions: {
				buttons: {
					on: [
						function() {
							this.enable();

							console.log("enabled");

							return 0;
						},
						function(button, url) {
							this.disable();

							console.log("disabled");

							return 1;
						}
					]
				}
			},
			init: function(container, buttonContainer, scrollableElement) {
				if((container && container.length) && (buttonContainer && buttonContainer.length)) {
					this.container = container;
					this.buttonContainer = buttonContainer;
					this.buttonContainer.css('position', 'relative');
					this.buttonContainer.css('width', '100%');

					var buttons = this.buttons = { };

					this.actions.buttons.on[0].context = this;
					this.actions.buttons.on[1].context = this;
					var onButton = buttons.on = new UISwitch({ id: this.ids.buttons.on, actions: this.actions.buttons.on, className: this.classNames.switchButton, label: 'Automatyczna aktualizacja komentarzy' });

					this.buttonContainer.append(onButton.element);

					this.enable();

					setTimeout(function() {
						onButton.setState(1);
					}, 1500);

					this._scrollableElement = scrollableElement;

					return true;
				} else {
					if(verbose) {
						console.log("Lightbox.prototype.init_ERROR: missing or bad argument(s)");
					}

					return false;
				}
			},
			check: function() {
				this._temp.empty();
				this._temp.load(this._url + ' ' + this.container.selector, $.proxy(this._loadHandler, this));

				return true;
			},
			enable: function() {
				if(!this.enabled) {
					this._checkingInterval = setInterval($.proxy(this.check, this), 10000);

					this.enabled = true;

					this.check();
				}

				return true;
			},
			disable: function() {
				if(this.enabled) {
					clearInterval(this._checkingInterval);

					this.enabled = false;
				}

				return true;
			},
			_loadHandler: function(response, status) {
				if(status == "success" || status == "notmodified") {
					var lastComment = this.container.children(':last-child');
					var lastNew = this._temp.children(':first-child').children(':last-child');

					if(lastComment.attr('id') != lastNew.attr('id')) {
						var news = [ lastNew ];

						var comments = this.container.children();
						var newComments = this._temp.children(':first-child').children();

						for(var i = newComments.length - 2, mini = 0; i >= mini; i--) {
							var comment = $(comments[i]);
							var newComment = $(newComments[i]);
						
							if(!comment.length || (comment.attr('id') != newComment.attr('id'))) {
								news.push(newComment);
							}
						}

						for(var i = news.length - 1, mini = 0; i >= mini; i--) {
							this.container.append(news[i]);
						}

						var hClass = this.classNames.highlight;

						lastComment = news[news.length - 1];
						if(this.highlight) {
							for(var i = 0, maxi = news.length; i < maxi; i++) {
								news[i].addClass(hClass);
							}

							var removeHighlight = function() {
								setTimeout(function() {
									for(var i = 0, maxi = news.length; i < maxi; i++) {
										news[i].removeClass(hClass);
									}
								}, 1000);
							};

							var onactive = function() {
								$(this.activityDetector).off('active', onactive);

								removeHighlight();
							};

							if(!this.activityDetector.userActive) {
								$(this.activityDetector).on('active', onactive);
							} else {
								removeHighlight();
							}

							if((!lastComment.prev() || !lastComment.prev().hasClass(hClass)) && (this.activityDetector && !this.activityDetector.userActive)) {

								this.activityDetector.ignore('scroll');

								this._scrollableElement.animate({ scrollTop: $(lastComment).offset().top - 5 }, 250, $.proxy(function() {
									if(this.activityDetector) {
										setTimeout($.proxy(function() {
											this.activityDetector.check('scroll');
										}, this), 10);
									}
								}, this));
							}
						}

						if(this.parentObject.modules.bottomBar) {
							this.parentObject.modules.bottomBar._setPosition();
						}

						if(this.notifier) {
							this.notifier.notify();
						}


						if(verbose) {
							console.log("LiveComments.prototype._loadHandler_NOTICE: " + news.length + " comments added");
						}
					} else {
						if(verbose) {
							console.log("LiveComments.prototype._loadHandler_NOTICE: 0 comments added");
						}
					}

					return true;
				} else {
					if(verbose) {
						console.log("LiveComments.prototype._loadHandler_WARNING: loading comments failed");
					}

					return false;
				}
			}
		};
	} // << LiveComments

	var Personalizer = function(options, defaultOptions) {
		this.options = options;
		this.defaultOptions = defaultOptions;

		this.title = $('<div class="' + this.classNames.title + '">Ustawienia layoutu 3.1</div>');
		this.section = $('<div id="' + this.ids.section + '" class="' + this.classNames.sectionContainer + '"></div>');
		this.groups = {
			bottomBar: this._createGroup('bottomBar', 'Dolny pasek nawigacyjny', [
					{  name: 'on',
					  label: 'Włącz'
					} ]),
			lightbox: this._createGroup('lightbox', 'Galeria obrazów', [
					{  name: 'on',
					  label: 'Włącz'
					},
					{  name: 'keyboard',
					  label: 'Obsługa klawiaturą',
					   hint: 'Umożliwia przełączanie zdjęć i wychodzenie z galerii za pomocą klawiatury (strzałki i Esc).'
					},
					{  name: 'split',
					  label: 'Galerie rozdzielone tekstem',
					   hint: 'Pokazuje w galerii tylko te obrazy, pomiędzy którymi nie ma tekstu. Pozwala uniknąć omyłkowego przeoczenia treści.'
					},
					{  name: 'zoom',
					  label: 'Tylko powiększone obrazy',
					   hint: 'Pokazuje w galerii tylko duże wersje tych obrazów, które zostały pomniejszone podczas osadzania w tekście. Nie wpływa na grupowanie obrazów.'
					} ]),
			liveComments: this._createGroup('liveComments', 'Aktualizacja komentarzy', [
					{  name: 'on',
					  label: 'Włącz'
					},
					{  name: 'highlight',
					  label: 'Wyróżnij nowe komentarze',
					   hint: 'Dodatkowo oznacza wszystkie nowe komentarze kolorem oraz przewija stronę do pierwszego nowego komentarza, jeśli nie wykrywa obecności użytkownika na stronie'
					},
					{  name: 'notifier',
					  label: 'Powiadamianie ikoną',
					   hint: 'Kiedy pojawi się nowy komentarz, ikona strony zacznie migać, co będzie widoczne nawet po przełączeniu się na inną kartę w przeglądarce'
					} ])
		};
		this.checkboxes = [ ];

		for(var group in this.groups) {
			if(this.groups.hasOwnProperty(group)) {
				this.checkboxes = this.checkboxes.concat(this.groups[group].checkboxes);
				this._adjustGroup(group, this.groups[group].checkboxes.on);
			}
		}
	}

	Personalizer.prototype = {
		toString: function() { return '[object Personalizer]'; },
		ids: {
			section: cssPref + 'personalizer_section',
			lightbox: cssPref + 'personalizer_lightbox',
			liveComments: cssPref + 'personalizer_liveComments',
			bottomBar: cssPref + 'personalizer_bottomBar'
		},
		classNames: {
			disabled: cssPref + 'disabled',
			label: cssPref + 'hint',
			sectionContainer: 'options',
			title: 'title',
			subtitle: 'subtitle',
			item: 'item'
		},
		selectors: {
			navigationContainer: '.data > .nav',
			saveButton: 'input[name="save"]',
			cancelButton: 'input[name="cancel"]',
			resetButton: 'input[name="default"]'
		},
		init: function(container, navigationContainer, resetButton, saveButton, cancelButton) {
			if((container && container.length)) {

				this.container = container;
				this._enableShowDetecting();

				return true;
			} else {
				return false;
			}
		},
		_inject: function() {
			this.title.insertBefore(this.navigation.container);
			this.section.insertBefore(this.navigation.container);

			return true;
		},
		_initForm: function() {
			this.navigation = {
				container: this.container.find(this.selectors.navigationContainer)
			};
			var cont = this.navigation.container;
			this.navigation.saveButton = cont.find(this.selectors.saveButton).on('click', $.proxy(this._save, this));
			this.navigation.cancelButton = cont.find(this.selectors.cancelButton).on('click', $.proxy(this._cancel, this));
			this.navigation.resetButton = cont.find(this.selectors.resetButton).on('click', $.proxy(this._reset, this));

			if(!this.navigation.saveButton.length || !this.navigation.cancelButton.length || !this.navigation.resetButton.length) {
				if(verbose) { 
					console.log('Personalizer.prototype._initForm_ERROR: navigation buttons not found');
				}

				return false;
			} else {
				return true;
			}
		},
		_createGroup: function(name, title, options) {
			if(name && (options && options.length) && title) {
				var optGroup = this.options[name];

				if(optGroup === undefined) {
					if(verbose) {
						console.log("Personalizer.prototype._createGroup_WARNING: bad option");
					}

					return null;
				}

				var groupTitle = $('<div id="' + this.ids[name] + '" class="' + this.classNames.subtitle + '">' + title + '</div>');
				this.section.append(groupTitle);

				var checkboxes = [ ];

				for(var i = 0, maxi = options.length; i < maxi; i++) {
					var option = options[i];

					var value = !!optGroup[option.name];

					if(value === undefined) {
						if(verbose) {
							console.log("Personalizer.prototype._createGroup_WARNING: bad option");
						}

						continue;
					}
				
					var opt = $('<div class="' + this.classNames.item + '"></div>');
					var checkbox = $('<input type="checkbox"' + (value ? ' checked="checked"' : '') + ' id="' + this.ids[name] + '_' + option.name + '" name="' + this.ids[name] + '_' + option.name + '">');
					var label = $('<p><label for="' + this.ids[name] + '_' + option.name + '"' + (option.hint ? ' class="' + this.classNames.label + '" title="' + option.hint + '"' : '' ) + '>' + option.label + '</label></p>');
					
					opt.append(checkbox).append(label);
					this.section.append(opt);

					checkboxes.push(checkbox);
					checkboxes[option.name] = checkbox;

					if(option.name == 'on') {
						checkbox.on('click', $.proxy(this._adjustGroup, this, name, checkbox));
					}
				}

				return {
					title: groupTitle,
					checkboxes: checkboxes
				};
			} else {
				return null;
			}
		},
		_save: function(e) {
			this.checkboxes.forEach($.proxy(function(box) {
				var name = box.attr('name').replace(cssPref, '').split('_');
				var group = this.options[name[1]];
				var value = !!box.prop('checked');

				if(group && (group[name[2]] !== value)) {
					group[name[2]] = value;

					if(verbose) {
						console.log('Personalizer.prototype._save_NOTICE: new value of option ' + name[1] + '.' + name[2] + ' stored');
					}
				}
				
			}, this));

			this._storeOptions();

			this._enableShowDetecting();

			setTimeout(function() {
				location.reload(true);
			}, 1000);

			return true;
		},
		_cancel: function(e) {
			var changes = this.checkboxes.some($.proxy(function(box) {
				var name = box.attr('name').replace(cssPref, '').split('_');
				var group = this.options[name[1]];
				var value = !!box.prop('checked');

				if(group && (group[name[2]] !== value)) {
					box.prop('checked', group[name[2]]);
				}
				
			}, this));

			if(changes) {
				this._adjustGroups();
			}

			this._enableShowDetecting();

			return true;
		},
		_reset: function(e) {
			this.options = this.defaultOptions;
			console.log(this.options);

			var changes = this.checkboxes.some($.proxy(function(box) {
				var name = box.attr('name').replace(cssPref, '').split('_');
				var group = this.options[name[1]];
				var value = !!box.prop('checked');

				if(group && (group[name[2]] !== value)) {
					box.prop('checked', group[name[2]]);

					return true;
				} else {
					return false;
				}
			}, this));

			if(changes) {
				this._storeOptions();

				this._adjustGroups();
			}

			this._enableShowDetecting();

			return true;
		},
		_storeOptions: function() {
			storeOptions(this.options);

			return true;
		},
		_adjustGroup: function(gpName, onBox) {
			var group = this.groups[gpName];

			var value = !onBox.prop('checked');

			group.checkboxes.forEach(function(box) {
				if(box !== onBox) {
					var label = this.section.find("label[for='" + box.attr('id') + "']");

					if(value) {
						box.attr('disabled', 'disabled');
						label.addClass(this.classNames.disabled);
					} else {
						box.removeAttr('disabled');
						label.removeClass(this.classNames.disabled);
					}
				}
			}, this);

			return true;
		},
		_adjustGroups: function() {
			for(var group in this.groups) {
				if(this.groups.hasOwnProperty(group)) {
					this._adjustGroup(group, this.groups[group].checkboxes.on);
				}
			}

			return true;
		},
		_enableShowDetecting: function() {
			this.container.on('DOMNodeInserted', $.proxy(function() {
				this.container.off('DOMNodeInserted');

				setTimeout($.proxy(function() {
					res = this._initForm();

					this._inject();
				}, this), 10);
			}, this));

			return true;
		}
	};
	// << Personalizer

	// PCLabHelper >>
	var PCLabHelper = function() {

		this.modules = [ ];
	}

	PCLabHelper.prototype = {
		toString: function() { return '[object PCLabHelper]'; },
		addModule: function(o, initArguments, name) {
			if(o) {
				this.modules.push(o);
				o.parentObject = this;

				if(name) {
					this.modules[name] = o;
				}

				if(initArguments) {
					o.initArguments = initArguments;
				}

				if(verbose) {
					console.log('PCLabHelper.prototype.addModule_NOTICE: module `' + (name || o) + '` added');
				}

				return true;
			} else {
				return false;
			}
		},
		init: function() {
			var modules = this.modules;

			for(var i = 0, maxi = modules.length; i < maxi; i++) {
				var module = modules[i];
			
				if(module.init && $.isFunction(module.init)) {
					module.init.apply(module, module.initArguments);
				}
			}

			if(verbose) {
				console.log('PCLabHelper.prototype.init_NOTICE: modules initialized');
			}

			return true;
		}
	};
	// << PCLabHelper

// inicjalizacja modułów >> 
	function init() {
		
	// inicjalizacja elementów dokumentu >>
		vars.body = $(document.body);
		vars.container = $('#content');
		vars.content = $('#main');
		vars.sidebar = $('#c001');
		vars.personalization = $('#setup');
		vars.scrollableElement = (function getScrollableElement() {
			var el = $(document.body);
			var top = el.scrollTop();

			el.scrollTop(1);
			if(el.scrollTop() === 1) {
				el.scrollTop(top);
			} else {
				el = $(document.documentElement);
			}

			return el;
		})();
		
		if(typeof LiveComments != 'undefined') {
			vars.commentsContainer = $('#main .comments.all .center');
			vars.commentsButtonContainer = $('#main .options .order');
		}
		
		if(typeof Lightbox != 'undefined') {
			vars.imagesContainer = $('#main .content > .main > .substance > .data');

			if(options.lightbox.keyboard) {
				keyboard.assignElement(vars.body);
			}
		}
	// << inicjalizacja elementów dokumentu


		var helper = new PCLabHelper();
		helper.addModule(new Personalizer(options, defaultOptions), [ vars.personalization ]);
		if(typeof BottomBar != 'undefined') helper.addModule(new BottomBar(), [ vars.container, vars.content, vars.sidebar, vars.scrollableElement ], 'bottomBar');
		if(typeof Lightbox != 'undefined') helper.addModule(new Lightbox(options.lightbox.keyboard, options.lightbox.zoom, options.lightbox.split), [ vars.body, vars.imagesContainer, vars.scrollableElement ], 'lightbox');
		if(typeof LiveComments != 'undefined') helper.addModule(new LiveComments(options.liveComments.highlight, options.liveComments.notifier), [ vars.commentsContainer, vars.commentsButtonContainer, vars.scrollableElement ], 'liveComments');
		helper.init();

		if(verbose) {
			console.log('modules initialized');
		}

		return true;
	}

	// czeka na załadowanie CSS-a z inicjalizacją modułów - bez niego jest syf, bo źle mierzy rozmiary itp.
	var cssController = setInterval(function() {
		if($('#stats').css('font-variant') == 'small-caps') {
			clearInterval(cssController);

			if(verbose) {
				console.log('css loaded');
			}

			setTimeout(init, 0);

			return true;
		}

		return false;
	}, 100);
// << inicjalizacja modułów
}

var $, jQuery;
if(window.top === window.self) {
	(function loadCSS() {
		var st = document.createElement('LINK');
		st.setAttribute('rel', 'stylesheet');
		st.setAttribute('type', 'text/css');
		st.setAttribute('href', cssPath);
		document.addEventListener('DOMContentLoaded', function() {
			document.head.appendChild(st);

			if(verbose) {
				console.log('css injected');
			}
		}, false);
	})();
	
	if(typeof unsafeWindow == 'undefined') { // dla nie-GM
		unsafeWindow = window;
	}

	var interval = setInterval(function() {
		if(unsafeWindow.hasOwnProperty('jQuery') && (typeof unsafeWindow.jQuery != 'undefined')) {
			clearInterval(interval);

			if(verbose) {
				console.log('jQuery loaded');
			}
			
			$ = jQuery = unsafeWindow.jQuery.noConflict();

			setTimeout(initPCLabHelper, 0);

			return true;
		}
	}, 100);
}