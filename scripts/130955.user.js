// ==UserScript==
// @name			Google+ Pinterest for the New UI
// @version			1.0.3
// @author			Pokerface - Kevin
// @id				google_plus_ui_sucks_pinterest_pokerface
// @namespace		in.co.tossing.toolkit.google
// @downloadURL		https://userscripts.org/scripts/source/130955.user.js
// @updateURL		https://userscripts.org/scripts/source/130955.meta.js
// @run-at			document-end
// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest
// @license			GPL v3 or later version

// @exclude			*://plus.google.com/_/*
// @exclude			*://plus.google.com/u/*/_/*
// @exclude			*://plus.google.com/up/*
// @exclude			*://talkgadget.google.com/*

// @include			*://plus.google.com/*
// @include			*://profiles.google.com/*
// ==/UserScript==

/*
    Layout Plus
    Kevin Wang (kevixw'At'gmail.com)
    Copyright (c) 2012 . All rights reserved.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

/*
	KissogramToolkit
	build 10/27/2012 by Kevin Wang
	kevixw@gmail.com
*/

var $K = KissogramToolkit = (function ($$d) {
	// some configuration
	var DEBUG_ON = false;

	// Basic function ==============================================
	// for each
	function each($arr, $func) {
		var item;
		if (!$arr)
			return;
		//_debug('each function is called. arr length is '+ $arr.length);
		if ($func)
			for (item in $arr)
				$func.call($arr[item]);
		else
			// the $arr is collection of function itself
			for (item in $arr)
				if (typeof $arr[item]==='function')
					$arr[item]();
	}

	var utils = {
		"isStrictArray" : function ($obj) {
			return Object.prototype.toString.apply($obj) === '[object Array]';
		},
		
		"isRegExp" : function ($obj) {
			return Object.prototype.toString.apply($obj) === '[object RegExp]';
		},
		
		"toArray" : function ($obj) {
			if (!this.isArray($obj))
				return [$obj];
			else if (!this.isStrictArray($obj))
				return Array.prototype.slice.apply($obj);
			else
				return $obj;
		},
		
		"isArray" : function ($obj) {
			var type = Object.prototype.toString.apply($obj);
			return type === '[object Array]'	// array
				|| type === '[object NodeList]'	// document.querySelectorAll
				|| type === '[object Arguments]'	// function arguments
				;
		},
		
		"trim" : function ($str) {
			return $str.replace(/^\s+|\s+$/g, '');
		},
		
		"trimS" : function ($str) {
			return this.trim($str).replace(/\s{2,}/g, ' ');
		}
	};

	// shallow copy
	function extend($target, $options) {
		var name;
		for (name in $options) {
			if ($target === $options[name])
				continue;
			if ($options[name])
				$target[name] = $options[name];
		}
		return $target;  
	}
	// Basic function ends =============================================
	
	// limit the interval/delay of running a specific function, return the changed function
	function setFunctionTiming($func, $opt) {
		$opt = $opt || {};
		var opt = {
			interval : $opt.interval || 0,
			delay : $opt.delay || 0,
			check : $opt.check || 0
		};
		return (function () {
			var lastRunTime = 0, instances = [], isRunning = false, checkInterval = null;
			var res = function () {
				if (opt.check > 0 && checkInterval==null)
					checkInterval = setInterval(res, opt.check);
				var timeRemain = (new Date().getTime()) - lastRunTime;
				var _this = this, args = utils.toArray(arguments);
				// the real function
				function runFunc() {
					lastRunTime = new Date().getTime();
					isRunning = true;
					$func.apply(_this, args);
					isRunning = false;
					instances.shift();
				};
				if (instances.length < 1 || isRunning) {
					// not time yet
					if (timeRemain < opt.interval)
						instances.push(setTimeout(runFunc, Math.max(100, opt.delay + opt.interval - (isRunning ? 0 : timeRemain))));
					else
						instances.push(setTimeout(runFunc, Math.max(100, opt.delay)));
				}
			};
			return res;
		})();
	}
	
	var $$browser = (function getNavigator($n) {
		var navigatorString = $n.userAgent.toLowerCase(),
			// browser agent
			rBrowsers = [
				/.*version\/([\w.]+).*(safari).*/,
				/.*(msie) ([\w.]+).*/,
				/.*(firefox)\/([\w.]+).*/,
				/(opera).+version\/([\w.]+)/,
				/.*(chrome)\/([\w.]+).*/
			],
			// result
			ret = {
				name : 'unknown',
				version : 'unknown',
				language: $n.language || $n.userLanguage || '',
				toString : function () {
					return this.name;
				}
			};
		  
		for (var i = 0, match=null; i < rBrowsers.length; ++i)
			if ( match = rBrowsers[i].exec(navigatorString) ) {
				// match safari 
				ret.name = (i==0 ? match[2] : match[1]) || 'unknown';
				ret.version = (i==0 ? match[1] : match[2]) || 'unknown';
				ret[ret.name] = true;
				break;
			}
	  
	  return ret;
	})(navigator);
	
	// get unsafeWindow
	var $$w = (function () {
		var w = null,	// window object
			resizeTasks = [],
			scrollTasks = [];

		function getSize() {
			return {
				windowHeight : window.innerHeight,
				windowWidth : window.innerWidth,
				height : $$d.documentElement.clientHeight,
				width : $$d.documentElement.clientWidth
			};
		}
		
		function _isScroll(el) {
             // test targets
             var elems = el ? [el] : [document.documentElement, document.body];
             var scrollX = false, scrollY = false;
             for (var i = 0; i < elems.length; i++) {
                 var o = elems[i];
                 // test horizontal
                 var sl = o.scrollLeft;
                 o.scrollLeft += (sl > 0) ? -1 : 1;
                 o.scrollLeft !== sl && (scrollX = scrollX || true);
                 o.scrollLeft = sl;
                 // test vertical
                 var st = o.scrollTop;
                 o.scrollTop += (st > 0) ? -1 : 1;
                 o.scrollTop !== st && (scrollY = scrollY || true);
                 o.scrollTop = st;
             }
             // ret
             return {
                 scrollX: scrollX,
                 scrollY: scrollY
             };
         };

		window.addEventListener('resize', function () {
			each(resizeTasks);
		}, false);
		
		window.addEventListener('scroll', function () {
			each(scrollTasks);
		}, false);

		// return true when unsafeWindow is loaded successfully
		function _init($var) {
			if (!w) {
				// load unsafeWindow
				if (typeof(unsafeWindow) !== "undefined" && typeof(unsafeWindow[$var]) !== "undefined")
					w = unsafeWindow;
				else if (typeof(window[$var]) !== "undefined")
					w = window;
				else
					try {
						// for Chrome
						var a = document.createElement("a");
						a.setAttribute("onclick", "return window;");
						var win = a.onclick();
						if (typeof(win[$var]) !== "undefined")
							w = win;
					}
					catch (e) {
						_debug('Kissogram Toolkit : Unable to load unsafeWindow Object!');
						w = null;
					}
			}
			return w;
		}
		
		function _onUnsafeWindowReady($var, $func, $options) {
			$options = $options || {};
			$options.retry = (typeof $options.retry != "number") ? 30 : $options.retry;
			$options.interval = $options.interval || 300;
			if (_init($var) && (!$options.test || $options.test(w))) {
				_debug("Kissogram Toolkit : unsafeWindow injection succeed!");
				return $func(w, w[$var]);
			}
			if ($options.retry-- > 0)
				setTimeout(function () { _onUnsafeWindowReady($var, $func, $options); }, $options.interval);
		}
		
		var $c = {
			// get unsafeWindow if possible
			get : function ($var) {
				return (this.getUnsafeWindow($var) || window)[$var];	// return safe window
			},
			
			// get unsafeWindow
			getUnsafeWindow : function ($var) {
				return _init($var);
			},
			
			/*
				when specific function is ready
				options : {
					test : a function that test if specific variable is loaded properly
					retry : retry times before test() returns a failure, default is 40
					interval : the interval between every check, default is 300 ms
				}
			*/
			onReady : _onUnsafeWindowReady ,
			
			size : getSize,
			
			onResize : function ($func, $init) {
				if ($init)
					$func();
				resizeTasks.push($func);
				return resizeTasks.length-1;
			},
			
			_onResize : function ($id) {
				if ($id || $id==0)
					delete resizeTasks[$id];
			},
			
			isScroll : _isScroll,
			
			onScroll : function ($func, $init) {
				if ($init)
					$func();
				scrollTasks.push($func);
				return scrollTasks.length-1;
			},
			
			_onScroll : function ($id) {
				if ($id || $id==0)
					delete scrollTasks[$id];
			}
		};
		
		return $c;
	})();
	
	var i18n = (function () {
		var $c = function ($args) {
		};
		
		var methods = {
			lang : "en-US",
		
			getMessage : function ($item) {
			}
			
		};
		
	})();
	
	// css Class
	var $$css = (function () {
		var css_enabled = [],
			root = $$d.documentElement,
			FEATURE_LIST_ATTR = "feature-list",
			CSS_ELEM_REGEXP = /^\s*[.\w][.\w\d-]+[\w\d-]\s*$/;

		var instance = function ($arg) {
			extend(this, $c);
			if ($arg)
				this.dictionary = this.dictionary.concat($arg.reverse());	//define the css dictionary
		};
		
		// effective only for Chrome
		function _getMediaQueriesWidth() {
			if ($$browser == "firefox")
				return window.innerWidth;
			// for Chrome, the width in Media Queries is quite close to window.outerWidth
			for (var i=1, width = window.outerWidth, match=false; !match; i++) {
				if (width > 0)
					match = window.matchMedia('(min-width :' + width + 'px) and (max-width:'+ width + 'px)').matches;
				if (match)
					return width;
				width += (i%2 == 0 ? 1 : -1) * i;
			}
		}
		
		// to be compatible with Opera
		var _addStyle = (typeof GM_addStyle != "undefined") ? GM_addStyle : function($css) {
			var NSURI = 'http://www.w3.org/1999/xhtml';
			var head = document.getElementsByTagName('head')[0];
			var p = head || document.documentElement;
			var elem = document.createElementNS(NSURI,'link');
			elem.setAttributeNS(NSURI,'rel','stylesheet');
			elem.setAttributeNS(NSURI,'type','text/css');
			elem.setAttributeNS(NSURI,'href','data:text/css,'+encodeURIComponent($css));
			if (head)
				p.appendChild(elem);
			else
				p.insertBefore(elem, p.firstChild);
		}
		
		var $c = {
			dictionary : [],
			ns : 'gpp-',	// name space
			
			// append a class to an element
			add : function ($elem, $className) {
				if (!$elem || !CSS_ELEM_REGEXP.test($className = this.get($className)))
					return;
				$className = $className.replace(/\./g, ' ');
				var arr = $className.split(' '), appendList = "";
				for (var i=0, clazz = " "+$elem.className+" "; i<arr.length; i++)
					if (arr[i] && clazz.indexOf(' '+arr[i]+' ') < 0)
						appendList+= ' '+ arr[i];
				$elem.className = utils.trimS($elem.className + appendList);
			},
			
			remove : function ($elem, $className) {
				if (!$elem || !CSS_ELEM_REGEXP.test($className = this.get($className)))
					return;
				$className = utils.trimS($className.replace(/\./g, ' '));
				var arr = $className.split(' '), clazz = " "+$elem.className+" ";
				for (var i=0; i<arr.length; i++)
					clazz = clazz.replace(' '+ arr[i] +' ', ' ');
				$elem.className = utils.trimS(clazz);
			},
			
			// append css
			set : function ($str) {
				_addStyle(this.get($str));
			},
			
			get : function ($str) {
				$str = ($str || '').replace(/\/\*[\s\S]*?\*\//g, '');	// clear the comment
				// backforwards
				for (var i=0; i<this.dictionary.length; i++)
					$str = $str.replace(this.dictionary[i][0], this.dictionary[i][1]);
				return $str;
			},
			
			// get value
			val : function ($str) {
				var arr = this.get($str).split(/[^\w-]/);
				do {
					var val = arr.pop();
					if (val)
						return val;
				} while (arr.length>0);
				return null;	// not found
			},
			
			push : function ($arg, $str, $opt) {
				$opt = $opt || {};
				var condition = this.getCondition($arg);
				if ($opt.enable)
					this.enable({ name: $arg, value: $opt.value });
				$str = $str.replace(/((?:[^,{]+,?)*)\s*{([^}]+)}/g, condition+"$1 {$2}");
				$str = $str.replace(/,/g, ","+condition);
				this.set($str);
			},
			
			pull : function ($feature) {
				return css_enabled[$feature] || null;
			},
			
			enable : function ($arg) {
				if (!$arg) return;
				var feaAttr = this.getFeatureListAttr(),
					ns = this.ns,
					data = " "+(root.getAttribute(feaAttr)||"")+" ",
					appendList = "";
				utils.toArray($arg).forEach(
					function ($item) {
						var obj = (typeof $item=="string") ? { name: $item } : $item;
						// when $value is null, assert it is a boolean
						if (!obj.value && obj.value != 0) {
							var name = " "+ obj.name +" ";
							if (data.indexOf(name) < 0)
								appendList += name;
						}
						else
							root.setAttribute(ns + obj.name, obj.value);
						css_enabled[obj.name] = obj.value || true;
					}
				);
				if (appendList)
					root.setAttribute(feaAttr, utils.trimS(data + appendList));
			},
			
			disable : function ($arg) {
				if (!$arg) return '';
				var feaAttr = this.getFeatureListAttr(),
					ns = this.ns,
					hasFeature = root.hasAttribute(feaAttr),
					data = " "+(root.getAttribute(feaAttr)||"")+" ";
				utils.toArray($arg).forEach(
					function ($item) {
						var obj = (typeof $item=="string") ? { name: $item } : $item;
						if (hasFeature)
							data = data.replace(" "+obj.name+" "," ");
						root.removeAttribute(ns + obj.name);
						delete css_enabled[obj.name];
					}
				);
				if (hasFeature)
					root.setAttribute(feaAttr, utils.trimS(data));
			},
		
			getFeatureListAttr : function () {
				return this.ns + FEATURE_LIST_ATTR;
			},
		
			// has specific class
			is : function ($elem, $className) {
				if (!$elem)
					return false;
				$className = utils.trimS(this.get($className).replace(/\./g, ' '));
				var arr = $className.split(' '), clazz = " "+$elem.className+" ";
				for (var i=0; i<arr.length; i++)
					if (clazz.indexOf(' '+ arr[i] +' ', ' ') < 0)
						return false;
				return true;
			},
			
			select : function ($str) {
				return $$d.querySelector(this.get($str));
			},
			
			selectAll : function ($str) {
				return utils.toArray($$d.querySelectorAll(this.get($str)));
			},
			
			getMediaQueriesWidth : _getMediaQueriesWidth,
			
			extendDictionary : function ($dic) {
				this.dictionary = this.dictionary.concat($dic.reverse());
			},
			
			// notice the difference between getCondition("string") and getCondition({name: "string"})
			// the first one will return featAttr~="string", the second one will return [ns+"string"]
			getCondition : function ($arg) {
				if (!$arg) return '';
				var condition = "html",
					feaAttr = this.getFeatureListAttr(),
					ns = this.ns;
				utils.toArray($arg).forEach(
					function ($item) {
						var obj = (typeof $item=="string") ? { name: $item, blooeanVal: true } : $item;
						condition += "["+ (
							obj.blooeanVal ?
								feaAttr +'~="'+ obj.name +'"' :
								(obj.value || obj.value==0) ?
									ns + obj.name +'="'+ obj.value +'"' :
									ns + obj.name
							)+"]"
						;
					}
				);
				return condition+' ';
			},
			
			// return a number of piexl from '##px'
			getPiexls : function ($str) {
				if (!/^\d+(px)?$/i.test($str))
					return null;	// may be 'auto' or anything else
				return parseInt($str.replace(/px$/i, ""));
			},
			
			// get the absolute x / y of an element
			getAbsPos : function ($e) {
				var t = l = 0;
				do {
					t += $e.offsetTop;
					l += $e.offsetLeft;
				} while ($e = $e.offsetParent);
				return {
					left: l,
					top: t
				};
			}
		};
		
		return extend(instance, $c);
	})();

	// manipulate cookies
	var cookies = (function () {
		return {};
	})();
	
	// dataTransfer
	var dataTransfer = (function () {
		var data = {};
	
		return {
			setData : function ($type, $data) {
				data[$type] = $data;
			},
			getData : function ($type) {
				return data[$type];
			},
			clearData : function ($type) {
				delete data[$type];
			}
		};
	})();
	
	// the Class that process url change
	var $$url = (function () {
		var _url = formatUrl(),
			urlChangeTasks = [],
			hashChangeTasks = [],
			urlMonitor = null;

		function isUrlChanged($url) {
			var url = formatUrl($url);
			if (url != _url) {
				_url = url;
				return true;
			}
			else
				return false;
		}
		
		// turn http://xxx.xxx into http://xxx.xxx/
		function formatUrl($url) {
			var url = $url || $$d.location.href;
			if (/^https?:\/\/[\w.]+\w+$/.test(url))
				url += '/';
			return url;
		}

		function execTask($e) {
			if (!$e) {
				_debug('Kissogram Toolkit: URL changed!');
				each(urlChangeTasks);
			}
			else if ($e.type == "popstate") {
				_debug('Kissogram Toolkit: URL [popstate] changed!');
				each(urlChangeTasks);
			}
			else if ($e.type == "hashchange") {	// hashchange
				_debug('Kissogram Toolkit: URL [hash] changed!');
				each(hashChangeTasks);
			}
		}

		// bind onpopstate
		window.addEventListener('popstate', function (e) {
			if (isUrlChanged())
				execTask(e);
		}, false);
		// hashchange
		window.addEventListener('hashchange', function (e) {
			execTask(e);
		}, false);
		
		var $c = {
			onUrlChange : function ($func, $init) {
				if ($init)
					$func();
				// mointor
				if (urlMonitor == null) {
					_debug('Kissogram Toolkit: URL onChange inited!');
					urlMonitor = setInterval(function () {
						if (isUrlChanged())
							execTask();
					}, 500);
				}
				urlChangeTasks.push($func);
			},
			
			onHashChange : function ($func, $init) {
				if ($init)
					$func();
				hashChangeTasks.push($func);
			},
			
			onUrlMatch : function ($match, $func, $init) {
				if (!$match)
					return;
					
			},
			
			toString : function () {
				return _url = formatUrl();
			}
		};
		
		return $c;
	})();

	/*
		listen to specific event
		$options {
				init : boolean / function
				runOnce : boolean
				interval
			}
	*/
	var listen = (function () {
		var interval_count=[];	// collection of interval count

		var _support = {};
		
		function testSupport($event) {
			var e = $$d.querySelector("body");
			e.addEventListener($event, function fn() {
				_support[$event] = true;
				e.removeEventListener($event, fn, false);
			}, false);
		}
		
		function doTest() {
			testSupport("DOMSubtreeModified");
			testSupport("DOMNodeInserted");
			testSupport("DOMNodeRemoved");
			// try insert a div and then remove it, will trigger all these three event if succeed
			var test = $$d.createElement("div"),
				e = $$d.querySelector("body");
			e.appendChild(test);
			e.removeChild(test);
		}
		
		// do dom event support test now -> Opear does not support DOMSubtreeModified
		doTest();
		
		var func = function ($selector, $event, $func, $options) {
			$options = $options || {};
			// $event & $init cannot be false at the same time
			if (!$event && !$options.init)
				return;
			var evt_listener = (function ($s, $e, $f, $o) {
				var id = interval_count.length,
					funcWithTiming = setFunctionTiming($f, {
						interval : $o.interval || 0,
						delay : $o.delay || 0
					});

				// bind event to dom object
				var _bind = function ($d, $evt) {
					$d.addEventListener($evt, 
						(function () {
							var runOnceFunc = setFunctionTiming(function () {
								$f.apply($d, utils.toArray(arguments), false);
								$d.removeEventListener($evt, runOnceFunc);
							}, { delay: $o.delay }),
							newFunc = function () {
								funcWithTiming.apply($d, utils.toArray(arguments));
							};
							return $o.runOnce ? runOnceFunc : newFunc ;
						})()
					);
				};
				
				return function () {
					// if $s is a element itself
					var dom = utils.toArray(
						(typeof $s == 'string') ? $$css.selectAll($s) : $s
						);
					if (dom.length > 0) {
						// dom is captured
						clearInterval(interval_count[id]);
						delete interval_count[id];
						// to be compatible with Opera!! for DOMSubtreeModified!
						if (!_support.DOMSubtreeModified) {
							if (utils.isStrictArray($e)) {
								var DOMInsert = -1, DOMRemove = -1, DOMSub = -1;
								for (var i=0;i<$e.length;i++)
									if ($e == "DOMNodeInserted")
										DOMInsert = i;
									else if ($e == "DOMNodeRemoved")
										DOMRemove = i;
									else if ($e == "DOMSubtreeModified")
										DOMSub = i;
								if (DOMSub > -1) {
									$e.splice(DOMSub, i);
									if (DOMInsert < 0)
										$e.push("DOMNodeInserted");
									if (DOMRemove < 0)
										$e.push("DOMNodeRemoved");
								}
							}
							else if ($e == "DOMSubtreeModified")
								$e = ["DOMNodeInserted", "DOMNodeRemoved"];
						}
						for (var i=0; i<dom.length; i++) {
							// if the function need initiation (when the listen function capture the dom objects the first time)
							if ($o.init) {
								if (typeof $o.init == "function")
									$o.init.call(dom[i]);
								else
									$f.call(dom[i]);
							}
							if (utils.isStrictArray($e))
								each($e, function () { _bind(dom[i], this); });
							else if (typeof $e == "string")	// when $e != null
								_bind(dom[i], $e);
							else	// do nothing
								;
						}
					}
				}
			})($selector, $event, $func, $options);
			// check it later
			interval_count.push(setInterval(evt_listener, 500));
		};
		
		return func;
	})();
	
	var cache = function () {
		var _cache = {};
		extend(this, {
			// get a cache
			get : function ($id) {
				return _cache[$id];
			},
			// set a cache
			set : function ($id, $val) {
				_cache[$id] = $val;
			},
			// delete a cache
			"delete" : function ($id) {
				delete _cache[$id];
			},
			// clear all cache
			reset : function () {
				_cache = {};
			},
			// if a cache exists
			exists : function ($id) {
				return _cache[$id] || _cache[$id]==0;
			}
		});
	}
	
	var mouse = (function () {
		// simluate a click event
		function click($elem, $options) {
			if (!$elem)
				return;
			$options = $options || {};
			var opt = {
				button : $options.button || 0
			};
			// dispatch click event following the W3C order
			var e = $$d.createEvent("MouseEvents");
			e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, opt.button, null);
			$elem.dispatchEvent(e);
			
			e = $$d.createEvent("MouseEvents");
			e.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, opt.button, null);
			$elem.dispatchEvent(e);
			
			e = $$d.createEvent("MouseEvents");
			e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, opt.button, null);
			$elem.dispatchEvent(e);
		}
		
		// gesture part
		var gesture = (function () {

			var _zigzag = (function () {
				var zigzag_finished = 0,
					event_inited = false,
					lastX = lastY = X = Y = 0,
					boundary = 20,	// how many pixels should be past when defining a 'zigzag'
					$c = {};
			
				var _detect = (function () {
					var directionX = directionY = 0;	// record which direction does the mouse move
					return function (e) {
						var offsetX = e.clientX - X, offsetY = e.clientY - Y;	// direction
						X = e.clientX;
						Y = e.clientY;
						if (!directionX || !directionY) {	// init
							directionX = offsetX;
							directionY = offsetY;
							return;
						}
						_debug(offsetX * directionX > 0,offsetY * directionY > 0 ,Math.abs(X-lastX) < boundary ,Math.abs(Y-lastY) < boundary);
						// test if a 'z' is drawed 
						if (offsetX * directionX > 0 || offsetY * directionY > 0 || Math.abs(X-lastX) < boundary || Math.abs(Y-lastY) < boundary)
							return;
						lastX = X;
						lastY = Y;
						// when three zigzags are achieved
						if (++zigzag_finished >= 3)
							$c.success = true;
					};
				})();
				
				function _init(e) {
					zigzag_finished = 0;
					X = lastX = e.clientX;
					Y = lastY = e.clientY;
					$c.success = false;
				}
			
				$c = {
					init : _init,
					detect : _detect,
					success : false
				};
				
				return $c;
			})();
			
			return {
				"zigzag" : _zigzag
			};
		})();
		return {
			"click" : click,
			"gesture" : gesture
		};
	})();

	var lightbox = (function (){
		// hacking -> use base64
		var loadingImage='data:image/png;base64,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';
		var overlayPNG='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAYAAABUfC3PAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACpSURBVHja7NEBDQAACMOwg39PWMMGCZ2EtZJMdKq2AIqgQBEUKIICRVAEBYqgQBEUKIIiKFAEBYqgQBEUQYEiKFAEBYqgCAoUQYEiKFAERVCgCAoUQYEiKIICRVCgCAoUQREUKIICRVCgCIqgQBEUKIICRVAEBYqgQBEUKIIiKFAEBYqgQBEUQYEiKFAEBYqgQLEAiqBAERQoggJFUAQFiqBAEZTHrQADAOi7AYkbZwBkAAAAAElFTkSuQmCC';

		var _lightboxLoaded = false;	// if the lightbox is inited
		var CSS_DICTIONARY = [
				[/<overlay>/g,"#lightbox-overlay"],
				[/<box>/g,"#lightbox-main"],
				[/<loadingImg>/g,"#lightbox-loading-img"],
				[/<img>/g,"#lightbox-img"],
				[/<error>/g,"#lightbox-error"],
				[/<imgWrapper>/g, "#lightbox-img-wrapper"]
			],	// define css dictionary
			css = new $$css(CSS_DICTIONARY);

		var LIGHTBOX_ATTR = "lightbox",	// lightbox key
			STATUS_NULL = 0,	// when the lightbox is not loaded
			STATUS_LOADING = 1,	// loading a picture
			STATUS_LOADED = 2,	// picture loaded
			STATUS_LOAD_ERROR = 3;	// cannot be loaded (HTTP 400 etc.)

		function init() {
			// push css
			css.set('<box> { \
					display: none; \
					z-index: 992; \
					background-color: #F1F1F1; \
					position: fixed; \
					padding: 10px; \
					left: 50%; \
					top: 50%; \
					border-color: #E5E5E5; \
					border-bottom: 1px solid #666; \
					border-right: 1px solid #666; \
				} \
				<error> { display: none; width: 180px; height: 70px; } \
				<box> img { border: none; clear: both; } \
				<overlay> { \
					display: none; \
					position: fixed; \
					top: 0;\
					left: 0;\
					z-index: 990;\
					height: 100%; \
					width: 100%; \
					background-image: url('+ overlayPNG +'); \
				} \
				<overlay> img { border: none; } \
				<img> { \
					max-height: 550px; \
					max-width: 850px; \
				} \
				<loadingImg> { \
					display: none; \
					position: fixed; \
					z-index: 991; \
					top: 50%; \
					left: 50%; \
					/* 160 is half of the width of loading image */ \
					margin: -160px; \
				} \
				');

			css.push({ name: LIGHTBOX_ATTR }, '\
				select { visibility: hidden; } \
				<overlay> { display: block; } \
			');
			
			css.push({ name: LIGHTBOX_ATTR, value: STATUS_LOADING },
				'<loadingImg> { display: block; }'
			);
			
			css.push({ name: LIGHTBOX_ATTR, value: STATUS_LOADED },
				'<box> { display: block; }'
			);
			
			css.push({ name: LIGHTBOX_ATTR, value: STATUS_LOAD_ERROR }, '\
				<box>, <error> { display: block; } \
				<box> { \
					margin-top: -35px !important; \
					margin-left: -90px !important; \
				} \
				<imgWrapper> { display: none; } \
			');
			
			var _body = $$d.querySelector("body");
			// overlay
			var _overlay = $$d.createElement("div");
			_overlay.setAttribute('id', css.val('<overlay>'));
			_overlay.onclick = function() {
				css.disable(LIGHTBOX_ATTR);
			}
			_body.appendChild(_overlay);
			var loadingImg = $$d.createElement("img");
			loadingImg.setAttribute('id', css.val('<loadingImg>'));
			loadingImg.src = loadingImage;
			_overlay.appendChild(loadingImg);
			
			var _box = $$d.createElement("div");
			_box.setAttribute('id', css.val('<box>'));
			// image
			var _img = $$d.createElement("img");
			_img.setAttribute('id', css.val('<img>'));
			
			var _wrapper = $$d.createElement("a");
			_wrapper.setAttribute('id', css.val('<imgWrapper>'));
			_wrapper.setAttribute('title', 'Click to return.  You can save the picture with right-click and select "Save image as.."');
			_wrapper.appendChild(_img);
			_box.appendChild(_wrapper);
			// image load error message
			var _err = $$d.createElement("div");
			_err.setAttribute('id', css.val('<error>'));
			_err.innerHTML = "The orginal picture cannot be downloaded due to an error.  The picture is not found or the image server is down.";
			_box.appendChild(_err);
			_box.onclick = function() {
				css.disable(LIGHTBOX_ATTR);
			}
			_body.appendChild(_box);
		}

		function show(_link) {
			var _box = css.select('<box>');
			var _img = css.select('<img>');
			css.enable({ name: LIGHTBOX_ATTR, value: STATUS_LOADING });
			var img = new Image();
			img.onload = function() {
				// if use has cancelled the operation
				if (css.pull(LIGHTBOX_ATTR) != STATUS_LOADING)
					return;
				_img.src = _link;
				css.enable({ name: LIGHTBOX_ATTR, value: STATUS_LOADED });
				// 20 is the padding
				var width = _img.offsetWidth,
					height = _img.offsetHeight;
				width = (width - 20)/2;
				height = (height - 20)/2;
				_box.style.marginTop = "-"+ height +"px";
				_box.style.marginLeft = "-"+ width +"px";
			}
			img.onabort = img.onerror = function() {
				// if use has cancelled the operation
				if (css.pull(LIGHTBOX_ATTR) != STATUS_LOADING)
					return;
				css.enable({ name: LIGHTBOX_ATTR, value: STATUS_LOAD_ERROR });
			}
			img.src = _link;
		}

		// bind lightbox feature to the elements directly
		function bind($e) {
			if (!_lightboxLoaded) {
				init();
				_lightboxLoaded = true;
			}
			
			function _onclick() {
				show(this.href);	// do light box
				return false; // disable click
			}
			
			if ($e)
				utils.toArray($e).forEach(
					function ($item) {
						$item.onclick = _onclick;
					}
				);
			else
				// bind lightbox
				each(
					css.selectAll('a[href][lightbox="null"]'),
					function () {
						this.setAttribute("lightbox","inited");	// prevent being binded again
						this.onclick = _onclick;
					}
				);
		}
		
		return {
			"show" : show,
			"bind" : bind			
		};
	})();
	
	// xml http request
	var httpRequest = (function () {
		function _send($arg) {
			var req = new XMLHttpRequest();
			req.onreadystatechange = function() {
				var res = {
					responseXML: (req.readyState==4 ? req.responseXML : ''),
					responseText: (req.readyState==4 ? req.responseText : ''),
					readyState: req.readyState,
					responseHeaders: (req.readyState==4 ? req.getAllResponseHeaders() : ''),
					status: (req.readyState==4 ? req.status : 0),
					statusText: (req.readyState==4 ? req.statusText : '')
				}
				if (req.readyState == 4)
					res = {
						responseXML: req.responseXML,
						responseText: req.responseText,
						readyState: req.readyState,
						responseHeaders: req.getAllResponseHeaders(),
						status: req.status,
						statusText: req.statusText
					};
				if ($arg["onreadystatechange"])
					$arg["onreadystatechange"](res);
				if (req.readyState == 4) {
					if ($arg["onload"] && req.status>=200 && req.status<300)
						$arg["onload"](res);
					if ($arg["onerror"] && (req.status<200 || req.status>=300))
						$arg["onerror"](res);
				}
			}
			try {
				//cannot do cross domain
				req.open($arg.method, $arg.url);
			}
			catch(e) {
				if ($arg["onerror"]) {
					//simulate a real error
					$arg["onerror"]({
						responseXML:'',
						responseText:'',
						readyState:4,
						responseHeaders:'',
						status:403,
						statusText:'Forbidden'
					});
				}
				return;
			}
			if ($arg.headers) {
				for (var prop in $arg.headers)
					req.setRequestHeader(prop, $arg.headers[prop]);
			}
			req.send((typeof($arg.data)!='undefined') ? $arg.data : null);
		}
		
		return {
			"send": (typeof GM_xmlhttpRequest == "undefined") ? _send : GM_xmlhttpRequest
		};
	})();
	
	function _debug($msg) {
		if (DEBUG_ON)
			console.debug($msg);
	}
	// Main function begin ========================================
	
	// constructor
	var $$c = function () {
	};
	
	
	return extend($$c, {
		"each" : each,
		"extend" : extend,
		"css" : $$css,
		"listen" : listen,
		"url" : $$url,
		"dataTransfer" : dataTransfer,
		"mouse" : mouse,
		"browser" : $$browser,
		"window" :  $$w,
		"cookies" : cookies,
		"select" : function (e) { return $$css.select(e) },
		"selectAll" : function (e) { return $$css.selectAll(e) },
		"tickTork" : setFunctionTiming,
		"utils" : utils,
		"cache" : cache,
		"i18n" : i18n,
		"debug" : _debug,
		"lightbox" : lightbox,
		"httpRequest" : httpRequest
	});
	
})(document);


var GooglePlusPlus = (function ($$d) {

	$K.debug('Google Plus Plus is now loaded!');

	var CSS_DICTIONARY = [
		[/<postLocked>/g, '.postLocked'],
		[/<postFolded>/g, '.postFolded'],
		[/<postShorten>/g, '.postShorten'],
		[/<postDragging>/g, '.postOnDragging'],
		[/<pinColAttr>/g, 'pinter-col'],
		[/<newCommentArrived>/g, '.newCommentArrived'],
		[/<mainContent>/g, '.Nj.mu'],
		[/<streamMainContent>/g, '<mainContent>.a-f-e'],
		[/<streamContent>/g, 'div[guidedhelpid="streamcontent"]'],
		[/<streamContainer>/g, '<streamContent> .ow'],
		[/<communityMark>/g, '.qhMQeb'],
		[/<communityMainContent>/g, '<mainContent><communityMark>'],
		[/<communityInviteFriendsBlock>/g, '.yhx0Mc.rIIhLe.jY2lqf'],
		[/<joinTheCommunityBlock>/g, '.ADmuve.rIIhLe.pMzoZc'],
		[/<anyPost>/g, '.Tg.Sb'],	// match the post in the single post page
		[/<post>/g, '<streamContainer> <anyPost>'],	// match the post in the stream
		[/<invisibleMark>/g, '[style*="display: none;"]'],	// not deleted posts
		[/<postSelected>/g, '.sb'],	// post selected mark
		[/<leftSideNavigation>/g, '.LPb.Zaa'],
		[/<chatBox>/g, '.Hoa.n0b'],	// maxmized chatbox
		[/<maxmizedChatBox>/g, '<chatBox>.RWa'],	// chatbox
		[/<trendingBox>/g, '.hxa.AqMP8e'],
		[/<addFriendsBox>/g, '.aS'],
		[/<addFriends>/g, '<addFriendsBox> .x9LvRc'],
		[/<postMainContent>/g, '.ii'],
		[/<shareBoxContainer>/g, '.Cla'],
		[/<shareBox>/g, '<shareBoxContainer> div[guidedhelpid="sharebox"]'],
		[/<shareBoxLeftArrow>/g, '<shareBoxContainer> .ze.Dla'],
		[/<postCommentPanel>/g, '.Lj.FE'],
		[/<postBody>/g, '<postMainContent> > .ci.gv'],
		[/<nothingSharedYet>/g, '<streamContainer> > .Ki'],	// xxx hasn't share anything with you or no any post
		[/<filterByCircleOptions>/g, '.kI'],
		[/<contentPane>/g, '#contentPane'],
		[/<blockLeftArrow>/g, '.ie'],
		[/<greyContentBorderAreaLeft>/g, '.vna.KTa'],	// the first child of #content 
		[/<greyContentBorderAreaRight>/g, '.vna.K9'],	// this appears when the chatbox is maxmized
		[/<contentBorderArea>/g, '.wna.M5a'],
		[/<postHeadArea>/g, '.MI'],	// the header of a post
		[/<postTimeAndCircle>/g, '<postHeadArea> .Wp.mc'],
		[/<postTime>/g, '<postTimeAndCircle> .Ri.lu'],
		[/<streamMoreButtonContainer>/g, '.ZI.rK.Sca'],
		[/<streamMoreButton>/g, '<streamMoreButtonContainer> span[role="button"]'],
		[/<postInnerMedia>/g, '.dv.Mm'],	// media including vidoes, photo etc.
		[/<postInnerMediaContent>/g, '.Yj.Fg'],	// media content
		[/<postInnerVideo>/g,'<postInnerMedia> > iframe'],
		[/<postMediaBackground>/g, '<postInnerMedia> .Fg'],
		[/<postInnerImageThumbnail>/g, '.yqrXXd.cPNrJ'],
		[/<postInnerImageWebPageScreenshot>/g, '.ZF'],	// the class of web page screenshot thumbnails
		[/<postInnerImage>/g, '<postInnerMedia>.Zf > <postInnerMediaContent>:not(<postInnerImageWebPageScreenshot>) img.ev.aG'],
		[/<postHotonGooglePlusBanner>/g, '.hE.ZX'],
		[/<postInnerImageContainer>/g, '<postInnerMedia> > <postInnerMediaContent>:not(<postInnerImageWebPageScreenshot>)'],
		[/<videoThumbnail>/g, '<postInnerMedia>:not(.Zf) > <postInnerMediaContent> img.ev.aG'],
		[/<videoIntroduction>/g, '<postInnerMedia>:not(.Zf) .ru'],
		[/<singlePostProfileBlock>/g, '.kM5Oeb-OKUawf.hsHREd'],
		[/<GoogleLogo>/g, '#gbq1'],
		[/<GoogleBarTopGeryArea>/g, '.Dob'],
		[/<postComment>/g, '.Gq'],
		[/<shareThisPostButton>/g, '.Tj.pk'],
		[/<nullPost>/g, '<post>.null-post'],
		[/<userPhoto>/g, '.g-s-n-aa.Wk'],
		[/<settingHelpFeedbackLinks>/g, '.LCa'],
		[/<searchFilter>/g, '.Rgc .w0b'],
		[/<matchedPerson>/g, '.Noa.G0b'],
		[/<profileIntroduction>/g, '.J7.zaSESc'],
		[/<fromTheWebText>/g, '<post> <postBody> .HL'],
		[/<profilePage>/g, '.vcard'],
		[/<profileAction>/g, '.l-ul.IT.Uf'],
		[/<profilePageFloatingBar>/, '<profilePage> .AYoUUe.Lr1ucd'],
		[/<profilePageFloatingBarShadow>/, '<profilePage> .dFEfVe.Lr1ucd'],
		[/<myGames>/g, '.CLb'],
		[/<fromTheWebMarkPic>/g, '.l7.aM'],
		[/<gameStream>/g, '.DLb'],
		[/<navigationBarBottomLine>/g, '.Dob'],	// this control the height of grey area in the top
		[/<leftNavigationGreyBackground>/g, '.t9a.mdb'],
		[/<blackNavigationBar>/g, '#gbx3'],
		[/<postUserName>/g, '.cK'],
		[/<notEnoughPostsInYourStream>/g, '.ZNa.aS'],
		[/<postActionButtons>/g, '<postMainContent> > .LI'],
		[/<webPageIntroduction>/g, '.pg.XF'],
		[/<evenPost>/g, '<post>:not(<invisibleMark>):nth-last-child(even)'],
		[/<oddPost>/g, '<post>:not(<invisibleMark>):nth-last-child(odd)'],
		[/<editProfileBar>/g, '.gDa.rX.mU.Eg.nU'],
		[/<optionMenu>/g, '.a-q'],	// operation menu of a post
		[/<saveTheSearchButton>/g, '.Tbc.x0b'],
		[/<postEventImageThumbnail>/g, '.CI5GWc'],
		[/<filterByCircleOptionsMainBar>/g, '<filterByCircleOptions> .mp.pu']
	];
	
	var HIDE_CHATBOX = "hide-chatbox",
		HIDE_LEFT_SIDE_NAVIGATION = "hide-left-side-navigation",
		DISPLAY_CIRCLE_INFO = 'display-circle-info',
		BLACK_NAVIGATION_EXIST = 'black-navigation-exist';
	
	var css = new $K.css(CSS_DICTIONARY);
	
	// hide the left side menu
	css.push(HIDE_LEFT_SIDE_NAVIGATION,
		"<leftSideNavigation>, <navigationBarBottomLine> { \
			transition: left .8s ease; \
			-moz-transition: left .8s ease; \
			-webkit-transition: left .8s ease; \
		} \
		/* for search page */ \
		<leftSideNavigation> <leftNavigationGreyBackground> { \
			display: block !important; \
			top: 0px; \
		} \
		/* hide the triangle pointer on search page */ \
		<leftSideNavigation> <leftNavigationGreyBackground><invisibleMark> .fEb { \
			border-bottom: 0; \
		} \
		<leftSideNavigation> <leftNavigationGreyBackground><invisibleMark> .eEb { \
			border-right: 1px solid #CCC; \
		} \
		/* triangle pointer */ \
		<leftSideNavigation> <leftNavigationGreyBackground><invisibleMark> .NDb { \
			border-top: 0; \
		} \
		/* search page end */ \
		<leftSideNavigation>:not(:hover) { left: -90px; } \
		<greyContentBorderAreaLeft>, <contentBorderArea> { margin-left: 10px; } \
		/* bottom line of the white navigation bar */ \
		<leftSideNavigation>.gEb:not(:hover) ~ <contentBorderArea> <navigationBarBottomLine> { \
			left : 11px; \
		} \
		<leftSideNavigation>:not(:hover) .NWShHf.pQV9re { \
			margin-left: 90px; \
		} \
		<leftSideNavigation> ~ <contentBorderArea> .uBkbrd.D0jntb:not(.EvUqIc) { left : 0px } \
		<leftSideNavigation>:hover ~ <contentBorderArea> .uBkbrd.D0jntb:not(.EvUqIc) { display: none; } \
		/* fix left side navigation' border */ \
		<leftSideNavigation> .r7omcb { \
			top:-29px; \
			border-left: 100px solid #F1F1F1; \
			border-right: 1px solid #D1D1D1; \
			height: 100% !important; \
		} \
		", { enable : true }
	);

		//
	// hide the chatbox
	css.push(HIDE_CHATBOX,
		'<maxmizedChatBox> { \
			transition: right .8s ease; \
			-moz-transition: right .8s ease; \
			-webkit-transition: right .8s ease; \
			z-index: 986; \
		} \
		<maxmizedChatBox>:not(:hover) { right : -160px; } \
		<greyContentBorderAreaRight>, <contentBorderArea> { margin-right: 65px; } \
		<navigationBarBottomLine> { right : 66px }\
		', { enable : true }
	);
	
	// hide the white navigation bar
	css.push(BLACK_NAVIGATION_EXIST,
		" \
		/* move up the user photo */ \
		#gb #gbw #gbu { z-index: 998; top: -19px; } \
		#gb #gbb { top: -49px; } \
		#gb.gbes #gbb { top: -35px; } \
		/* user name */ \
		.gbgt#gbg6 #gbi4t { color:white; } \
		/* user profile photo */ \
		#gb:not(.gbes) #gbw #gbu { top: -19px; } \
		#gb:not(.gbes) #gbg4 { margin-top: -1px; } \
		#gb:not(.gbes) #gbg4 #gbgs4, #gb:not(.gbes) #gbg4 #gbgs4 > img { \
			height: 30px; \
			width: 30px; \
		} \
		#gb.gbes #gbu .gbtc { margin-top: 10px; } \
		#gb.gbes #gbu .gbmai { display: none; } \
		#gb:not(.gbes) #gbu { margin-right: 0; } \
		/* */ \
		#content { margin-top: 16px; } \
		#gb { width: 100%; position: fixed; } \
		/* animation for white bar height change */ \
		#gb, #gbx1 { \
			transition: height .8s ease .4s; \
			-moz-transition: height .8s ease .4s; \
			-webkit-transition: height .8s ease .4s; \
		} \
		/* transparent black */ \
		<blackNavigationBar> { opacity: 0.8 } \
		/* hide the white navigation bar */ \
		#gb:not(:hover) #gbw #gbq { \
			top: -80px; \
		} \
		/* white bar part */ \
		#gb:not(:hover) #gbx1 { height: 0px; } \
		/* the grey area of the top bar */ \
		<GoogleBarTopGeryArea> { max-height: 12px; } \
		#gb #gbx1 { border-bottom: 1px solid #ccc; } \
		/* navigation height */ \
		#gb:not(:hover) { height: 30px; } \
		div.gbes#gb:not(:hover) { height: 25px; } \
		/* fix the height of white bar */ \
		div.gbes#gb { height: 62px; } \
		/* bottom shadow line of the grey area */ \
		.wl.cVa.V9 { display: none; } \
		#gbq { \
			transition: top .8s ease .4s; \
			-moz-transition: top .8s ease .4s; \
			-webkit-transition: top .8s ease .4s; \
		} \
		<maxmizedChatBox> { margin-top: -50px; } \
		<contentPane> { margin-top: 0px; } \
		<editProfileBar> { top: 61px; } \
		<navigationBarBottomLine> ~ <contentPane> <editProfileBar> { top: 66px; } \
		"
	);
	
	// new style that enable auto hiding the left side menu
	css.set(
		' \
		<filterByCircleOptionsMainBar> { \
			border-bottom : 0px; \
			position: fixed; \
			background-color: rgba(255, 255, 255, 0.75) ; \
		} \
		/* for the buttons in the filter bar */ \
		<filterByCircleOptionsMainBar> .GM { \
			position: fixed; \
		} \
		/* fix the indent */ \
		<filterByCircleOptions> > div.Lg { \
			position: relative; \
		} \
		/* save this search */ \
		<saveTheSearchButton> { float: right; } \
		'
	);

	// basic css for all style
	css.set(
		'<streamContainer> { padding: 20px; }'+
		'<contentPane> { height: 100%; } '+	// main content
		'<postCommentPanel> { z-index: 1; }'+ // make the comment panel cover the pictures
		'<postMediaBackground> { background: transparent; }' +
		'<shareThisPostButton> + a[class="Tj"][style]:not([role]) ~ div:not([class])[style~="z-index:"][style^="box-shadow:"] { margin-top: -120px }'+	// hack for the plughin 'reply and more'
		'<profileIntroduction>:not(:hover) { \
			max-height: 85px; \
			overflow-y: hidden; \
		}'+ // live where - profile page
		'<profilePage> <profileAction> { margin-left:-250px; position: absolute; top: 220px; }'+ // 'block someone' button on profile page
		'<profilePage> <settingHelpFeedbackLinks> { display: none; }'+	// settings, help, feedback etc.
		'<profilePage> div[role="tabpanel"][id$="-about-page"] { margin-left: -30px; }'+ // about section
		'<profilePage> div[role="tabpanel"][id$="-photos-page"], \
			<profilePage> div[role="tabpanel"][id$="-videos-page"] { \
				margin-top: 80px; \
		} \
		<profilePage> { margin-left: -50px; } \
		/* indent of posts page */ \
		<profilePage> div[role="tabpanel"][id$="-posts-page"] { \
			width: 100%; \
		} \
		<profilePage> div[role="tabpanel"][id$="-posts-page"] > div { \
			left: 50px; \
			position: absolute; \
		} \
		/* hide the left arrow of share box */ \
		<shareBoxLeftArrow> { display: none; } \
		<postMainContent> <webPageIntroduction> { max-height : 150px }'+	// max-height of the text introduction of a web page
		'<streamMoreButtonContainer> { margin-top: 400px; }'	// initial top of more botton
	);
	
	// deal with the trending box
	css.set('<trendingBox> { display:none }');
	css.push(DISPLAY_CIRCLE_INFO,
		' \
		/* "xxx" have you in circle / trending box */ \
		<mainContent> <profilePage> <trendingBox> { \
			display: inline-block; \
			z-index: 10; \
			background-color: white; \
			position: relative; \
			float: right; \
			width: 290px; \
		} \
		<mainContent> <profilePage> <trendingBox> { \
			border: 1px solid #ccc; \
			/* original width is 260px */ \
			width: 260px; \
		} \
		'
	);
	
	// add friends to see what they are sharing
	css.set('<addFriendsBox> { display: none; }');
	css.set('<addFriends> { margin: 0; }');

	var isNewPostArrived = (function () {
		var firstPostId = null;

		return function () {
			var firstPost = css.select('<post>:first-child');
			if (!firstPost)
				return false;
			var curFirstPostId = firstPost.getAttribute('id');
			if (firstPostId != curFirstPostId)
				return !!(firstPostId = curFirstPostId);
			else
				return false;
		};
	})();

	/*
	  Timeline Style
	*/
	var GTimeline = (function () {
		function _init_CSS() {
			css.set(
				'<post> { \
					display: inline-block; \
					padding: 5px; \
					margin: -10px 0 20px 0; \
				} \
				<evenPost> <postMainContent> > <userPhoto>, \
				<evenPost> <postMainContent> > .nINTy {\
					position: absolute; \
					display: block; \
					margin-left: 573px; \
				} \
				<evenPost> <blockLeftArrow> { \
					background: no-repeat url(//ssl.gstatic.com/s2/oz/images/sprites/stream-a577cb9e1965785ee8ad2e71f3e8cc5e.png) 0px -21px; \
					margin-left: 495px; \
				} \
				<evenPost> <postHeadArea> { \
					text-align: right; \
					margin-right: 25px; \
				} \
				<evenPost> <postUserName> { \
					margin-left: 10px; \
					float: right; \
				} \
				<oddPost> { \
					clear: both; \
					float: right; \
				} \
				<streamContainer> { \
					margin: 0 auto; \
					padding:20px; \
					margin-bottom:10px; \
					width:1150px; \
					background: url("data:image/png;base64,'+
						'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'+
					'") top center repeat-y; \
				} \
				'
			);
		}
		
		var checkLayout = (function () {
			css.set('<nullPost> { display: none; }');
			
			var lastPostId = null;
				
			return function () {
				var stream = css.select('<streamContainer>'),
					lastPost = css.select('<post>:not(<invisibleMark>)[id]:last-of-type'),
					currentLastPostId = null;
				if (lastPost)
					currentLastPostId = lastPost.getAttribute('id');
				if (!lastPostId || !lastPost) {	// first-time run
					lastPostId = currentLastPostId;
					return;
				}
				else if (currentLastPostId == lastPostId)
					return;
				if (css.selectAll('#'+ lastPostId +' ~ <post>:not(<invisibleMark>)[id]').length % 2 != 0) {
					var nullPost = css.select('<nullPost>');
					if (nullPost)
						stream.removeChild(nullPost);
					else {
						var div = $$d.createElement('div');
						css.add('<nullPost>');
						stream.appendChild(div);
					}
				}
				lastPostId = currentLastPostId;
			}
		})();
		
		function _init() {
			$K.debug("Layout+ Timeline is now loaded.");
			_init_CSS();
			$K.url.onUrlChange(
				function () {
					$K.listen(css.get('<streamContainer>'), ['DOMNodeInserted', 'DOMNodeRemoved'],  checkLayout);
				}, true
			);
		}
		
		return {
			"init" : _init
		};
	})();

	/*
	  Pinterest Style
	 */
	var GPinterest = (function () {
		var COLUMN_ATTR = css.get('<pinColAttr>'),	// attribute name set to each post
			paddingV = paddingH = 10,	// the padding between each block
			leftNavigationWidth = 100,	// left navigation's width is 100px
			hiddenNavigationWidth = 10,	// the width after hiding
			hiddenChatBoxWidth = 50,	// the pixels on the sceen when the chat box is hidden
			mainContentLeftMargin = 40 + hiddenNavigationWidth,	// the margin-left of main content
			chatBoxWidth = 211,	// chat box's width is 211px
			chatBoxGreyBoard = 20,	// grey board (half)
			chatBoxBorderLine = 1,	// the border line of grey board
			postBlockWidth = 496,	// default bricks' width
			perferColumn = 2,	// at least how many columns should be put into the container
			shortestPostHeight = 199,
			deletedPostHeight = 38,
			reCalculateLayoutEachXPixels = 5,
			currentColumn = 0,
			maxContainerWidth = getMaxContainerWidth(window.innerWidth),
			brickParameters = [],
			$$data = _init_posts_data(),
			LAYOUT_OPERATION_UPDATE_COLUMN = 'update-column';
		
		// init posts' data
		function _init_posts_data() {
			return {
				"posts" : {},
				"index" : {
					"locked" : {},
					"folded" : {}
				},
				"other" : {},
				"cache" : {
					"elem" : new $K.cache("elem")
				}
			};
		}
		
		function _init_CSS() {
			// animation of the post when a new comment is arrived
			css.set(
				"<post><newCommentArrived> <postMainContent> > <userPhoto> img { \
					animation: rotateUserPhoto 5.5s ease-in-out 1s infinite normal; \
					-moz-animation: rotateUserPhoto 5.5s ease-in-out 1s infinite normal; \
					-webkit-animation: rotateUserPhoto 5.5s ease-in-out 1s infinite normal; \
				} \
				@keyframes rotateUserPhoto { \
					0% { transform: rotate(360deg); } \
					20% { transform: rotate(0deg); } \
				} \
				@-moz-keyframes rotateUserPhoto { \
					0% { -moz-transform: rotate(360deg); } \
					20% { -moz-transform: rotate(0deg); } \
				} \
				@-webkit-keyframes rotateUserPhoto { \
					0% { -webkit-transform: rotate(360deg); } \
					20% { -webkit-transform: rotate(0deg); } \
				} \
				<post><newCommentArrived> { \
					transition:border linear .2s,box-shadow linear .5s; \
					-moz-transition:border linear .2s,-moz-box-shadow linear .5s; \
					-webkit-transition:border linear .2s,-webkit-box-shadow linear .5s; \
					outline:none; \
					border-color: rgba(0, 97, 255, 0.75); \
					box-shadow: 0 0 30px rgba(0, 97, 255, 0.95); \
					-moz-box-shadow: 0 0 30px rgba(0, 97, 255, 0.95); \
					-webkit-box-shadow: 0 0 30px rgba(0, 97, 255,0.95); \
				} \
				"
			);
			
			css.set(
				"/* There is one white line on the left */ \
				.KTzH3 { display: none; } \
				/* center the main stream, except on the page 'photo from your phone' and community page */ \
				<mainContent>:not(.hca):not(<communityMark>) { margin-left : "+ mainContentLeftMargin +"px; } \
				/* fix the 'hot on google's border */ \
				<postHotonGooglePlusBanner> { \
					margin-top: -3px; \
					margin-left: 0px; \
				} \
				/* fix the comment's border */ \
				<post> <postCommentPanel> { border-top: 0px; top: 0px; margin: 0; }	\
				/* put the user photo into post start */ \
				<post> <postHeadArea>, <post> <fromTheWebMarkPic> { \
					margin-left: 50px; \
					margin-top: 10px; \
					min-height: 40px; \
				} \
				/* on search page, 'from the web' */ \
				<post> <postMainContent> > <fromTheWebMarkPic> { margin-left: 15px; } \
				/* from the web text */ \
				<fromTheWebText> { \
					margin-top: -55px; \
					margin-left: 60px; \
					position: absolute; \
				} \
				/* end */ \
				<post> <postMainContent> > <userPhoto> { \
					display: inline; \
					float: left; \
					margin-left: 80px; \
					margin-top: 10px; \
				} \
				/* fix the event image */ \
				<postEventImageThumbnail> { \
					max-width: 498px; \
				} \
				/* put the user photo into post end */ \
				<post> <videoThumbnail> { margin: auto; } \
				/* fix the position of user's photo on profile page */ \
				<mainContent> <singlePostProfileBlock> { margin-top: 0px } \
				<blockLeftArrow> { display: none !important; } \
				"
			);
			
			// hide the post not ready yet
			css.set(
				'<post> { left: -999px; } \
				<post>[<pinColAttr>] { left: 0px; } \
				'
			);
			
			// post animation
			css.set(
				'<post> { \
					position: absolute; \
					transition: all 1.2s ease-in-out; \
					-moz-transition: all 1.2s ease-in-out; \
					-webkit-transition: all 1.2s ease-in-out; \
				} \
				'
			);
			
			// animation for selected post
			css.set(
				'<post><postSelected> { \
					z-index: 2; \
					transition:border .2s linear 1.8s, box-shadow .5s linear 2s; \
					-moz-transition:border .2s linear 1.8s, -moz-box-shadow .5s linear 2s; \
					-webkit-transition:border .2s linear 1.8s, -webkit-box-shadow .5s linear 2s; \
					outline:none; \
					border-color: rgba(255, 49, 0, 0.75); \
					-webkit-box-shadow: 3px 2px 8px rgba(50, 50, 50, 0.45);  \
					-moz-box-shadow: 3px 2px 8px rgba(50, 50, 50, 0.45); \
					box-shadow: 3px 2px 8px rgba(50, 50, 50, 0.45); \
				}'
			);

			// make the share box act like a post
			css.set(
				'/* hide the photo beside the sharebox */ \
				<streamMainContent> <streamContent> { \
					margin-top: -20px; \
				} \
				<streamContent> { \
					margin-left:-120px; \
				} \
				<communityMainContent> <streamContent> { \
					margin-left:-70px; \
				} \
				/* fix the indent of sharebox on community page */ \
				<contentPane> <communityMainContent> <shareBoxContainer>, \
				<communityMainContent> <joinTheCommunityBlock>, \
				<communityMainContent> <communityInviteFriendsBlock> { \
					margin-left: 0px; \
				} \
				/* fix the indent of sharebox on profile page */ \
				<profilePage> <shareBoxContainer> { \
					position: absolute; \
					margin-top: 10px; \
					z-index: 4; \
				} \
				<profilePageFloatingBar>, <profilePageFloatingBarShadow> { \
					margin-top: -73px; \
				} \
				/* for blocks which should be floating */ \
				<streamMainContent> <shareBoxContainer>, <searchFilter>, <matchedPerson>, \
				<notEnoughPostsInYourStream>, <myGames>, <gameStream>, \
				<joinTheCommunityBlock>, <communityInviteFriendsBlock> { \
					margin-left: -52px; \
					position: absolute; \
					margin-top: 10px; \
					z-index: 4; \
					transition: all 1.2s ease-in-out; \
					-moz-transition: all 1.2s ease-in-out; \
					-webkit-transition: all 1.2s ease-in-out; \
				} \
				<notEnoughPostsInYourStream> { \
					background-color: white; \
				} \
				/* the post content */ \
				<shareBox> .g-Ac[role="button"] { \
					width: 100%; \
				} \
				/* user photo */ \
				<shareBoxContainer> <userPhoto> { \
					display: none; \
				} \
				<nothingSharedYet> { \
					margin-top: 100px; \
					margin-left: '+ (mainContentLeftMargin+50) +'px; \
				} \
				'
			);
			
			// drag & drop
			css.set(
				"<postHeadArea> { cursor: url(//ssl.gstatic.com/s2/oz/images/sge/openhand_8_8.cur),move; } \
				<post><postSelected><postLocked> { \
					z-index: 6; \
				} \
				<post><postLocked> { \
					position: fixed; \
					z-index: 5; \
				} \
				/* transparent when draging */ \
				<post><postDragging> { \
					opacity: 0.5; \
				} \
				/* when it's locked and folded */ \
				<post><postFolded><postLocked>,  \
				<post><postFolded><postLocked> > div, \
				<post><postShorten>, <post><postShorten> > div { \
					max-width: 280px; \
				} \
				/* user name */ \
				<post><postFolded><postLocked> <postUserName>, \
				<post><postShorten> <postUserName> { \
					display: block;	\
					font-family: Georgia; \
				} \
				<post><postFolded><postLocked> <postHeadArea> header, \
				<post><postShorten> <postHeadArea> header { \
					margin-top: -10px;	\
				} \
				/* indent of time */ \
				<post><postFolded><postLocked> <postTimeAndCircle>, \
				<post><postShorten> <postTimeAndCircle> { \
					margin-left: 0px;	\
				} \
				/* min-height of a post when it is folded */ \
				<post><postFolded> <postMainContent> { \
					min-height: 70px; \
				} \
				<post><postFolded> <postBody>, \
				<post><postFolded> <postActionButtons>, \
				<post><postFolded> <postHotonGooglePlusBanner>, \
				<post><postFolded> <postCommentPanel> { \
					display: none; \
				} \
				<post><postFolded>:hover <postBody> { \
					animation: peakAtPostContent .8s ease-in-out;  \
					-moz-animation: peakAtPostContent .8s ease-in-out;  \
					-webkit-animation: peakAtPostContent .8s ease-in-out;  \
					position: absolute; \
					margin-top: 20px; \
					opacity: 1; \
					display:block; \
					top: 55px; \
					z-index: 8; \
					background: white; \
					border: 1px solid #ccc; \
					border-radius: 2px; \
					border-color: rgba(0, 97, 255, 0.75); \
					box-shadow: 0 0 30px rgba(0, 97, 255, 0.95); \
					-moz-box-shadow: 0 0 30px rgba(0, 97, 255, 0.95); \
					-webkit-box-shadow: 0 0 30px rgba(0, 97, 255, 0.95); \
				} \
				@keyframes peakAtPostContent { \
					0% { opacity: 0; } \
					80% { opacity: 0; } \
				} \
				@-moz-keyframes peakAtPostContent { \
					0% { opacity: 0; } \
					80% { opacity: 0; } \
				} \
				@-webkit-keyframes peakAtPostContent { \
					0% { opacity: 0; } \
					80% { opacity: 0; } \
				} \
				"
			);
		}
		
		function loadBrickCSS($windowWidth) {
			// more flexible when the media queries is off
			if ($K.browser == "chrome")
				mediaQueriesEnable = true;
			var maxContainerWidth = getMaxContainerWidth($windowWidth),
				index = Math.floor(maxContainerWidth / reCalculateLayoutEachXPixels),
				BRICK_PARA_ATTR = 'brick-para-index';
			css.enable({ name: BRICK_PARA_ATTR, value: index });
			if (brickParameters[index])
				return brickParameters[index];
			var 
				para = brickParameters[index] = getBrickParameters(maxContainerWidth), css_string ='';
			// squeeze user name
			var uname_style = '<post> <postUserName> { display: block; } \
				<post> <postHeadArea> header { margin-top: -10px; } \
				<post> <postTime> { margin-left: 0px; }';
			if ($windowWidth < 1750)
				css_string += '<filterByCircleOptionsMainBar> { width:'+ (maxContainerWidth - hiddenNavigationWidth - chatBoxBorderLine)+'px; }';
			// when screen is too small, compress the user name block.  here window's width is only an approximate value
			if ($windowWidth < 1280)
				css_string += uname_style;
			var _offsetLeft = Math.floor((para.brickWidth - postBlockWidth)/2);
			// set brick width
			css_string +=
				'<shareBoxContainer>, <shareBox>, <notEnoughPostsInYourStream>, \
				<searchFilter>, <matchedPerson>, <joinTheCommunityBlock>, <communityInviteFriendsBlock>, \
				<post>, <post> > div:not(<optionMenu>) { \
					width:' + para.brickWidth +'px; \
				} \
				<postInnerVideo>, <postInnerImageContainer>, \
				<videoThumbnail>, <myGames>, <myGames> .KNb, \
				<gameStream> { \
					width:' + para.brickWidth +'px !important; \
				} \
				<postInnerImageContainer>, <postInnerImage>, <postInnerImageThumbnail> { \
					max-width:' + para.brickWidth +'px !important; \
				}';
			for (var i=0; i< para.brickColumn; i++)
				css_string += '<post>[<pinColAttr>="'+i+'"] { left: '+ i * (paddingH + para.brickWidth) +'px; }';
			css.push({ name: BRICK_PARA_ATTR, value : index }, css_string, { enable : true });
			return para;
		}
		
		// get current max container width
		function getMaxContainerWidth($windowWidth) {
			var _chatBoxWidth = css.pull(HIDE_CHATBOX) ? hiddenChatBoxWidth : chatBoxWidth,
				_chatBoxGreyBoard = chatBoxGreyBoard,
				_chatBoxBorderLine = chatBoxBorderLine,
				_communityPageBorder = 210;	// the width of left panel
			if (!css.select('<greyContentBorderAreaRight>'))
				_chatBoxWidth = _chatBoxGreyBoard = _chatBoxBorderLine = 0;
			// on communities page
			if (!/plus\.google\.com\/communities\/\d+/.test($K.url))
				_communityPageBorder = 0;
			return $windowWidth - _chatBoxWidth - _chatBoxGreyBoard - _chatBoxBorderLine - mainContentLeftMargin - _communityPageBorder;
		}
		
		// re-calculate parameters based on container width
		function getBrickParameters($containerWidth) {
			var containerWidth = $containerWidth + paddingH,
				column = localStorage['GPinterest_peferColumn'] || 0;
				
			if (!column) {
				column = Math.round(containerWidth / (postBlockWidth + paddingH));
				// at least three columns should be ensured to display
				column =  column > perferColumn ? column : perferColumn;
			}
			var postBrickWidth = Math.floor($containerWidth / column - paddingH);
			
			return {
				"brickColumn" : column,
				"brickWidth" : postBrickWidth
			};
		}
		
		// drag and drop =======
		// alert when there is new message
		function monitorNewMessage($post) {
			var comment = $post.querySelector(css.get('<postCommentPanel> <postComment>'));
			comment.addEventListener('DOMNodeInserted', newCommentListener, false);
			$post.addEventListener('click', cancleNewCommentAlert, false);
		}
		function _monitorNewMessage($post) {
			var comment = $post.querySelector(css.get('<postCommentPanel> <postComment>'));
			comment.removeEventListener('DOMNodeInserted', newCommentListener, false);
			$post.removeEventListener('click', cancleNewCommentAlert, false);
		}
		function newCommentListener() {
			var post = this.parentElement.parentElement;
			css.add(post, '<newCommentArrived>');
		}
		function cancleNewCommentAlert() {
			css.remove(this, '<newCommentArrived>');
		}
		var foldAndLockMouseDispatcher = (function () {
			var dragX = dragY = 0, lastDraggedPostId = null, droppable = false;
			
			// listen to some basic section
			$K.listen('#content', 'dragover',
				function (e) {
					if (e.preventDefault) e.preventDefault();
					$K.debug('dragover');
					//$K.mouse.gesture.zigzag.detect(e);
					return false;
				}
			);
			$K.listen('#content', 'dragenter',
				function (e) {
					$K.debug('dropenter');
					e.dataTransfer.dropEffect = 'move';
					return false;
				}
			);
			$K.listen('#content', 'drop',
				function (e) {
					if (e.stopPropagation) e.stopPropagation();
					$K.debug('drop content');
					var elem = e.target;
					droppable = droppable && !css.is(elem, "uohZhe");
					if (!droppable)
						return;
					var offsetX = e.clientX - dragX,
						offsetY = e.clientY - dragY,
						p = $$data.posts[lastDraggedPostId],
						style = getComputedStyle(p.post),
						X = offsetX + css.getPiexls(style.getPropertyValue('left')),
						Y = offsetY + css.getPiexls(style.getPropertyValue('top'));
					lockPostPosition(p, { "X": X, "Y": Y });
					return false;
				}
			);
			$K.listen(css.get('<leftSideNavigation>'), 'drop',
				function (e) {
					if (e.stopPropagation) e.stopPropagation();
					if (e.preventDefault) e.preventDefault();
					$K.debug('drop');
					resetPostPosition(lastDraggedPostId);
					droppable = false;
					return false;
				}
			);
			
			return function (e) {
				var elem = e.target, post;
				$K.debug(elem);
				if (elem.tagName == "HEADER")
					elem = elem.parentElement;
				if (css.is(elem, "<postHeadArea>"))
					post = elem.parentElement.parentElement.parentElement;
				if (!css.is(post, '<anyPost>'))
					return;
				var pid = post.getAttribute('id'), pdata = $$data.posts[pid];
				// fold post
				pdata.fold(!pdata.fold());
				delayedLayout();
				/*
				if (!elem.hasAttribute('draggable')) {
					elem.setAttribute('draggable', 'true');
					// when drag start
					elem.addEventListener('dragstart',
						(function ($pid) {
							return function (e) {
								var p = $$data.posts[$pid];
								dragX = e.clientX;
								dragY = e.clientY;
								css.add(p.post, '<postDragging><postShorten>');
								lastDraggedPostId = $pid;
					$K.debug('dragstart');
								e.dataTransfer.effectAllowed = 'move';
								$K.dataTransfer.setData('movePost', $pid);
								p.fold(true);
								// record zigzag
								//$K.mouse.gesture.zigzag.init(e);
								return true;
							};
						})(pid)
					);
					elem.addEventListener('dragend',
						(function ($pid) {
							return function (e) {
								var p = $$data.posts[$pid];
					$K.debug('dragend');
								css.remove(p.post, '<postDragging><postShorten>');
								// if this is a zigzag gesture
								if ($K.mouse.gesture.zigzag.success) {
									if (p.lock() || p.select())
										resetPostPosition($pid);
									droppable = false;
								}
								else
									droppable = true;
							};
						})(pid)
					);
					// reset post's position by double click
					elem.addEventListener('dblclick',
						(function ($p) {
							return function () {
							}
						})(post)
					, false);
				}*/
			}
		})();
		// drag and drop ===========
		// lock a post's position
		function lockPostPosition($p, $pos) {
			$p.lock(true);
			$p.pos.left = $pos.X;
			$p.pos.top = $pos.Y;
			monitorNewMessage($p.post);
			$p.post.style.left = $p.pos.left +'px';
			$p.post.style.top = $p.pos.top +'px';
			delayedLayout();
		}
		
		// reset posts' position
		function resetPostPosition($var) {
			var p;
			if (!$var)
				return;
			else if (typeof $var==='string')
				p = $$data.posts[$var];
			else
				p = $$data.posts[$var.getAttribute('id')];
			p.select(false);
			css.remove(this.post, '<postSelected>');
			// unlock the post
			p.lock(false);
			p.post.style.left = "";
			if (p.fold()) {
				setTimeout(function () {
					// expand post
					p.fold(false);
					delayedLayout();
				}, 1800);
			}
			_monitorNewMessage(p.post);
			delayedLayout();
		}
		
		// float locked posts on the screen
		$K.window.onResize(
			function () {
				$K.each($$data.index.locked,
					function () {
						var maxOffsetX = window.innerWidth - this.post.offsetWidth * 1.5;
						if (maxOffsetX - css.getPiexls(this.post.style.left) < 0)
							this.post.style.left = maxOffsetX +"px";
					}
				);
			}
		);
		
		// re-layout the bricks
		function replaceBricks($brickPara, $opt) {
			var bricks = css.selectAll('<post>'),
				brickAmount = bricks.length,
				NO_BOXSHADOW = 'rgba(0, 0, 0, 0)',
				$opt = $opt || {},
				ignoreColumn = ($brickPara.brickColumn != currentColumn),
				needUpdateColumn = $opt.operation == LAYOUT_OPERATION_UPDATE_COLUMN,
				tops = [], needUpdate = [];
				
			currentColumn = $brickPara.brickColumn;
			
			// inset a element into a column
			function insertBrickInto($id, $elem, $column) {
			//$K.debug($elem);
				if (!$elem)
					return;
				if (!$$data.other[$id])
					$$data.other[$id] = {
						top : null,
						column : -1
					};
				var dat = $$data.other[$id], height = $elem.offsetHeight;
				if ($column != dat.column) {
					if (dat.column > -1)
						needUpdate[dat.column] = true;
					dat.column = $column;
					needUpdate[$column] = true;
				}
				if (dat.top != tops[$column]) {
					needUpdate[$column] = true;
					dat.top = tops[$column];
				}
				if (needUpdate[$column] || $elem.style.top=="")
					$elem.style.top = tops[$column]+'px';
				tops[$column] += height + paddingV;
			}
			
			for (var i=0; i<currentColumn; i++) {
				tops.push(0);	// default top
				needUpdate.push((needUpdateColumn && i== $opt.value) || ignoreColumn);	// if current column need to be updated
			}
			
			// take the sharebox as the first brick
			insertBrickInto('shareBoxContainer', css.select('<shareBoxContainer>'), 0);
			insertBrickInto('joinTheCommunityBlock', css.select('<joinTheCommunityBlock>'), 0);
			insertBrickInto('communityInviteFriendsBlock', css.select('<communityInviteFriendsBlock>'), 0);
			insertBrickInto('notEnoughPostsInYourStream', css.select('<notEnoughPostsInYourStream>'), 0);
			insertBrickInto('matchedPerson', css.select('<matchedPerson>'), 0);
			insertBrickInto('searchFilter', css.select('<searchFilter>'), 0);
			insertBrickInto('myGames', css.select('<myGames>'), 0);
			insertBrickInto('gameStream', css.select('<gameStream>'), 0);
			insertBrickInto('addFriendsBox', css.select('<addFriendsBox>'), 0);

			for (var i=0, curCol; i<brickAmount;i++) {
				// deliver post balancely
				curCol = (Math.max(brickAmount-1, 0)+i) % currentColumn;	// current brick's column
				//curCol = $K.utils.getMinIndex(tops, exceptionColumns);
				var postId = bricks[i].getAttribute("id"),
					postHeight = bricks[i].offsetHeight,
					needReloadPost = !bricks[i].hasAttribute(COLUMN_ATTR);
				if (postHeight < deletedPostHeight)	// post not ready yet 
					continue;
				if (!$$data.posts[postId] || bricks[i].style.top=="") {	// init
					needUpdate[curCol] = true;
					$$data.posts[postId] = {
						id : postId,
						column : curCol,
						pos : {
							top : 0,	// relative
							left : 0
						},
						lock : function ($act) {
							if (typeof $act !="boolean")
								return !!$$data.index.locked[this.id];
							if ($act) {
								css.add(this.post, '<postLocked>');
								$$data.index.locked[this.id] = this;
							}
							else {
								css.remove(this.post, '<postLocked>');
								delete $$data.index.locked[this.id];
							}
						},
						select : (function () {
							var _selected = false;
							return function ($act) {
								if (typeof $act !="boolean")
									return _selected;
								_selected = $act;
							};
						})(),
						fold : function ($act) {
							if (typeof $act !="boolean")
								return !!$$data.index.folded[this.id];
							if ($act) {
								css.add(this.post, '<postFolded>');
								$$data.index.folded[this.id] = this;
							}
							else {
								css.remove(this.post, '<postFolded>');
								delete $$data.index.folded[this.id];
							}
						},
						post : bricks[i],
						toString : function () {
							return this.id;
						}
					};
				}
				else if (!ignoreColumn && !needReloadPost)
					curCol = $$data.posts[postId].column;
				else
					$$data.posts[postId].column = curCol;
				var p = $$data.posts[postId];	// reference
				if (css.is(bricks[i], '<postSelected>')) {
					// Google+ will select the first post by default now, 2/26/2013
					if (!bricks[i].hasAttribute(COLUMN_ATTR))
						css.remove(bricks[i], '<postSelected>');	// unselect it then
					else {
						var shadowValue = getComputedStyle(bricks[i]).getPropertyValue('box-shadow') || NO_BOXSHADOW;
						p.select(shadowValue.indexOf(NO_BOXSHADOW) < 0);
					}
				}
				else
					p.select(false);
				if (!p.lock() && !p.select() && p.pos.top != tops[curCol]) {
					needUpdate[curCol] = true;
					p.pos.top = tops[curCol];
				}
				// do not move the selected / locked post
				if (!p.lock() && !p.select()) {
					if (ignoreColumn || needReloadPost)
						bricks[i].setAttribute(COLUMN_ATTR, curCol);	// update column information
					if (needUpdate[curCol])	// when the post is selected before, but not selected any more
						bricks[i].style.top = tops[curCol]+'px';
				}
				if (!p.lock())
					tops[curCol] += postHeight + paddingV;
			}
			return Math.max.apply(Math, tops);	// return total height
		}
		
		var layout = (function () {
			var maxHeight = 0;
			return function ($opt) {
				//$K.debug('G++ Pinterest: Re-layout at '+ new Date().getTime());
				var brickPara = loadBrickCSS(window.innerWidth),
					height = replaceBricks(brickPara, $opt),
					moreButtonContainer = css.selectAll('<streamMoreButtonContainer>'),
					contentPane = css.select('<contentPane>'),
					mainContent = css.select('<mainContent>');
				// 'more' button
				if (moreButtonContainer && maxHeight != height) {
					maxHeight = height;
					$K.each(
						moreButtonContainer,
						function () {
							this.style.marginTop = height+'px';
						}
					);
					mainContent.style.minHeight = contentPane.style.minHeight = (height + 200)+'px';
				}
			};
		})();
		
		var timingLayout = $K.tickTork(layout, { interval : 2300, check: 5000 });
		var delayedLayout = $K.tickTork(layout, { delay: 2000 });
		
		function _init() {
			$K.debug("Layout+ Pinterest is now loaded.");
			_init_CSS();
			$K.url.onUrlChange(
				function () {
					// reload style
					timingLayout();
					// reload all posts
					$$data.index.locked={};
					$K.listen(css.get('<streamContainer>, <shareBox>'), 'DOMSubtreeModified',  timingLayout, { init: true });
					$K.listen(css.get('<streamContainer>'), 'click', foldAndLockMouseDispatcher);
				}, true
			);
			$K.window.onResize(timingLayout);
		}
		return {
			"init" : _init
		};
	})();

	$K.debug("Layout+ is now loaded.  Current URL "+ $K.url);
	
	// cancel a bunch of action
	$K.url.onUrlChange(function () {
		if (css.select('<blackNavigationBar>')) {
			$K.listen(css.get('<blackNavigationBar>'), 'mouseover', function () {
				css.enable(DISPLAY_CIRCLE_INFO);
			});
			css.enable(BLACK_NAVIGATION_EXIST);
		}
		else
			css.disable(BLACK_NAVIGATION_EXIST);
	}, true );

	$K.listen('#content', 'click', function () {
		css.disable(DISPLAY_CIRCLE_INFO);
	});

	var Theme = GPinterest;
	//var Theme = GTimeline;

	Theme.init();
	
})(document);