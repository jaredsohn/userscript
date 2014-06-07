// ==UserScript==
// @name 			Straight Google
// @id				straight_google_pokerface
// @version			1.17.3
// @author			Pokerface - ALI
// @namespace	  	in.co.tossing.toolkit.google
// @description		Remove URL redirection from google products
// @license			GPL v3 or later version
// @downloadURL		https://userscripts.org/scripts/source/121261.user.js
// @updateURL		https://userscripts.org/scripts/source/121261.meta.js
// @run-at			document-end

// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest

// @include		*://www.google.*/*q=*
// @include		*://www.google.*/*tbs=*
// @include		*://www.google.*/search?*
// @include		*://www.google.*/webhp?*
// @include		*://www.google.*/cse?*
// @include		*://www.google.*/?*
// @include		*://www.google.*/#*
// @include		*://www.google.*/
// @include		*://encrypted.google.*
// @include		*://ipv6.google.*
// @include		*://www.google.*/news*
// @include		*://news.google.*/*
// @include		*://plus.google.com/_/scs/apps-static/_/js/*
// @include		*://images.google.com/*
// @include		*://docs.google.com/*
// @include		*://maps.google.com/*
// @include		*://www.google.com/maps*
// @include		*://ditu.google.com/*
// @include		*://www.youtube.*
// @include		*://groups.google.com/group/*
// @include		*://www.google.com/bookmarks/*
// @include		*://history.google.com/bookmarks/*
// @include		*://www.google.com/history/*
// @include		*://www.google.com/prdhp*
// @include		*://www.google.com/products/catalog?*
// @include		*://www.google.com/shopping/product/*
// @include		*://mail.google.com/* 
// @include		*://www.google.com/mail*
// @include		*://play.google.com/store*

// @exclude		*://www.google.com/reader/*
// ==/UserScript==

/*
    Straight Google (also named as Straight Search)
    Kevin Wang (kevixw'At'gmail.com)
    Copyright (c) 2013 . All rights reserved.
	
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
	})(window.navigator);
	
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
				e = $$d.querySelector("body") || $$d.body || $$d.documentElement;
			e.appendChild(test);
			e.removeChild(test);
		}
		
		// do dom event support test now -> Opear does not support DOMSubtreeModified
		try {
			doTest();
		}
		catch (e) {
			_debug("DOMSubtreeModified test failed.  Something is wrong");
		}
		
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

// main function
var StraightGoogle = (function ($$d) {
	
	// expand goo.gl shorten url
	var expand_short_url = (function () {
		var url_cache = {};
		var GOOGLE_SHORTEN_URL_REG = /^(?:https?:\/\/)?goo\.gl\/(\w+)$/i;
		var GOOGLE_SHORTEN_URL_API = "https://www.googleapis.com/urlshortener/v1/url?shortUrl={$url}";
		return function ($url, $callback) {
			var match = GOOGLE_SHORTEN_URL_REG.exec($url);
			if (!match)
				return;
			var key = match[1];
			if (url_cache[key])
				return $f(url_cache[key]);
			// query Google Shorten URL API
			$K.debug('Straight Google : trying to expand shorten URL ['+ $url +']');
			$url = /^https?:\/\//.test($url) ? $url : 'http://'+ $url;
			$K.httpRequest.send({
				method : 'GET',
				url : GOOGLE_SHORTEN_URL_API.replace('{$url}', $url),
				onload : (function ($u, $f) {
					return function (res) {
						try {
							eval('var obj = '+ res.responseText);
						} catch (e) {
							return;
						}
						if (obj.status != "OK")
							return;
						$K.debug('Straight Google : shorten URL expanded ['+ obj.longUrl +']');
						// call back
						url_cache[$u] = obj.longUrl;
						$f(obj.longUrl);
					};
				})($url, $callback),
				onerror : function (res) {
					$K.debug('Straight Google : fail to expand shorten URL ['+ res.finalUrl +']');
				}
			});
		};
	})()
	
	// fetch Google Redirection Traget
	function get_google_url($url, $urlType) {
		if (!$url)
			return;
		var google_url_reg = [], mat = null, res;
		// for Google Image Redirection
		switch ($urlType) {
			case 1 : // image reference url
				google_url_reg.push(/^(?:https?:\/\/[-\w\d.]+\.google\.\w[\w.]*\w(?:\/\w+)*)?\/imgres\?(?:(?!imgrefurl)\w+=[^&]*&)*(?:imgrefurl)=((?:https?(?::\/\/|%3A%2F%2F))?[^&]+).*$/i);
				break;
			case 2 : // match imgurl only ( Google Image )
				google_url_reg.push(/^(?:https?:\/\/[-\w\d.]+\.google\.\w[\w.]*\w(?:\/\w+)*)?\/imgres\?(?:(?!imgurl)\w+=[^&]*&)*imgurl=((?:https?(?::\/\/|%3A%2F%2F))?[^&]+).*$/i);
				break;
			default :
				google_url_reg.push(/^(?:https?:\/\/[-\w\d.]+\.google\.\w[\w.]*\w(?:\/\w+)*)?\/(?:(?:local_)?url|imgres|aclk)\?(?:(?!url|imgurl|adurl)\w+=[^&]*&)*(?:url|imgurl|adurl)=((?:https?(?::\/\/|%3A%2F%2F))?[^&]+).*$/i);
				google_url_reg.push(/^(?:https?:\/\/[-\w\d.]+\.google\.\w[\w.]*\w(?:\/\w+)*)?\/(?:(?:local_)?url|imgres|aclk)\?(?:(?!q)\w+=[^&]*&)*(?:q)=((?:https?(?::\/\/|%3A%2F%2F))?[^&]+).*$/i);
		}
		for (var i=0;i<google_url_reg.length;i++) {
			mat = mat || $url.match(google_url_reg[i]);
			res = mat ? unescape(mat[1] || '') : '';
			if (/^(https?:\/\/)?[a-zA-Z\.\-&:0-9]+\.[a-zA-Z0-9\-]/i.test(res))
				break;
		}
		// fix http://
		if (res && !/^https?:\/\//.test(res))
			res = "http://"+ res;	// default http
		return res;
	}
	
	function google_url_clean($urlType) {
		var url = get_google_url(this.href, $urlType);
		if (url) {
			this.href = url;
			$K.debug('Redirection of ['+ url +'] is now removed.');
		}
		do_not_track.call(this);
		// try to expand shorten url
		expand_short_url(url || this.href, (function (obj) {
			return function (url) {
				if (obj) obj.href = url;
			};
		})(this));
		return url || '';
	}
	
	function common_clean_job() {
		$K.listen('a[href*="/url?"], a[href*="/aclk?"]', null, google_url_clean, { init : true });	// this applys for static pages
	}
	
	function do_not_track() {
		// add no follow
		if (!this.getAttribute("rel")) this.setAttribute("rel", "noreferrer");
	}

	// Main part begin ========================================
	function _start() {
		// prevent Google Plus redirection : plus.url.google.com
		if (/:\/\/plus\.google\.com\/.*$/.test($K.url)) {
			// this the main js which causes the redirection
			if (/\/_\/scs\/apps-static\/_\/js\//.test($K.url)) {
				$K.debug('Straight Google [Plus] is now loaded');
				// kill the redirection function directly
				$K.window.onReady("lAa",
					function ($w, $var) {
						$w.lAa = function (a, b) {
							$K.debug("Redirection of ["+ b +"] is prevented.");
							return b; 
						};
					}
				);
			}
		}
		// Google News
		else if (/:\/\/news\.google\.[\w.]+\w\/.*$/.test($K.url) || /:\/\/www\.google\.[\w.]+\w\/news\/.*$/.test($K.url)) {
			$K.debug('Straight Google [News] is now loaded');
			$K.listen(
				'.blended-section',
				"DOMNodeInserted", 
				function () {
					$K.each(
						$K.selectAll('a.article[url]:not(._tracked)'),
						function () {
							// fix link to its normal url
							this.href = this.getAttribute('url');
							do_not_track.call(this);
							$K.debug("Redirection of ["+ this.href +"] is now removed.");
							// cheat google and say "it has been tracked already"
							$K.css.add(this,' _tracked');
						}
					);
				},
				{ init: true }
			);
		}
		// Google Docs
		else if (/:\/\/docs\.google\.com\/.+/.test($K.url)) {
			$K.debug('Straight Google [Docs] is now loaded');
			// Spread Sheet
			if (/docs\.google\.com\/spreadsheet\/.+/.test($K.url))
				$K.listen(
					'a.docs-bubble-link[target="_blank"]',
					'mouseover',
					google_url_clean
				);
			// Other products
			else if (/docs\.google\.com\/(document|presentation|drawings)\/.+/.test($K.url))
				$K.listen(
					'.docs-bubble a[target="_blank"]',
					'mouseover',
					google_url_clean
				);
		}
		// Google Maps
		else if (/:\/\/(ditu|maps)\.google\.com\/.*$/.test($K.url) || /:\/\/www\.google\.com\/maps((\?|\/).*)?$/.test($K.url)) {
			$K.debug('Straight Google [Maps] is now loaded');
			var match_pattern = '#resultspanel a[href*="/local_url?"]';
			// inject as a local function when output is js
			if (/output=js/.test($K.url))
				$K.window.onReady('w',
					function ($w, $var) {
						if (!$var.loadVPage)
							return;
						// select parent window's elements
						$K.listen($var.document.querySelectorAll(match_pattern), null, google_url_clean, { init : true });
					}
				);
			else
				$K.listen(match_pattern, null, google_url_clean, { init : true });
		}
		// Google Groups
		else if (/:\/\/groups\.google\.com\/(forum|group)\/.+/.test($K.url)) {
			$K.debug('Straight Google [Groups] is now loaded');
			// for old Google Groups template
			if (/groups\.google\.com\/group\/.+/.test($K.url))
				common_clean_job();
		}
		// Google Bookmarks
		else if (/:\/\/(www|history)\.google\.com\/bookmarks\/.*$/.test($K.url)) {
			$K.debug('Straight Google [Bookmarks] is now loaded');
			$K.each(
				$K.selectAll('.result a[id^="bkmk_href_"]'),
				google_url_clean
			);
		}
		// Google Web History
		else if (/:\/\/(www|history)\.google\.com\/history\/.*$/.test($K.url)) {
			$K.debug('Straight Google [Web History] is now loaded');
			common_clean_job();
		}
		// Google Mail 
		else if (/:\/\/(www|mail)\.google\.com\/mail\/.*$/.test($K.url)) { 
			$K.debug('Straight Google [Mail] is now loaded'); 
			common_clean_job(); 
		}
		// Google Play 
		else if (/:\/\/(www|play)\.google\.com\/store\/.*$/.test($K.url)) { 
			$K.debug('Straight Google [Play] is now loaded'); 
			common_clean_job();
		}
		// Google Image Search
		else if (/:\/\/(www|encrypted|ipv6)\.google\.[\w.]+\w\/(imghp\?.+|search(\?|#)(.+&)*tbm=isch(&.+)*)$/.test($K.url)) {
			$K.debug('Straight Google [Image] is now loaded');			
			$K.window.onReady(
				'_',
				function ($w) {
					$w._.TP = function () {};	// reset the redirection function
					$w._.tj.H().L = function () {};	// the redirection URL generator function
				},
				{
					test: function (w) {
						// if Google Image script is initialized
						return w['_'] && w['_'].TP;
					}
				}
			);
			// Note: content of QP
			/*
		    _.QP = function(a) {
				a.X.removeAll();
				for (var b = [(0, _.H)("irc_fn"), (0, _.H)("irc_fsl"), (0, _.H)("irc_hol"), (0, _.H)("irc_itl"), (0, _.H)("irc_ifl"), (0, _.H)("irc_kl"), (0, _.CP)().va("irc_mil"), (0, _.H)("irc_vpl")], c = 0; c < b.length; ++c) b[c] && (b[c].onmousedown = (0, _.hna)(a, b[c]), a.X.listen(b[c], "keydown", (0, _.ib)(function(a, b) {
					if (13 == (new _.yg(b)).keyCode && a.onmousedown) a.onmousedown(b)
				},
				b[c])), a.X.listen(b[c], "click", (0, _.ib)(a.DX, b[c])))
			};
			_.ona = function(a, b) {
				if (!b) return _.m;
				var c = (0, _.rg)(b, "ved") || "",
				d = _.rna,
				e = (0, _.wP)((0, _.HP)(a.D, a.D.nb())),
				f = "docid=" + (0, _.xP)(e, 1) + "&tbnid=" + (0, _.xP)(e, 0);
				return function(a) {
					return _.tj.H().L(b, "", f, "", "", "", "", c, window.google.authuser, d, a)
				}
			};
			*/
		}
		// Google Shopping
		else if (/:\/\/www\.google\.com\/(products\/catalog\?|shopping\/product\/|prdhp).*/.test($K.url)) {
			$K.debug('Straight Google [Shopping] is now loaded');
			$K.listen(
				"#os-sellers-content",
				"DOMSubtreeModified",
				common_clean_job,
				{init:true}
			);
			// Show All # function
			if (/\/products\/catalog\?/.test($K.url))
				$K.window.onReady('showPlusBox', 
					(function () {
					var originFunc = null;
					return function ($w, $var) {
						originFunc = $var;
						$w.showPlusBox = function () {
							originFunc.apply(this, $K.utils.toArray(arguments));
							common_clean_job();
						}
					};
					})()
				);
		}
		// Google Web Search (iframed)
		else if (/:\/\/(www|encrypted|ipv6)\.google\.[\w.]+\w\/cse\?.+/.test($K.url)) {
			$K.debug('Straight Google [iFramed Web Search] is now loaded');

			$K.window.onReady(
				'google',
				function ($w) {
					// kill the redirection function
					$w.google["search"].Z.Yi = function () {};
					// or redirect the track Url to origin Url
					//$w.google["search"].Z.Hi = $w.google["search"].Z.Zi;
				}
			);
		}
		// Google Web Search
		else if (/:\/\/(www|encrypted|ipv6)\.google\.[\w.]+\w\/(search|webhp\?.+|(search|webhp)?(\?|#)(.+&)*(q|tbs|as_q)=.+)?$/.test($K.url)) {
			$K.debug('Straight Google [Web Search] is now loaded');
			var refUrl = 'ori-url', isCleanLink = "is-clean-link";
			function img_search_clean() {
				// for Image links
				var cur_expanded = $K.select('#rg_h[data-initialized="1"]');
				if (!cur_expanded)
					return;
				var span = cur_expanded.querySelector('.rg_hr span#rg_hr');
				var rg_hta = cur_expanded.querySelector('#rg_ht a#rg_hta');
				var clean_href = rg_hta.href;
				var rg_l = $K.select('#ires a.rg_l[href="'+ clean_href +'"]['+ refUrl +']');
				if (!clean_href || !rg_l)
					return;
				var ref_url = rg_l.getAttribute(refUrl);
				rg_hta.href = get_google_url(ref_url, 1);
			}
			function img_url_clean() {
				// before expanding
				$K.each(
					$K.selectAll('#ires a[href*="/imgres?"]:not(['+isCleanLink+'])'),
					function () {
						this.setAttribute(refUrl, this.href);	// straight google - url
						google_url_clean.call(this, 2);
					}
				);
			}
			function search_clean() {
				// image redirection
				common_clean_job();
				img_url_clean();
				$K.each(
					$$d.querySelectorAll('a[href][onmousedown]'),
					function () {
						if (this.removeAttribute)
							this.removeAttribute('onmousedown');
					}
				);
			}
			
			// do a deep clean, kill the rwt function
			$K.window.onReady(
				'rwt',
				function ($w) {
					$w.rwt = function ($_self) {
						google_url_clean.call($_self);
						$_self.removeAttribute('onmousedown');
						return true;
					};
				},
				{
					test : function (w) {
						return /google/i.test(''+ w['rwt']);
					}
				}
			);
			
			// for image entries in the result, kill _.Cq() , which is the redirection function as well
			$K.window.onReady(
				'_',
				function ($w) {
					$w._.Cq = function () {};
				},
				{
					test : function (w) {
						return !!w['_'] && !!w['_'].Cq;
					}
				}
			);
			// for Google Instant
			$K.url.onHashChange(search_clean, true);
			// be cool with AutoPager & lazy-load content
			setTimeout(search_clean, 1000);
		}
		// for Youtube
		else if (/:\/\/(\w+\.)*youtube\.com\//.test($K.url)) {
			$K.debug('Straight Google [Youtube] is now loaded');
			var YOUTUBE_REDIRECT_CLASS = '.yt-uix-redirect-link';
			$K.each(
				$K.selectAll(YOUTUBE_REDIRECT_CLASS),
				function () {
					$K.css.remove(this, YOUTUBE_REDIRECT_CLASS);
					$K.debug("Redirection of link ["+ this.href +"] is now removed.");
				}
			);
		}
	}

	return {
		start : _start
	};
})(document);

$K.debug('Straight Google is enabled in current URL ['+ $K.url +'].');
StraightGoogle.start();
