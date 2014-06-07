// ==UserScript==
// @name           Onlinedown.No.Ads
// @namespace      Onlinedown.No.Ads
// @description    Onlinedown.No.Ads
// @version        2.01
// @match          http://*.onlinedown.net/softdown/*
// @match          http://*.newhua.com/softdown/*
// ==/UserScript==
(function () {
	'use strict';
	var UTILS = {
		isArrayLike: function (obj) {
			if (typeof obj !== 'object') {
				return false;
			}
			var types = ['Array', 'NodeList', 'HTMLCollection'];
			for (var i = 0; i < types.length; ++i) {
				if (Object.prototype.toString.call(obj).indexOf(types[i]) !== -1) {
					return true;
				}
			}
			return false;
		},
		forEach: function (arr, callback) {
			if ((typeof arr === 'object') && UTILS.isArrayLike(arr) && UTILS.isFunction(callback)) {
				for (var i = 0; i < arr.length; ++i) {
					callback.call(arr[i], arr[i]);
				}
				return;
			}
			if((typeof arr === 'string') && UTILS.isFunction(callback)){
				arr = document.querySelectorAll(arr);
				UTILS.forEach(arr,callback);
			}
		},
		remove: function (dom) {
			if (typeof dom === 'string') {
				UTILS.remove(document.querySelectorAll(dom));
				return;
			}
			if ((typeof dom === 'object') && UTILS.isArrayLike(dom)) {
				UTILS.forEach(dom, function () {
					UTILS.remove(this);
				});
				return;
			}
			if (dom && dom.parentNode && dom.parentNode.removeChild) {
				dom.parentNode.removeChild(dom);
			}
		},
		die: function (dom,arr) {
			if (typeof dom === 'string') {
				UTILS.die(document.querySelectorAll(dom),arr);
				return;
			}
			if ((typeof dom === 'object') && UTILS.isArrayLike(dom)) {
				UTILS.forEach(dom, function () {
					UTILS.die(this,arr);
				});
				return;
			}
			var attrs = ['onclick', 'onsubmit', 'style', 'onmouseover', 'onmouseout'];
			if(arr&&UTILS.isArrayLike(arr)){
				attrs = attrs.concat(arr);
			}
			UTILS.forEach(attrs, function (a) {
				if (dom && dom[a]) {
					try {
						dom[a] = null;
					} catch (e) {}
				}
				if (dom && dom.removeAttribute) {
					dom.removeAttribute(a);
				}
			});
		},
		addCss: function (str) {
			var style = document.createElement('style');
			style.textContent = str;
			document.head.appendChild(style);
		},
		isFunction: function (func) {
			return typeof func === 'function';
		},
		proxy: function (callback) {
			var script = document.createElement('script');
			script.textContent = 'try{(' + callback.toString() + ')();}catch(e){}';
			document.body.appendChild(script);
		},
		//tips: function () {
			//var html = '<div class="tips_container">Onlinedown.No.Ads \u5DF2\u542F//\u7528&emsp;<a href="http://opengg.me/760/onlinedown-no-ads/" style="color:blue" target="_blank" //title="\u6709\u95EE\u9898\u70B9\u6B64\u53CD\u9988">\u53CD\u9988</a>&emsp;<a //href="http://opengg.me/donation/" style="color:red" //title="\u6211\u8981\u6350\u52A9\u6B64\u9879\u76EE" target="_blank">\u6350\u52A9</a></div>';
		//	var css = '.tips_container////{position:fixed;top:2em;right:2em;color:green;opacity:0.4;background:#fff;padding:10px}.tips_container://hover{opacity:0.9}.tips_container #toggleGoogle{color:red;cursor:pointer}';
			//UTILS.addCss(css);
			//var div = document.createElement('div');
			// div.style.position = 'relative';
			//div.innerHTML = html;
			//document.body.insertBefore(div, document.body.childNodes[0]);
		//}
	};
	//UTILS.tips();
	UTILS.addCss('.checkbackground,.down_verify{display:none !important}');
	UTILS.die('.title+.urlist a',['href']);
	UTILS.proxy(function(){
		showDownlist(2,'checkok');
	});
})();