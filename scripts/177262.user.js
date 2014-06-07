// ==UserScript==
// @id gandc_shixiaobao17145@163.com
// @name GandC
// @version 1.1
// @namespace http://bobshixiaobao.diandian.com/
// @author Bob Shi
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @description Grab And Collection
// @run-at document-idle
// ==/UserScript==
// console.log($j.fn.jquery);
// location.href="javascript:(function(){ alert('Hello'); })()";
// # get the unsafeWindow
var isChrome = navigator.userAgent.indexOf("AppleWebKit") != -1;
var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
var requireJs = null;
// if (isChrome) {
// unsafeWindow = (function() {
// var dummyElem = document.createElement('p');
// dummyElem.setAttribute('onclick',
// "console.log('get the unsafeWindow');return window;");
// return dummyElem.onclick();
// })();
// }
// #get the unsafeWindow
//console.log(unsafeWindow);
//console.log(unsafeWindow == window);
// console.log(window.document.readyState);
// console.log(window.$j);
// console.log(unsafeWindow.$j);
// var btn = document.createElement("button");
// btn.onclick = function() {
// console.log(window.$j);
// console.log(unsafeWindow.$j);
// }
// document.body.appendChild(btn);
function inject(content, type, id) {
	var s = null;
	if (type == 'css') {
		s = document.createElement("style");
		s.type = "text/css";
	} else {
		s = document.createElement("script");
		s.type = "text/javascript";
	}
	if (id)
		s.id = "gandc";
	s.textContent = content;
	document.head.appendChild(s);
}
function initUIDisplay() {

}
function initInject() {
	inject("window.inject=" + buildObjectJavascriptCode(inject));
	inject("window.commonAction=" + buildObjectJavascriptCode(commonAction));
}
function injectDom() {
	console.log($j);
}
// 每个页面都有的默认初始化方法
function commonAction(){
	if(window.location.host!='www.oschina.net'){
		scrolltotop.offset(15,120);//go-top
		scrolltotop.init();
		$j(function(){
			console.log($j("#topcontrol"));
			$j("#topcontrol img").attr("src","https://www.oschina.net/img/gotop.gif");
		});
	}
}
function beginExecute() {
	// / <summary>开始执行脚本</summary>
	requireJs=requireJs.concat("https://www.oschina.net/js/scrolltopcontrol.js");
	entryPoint();
}
// unsafeWindow.beginExecute=beginExecute;
function entryPoint() {
	var location = window.location;
	var path = location.pathname;
	console.log("location");
	console.log(location);
	console.log("path:" + path);
	var actionFun = null;
	// requireJs=['http://www.ligerui.com/lib/ligerUI/js/ligerui.min.js'];//ligerUi
	if (location.href.indexOf('http://music.baidu.com/top/new') > -1
			|| location.href.indexOf('http://music.baidu.com/top/dayhot') > -1) {
		// unsafeInvoke(bdTop);
		actionFun = bdTop;
	} else if (location.host == "www.51voa.com" && document.getElementById("blist")) {
		actionFun = voa51;
	}

	if (actionFun) {
		inject("window.actionFun=" + buildObjectJavascriptCode(actionFun));
	}
	
	function doAction() {
		commonAction();
		if (typeof actionFun!='undefined') {
			console.log("execute actionfun.......");
			actionFun();
		}
	};
		
	unsafeInvoke(doAction);
}

function voa51() {
	var itemList = $j("#blist ul li:has(a)");
	var linksDialog = null;
	if (itemList.size() > 0) {
		var style = ".gandc_bdBtn{margin-left:20px;}\
				.gandc_container{position:absolute;bottom:10px;}\
				.gandc_bdBtn:hover{text-decoration:none;}";
		inject(style, "css");
		$j.ligerDialog.tip({
			title : '提示信息',
			width : '250',
			height : '150',
			content : '<div class="gandc_container"><a class="gandc_bdBtn" id="currentPageBtn">获取当前页资源下载链接</a>\
						&nbsp;&nbsp;<a class="gandc_bdBtn" id="allPageBtn">获取所有分页资源下载链接</a></div>'
		});
	} else {
		return;
	}

	function getAudioLinks(audioPageList, opt) {
		var audioLinks = [];
		var baseUrl = "http://www.51voa.com";
		var loading = "...";
		if (linksDialog)linksDialog.close();
		linksDialog = $j.ligerDialog.open({
					title : opt.title || "批量歌曲下载链接",
					width : opt.width || 835,
					isResize : true,
					isHidden : false,
					// heigth : 188,
					content : "<textarea id='linksTxt' style='width:98%;height:"
							+ (opt.height || 288)
							+ "px;'>正在获取，请稍候"
							+ loading
							+ "</textarea>"
				});
		setTimeout(function() {
					audioPageList.each(function(i, pageItem) {
								pageItem = $j(pageItem);
								var pageLink = pageItem.find("a[href]")
										.attr("href");
								$j.ajax({
											async : false,
											type : 'get',
											url : pageLink,
											success : function(resp) {
												var html = resp;
												var reg = new RegExp(
														"<body.*?>([\\s\\S]*?)</body>",
														"gi")
												var body = reg.exec(html)[0];
												var a = $j(body)
														.find("a[href$='.mp3']");
												if (a.size() > 0) {
													console.log(a);
													var url = a.attr('href').replace(/\s+/g,'');
													if (url.indexOf("http://") != 0) {
														var flagStr="path.asp?url=";
														var flagI = url.indexOf(flagStr);
														if(flagI>-1){
															url="http://down.51voa.com"+url.substring(flagI+flagStr.length);
														}else{
															url = baseUrl + url;
														}
													}
													console.log(url);
													audioLinks.push(url);
													// loading msg
													var loadingLen = loading.length;
													loading = (loading.length > 20)
															? "."
															: loading + ".";
													$j("#linksTxt")
															.val("正在获取第"
																	+ (audioLinks.length + 1)
																	+ "/"
																	+ (audioPageList.length)
																	+ "项，请稍候"
																	+ loading)
												}
											}
										});
							});
					console.log(audioLinks);
					console.log(audioLinks.length);

					$j("#linksTxt").val(audioLinks.join("\n")).select();
				}, 0);
	}

	var currentPageBtn = $j("#currentPageBtn").ligerButton({
				width : 150,
				click : function() {
					var audioPageList = itemList;
					console.log(audioPageList);
					getAudioLinks(audioPageList, {
								height : 388,
								checked : true,
								title : "当前页资源下载链接"
							});
				}
			});
	var allPageBtn = $j("#allPageBtn").ligerButton({
		width : 150,
		click : function() {
			var audioPageList = itemList;
			var pagerList = $j("#line").siblings("a:gt(0)");
			setTimeout(function() {
				pagerList.each(function(i, pagerItem) {
							pagerItem = $j(pagerItem);
							var pagerLink = pagerItem.attr("href");
							$j.ajax({
										async : false,
										type : 'get',
										url : pagerLink,
										success : function(resp) {
											var html = resp;
											var reg = new RegExp(
													"<body.*?>([\\s\\S]*?)</body>",
													"gi");
											var body = reg.exec(html)[0];
											// console.log(body);
											console.log("新增一页资源li列表，来自"
													+ pagerLink);
											var pageLi = $j(body)
													.find("#blist ul li:has(a)");
											console.log(pageLi);
											audioPageList = audioPageList
													.add(pageLi);
											console.log(audioPageList.length);
										}
									});
						});
				console.log(audioPageList);
				getAudioLinks(audioPageList, {
							height : 388,
							title : "所有分页资源下载链接"
						});
			}, 0);
		}
	});
}

function bdTop(type) {
	var style = ".gandc_bdBtn{margin-left:20px;}\
				.gandc_container{position:absolute;bottom:10px;}\
				.gandc_bdBtn:hover{text-decoration:none;}";
	var linksDialog = null;
	inject(style, "css");
	$j.ligerDialog.tip({
		title : '提示信息',
		width : '250',
		height : '150',
		content : '<div class="gandc_container"><a class="gandc_bdBtn" id="currentPageBtn">获取本页选中歌曲下载链接</a>\
						&nbsp;&nbsp;<a class="gandc_bdBtn" id="allPageBtn">获取所有top歌曲下载链接</a></div>'
	});

	function nativeGetSongLink(songIds) {

	}
	function getSongLinks(songlist, opt) {
		var songLi = $j("li.song-item-hook", songlist);
		if (opt.checked) {
			songLi = songLi.has("input.checkbox-item-hook:checked");
		}
		var songIds = [];
		songLi.each(function() {
					var clazz = $j(this).attr("class");
					var lBracket = clazz.indexOf("{");
					var rBracket = clazz.lastIndexOf("}");
					if (lBracket > -1 && rBracket > lBracket) {
						var jsonStr = clazz.substring(lBracket, rBracket + 1);
						console.log(jsonStr);
						var songItem = eval("(" + jsonStr + ")").songItem;
						songIds.push(songItem.sid);
					}
				});
		// console.log(songIds);
		if (!songIds.length) {
			console.log("没有获得任何歌曲ID");
			$j.ligerDialog.error('没有取得到歌曲链接，\r\n您是不是没有选中歌曲呢？');
			return;
		}
		if (linksDialog)
			linksDialog.close();
		linksDialog = $j.ligerDialog.open({
					title : opt.title || "批量歌曲下载链接",
					width : opt.width || 835,
					isResize : true,
					isHidden : false,
					// heigth : 188,
					content : "<textarea id='linksTxt' style='width:98%;height:"
							+ (opt.height || 288)
							+ "px;'>正在获取，请稍候...</textarea>"
				});
		var begin = 0, end = 10;
		var songLinkArr = [];
		var loading = ".";
		setTimeout(function() {
			do {
				var subSongs = songIds.slice(begin, end);
				$j.ajax({
							async : false,
							type : 'POST',
							url : "http://music.baidu.com/data/music/songlink",
							data : {
								songIds : subSongs.join(","),
								type : 'mp3'
							},
							dataType : "json",
							success : function(resp) {
								if (resp) {
									var data = resp.data;
									// var xcode = resp.xcode;
									var songList = data.songList;
									$j.each(songList, function(i, song) {
												songLinkArr.push(song.showLink);
											});
								} else {
									console.log("获取歌曲链接失败！");
								}
							}
						});
				begin += 10;
				end += 10;

				var loadingLen = loading.length;
				loading = (loading.length > 12) ? "." : loading + ".";
				$j("#linksTxt").val("正在获取第" + (songLinkArr.length + 1) + "/"
						+ (songIds.length) + "项，请稍候" + loading)
			} while (begin < songIds.length);

			$j("#linksTxt").val(songLinkArr.join("\n")).select();
				// console.log("linksDialog");
				// console.log(linksDialog);
		}, 0);
	}
	var currentPageBtn = $j("#currentPageBtn").ligerButton({
				width : 150,
				click : function() {
					var songlist = $j("#songListWrapper .song-list:visible");
					console.log(songlist);
					getSongLinks(songlist, {
								height : 388,
								checked : true,
								title : "本页选中歌曲下载链接"
							});
				}
			});
	var allPageBtn = $j("#allPageBtn").ligerButton({
				width : 150,
				click : function() {
					var songlist = $j("#songListWrapper .song-list:visible");
					$j("textarea").each(function() {
								var textarea = $j(this);
								songlist = songlist.add($j(textarea.val()));
								console.log(songlist);
							});
					console.log(songlist);
					getSongLinks(songlist, {
								height : 388,
								title : "所有top"// + (type == '500' ? '500' :
										// '100')
										+ "歌曲下载链接"
							});
				}
			});
}
function safeInvoke(callback) {
	// / <summary>沙箱模式下的回调</summary>
	// 因为Chrome不支持require引入脚本包的功能，为避免需要将整个jQuery加载进来，这里使用非安全模式进行执行
	if (isChrome)
		unsafeInvoke(callback);
	else
		callback();
}

function unsafeInvoke(callback, dependency) {
	// / <summary>非沙箱模式下的回调</summary>
	// var cb = document.createElement("script");
	// cb.type = "text/javascript";
	dependency = dependency || [];
	dependency
			.unshift('https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
	if (requireJs) {
		dependency = dependency.concat(requireJs);
	}
	console.log(requireJs);
	var textContent = buildCallback(callback, dependency);
	inject(textContent);
}

function buildCallback(callback, dependency) {
	var content = "";
	// if (!utility_emabed) {
	// content += "if(typeof(window.utility)!='undefined'){ alert('警告!
	// 检测到您似乎同时运行了两个12306购票脚本!
	// 请转到『附加组件管理『（Firefox）或『扩展管理』（Chrome）中卸载老版本的助手！');}; \r\nwindow.utility="
	// + buildObjectJavascriptCode(utility)
	// + ";window.helperVersion='" + version + "';\r\n";
	// utility_emabed = true;
	// }
	var scriptStr = ".wait";
	if (dependency.length > 1) {
		scriptStr = ".script(" + "['" + dependency.join("','") + "']" + ")"
				+ scriptStr;
	}
	content += "window.__cb="
			+ buildObjectJavascriptCode(callback)
			+ ";\r\n\
			window.__labjs_cb=function(){$LAB.setGlobalDefaults({Debug:true});\r\n\
				console.log('loading jquery……');\r\n\
				$LAB.script('"
			+ dependency[0]
			+ "').wait(function(){window.$j=jQuery.noConflict();})"
			+ scriptStr
			+ "(function(){\r\n\
       				console.log('to execute '+window.__cb);window.__cb();\r\n\
    		});};\r\n\
	if(typeof($LAB)!='undefined'){console.log('$LAB已存在！');window.__cb();}\r\n\
	else{console.log('$LAB不存在！');\
		var script=document.createElement('script');\r\nscript.src='http://gandc-userscript.googlecode.com/files/LAB.src.js';\r\n\
		script.type='text/javascript';\r\n\
		script.addEventListener('load', window.__labjs_cb);\r\n\
		document.head.appendChild(script);\r\n\
	}";

	return content;
}

function buildObjectJavascriptCode(object) {
	// / <summary>将指定的Javascript对象编译为脚本</summary>
	if (!object)
		return null;

	var t = typeof(object);
	if (t == "string") {
		return "\"" + object.replace(/(\r|\n|\\)/gi, function(a, b) {
					switch (b) {
						case "\r" :
							return "\\r";
						case "\n" :
							return "\\n";
						case "\\" :
							return "\\\\";
					}
				}) + "\"";
	}
	if (t != "object")
		return object + "";

	var code = [];
	for (var i in object) {
		var obj = object[i];
		var objType = typeof(obj);

		if ((objType == "object" || objType == "string") && obj) {
			code.push(i + ":" + buildObjectJavascriptCode(obj));
		} else {
			code.push(i + ":" + obj);
		}
	}

	return "{" + code.join(",") + "}";
}
var isRun = (function() {
	var ok = true;
	if (self == top) {
		ok = true;
	} else {
		console.log("iframe" + window.location.href + "中不运行……");
		ok = false;
	}

	return ok;
})();
if (isRun) {
	if (!isChrome && !isFirefox) {
		alert("很抱歉，未能识别您的浏览器，或您的浏览器尚不支持脚本运行，请使用Firefox或Chrome浏览器！\n如果您运行的是Maxthon3，请确认当前页面运行在高速模式而不是兼容模式下 :-)");
	} else if (isFirefox && typeof(GM_notification) == 'undefined') {
		alert("很抱歉，本脚本需要最新的Scriptish扩展，请安装它！");
		window
				.open("https://addons.mozilla.org/zh-CN/firefox/addon/scriptish/");
	} else if (!window.localStorage) {
		alert("警告! localStorage 为 null, 助手无法运行. 请查看浏览器是否已经禁用 localStorage!\nFirefox请设置 about:config 中的 dom.storage.enabled 为 true .");
	} else {
		// 记录更新
		initUIDisplay();
		initInject();
		requireJs = ['http://www.ligerui.com/lib/ligerUI/js/ligerui.min.js',
				'http://www.ligerui.com/lib/ligerUI/skins/Aqua/css/ligerui-all.css'];
		// unsafeInvoke(function() {
		// console.log("开始运行user script脚本");
		// console.log("ligerDialog");
		// console.log($j.ligerDialog);
		beginExecute();
		// });
		// unsafeInvoke(injectDom);
	}
}
