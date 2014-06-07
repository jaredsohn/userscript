// ==UserScript==
// @name        qqregister
// @namespace   qqregister
// @include     http://zc.qq.com/chs/index.html
// @include     http://zc.qq.com/chs/decimal_ok.html
// @version     1
// ==/UserScript==
// firefox浏览器jquery支持
if (unsafeWindow.jQuery) {
	jQuery = yeedomliu = unsafeWindow.jQuery;
	addPlugin();
} else {
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://appmedia.qq.com/media/mengniucny/jquery-1.3.2.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	function GM_wait() {
		if (typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait, 100);
		} else {
			jQuery = yeedomliu = unsafeWindow.jQuery;
			addPlugin();
		}
	}
	GM_wait();
}
function addPlugin() {
	var $util = {
		click : function(name) {
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			if ('string' == typeof name) {
				document.getElementById(name).dispatchEvent(evt);
			} else if ('object' == typeof name) {
				name.dispatchEvent(evt);
			}
		},
		log : function(argument) {
			GM_log(argument);
		},
		xpath : function xpath(query) {
			return document.evaluate(query, document, null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		},
		request : function(url, callback, data, method) {
			method = method || 'POST';
			if ('POST' == method) {
				headers = {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With' : 'XMLHttpRequest',
				};
			} else {
				headers = {
					'X-Requested-With' : 'XMLHttpRequest',
				};
			}
			GM_xmlhttpRequest({
				'method' : method,
				'url' : url,
				'data' : data,
				'onload' : function(responseDetails) {
					callback(responseDetails);
				},
				'headers' : headers
			});
		},
		open : function(url) {
			GM_openInTab(url);
		},
		createElem : function(name, attrs) {
			var node_name;
			var node = document.createElement(name);
			for (node_name in attrs) {
				if (attrs.hasOwnProperty(node_name)) {
					node.setAttribute(node_name, attrs[node_name]);
				}
			}
			return node;
		},
		insertBefore : function(before, after) {
			return after.parentNode.insertBefore(before, after);
		},
		insertAfter : function(before, after) {
			return after.parentNode.insertBefore(before, after.nextSibling);
		},
		remove : function(elem) {
			var _elem = document.getElementById(elem);
			if (_elem) {
				_elem.parentNode.removeChild(_elem);
			}
		},
		addHandler : function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		getEvent : function(event) {
			// 取得事件对象
			return event ? event : window.event;
		},
		getTarget : function(event) {
			// 取得事件目标对象
			return event.target ? event.target : event.srcElement;
		},
		fireAEvent : function(ele, type) {
			// 调用事件，通过GM很难调用原页面的函数，最好只从Element的事件方向处理
			var evt = document.createEvent("Event");
			evt.initEvent(type, true, false);
			ele.dispatchEvent(evt);
		},
		isMatchUrl : function(url, logic_url) {
			return url.substr(0, logic_url.length) == logic_url ? true : false;
		}
	};

	function change_value(id, value) {
		document.getElementById(id).value = value;
	}

	var url = window.location.href;
	var register_url = 'http://zc.qq.com/chs/index.html';
	
	if ($util.isMatchUrl(url, 'http://zc.qq.com/chs/decimal_ok.html')) {
		setTimeout(function() {
			if (yeedomliu('#defaultUin').html()) {
				yeedomliu('.pay_btn_confirm').click();
			} else {
				yeedomliu.get('http://useserver.act.qq.com/tool/registerqq?qq=' + yeedomliu('#newUin').html());
			}
			setTimeout(function() {
				window.location.href = register_url;
				return;
			}, 100);
		}, 100);
	}
	
	if ($util.isMatchUrl(url, register_url)) {
		setTimeout(function() {
			yeedomliu('#nick').val('tiger').blur();
			yeedomliu('#password').focus().val('helloworld').blur();
			yeedomliu('#password_again').focus().val('helloworld').blur();
			yeedomliu('#sex_1').focus().click();
			yeedomliu('#year_value').val('1993年').focus();
			setTimeout(function() {
				yeedomliu('#month_value').val('1月').focus();
				setTimeout(function() {
					yeedomliu('#day_value').focus().val('2日');
					setTimeout(function() {
						yeedomliu('#country_value').val('中国').focus();
						setTimeout(function() {
							yeedomliu('#province_value').val('北京').focus();
							setTimeout(function() {
								yeedomliu('#city_value').val('东城').focus();
								setTimeout(function() {
									yeedomliu('#code').focus().keyup(function() {
										var th = yeedomliu(this);
										var text = th.val();
										if (text.length == 4) {
											yeedomliu('#submit').click();
										}
									});
								}, 100);
							}, 100);
						}, 100);
					}, 100);
				}, 100);
			}, 100);
		}, 100);
		

	}
}