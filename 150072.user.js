// ==UserScript==
// @name           360 search result handler
// @description    脚本的目的是使360搜索结果页更人性化，更方便
//                 功能描述:
//                 1、结果列表隔行换色、点击选择高亮、鼠标滑过高亮
//                 2、结果页预览
//                 3、结果可选择关闭
//                 4、ajax自动载入下一页
//                 5、相关搜索固定到底部
//                 6、添加返回顶部
// @namespace      http://www.shizuwu.cn
// @auth           break
// @version        1.0
// @updateURL      https://userscripts.org/scripts/source/150072.meta.js
// @downloadURL    https://userscripts.org/scripts/source/150072.user.js
// @license        Public Domain
// @include        http://so.360.cn/s*
// @include        http://www.so.com/s*
// @require 	   http://code.jquery.com/jquery.js
// ==/UserScript==
// UPDATES
// -------
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
		//获取屏幕分辨率
		sc: function() {
			return screen.width;
		}
	});

	$.fn.GLO = {
		"pn": 0,
		"loading": 0,
		"totalNum":10,
		"pageSize":10,
		"nomore": 0,
		"sizes": '<div class="size_wrap"><div class="size"><span>100</span><span>50</span><span>20</span><span>10</span></div><div><span id="cs" title="切换每页结果数">10</span></div>',
		"AUTH": '<div class="button_wrap"><div class="buttons"><a href="http://www.shizuwu.cn/about" target="_blank">关于作者</a><a href="http://www.shizuwu.cn/hire" target="_blank">找我帮忙</a></div><a id="slidebttn" title="点我返回顶部">ME</a></div>',
		"authCss": '.button_wrap{position:fixed;z-index:33;width:165px;height:30px;bottom:10px;right:40px;overflow:hidden; font-size:12px;}.buttons{width:30px;height:30px;border-radius:30px;background-color:#000;color:#fff;top:0px;right:0px;position:absolute;line-height:30px;text-align:left}div.buttons a{color:#fff;display:none; margin:0px 10px; text-decoration:none;}.buttons a.holder{display:inline-block;width:30px;height:30px;margin:0px;background-color:#fff;border-radius:30px;color:#000;line-height:30px;text-align:center;cursor:pointer}#slidebttn{width:28px;height:28px;background-color:#000;border-radius:28px;color:#fff;position:absolute;top:1px;right:1px;text-transform:uppercase;line-height:30px;text-align:center;cursor:pointer}'
	};

	$.fn.extend({
		/**
		 * table 的相关操作
		 *  隔行换色
		 *  鼠标滑过变色
		 *  鼠标点击高亮单行
		 *  鼠标滑过出现预览按钮
		 */
		activeTable: function(opts) {
			defCss = '#container{margin-bottom:110px;}#container ul li{float:left; display:inline;padding:5px; width:570px; position:relative;}li.gtr{background-color:#e1e6f6;-webkit-transition:all .2s ease-out;-webkit-transform:translate(0px, 0px);-moz-transition:all .2s ease-out;-moz-transform:translate(0px, 0px);border-radius: 10px;}li.hover{background-color:#fefdbb;box-shadow: 3px 3px 2px #e6e6e6;border-radius: 10px;}li.selectedTr{-webkit-transition:all .2s ease-out;-webkit-transform:translate(10px, 0px);-moz-transition:all .2s ease-out;-moz-transform:translate(10px, 0px);background-color:#fefdcb;box-shadow: 3px 3px 2px #e6e6e6;border-radius: 10px; border:1px solid #eead0e}#rs{position: fixed; bottom:0px; border-top:1px solid #ccc; background:#fff;z-index:30;}.fav{position: fixed;display: none;bottom: 10px;right: 40px;width: 30px;height: 30px;line-height: 30px;-webkit-border-radius: 30px;-mozborder-radius: 30px;border-radius: 30px;background: black;color: white;text-align: center;font-size: 12px;cursor: pointer;z-index:31;}.fav{display:block;}.redTip{color:red;}';
			prevCss = '.vspiic{font-size:26px;line-height:13px; text-align:center;height: 13px;width: 20px; cursor:pointer; margin-left:5px; display:none; position:absolute; bottom:5px; right:5px;}.vspiic:hover{background-position: 0px 0px;}#prev{position:absolute; display:none; top:0; z-index:999999;border-radius: 10px; box-shadow: 3px 3px 2px #e6e6e6; padding:5px; border: 1px solid #ccc; background:#fff;}.preview-close{float:right; font-size:26px;text-decoration:none; color:#000;}.preview-close:hover{-webkit-transform: rotate(180deg);-webkit-transition: -webkit-transform 0.3s ease 0s;-moz-transform: rotate(180deg);-moz-transition: -moz-transform 0.3s ease 0s;}li .preview-close{position:absolute; top:5px; right:5px; margin-left:5px; color:#ccc;}.preview-arrow{position: absolute;left: -6px;top: 289px; font:13px/1.231 Arial,sans-serif;}.preview-arrow em {color: #999;left: -1px;}.preview-arrow span {color: #fff;}.preview-arrow em, .preview-arrow span {overflow: hidden;position: absolute;height: 25px;width: 20px;}';

			prevBtn = '<div class="vspiic" title="预览(点击在新窗口查看)">»</div>';
			closeTBtn = '<a href="javascript:void(0);" onclick="toggleTable(this);" class="preview-close" title="关闭">×</a>';
			closeBtn = '<a href="javascript:void(0);" onclick="this.parentNode.style.display=\'none\'" class="preview-close" title="关闭">×</a>';
			loadingImg = 'http://hiphotos.baidu.com/shizuwu/pic/item/5baca2de9c82d1584e73e028800a19d8be3e42df.jpg';
			ifrHtml = '<div id="prev">' + '<iframe id="prevIfr" style="overflow:hidden" scrolling="auto" height="450px"' + 'frameborder="0" src=""></iframe>' + '</div>';

			toggleTable = 'function toggleTable(obj) {$(obj).parent().hide().next().remove();}';

			opts = $.extend({
				"hc": "hover",
				"sc": "selectedTr",
				"oc": "gtr",
				"cssText": ''
			}, opts);

			/**
			 *整个结果列表的table重新定义(第一次载入时)
			 */
			//样式调整
			if ($.fn.GLO['pn'] == 0) {
				$.insertCss(defCss + prevCss + opts.cssText);
				$.insertJS(toggleTable);
				if(!$.browser.mozilla) {
					$.importJS('http://code.jquery.com/jquery.js');
				}

				//添加预览按钮已经iframe
				$(this).after(ifrHtml);

				$(".vspiic").live("mouseover mouseout click", function(e) {
					_this = $(this);
					clearTimeout(prevT);
					if (e.type == 'mouseover') {
						$("#prevIfr").attr("src", "").prevAll().remove();
						$("#prev").hide().show().css({
							"width": ((1 - 640 / $.sc()) * 100) + "%",
							"left": ($(this).offset().left + 35),
							"top": ($(document).scrollTop() - ($(document).scrollTop() < 55 ? ($(document).scrollTop()+5) : 50))
						}).prepend($(this).parent().find("h3 a").clone().css({
							"float": "left"
						})).prepend("<img src='" + loadingImg + "' style='position:absolute; left:" + $("#prev").width() / 2 + "px; top:40px;' />").prepend(closeBtn).prepend('<div class="preview-arrow" id="prv-arr"><em>◆</em><span>◆</span></div>').find("#prv-arr").css({
							'top': _this.offset().top - ($(document).scrollTop() < 55 ? ($(document).scrollTop()+55) : ($(document).scrollTop() +50))
						});
						var iicTop = _this.offset().top - $(document).scrollTop() - 50;
						if (iicTop < 50) {
							$("#prev").css({
								"top": _this.offset().top - 15
							});
							$("#prv-arr").css({
								"top": 15
							});
						}

						$("#prevIfr").attr("src", $(this).parent().find("h3 a:eq(0)").attr("href")).css({
							"width": $("#prev").width()
						}).load(function() {
							$("#prev").find("img").remove();
						});

					} else if (e.type == 'mouseout') {
						prevT = setTimeout('$("#prev").hide();$("#prevIfr").attr("src", "").prevAll().remove();', 200);
					} else if (e.type == 'click') {
						window.open($(this).parent().find("h3 a").attr("href"));
					}
				});

				$("#prev").live("mouseover mouseout", function(e) {
					clearTimeout(prevT);
					if (e.type == 'mouseout') {
						prevT = setTimeout('$("#prev").hide();$("#prevIfr").attr("src", "").prevAll().remove();', 0);
					}
				});


			}

			$(this).each(function() {
				$(this).find("li[rel!=loaded]").each(function() {
					if ($(this).find(".preview-close").size() == 0) {
						$(this).append('' + closeTBtn + prevBtn + '');
					}
				})
			});

			$(this).children("li:even").addClass(opts.oc);
			$("#page").remove();

			//单个table监听
			$(this).children("li").hover(function(e) {
				$(this).addClass(opts.hc).find(".vspiic").show();
			}, function(e) {
				$(this).removeClass(opts.hc).find(".vspiic").hide();
			}).click(function(e) {
				$(this).hasClass(opts.sc) ? $(this).removeClass(opts.sc) : $(this).addClass(opts.sc);
			});
		},
		loadContent: function(opts) {
			var defaults = {
				'container': $("body"),
				'contentPage': null,
				'contentData': {},
				'beforeLoad': null,
				'afterLoad': null,
				'scrollTarget': null,
				'heightOffset': 0
			};
			opts = $.extend(defaults, opts);
			var target = opts.scrollTarget;
			var mayLoadContent = $(target).scrollTop() + opts.heightOffset >= $(document).height() - $(target).height();
			if (mayLoadContent && $.fn.GLO['loading'] == 0) {
				if (($.fn.GLO['pn'] >= ($.fn.GLO['totalNum'] - $.fn.GLO['pageSize'])) ) {
					if($.fn.GLO['nomore'] == 0) {
						_this.append('<div id="nomore" class="redTip">亲~,没有更多结果了</div>');
						$.fn.setGLO({
							"nomore": 1
						});
					}
				} else {
					_this = $(this);
					if (opts.beforeLoad != null) {
						opts.beforeLoad();
					}
					_this.children("li").attr('rel', 'loaded');

					$.ajax({
						type: 'GET',
						url: opts.contentPage,
						data: opts.contentData,
						success: function(data) {
							_data = $(data).find("#container ul");

							var objectsRendered = $(_data).children("li");
							_this.append($(_data).children("li"));
							if (opts.afterLoad != null) {
								opts.afterLoad(objectsRendered);
							}
						},
						dataType: 'html'
					});
				}
			}

		},
		fadeInWithDelay: function() {
			var delay = 0;
			return this.each(function() {
				$(this).delay(delay).animate({
					opacity: 1
				}, 200);
				delay += 100;
			});
		},
		setGLO: function(defGLO) {
			$.extend($.fn.GLO, defGLO);
		}
	});

	$(function() {
		//获取总共的搜索结果数
		numText = $("#page .nums").text().replace(/[^0-9]/ig, "");
		$.fn.setGLO({
			"totalNum": numText > 740 ? 740 : numText
		});
		$("#container ul").activeTable({});
		$(window).scroll(function(event) {
			$('#container ul').loadContent({
				'contentPage': 'http://so.360.cn/s?q=' + $.getVar("q") + '&pn=' + (parseInt($.fn.GLO['pn']) + parseInt($.fn.GLO['pageSize'])) + '&j=0&_re=1',
				'contentData': {},
				'scrollTarget': $(window),
				'heightOffset': 10,
				'beforeLoad': function() {
					$("#loading").remove();
					$('#container').append('<div id="loading">正在载入....<img src="' + loadingImg + '" /></div>');
					$.fn.setGLO({
						"pn": parseInt($.fn.GLO['pn']) + parseInt($.fn.GLO['pageSize']),
						"loading": 1
					});
				},
				'afterLoad': function(elementsLoaded) {
					$('#loading').fadeOut();
					$(elementsLoaded).fadeInWithDelay().first().before("<div class='redTip'><b>۞下面是第" + ($.fn.GLO['pn'] / $.fn.GLO['pageSize'] + 1) + "页</b></div>");
					$("#container ul").activeTable({});
					$.fn.setGLO({
						"loading": 0
					});
				}
			});

		});

		//去掉底部无用代码
		$("#search, #footer").remove();

		//底部“关于作者”
		var ot;
		$("#container").append($.fn.GLO.AUTH);
		$.insertCss($.fn.GLO.authCss);
		

        $('#slidebttn').hover(
			function () {
				clearTimeout(ot);
				var $this 		= $(this);
				var $slidelem 	= $this.prev();
				$slidelem.stop().animate({'width':'165px'},300);
				$slidelem.find('a').stop(true,true).fadeIn();
				$this.css({"background":'#fff', "color":'#000'});
			},
			function (e) {
				ot = setTimeout(outHandler, 250);
			}
		).click(function() {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
		});
		$(".buttons").hover(function() {
			clearTimeout(ot);
		}, function() {
			ot = setTimeout(outHandler, 250);
		})

        function outHandler() {
        	var $this 		= $('#slidebttn');
			var $slidelem 	= $this.prev();
			$slidelem.stop().animate({'width':'30px'},200);
			$slidelem.find('a').stop(true,true).fadeOut();
			$this.css({"background":'#000', "color":'#fff'});
        }

		
	});
	
	$.fn.setGLO({
		"pn": parseInt($.getVar("pn"))
	});

})();