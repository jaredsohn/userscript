// Untiny Me
// v1.00.20091211
// Author: andi.cao
// Credits: Untiny.me 
//
//
// ==UserScript==
// @name			Untiny Me
// @namespace		http://www.xxx.cn/
// @description		To decode some short URLs and redirect automatically, when visit them, which blocked in China (e.g. BIT.LY).
// @include			http://*
// @include			https://*
// ==/UserScript==
(function() {
 	var SUR = (function() {
		var Patterns = [
			  "http://bit.ly/"
			, "http://post.ly/"
			, "http://bit.ly/"
			, "http://post.ly/"
			, "http://j.mp/"
			, "http://ff.im/"
			, "http://htxt.it/"
			, "http://ping.fm/"
		];

		//反缩写服务地址
		var UntinyAPI = "http://untiny.me/?url=";

		/**
		* 判断s是否为缩写网址，是返回true。
		* @param s{String} 字符串
		*/
		function isSU (s) {
			for (var i = 0, len = Patterns.length; i < len; i++)
				if(("" + s).indexOf(Patterns[i]) == 0) return true;
			return false;
		}

		function untiny (href) {
			return  UntinyAPI + encodeURIComponent(href);
		}

		return {
			init: function(opt) {
				document.addEventListener('click', function(e) {
					if (("" + e.target.tagName).toLowerCase() == 'a') {
						var link = e.target;
						if (isSU(link.href)) {
							link.href = untiny(link.href);
						}
					}
				}, true);
			}
		};
	})();
	SUR.init();
})();