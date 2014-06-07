// ==UserScript==
// @name        Universal Slideshow
// @version     13.1.14.2
// @license     MIT
// @description Adds slideshow to large amount of sites
// @icon        https://raw.github.com/qmhQTqiGh8AGfqYkNyP7/UniversalSlideshow/master/Icon.png
// @updateURL   https://raw.github.com/qmhQTqiGh8AGfqYkNyP7/UniversalSlideshow/master/slideshow.user.js
// @include     *   
// ==/UserScript==

(function(window, undefined) {
var version = '13.1.14.2'

if(typeof unsafeWindow != 'undefined') window = unsafeWindow;
var doc = window.document;

/*==============================================================================
                                    Vars
==============================================================================*/

var settings;
var DEFAULT_SETTINGS = {
	/*Boolean*/ 'css3Animation':     true,  //
	/*Boolean*/ 'defaultPlay':       false, //
	/*Boolean*/ 'hideLaunchButton':  false, //
	/*Boolean*/ 'hideScrollbar':     true,  //
	/*Boolean*/ 'keepNexthistory':   true,  //
	/*Boolean*/ 'overlayThumbs':     false, //
	/*Boolean*/ 'pinPost':           false, //
	/*Boolean*/ 'random':            false, //
	/*Boolean*/ 'repeat':            false, //
	/*Boolean*/ 'scrollToSource':    false, //
	/*Boolean*/ 'thumbs':            false, // Show thumbnails ribbon
	/*Boolean*/ 'useHistory':        true,  //
	/*Integer*/ 'controlsHideDelay': 2,     // Delay in seconds
	/*Integer*/ 'lang': (/ru/i.test(navigator.language) ? 0 : 1), // 0 = RU, 1 = EN
	/*Integer*/ 'maxHistoryLength':  100,   //
	/*Integer*/ 'slidesChangeDelay': 5      // Delay in seconds
};

var LOC = {
	ttl: { // slow-ttl-* title
		'close':             ['Закрыть', 'Close'],
		'controlsHideDelay': ['Время в секундах, 0 = не убирать', 'Delay in seconds, 0 = never hide'],
		'css3Animation':     ['', ''],
		'defaultPlay':       ['', ''],
		'hideLaunchButton':  ['', ''],
		'hideScrollbar':     ['', ''],
		'keepNexthistory':   ['', ''],
		'loading':           ['Подождите...', 'Please wait...'],
		'maxHistoryLength':  ['', ''],
		'next':              ['Следующий слайд', 'Next image'],
		'overlayThumbs':     ['', ''],
		'pinPost':           ['', ''],
		'play':              ['Воспроизведение/пауза', 'Play/pause'],
		'prev':              ['Предыдущий слайд', 'Previous image'],
		'random':            ['Перемещивание', 'Shuffle'],
		'repeat':            ['Повторять всё', 'Repeat all'],
		'reset':             ['Сбросить на настройки по умолчанию', 'Reset settings to defaults'],
		'scrollToSource':    ['', ''],
		'settings':          ['Настройки', 'Settings'],
		'slidesChangeDelay': ['Время в секундах', 'Delay in seconds'],
		'start':             ['Запустить слайдшоу', 'Launch slideshow'],
		'thumbs':            ['Показать ленту', 'Show thumbnails'],
		'useHistory':        ['', '']
	},
	txt: { // slow-txt-* text content
		'settings':          ['НАСТРОЙКИ', 'SETTINGS'],
		'tab1':              ['Воспроизведение', 'Playback'],
			'defaultPlay':       ['Воспроизводить при запуске', 'Play on start'],
			'slidesChangeDelay': ['Интервал смены слайдов', 'Slides change delay'],
			'useHistory':        ['Использовать историю', 'Use history'],
			'keepNexthistory':   ['Переход вперед по истории', 'Keep next history'],
			'maxHistoryLength':  ['Макс. размер истории', 'Max history length'],
		'tab2':              ['Общее', 'Common'],
			'overlayThumbs':     ['Лента поверх изображения', 'Overlay thumbs'],
			'pinPost':           ['Не скрывать сообщение', 'Pin post'],
			'scrollToSource':    ['Прокручивать страницу', 'Scroll page'],
			'hideScrollbar':     ['Прятать полосу прокрутки', 'Hide scrollbar'],
			'controlsHideDelay': ['Убирать интерфейс через', 'Controls hide delay'],
			'hideLaunchButton':  ['Скрывать кнопку запуска', 'Hide launch button'],
			'css3Animation':     ['CSS3 анимация', 'CSS3 animation'],
		'tab3':              ['Инфо', 'Info'],
			    'nextImage':     ['След. слайд', 'Next image'],
			'key-nextImage':     ['X, →, ↑', 'X, →, ↑'],
			    'playPause':     ['Воспроизведение/пауза', 'Play/pause'],
			'key-playPause':     ['Пробел', 'Space bar'],
			    'prevImage':     ['Пред. слайд', 'Prev image'],
			'key-prevImage':     ['Z, ←, ↓', 'Z, ←, ↓'],
			    'quit':          ['Выход', 'Quit'],
			'key-quit':          ['Q, Escape', 'Q, Escape'],
			    'toggleZoom':    ['Режим увеличения', 'Toggle zoom'],
			'key-toggleZoom':    ['Двойной клик по слайду', 'Double click on image'],
			    'zoomInOut':     ['Увеличить/уменьшить', 'Zoom in/out'],
			'key-zoomInOut':         ['Колесико мыши', 'Mouse wheel'],
			'version':           ['Версия:', 'Version:'],
		'reset':             ['Сброс', 'Reset']
	},
	str: { // common strings
		'noSlidesFound':     ['Изображения не найдены', 'No slides found'],
		'confirmReset':      ['Данное действие удалит все ваши настройки. Продолжить?', 'This will reset all settings to default. Continue?']
	}
};

var profile;
var PROFILES = [
	/*
	{
		'name': Just name, doesn't do anything.
		'test': A function to determine on what site this profile work.
			It must return:
				 -1 if we're on the right site, but on wrong page, and script should not launch on it.
				  0 if it's not site this profile designed for, shold try something else.
				  1 if that's exactly what we are looking for, launch script.
			There is helper function $checkSite(expr, incl, excl), which takes 3 RegExps as arguments. It works that way:
				It tests window.location.href on each regexp:
					expr - is regexp what matches site current profile shoul work with. (if null - any)
					incl - matches pages on this site. Only on this pages script sould launch. (if null - any)
					excl - matches pages on which script should NOT launch, event if previous expressions was true. (if null - no affect)
				if(expr) {
					if(test && !excl) return 1;
					else return -1;
				} else {
					return 0;
				}
		'scan': A function-parser to find images on page.
			No matter how it works, it must find images we want and call addSlide(image, thumb, post) for each one, where:
				image (required) - url to full image.
				thumb (optional) - url to small image that will be shown as thumbnail at bottom panel. If null, it will show just a number.
				post  (optional) - image description or any other related text that will be shown at the bottom of image.
			After everything is done, call scanOver() to tell script that we're are ready to begin.
	}
	*/
	{ //............................................................................................................BROWSER'S INTERNAL PAGE
		'name': 'Browser\'s internal page',
		'test': function() {
			if(/^(?:about|chrome|opera|res)/i.test(window.location.href)) {
				return -1;
			}
			return 0;
		},
		'scan': null // This is just dummy profile
	},
	{ //............................................................................................................AG.RU
		'name': 'ag.ru',
		'test': function() {
			return $checkSite(/ag\.ru/, /\/games\/.*\/screenshots/, null);
		},
		'scan': function() {
			var temp = $Q('.scrout, .scrout_new', doc);
			for(var i = 0, n = temp.length; i < n; i++) {
				var val = temp[i];
				//thumbs: http://screenshots.ag.ru/ag15/geo/XXXXX/YY.jpg
				//images: http://i.ag.ru/ag/thumbs/XXXXX/YYs.jpg
				var thumb = $q('.screen_cont', val).style.backgroundImage;
					thumb = thumb.substr(5, thumb.length - 7);
				var image = thumb.replace(/i\.ag\.ru\/ag\/thumbs/i, 'screenshots.ag.ru/ag15/geo').replace(/s(?=(-\w)?\.[^(\/)]*$)/i, '');
				var post  = $q('.thumb', val).innerHTML;
				addSlide(image, thumb, post, val);
			}
			scanOver();
		}
	},
	{ //............................................................................................................RMART.ORG
		'name': 'rmart.org',
		'test': function() {
			return $checkSite(/rmart\.org/);
		},
		'scan': function() {
			var temp = $Q('.thumbnail', doc);
			var i = 0, n = temp.length;
			if(n == 0) {
				scanOver();
				return;
			}
			var step = function() {
				var val = temp[i],
					img = $q('img', val),
					url = val.href,
					thumb = img.src,
					post  = img.alt;
				$getUrl(url, function(xmlhttp) {
					var image = /<img[^<>]*?id=['"]image['"][^<]*src=['"](.*?)['"][^<]*?>/i.exec(xmlhttp.responseText)[1];
					addSlide(image, thumb, post, val);
					if(++i >= n) scanOver();
					else step();
				});
			};
			step();
		}
	},
	{ //............................................................................................................E621.NET
		'name': 'e621.net',
		'test': function() {
			return $checkSite(/e621\.net/, /\/post/, /\/post\/show\//);
		},
		'scan': function() {
			var temp = $Q('.tooltip-thumb', doc);
			var i = 0, n = temp.length;
			if(!n) {
				scanOver();
				return;
			}
			var step = function() {
				var val = temp[i],
					img = $q('img', val),
					url = val.href,
					thumb = img.dataset.original,
					post  = img.alt;
				$getUrl(url, function(xmlhttp) {
					var image = /<a[^<>]*?href=['"](.*?)['"][^<]*?>Download<\/a>/i.exec(xmlhttp.responseText)[1];
					if(!/\.swf$/i.test(image)) addSlide(image, thumb, post, val);
					if(++i >= n) scanOver();
					else step();
				});
			};
			step();
		}
	},
	{ //............................................................................................................MULTATOR.RU
		'name': 'doodle.multator.ru',
		'test': function() {
			return $checkSite(/doodle\.multator\.ru/);
		},
		'scan': function() {
			var temp = $Q('.thread_body', doc);
			for(var i = 0, n = temp.length; i < n; i++) {
				var val = null, image = null, post = null;
				for (var j = 0, z = temp[i].childNodes.length; j < z; j++) {
					val = temp[i].childNodes[j];
					if(!post) {
						if($hasClass(val, 'doodle_title')) {
							post = val.innerHTML;
						} else {
							continue;
						}
					} else if($hasClass(val, 'doodle_image')) {
						image = $q('img', val).src;
						addSlide(image, image, post, val);
						image = null, post = null;
					}
				}
			}
			scanOver();
		}
	},
	{ //............................................................................................................IMAGEBOARDS
		'name': 'imageboard',
		'test': function() {
			var dm = $domain(window.location.hostname);
			var aib = {};
			switch(dm) {
			case '4chan.org': aib.fch = true; break;
			case 'krautchan.net': aib.krau = true; break;
			case 'britfa.gs': aib.brit = true; break;
			default:
				aib.futa = !!$q('form[action*="futaba.php"]', doc);
				aib.tiny = !!$q('form[name*="postcontrols"]', doc);
			}
			var qDForm =
				aib.brit ? '.threadz' :
				aib.krau ? 'form[action*="delete"]' :
				aib.tiny ? 'form[name="postcontrols"]' :
				aib.futa ? 'form:not([enctype])' :
				'#delform, form[name="delform"]';
			var dForm = $q(qDForm + ', #de-panel', doc);
			if(!dForm) {
				return 0;
			}
			aib.cFileInfo =
				aib.fch ? 'fileText' :
				aib.krau ? 'filename' :
				aib.brit ? 'threadlinktext' :
				'filesize';
			this.aib = aib;
			return 1;
		},
		'scan': function() {
			var temp = $Q(qImgLink, doc);
			for(var i = 0, n = temp.length; i < n; i++) {
				var val = temp[i];
				var image = val.href;
				var t = null, thumb = null, p = null, post = null;
				if($hasClass(val.parentNode, this.aib.cFileInfo)) {
					continue;
				}
				t = $q('img', val);
				if(!!t) {
					thumb = t.src;
					if(this.aib.krau || this.aib.fch) {
						p = $q('blockquote', val.parentNode.parentNode);
					} else {
						p = val.nextElementSibling;
						while(p && p.tagName.toLowerCase() != 'blockquote') {
							p = p.nextElementSibling;
						}
					}
				} else {
					p = val.parentNode;
				}
				if(p) post = $clearHTML(p.innerHTML);
				addSlide(image, thumb, post, val);
			}
			scanOver();
		}
	},
	{ //............................................................................................................DEFAULT
		'name': 'default',
		'test': function() {
			if(window.self != window.top) return -1;
			var temp = $Q(qImgLink, doc);
			if(temp.length) return 1;
			return 0;
		},
		'scan': function() {
			var temp = $Q(qImgLink, doc);
			for(var i = 0, n = temp.length; i < n; i++) {
				var val = temp[i];
				var image = val.href;
				var t = $q('img', val);
				var thumb = t ? t.src : null;
				var post = val.innerText || val.textContent || t ? t.alt : null;
				addSlide(image, thumb, post, val);
			}
			scanOver();
		}
	}
];

var timers = {
	slidesChange: null, //
	controlsHide: null, //
};

//state vars
var S = {
	isVisible      : false,
	isPlaying      : false,
	isRandom       : false,
	isRepeat       : false,
	zoomActive     : false,
	imageMouseOver : false,
	ctrlsMouseOver : false
};

//slideshow vars
var slides = []; // Array of Objects {url image, url thumb, string post}
var hist = new SlideshowHistory();

var qImgLink = 'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"], a[href$=".svg"]';

/*
 * @constructor 
 */
function SlideshowHistory() {
	this.index = 0;
	this.array = [];
}

SlideshowHistory.prototype.getCurrent = function() {
	return settings.useHistory ? this.array[this.index] : this.index;
};

var ICON;

//elements
var preloadImg, // Invisible preloader
    currentImg; // Invisible image to determine it's original size
var dummy, nav;

// Tweeners
var thumbScroller, thumbMover, imageMover;
var imageBounds = {};

/*==============================================================================
                                    UTILITES
==============================================================================*/

// DOM UTILITES

var $cache = {}
function $id(id) {
	return $cache[id] ? $cache[id] : $cache[id] = doc.getElementById(id);
}
function $sid(id) {
	return $id(id ? 'slow-' + id : 'slow');
}

function $Q(path, root) {
	return root.querySelectorAll(path);
}

function $q(path, root) {
	return root.querySelector(path);
}

function $append(el, nodes) {
	for(var i = 0, n = nodes.length; i < n; i++) {
		if(nodes[i]) {
			el.appendChild(nodes[i]);
		}
	}
}

function $add(html) {
	dummy.innerHTML = html;
	return dummy.firstChild;
}

function $del(el) {
	if(el) {
		el.parentNode.removeChild(el);
	}
}

function $attr(el, attr) {
	for(var key in attr) {
		key === 'text' ? el.textContent = attr[key] :
		key === 'value' ? el.value = attr[key] :
		el.setAttribute(key, attr[key]);
	}
	return el;
}

function $new(tag, attr, events) {
	var el = doc.createElement(tag);
	if(attr) {
		$attr(el, attr);
	}
	if(events) {
		$event(el, events);
	}
	return el;
}

function $New(tag, attr, nodes) {
	var el = $new(tag, attr, null);
	$append(el, nodes);
	return el;
}

// EVENT UTILITES

// Chrome thinks that mouseup and click are the same thing
// It fires click event even if mouse was moved between down and up.
function $fixClickEvent(el, handler) {
	var down = function(event) {
		$event(el, events);
	}
	var move = function(event) {
		$revent(el, events);
	}
	var up   = function(event) {
		$revent(el, events);
		handler(event);
	}
	var events = {'mousemove': move, 'mouseup': up};
	$event(el, {'mousedown': down});
}

function $event(el, events) {
	for(var key in events) {
		if(key == 'fixedClick')
			$fixClickEvent(el, events[key]);
		else
			el.addEventListener(key, events[key], false);
	}
	return el;
}

function $revent(el, events) {
	for(var key in events) {
		el.removeEventListener(key, events[key], false);
	}
}

function $pd(event) {
	event.preventDefault();
}

// REGEXP UTILITES

function $domain(url) {
	return url.match(/\b[a-z0-9]+\b(\.(aero|asia|biz|cat|com|coop|info|int|jobs|mobi|museum|name|net|org|pro|tel|travel|xxx|edu|gov|mil|a[^abhjkpvy]|b[^cklpqux]|c[^bejpqtw]|d[dejkmoz]|e[ceghrstu]|f[ijkmor]|g[^cjkovxz]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[^bfij]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[^fpqw]|t[^abeiqsuxy]|u[agksyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))+\b/i)[0].replace(/^www\./i, '');
}

function $checkSite(expr, incl, excl) {
	var site = window.location.href.toLowerCase();
	if((expr ? expr.test(site) : true)) {
		if((incl ? incl.test(site) : true) && (excl ? !excl.test(site) : true)) {
			return 1;
		} else {
			return -1;
		}
	}
	return 0;
}

function $cutTag(html, tagName) {
	return html.replace(new RegExp('</?' + tagName + '[^<]*?>', 'ig'), '');
}

function $cutAttr(html, attrName, tags) {
	return html.replace(new RegExp('(<' + tags + '[^<>]*?)(\\s' + attrName + '=(\".*?\"|\'.*?\'))+([^<]*?>)', 'ig'), '$1$4');
}

function $clearHTML(html) {
	return $cutAttr($cutAttr($cutTag(html, '(?:div|img|blockquote)'), '[^\\s]*?', '[^a][^<>]*?'), '(?:style|class)', 'a');
}

function $isImgExt(url) {
	return /^[^\?]*\.(jpe?g|gif|png|bmp|tiff|tga|svg)$/i.test(url);
}

// CSS UTILITES

function $hasClass(el, className) {
	if(!className) return false;
	return (' ' + el.className + ' ').indexOf(' ' + className + ' ') !== -1;
}

function $addClass(el, className) {
	if(!$hasClass(el,className)) {
		if(el.className[el.className.length - 1] != ' ') {
			el.className += ' ';
		}
		el.className += className;
	}
}

function $removeClass(el, className) {
	if($hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className = el.className.replace(reg, ' ');
	}
}

function $toggleClass(el, onClass, offClass, isOn) {
	if(isOn == undefined) isOn = $hasClass(el, offClass);
	$addClass(el,    isOn ? onClass  : offClass);
	$removeClass(el, isOn ? offClass : onClass );
}

function $toggleProperty(el, key, onValue, offValue, isOn) {
	if(isOn == undefined) isOn = el.getAttribute(key) != onValue;
	el.setAttribute(key, isOn ? onValue : offValue);
}

function $toggleDisplay(el, isOn) {
	$toggleClass(el, '', 'slow-invisible', isOn);
}

function $isVisible(el) {
	return !$hasClass(el, 'slow-invisible') && el.style.display != 'none';
}

// AJAX UTILITES

function $xhr(){
	try {
		return new ActiveXObject('Msxml2.XMLHTTP');
	} catch(e) {
		try {
			return new ActiveXObject('Microsoft.XMLHTTP');
		} catch(ee) {
		}
	}
	if(typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	}
}

function $getUrl(url, callback) {
	var xmlhttp = $xhr();
	xmlhttp.open("GET", url);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) callback(xmlhttp);
	}
	xmlhttp.setRequestHeader('Content-Type', 'text/xml');
	xmlhttp.send(null);
}

// MISC UTILITES

function $rand(a, b) {
	return Math.floor(a + (Math.random() * (b - a)));
}

function $inRange(val, min, max) {
	if(val < min) return false;
	if(val > max) return false;
	return true;
}

function $fitInRange(val, min, max) {
	if(val < min) return min;
	if(val > max) return max;
	return val;
}

function $isValidNumber(val, error) {
	var result = typeof val == 'number' && !isNaN(val);
	if(!result && error) throw 'Invalid number: ' + val;
	return result;
}

function $cfgKey(el) {
	var tag = el.tagName.toLowerCase();
	var key = tag == 'select' ? 'selectedIndex' :
		el.type == 'checkbox' ? 'checked' : 'value';
	return key;
}

function $oneTransition(el, callback) {
	if(!settings.css3Animation) {
		if(callback) callback();
		return;
	}
	var removeAnim = function() {
		$revent(el, events);
		$removeClass(el, 'slow-trans');
		if(callback) callback();
	}
	var events = {};
	events[nav.transEnd] = removeAnim;
	$event(el, events);
	$addClass(el, 'slow-trans');
}

/*==============================================================================
                                    Tweener class
==============================================================================*/

/*
 * @constructor
 */
function Tweener(getVal, setVal, interval) {
	this.getVal = getVal;
	this.setVal = setVal;
	this.interval = interval;
}

Tweener.prototype = {
	tweenTo: function(position, duration) {
		this._final = position;
		this.duration = duration;
		this._start = this.getVal();
		this._delta = this._final - this._start;
		this._steps = this.duration / this.interval;
		if(this._timer == null) this._doTween(this, 1);
	},
	tweenBy: function(delta, duration) {
		this.duration = duration;
		if(this._timer != null) {
			this._final += delta;
			this._delta = this._final - this._start;
		} else {
			this._final = this.getVal() + delta;
			this._start = this.getVal();
			this._delta = this._final - this._start;
			this._steps = this.duration / this.interval;
			this._doTween(this, 1);
		}
	},
	tweenSpeed: function(speed, accel) {
		this._speed = speed;
		this._accel = accel;
		if(!$isValidNumber(this._speed, true)) return;
		if(this._speed == 0) {
			clearTimeout(this._timer);
			this._timer = null;
			return;
		}
		if(this._timer == null) this._increment(this);
	},
	_increment: function(self) {
		if(self._speed == 0) {
			self._timer = null;
			return;
		}
		self.setVal(self.getVal() + self._speed);
		if($isValidNumber(self._accel)) {
			if(Math.abs(self._speed) + self._accel < 0) {
				self._speed = 0;
			} else {
				if(self._speed > 0)
					self._speed += self._accel;
				else
					self._speed -= self._accel;
			}
		}
		self._timer = setTimeout(function() {
			self._increment(self);
		}, self.interval);
	},
	_doTween: function(self, n) {
		if (n > self._steps) {
			self.setVal(self._final);
			self._timer = null;
			return;
		}
		self.setVal(self._start + (self._delta / self._steps) * n);
		self._timer = setTimeout(function() {
			self._doTween(self, n + 1);
		}, self.interval);
	},
	_delta: null,
	_final: null,
	_speed: null,
	_accel: null,
	_start: null,
	_steps: null,
	_timer: null
};

/*==============================================================================
                                    Array prototype
==============================================================================*/

Array.prototype._indexOfObjectWithValue = function(key, value) {
	for (var i = 0, n = this.length; i < n; i++) {
		var regexp = new RegExp(this[i][key] + '$', 'i');
		if (this[i] && value.match(regexp)) {
			return i;
		}
	}
	return -1;
};

Array.prototype._containsObjectWithValue = function(key, value) {
	return this._indexOfObjectWithValue(key, value) != -1;
};

Array.prototype._difference = function(array) {
    return this.filter(function(i) {return !(array.indexOf(i) > -1);});
};

/*==============================================================================
                                    Slideshow
==============================================================================*/

function prepareNextImage() {
	if(hist.array.length <= 0) {
		hist.array[0] = settings.random ? Math.floor(Math.random() * slides.length) : 0;
	}
	var index;
	if(settings.useHistory && hist.index < hist.array.length - 1) {
		index = hist.array[hist.index + 1];
	} else if(settings.random) {
		if(settings.repeat) {
			var current = index = hist.getCurrent();
			while(index == current) index = $rand(0, slides.length);
		} else {
			if(settings.useHistory) {
				var unique = [];
				for (var i = 0, n = slides.length; i < n; i++) {
					if(hist.array.indexOf(i) == -1) unique.push(i);
				}
				if(unique.length != 0) index = unique[$rand(0, unique.length)];
				else togglePause(true);
			} else {
				index = $rand(hist.index + 1, slides.length);
			}
		}
	} else {
		index = hist.getCurrent() + 1;
		if(index >= slides.length) {
			if(settings.repeat) index = 0;
			else index--;
		}
	}
	if(index == undefined) index = hist.getCurrent();
	preloadImg.src = slides[index].image;
}

function updateImage() {
	checkHistoryLength();
	prepareNextImage();
	var currentIndex = hist.getCurrent();

	//Remove last thumb highlight
	var lastThumb = $q('.slow-thumb-current', $sid('thumbs'));
	if(lastThumb) $removeClass(lastThumb, 'slow-thumb-current');
	//Add highlight to current thumb and scroll to
	var currentThumb = $sid('thumbs').childNodes[currentIndex];
	$addClass(currentThumb, 'slow-thumb-current');
	thumbScroller.tweenTo(currentThumb.offsetLeft - (($sid('thumbs-ribbon').offsetWidth - currentThumb.offsetWidth) / 2), 500);

	var currentSlide = slides[currentIndex];
	currentImg.src = currentSlide.image;
	$sid('img').src = ICON.DELAY;
	$sid('btn-thumbs').innerHTML = (currentIndex + 1) + '/' + slides.length;
	$sid('post').innerHTML = currentSlide.post;
	checkPostVisibility(/* */); // No args or undefined
	toggleZoom(false);

	if(settings.scrollToSource && currentSlide.element) currentSlide.element.scrollIntoView();
}

/*==============================================================================
                                    Playback
==============================================================================*/

// BUGS, BUGS EVERYWHERE!

function nextImage() {
	if(preloadImg.src == currentImg.src) return;
	if(settings.useHistory) {
		if(hist.index < hist.array.length - 1) {
			hist.index++
		} else {
			hist.array.push(slides._indexOfObjectWithValue('image', preloadImg.src));
			hist.index = hist.array.length - 1;
		}
	} else {
		hist.index = slides._indexOfObjectWithValue('image', preloadImg.src);
	}
	updateImage();
}

function prevImage() {
	hist.index--;
	if(hist.index < 0) {
		if(settings.repeat) {
			if(settings.useHistory) {
				// WTF should be here?
				hist.index = 0;
			} else {
				hist.index = slides.length - 1;
			}
		} else {
			hist.index = 0;
		}
	}
	updateImage();
}

function jumpTo(position) {
	if(!position && position != 0) return;
	if(position < 0 || position >= slides.length) return;
	if(settings.useHistory) {
		if(position == hist.array[hist.index]) return;
		hist.index = Math.min(hist.index + 1, hist.array.length);
		hist.array.splice(hist.index);
		hist.array[hist.index] = position;
	} else {
		if(position == hist.index) return;
		hist.index = position;
	}
	updateImage();
}

function checkHistoryLength() {
	if(!settings.keepNexthistory) {
		hist.array = hist.array.slice(0, hist.index + 1);
	}
	if(settings.random && !settings.repeat) return;
	if(settings.maxHistoryLength != 0 && hist.array.length > settings.maxHistoryLength) {
		var delta = hist.array.length - settings.maxHistoryLength;
		hist.array = hist.array.slice(delta);
		hist.index = hist.index - delta;
	}
}

/*==============================================================================
                                    Drag tool
==============================================================================*/

// I thought it would be a bit shorter
function makeDraggable(element, getX, setX, getY, setY, bounds, inertia, speedMultiplier, accel) {
	var mover, lastX, lastY, horisontal, vertical, isDragging;
	var lastTime, speed, speedX, speedY, timeout; // inertia vars

	var getSpeed = function() {return 0;};
	var setSpeed = function(val) {
		var percent = val / speed;
		if(horisontal) _setX(element.curX - speedX * percent);
		if(vertical  ) _setY(element.curY - speedY * percent);
	};

	var _setX = function(val) {
		if(mover.bounds) {
			if(!isDragging && !$inRange(val, mover.bounds.minX, mover.bounds.maxX))
				mover.cancel();
			val = $fitInRange(val, mover.bounds.minX, mover.bounds.maxX);
		}
		element.curX = val;
		mover.setX(element.curX);
	}
	var _setY = function(val) {
		if(mover.bounds) {
			if(!isDragging && !$inRange(val, mover.bounds.minY, mover.bounds.maxY))
				mover.cancel();
			val = $fitInRange(val, mover.bounds.minY, mover.bounds.maxY);
		}
		element.curY = val;
		mover.setY(element.curY);
	}

	var onMove = function(event) {
		var deltaX = lastX - event.screenX; lastX = event.screenX;
		var deltaY = lastY - event.screenY; lastY = event.screenY;
		if(mover.inertia) {
			clearTimeout(timeout);
			var nowTime = (new Date()).getTime();
			var deltaTime = nowTime - lastTime;
			speedX = deltaX / deltaTime;
			speedY = deltaY / deltaTime;
			lastTime = nowTime;
			timeout = setTimeout(function() {
				speedX = 0; speedY = 0;
			}, 100);
		}
		if(horisontal) _setX(element.curX - deltaX);
		if(vertical  ) _setY(element.curY - deltaY);
	};

	var stopDrag = function(event) {
		$revent(doc.body, {'mousemove': onMove, 'mouseup': stopDrag});
		clearTimeout(timeout);
		if(mover.inertia) {
			if(horisontal && vertical)
				speed = Math.sqrt(speedX * speedX + speedY * speedY);
			else if(horisontal)
				speed = speedX;
			else
				speed = speedY;
			mover.tweener.tweenSpeed(speed * mover.speedMultiplier, accel);
		}
		isDragging = false;
		//event.stopPropagation();
	};

	var startDrag = function(event) {
		$pd(event);
		horisontal = mover.getX && mover.setX && typeof mover.getX == 'function' && typeof mover.setX == 'function';
		vertical   = mover.getY && mover.setY && typeof mover.getY == 'function' && typeof mover.setY == 'function';
		if(!(horisontal || vertical)) {
			throw 'No setters';
			return;
		}
		if(!element || typeof element != 'object') {
			throw 'Invalid element';
			return;
		}
		if(mover.inertia && !mover.tweener)
			mover.tweener = new Tweener(getSpeed, setSpeed, 30);

		speed = 0; speedX = 0; speedY = 0;
		isDragging = true;
		lastTime = (new Date()).getTime();
		lastX = event.screenX;
		lastY = event.screenY;
		if(horisontal) element.curX = mover.getX();
		if(vertical  ) element.curY = mover.getY();
		if(mover.inertia) mover.tweener.tweenSpeed(0); // Stop
		$event(doc.body, {'mousemove': onMove, 'mouseup': stopDrag});
	};

	mover = {
		'activate': function() {
			$event(element, {'mousedown': startDrag});
		},
		'deactivate': function() {
			if(this.inertia && this.tweener) this.tweener.tweenSpeed(0);
			$revent(element, {'mousedown': startDrag});
		},
		'cancel': function() {
			$revent(doc.body, {'mousemove': onMove, 'mouseup': stopDrag});
			if(this.inertia && this.tweener) this.tweener.tweenSpeed(0);
			isDragging = false;
		},
		'getX': getX,
		'setX': setX,
		'getY': getY,
		'setY': setY,
		'bounds': bounds,
		'inertia': inertia,
		'speedMultiplier': speedMultiplier,
		'accel': accel
	};
	return mover;
}

/*==============================================================================
                                    Image resize
==============================================================================*/

function toggleZoom(isOn) {
	S.zoomActive = isOn != undefined ? isOn : !S.zoomActive;
	if(S.zoomActive) {
		imageMover.activate();
		$event($sid('img'), {'mousewheel': resizeImage, 'DOMMouseScroll': resizeImage});
	} else {
		imageMover.deactivate();
		$revent($sid('img'), {'mousewheel': resizeImage, 'DOMMouseScroll': resizeImage});
	}
	$toggleClass($sid('img-container'), 'slow-img-zoomed', 'slow-img-fixed', S.zoomActive);
	fitImage(S.zoomActive);
}

function resizeImage(event) {
	if(!event.wheelDelta) event.wheelDelta = -event.detail;
	var curX = event.clientX,
		curY = event.clientY,
		oldL = parseInt($sid('img-container').style.left, 10),
		oldT = parseInt($sid('img-container').style.top,  10),
		oldW = parseFloat($sid('img-container').style.width  || $sid('img-container').width),
		oldH = parseFloat($sid('img-container').style.height || $sid('img-container').height),
		newW = oldW * (event.wheelDelta > 0 ? 1.25 : 0.8),
		newH = oldH * (event.wheelDelta > 0 ? 1.25 : 0.8);
	$pd(event);
	$sid('img-container').style.width  = newW + 'px';
	$sid('img-container').style.height = newH + 'px';
	$sid('img-container').style.left = parseInt(curX - (newW/oldW) * (curX - oldL), 10) + 'px';
	$sid('img-container').style.top  = parseInt(curY - (newH/oldH) * (curY - oldT), 10) + 'px';
	checkImageBounds();
}

function fitImage(full) {
	if(S.zoomActive && full == undefined) return;
	var thumbsVisible;
	if(settings.overlayThumbs && settings.controlsHideDelay) {
		thumbsVisible = false;
	} else {
		thumbsVisible = $isVisible($sid('thumbs-ribbon')) && $isVisible($sid('controls'));
	}
	var ww = window.innerWidth - 20,
	    wh = (thumbsVisible ? window.innerHeight - $sid('thumbs-ribbon').offsetHeight : window.innerHeight) - 20;
	var newWidth,
	    newHeight;
	var oldWidth  = currentImg.width  + 10,
	    oldHeight = currentImg.height + 10;
	if($sid('img').src == ICON.DELAY || $sid('img').src == ICON.CLOSE) {
		newWidth  = 200;
		newHeight = 200;
	} else if(full || (oldWidth < ww && oldHeight < wh)) {
		newWidth  = oldWidth;
		newHeight = oldHeight;
	} else {
		var imageAspectRatio = oldWidth / oldHeight;
		var windowAspectRatio = ww / wh;
		if(windowAspectRatio > imageAspectRatio) {
			newHeight = wh;
			newWidth  = imageAspectRatio * newHeight;
		} else {
			newWidth  = ww;
			newHeight = newWidth / imageAspectRatio;
		}
	}
	$sid('img-container').style.width  = newWidth  + 'px';
	$sid('img-container').style.height = newHeight + 'px';
	$sid('img-container').style.top  = ((wh - newHeight) / 2) + 5 + 'px';
	$sid('img-container').style.left = ((ww - newWidth ) / 2) + 5 + 'px';
	checkImageBounds();
}

/*==============================================================================
                                    Events
==============================================================================*/

var EventHandlers = {
	imageOverOut: {'mouseover': function(){checkPostVisibility(true );},
	                'mouseout': function(){checkPostVisibility(false);}},
	ctrlsOverOut: {'mouseover': function(){checkControlsVisibility(true );},
	                'mouseout': function(){checkControlsVisibility(false);}},
	screenMove  : {'mousemove': function(){checkControlsVisibility(/* */);}}, // No arguments or undefined
	imageClick  : {'dblclick' : function(){$oneTransition($sid('img-container'), checkImageBounds); toggleZoom(/* */);}, 'mousedown': $pd}, // No arguments or undefined

	nextImage      : {'click': function(){nextImage();}},
	prevImage      : {'click': function(){prevImage();}},
	togglePause    : {'click': function(){togglePause(/* */);}}, // No arguments or undefined
	toggleRandom   : {'click': function(){setSettingsProperty('random', !settings.random);}},
	toggleRepeat   : {'click': function(){setSettingsProperty('repeat', !settings.repeat);}},
	toggleThumbs   : {'click': function(){setSettingsProperty('thumbs', !settings.thumbs);}},
	toggleSlideshow: {'click': function(){toggleSlideshow();}},
	toggleSettings : {'click': function(){$toggleDisplay($sid('settings'));}},

	windowResize: {'resize': function(){fitImage(/* */);}}, // No arguments or undefined
	shortcuts: {
	'keydown': function(event) {
		if(event.keyCode == 32 /*space*/) togglePause(/* */); // No arguments or undefined
		else if(event.keyCode == 81 /*q*/ || event.keyCode == 27 /* esc */) toggleSlideshow();
		else if(event.keyCode == 88 /*x*/ || event.keyCode == 39 /*right*/ || event.keyCode == 40 /*down*/) nextImage();
		else if(event.keyCode == 90 /*z*/ || event.keyCode == 37 /*left */ || event.keyCode == 38 /* up */) prevImage();
		else return;
		$pd(event);
	}},

	thumbClick: {'fixedClick': function(event){jumpTo(event.currentTarget.value);}, 'mousedown': $pd}
};

function checkImageBounds() {
	imageBounds.minX = -$sid('img-container').offsetWidth  + 200;
	imageBounds.minY = -$sid('img-container').offsetHeight + 200;
	imageBounds.maxX = window.innerWidth  - 200;
	imageBounds.maxY = window.innerHeight - 200;
	$sid('img-container').style.left = $fitInRange(parseInt($sid('img-container').style.left, 10), imageBounds.minX, imageBounds.maxX) + 'px';
	$sid('img-container').style.top  = $fitInRange(parseInt($sid('img-container').style.top , 10), imageBounds.minY, imageBounds.maxY) + 'px';
}

function toggleSlideshow() {
	S.isVisible = !S.isVisible;
	S.isVisible ? startSlideshow() : stopSlideshow();
}

function togglePause(isOn) {
	if(isOn == undefined) {
		S.isPlaying = !S.isPlaying;
	} else {
		S.isPlaying = !isOn;
	}
	$toggleClass($sid('btn-play').childNodes[0], 'slow-icon-pause', 'slow-icon-play', S.isPlaying);
	checkSlideChangeTimer();
}

function checkSlideChangeTimer() {
	clearTimeout(timers.slidesChange);
	if(S.isPlaying) timers.slidesChange = setTimeout(nextImage, settings.slidesChangeDelay * 1000);
}

/*==============================================================================
                                    Show/hide
==============================================================================*/

function checkControlsVisibility(show) {
	if(show != undefined) S.ctrlsMouseOver = show;
	var wasVisible = $isVisible($sid('controls'));
	$toggleDisplay($sid('controls'), true);
	if(!wasVisible) {
		if($isVisible($sid('thumbs-ribbon')) && !settings.overlayThumbs && !S.zoomActive)
				$oneTransition($sid('img-container'));
		fitImage();
	}
	clearTimeout(timers.controlsHide);
	if(settings.controlsHideDelay != 0 && !S.ctrlsMouseOver) {
		timers.controlsHide = setTimeout(function(){
			$toggleDisplay($sid('controls'), false);
			if($isVisible($sid('thumbs-ribbon')) && !settings.overlayThumbs && !S.zoomActive)
				$oneTransition($sid('img-container'));
			fitImage();
		}, settings.controlsHideDelay * 1000);
	}
}

function checkPostVisibility(show) {
	if(show != undefined) S.imageMouseOver = show;
	show = (S.imageMouseOver || settings.pinPost) && /\S/.test($sid('post').innerText || $sid('post').textContent);
	if(($isVisible($sid('post')) && show) || (!$isVisible($sid('post')) && !show)) return;
	$toggleDisplay($sid('post'), show);
	forceRedraw();
}

function forceRedraw() {
	$sid('img-container').style.display = 'none';
	$sid('img-container').offsetWidth;
	$sid('img-container').style.display = '';
}

/*==============================================================================
                                    Launch
==============================================================================*/

function startSlideshow () {
	clearThumbs();
	$toggleDisplay($sid('load'), true);
	profile.scan();
}

function scanOver() {
	$toggleDisplay($sid('load'), false);
	if(slides.length <= 0) {
		alert(profile.name + '\n' + LOC.str.noSlidesFound[settings.lang]);
		return;
	}
	for (var i = 0, n = slides.length; i < n; i++) {
		addThumb(slides[i].thumb, i);
	}
	prepareNextImage();
	updateImage();

	if(settings.defaultPlay || S.isPlaying) {
		S.isPlaying = true;
		checkSlideChangeTimer();
	}
	$toggleClass($sid('btn-play').childNodes[0],   'slow-icon-pause',    'slow-icon-play',   S.isPlaying);

	$event(doc.body, EventHandlers.shortcuts);
	$toggleDisplay($sid('menu'), false);
	$toggleDisplay($sid('screen'), true);
	if(settings.hideScrollbar) doc.body.style.overflow = 'hidden';
}

function stopSlideshow() {
	$revent(doc.body, EventHandlers.shortcuts);
	clearTimeout(timers.slidesChange);
	$toggleDisplay($sid('menu'), true);
	$toggleDisplay($sid('screen'), false);
	doc.body.style.overflow = '';
}

function addSlide(image, thumb, post, element) {
	if(!image) return;
	var dupeIndex = slides._indexOfObjectWithValue('image', image);
	if(dupeIndex != -1) {
		if(!slides[dupeIndex].thumb && thumb) slides[dupeIndex].thumb = thumb;
		if(!slides[dupeIndex].post  && post ) slides[dupeIndex].post  = post;
	} else {
		slides.push({'image': image, 'thumb': thumb, 'post': post, 'element': element});
	}
}

function addThumb(src, n) {
	// "<a class='slow-thumb' unselectable='on'><img src='" + src + "'></a>";
	// "<a class='slow-thumb' unselectable='on'><div text='" + (n + 1) + "'></a>";
	var thumb = $New('a', {'class': 'slow-thumb', 'unselectable': 'on', 'value': n}, [
		src ? $new('img', {'src': src, 'class': 'slow-thumb-img'}) :
		$New('div', {'class': 'slow-thumb-number', 'unselectable': 'on'}, [
			$new('span', {'text': (n + 1)})
		])
	]);
	$event(thumb, EventHandlers.thumbClick);
	$append($sid('thumbs'), [thumb]);
}

function removeThumb(thumb) {
	$revent(thumb, EventHandlers.thumbClick);
	$del(thumb);
}

function clearThumbs() {
	var thumbs = $sid('thumbs');
	while(thumbs.childNodes.length) {
		removeThumb(thumbs.childNodes[0]);
	}
}

/*==============================================================================
                                    Settings
==============================================================================*/

function loadSettings() {
	var storage = window.localStorage.getItem('SLOW_Config');
	// check if settings is corrupted or undefined
	if(storage == null) {
		settings = DEFAULT_SETTINGS;
	} else {
		settings = JSON.parse(storage);
		for(key in DEFAULT_SETTINGS) {
			if(!(key in settings)) {
				settings[key] = DEFAULT_SETTINGS[key];
			}
		}
	}
	// update properties
	for(key in settings) {
		var el = $sid('settings-' + key);
		if(el) el[$cfgKey(el)] = settings[key];
		if(key in settingsUpdater) settingsUpdater[key].call();
	}
}

var settingsUpdater = {
	'css3Animation': function() {
		$toggleClass($sid(), 'slow-anim', '', settings.css3Animation);
	},
	'hideScrollbar': function() {
		if(settings.hideScrollbar && S.isVisible)
			doc.body.style.overflow = 'hidden';
		else
			doc.body.style.overflow = '';
	},
	'hideLaunchButton': function() {
		$toggleClass($sid('menu'), 'slow-autohide', '', settings.hideLaunchButton);
	},
	'thumbs': function() {
		if(!settings.overlayThumbs && !S.zoomActive)
			$oneTransition($sid('img-container'));
		$toggleDisplay($sid('thumbs-ribbon'), settings.thumbs);
		fitImage();
	},
	'random': function() {
		$toggleClass($sid('btn-random').childNodes[0], 'slow-icon-random-a', 'slow-icon-random', settings.random);
		if(S.isVisible) prepareNextImage();
	},
	'repeat': function() {
		$toggleClass($sid('btn-repeat').childNodes[0], 'slow-icon-repeat-a', 'slow-icon-repeat', settings.repeat);
		if(S.isVisible) prepareNextImage();
	},
	'overlayThumbs': function() {
		if(!S.zoomActive)
			$oneTransition($sid('img-container'));
		fitImage();
	},
	'pinPost': function() {
		if(settings.pinPost) {
			$revent($sid('img-container'), EventHandlers.imageOverOut);
		} else {
			$event($sid('img-container'),  EventHandlers.imageOverOut);
		}
		checkPostVisibility(settings.pinPost);
	},
	'scrollToSource': function() {
		var currentSlide = slides[hist.getCurrent()];
		if(settings.scrollToSource && currentSlide && currentSlide.element && S.isVisible)
			currentSlide.element.scrollIntoView();
	},
	'slidesChangeDelay': checkSlideChangeTimer,
	'controlsHideDelay': checkControlsVisibility,
	'lang': function() {
		for(x in LOC.ttl) {
			var elements = $Q('.slow-ttl-' + x, $sid());
			for(var i = 0, n = elements.length; i < n; i++) {
				elements[i].title = LOC.ttl[x][settings.lang];
			}
		}
		for(x in LOC.txt) {
			var elements = $Q('.slow-txt-' + x, $sid());
			for(var i = 0, n = elements.length; i < n; i++) {
				elements[i].innerHTML = LOC.txt[x][settings.lang];
			}
		}
	}
}

function setSettingsProperty(name, value) {
	settings[name] = value;
	if(name in settingsUpdater) settingsUpdater[name].call();
	window.localStorage.setItem('SLOW_Config', JSON.stringify(settings));
}

function addSettings() {
	var tabSelect = {click: function(event) {
		var lastSelected = $q('[selected="true"]', $sid('settings-bar'));
		if(lastSelected) lastSelected.setAttribute('selected', 'false');
		$sid('settings-content').style.left = '-' + (parseInt(event.target.value, 10) * 100) + '%';
		event.target.setAttribute('selected', 'true');
	}};

	function checkbox(name) {
		return $New('label', {'class': 'slow-ttl-' + name}, [
			$new('input', {'id': 'slow-settings-' + name, 'type': 'checkbox', 'info': name},
				{'change': function(e){
					setSettingsProperty(name, e.target.checked);
				}}),
			$new('span', {'class': 'slow-txt-' + name}, null)
		]);
	}

	function numfield(name, min, max) {
		return $New('label', {'class': 'slow-ttl-' + name}, [
			$new('input', {'id': 'slow-settings-' + name, 'type': 'number', 'info': name, 'min': min, 'max': max},
				{'change': function(e){
					setSettingsProperty(name, e.target.value);
				}}),
			$new('span', {'class': 'slow-txt-' + name}, null)
		]);
	}

	function helpstr(name) {
		return '<span style="font-weight: bold;" class="slow-txt-' + name + '"></span>: <span class="slow-txt-key-' + name + '"></span>';
	}

	function combobox(name, options) {
		var opts = [];
		for(key in options) {
			opts.push($new('option', {'value': key, 'text': options[key]}));
		}
		var sel = $New('select', {'id': 'slow-settings-' + name, 'info': name}, opts);
		return $New('label', {'class': 'slow-ttl-' + name}, [
			$event(sel,
				{'change': function(e){
					setSettingsProperty(name, e.target.selectedIndex);
				}}),
			$new('span', {'class': 'slow-txt-' + name}, null)
		]);
	}

	function button(name, Fn) {
		return $new('a', {'id': 'slow-btn-' + name,
			'class': 'slow-btn slow-ttl-' + name + ' slow-txt-' + name,
			'unselectable': 'on',
			'info': name
		}, {'click': Fn});
	}

	$append($sid('settings-bar'), [
		$new('a', {'class': 'slow-txt-tab1', 'value': '0', 'unselectable': 'on', 'selected': 'true'}, tabSelect),
		$new('a', {'class': 'slow-txt-tab2', 'value': '1', 'unselectable': 'on'}, tabSelect),
		$new('a', {'class': 'slow-txt-tab3', 'value': '2', 'unselectable': 'on'}, tabSelect)
	]);
	$append($sid('settings-content'), [
		$New('div', {'id': 'slow-settings-tab1'}, [
			checkbox('defaultPlay'),
			numfield('slidesChangeDelay', 0.5, 999),
			checkbox('useHistory'),
			checkbox('keepNexthistory'),
			numfield('maxHistoryLength', 0, 999)
		]),
		$New('div', {'id': 'slow-settings-tab2'}, [
			checkbox('overlayThumbs'),
			checkbox('pinPost'),
			checkbox('scrollToSource'),
			checkbox('hideScrollbar'),
			numfield('controlsHideDelay', 0, 999),
			checkbox('hideLaunchButton'),
			checkbox('css3Animation')
		]),
		$New('div', {'id': 'slow-settings-tab3'}, [
			$add('<span>' + 
				helpstr('toggleZoom') + '<br>' +
				helpstr('zoomInOut')  + '<br>' +
				helpstr('playPause')  + '<br>' +
				helpstr('prevImage')  + '<br>' +
				helpstr('nextImage')  + '<br>' +
				helpstr('quit') + '<br><hr style="margin: 2px -10px;">' +
				'<span class="slow-txt-version"></span> ' + version + '<br>' +
				'<a href="https://github.com/qmhQTqiGh8AGfqYkNyP7/UniversalSlideshow" class="slow-link" target="_blank">Github</a><br>' +
				'</span>')
		])
	]);
	$append($sid('settings-buttons'), [
		combobox('lang', {'0': 'Ru', '1': 'En'}),
		button('reset', function() {
			if(confirm(LOC.str.confirmReset[settings.lang])) {
				for(key in DEFAULT_SETTINGS) {
					settings[key] = DEFAULT_SETTINGS[key];
				}
				window.localStorage.setItem('SLOW_Config', JSON.stringify(settings));
				loadSettings();
			}
		})
	]);
}

/*==============================================================================
                            Script initialization
==============================================================================*/

function addElements() {
	preloadImg = $new('img'); // Invisible preloader
	currentImg = $new('img', null, {'load': function() {
		$sid('img').src = currentImg.src;
		checkSlideChangeTimer();
		fitImage();
	}});

	imageMover = makeDraggable($sid('img-container'),
		function(){return parseInt($sid('img-container').style.left, 10);},
		function(val){$sid('img-container').style.left = val + 'px';},
		function(){return parseInt($sid('img-container').style.top,  10);},
		function(val){$sid('img-container').style.top  = val + 'px';},
		imageBounds, true, 5, -3);

	thumbMover = makeDraggable($sid('thumbs-container'),
		function(){return -$sid('thumbs-container').scrollLeft;},
		function(val){$sid('thumbs-container').scrollLeft = -val;},
		null, null, null, true, 10, -1);
	thumbMover.activate();

	thumbScroller = new Tweener(function(){
			return $sid('thumbs-container').scrollLeft;
		},
		function(value){
			$sid('thumbs-container').scrollLeft = value;
			thumbMover.cancel();
		}, 30);

	function addScrollButton(el, tweener, overSpeed, downSpeed) {
		var scr = el.scroller = new Object();
		scr.tweener   = tweener;
		scr.overSpeed = overSpeed;
		scr.downSpeed = downSpeed;

		scr.mouseIsOver = false;
		scr.mouseIsDown = false;

		scr._eventOver = {'mouseover': function() {
			$event(el, scr._eventOut);
			$revent(el, scr._eventOver);
			scr.mouseIsOver = true;
			scr.checkScroll();
		}};
		scr._eventOut  = {'mouseout' : function() {
			$event(el, scr._eventOver);
			$revent(el, scr._eventOut);
			scr.mouseIsOver = false;
			scr.checkScroll();
		}};
		scr._eventDown = {'mousedown': function() {
			$event(window, scr._eventUp);
			$revent(el, scr._eventDown);
			scr.mouseIsDown = true;
			scr.checkScroll();
		}};
		scr._eventUp   = {'mouseup'  : function() {
			$event(el, scr._eventDown);
			$revent(window, scr._eventUp);
			scr.mouseIsDown = false;
			scr.checkScroll();
		}};

		scr.checkScroll = function() {
			scr.tweener.tweenSpeed(scr.mouseIsDown ?  scr.downSpeed : scr.mouseIsOver ?  scr.overSpeed : 0);
		};

		$event(el, scr._eventOver);
		$event(el, scr._eventDown);
	}

	addScrollButton($sid('thumbs-scroll-left'),  thumbScroller, -10, -30);
	addScrollButton($sid('thumbs-scroll-right'), thumbScroller,  10,  30);
}

function addListeners() {
	$event($sid('btn-next'),     EventHandlers.nextImage      );
	$event($sid('btn-prev'),     EventHandlers.prevImage      );
	$event($sid('btn-play'),     EventHandlers.togglePause    );
	$event($sid('btn-random'),   EventHandlers.toggleRandom   );
	$event($sid('btn-repeat'),   EventHandlers.toggleRepeat   );
	$event($sid('btn-thumbs'),   EventHandlers.toggleThumbs   );
	$event($sid('btn-settings'), EventHandlers.toggleSettings );
	$event($sid('btn-start'),    EventHandlers.toggleSlideshow);
	$event($sid('btn-close'),    EventHandlers.toggleSlideshow);

	$event($sid('screen'),   EventHandlers.screenMove  );
	$event($sid('controls'), EventHandlers.ctrlsOverOut);

	$sid('thumbs-container').addEventListener(nav.scrollEvent, function(event) {
		if(!event.wheelDelta) event.wheelDelta = -40 * event.detail;
		$pd(event);
		thumbScroller.tweenBy(-event.wheelDelta, 500);
	}, false);

	$event($sid('img'), EventHandlers.imageClick);
	$event(window, EventHandlers.windowResize);
}

function main() {
	dummy = doc.createElement('div');
	getNavigator();
	addHTML();
	addCSS();
	addElements();
	addListeners();
	addSettings();
	loadSettings();
}

function getNavigator() {
	var ua = window.navigator.userAgent;
	nav = {
		Firefox: +(ua.match(/mozilla.*? rv:(\d+)/i) || [,0])[1],
		Opera: window.opera ? +window.opera.version() : 0,
		WebKit: +(ua.match(/WebKit\/([\d.]+)/i) || [,0])[1]
	};
	nav.Safari = nav.WebKit && !/chrome/i.test(ua);
	nav.cssFix =
		nav.WebKit ? '-webkit-' :
		nav.Opera ? (nav.Opera < 12.1 ? '-o-' : '') :
		nav.Firefox && nav.Firefox < 16 ? '-moz-' : '';
	if(!nav.Opera || nav.Opera >= 12) {
		nav.transEnd =
			nav.WebKit ? 'webkitTransitionEnd' :
			nav.Opera && nav.Opera < 12.1 ? 'oTransitionEnd' :
			'transitionend';
	}
	nav.scrollEvent = nav.Firefox ? 'DOMMouseScroll' : 'mousewheel';
}

function testSite() {
	var site = window.location.href.toLowerCase();
	var i;
	for(i = 0; i < PROFILES.length; i++) {
		var currentProfile = PROFILES[i];
		var result = currentProfile.test();
		if(result === 1) {
			profile = currentProfile;
			main();
			return;
		} else if(result === -1) {
			return;
		}
	}
}

/*==============================================================================
                                    ICONS
==============================================================================*/

// SVG icons from Iconic icon set http://somerandomdude.com/work/iconic/
// Icons encoded in base64 because Opera have bug with raw svg in url()
(function() {
	ICON = {};
	var pre, x1, x2, x3;
	pre  = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICdodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQnPjxzdmcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nM';
	x1 = 'zInIGhlaWdodD0nMzInPjxnPjxwYXRoIHN0eWxlPSdmaWxsOiNjY2NjY2M7JyBkPSdNM';
	ICON.DELAY    = pre + x1 + 'TYsNGM2LjYxNywwLDEyLDUuMzgzLDEyLDEycy01LjM4MywxMi0xMiwxMlM0LDIyLjYxNyw0LDE2UzkuMzgzLDQsMTYsNE0xNiwwQzcuMTY0LDAsMCw3LjE2NCwwLDE2czcuMTY0LDE2LDE2LDE2czE2LTcuMTY0LDE2LTE2UzI0LjgzNiwwLDE2LDBMMTYsMHonLz48cGF0aCBzdHlsZT0nZmlsbDojY2NjY2NjOycgZD0nTTIxLjQyMiwxOC41NzhMMTgsMTUuMTUyVjhoLTQuMDIzdjcuOTkyYzAsMC42MDIsMC4yNzcsMS4xMjEsMC42OTUsMS40OTJsMy45MjIsMy45MjJMMjEuNDIyLDE4LjU3OHonLz48L2c+PC9zdmc+';
	ICON.NEXT     = pre + x1 + 'TYuMDE2LDBsLTUuNjY4LDUuNjcyYzAsMCwzLjE4LDMuMTgsNi4zMTIsNi4zMTJIMHY4LjAyN2gxNi42NmwtNi4zMTYsNi4zMTZMMTYuMDE2LDMyTDMyLDE2TDE2LjAxNiwweicvPjwvZz48L3N2Zz4=';
	ICON.PREV     = pre + x1 + 'TUuOTg0LDMybDUuNjcyLTUuNjcyYzAsMC0zLjE4LTMuMTgtNi4zMTItNi4zMTJIMzJ2LTguMDIzSDE1LjM0NGw2LjMxMi02LjMyTDE1Ljk4NCwwTDAsMTZMMTUuOTg0LDMyeicvPjwvZz48L3N2Zz4=';
	ICON.SETTINGS = pre + x1 + 'zIsMTcuOTY5di00bC00Ljc4MS0xLjk5MmMtMC4xMzMtMC4zNzUtMC4yNzMtMC43MzgtMC40NDUtMS4wOTRsMS45My00LjgwNUwyNS44NzUsMy4yNWwtNC43NjIsMS45NjFjLTAuMzYzLTAuMTc2LTAuNzM0LTAuMzI0LTEuMTE3LTAuNDYxTDE3Ljk2OSwwaC00bC0xLjk3Nyw0LjczNGMtMC4zOTgsMC4xNDEtMC43ODEsMC4yODktMS4xNiwwLjQ2OWwtNC43NTQtMS45MUwzLjI1LDYuMTIxbDEuOTM4LDQuNzExQzUsMTEuMjE5LDQuODQ4LDExLjYxMyw0LjcwMywxMi4wMkwwLDE0LjAzMXY0bDQuNzA3LDEuOTYxYzAuMTQ1LDAuNDA2LDAuMzAxLDAuODAxLDAuNDg4LDEuMTg4bC0xLjkwMiw0Ljc0MmwyLjgyOCwyLjgyOGw0LjcyMy0xLjk0NWMwLjM3OSwwLjE4LDAuNzY2LDAuMzI0LDEuMTY0LDAuNDYxTDE0LjAzMSwzMmg0bDEuOTgtNC43NThjMC4zNzktMC4xNDEsMC43NTQtMC4yODksMS4xMTMtMC40NjFsNC43OTcsMS45MjJsMi44MjgtMi44MjhsLTEuOTY5LTQuNzczYzAuMTY4LTAuMzU5LDAuMzA1LTAuNzIzLDAuNDM4LTEuMDk0TDMyLDE3Ljk2OXpNMTUuOTY5LDIyYy0zLjMxMiwwLTYtMi42ODgtNi02czIuNjg4LTYsNi02czYsMi42ODgsNiw2UzE5LjI4MSwyMiwxNS45NjksMjJ6Jy8+PC9nPjwvc3ZnPg==';
	ICON.CLOSE    = pre + 'jgnIGhlaWdodD0nMjgnPjxnPjxwb2x5Z29uIHN0eWxlPSdmaWxsOiNjY2NjY2M7JyBwb2ludHM9JzI4LDIyLjM5OCAxOS41OTQsMTQgMjgsNS42MDIgMjIuMzk4LDAgMTQsOC40MDIgNS41OTgsMCAwLDUuNjAyIDguMzk4LDE0IDAsMjIuMzk4IDUuNTk4LDI4IDE0LDE5LjU5OCAyMi4zOTgsMjgnLz48L2c+PC9zdmc+';
	ICON.PAUSE    = pre + 'jQnIGhlaWdodD0nMzInPjxnPjxyZWN0IHN0eWxlPSdmaWxsOiNjY2NjY2M7JyB3aWR0aD0nOCcgaGVpZ2h0PSczMicvPjxyZWN0IHN0eWxlPSdmaWxsOiNjY2NjY2M7JyB4PScxNicgd2lkdGg9JzgnIGhlaWdodD0nMzInLz48L2c+PC9zdmc+';
	ICON.PLAY     = pre + 'jQnIGhlaWdodD0nMzInPjxnPjxwb2x5Z29uIHN0eWxlPSdmaWxsOiNjY2NjY2M7JyBwb2ludHM9JzAsMCAyNCwxNiAwLDMyJy8+PC9nPjwvc3ZnPg==';
	x1 = 'zInIGhlaWdodD0nMzInPjxnPjxwYXRoIHN0eWxlPSdmaWxsOi';
	x2 = '7JyBkPSdNMjEuNzg2LDIwLjY1NGMtMC42MTgtMC4xOTUtMS40MDctMC43MDMtMi4yOTEtMS41ODdjLTAuNzU3LTAuNzQyLTEuNTM5LTEuNjk4LTIuMzQtMi43NDFjLTAuMTkxLDAuMjU2LTAuMzgyLDAuNTEtMC41NzQsMC43N2MtMC41MjQsMC43MDktMS4wNTksMS40MjQtMS42MDQsMi4xMjdjMS45MDQsMi4zMSwzLjg4LDQuNTc4LDYuODA5LDQuOTUydjIuNzAxbDcuNTU2LTQuMzYybC03LjU1Ni00LjM2MlYyMC42NTR6TTkuMTkyLDExLjkzM2MwLjc1NiwwLjc0MSwxLjUzOCwxLjY5NywyLjMzOSwyLjczOWMwLjE5NS0wLjI2MiwwLjM5LTAuNTIxLDAuNTg3LTAuNzg4YzAuNTItMC43MDMsMS4wNTEtMS40MTIsMS41OTItMi4xMWMtMi4wMzItMi40NjMtNC4xMzMtNC45MDctNy4zOTYtNS4wMjVoLTMuNXYzLjVoMy41QzYuOTY5LDEwLjIyMyw3Ljk5NiwxMC43MzUsOS4xOTIsMTEuOTMzek0yMS43ODYsMTAuMzQxdjIuNTM1bDcuNTU2LTQuMzYzbC03LjU1Ni00LjM2M3YyLjY0N2MtMS45MDQsMC4yMTktMy40MjUsMS4zNDgtNC43NTEsMi42NDRjLTIuMTk2LDIuMTgzLTQuMTE2LDUuMTY3LTYuMDExLDcuNTM4Yy0xLjg2NywyLjQzOC0zLjc0MSwzLjg4OC00LjcxMiwzLjc3MWgtMy41djMuNWgzLjVjMi4xODUtMC4wMjksMy44NzktMS4yNjYsNS4zNC0yLjY5M2MyLjE5NC0yLjE4NCw0LjExNi01LjE2Nyw2LjAwOS03LjUzOEMxOS4yMDUsMTIuMDAzLDIwLjc0NiwxMC42NzksMjEuNzg2LDEwLjM0MXonLz48L2c+PC9zdmc+';
	ICON.RANDOM   = pre + x1 + 'M2NjY2NjY' + x2;
	ICON.RANDOM_A = pre + x1 + 'NkZGRkZGQ' + x2;
	x1 = 'zInIGhlaWdodD0nMjQnPjxnPjxwYXRoIHN0eWxlPSdmaWxsOi';
	x2 = '7JyBkPSdNMjgsMTRjMCwxLjEwMi0wLjg5OCwyLTIsMkg3Ljk5MnYtNEwwLDE4bDcuOTkyLDZ2LTRIMjZjMy4zMDksMCw2LTIuNjk1LDYtNkgyOHonLz48cGF0aCBzdHlsZT0nZmlsbDoj';
	x3 = 'OycgZD0nTTYsOGgxOHY0bDgtNmwtOC02djRINmMtMy4zMDksMC02LDIuNjg4LTYsNmg0QzQsOC44OTgsNC44OTgsOCw2LDh6Jy8+PC9nPjwvc3ZnPg==';
	ICON.REPEAT   = pre + x1 + 'M2NjY2NjY' + x2 + 'NjY2NjY2' + x3;
	ICON.REPEAT_A = pre + x1 + 'NkZGRkZGQ' + x2 + 'ZGRkZGRk' + x3;
	pre = null, x1 = null, x2 = null, x3 = null;
})();

/*==============================================================================
                                    HTML
==============================================================================*/

function addHTML() {
	$append(doc.body, [
		$add('\
<div id="slow" class="slow">\n\
	<div id="slow-menu">\n\
		<a id="slow-btn-start" class="slow-btn slow-ttl-start slow-right slow-top"><div class="slow-icon slow-normal slow-icon-play"></div></a>\n\
	</div>\n\
	<div id="slow-load" class="slow-black slow-ttl-loading slow-invisible">\n\
		<img src="' + ICON.DELAY + '">\n\
	</div>\n\
	<div id="slow-screen" class="slow-black slow-invisible">\n\
		<div id="slow-content">\n\
			<div id="slow-img-container" class="slow-black slow-img-fixed" style="width: 10px; height: 10px; left: 790px; top: 378px;">\n\
				<img id="slow-img">\n\
				<div id="slow-post" class="slow-black slow-invisible"></div>\n\
			</div>\n\
		</div>\n\
		<div id="slow-controls">\n\
			<div id="slow-settings" class="slow-black slow-top slow-invisible">\n\
				<h1>\n\
					<span class="slow-txt-settings" unselectable="on"></span>\n\
				</h1>\n\
				<div id="slow-settings-bar" unselectable="on"></div>\n\
				<div id="slow-settings-content" style="left: 0;"></div>\n\
				<hr>\n\
				<div id="slow-settings-buttons"></div>\n\
			</div>\n\
			<div id="slow-thumbs-ribbon" class="slow-black slow-invisible" unselectable="on">\n\
				<div id="slow-thumbs-scroll-left"></div>\n\
				<div id="slow-thumbs-scroll-right"></div>\n\
				<div id="slow-thumbs-container">\n\
					<div id="slow-thumbs" unselectable="on" style="left: 0;"></div>\n\
				</div>\n\
			</div>\n\
			<a id="slow-btn-close"    unselectable="on" class="slow-btn slow-ttl-close    slow-top    slow-right"><div class="slow-icon slow-normal slow-icon-close   "></div></a>\n\
			<a id="slow-btn-next"     unselectable="on" class="slow-btn slow-ttl-next     slow-middle slow-right"><div class="slow-icon slow-normal slow-icon-next    "></div></a>\n\
			<a id="slow-btn-play"     unselectable="on" class="slow-btn slow-ttl-play     slow-bottom slow-left "><div class="slow-icon slow-normal slow-icon-play    "></div></a>\n\
			<a id="slow-btn-prev"     unselectable="on" class="slow-btn slow-ttl-prev     slow-middle slow-left "><div class="slow-icon slow-normal slow-icon-prev    "></div></a>\n\
			<a id="slow-btn-random"   unselectable="on" class="slow-btn slow-ttl-random   slow-bottom           "><div class="slow-icon slow-small  slow-icon-random  "></div></a>\n\
			<a id="slow-btn-repeat"   unselectable="on" class="slow-btn slow-ttl-repeat   slow-bottom           "><div class="slow-icon slow-small  slow-icon-repeat  "></div></a>\n\
			<a id="slow-btn-settings" unselectable="on" class="slow-btn slow-ttl-settings slow-top    slow-left "><div class="slow-icon slow-normal slow-icon-settings"></div></a>\n\
			<a id="slow-btn-thumbs"   unselectable="on" class="slow-btn slow-ttl-thumbs   slow-bottom slow-right"></a>\n\
		</div>\n\
	</div>\n\
</div>')]);
}

/*==============================================================================
                                    CSS
==============================================================================*/

function addCSS() {
	$append(doc.head, [$new('style', {'type': 'text/css', 'text': '\
.slow div, .slow p, .slow span, .slow h1, .slow hr, .slow a, .slow img, .slow label, .slow input, .slow input:focus {\n\
	background-color: transparent;\n\
	border-radius: 0;\n\
	border: 0;\n\
	box-shadow: none;\n\
	color: #fff;\n\
	font-size: 100%;\n\
	font: normal 11pt sans-serif;\n\
	margin: 0;\n\
	outline: 0;\n\
	padding: 0;\n\
	text-align: left;\n\
	text-decoration: none;\n\
	' + nav.cssFix + 'transition: none;\n\
	vertical-align: baseline;\n\
}\n\
.slow select, .slow select:focus {border: default; padding: 1px; margin: 0; border-radius: 0; width: auto; height: auto; color: black; font-size: 13px;}\n\
.slow input, .slow input:focus {\n\
	background-color: rgba(0, 0, 0, 0);\n\
	border: 1px solid #fff;\n\
	margin-bottom: 10px;\n\
	margin-right: 3px;\n\
	border-radius: 3px;\n\
}\n\
.slow input[type="number"] {width: 50px; height: 25px;}\n\
.slow input[type="number"]:focus {border: 1px solid #08c;}\n\
.slow label {display: block;}\n\
.slow hr {\n\
	background-color: white;\n\
	border: 0;\n\
	color: white;\n\
	clear: both;\n\
	height: 1px;\n\
}\n\
#slow-settings-bar {\n\
	text-align: center;\n\
	white-space: nowrap;\n\
	word-spacing: 0;\n\
}\n\
#slow-settings-bar a {\n\
	border-top-left-radius: 5px;\n\
	border-top-right-radius: 5px;\n\
	border: 1px solid white;\n\
	display: inline-block;\n\
	margin-right: -1px;\n\
	padding: 5px;\n\
}\n\
#slow-settings-bar a[selected="true"] {border-bottom: none;}\n\
#slow-settings-bar::before, #slow-settings-bar::after {\n\
	border-bottom: 1px solid white;\n\
	content: "";\n\
	display: inline-block;\n\
	margin-bottom: -9px;\n\
}\n\
#slow-settings-bar::before {margin-right: -1px; width: 10px;}\n\
#slow-settings-bar::after {width: 100%;}\n\
#slow-settings-bar a:not([selected="true"]):hover  {background-color: rgba(255,255,255,0.5);}\n\
#slow-settings-bar a:not([selected="true"]):active {background-color: rgba(127,127,127,0.5);}\n\
#slow div.slow-invisible {display: none;}\n\
#slow #slow-controls.slow-invisible {display: block; opacity: 0;}\n\
#slow #slow-settings.slow-invisible, #slow-controls.slow-invisible #slow-settings {\n\
	display: block;\n\
	' + nav.cssFix + 'transform: translate(0, -100%);\n\
}\n\
#slow #slow-thumbs-ribbon.slow-invisible, #slow-controls.slow-invisible #slow-thumbs-ribbon {\n\
	display: block;\n\
	' + nav.cssFix + 'transform: translate(0, 100%);\n\
}\n\
#slow-settings-content {\n\
	position: relative;\n\
	width: 300%;\n\
}\n\
#slow-settings-content div {\n\
	float: left;\n\
	padding: 10px;\n\
	width: 245px;\n\
}\n\
#slow h1 {\n\
	display: table;\n\
	height: 25px;\n\
	letter-spacing: .3em;\n\
	margin: 5px 0;\n\
	width: 100%;\n\
}\n\
#slow h1 span {\n\
	display: table-cell;\n\
	font-weight: bold;\n\
	text-align: center;\n\
	vertical-align: middle;\n\
}\n\
.slow-anim #slow-menu.slow-autohide {' + nav.cssFix  + 'transition: opacity .2s ease-in-out;}\n\
#slow-menu.slow-autohide {opacity: 0;}\n\
#slow-menu.slow-autohide:hover {opacity: 1;}\n\
#slow-menu {width: 80px; height: 80px;}\n\
#slow-menu, #slow-load, #slow-screen {\n\
	position: fixed;\n\
	right: 0;\n\
	top: 0;\n\
	z-index: 999999;\n\
}\n\
#slow-load {\n\
	border-radius: 5px;\n\
	height: 200px;\n\
	left: 50%; top: 50%;\n\
	margin-left: -100px;\n\
	margin-top: -100px;\n\
	padding: 5px;\n\
	width: 200px;\n\
}\n\
#slow-screen {bottom: 0; left:   0;}\n\
#slow-settings label:last-child input {margin-bottom: 0;}\n\
#slow label.slow-ttl-lang {float: left; margin-left: 5px;}\n\
#slow-btn-reset {\n\
	border-bottom-right-radius: 5px;\n\
	float: right;\n\
}\n\
#slow .slow-normal {height: 25px; width: 25px;}\n\
#slow .slow-small  {height: 15px; width: 15px;}\n\
#slow-btn-random {left: 35px;}\n\
#slow-btn-repeat {left: 60px;}\n\
#slow [unselectable="on"] {\n\
	cursor: default;\n\
	' + nav.cssFix + 'user-select: none;\n\
}\n\
#slow-img-container {\n\
	border-radius: 5px;\n\
	padding: 5px;\n\
	position: absolute;\n\
}\n\
#slow-img-container img, #slow-load img {\n\
	display: block;\n\
	height: 100%;\n\
	width: 100%;\n\
}\n\
#slow-post {\n\
	bottom: 5px;\n\
	left: 5px;\n\
	max-height: 30%;\n\
	overflow: auto;\n\
	padding: 5px;\n\
	position: absolute;\n\
	right: 5px;\n\
}\n\
#slow-post a, #slow a.slow-link {text-decoration: underline;}\n\
#slow-post a:hover, #slow a.slow-link:hover {color: #08c;}\n\
#slow-thumbs-ribbon {\n\
	bottom: 0;\n\
	left: 0;\n\
	position: absolute;\n\
	right: 0;\n\
}\n\
#slow-thumbs-container {\n\
	max-height: 170px;\n\
	overflow: hidden;\n\
	width: 100%;\n\
}\n\
#slow-thumbs-scroll-left, #slow-thumbs-scroll-right {\n\
	height: 100%;\n\
	position: absolute;\n\
	width: 5%;\n\
}\n\
#slow-thumbs-scroll-left  {left: 0;}\n\
#slow-thumbs-scroll-right {right: 0;}\n\
#slow-thumbs-scroll-left  {background: rgba(0,0,0,0.8); background: ' + nav.cssFix + 'linear-gradient(' + (nav.cssFix ? 'left' : 'to right') + ', rgba(0,0,0,0.8), rgba(0,0,0,0));}\n\
#slow-thumbs-scroll-right {background: rgba(0,0,0,0.8); background: ' + nav.cssFix + 'linear-gradient(' + (nav.cssFix ? 'right' : 'to left') + ', rgba(0,0,0,0.8), rgba(0,0,0,0));}\n\
#slow-thumbs-scroll-left:hover   {background-color: rgba(255,255,255,0.5); background: ' + nav.cssFix + 'linear-gradient(' + (nav.cssFix ? 'left' : 'to right') + ', rgba(255,255,255,0.5), rgba(255,255,255,0));}\n\
#slow-thumbs-scroll-right:hover  {background-color: rgba(255,255,255,0.5); background: ' + nav.cssFix + 'linear-gradient(' + (nav.cssFix ? 'right' : 'to left') + ', rgba(255,255,255,0.5), rgba(255,255,255,0));}\n\
#slow-thumbs-scroll-left:active  {background-color: rgba(127,127,127,0.5); background: ' + nav.cssFix + 'linear-gradient(' + (nav.cssFix ? 'left' : 'to right') + ', rgba(127,127,127,0.5), rgba(127,127,127,0));}\n\
#slow-thumbs-scroll-right:active {background-color: rgba(127,127,127,0.5); background: ' + nav.cssFix + 'linear-gradient(' + (nav.cssFix ? 'right' : 'to left') + ', rgba(127,127,127,0.5), rgba(127,127,127,0));}\n\
#slow-settings {\n\
	border-bottom-left-radius: 5px;\n\
	border-bottom-right-radius: 5px;\n\
	left: 50px;\n\
	overflow: hidden;\n\
	width: 265px;\n\
}\n\
#slow-thumbs {\n\
	text-align: center;\n\
	white-space: nowrap;\n\
}\n\
#slow-thumbs a {\n\
	border-radius: 5px;\n\
	border: 1px solid transparent;\n\
	display: inline-block;\n\
	float: none;\n\
	line-height: 0;\n\
	margin: 4px 6px;\n\
	padding: 5px;\n\
	vertical-align: middle;\n\
}\n\
#slow-thumbs .slow-thumb-current {\n\
	border-color: white;\n\
}\n\
#slow-thumbs .slow-thumb-number {\n\
	display: table;\n\
	width: 160px;\n\
	height: 140px;\n\
}\n\
#slow-thumbs .slow-thumb-number span {\n\
	display: table-cell;\n\
	font-size: 5em;\n\
	text-align: center;\n\
	vertical-align: middle;\n\
}\n\
#slow-thumbs img {max-height: 150px;}\n\
#slow-btn-prev, #slow-btn-play,    #slow-btn-repeat {border-top-right-radius: 5px;}\n\
#slow-btn-next, #slow-btn-start,   #slow-btn-close  {border-bottom-left-radius: 5px;}\n\
#slow-btn-prev, #slow-btn-settings {border-bottom-right-radius: 5px;}\n\
#slow-btn-next, #slow-btn-thumbs   {border-top-left-radius: 5px;}\n\
#slow .slow-top    {position: absolute; top:    0px;}\n\
#slow .slow-bottom {position: absolute; bottom: 0px;}\n\
#slow .slow-left   {position: absolute; left:   0px;}\n\
#slow .slow-right  {position: absolute; right:  0px;}\n\
#slow .slow-middle {position: absolute; top:    50%; margin-top: -17.5px;}\n\
#slow .slow-black  {background-color: rgba(0,0,0,0.8);}\n\
#slow .slow-btn {display: block; padding: 5px;}\n\
#slow .slow-icon {\n\
	background-color: transparent;\n\
	background-origin: content-box;\n\
	background-position: center center;\n\
	background-repeat: no-repeat;\n\
	background-size: contain;\n\
}\n\
#slow a.slow-btn,        #slow a.slow-thumb        {background-color: rgba(0,0,0,0.8);}\n\
#slow a.slow-btn:hover,  #slow a.slow-thumb:hover  {background-color: rgba(255,255,255,0.5);}\n\
#slow a.slow-btn:active, #slow a.slow-thumb:active {background-color: rgba(127,127,127,0.5);}\n\
#slow .slow-icon-close    {background-image: url("' + ICON.CLOSE    + '");}\n\
#slow .slow-icon-delay    {background-image: url("' + ICON.DELAY    + '");}\n\
#slow .slow-icon-next     {background-image: url("' + ICON.NEXT     + '");}\n\
#slow .slow-icon-pause    {background-image: url("' + ICON.PAUSE    + '");}\n\
#slow .slow-icon-play     {background-image: url("' + ICON.PLAY     + '");}\n\
#slow .slow-icon-prev     {background-image: url("' + ICON.PREV     + '");}\n\
#slow .slow-icon-random   {background-image: url("' + ICON.RANDOM   + '");}\n\
#slow .slow-icon-random-a {background-image: url("' + ICON.RANDOM_A + '");}\n\
#slow .slow-icon-repeat   {background-image: url("' + ICON.REPEAT   + '");}\n\
#slow .slow-icon-repeat-a {background-image: url("' + ICON.REPEAT_A + '");}\n\
#slow .slow-icon-settings {background-image: url("' + ICON.SETTINGS + '");}\n\
#slow .slow-img-zoomed {border: 1px solid white;}\n\
#slow .slow-img-fixed  {border: 1px solid transparent;}\n\
.slow-anim #slow-controls {' + nav.cssFix + 'transition: opacity .4s ease-in-out}\n\
.slow-anim #slow-settings {' + nav.cssFix + 'transition: ' + nav.cssFix + 'transform .4s ease-in}\n\
.slow-anim #slow-settings-content {' + nav.cssFix + 'transition: left .4s ease-in-out}\n\
.slow-anim #slow-thumbs-ribbon {' + nav.cssFix + 'transition: ' + nav.cssFix + 'transform .4s ease-in}\n\
.slow-anim #slow-img-container.slow-trans {\n\
	' + nav.cssFix + 'transition-duration: .4s;\n\
	' + nav.cssFix + 'transition-property: width, height, left, top;\n\
	' + nav.cssFix + 'transition-timing-function: ease-in-out;\n\
}'})]);
}

testSite();

})(window);