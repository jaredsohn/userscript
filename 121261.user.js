// ==UserScript==
// @name 			Straight Google
// @id				straight_google_pokerface
// @version			1.17.13
// @author			Pokerface - Kevin
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
	var DEBUG_ON = 0;

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
			var lastRunTime = 0, instances = [], isRunning = 0, checkInterval = null;
			var res = function () {
				if (opt.check > 0 && checkInterval==null)
					checkInterval = setInterval(res, opt.check);
				var timeRemain = (new Date().getTime()) - lastRunTime;
				var _this = this, args = utils.toArray(arguments);
				// the real function
				function runFunc() {
					lastRunTime = new Date().getTime();
					isRunning = 1;
					$func.apply(_this, args);
					isRunning = 0;
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
				language: $n['language'] || $n['userLanguage'] || '',
				toString : function () {
					return this.name;
				}
			};
		  
		for (var i = 0, match=null; i < rBrowsers.length; ++i)
			if ( match = rBrowsers[i].exec(navigatorString) ) {
				// match safari 
				ret.name = (i==0 ? match[2] : match[1]) || 'unknown';
				ret.version = (i==0 ? match[1] : match[2]) || 'unknown';
				ret[ret.name] = 1;
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
             var scrollX = 0, scrollY = 0;
             for (var i = 0; i < elems.length; i++) {
                 var o = elems[i];
                 // test horizontal
                 var sl = o.scrollLeft;
                 o.scrollLeft += (sl > 0) ? -1 : 1;
                 o.scrollLeft !== sl && (scrollX = scrollX || 1);
                 o.scrollLeft = sl;
                 // test vertical
                 var st = o.scrollTop;
                 o.scrollTop += (st > 0) ? -1 : 1;
                 o.scrollTop !== st && (scrollY = scrollY || 1);
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
		});
		
		window.addEventListener('scroll', function () {
			each(scrollTasks);
		});

		// return 1 when unsafeWindow is loaded successfully
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
			for (var i=1, width = window.outerWidth, match=0; !match; i++) {
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
						css_enabled[obj.name] = obj.value || 1;
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
					return 0;
				$className = utils.trimS(this.get($className).replace(/\./g, ' '));
				var arr = $className.split(' '), clazz = " "+$elem.className+" ";
				for (var i=0; i<arr.length; i++)
					if (clazz.indexOf(' '+ arr[i] +' ', ' ') < 0)
						return 0;
				return 1;
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
						var obj = (typeof $item=="string") ? { name: $item, blooeanVal: 1 } : $item;
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
				return 1;
			}
			else
				return 0;
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
		});
		// hashchange
		window.addEventListener('hashchange', function (e) {
			execTask(e);
		});
		
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
				_support[$event] = 1;
				e.removeEventListener($event, fn);
			});
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
			// $event & $init cannot be 0 at the same time
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
								$f.apply($d, utils.toArray(arguments), 0);
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
						if (!_support["DOMSubtreeModified"]) {
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
							else	{	// do nothing
							}
						}
					}
				}
			})($selector, $event, $func, $options);
			// check it later
			interval_count.push(setInterval(evt_listener, 500));
		};
		
		return func;
	})();
	
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
			e.initMouseEvent("mousedown", 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, opt.button, null);
			$elem.dispatchEvent(e);
			
			e = $$d.createEvent("MouseEvents");
			e.initMouseEvent("mouseup", 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, opt.button, null);
			$elem.dispatchEvent(e);
			
			e = $$d.createEvent("MouseEvents");
			e.initMouseEvent("click", 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, opt.button, null);
			$elem.dispatchEvent(e);
		}
		return {
			"click" : click
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
		"mouse" : mouse,
		"browser" : $$browser,
		"window" :  $$w,
		"select" : function (e) { return $$css.select(e) },
		"selectAll" : function (e) { return $$css.selectAll(e) },
		"tickTork" : setFunctionTiming,
		"utils" : utils,
		"debug" : _debug,
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
						$K.debug('Straight Google : shorten URL expanded ['+ obj["longUrl"] +']');
						// call back
						url_cache[$u] = obj["longUrl"];
						$f(obj["longUrl"]);
					};
				})($url, $callback),
				onerror : function (res) {
					$K.debug('Straight Google : fail to expand shorten URL ['+ res["finalUrl"] +']');
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
		$K.listen('a[href*="/url?"], a[href*="/aclk?"]', null, google_url_clean, { init : 1 });	// this applys for static pages
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
				// keyword: "/url?sa=z&n="
				// kill the redirection function directly
				$K.window.onReady(
					"lAa",
					function ($w) {
						if ((''+$w["lAa"]).indexOf('/url?sa=')>-1) {
							$K.debug('Injection for Google Plus succeeds!');
							$w["lAa"] = function () { };
						}
						else {
							$K.debug('Injection for Google Plus fails');
						}
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
				{ init: 1 }
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
						if (!$var["loadVPage"])
							return;
						// select parent window's elements
						$K.listen($var.document.querySelectorAll(match_pattern), null, google_url_clean, { init : 1 });
					}
				);
			else
				$K.listen(match_pattern, null, google_url_clean, { init : 1 });
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
					try {
						if ((''+$w._.Tj.G().J).indexOf('/url?sa=')>-1) {
							$w._.Tj.G().J = function () { };
						}
						/* keyword
							for (var b = [(0, _.H)("irc_fn"), (0, _.H)("irc_fsl"), (0, _.H)("irc_hol"), (0, _.H)("irc_itl"), (0, _.H)("irc_ifl"), (0, _.H)("irc_kl"), (0, _.CP)().va("irc_mil"), (0, _.H)("irc_vpl")], c = 0; c < b.length; ++c) b[c] && (b[c].onmousedown = (0, _.hna)(a, b[c]), a.X.listen(b[c], "keydown", (0, _.ib)(function(a, b) {
								if (13 == (new _.yg(b)).keyCode && a.onmousedown) a.onmousedown(b)
							},
						 */
						if ((''+ $w._.PR).indexOf('irc_fsl')>-1 && (''+ $w._.PR).indexOf('irc_hol')>-1 && (''+ $w._.PR).indexOf('irc_tas')>-1) {
							$w._.PR = function () {};	// reset the redirection function
						}
					}
					catch (e) {
						$K.debug('Fail to inject!');
					}
				},
				{
					test: function (w) {
						// if Google Image script is initialized
						return !!w['_'] && !!w._.PR && !!w._.Tj;
					}
				}
			);
		}
		// Google Shopping
		else if (/:\/\/www\.google\.com\/(products\/catalog\?|shopping\/product\/|prdhp).*/.test($K.url)) {
			$K.debug('Straight Google [Shopping] is now loaded');
			$K.listen(
				"#os-sellers-content",
				"DOMSubtreeModified",
				common_clean_job,
				{init:1}
			);
			// Show All # function
			if (/\/products\/catalog\?/.test($K.url))
				$K.window.onReady('showPlusBox', 
					(function () {
					var originFunc = null;
					return function ($w, $var) {
						originFunc = $var;
						$w["showPlusBox"] = function () {
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
					try {
						// kill the redirection function
						$w.google["search"].Z.Yi = function () {};
						// or redirect the track Url to origin Url
						//$w.google["search"].Z.Hi = $w.google["search"].Z.Zi;
					}
					catch (e) {}
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
			
			// do a deep clean, kill the redirection function, which rwt points to
			$K.window.onReady(
				'_',
				function ($w) {
					try {
						// keyword: 'rwt'
						if ((''+$w._.Tj.G().J).indexOf('/url?sa=')>-1) {
							$w._.Tj.G().J = function ($_self) {
								$_self.removeAttribute('onmousedown');
							};
						}
					}
					catch (e) {
						$K.debug('Fail to inject!');
					}
				},
				{
					test : function (w) {
						return !!w['_'] && !!w['_'].Tj;
					}
				}
			);
			// for Google Instant
			$K.url.onHashChange(search_clean, 1);
			// be cool with AutoPager & lazy-load content
			setTimeout(search_clean, 200);
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