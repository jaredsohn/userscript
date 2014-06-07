// ==UserScript==
// @name           baidu search result handler
// @description    脚本的目的是使百度搜索结果页更人性化，更方便
//                 功能描述:
//                 1、去掉百度推荐和广告
//                 2、添加左右键快捷翻页(1.2版本以后去除)
//                 3、结果列表隔行换色、点击选择高亮、鼠标滑过高亮
//                 4、结果页预览
//                 5、结果可选择关闭
//                 6、ajax自动载入下一页
//                 7、相关搜索固定到底部
//                 8、添加返回顶部
//                 9、添加每页结果个数选项
//                 10、google和360搜索直接跳转
//                 11、搜索框复制到底部随页面滚动，方便后续搜索(应使用的人要求，去掉底部固定搜索框)
//                 12、百度结构变化，修改对应代码
// @namespace      http://www.shizuwu.cn
// @auth           break
// @version        2.0
// @updateURL      https://userscripts.org/scripts/source/140960.meta.js
// @downloadURL    https://userscripts.org/scripts/source/140960.user.js
// @license        Public Domain
// @include        http://www.baidu.com/s*
// @require 	   http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==
// UPDATES
// -------
// 2.0 2013.10.09 百度界面结构变化，修改对应的代码
// 1.9 2013.04.23 应使用的人要求，去掉底部固定搜索框
// 1.8 2013.04.15 搜索框复制到底部随页面滚动，方便后续搜索(应使用的人要求，去掉底部固定搜索框)
// 1.7 2013.01.15 jquery 升级后，有的属性和方法去除了，做出相应修改
// 1.6 2012.12.28 百度页面结构调整，修改对应的html标签
// 1.5 2012.12.23 加入google搜索链接，和360搜索链接
//                调整部分功能
// 1.4 2012.09.11 加入设置每页显示结果个数的按钮
// 1.3 2012.08.17 加入作者相关信息
//                返回顶部按钮功能转移
// 1.2 2012.08.17 去掉左右键翻页、去掉分页列表
//                添加ajax自动载入下一页的功能
//                底部无用信息去除，“相关搜索”固定到底部
//                底部添加"返回顶部"按钮
// 1.1 2012.08.16 添加"结果可选择关闭"功能
//                修改预览框效果
//                添加importJS功能
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
		},
		cookie: function(name, value, options) {
		    if (typeof value != 'undefined') { // name and value given, set cookie
		        options = options || {};
		        if (value === null) {
		            value = '';
		            options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
		            options.expires = -1;
		        }
		        var expires = '';
		        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
		            var date;
		            if (typeof options.expires == 'number') {
		                date = new Date();
		                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
		            } else {
		                date = options.expires;
		            }
		            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		        }
		        // NOTE Needed to parenthesize options.path and options.domain
		        // in the following expressions, otherwise they evaluate to undefined
		        // in the packed version for some reason...
		        var path = options.path ? '; path=' + (options.path) : '';
		        var domain = options.domain ? '; domain=' + (options.domain) : '';
		        var secure = options.secure ? '; secure' : '';
		        document.cookie = [name, '=', value, expires, path, domain, secure].join('');
		    } else { // only name given, get cookie
		        var cookieValue = null;
		        if (document.cookie && document.cookie != '') {
		            var cookies = document.cookie.split(';');
		            for (var i = 0; i < cookies.length; i++) {
		                var cookie = jQuery.trim(cookies[i]);
		                // Does this cookie string begin with the name we want?
		                if (cookie.substring(0, name.length + 1) == (name + '=')) {
		                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                    break;
		                }
		            }
		        }
		        return cookieValue;
		    }
		},
		google: function(kw) {
			window.open('http://www.google.com.hk/search?hl=zh-CN&q='+kw);
		},
		so: function(kw) {
			window.open('http://www.so.com/s?q='+kw);
		}
	});

	$.fn.GLO = {
		"pn": 0,
		"loading": 0,
		"totalNum":10,
		"pageSize":10,
		"nomore": 0,
		"otherSearchEngine":'<div class="button_wrap ose so"><a class="slidebttn" title="360搜索">SO</a></div><div class="button_wrap ose google"><a class="slidebttn" title="google搜索">G</a></div>',
		"sizes": '<div class="size_wrap"><div class="size"><span>100</span><span>50</span><span>20</span><span>10</span></div><div><span id="cs" title="切换每页结果数">10</span></div>',
		"AUTH": '<div class="button_wrap"><div class="buttons"><a href="http://www.shizuwu.cn/about" target="_blank">关于作者</a><a href="http://www.shizuwu.cn/hire" target="_blank">找我帮忙</a></div><a id="slidebttn" title="点我返回顶部" class="slidebttn">ME</a></div>',
		"authCss": '.button_wrap{position:fixed;z-index:36;width:165px;height:30px;bottom:10px;right:170px;overflow:hidden; font-size:12px;}.buttons{width:30px;height:30px;border-radius:30px;background-color:#000;color:#fff;top:0px;right:0px;position:absolute;line-height:30px;text-align:left}div.buttons a{color:#fff;display:none; margin:0px 10px; text-decoration:none;}.buttons a.holder{display:inline-block;width:30px;height:30px;margin:0px;background-color:#fff;border-radius:30px;color:#000;line-height:30px;text-align:center;cursor:pointer}.slidebttn{width:28px;height:28px;background-color:#000;border-radius:28px;color:#fff;position:absolute;top:1px;right:1px;text-transform:uppercase;line-height:30px;text-align:center;cursor:pointer}.so{right:90px; z-index:34;}.so a.slidebttn{background-color:#3ba80d;}.google{right:50px; z-index:33;}.google a.slidebttn{background-color:#1285fb;}',
		"sizeCss": '.size_wrap,#cs{position:fixed;z-index:35;width:30px;height:30px;bottom:10px;right:130px;overflow:hidden; font-size:12px;}.size_wrap{bottom:40px;height:0px;}.size span,#cs{display:block;cursor:pointer;border-radius:30px; height:30px; width:30px;background-color:#000; color:#fff; text-align:center; line-height:30px;float:right;}'
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
			defCss = '#container{margin-bottom:110px;}#container table{padding:5px; width:36em; position:relative;}table.gtr{background-color:#e1e6f6;-webkit-transition:all .2s ease-out;-webkit-transform:translate(0px, 0px);-moz-transition:all .2s ease-out;-moz-transform:translate(0px, 0px);border-radius: 10px;}table.hover{background-color:#fefdbb;box-shadow: 3px 3px 2px #e6e6e6;border-radius: 10px;}table.selectedTr{-webkit-transition:all .2s ease-out;-webkit-transform:translate(10px, 0px);-moz-transition:all .2s ease-out;-moz-transform:translate(10px, 0px);background-color:#fefdcb;box-shadow: 3px 3px 2px #e6e6e6;border-radius: 10px; border:1px solid #eead0e}#rs{width:100%;position: fixed; bottom:0px; border-top:1px solid #ccc; background:#fff;z-index:30;margin:0px}.fav{position: fixed;display: none;bottom: 10px;right: 40px;width: 30px;height: 30px;line-height: 30px;-webkit-border-radius: 30px;-mozborder-radius: 30px;border-radius: 30px;background: black;color: white;text-align: center;font-size: 12px;cursor: pointer;z-index:31;}.fav{display:block;}.redTip{color:red;}';
			prevCss = 'td.prev{width:2.3em}.vspiic{background: url("http://hiphotos.baidu.com/shizuwu/pic/item/807473d9f2d3572c1ec1d7458a13632763d0c3a9.jpg") scroll no-repeat;background-position: -20px 0px;height: 13px;width: 20px; cursor:pointer; margin-left:5px; display:none; position:absolute; bottom:5px;}.vspiic:hover{background-position: 0px 0px;}#prev{position:absolute; display:none; top:0; z-index:999999;border-radius: 10px; box-shadow: 3px 3px 2px #e6e6e6; padding:5px; border: 1px solid #ccc; background:#fff;}.preview-close{float:right; font-size:26px;text-decoration:none; color:#000;}.preview-close:hover{-webkit-transform: rotate(180deg);-webkit-transition: -webkit-transform 0.3s ease 0s;-moz-transform: rotate(180deg);-moz-transition: -moz-transform 0.3s ease 0s;}.prev .preview-close{position:absolute; top:5px; margin-left:5px; color:#ccc;}.preview-arrow{position: absolute;left: -6px;top: 289px; font:13px/1.231 Arial,sans-serif;}.preview-arrow em {color: #999;left: -1px;}.preview-arrow span {color: #fff;}.preview-arrow em, .preview-arrow span {overflow: hidden;position: absolute;height: 25px;width: 20px;}';

			prevBtn = '<div class="vspiic" title="预览(点击在新窗口查看)"></div>';
			closeTBtn = '<a href="javascript:void(0);" onclick="toggleTable(this);" class="preview-close" title="关闭">×</a>';
			closeBtn = '<a href="javascript:void(0);" onclick="this.parentNode.style.display=\'none\'" class="preview-close" title="关闭">×</a>';
			loadingImg = 'http://hiphotos.baidu.com/shizuwu/pic/item/5baca2de9c82d1584e73e028800a19d8be3e42df.jpg';
			ifrHtml = '<div id="prev">' + '<iframe id="prevIfr" style="overflow:hidden" scrolling="auto" height="450px"' + 'frameborder="0" src=""></iframe>' + '</div>';

			toggleTable = 'function toggleTable(obj) {$(obj).parents("table").hide().next().remove();}';

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
					$.importJS('http://code.jquery.com/jquery-1.8.0.min.js');
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
							"top": ($(document).scrollTop() + 85)
						}).prepend($(this).parent().prev().find("h3 a").clone().css({
							"float": "left"
						})).prepend("<img src='" + loadingImg + "' style='position:absolute; left:" + $("#prev").width() / 2 + "px; top:40px;' />").prepend(closeBtn).prepend('<div class="preview-arrow" id="prv-arr"><em>◆</em><span>◆</span></div>').find("#prv-arr").css({
							'top': _this.offset().top - $(document).scrollTop() - 85
						});
						var iicTop = _this.offset().top - $(document).scrollTop() - 85;
						if (iicTop < 85) {
							$("#prev").css({
								"top": _this.offset().top - 20
							});
							$("#prv-arr").css({
								"top": 20
							});
						}

						$("#prevIfr").attr("src", $(this).parent().prev().find("a:eq(0)").attr("href")).css({
							"width": $("#prev").width()
						}).load(function() {
							$("#prev").find("img").remove();
						});

					} else if (e.type == 'mouseout') {
						prevT = setTimeout('$("#prev").hide();$("#prevIfr").attr("src", "").prevAll().remove();', 200);
					} else if (e.type == 'click') {
						window.open($(this).parent().prev().find("h3.t a").attr("href"));
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
				$(this).find("table.result[rel!=loaded] > tbody > tr > td.c-default").each(function() {
					if ($(this).find("td.prev").size() == 0) {
						$(this).after('<td class="prev">' + closeTBtn + prevBtn + '</td>');
					}
				})
			});

			$(this).children("table:even").addClass(opts.oc);
			$("#page").remove();

			//单个table监听
			$(this).children("table").hover(function(e) {
				$(this).addClass(opts.hc).find(".vspiic").show();
			}, function(e) {
				$(this).removeClass(opts.hc).find(".vspiic").hide();
			})
			$(this).children("table").unbind("click").bind("click", function(e) {
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
					_this.children("table").attr('rel', 'loaded');

					$.ajax({
						type: 'GET',
						url: opts.contentPage,
						data: opts.contentData,
						success: function(data) {
							console.log($.fn.GLO['pn']);
							_data = $(data).find("#container #content_left");
							$(_data).removeAds($.fn.GLO['pn']);
							var objectsRendered = $(_data).children("table");
							_this.append($(_data).children("table"));
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
		removeAds: function(pn) {
			$("#" + (parseInt(pn) + 1), $(this)).prevAll().not('p').remove();
			$("#content_right").remove();
			$(".EC_mr15", $(this)).remove();
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
		$("#container #content_left").activeTable({});
		$(window).scroll(function(event) {
			$('#container #content_left').loadContent({
				'contentPage': 'http://www.baidu.com/s?wd=' + $.getVar("wd") + '&pn=' + (parseInt($.fn.GLO['pn']) + parseInt($.fn.GLO['pageSize'])) + '&tn=baiduhome_pg&ie=utf-8&usm=2',
				'contentData': {},
				'scrollTarget': $(window),
				'heightOffset': 10,
				'beforeLoad': function() {
					$("#loading").remove();
					$('#container #content_left').append('<div id="loading">正在载入....<img src="' + loadingImg + '" /></div>');
					$.fn.setGLO({
						"pn": parseInt($.fn.GLO['pn']) + parseInt($.fn.GLO['pageSize']),
						"loading": 1
					});
				},
				'afterLoad': function(elementsLoaded) {
					$('#loading').fadeOut();
					$(elementsLoaded).fadeInWithDelay().after("<br>").first().before("<div class='redTip'><b>۞下面是第" + ($.fn.GLO['pn'] / $.fn.GLO['pageSize'] + 1) + "页</b></div>");
					$("#container #content_left").activeTable({});
					$.fn.setGLO({
						"loading": 0
					});
				}
			});

		});

		//搜索框常在
		//$("#rs").prepend($("form.fm").clone().css({margin:'0px 25px 5px'}));

		//去掉底部无用代码
		$("#search, #foot").remove();

		//底部“关于作者”
		var ot;
		$("#container #content_left").append($.fn.GLO.AUTH);
		$.insertCss($.fn.GLO.authCss);

		$("#container #content_left").append($.fn.GLO.sizes);
		$.insertCss($.fn.GLO.sizeCss);

		//google、360搜索
		var kw = $.getVar("wd");
		$("#container #content_left").append($.fn.GLO.otherSearchEngine);
		$(".so").live("click", function() {
			$.so(kw);
		});
		$(".google").live("click", function() {
			$.google(kw);
		});

		$("#container #content_left").before("<p style='margin:0px 0px 8px 20px'><span class='nums'>百度为您找到相关结果<b>"+numText+"</b>个</span></p>")

		//每页显示个数
		$(".size span").click(function() {
			changeSize($(this).html());
		});
		$(".size_wrap").hover(function(){
			$(this).stop().animate({height:'120px'}, 500);
		},
		function(){
			$(this).stop().animate({height:'0px'}, 500);
		})
		

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
		if(/:NR=(\d{1,})/.test($.cookie("BAIDUID"))) {
			var cs = $.cookie("BAIDUID").replace(/(.*):NR=(\d{1,})(.*)/, '$2')
			$.fn.GLO['pageSize'] = parseInt(cs);
			$("#cs").html(cs);
		} else {
			$("#cs").html("10");
		}
		
		
	});
	
	/*设置每页结果数*/
	function setPageSize(size) {
		$.cookie("BAIDUID", $.cookie("BAIDUID").replace(/:NR=(\d{1,})/, '')+ ':NR='+size,{expire:7,'path':'/', 'domain':'.baidu.com'});
	}

	function changeSize(size) {
		setPageSize(size);
		location.reload();
	}

	
	//去掉百度推荐和广告
	
	$.fn.setGLO({
		"pn": parseInt($.getVar("pn"))
	});
	$("#container #content_left").removeAds($.fn.GLO['pn']);


})();