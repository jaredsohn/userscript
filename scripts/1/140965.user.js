// ==UserScript==
// @name           google search result handler
// @description    脚本的目的是使google搜索结果页更人性化，更方便
//                 功能描述:
//                 1、去掉无用内容
//                 2、添加左右键快捷翻页
//                 3、结果列表隔行换色、点击选择高亮、鼠标滑过高亮
//                 4、中转链接转成原始链接
//                 5、可选择关闭行
// @namespace      http://www.shizuwu.cn
// @auth           break
// @version        1.1
// @license        Public Domain
// @include        http://www.google.com.hk/#*
// @include        https://www.google.com.hk/#*
// @require 	   http://code.jquery.com/jquery.js
// ==/UserScript==
// UPDATES
// -------
// 1.1 2012.08.16 添加https://www.google.com.hk/*
//                修改替换中转链接的方法
//                添加可选择关闭功能
(function() {
	$.extend({
		//获取网页url的参数
		getVar: function(name, url) {
			var vars = [],
				hash;
			if ("undefined" == typeof url) {
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
		//左右键翻页
		bindPrevNext: function() {
			var url = '',
				host = "http://www.google.com.hk",
				keyArr = [37, 39];
			$(document).bind('keydown', function(e) {

				if ($.inArray(e.keyCode, keyArr) >= 0) {
					if (e.keyCode == 37) {
						if ($.getVar("start") > 0) {
							url = $("#nav td.navend").first().find("a").attr("href");
							location.href = host + url;
						}
					} else if (e.keyCode == 39) {
						url = $("#nav td.navend").last().find("a").attr("href");
						location.href = host + url;
					}

				}
			});
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
		}
	});

	$.fn.extend({
		/**
		 * table 的相关操作
		 *  隔行换色
		 *  鼠标滑过变色
		 *  鼠标点击高亮单行
		 */
		activeTable: function(opts) {
			defCss = '#rso li{padding:5px;}li.gtr{background-color:#e1e6f6;-webkit-transition:all .2s ease-out;-webkit-transform:translate(0px, 0px);border-radius: 10px;}li.hover{background-color:#fefdbb;box-shadow: 3px 3px 2px #e6e6e6;border-radius: 10px;}li.selectedTr{-webkit-transition:all .2s ease-out;-webkit-transform:translate(10px, 0px);background-color:#fefdcb;box-shadow: 3px 3px 2px #e6e6e6;border-radius: 10px; border:1px solid #eead0e}.preview-close{float:right; font-size:26px;text-decoration:none; color:#000;}.preview-close:hover{-webkit-transform: rotate(180deg);-webkit-transition: -webkit-transform 0.3s ease 0s;}';
			closeTBtn = '<a href="javascript:void(0);" onclick="toggleTable(this);" class="preview-close" title="关闭">×</a>';
			toggleTable = 'function toggleTable(obj) {obj.parentNode.parentNode.parentNode.style.display= "none";}';

			opts = $.extend({
				"hc": "hover",
				"sc": "selectedTr",
				"oc": "gtr",
				"cssText": ''
			}, opts);

			/**
			 *整个结果列表的table重新定义
			 */
			//样式调整
			$.insertCss(defCss + opts.cssText);
			$(this).find("li:even").addClass(opts.oc);
			//替换中转链接
			$(this).find("li.g h3.r a").attr("onmousedown", "");

			$.insertJS(toggleTable);
			$.importJS('http://code.jquery.com/jquery.js');
			$(this).find("li.g h3.r").append(closeTBtn);

			//单个table监听
			$(this).find("li").hover(function(e) {
				$(this).addClass(opts.hc);
			}, function(e) {
				$(this).removeClass(opts.hc);
			}).click(function(e) {
				$(this).hasClass(opts.sc) ? $(this).removeClass(opts.sc) : $(this).addClass(opts.sc);
			});
		}
	});

	$(function() {
		function init() {
			$.bindPrevNext();

			//输入关键词时，取消左右键翻页的监听
			$("#lst-ib").focus(function() {
				$(document).unbind('keydown');
			}).blur(function() {
				$.bindPrevNext();
			})

			$("#rso").activeTable({});

			//去掉无用内容
			$("#appbar").hide();
		}
		setTimeout(init, 1500);

	});
})();