// ==UserScript==
// @name          BaiduMonkeyB
// @namespace     http://userstyles.org
// @description   改善百度的搜索结果界面，提高阅读效率
// @version       13.1
// @author        SUCCESS/JE
// @include       http://www.baidu.com/s*
// @include       http://www.baidu.com/baidu*
// ==/UserScript==
/* 更新记录 ***********************************************************************
【2013.1.11】 更新 V13.1
	修正： 第一页排版
************************************************************************/
(function() {
	// 检查新版本
	setTimeout(checkUpdate, 1000);
	var scriptVersion = '13.1';
	var scriptUrl = 'http://userscripts.org/scripts/show/105482';
	var installUrl = 'http://userscripts.org/scripts/source/105482.user.js';
	var isChrome = /Chrome/.test(navigator.userAgent);
	var NextPageLink;
	var pageCount = 1; // 翻页计数
	var ResultNum = 1; // 搜索结果计数
	var IsLoadingNext; // 是否正在加载下一页
	var relatedSearch = matchNode('//div[@id="rs"]').snapshotItem(0);
	var defaultCSS = '\
.bm_MultiColDiv .rest {\n\
	background-color: #EBEFF9 !important;\n\
	margin-left: 0.5em !important;\n\
	margin-right: 0 !important;\n\
	padding-right: 0.5em !important;\n\
	margin-top: 0.5em !important;\n\
	padding-top: 0.3em !important;\n\
	margin-bottom: 0.2em !important;\n\
	padding-bottom: 0.3em !important;\n\
}\n\
.bm_MultiColDiv .bm_num {\n\
		font-size: 11pt !important;\n\
		font-weight: bold !important;\n\
}\
';
	/***********************************************************************************
	 * 设置参数
	 ***********************************************************************************/
	// GreaseMonkey 的 getValue() 有一些限制，所以重定义一个 getValue()
	//var getValue = function(n,v){var gmv=isChrome?localStorage.getItem(n):GM_getValue(n);return (gmv==undefined || gmv.length < 1) ? v : gmv;};
	//var setValue = function(n,v){var gmv=isChrome?localStorage.setItem(n,v):GM_setValue(n,v);};
	var getValue, setValue;
	if(isChrome) {
		getValue = function(n, v) {
			var gmv = localStorage.getItem(n);
			return(gmv == undefined || gmv.length < 1) ? v : gmv;
		};
		setValue = function(n, v) {
			var gmv = localStorage.setItem(n, v);
		};
	} else {
		getValue = function(n, v) {
			var gmv = GM_getValue(n);
			return(gmv == undefined || gmv.length < 1) ? v : gmv;
		};
		setValue = function(n, v) {
			var gmv = GM_setValue(n, v);
		};
	}
	var Pref = {
		_: null
		// 分栏数量，默认 2
		,
		columns: Number(getValue('numcol', 2))
		// 搜索结果的排列方向：1-横向；2-纵向（默认）
		,
		direction: Number(getValue('direction', 2))
		// 显示模式：1-紧凑；2-对齐，但比较松散（默认）；3-对齐，但比较松散；4-对齐，但比较松散
		,
		displayMode: Number(getValue('mode', 2))
		// 搜索框浮动，1-顶部；2-底部
		,
		floatInput: toBoolean(getValue('floatInput', false)),
		floatInputPos: Number(getValue('floatInputPos', 1))
		// 是否自动加载下一页，默认 关闭
		,
		AutoNextPage: toBoolean(getValue('AutoNextPage', false)),
		Focus2NextPageKeys: getValue('Focus2NextPageKeys', 'ctrl+40'),
		Focus2PrevPageKeys: getValue('Focus2PrevPageKeys', 'ctrl+38')
		// 是否隐藏自动翻页分隔符，默认 不隐藏
		,
		HideAutoNextPage: toBoolean(getValue('HideAutoNextPage', false))
		// 下一页是否包含相关搜索，默认 不包含
		,
		NextPageWithRS: toBoolean(getValue('NextPageWithRS', false))
		// 让搜索结果适合屏幕宽度，默认 打开
		,
		fitwidth: toBoolean(getValue('fitwidth', true))
		// 移除页面右侧的广告，默认 关闭
		,
		removeAd: toBoolean(getValue('removeAd', false))
		// 给搜索结果条目添加序号，默认 关闭
		,
		addResultNum: toBoolean(getValue('addResultNums', false))
		// 添加缩略图预览，默认 关闭
		,
		addPreview: toBoolean(getValue('addPreviews', false))
		// 缩略图大小，默认 100%
		,
		PreviewSize: Number(getValue('PreviewSize', 100))
		// 添加 Favicon，默认 关闭
		,
		addFavicon: toBoolean(getValue('addFavicons', false))
		// 若没有 Favicon 则显示空白，默认 否
		,
		addFavicon_h: toBoolean(getValue('addFavicons_h', false))
		// 添加“在此站点中搜索”
		,
		searchSite: toBoolean(getValue('searchSite', false))
		// 禁止百度记录我的点击情况，默认 关闭
		,
		DisableTracking: toBoolean(getValue('DisableTracking', false))
		// 快捷键定位到搜索框
		,
		Focus2Keyword: toBoolean(getValue('Focus2Keyword', false)),
		Focus2KeywordKeys: getValue('Focus2KeywordKeys', 'alt+83')
		// 快捷键定位到搜索框后的动作：1-清除全部文字（默认）；2-紧跟文字之后；3-选中全部文字
		,
		Focus2KeywordAction: Number(getValue('Focus2KeywordAction', 1))
		// 在页面上部添加其他搜索引擎
		,
		EnableSearchInOtherEngines: toBoolean(getValue('SearchInOtherEngines', true))
		// 其他搜索引擎地址
		,
		OtherEngines: getValue('OtherEngines', '在Google中搜索【{word}】|http://www.google.com/search?q={word}')
		// 其他搜索引擎打开方式，默认“在新页面打开”
		,
		OtherEnginesTarget: getValue('OtherEnginesTarget', '_blank')
		// 跟随搜索框浮动
		,
		OtherEnginsFloat: toBoolean(getValue('OtherEnginsFloat', false))
		// CSS
		,
		CSS: getValue('CSS', defaultCSS),
		customizeCSS: getValue('customizeCSS', '')
		// 自动检查更新
		,
		lastCheck: Number(getValue('lastCheck', 0)),
		skipVersion: Number(getValue('skipVersion', 0)),
		newVersion: Number(getValue('newVersion', 0))
	};
	/*********************************************************************************************
	 * 开始处理
	 *********************************************************************************************/
	//var t0 = new Date().getTime();
	switch(matchNode('//br[preceding-sibling::table[tbody/tr/td/@class="f"]]').snapshotLength > 0) {
		// 若存在搜索结果
	case true:
		doit();
		// 自动加载下一页
		if(Pref.AutoNextPage) {
			NextPageLink = matchNode('//p[@id="page"]/a[text() = "下一页>"]').snapshotItem(0);
			//alert(NextPageLink.innerHTML);
			//NextPageLink.href = ""
			// 删除第一页的页面导航条
			var nav = matchNode('//p[@id="page"]').snapshotItem(0);
			if(nav) nav.parentNode.removeChild(nav);
			IsLoadingNext = false;
			setTimeout(loadNextPage, 1000);
			window.addEventListener('scroll', watch_scroll, true);
			// 快捷键定位到下一页
			var shift_Next = /shift/.test(Pref.Focus2NextPageKeys);
			var alt_Next = /alt/.test(Pref.Focus2NextPageKeys);
			var ctrl_Next = /ctrl/.test(Pref.Focus2NextPageKeys);
			var tmp = Pref.Focus2NextPageKeys.split('+');
			var keycode_Next = tmp[tmp.length - 1];
			window.addEventListener('keydown', function(event) {
				if((event.altKey == alt_Next) && (event.ctrlKey == ctrl_Next) && (event.shiftKey == shift_Next) && (event.keyCode == keycode_Next) && (event.target.localName != 'INPUT') && !document.getElementById('preferences')) {
					var nextSplit = Pref.HideAutoNextPage ? matchNode('//div[contains(@class,"bm_nextpage")]') : matchNode('//p[contains(@class,"bm_nav")]');
					var i, len = nextSplit.snapshotLength,
						headerOffset = (Pref.floatInput && Pref.floatInputPos == 1) ? document.getElementById('bm_header').offsetHeight : 0;
					for(i = 0; i < len; i++) {
						if(window.scrollY < nextSplit.snapshotItem(i).offsetTop - headerOffset) {
							window.scrollTo(0, nextSplit.snapshotItem(i).offsetTop - headerOffset);
							break;
						}
					}
					event.preventDefault();
					event.stopPropagation();
				}
			}, true);
			// 快捷键定位到上一页
			var shift_Prev = /shift/.test(Pref.Focus2PrevPageKeys);
			var alt_Prev = /alt/.test(Pref.Focus2PrevPageKeys);
			var ctrl_Prev = /ctrl/.test(Pref.Focus2PrevPageKeys);
			tmp = Pref.Focus2PrevPageKeys.split('+');
			var keycode_Prev = tmp[tmp.length - 1];
			window.addEventListener('keydown', function(event) {
				if((event.altKey == alt_Prev) && (event.ctrlKey == ctrl_Prev) && (event.shiftKey == shift_Prev) && (event.keyCode == keycode_Prev) && (event.target.localName != 'INPUT') && !document.getElementById('preferences')) {
					var prevSplit = Pref.HideAutoNextPage ? matchNode('//div[contains(@class,"bm_nextpage")]') : matchNode('//p[contains(@class,"bm_nav")]');
					var i, len = prevSplit.snapshotLength,
						headerOffset = (Pref.floatInput && Pref.floatInputPos == 1) ? document.getElementById('bm_header').offsetHeight : 0;
					for(i = len - 1; i >= 0; i--) {
						if(window.scrollY > prevSplit.snapshotItem(i).offsetTop - headerOffset) {
							window.scrollTo(0, prevSplit.snapshotItem(i).offsetTop - headerOffset);
							break;
						}
					}
					if(i < 0) {
						window.scrollTo(0, 0);
					}
					event.preventDefault();
					event.stopPropagation();
				}
			}, true);
		}
		// 若不存在搜索结果
	case false:
		// 禁止百度记录我的点击情况
		if(Pref.DisableTracking) {
			removeTracking(document.body);
		}
		// 浮动搜索框
		if(Pref.floatInput) {
			floatInput();
		}
		// 设置“相关搜索”提示框的样式
		var tip = matchNode('//div[parent::div[@id="wrapper"] and descendant::td[text() = "相关搜索"]]').snapshotItem(0);
		if(tip) {
			tip.setAttribute('style', 'background-color: rgb(239, 242, 250); height: 60px; width: 100%; clear: both; margin-top: 0.5em;');
		}
		//addPreferences();
		// 添加 “BaiduMonkey 设置”
		//window.addEventListener("load", addPreferences, false);
		document.addEventListener("DOMContentLoaded", setTimeout(addPreferences, 500), false);
		// 添加其他搜索引擎
		if(Pref.EnableSearchInOtherEngines) {
			addSearchInOtherEngines();
		}
		// 快捷键定位到搜索框
		if(Pref.Focus2Keyword) {
			var shift = /shift/.test(Pref.Focus2KeywordKeys);
			var alt = /alt/.test(Pref.Focus2KeywordKeys);
			var ctrl = /ctrl/.test(Pref.Focus2KeywordKeys);
			var tmp = Pref.Focus2KeywordKeys.split('+');
			var keycode = tmp[tmp.length - 1];
			var lastKeyWord = '';
			window.addEventListener('keydown', function(event) {
				if((event.altKey == alt) && (event.ctrlKey == ctrl) && (event.shiftKey == shift) && (event.keyCode == keycode) && (event.target.localName != 'INPUT')) {
					with(document.getElementsByName("wd")[0]) {
						value = value.replace(/\s*$/, '') + ' ';
						focus();
						switch(Pref.Focus2KeywordAction) {
						case 1:
							lastKeyWord = value;
							value = '';
							break;
						case 2:
							break;
						case 3:
							select();
						}
					}
					event.preventDefault();
					event.stopPropagation();
				}
			}, true);
			// 如果已选择“清除全部文字”，那么当输入框失去焦点且没有文字的时候，填入上一次的搜索字词
			if(Pref.Focus2KeywordAction == 1) {
				document.getElementsByName("wd")[0].addEventListener('blur', function(event) {
					var input = event.target;
					if(input.value == '' && lastKeyWord != '') {
						input.value = lastKeyWord;
					}
				}, false);
			}
		}
	}
	/*********************************************************************************************
	 * 各功能函数
	 *********************************************************************************************/
	function doit() {
		var css = '\
				/* 添加圆角效果等 */ \
				.rest {display: ' + (isChrome ? (Pref.columns == 1 ? 'table' : 'inline-table') : 'table') + '; -moz-border-radius: 0.75em;-webkit-border-radius: 0.75em;} .bm_MultiColDiv {padding-right: 0.5em;}\
				/* 添加推广链接内容框的样式 */ \
				#popDiv {border: 1px solid red; -moz-column-count: ' + Pref.columns + '; -moz-column-gap: 0.5em; -webkit-column-count: ' + Pref.columns + '; -webkitcolumn-gap: 0.5em; margin-top: 1em; -moz-border-radius: 0.75em;}\
					/* 让搜索结果条目顶部对齐 */ \
				.f {vertical-align: top;} \
					/* 百度默认的关键字样式 */ \
				.bm_kw {color: #c60a00; font-style: normal;}' +
		// 让搜索结果适合屏幕宽度
		(Pref.fitwidth ? ' .bm_MultiColDiv .f {width: 200em !important;}' : '') +
		// 添加预览缩略图的样式
		(Pref.addPreview ? ' .bm_previewimg {border: 1px solid rgb(187, 187, 187); margin: 2px 4px 5px 0px; width: ' + 111 * Number(Pref.PreviewSize) / 100 + 'px; height: ' + 82 * Number(Pref.PreviewSize) / 100 + 'px; background-position: center center; background-repeat: no-repeat;}' : '') +
		// 添加 favicon 的样式
		(Pref.addFavicon ? ' .bm_favicon {visibility: hidden; margin: 0 4px -3px 0; width: 16px; height: 16px;;}' : '') +
		// 若没有 favicon 则显示空白
		(Pref.addFavicon_h ? '' : '.bm_favicon {display: none;}') +
		// 添加分栏样式
		' .bm_MultiColDiv {-moz-column-count: ' + Pref.columns + '; -moz-column-gap: 0.2em; -webkit-column-count: ' + Pref.columns + '; -webkit-column-gap: 0.2em;}' +
		// 隐藏自动翻页分隔符
		(Pref.HideAutoNextPage ? ' .bm_nav {display: none !important;}' : '') +
		// 添加翻页分隔符的样式
		(Pref.AutoNextPage ? ' .bm_nav {font-size: small; background: rgb(230, 230, 230) none repeat scroll 0% 0%; clear: both; line-height: 20px; text-align: center; margin-top: 0.7em;} .bm_nav .n {font-size: small !important;}' : '') + Pref.CSS + Pref.customizeCSS;
		GM_addStyle(css);
		// 给搜索结果条目添加序号
		if(Pref.addResultNum) {
			addResultNums(document.body);
		}
		// 设置分栏格式
		movePops_and_MultiCol(document.body, pageCount, Pref);
		// 移动贴吧栏目至上部
		var tbAs = matchNode('//a[starts-with(@href, "http://tieba.baidu.com/f?kw=")][parent::td[not(@class="f")]]');
		var biTds = matchNode('//table[@class="bi"]/descendant::td').snapshotItem(1);
		var len = tbAs.snapshotLength;
		if(biTds && len > 0) {
			for(var i = 0; i < len; i++) {
				biTds.appendChild(tbAs.snapshotItem(i));
				biTds.innerHTML += '&nbsp&nbsp&nbsp&nbsp';
			}
		}
		// 去除右侧的广告
		if(Pref.removeAd) {
			//var adTable = matchNode('//table[@width="30%" and @align="right"]').snapshotItem(0);
			var adTable = matchNode('//div[@id="content_right"]').snapshotItem(0);
			var containleft =  matchNode('//div[@id="content_left"]').snapshotItem(0);
			var contain = matchNode('//div[@id="container"]').snapshotItem(0);
			contain.setAttribute("style", "width:100%;padding:0");
			containleft.setAttribute("style", "width:100%;");
			if(adTable) {
				adTable.style.display = 'none';
			}

		}
		// 添加缩略图预览
		if(Pref.addPreview) {
			addPreviews(document.body);
		}
		// 添加站点 Favicon
		if(Pref.addFavicon) {
			addFavicons(document.body);
		}
		// 添加“在此站点中搜索”
		if(Pref.searchSite) {
			addseatchSite(document.body);
		}
		// 统一格式，美化版面
		// 只有一列或者“紧凑”模式时不需要统一格式
		if(Pref.columns > 1 && Pref.displayMode > 1) {
			format('bm_page_' + pageCount, Pref);
		}
		// 把关键字放到<em>标签中，以便控制样式
		var kw, kws = matchNode('//font[@color="#c60a00"]');
		len = kws.snapshotLength;
		for(var i = 0; i < len; i++) {
			kw = kws.snapshotItem(i);
			var em = document.createElement('em');
			em.innerHTML = kw.innerHTML;
			em.setAttribute('class', 'bm_kw');
			kw.parentNode.replaceChild(em, kw);
		}
	}
	// 用 XPath 匹配元素
	function matchNode(xpath, context) {
		return document.evaluate(context ? (xpath.indexOf('.') == 0 ? xpath : '.' + xpath) : xpath, context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	// 添加 “BaiduMonkey 设置”
	function addPreferences() {
		var titDiv = matchNode('//div[@id="u"]').snapshotItem(0);
		titDiv.innerHTML = titDiv.innerHTML + " |";
		//var titDiv = matchNode('//div[@id="u"]/a[@class="last"]').snapshotItem(0);        
		if(titDiv) {
			// var li = document.createElement('li');
			var preferences = document.createElement('a');
			with(preferences) {
				setAttribute('href', 'javascript: void(0);');
				setAttribute('class', 'last');
				//setAttribute('style', 'margin-left: 0.7em;');
				innerHTML = 'BM 设置';
				addEventListener('click', function() {
					SetPreferences();
				}, false);
			}
			var abc = preferences.outerHTML;
			//preferences.outerHTML = abc +"|";
			// li.appendChild(preferences);
			//alert(titDiv.innerHTML);
			//titDiv.parentNode.insertBefore(preferences, titDiv);      
			titDiv.appendChild(preferences);
			//alert(1);          
		}
	}
	// 浮动搜索框
	function floatInput() {
		var css, header = matchNode('//div[@id="head"]').snapshotItem(0);
		var headerContainer = document.createElement('div');
		header.parentNode.insertBefore(headerContainer, header);
		with(headerContainer) {
			setAttribute('id', 'bm_header');
			switch(Pref.floatInputPos) {
			case 1:
				// 顶部
				var rplheader = document.createElement('div');
				headerContainer.parentNode.insertBefore(rplheader, headerContainer);
				appendChild(header);
				if(Pref.OtherEnginsFloat) {
					var bi = matchNode('//div[@id="tool"]').snapshotItem(0);
					appendChild(bi);
					rplheader.style.height = header.offsetHeight + bi.offsetHeight + 'px';
					css = '#bm_header {position: fixed; top: 0px; width: 100%; background-color: white; z-index: 100;}';
				} else {
					rplheader.style.height = headerContainer.offsetHeight - 3 + 'px';
					css = '#bm_header {position: fixed; top: 0px; width: 100%; background-color: white; border-bottom: 1px solid blue; z-index: 100;}';
				}
				break;
			case 2:
				// 底部
				var rplheader = document.createElement('div');
				var tmp = matchNode('//div[@id="search" and descendant::form[@name="f2"]]').snapshotItem(0).nextSibling;
				tmp.parentNode.insertBefore(rplheader, tmp);
				if(Pref.OtherEnginsFloat) {
					var bi = matchNode('//div[@id="tool"]').snapshotItem(0);
					appendChild(bi);
					appendChild(header);
					rplheader.style.height = header.offsetHeight + bi.offsetHeight + 'px';
					css = '#bm_header {position: fixed; bottom: 0px; width: 100%; background-color: white; border-top: 1px solid blue; z-index: 100;}';
				} else {
					appendChild(header);
					rplheader.style.height = headerContainer.offsetHeight + 'px';
					css = '#bm_header {position: fixed; bottom: 0px; width: 100%; background-color: white; border-top: 1px solid blue; z-index: 100;}';
				}
				break;
			}
		}
		GM_addStyle(css);
	}
	// 添加 其他搜索引擎
	function addSearchInOtherEngines() {
		var div = matchNode('//span[@class="tools"]/span[@class="shouji"]').snapshotItem(0);
		var divad = matchNode('//span[@class="tools"]/span[@class="shouji"]/a[@target="_blank"]').snapshotItem(0);
		divad.parentNode.removeChild(divad);
		if(div) {
			//    div.style.display='none'; // 将 div 隐藏，避免浏览器频繁重绘。最后将 div 设为可见。
			var keyword = document.getElementsByName('wd')[0].value;
			var keywordGB = String(document.body.innerHTML.match(/word=[^'"&]+['"&]/i)).replace(/word=|['"&]/ig, '');
			var engines = Pref.OtherEngines.split(/\n/);
			for(i = 0; i < engines.length; i++) {
				var engine = engines[i].split('|');
				if(engine.length > 1) {
					var searchEngine = document.createElement('a');
					searchEngine.setAttribute('href', engines[i].replace(engine[0] + '|', '').replace(/{word}/ig, encodeURIComponent(keyword)).replace(/{gb:word}/ig, keywordGB));
					searchEngine.setAttribute('target', Pref.OtherEnginesTarget);
					searchEngine.innerHTML = engine[0].replace(/{word}|{gb:word}/ig, keyword.replace('<', '&lt;').replace('>', '&gt;'));
					if(engines.length > 1) div.appendChild(document.createTextNode(' | '));
					div.appendChild(searchEngine);
				}
			}
			//    div.style.display='';
		}
	}
	// 给搜索结果条目添加序号
	function addResultNums(doc) {
		var resTds = matchNode('//td[@class="f" and (child::a or child::font/a) and not(descendant::a[text() = "推广"])]', doc);
		for(var i = 0; i < resTds.snapshotLength; i++) {
			var num = document.createElement('span');
			num.setAttribute('class', 'bm_num');
			num.innerHTML = '&nbsp;' + (ResultNum++) + '&nbsp;';
			var resTd = resTds.snapshotItem(i);
			resTd.insertBefore(num, resTd.firstChild);
		}
	}
	function isAmazonCOM(href) {
		return href.toLowerCase().indexOf("www.amazon.com") == 7;
	}
	function getASIN(href) {
		var asin = href.match(/amazon.+\W+([0-9A-Z]{10})(\W+|$)/i);
		return asin ? asin[1] : null;
	}
	function getFullDomain(href) {
		var domain = href.match(/http(?:s)?:\/\/[^\/]+/i);
		return domain ? domain[0].toLowerCase() : href;
	}
	function getGPSub(href) {
		var site = getFullDomain(href);
		site = site.toLowerCase();
		if(site.indexOf("https://") == 0) {
			site = site.substring(8, site.length);
		} else if(site.indexOf("http://") == 0) {
			site = site.substring(7, site.length);
		}
		if(site.indexOf("www.") == 0) {
			site = site.substring(4, site.length);
		}
		return site.length > 0 ? "" + site.charAt(0) : "a";
	}
	// 根据站点根域名的首字母分配 googlepreview 服务器，分散服务器压力
	function getImageURL(href) {
		var fullDomain = getFullDomain(href);
		var protocol = "unknown";
		var site = fullDomain;
		if(site.indexOf("http://") == 0) {
			site = site.substring(7, site.length);
			protocol = "http://";
		} else if(site.indexOf("https://") == 0) {
			site = site.substring(8, site.length);
			protocol = "https://";
		}
		var preview = "http://" + getGPSub(site) + ".googlepreview.com/preview?s=" + protocol + site + "&ra=1";
		if(!isAmazonCOM(href)) {
			return preview;
		}
		var isbn = getASIN(href);
		if(isbn != null) {
			if(isAmazonCOM(href)) {
				return "http://images.amazon.com/images/P/" + isbn + ".01.TZZZZZZZ.jpg";
			}
		}
		return preview;
	}
	// 将字符串转换为二进制，否则 btoa() 方法出错
	function data_string(data) {
		var data_string = '';
		for(var i = 0, il = data.length; i < il; i++)
		data_string += String.fromCharCode(data[i].charCodeAt(0) & 0xff);
		return data_string;
	};
	/*
	 * googlepreview 会检查 img 请求的 Referer ，如果发现不是来自 google 站点，则会返回 stop 的图片。
	 * 所以需要用 xmlhttpRequest 发出请求，避免 Referer 。
	 * 异步请求并得到图片的 base64 编码。（跨域获得图片的方法参见 Cross Domain Images in Userscript，http://pastebin.ca/1425789）
	 */
	function getImg(img, imgUrl) {
		GM_xmlhttpRequest({
			method: "GET",
			url: imgUrl,
			overrideMimeType: 'text/plain; charset=x-user-defined',
			onload: function(rsp) {
				img.src = 'data:image/jpg;base64,' + btoa(data_string(rsp.responseText));
			}
		});
	}
	// 添加缩略图预览。先使用 thumbshots.org 的服务，如果不能访问则使用 googlepreview 的服务（提取自 googlepreview 扩展，部分修改）。
	function addPreviews(doc) {
		// var resLinks = matchNode('//td[@class="f" and (child::a or child::font/a) and not(descendant::a[text() = "推广"])]/a', doc);
		var resLinks = matchNode("//table/tbody/tr/td[@class='f']/h3/a", doc);
		var i, len = resLinks.snapshotLength;
		for(i = 0; i < len; i++) {
			var resLink = resLinks.snapshotItem(i);
			var a = document.createElement('a');
			a.setAttribute('target', '_blank');
			a.setAttribute('href', resLink.href);
			var imgBlank = document.createElement('img');
			with(imgBlank) {
				setAttribute('class', 'bm_previewimg');
				setAttribute('align', 'left');
				src = "data:image/gif;base64,R0lGODlhbwBSAKIAAMzMzP///+Xl5e/v79XV1d/f3/n5+QAAACH5BAAHAP8ALAAAAABvAFIAAAP/GLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd/wMOA8ZRg9l06nGAIHgiMwMNwFBMmnIjpYBjsEApIQyO4KggHBICgoxtCujjs2EAQBwPWjPbt3BgD0HWdyoWJ7SHsFYnMedWp1YkYBhYVPUIVEYmN6cIccfF1qCgBHO2JykYZMQAByBZ+ZmgUFdYmVXGdmkU9ZmK5+rJpOvD2Jv8IUs8M4vsYiZL5ITklhTFFwTQtQBsjJE4xlXWF8AFq4AlxyXrpvldkWkApu7XKr3H3loWOzpeoTwfjwU5j9i8IVKZYvQpprcY6Q8+epT0BOjmoVlPBqjJ8spxjO62So/9K4iS+WpAHZoqJEkihTquxAJko0Xy2L6HC5ssKdAWbGbfGjQ45OfDUn5KniackYdmBGjgrqY5yZpeGcQfnH1GbDOnme1NKitCoxLwHcgHWEy1Yfr2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx58qCU2Dj8iNDl8IXEMVXtWefgIAVwWApIzbHpBeQrBDZ0dAPAV+tfoBpjcgPOlSs8CVW/gUBZlMQ4znwLAhcVcZ6SjZlNQmXEXthZxlksb5Jl2msBwPh/z/OEy4HTuU6TZcPnhunrPd91u/Xhl+0m8zxqqV7tMppirPEvUJ9L10dWQb5cxA9nESIcu669m8IFOTwbo4gocmyG21DXedabTUuqddsuE+YGlxxALbJJbfnCcswN++V3DhhvwgRCMJ2u8VkCJTNDj2YS6tIOiAxoWE99oo3wDU1iXdIPeBt5V88lyLX74nGzb6fZRkEFKyMAmRLrxj3NnIAlEbmf0lqAHsqzWDm+soYKJI+DQdw+YMzawmWquKaCKExqiUhuWLVoRwjV2WgCNVoLlBkVmgA2SJ2GEFmrooYgmqlICADs=";
			}
			var img = document.createElement('img');
			with(img) {
				setAttribute('class', 'bm_previewimg');
				setAttribute('title', '');
				setAttribute('align', 'left');
				setAttribute('src', 'http://open.thumbshots.org/image.pxf?url=' + resLink.href);
				style.display = 'none';
				addEventListener("load", function(e) {
					// 先移除空白图，再显示出真正的缩略图
					e.target.parentNode.removeChild(e.target.previousSibling);
					e.target.style.display = '';
				}, false);
				if(!isChrome) {
					addEventListener("error", function(e) {
						e.target.style.border = '1px solid blue';
						getImg(e.target, getImageURL((e.target.src.match(/\?url=.*/i) + '').replace(/\?url=/ig, '')));
					}, false);
				}
			}
			a.appendChild(imgBlank);
			a.appendChild(img);
			resLink.parentNode.insertBefore(a, resLink);
		}
	}
	// 添加站点 Favicon
	function addFavicons(doc) {
		//var resLinks = matchNode('//td[@class="f" and (child::a or child::font/a) and not(descendant::a/font[text() = "推广"])]/a[not(descendant::img])]', doc);
		var resLinks = matchNode("//table/tbody/tr/td[@class='f']/h3/a[not(descendant::img)]", doc);
		//alert(resLinks.snapshotLength);
		var i, len = resLinks.snapshotLength;
		for(i = 0; i < len; i++) {
			var resLink = resLinks.snapshotItem(i);
			resLink.setAttribute("style", "");
			resLink.setAttribute("class", "");
			var base = resLink.href.match(/http:\/\/[\w\.\-]+\/|https:\/\/[\w\.\-]+\//);
			var img = document.createElement('img');
			with(img) {
				setAttribute('class', 'bm_favicon');
				addEventListener("load", function(e) {
					e.target.style.display = 'inline';
					e.target.style.visibility = 'visible';
				}, false);
				src = base + 'favicon.ico';
			}
			resLink.parentNode.insertBefore(img, resLink);
		}
	}
	// 添加“在此站点中搜索”
	function addseatchSite(doc) {
		if(location.href.indexOf(escape('site:')) >= 0) {
			return; // 如果已经是 site： 搜索了则退出
		}
		// 将点击搜索按钮的 Javascript 添加到 head 中
		if(!document.getElementById('ClickSearchBtnJS')) {
			var head = document.getElementsByTagName("head")[0];
			var ClickSearchBtnJS = document.createElement('script');
			with(ClickSearchBtnJS) {
				setAttribute('id', 'ClickSearchBtnJS');
				type = "application/x-javascript";
				innerHTML = '\
			function searchSite(url){\
				document.forms[0].wd.value += " site:" + url;\
				document.forms[0].submit();\
			}';
			}
			head.appendChild(ClickSearchBtnJS);
		}
		var cacheLinks = matchNode('//a[text() = "百度快照"]', doc);
		var i, len = cacheLinks.snapshotLength;
		for(i = 0; i < len; i++) {
			try {
				var cacheLink = cacheLinks.snapshotItem(i);
				var site = cacheLink.previousSibling.previousSibling.innerHTML.replace(/<[^>]*>/ig, '').split('/')[0];
				var a = document.createElement('a');
				with(a) {
					innerHTML = '在此站点中搜索';
					setAttribute('class', 'm');
					setAttribute('title', '在 ' + site + ' 中搜索');
					setAttribute('href', 'javascript:searchSite("' + site + '")');
				}
				cacheLink.parentNode.insertBefore(a, cacheLink.nextSibling);
				cacheLink.parentNode.insertBefore(document.createTextNode(' - '), cacheLink.nextSibling);
			} catch(e) {}
		}
	}
	// 禁止百度记录我的点击情况
	function removeTracking(doc) {
		var links = matchNode('//table[@class="rest"]/descendant::a[string-length(@onmousedown)>0]', doc);
		var i, len = links.snapshotLength;
		for(i = 0; i < len; i++) {
			links.snapshotItem(i).removeAttribute('onmousedown');
		}
	}
	// 分栏
	function movePops_and_MultiCol(doc, pagecount, Pref) {
		var i, len;
		// 去除没用的 <br>
		var Brs = matchNode('//br[preceding-sibling::table[tbody/tr/td[contains(@class,"f ") or @class="f"]]]', doc);
		len = Brs.snapshotLength;
		for(i = 0; i < len; i++) {
			Brs.snapshotItem(i).style.display = 'none';
		}
		// 在第一个条目前插入一个 DIV ，id = bm_page_1,2,3,etc，用来容纳搜索结果条目。
		var firstTable = matchNode('//table[tbody/tr/td/@class="f"]', doc).snapshotItem(0);
		var resContainer = document.createElement('div');
		resContainer.setAttribute('id', 'bm_page_' + pagecount);
		firstTable.parentNode.insertBefore(resContainer, firstTable);
		// 移动“推广”条目
		var popTables1 = matchNode('//table[@class="EC_mr15"]', doc);
		len = popTables1.snapshotLength;
		if(len > 0) {
			// popContainer 用来盛放推广条目，将它添加在搜索结果 DIV 之前
			for(i = 0; i < len; i++) {
				var popTable = popTables1.snapshotItem(i);
				// popTable.parentNode.removeChild(popTable); // 移动结果 Table
			}
		}
		// 移动搜索结果条目
		resContainer.setAttribute('id', 'bm_page_' + pagecount);
		// 如果打开了设置界面，那么不添加 class ，使得设置界面中的预览能够正常变化
		if(!document.getElementById('preferences')) resContainer.setAttribute('class', 'bm_MultiColDiv');
		//    var resTables = matchNode('//table[tbody/tr/td/@class="f"][not(descendant::a[text() = "推广"])]', doc);
		var resTables = matchNode('//table[floor(@id div 1) = ceiling(@id div 1) or tbody/tr/td/@class="f"][not(descendant::a[text() = "推广"])][not(@class = "EC_mr15")]', doc);
		len = resTables.snapshotLength;
		if(len > 0) {
			var cols = Pref.columns;
			var resTable;
			// 设置搜索结果的排列方向。1-横向；2-纵向
			switch(Pref.direction) {
			case 1:
				for(var j = 0; j < cols; j++) {
					for(i = j; i < len; i += cols) {
						resTable = resTables.snapshotItem(i);
						resTable.setAttribute('class', 'rest');
						resContainer.appendChild(resTable); // 移动结果 Table
					}
				}
				break;
			case 2:
				for(i = 0; i < len; i++) {
					resTable = resTables.snapshotItem(i);
					resTable.setAttribute('class', 'rest');
					resContainer.appendChild(resTable); // 移动结果 Table
				}
				break;
			}
		}
		// 移动“推广”条目
		var popTables = matchNode('//table[(tbody/tr/td[(contains(@class,"f ") or @class="f") and descendant::a[text() = "推广"]]) or @class="EC_mr15" ]', doc);
		len = popTables.snapshotLength;
		if(len > 0) {
			// popContainer 用来盛放推广条目，将它添加在搜索结果 DIV 之前
			var popContainer = document.createElement('div');
			resContainer.parentNode.insertBefore(popContainer, resContainer);
			var popContainerTable = document.createElement('table');
			popContainerTable.innerHTML = '<span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a id="togglePops" href="javascript: void(0);"><font size="-1">共有' + len + '条推广链接，点此 显示/隐藏 </font></a><br><div id="popDiv" class="bm_MultiColDiv"></div><br>';
			popContainer.appendChild(popContainerTable);
			var popDiv = document.getElementById('popDiv');
			popDiv.style.display = 'none';
			// 添加显示、隐藏“推广”条目的事件
			document.getElementById('togglePops').addEventListener('click', function() {
				popDiv.style.display = popDiv.style.display == 'none' ? '' : 'none';
			}, false);
			for(i = 0; i < len; i++) {
				var popTable = popTables.snapshotItem(i);
				popTable.setAttribute('class', 'rest');
				popTable.setAttribute("style", "width:98%");
				popDiv.appendChild(popTable); // 移动结果 Table
			}
		}
	}
	// 统一格式，美化版面
	function format(id, Pref) {
		var i, j, len;
		var resContainer = document.getElementById(id);
		var resTables = matchNode('//div[@id="' + id + '"]/table[@class="rest" or @class="plus"]');
		len = resTables.snapshotLength;
		if(len > 0) {
			switch(Pref.displayMode) {
			case 1:
				break;
			case 2:
				/*
				 * 由于使用的 -moz-column-count 样式分列，为了保持每一列顶部对齐，必须使得每列所包含的 child 数量一样，所以要插入 plusNum 个 table 充数
				 */
				var modNum = len % Pref.columns;
				if(modNum > 0) {
					// plusNum 为统一格式而补充的 table 数量; insertIndex 为需要插入补充 table 的位置
					var plusNum = Pref.columns - modNum;
					var insertIndex = Math.floor(len / Pref.columns);
					for(i = 0; i < plusNum; i++) {
						var plustable = document.createElement('table');
						plustable.setAttribute('class', 'plus');
						plustable.innerHTML = '<br />';
						resContainer.insertBefore(plustable, resTables.snapshotItem(len - 1 - insertIndex * i).nextSibling);
					}
				}
				break;
			case 3:
				/*
				 * 由于使用的 -moz-column-count 样式分列，为了保持每一列顶部对齐，必须使得每列所包含的 child 数量一样，所以要插入 plusNum 个 table 充数
				 */
				var modNum = len % Pref.columns;
				if(modNum > 0) {
					// plusNum 为统一格式而补充的 table 数量; insertIndex 为需要插入补充 table 的位置
					var plusNum = Pref.columns - modNum;
					var insertIndex = Math.floor(len / Pref.columns);
					for(i = 1; i <= plusNum; i++) {
						var plustable = document.createElement('table');
						plustable.setAttribute('class', 'plus');
						plustable.innerHTML = '<br />';
						resContainer.insertBefore(plustable, resTables.snapshotItem(insertIndex * i));
					}
				}
				break;
			case 4:
				/*
				 * 由于使用的 -moz-column-count 样式分列，为了保持每一列顶部对齐，必须使得每列所包含的 child 数量一样，所以要插入 plusNum 个 table 充数
				 */
				var modNum = len % Pref.columns;
				if(modNum > 0) {
					// plusNum 为统一格式而补充的 table 数量。这些 table 将补充在末尾。
					var plusNum = Pref.columns - modNum;
					for(i = 0; i < plusNum; i++) {
						var plustable = document.createElement('table');
						plustable.setAttribute('class', 'plus');
						plustable.innerHTML = '<br />';
						resContainer.appendChild(plustable);
					}
				}
				break;
			}
			var Highest, height, isDiff;
			var tables = matchNode('//div[@id="' + id + '"]/table[@class="rest" or @class="plus"]');
			len = tables.snapshotLength;
			var rows = len / Pref.columns;
			var modTables = [];
			for(j = 0; j < rows; j++) {
				isDiff = false;
				Highest = tables.snapshotItem(j).offsetHeight;
				// 找出同一行 table 中的最大高度
				for(i = j + rows; i < len; i += rows) {
					height = tables.snapshotItem(i).offsetHeight;
					GM_log(j+":Highest:"+Highest+"\n"+i+":height:"+height);
					if(height != Highest) {
						isDiff = true;
						if(height > Highest) {
							Highest = height;
						}
					}
				}
				if(isDiff == true) {
					// 将需要改变高度的 table 和其所需高度放入数组中
					for(i = j; i < len; i += rows) {
						var tmp = [];
						tmp.push(tables.snapshotItem(i));
						tmp.push(Highest);
						modTables.push(tmp);
					}
				}
			}
			// 让同一行的 table 具有相同的高度
			len = modTables.length;
			resContainer.style.display = 'none';
			for(i = 0; i < len; i++) {
				modTables[i][0].setAttribute('style', 'height: ' + (modTables[i][1]) + 'px !important;');
			}
			resContainer.style.display = '';
		}
	}
	// 向 head 中添加 CSS 样式
	function addCSS(cssString) {
		var head = document.getElementsByTagName("head")[0];
		var css = document.createElement('style');
		css.innerHTML = cssString;
		head.appendChild(css);
		return css;
	}
	// CSS 样式设置有选项变动时，更新预览效果
	function cssOnChange(input) {
		var i, len, cInput;
		var css = [];
		var inputs = matchNode('//input[@class="' + input.className + '"]');
		len = inputs.snapshotLength;
		for(i = 0; i < len; i++) {
			cInput = inputs.snapshotItem(i);
			if(cInput.value) {
				css.push('    ' + cInput.name + ': ' + cInput.value + ' !important;');
			}
		}
		var textarea = matchNode('//textarea[@id="' + input.className + '_gen"]').snapshotItem(0);
		if(css.length == 0) { // 如果没有 CSS 设置，则清空 textarea
			textarea.innerHTML = textarea.value = ''; // 赋值 innerHTML 是为了可以使用 XPath
		} else {
			switch(input.className) {
			case 'css_holder':
				css.unshift('.rest {');
				break;
			case 'css_counter':
				css.unshift('.bm_num {');
				break;
			case 'css_keyword':
				css.unshift('.bm_kw {');
				break;
			}
			css.push('}');
			textarea.innerHTML = textarea.value = css.join('\n'); // 赋值 innerHTML 是为了可以使用 XPath
		}
		prefOnChange();
	}
	// 设置界面有选项变动时，更新预览效果
	var previewCss;
	function prefOnChange() {
		var i, len;
		var numcol = document.getElementById('numcol');
		var direction = document.getElementById('direction');
		var mode = document.getElementById('mode');
		var bm_pref_Pref = {
			// 分栏数量，默认 2
			columns: Number(numcol.options[numcol.selectedIndex].value)
			// 搜索结果的排列方向：1-横向；2-纵向（默认）
			,
			direction: Number(direction.options[direction.selectedIndex].value)
			// 显示模式：1-紧凑；2-对齐，但比较松散（默认）；3-对齐，但比较松散；4-对齐，但比较松散
			,
			displayMode: Number(mode.options[mode.selectedIndex].value)
			// 给搜索结果条目添加序号，默认 关闭
			,
			addResultNum: document.getElementById('addResultNums').checked
			// 添加缩略图预览，默认 关闭
			,
			addPreview: document.getElementById('addPreviews').checked
			// 缩略图大小，默认 100%
			,
			PreviewSize: isNaN(document.getElementById('PreviewSize').value) ? '100' : document.getElementById('PreviewSize').value
			// 添加站点 Favicon，默认 关闭
			,
			addFavicon: document.getElementById('addFavicons').checked
			// 让搜索结果适合屏幕宽度，默认 关闭
			,
			fitwidth: document.getElementById('fitwidth').checked
			// 添加“在此站点中搜索”
			,
			searchSite: document.getElementById('searchSite').checked
		}
		// 阅读方向为“横向”时，排版模式将固定为“紧凑”或“对齐1”
		if(bm_pref_Pref.direction == 1 && bm_pref_Pref.displayMode > 2) {
			bm_pref_Pref.displayMode = 2;
			document.getElementById('mode').options[1].selected = true;
		}
		// 获取 CSS 设置
		var css = '';
		var textareas = matchNode('//textarea[string-length(text())>0 and ancestor::table[@class="bm_pref_css"]]');
		len = textareas.snapshotLength;
		for(i = 0; i < len; i++) {
			css += '#bm_pref_gui ' + textareas.snapshotItem(i).value + '\n';
		}
		css += '#bm_pref_gui ' + document.getElementById('customizeCSS').value;
		if(previewCss) previewCss.parentNode.removeChild(previewCss);
		previewCss = addCSS(css);
		var bm_pref_res = document.getElementById('bm_pref_res').cloneNode(true);
		bm_pref_res.removeAttribute('style');
		var resLinks = matchNode('//td[@class="f"][not(descendant::a[text() = "推广"])]/a', bm_pref_res);
		var bm_pref_ResultNum = 1;
		for(var i = 0; i < resLinks.snapshotLength; i++) {
			var resLink = resLinks.snapshotItem(i);
			// 添加缩略图预览
			if(bm_pref_Pref.addPreview) {
				var div = document.createElement('div');
				div.setAttribute('style', 'border: 1px solid rgb(187, 187, 187); float: left; margin: 2px 4px 5px 0px; width: ' + 111 * Number(bm_pref_Pref.PreviewSize) / 100 + 'px; height: ' + 82 * Number(bm_pref_Pref.PreviewSize) / 100 + 'px; background-color: rgb(170, 170, 170);');
				resLink.parentNode.insertBefore(div, resLink);
			}
			// 给搜索结果条目添加序号
			if(bm_pref_Pref.addResultNum) {
				var num = document.createElement('span');
				num.setAttribute('class', 'bm_num');
				num.innerHTML = '&nbsp;' + (bm_pref_ResultNum++) + '&nbsp;';
				resLink.parentNode.insertBefore(num, resLink);
			}
			// 添加站点 Favicon
			if(bm_pref_Pref.addFavicon) {
				var div = document.createElement('div');
				div.setAttribute('style', 'border: 1px solid rgb(187, 187, 187); margin: 3px 4px -3px 0px; width: 16px; height: 16px; background-color: rgb(170, 170, 170); display: inline-block;');
				resLink.parentNode.insertBefore(div, resLink);
			}
		}
		// 添加“在此站点中搜索”
		if(bm_pref_Pref.searchSite) {
			var cacheLinks = matchNode('//a[text() = "百度快照"]', bm_pref_res);
			len = cacheLinks.snapshotLength;
			for(i = 0; i < len; i++) {
				var cacheLink = cacheLinks.snapshotItem(i);
				var a = document.createElement('a');
				with(a) {
					innerHTML = '在此站点中搜索';
					setAttribute('class', 'm');
					setAttribute('href', 'javascript: void(0);');
				}
				cacheLink.parentNode.insertBefore(a, cacheLink.nextSibling);
				cacheLink.parentNode.insertBefore(document.createTextNode(' - '), cacheLink.nextSibling);
			}
		}
		// 适合宽度
		var divs = matchNode('//td[@class="f"]', bm_pref_res);
		len = divs.snapshotLength;
		for(i = 0; i < len; i++) {
			if(bm_pref_Pref.fitwidth) {
				divs.snapshotItem(i).setAttribute('style', 'width: 200em !important;');
			} else {
				divs.snapshotItem(i).setAttribute('style', 'width: 32em !important;');
			}
		}
		// 设置分栏格式
		movePops_and_MultiCol(bm_pref_res, 'pref', bm_pref_Pref);
		// 先清除现有的预览效果
		var div = matchNode('//div[@id="bm_pref_res" and not(contains(@style,"display:"))]').snapshotItem(0);
		if(div) div.parentNode.removeChild(div);
		// 添加新的预览效果
		document.getElementById('bm_pref_preview').appendChild(bm_pref_res);
		// 设置分栏数量
		var bm_pref_container = document.getElementById('bm_page_pref');
		bm_pref_container.setAttribute('style', '-moz-column-count: ' + bm_pref_Pref.columns + '; -moz-column-gap: 0.2em; -webkit-column-count: ' + bm_pref_Pref.columns + '; -webkit-column-gap: 0.2em;');
		// 统一格式，美化版面
		format('bm_page_pref', bm_pref_Pref);
	}
	// 添加 CSS 样式候选项
	var lstVL = null;
	function addList(target, options, style) {
		if(!target || !options) return;
		if(lstVL != null) {
			lstVL.parentNode.removeChild(lstVL);
			lstVL = null;
			return;
		}
		var input;
		var lst = document.createElement("div");
		lst.className = "virtual-list";
		if(target.nodeName.toUpperCase() == "INPUT") {
			input = target;
			lst.style.marginTop = input.offsetHeight + "px";
		} else {
			input = target.previousSibling;
			lst.style.marginLeft = -(input.offsetWidth) + "px";
		}
		lst.style.minWidth = (target.offsetWidth + input.offsetWidth - 4) + "px";
		lstVL = lst;
		var setVal = function(ev) {
				input.value = ev.target.innerHTML;
				input.focus();
				input.blur();
				lstVL.parentNode.removeChild(lstVL);
				lstVL = null;
				cssOnChange(input);
			};
		var db = options.split(",");
		var len = db.length;
		for(var x = 0; x < len; x++) {
			var p = document.createElement("span");
			p.innerHTML = db[x];
			p.addEventListener("click", setVal, false);
			if(input.value == db[x]) p.className = "selected";
			lst.appendChild(p);
		}
		target.appendChild(lst);
		return false;
	};
	function getColor(ev) {
		var x = ev.layerX - 10,
			y = ev.layerY - 10;
		var Rmx = 0,
			Gmx = 0,
			Bmx = 0;
		if(y <= 32) {
			Rmx = 255;
			Gmx = (y / 32) * 255;
			Bmx = 0;
		} else if(y <= 64) {
			y = y - 32;
			Rmx = 255 - (y / 32) * 255;
			Gmx = 255;
			Bmx = 0;
		} else if(y <= 96) {
			y = y - 64;
			Rmx = 0;
			Gmx = 255;
			Bmx = (y / 32) * 255;
		} else if(y <= 128) {
			y = y - 96;
			Rmx = 0;
			Gmx = 255 - (y / 32) * 255;
			Bmx = 255;
		} else if(y <= 160) {
			y = y - 128;
			Rmx = (y / 32) * 255;
			Gmx = 0;
			Bmx = 255;
		} else {
			y = y - 160;
			Rmx = 255;
			Gmx = 0;
			Bmx = 255 - (y / 32) * 255;
		};
		var r, g, b;
		if(x <= 50) {
			r = Math.abs(Math.floor(Rmx * x / 50));
			g = Math.abs(Math.floor(Gmx * x / 50));
			b = Math.abs(Math.floor(Bmx * x / 50));
		} else {
			x -= 50;
			r = Math.abs(Math.floor(Rmx + (x / 50) * (255 - Rmx)));
			g = Math.abs(Math.floor(Gmx + (x / 50) * (255 - Gmx)));
			b = Math.abs(Math.floor(Bmx + (x / 50) * (255 - Bmx)));
		};
		r = r > 255 ? 255 : r;
		g = g > 255 ? 255 : g;
		b = b > 255 ? 255 : b;
		var c = "#";
		c += Math.floor(r / 16).toString(16);
		c += (r % 16).toString(16);
		c += Math.floor(g / 16).toString(16);
		c += (g % 16).toString(16);
		c += Math.floor(b / 16).toString(16);
		c += (b % 16).toString(16);
		return c.toUpperCase();
	};
	function addColorPicker(target) {
		var cp = document.getElementById("colorpicker");
		if(cp) {
			cp.parentNode.removeChild(cp);
			return;
		}
		cp = document.createElement("div");
		cp.id = "colorpicker";
		var input;
		if(target.nodeName.toUpperCase() == "INPUT") {
			input = target;
			cp.style.marginTop = input.offsetHeight + "px";
		} else {
			input = target.previousSibling;
			cp.style.marginLeft = "-100px";
		}
		var pre = document.createElement("span");
		var img = document.createElement("img");
		with(img) {
			src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADACAIAAAB9DVH7AAAABGdBTUEAALGPC/xhBQAAAAd0SU1FB9IIDwckH4KetsUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAsdEVYdENyZWF0aW9uIFRpbWUAVGh1IDE1IEF1ZyAyMDAyIDE5OjM0OjU1ICsxMjAwuqQvdAAABmlJREFUeNrtneGJHEcUhIWw4QQS7P3TDycgcAICRyBwAgJHIByBUAbCEQhnIGcghyBnIIdwCzJIYIOFxPT8ebd1Va97unt2a6hfu7Nzs9PfvVdTM9tz/15ZrooeFz0pelr0rOh50Yuil0Wvi94UvS16V/S+6EPRTdH/UQ+vFv3weNGPTxb99HTRz88W/fJ80a8vFr16uei314t+f7Poj7eL/ny36K/3i/7+sOjm5qu+LffveaEX7mB9R+iK0ENCB0WPisAGHxSBHfu+6NS3Ew6Wl5MHa1qO1k8BoNa/DoBivmD+39DL3QdrNsSui5gNMjsmImaycmRNwtF1ENPycqUqNsEG1sHLSJ/16LS26481xctkTemzIj6VPgsAxezYnX7dPmtun7U2puY+S+qPoFHaZ+3BZ63jxgz7dj6rnV93zTqPPKvSZ4ENMnmWfdZ8PguMGzPsa2Gq5EjKRZ1nTeyzVhOcs/LNI9OclbfP2nmeJZ0SAp/VlyPXrJ4+C5yvM+diPX2W86wLyLOAmvusLYuXyRqbZzGlqnlk6uuG++yGQ8qZJPusnZN1evncSMegVlue6GCZrAw1n4riKyss6x2k8ZWoI6E+9JmsRmSB4w04AmUorszgE1n7FLS+VckRRsxk1ZEVjy7DEaAmIrZdzQL0SazdipjJ2sw6gBGQ+mOsYkzNqqxQ68fJCuWatRlZkQjwFsMRU8WYmhUrlMQaQMzdcHTNyvVHQITks4Bxl3pfRMw1awOypHYG1pHQyNUsaR1p57H/MllD86zKkYyMNEHDedbceVau1wBqbghJbTHXnZ1nTZNnSYiBxsQkCgxHOcTA9zJZffMsMEqAGulMkKlZoGNKiDnP2lWexUSUADpQs0AGm2t5Pjcc3Q1zASnIGGLmKdUscHFI8n3OsybOs1rd0CD5rIgYuAze8DYIkzX0RPpzazGIgVcY6O58xWSNJOuqkQ7Ery+kV+JNrolXTNY2ZHWg5nD6xzsAHwkWIHfDvmSBAy8BtYLwIAjgA6CLW17XYSYIiN+LYs1k1ZLFHHgwbpGaVjUrAsXgA6hZV3bNGu2zwOBUVjGpZsW31u3E4pVri7cUL5PVvhtWAgWqT85nRWokoECpQlXMZG1YsySgwMqAI6lR5oBKWnmTlSQrx0hcBzDCcBTXkf567QmgydpTniWhkXP5YJ0mYJqs7nmW1H0YNK4JgYwh169ds/qSxThdCSiGNaZmMecGElDOs/aQZwGgDsoFG2C4JI4YoFyzpjk3rGyUTJouicn7nWftIc+SfM1BuTzD+Cwm789dLnQ3HJ3BS6UqvsLco5CrWZVyN5wvdZDoGyLnWdOR9R8h5ia+fwgdg5hPMX+d+RYma0uyKjlab8cEIHwsOqY0iDWT1apmdShVEmKji5fJypHFHG/mdwuRGqbl5SbQ6saayZrSZzH9EUD38bTss87OZ0nFC1SxSp/VlzWT1dNnVSLW3Gcx+2OfNZ/P2q7lNfdZK7NNWDNZE/gsMJKVPst51mXnWasYIo6p3+HnWIvI22ftPM8CPltCjDklYPbn3yL7rD34LKnl5SbQYk4SnWddUp7V02cBlxf3ORYv+6w9+KwcR4zP8nVD+6ymiEm9Type9lmDuuEQ1hjomEbJ5Fl3enqTtTFZp5fznz3LZLUny7NnmaymZHn2LJPVlCzPnuWa1d1nXfTsWSarfTf07Fkma+OaddGzZ5msJFmePcs+a2951pnMnmWyuuZZFzR7lslqRpZnzzJZM+VZZzt7lsnqcW5Y2Sh3OXuWyeqRZ13i7Fkmq0cGf4mzZ5mswRHN2c6eZbJGHaztHtjaassmaz6ypAEETzg9Ek9TlX6805U+k9WMLHC8pQc2H08/epfBBzziPD7rvJIjhJjJqiULPBwecASokZ4JXVmzAH0Sa7cgZrI2tA5gBKT+GKsYU7MqK9T6capCuWZtSFYkArzFcMRUMaZmxQolsQYQczccXbNy/REQIfksYNyl3hcRc83agCypnYF1JDRyNUtaR9p55L9M1uA8q3IkIyNN0HCeNXeeles1gBppMhqmLea6s/OsafIsCTHQmI7KTCGAoxxi4HuZrL55FhglQI10JsjULNAxJcScZ+0qz2IiSgAdqFkgg821PJ8bju6GuYAUZAwx85RqFrg4JPk+51kT51mtbmiQfFZEDFwGb3YbhMkSli9l5MGTJ+WhBgAAAABJRU5ErkJggg==";
			addEventListener("mousemove", function(ev) {
				var c = getColor(ev);
				pre.style.background = c;
			}, false);
			addEventListener("click", function(ev) {
				var c = getColor(ev);
				input.value = c;
				input.focus();
				input.blur();
				cp.parentNode.removeChild(cp);
				cssOnChange(input);
			}, false);
			addEventListener("mouseout", function(ev) {
				cp.parentNode.removeChild(cp);
			}, false);
		}
		cp.appendChild(img);
		cp.appendChild(pre);
		target.appendChild(cp);
		return false;
	};
	// 生成 CSS 选项的 table
	function addCssTable(type, tableStyle, css) {
		css = (css + '').replace(/null/ig, '');
		return '        <table id="bm_pref_css_' + type + '" class="bm_pref_css" style="' + tableStyle + '">\
						<tbody>\
								<tr>\
										<td>\
												<label>\
														Font-Size:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="font-size" size="8" type="text" value="' + ((css.match(/\sfont-size:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
										<td>\
												<label>\
														Font-Color:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="color" size="8" type="text" value="' + ((css.match(/\scolor:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
								</tr>\
								<tr>\
										<td>\
												<label>\
														Font-Weight:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="font-weight" size="8" type="text" value="' + ((css.match(/\sfont-weight:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
										<td>\
												<label>\
														Text-Decoration:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="text-decoration" size="8" type="text" value="' + ((css.match(/\stext-decoration:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
								</tr>\
								<tr>\
										<td>\
												<label>\
														Text-Align:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="text-align" size="8" type="text" value="' + ((css.match(/\stext-align:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
										<td>\
												<label>\
														White-Space:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="white-space" size="8" type="text" value="' + ((css.match(/\swhite-space:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
								</tr>\
								<tr>\
										<td>\
												<label>\
														Background-Color:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="background-color" size="8" type="text" value="' + ((css.match(/\sbackground-color:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
										<td>\
												<label>\
														Border-Color:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="border-color" size="8" type="text" value="' + ((css.match(/\sborder-color:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
								</tr>\
								<tr>\
										<td>\
												<label>\
														Border-Style:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="border-style" size="8" type="text" value="' + ((css.match(/\sborder-style:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
										<td>\
												<label>\
														Border-Width:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="border-width" size="8" type="text" value="' + ((css.match(/\sborder-width:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
								</tr>\
								<tr>\
										<td>\
												<label>\
														Margin-Left:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="margin-left" size="8" type="text" value="' + ((css.match(/\smargin-left:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
										<td>\
												<label>\
														Padding-Left:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="padding-left" size="8" type="text" value="' + ((css.match(/\spadding-left:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
								</tr>\
								<tr>\
										<td>\
												<label>\
														Margin-Right:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="margin-right" size="8" type="text" value="' + ((css.match(/\smargin-right:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
										<td>\
												<label>\
														Padding-Right:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="padding-right" size="8" type="text" value="' + ((css.match(/\spadding-right:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
								</tr>\
								<tr>\
										<td>\
												<label>\
														Margin-Top:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="margin-top" size="8" type="text" value="' + ((css.match(/\smargin-top:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
										<td>\
												<label>\
														Padding-Top:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="padding-top" size="8" type="text" value="' + ((css.match(/\spadding-top:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
								</tr>\
								<tr>\
										<td>\
												<label>\
														Margin-Bottom:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="margin-bottom" size="8" type="text" value="' + ((css.match(/\smargin-bottom:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
										<td>\
												<label>\
														Padding-Bottom:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="padding-bottom" size="8" type="text" value="' + ((css.match(/\spadding-bottom:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
								</tr>\
								<tr>\
										<td>\
												<label>\
														Float:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="float" size="8" type="text" value="' + ((css.match(/\sfloat:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
										<td>\
												<label>\
														Clear:\
												</label>\
										</td>\
										<td>\
												<input class="css_' + type + '" name="clear" size="8" type="text" value="' + ((css.match(/\sclear:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig, '') + '') + '"><span class="bm_pref_css_span">▼</span>\
										</td>\
								</tr>\
								<tr>\
										<td colspan="4">\
												<label>\
													生成的 CSS ：\
												</label><br>\
												<label>\
													<textarea id="css_' + type + '_gen" rows="3" cols="60" wrap="off" style="font-size: small;" readonly>' + css + '</textarea>\
												</label>\
										</td>\
								</tr>\
						</tbody>\
				</table>\
';
	}
	// 闪动具有指定 class 的元素
	function blink(cls, count) {
		if(count > 5) {
			return;
		}
		var i, len;
		var eles = matchNode('//*[@class="' + cls + '" and ancestor::div[@id="bm_pref_gui"]]');
		len = eles.snapshotLength;
		for(i = 0; i < len; i++) {
			eles.snapshotItem(i).style.border = '1px solid red';
		}
		setTimeout(function() {
			for(i = 0; i < len; i++) {
				eles.snapshotItem(i).style.border = '';
			}
			setTimeout(function() {
				blink(cls, ++count);
			}, 150);
		}, 150);
	}
	// 设置参数
	function SetPreferences() {
		var i, len;
		var bodyElements = [],
			bodyElementsDisplay = [];
		var allElements = document.body.childNodes;
		len = allElements.length;
		for(i = 0; i < len; i++) {
			if(allElements[i].nodeType == 1 && getComputedStyle(allElements[i], '').display != 'none') {
				bodyElements.push(allElements[i]);
				bodyElementsDisplay.push(getComputedStyle(allElements[i], '').display);
				allElements[i].style.display = 'none';
			};
		}
		var code2keyTable = {
			'65': 'A',
			'66': 'B',
			'67': 'C',
			'68': 'D',
			'69': 'E',
			'70': 'F',
			'71': 'G',
			'72': 'H',
			'73': 'I',
			'74': 'J',
			'75': 'K',
			'76': 'L',
			'77': 'M',
			'78': 'N',
			'79': 'O',
			'80': 'P',
			'81': 'Q',
			'82': 'R',
			'83': 'S',
			'84': 'T',
			'85': 'U',
			'86': 'V',
			'87': 'W',
			'88': 'X',
			'89': 'Y',
			'90': 'Z',
			'48': '0',
			'49': '1',
			'50': '2',
			'51': '3',
			'52': '4',
			'53': '5',
			'54': '6',
			'55': '7',
			'56': '8',
			'57': '9',
			'96': 'Numpad 0',
			'97': 'Numpad 1',
			'98': 'Numpad 2',
			'99': 'Numpad 3',
			'100': 'Numpad 4',
			'101': 'Numpad 5',
			'102': 'Numpad 6',
			'103': 'Numpad 7',
			'104': 'Numpad 8',
			'105': 'Numpad 9',
			'106': 'Numpad *',
			'107': 'Numpad +',
			'108': 'Numpad Enter',
			'109': 'Numpad -',
			'110': 'Numpad .',
			'111': 'Numpad /',
			'112': 'F1',
			'113': 'F2',
			'114': 'F3',
			'115': 'F4',
			'116': 'F5',
			'117': 'F6',
			'118': 'F7',
			'119': 'F8',
			'120': 'F9',
			'121': 'F10',
			'122': 'F11',
			'123': 'F12',
			'8': 'BackSpace',
			'9': 'Tab',
			'12': 'Clear',
			'13': 'Enter',
			'16': 'Shift',
			'17': 'Control',
			'18': 'Alt',
			'20': 'Cape Lock',
			'27': 'Esc',
			'32': 'Spacebar',
			'33': 'Page Up',
			'34': 'Page Down',
			'35': 'End',
			'36': 'Home',
			'37': '←/Left Arrow',
			'38': '↑/Up Arrow',
			'39': '→/Right Arrow',
			'40': '↓/Down Arrow',
			'45': 'Insert',
			'46': 'Delete',
			'144': 'Num Lock',
			'186': ';:',
			'187': '=+',
			'188': ',<',
			'189': '-_',
			'190': '.>',
			'191': '/?',
			'192': '`~',
			'219': '[{',
			'220': '\|',
			'221': ']}',
			'222': '"'
		};
		// 将 keycode 转换成按键名称
		function parse2keys(keycodes) {
			var array = keycodes.split('+');
			array[array.length - 1] = code2keyTable[array[array.length - 1]] || '';
			return array.join('+');
		}
		// 将设置界面的 css 添加到 head 中
		addCSS('\
						#bm_pref_gui {\
							background-color: white;\
								border: 2px solid black;\
				margin: 0 auto;\
				text-align: left;\
				-moz-border-radius: 0.5em;\
				-webkit-border-radius: 0.5em;\
						}\
			\
			#bm_pref_gui_title {\
				font-weight: bold;\
				background: #CCCCCC;\
				color: #666666;\
						}\
			\
			#bm_pref_gui fieldset {\
				margin-left: 1em;\
				margin-right: 1em;\
				margin-top: 0.5em;\
				margin-bottom: 0.5em;\
			}\
			\
			#bm_pref_gui legend {\
				font-size : 12pt;\
				font-weight : bold;\
			}\
			\
			#bm_pref_gui .f {\
				line-height: 1.5em;\
			}\
			\
			#bm_pref_gui label {\
				font-size: 13px;\
				margin-left: 0.5em;\
			}\
			\
			#bm_pref_options div {\
				margin-bottom: 0.3em;\
				padding-left: 1em;\
			}\
			\
			.bm_pref_css {\
				font-size: small;\
				padding: 0.5em 0;\
				white-space: nowrap;\
			}\
			\
			.bm_pref_css_span {\
				display : inline-block;\
				font-size : 12px;\
				border : 1px solid #999;\
				color : #000;\
				background-color : #fff;\
				padding : 1px;\
				margin-right: 0.5em;\
				-moz-border-radius-topright :5px;\
				-moz-border-radius-topleft :0px;\
				-moz-border-radius-bottomright :5px;\
				-moz-border-radius-bottomleft :0px;\
				-webit-border-radius-topright :5px;\
				-webit-border-radius-topleft :0px;\
				-webit-border-radius-bottomright :5px;\
				-webit-border-radius-bottomleft :0px;\
			}\
			.bm_pref_css_span:hover {\
				color : #fff;\
				background-color : #000;\
				cursor : default;\
			}\
			.virtual-list {\
				position : absolute;\
				display : block !important;\
				overflow-y : auto;\
				overflow-x : hidden;\
				margin : 0;\
				margin-top : 2px;\
				padding : 0 !important;\
				max-height : 200px;\
				border : 1px solid #333;\
				background-color : white;\
			}\
			\
			.virtual-list span {\
				display : block !important;\
				margin : 0;\
				padding : 2px 0.5em;\
				font-family : Arial, Hevetica, sans-serif;\
				font-size : 9pt;\
				color : #000;\
				text-align : left;\
			}\
			\
			.virtual-list span:hover {\
				background-color : #33f;\
				color : white;\
			}\
			\
			.virtual-list span.selected {\
				background-color : #88f;\
				color : white;\
			}\
			\
			#colorpicker {\
				position : absolute;\
				display : block;\
				margin-top : 2px;\
				margin-left : -30px;\
				z-index : 9999999;\
			}\
			#colorpicker span {\
				display : inline-block;\
				width : 24px;\
				height : 24px;\
				border : 2px solid #000;\
				margin-left : 2px;\
				vertical-align: top;\
			}\
			#colorpicker img {\
				width : 100px;\
				height : 192px;\
				padding : 7px;\
				background-color : #888;\
				border : 3px solid #333;\
				cursor : crosshair;\
			}\
			#default_button {\
				width: 12em;\
			}\
		');
		var bgDiv = document.createElement('div');
		with(bgDiv) {
			setAttribute('id', 'preferences');
			setAttribute('style', 'display: table; width:100%; height: 100%;');
			innerHTML = '<div style="display: table-cell; text-align: center; vertical-align: middle; padding: 1em;">\
								<div id="bm_pref_gui">\
										<center>\
												<table width="100%">\
														<tr id="bm_pref_gui_title">\
															<td colspan="2">\
																<div style="float: left; padding-left: 0.8em; font-size: small;">BaiduMonkey 参数设置&nbsp;&nbsp;&nbsp;&nbsp;v：' + scriptVersion + '</div>\
																<div id="check_update" style="float: right; padding-right: 0.8em; font-size: small;"><a href="javascript:void(0);" id="check_update_a" >检查更新</a><a href="' + scriptUrl + '" target="_blank">访问 userscripts 页面</a></div>\
																<div style="float: right; padding-right: 0.8em; font-size: small;">欢迎来<a href="http://board.mozest.com/viewthread.php?tid=25917" target="_blank">这里</a>发表任何意见或建议。</div>\
															</td>\
														</tr>\
														<tr>\
																<td colspan="2">\
																		<fieldset id="bm_pref_preview">\
										<legend>效果预览</legend>\
										<div id="bm_pref_res" class="bm_pref_preview_id-res" style="display: none;">\
																	<table border="0" cellpadding="0" cellspacing="0">\
																			<tbody>\
																					<tr>\
																							<td class="f">\
																									<a href="javascript: void(0);"><font size="3">标题一<em class="bm_kw">关键字</em>标题一</font></a>\
																									<br>\
																									<font size="-1">\
																											描述一<em class="bm_kw">关键字</em>描述一... 描述一描述一描述一 描述一描述一描述一 描述一描述一描述一 描述一描述一描述一 描述一描述一描述一 <b>...</b>描述一<em class="bm_kw">关键字</em>描述一. <b>...</b> 描述一描述一描述一 描述一描述一描述一 描述一描述一描述一 描述一描述一描述一 描述一描述一描述一...\
																											<br>\
																											<font color="#008000">\
																													www.urlstring1.com/path/ 00K 2000-1-1 \
																											</font>\
																											- <a href="javascript: void(0)；" class="m">百度快照</a>\
																											<br>\
																									</font>\
																							</td>\
																					</tr>\
																			</tbody>\
																	</table>\
																	<table border="0" cellpadding="0" cellspacing="0">\
																			<tbody>\
																					<tr>\
																							<td class="f">\
																									<a href="javascript: void(0);"><font size="3">标题二<em class="bm_kw">关键字</em>标题二</font></a>\
																									<br>\
																									<font size="-1">\
																											描述二<em class="bm_kw">关键字</em>描述二... 描述二描述二描述二 描述二描述二描述二 描述二描述二描述二 描述二描述二描述二 描述二描述二描述二 <b>...</b>\
																											<br>\
																											<font color="#008000">\
																													www.urlstring2.com/path/ 00K 2000-1-1 \
																											</font>\
																											- <a href="javascript: void(0)；" class="m">百度快照</a>\
																											<br>\
																									</font>\
																							</td>\
																					</tr>\
																			</tbody>\
																	</table>\
																	<table border="0" cellpadding="0" cellspacing="0">\
																			<tbody>\
																					<tr>\
																							<td class="f">\
																									<a href="javascript: void(0);"><font size="3">标题三<em class="bm_kw">关键字</em>标题三</font></a>\
																									<br>\
																									<font size="-1">\
																											描述三<em class="bm_kw">关键字</em>描述三... 描述三描述三描述三 描述三描述三描述三 描述三描述三描述三 描述三描述三描述三 描述三描述三描述三 <b>...</b>\
																											<br>\
																											<font color="#008000">\
																													www.urlstring3.com/path/ 00K 2000-1-1 \
																											</font>\
																											<br>\
																									</font>\
																							</td>\
																					</tr>\
																			</tbody>\
																	</table>\
																	<table border="0" cellpadding="0" cellspacing="0">\
																			<tbody>\
																					<tr>\
																							<td class="f">\
																									<a href="javascript: void(0);"><font size="3">标题四<em class="bm_kw">关键字</em>标题四</font></a>\
																									<br>\
																									<font size="-1">\
																											描述四<em class="bm_kw">关键字</em>描述四... 描述四描述四描述四 描述四描述四描述四 描述四描述四描述四 描述四描述四描述四 描述四描述四描述四 <b>...</b>描述四<em class="bm_kw">关键字</em>描述四. <b>...</b> 描述四描述四描述四 描述四描述四描述四 描述四描述四描述四 描述四描述四描述四 描述四描述四描述四...\
																											<br>\
																											<font color="#008000">\
																													www.urlstring1.com/path/ 00K 2000-1-1 \
																											</font>\
																											- <a href="javascript: void(0)；" class="m">百度快照</a>\
																											<br>\
																									</font>\
																							</td>\
																					</tr>\
																			</tbody>\
																	</table>\
										</div>\
									</fieldset>\
																</td>\
														</tr>\
														<tr id="bm_pref_options">\
																<td width="50%" valign="top">\
																		<fieldset>\
										<legend>常规</legend>\
										<div>\
												<label>&nbsp;分栏数量：\
												<select name="numcol" id="numcol" class="bm_pref_onchange">\
													<option value="1" ' + ((Pref.columns == 1) ? 'selected="selected"' : '') + '>1</option>\
													<option value="2" ' + ((Pref.columns == 2) ? 'selected="selected"' : '') + '>2</option>\
													<option value="3" ' + ((Pref.columns == 3) ? 'selected="selected"' : '') + '>3</option>\
													<option value="4" ' + ((Pref.columns == 4) ? 'selected="selected"' : '') + '>4</option>\
												</select>\
																</label>&nbsp;&nbsp;\
																<label>&nbsp;&nbsp;阅读方向：\
												<select name="direction" id="direction" class="bm_pref_onchange">\
													<option value="1" ' + ((Pref.direction == 1) ? 'selected="selected"' : '') + '>横向</option>\
													<option value="2" ' + ((Pref.direction == 2) ? 'selected="selected"' : '') + '>纵向</option>\
												</select>\
																</label>&nbsp;&nbsp;\
																<label>&nbsp;&nbsp;排版模式：\
												<select name="mode" id="mode" class="bm_pref_onchange">\
													<option value="1" ' + ((Pref.displayMode == 1) ? 'selected="selected"' : '') + '>紧凑</option>\
													<option value="2" ' + ((Pref.displayMode == 2) ? 'selected="selected"' : '') + '>对齐1</option>\
													<option value="3" ' + ((Pref.displayMode == 3) ? 'selected="selected"' : '') + '>对齐2</option>\
													<option value="4" ' + ((Pref.displayMode == 4) ? 'selected="selected"' : '') + '>对齐3</option>\
												</select>\
																</label>&nbsp;&nbsp;\
																<label>\
																		<input name="fitwidth" id="fitwidth" class="bm_pref_onchange" type="checkbox" ' + (Pref.fitwidth ? 'checked="true"' : '') + '>&nbsp;适合宽度\
																</label><br>\
																<label>\
																		（注：阅读方向为“横向”时，排版模式将固定为“紧凑”或“对齐1”）\
																</label>\
										</div>\
										<div>\
																<label>\
																		<input name="floatInput" id="floatInput" type="checkbox" ' + (Pref.floatInput ? 'checked="true"' : '') + '>&nbsp;搜索框浮动在页面\
																</label>\
																<label>\
												<select name="floatInputPos" id="floatInputPos">\
													<option value="1" ' + ((Pref.floatInputPos == 1) ? 'selected="selected"' : '') + '>顶部</option>\
													<option value="2" ' + ((Pref.floatInputPos == 2) ? 'selected="selected"' : '') + '>底部</option>\
												</select>\
																</label>\
										</div>\
										<div>\
																<label>\
																		<input name="removeAd" id="removeAd" type="checkbox" ' + (Pref.removeAd ? 'checked="true"' : '') + '>&nbsp;移除右侧的广告\
																</label>\
										</div>\
										<div>\
																<label>\
																		<input name="SearchInOtherEngines" id="SearchInOtherEngines" type="checkbox" ' + (Pref.EnableSearchInOtherEngines ? 'checked="true"' : '') + '>&nbsp;添加其他搜索引擎\
																</label>\
												<label>&nbsp;\
												<select name="OtherEnginesTarget" id="OtherEnginesTarget">\
													<option value="_blank" ' + ((Pref.OtherEnginesTarget == '_blank') ? 'selected="selected"' : '') + '>在新页面打开</option>\
													<option value="_self" ' + ((Pref.OtherEnginesTarget == '_self') ? 'selected="selected"' : '') + '>在当前页面打开</option>\
												</select>\
																</label>&nbsp;&nbsp;\
																<label>\
																		<input name="OtherEnginsFloat" id="OtherEnginsFloat" type="checkbox" ' + (Pref.OtherEnginsFloat ? 'checked="true"' : '') + '>&nbsp;跟随搜索框浮动\
																</label><br>\
																<label>\
																		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; （以下内容若不知何意，请勿修改）\
																</label><br>\
																<label>\
																		<textarea rows="5" cols="49" id="OtherEngines" style="margin: 0 1.5em;" wrap="off">' + Pref.OtherEngines + '</textarea>\
																</label>\
										</div>\
										<div>\
																<label>\
																		<input name="AutoNextPage" id="AutoNextPage" type="checkbox" ' + (Pref.AutoNextPage ? 'checked="true"' : '') + '>&nbsp;自动加载下一页\
																</label>&nbsp;&nbsp;\
																<label>\
																		<input name="HideAutoNextPage" id="HideAutoNextPage" type="checkbox" ' + (Pref.HideAutoNextPage ? 'checked="true"' : '') + '>&nbsp;隐藏自动翻页分隔符\
																</label>\&nbsp;&nbsp;\
																<label>\
																		<input name="NextPageWithRS" id="NextPageWithRS" type="checkbox" ' + (Pref.NextPageWithRS ? 'checked="true"' : '') + '>&nbsp;下一页包含相关搜索\
																</label>\
																<label style="margin-left: 1em; font-size: 0.9em; color: red; font-style: italic;">\
												NEW~\
																</label>\
										</div>\
										<div>\
																<label style=" margin-left: 1.5em;">\
												<div style="display:inline-block;">快捷键定位到下一页\
																			<input name="Focus2NextPageKeys" id="Focus2NextPageKeys" size="15" value="' + parse2keys(Pref.Focus2NextPageKeys) + '"\
												</div>\
																</label>\
																<label style=" margin-left: 1em;">\
												<div style="display:inline-block;">上一页\
																		<input name="Focus2PrevPageKeys" id="Focus2PrevPageKeys" size="15" value="' + parse2keys(Pref.Focus2PrevPageKeys) + '"\
												</div>\
																</label>\
										</div>\
										<div>\
																<label>\
																		<input name="DisableTracking" id="DisableTracking" type="checkbox" ' + (Pref.DisableTracking ? 'checked="true"' : '') + '>&nbsp;禁止百度记录我的点击情况\
																</label>\
										</div>\
										<div>\
																<label>\
																		<input name="Focus2Keyword" id="Focus2Keyword" type="checkbox" ' + (Pref.Focus2Keyword ? 'checked="true"' : '') + '>&nbsp;快捷键定位到搜索框并\
																</label>\
																<label>\
												<select name="Focus2KeywordAction" id="Focus2KeywordAction">\
													<option value="1" ' + ((Pref.Focus2KeywordAction == 1) ? 'selected="selected"' : '') + '>清除全部文字</option>\
													<option value="2" ' + ((Pref.Focus2KeywordAction == 2) ? 'selected="selected"' : '') + '>紧跟文字之后</option>\
													<option value="3" ' + ((Pref.Focus2KeywordAction == 3) ? 'selected="selected"' : '') + '>选中全部文字</option>\                       </select>\
																</label>\
																<label>&nbsp;&nbsp;&nbsp;快捷键：\
																		<input name="Focus2KeywordKeys" id="Focus2KeywordKeys" size="18" value="' + parse2keys(Pref.Focus2KeywordKeys) + '" >\
																</label>\
										</div>\
									</fieldset>\
																		<fieldset>\
										<legend>搜索条目</legend>\
										<div>\
																<label>\
																		<input name="addPreviews" id="addPreviews" class="bm_pref_onchange" type="checkbox" ' + (Pref.addPreview ? 'checked="true"' : '') + '>&nbsp;显示页面缩略图\
																</label>\
																<label>&nbsp;&nbsp;缩略图大小：\
																		<input id="PreviewSize" class="bm_pref_onchange" size="3" value="' + Pref.PreviewSize + '">%\
																</label>\
										</div>\
										<div>\
																<label>\
																		<input name="addResultNums" id="addResultNums" class="bm_pref_onchange" type="checkbox" ' + (Pref.addResultNum ? 'checked="true"' : '') + '>&nbsp;给搜索结果标序号 ( 1, 2, 3... )\
																</label>\
										</div>\
										<div>\
																<label>\
																		<input name="addFavicons" id="addFavicons" class="bm_pref_onchange" type="checkbox" ' + (Pref.addFavicon ? 'checked="true"' : '') + '>&nbsp;显示站点的 Favicon\
																</label>&nbsp;&nbsp;\
																<label>\
																		<input name="addFavicons_h" id="addFavicons_h" class="bm_pref_onchange" type="checkbox" ' + (Pref.addFavicon_h ? 'checked="true"' : '') + '>&nbsp;若没有则显示空白\
																</label>\
										</div>\
										<div>\
																<label>\
																		<input name="searchSite" id="searchSite" class="bm_pref_onchange" type="checkbox" ' + (Pref.searchSite ? 'checked="true"' : '') + '>&nbsp;添加“在此站点中搜索”\
																</label>\
										</div>\
										<div>\
																<label>\
																	 &nbsp;改变搜索条目背景色在： 【CSS 样式】 -> 【条目】 -> 【Background-Color】\
																</label>\
										</div>\
									</fieldset>\
									<div id="bm_pref_buttons" style="float: right;padding: 1.5em 1em 0 0;">\
																			<input value="保存" name="save_button" id="save_button" class="btn" type="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
																			<input value="取消" name="cancel_button" id="cancel_button" class="btn" type="button">\
									</div>\
																</td>\
																<td width="50%" valign="top">\
																		<fieldset>\
										<legend>CSS 样式</legend>\
										<div>\
																<label>\
												<select name="bm_pref_css_list" id="bm_pref_css_list">\
													<option value="holder" selected="selected">条目</option>\
													<option value="counter">序号</option>\
													<option value="keyword">关键字</option>\
												</select>\
																</label>&nbsp;&nbsp;\
																<label>\
																		<input value="全部恢复至默认 CSS" name="default_button" id="default_button" class="btn" type="button">\
																</label>\
										</div>\
										<div>\
' + addCssTable('holder', 'border: 1px solid rgb(170, 170, 170);', Pref.CSS.match(/\.rest\s\{[^\}]*\}/i)) + addCssTable('counter', 'border: 1px solid rgb(170, 170, 170); display: none;', Pref.CSS.match(/\.bm_num\s\{[^\}]*\}/i)) + addCssTable('keyword', 'border: 1px solid rgb(170, 170, 170); display: none;', Pref.CSS.match(/\.bm_kw\s\{[^\}]*\}/i)) + '                 </div>\
										<div>\
											<table style="padding: 0.5em 0.5em 0 0.5em;">\
												<tr>\
													<td>\
																			<label>\
																					自定义 CSS ：\
																			</label><br>\
																			<label>\
																					<textarea rows="2" cols="60" id="customizeCSS" wrap="off" style="font-size: small;">' + Pref.customizeCSS + '</textarea>\
																			</label>\
													</td>\
												</tr>\
											</table>\
										</div>\
									</fieldset>\
																</td>\
														</tr>\
												</table>\
										</center>\
								</div>\
						</div>\
';
		}
		document.body.insertBefore(bgDiv, document.body.firstChild);
		// 设置好预览效果
		prefOnChange();
		// 添加 CSS 列表事件，切换不同的设置
		document.getElementById('bm_pref_css_list').addEventListener('change', function(event) {
			var list = event.target;
			var curCssTable = matchNode('//table[@class="bm_pref_css" and not(contains(@style,"none"))]').snapshotItem(0);
			curCssTable.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); display: none;');
			var newCssTable = document.getElementById('bm_pref_css_' + list.options[list.selectedIndex].value);
			newCssTable.setAttribute('style', 'border: 1px solid rgb(170, 170, 170);');
			switch(list.options[list.selectedIndex].value) {
			case 'holder':
				blink('rest', 1);
				break;
			case 'counter':
				blink('bm_num', 1);
				break;
			case 'keyword':
				blink('bm_kw', 1);
				break;
			}
		}, false);
		// 添加相关选项 onchange 时的事件
		var onChanges = matchNode('//*[@class="bm_pref_onchange"]');
		len = onChanges.snapshotLength;
		for(i = 0; i < len; i++) {
			onChanges.snapshotItem(i).addEventListener('change', function() {
				prefOnChange();
			}, false);
		}
		// 添加 CSS 参数变化时，更新预览效果
		var cssInputs = matchNode('//input[ancestor::table[@class="bm_pref_css"]]');
		len = cssInputs.snapshotLength;
		for(i = 0; i < len; i++) {
			cssInputs.snapshotItem(i).addEventListener('change', function(event) {
				cssOnChange(event.target);
			}, false);
		}
		// 自定义 CSS 文本框失去焦点时，更新预览效果
		document.getElementById('customizeCSS').addEventListener('blur', function(event) {
			prefOnChange();
		}, false);
		// 添加 CSS选项中的候选项
		var optionSpans = matchNode('//span[@class="bm_pref_css_span"]');
		len = optionSpans.snapshotLength;
		for(i = 0; i < len; i++) {
			optionSpans.snapshotItem(i).addEventListener('click', function(event) {
				var input = event.target.previousSibling;
				switch(input.name) {
				case 'font-size':
					addList(this, '6pt,7pt,8pt,9pt,10pt,11pt,12pt,13pt,14pt,15pt,16pt,17pt,18pt,19pt,20pt,21pt,22pt,23pt,24pt,25pt,26pt,27pt,28pt');
					break;
				case 'color':
					addColorPicker(this);
					break;
				case 'font-weight':
					addList(this, 'bold,normal,100,200,300,400,500,600,700,800,900');
					break;
				case 'text-decoration':
					addList(this, 'none,underline,overline,line-through,blink');
					break;
				case 'text-align':
					addList(this, 'left,center,right,justify');
					break;
				case 'white-space':
					addList(this, 'normal,pre,nowrap');
					break;
				case 'background-color':
					addColorPicker(this);
					break;
				case 'border-color':
					addColorPicker(this);
					break;
				case 'border-style':
					addList(this, 'none,hidden,dotted,dashed,solid,double,groove,ridge,inset,outset');
					break;
				case 'border-width':
					addList(this, 'thin,medium,thick,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px')
					break;
				case 'margin-left':
					addList(this, '0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'padding-left':
					addList(this, '0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'margin-right':
					addList(this, '0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'padding-right':
					addList(this, '0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'margin-top':
					addList(this, '0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'padding-top':
					addList(this, '0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'margin-bottom':
					addList(this, '0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'padding-bottom':
					addList(this, '0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'float':
					addList(this, 'none,left,right');
					break;
				case 'clear':
					addList(this, 'none,left,right,both');
					break;
				}
			}, false);
		}
		// 检查是否有新版本
		getNewVersion(function(version) {
			if(Number(scriptVersion) < Number(version)) {
				document.getElementById('check_update').innerHTML = '<font color="red">&nbsp;&nbsp;&nbsp;检测到新版本，请点击' + '&nbsp;<a href="' + scriptUrl + '" target="_blank">查看</a>&nbsp;或' + '&nbsp;<a href="' + installUrl + '">升级</a>&nbsp;</font>';
			}
		})
		// 将 CSS 全部恢复至默认
		document.getElementById('default_button').addEventListener('click', function() {
			if(confirm("除自定义 CSS 外的其他所有 CSS 设置将恢复到默认状态。\n继续吗？")) {
				setValue('CSS', defaultCSS);
				alert('除自定义 CSS 外的其他所有 CSS 设置已恢复到默认状态，刷新页面后生效。');
			}
		}, false);
		// 保存设置
		document.getElementById('save_button').addEventListener('click', function() {
			var len, tmp;
			// 保存分栏数量
			tmp = document.getElementById('numcol');
			setValue('numcol', Number(tmp.options[tmp.selectedIndex].value));
			// 保存搜索结果的排列方向
			tmp = document.getElementById('direction');
			setValue('direction', Number(tmp.options[tmp.selectedIndex].value));
			// 保存排版模式
			tmp = document.getElementById('mode');
			setValue('mode', Number(tmp.options[tmp.selectedIndex].value));
			// 浮动搜索框
			setValue('floatInput', document.getElementById('floatInput').checked);
			tmp = document.getElementById('floatInputPos');
			setValue('floatInputPos', Number(tmp.options[tmp.selectedIndex].value));
			// 让搜索结果适合屏幕宽度
			setValue('fitwidth', document.getElementById('fitwidth').checked);
			// 移除右侧的广告
			setValue('removeAd', document.getElementById('removeAd').checked);
			// 给搜索结果标序号
			setValue('addResultNums', document.getElementById('addResultNums').checked);
			// 添加缩略图预览
			setValue('addPreviews', document.getElementById('addPreviews').checked);
			// 缩略图大小。如果包含非数字，则替换成默认值 100
			setValue('PreviewSize', isNaN(document.getElementById('PreviewSize').value) ? '100' : document.getElementById('PreviewSize').value);
			// 添加站点的 Favicon
			setValue('addFavicons', document.getElementById('addFavicons').checked);
			// 若没有 Favicon 则显示空白
			setValue('addFavicons_h', document.getElementById('addFavicons_h').checked);
			// 在页面上部添加其他搜索引擎，默认【在Google中搜索xx】
			setValue('SearchInOtherEngines', document.getElementById('SearchInOtherEngines').checked);
			setValue('OtherEngines', document.getElementById('OtherEngines').value.replace(/\'/ig, '"').replace(/^\s*|\s*$/ig, '').replace(/\s*[\n\r]+\s*/ig, '\n').replace(/\s*\|\s*http/ig, '|http'));
			setValue('OtherEnginsFloat', document.getElementById('OtherEnginsFloat').checked);
			tmp = document.getElementById('OtherEnginesTarget');
			setValue('OtherEnginesTarget', tmp.options[tmp.selectedIndex].value);
			// 自动加载下一页
			setValue('AutoNextPage', document.getElementById('AutoNextPage').checked);
			setValue('HideAutoNextPage', document.getElementById('HideAutoNextPage').checked);
			setValue('NextPageWithRS', document.getElementById('NextPageWithRS').checked);
			// 快捷键定位到搜索框
			setValue('Focus2Keyword', document.getElementById('Focus2Keyword').checked);
			tmp = document.getElementById('Focus2KeywordAction');
			setValue('Focus2KeywordAction', Number(tmp.options[tmp.selectedIndex].value));
			// 禁止Baidu记录我的点击情况
			setValue('DisableTracking', document.getElementById('DisableTracking').checked);
			// 添加“在此站点中搜索”
			setValue('searchSite', document.getElementById('searchSite').checked);
			var css = '';
			// 保存 CSS 设置
			var cssTextareas = matchNode('//textarea[string-length(text())>0 and ancestor::table[@class="bm_pref_css"]]');
			len = cssTextareas.snapshotLength;
			for(var i = 0; i < len; i++) {
				css += '.bm_MultiColDiv ' + cssTextareas.snapshotItem(i).value + '\n';
			}
			setValue('CSS', css);
			// 保存自定义的 CSS
			setValue('customizeCSS', document.getElementById('customizeCSS').value);
			// 滚动到页面顶部，刷新一下页面
			window.scrollTo(0, 0);
			location.href = location.href;
		}, false);
		// 取消
		document.getElementById('cancel_button').addEventListener('click', function() {
			var bgDiv = document.getElementById('preferences');
			bgDiv.parentNode.removeChild(bgDiv);
			len = bodyElements.length;
			for(i = 0; i < len; i++) {
				bodyElements[i].style.display = bodyElementsDisplay[i];
			}
			window.scrollTo(0, 0);
			if(Pref.AutoNextPage) loadNextPage();
		}, false);
		// “快捷键定位到搜索框” 的快捷键设定
		document.getElementById('Focus2KeywordKeys').addEventListener('keydown', function(event) {
			var keycode = event.keyCode;
			var shift = event.shiftKey;
			var ctrl = event.ctrlKey;
			var alt = event.altKey;
			var Keys = '';
			if(shift) {
				Keys += 'shift+';
			}
			if(ctrl) {
				Keys += 'ctrl+';
			}
			if(alt) {
				Keys += 'alt+';
			}
			this.value = Keys + (code2keyTable[keycode] || '');
			Keys += String(event.keyCode);
			setValue('Focus2KeywordKeys', Keys); // 立即保存快捷键
			event.preventDefault();
			event.stopPropagation();
		}, false);
		// “快捷键定位到下一页”的快捷键设定
		document.getElementById('Focus2NextPageKeys').addEventListener('keydown', function(event) {
			var keycode = event.keyCode;
			var shift = event.shiftKey;
			var ctrl = event.ctrlKey;
			var alt = event.altKey;
			var Keys = '';
			if(shift) {
				Keys += 'shift+';
			}
			if(ctrl) {
				Keys += 'ctrl+';
			}
			if(alt) {
				Keys += 'alt+';
			}
			this.value = Keys + (code2keyTable[keycode] || '');
			Keys += String(event.keyCode);
			setValue('Focus2NextPageKeys', Keys); // 立即保存快捷键
			event.preventDefault();
			event.stopPropagation();
		}, false);
		// “快捷键定位到上一页”的快捷键设定
		document.getElementById('Focus2PrevPageKeys').addEventListener('keydown', function(event) {
			var keycode = event.keyCode;
			var shift = event.shiftKey;
			var ctrl = event.ctrlKey;
			var alt = event.altKey;
			var Keys = '';
			if(shift) {
				Keys += 'shift+';
			}
			if(ctrl) {
				Keys += 'ctrl+';
			}
			if(alt) {
				Keys += 'alt+';
			}
			this.value = Keys + (code2keyTable[keycode] || '');
			Keys += String(event.keyCode);
			setValue('Focus2PrevPageKeys', Keys); // 立即保存快捷键
			event.preventDefault();
			event.stopPropagation();
		}, false);
	}
	// 加载下一页
	function loadNextPage() {
		// 如果剩余页面高度小于两倍窗口高度，而且存在下一页、没有在加载下一页、没有打开设置界面
		if(!IsLoadingNext && NextPageLink && document.body.scrollHeight - window.scrollY < window.innerHeight * 3 && !document.getElementById('preferences')) {
			IsLoadingNext = true;
			var splitDiv = document.createElement('div');
			splitDiv.setAttribute('style', 'font-size: small; background: rgb(230, 230, 230) none repeat scroll 0% 0%; clear: both; line-height: 20px; text-align: center; margin-top: 0.7em;');
			splitDiv.setAttribute('id', 'isLoading');
			splitDiv.setAttribute('class', 'bm_nav');
			splitDiv.innerHTML = '<img style="vertical-align: middle;" src="data:image/gif;base64,R0lGODlhEAAQAPMAAP///wAA/wAA/4KC/nJy/qio/ry8/s7O/t7e/pSU/ujo/mho/gAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAEKxDISau9OE/Bu//cQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv/XJEMxIFg4VieV0qaqCC+rOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo+UCAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+cghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/nKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEJhDISau9OE/Bu/+cthBDEmZjeWKpKYikC6svGq9XC+6e5v/AICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+ctRBDUhgHElZjeaYr1ZqoKogkDd9s/to4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA=">\
							BaiduMonkey 正在加载下一页 ...';
			var clr = matchNode('//div[@id="search" and descendant::form[@name="f2"]]').snapshotItem(0);
			clr.parentNode.insertBefore(splitDiv, clr);
			GM_xmlhttpRequest({
				method: 'GET',
				url: String(NextPageLink.href),
				overrideMimeType: 'text/html; charset=' + document.characterSet,
				onload: function(d) {
					// 如果已打开设置界面，那么不加载下一页
					if(document.getElementById('preferences')) {
						IsLoadingNext = false;
						document.body.removeChild(document.getElementById('isLoading'));
						return;
					}
					var i, len;
					pageCount++;
					var lastNextPageLink = NextPageLink;
					var ContainerDiv = document.createElement('div');
					ContainerDiv.innerHTML = d.responseText;
					var tempDivs = matchNode('//table[tbody/tr/td/@class="f"][not(descendant::a[text() = "推广"])]', ContainerDiv);
					len = tempDivs.snapshotLength;
					var ResultCellsDiv = document.createElement('div');
					for(i = 0; i < len; i++) {
						ResultCellsDiv.appendChild(tempDivs.snapshotItem(i));
					}
					ResultCellsDiv.setAttribute('class', 'bm_nextpage');
					// 给搜索结果条目添加序号
					if(Pref.addResultNum) {
						addResultNums(ResultCellsDiv, Pref);
					}
					// 设置分栏格式
					movePops_and_MultiCol(ResultCellsDiv, pageCount, Pref);
					// 添加缩略图预览
					if(Pref.addPreview) {
						addPreviews(ResultCellsDiv);
					}
					// 添加站点 Favicon
					if(Pref.addFavicon) {
						addFavicons(ResultCellsDiv);
					}
					// 禁止百度记录我的点击情况
					if(Pref.DisableTracking) {
						removeTracking(ResultCellsDiv);
					}
					// 添加“在此站点中搜索”
					if(Pref.searchSite) {
						addseatchSite(ResultCellsDiv);
					}
					NextPageLink = matchNode('//p[@id="page"]/a[text() = "下一页>"]', ContainerDiv).snapshotItem(0);
					if(!NextPageLink) {
						// 如果没有下一页了则移除滚动监视
						window.removeEventListener('scroll', watch_scroll, true);
					}
					// 取得页面导航条
					var splitDiv = matchNode('//p[@id="page"]', ContainerDiv).snapshotItem(0);
					splitDiv.innerHTML = 'BaiduMonkey 自动翻页。当前(<a href="' + lastNextPageLink.href + '">第 ' + (pageCount) + ' 页</a>)。【' + splitDiv.innerHTML + '】';
					splitDiv.setAttribute('style', 'margin: 8px 0 0 0;');
					splitDiv.setAttribute('class', splitDiv.getAttribute('class') + ' bm_nav');
					// 在当前页插入自动翻页分隔符
					document.getElementById('isLoading').parentNode.replaceChild(splitDiv, document.getElementById('isLoading'));
					// 插入下一页
					clr.parentNode.insertBefore(ResultCellsDiv, clr);
					// 插入相关搜索
					if(relatedSearch && Pref.NextPageWithRS) {
						clr.parentNode.insertBefore(relatedSearch.cloneNode(true), clr);
					}
					// 统一格式，美化版面
					// 只有一列或者“紧凑”模式时不需要统一格式
					if(Pref.columns > 1 && Pref.displayMode > 1) {
						// 加载第二页后，可能出现纵向滚动条，导致第一页宽度发生变化，所以要重新排版第一页的对齐格式
						if(pageCount == 2) {
							format('bm_page_1', Pref);
						}
						format('bm_page_' + pageCount, Pref);
					}
					delete ContainerDiv;
					var ev = document.createEvent('Event');
					ev.initEvent('bm_NextPageLoaded', true, false);
					document.dispatchEvent(ev);
					IsLoadingNext = false;
				}
			});
		}
	}
	// 滚动停止 300ms 后，开始判断并加载下一页
	var t = setTimeout(function() {}, 10);
	function watch_scroll() {
		clearTimeout(t);
		var last = window.scrollY;
		t = setTimeout(function() {
			if(last == window.scrollY) {
				loadNextPage();
			}
		}, 300);
	}
	// 检查新版本
	function checkUpdate() {
		var now = Math.round(new Date().getTime() / 1000);
		if(Number(Pref.newVersion)) { // 如果已经检查到新版本
			showUpdateMessage(Pref.newVersion);
		} else if(now - Pref.lastCheck > 86400) { // 如果上一次没有检查到新版本，并且上一次检查距今超过24小时，那么现在检查新版本
			setValue('lastCheck', now);
			getNewVersion(function(version) {
				if(Number(version) > Number(scriptVersion) && version != Pref.skipVersion) { // 如果最新版大于现有版本，并且不等于跳过的版本
					setValue('newVersion', version);
					showUpdateMessage(version);
				} else {
					setValue('newVersion', 0);
				}
			})
		}
	}
	// 检查新版本
	function checkUpdateF() {
		var now = Math.round(new Date().getTime() / 1000);
		if(Number(Pref.newVersion)) { // 如果已经检查到新版本
			showUpdateMessage(Pref.newVersion);
		} else { // 如果上一次没有检查到新版本，并且上一次检查距今超过24小时，那么现在检查新版本
			setValue('lastCheck', now);
			getNewVersion(function(version) {
				if(Number(version) > Number(scriptVersion) && version != Pref.skipVersion) { // 如果最新版大于现有版本，并且不等于跳过的版本
					setValue('newVersion', version);
					showUpdateMessage(version);
				} else {
					setValue('newVersion', 0);
				}
			})
		}
	}	
	// 显示新版本提示
	function showUpdateMessage(newVersion) {
		var seperate = document.createElement('span');
		seperate.innerHTML = '&nbsp;&nbsp;-&nbsp;&nbsp;';
		var ignore = document.createElement('a');
		ignore.innerHTML = '暂时忽略';
		ignore.href = 'javascript:void(0)';
		ignore.addEventListener("click", ignoreUpdate, false);
		var skip = document.createElement('a');
		skip.innerHTML = '跳过此版';
		skip.href = 'javascript:void(0)';
		skip.addEventListener("click", function() {
			skipUpdate(newVersion)
		}, false);
		var view = document.createElement('a');
		view.innerHTML = '查看更新';
		view.href = scriptUrl;
		view.target = '_blank';
		var update = document.createElement('a');
		update.innerHTML = '立即升级';
		update.href = 'javascript:void(0)';
		update.addEventListener("click", updateScript, false);
		var msg = document.createElement('div');
		with(msg) {
			setAttribute('id', 'bm_UpdateMsg');
			innerHTML = '<strong>BaiduMonkey</strong>&nbsp;发现新版本 v' + newVersion + '&nbsp;(当前版本 v' + scriptVersion + ')&nbsp;&nbsp;&nbsp;&nbsp;';
			appendChild(ignore);
			appendChild(seperate.cloneNode(true));
			appendChild(skip);
			appendChild(seperate.cloneNode(true));
			appendChild(view);
			appendChild(seperate.cloneNode(true));
			appendChild(update);
		}
		document.body.insertBefore(msg, document.body.firstChild);
		var css;
		if(Pref.floatInput && Pref.floatInputPos == 1) {
			css = '.gbh {display: none;} \
				#bm_UpdateMsg {background-color: rgb(240, 247, 249); margin: 1em; padding: 3px; text-align: center; -moz-border-radius: 5px; -webkit-border-radius: 5px;} \
				 #bm_header {top: 48px;}\
				';
		} else {
			css = '.gbh {display: none;} \
				#bm_UpdateMsg {background-color: rgb(240, 247, 249); margin: 1em; padding: 3px; text-align: center; -moz-border-radius: 5px; -webkit-border-radius: 5px;} \
				';
		}
		GM_addStyle(css);
	}
	function hideUpdateMessage() {
		document.body.removeChild(document.getElementById('bm_UpdateMsg'));
	}
	// 暂时忽略
	function ignoreUpdate() {
		hideUpdateMessage();
		setValue('lastCheck', Math.round(new Date().getTime() / 1000));
		setValue('newVersion', 0);
	}
	// 跳过此版
	function skipUpdate(newVersion) {
		hideUpdateMessage();
		setValue('skipVersion', newVersion);
		setValue('newVersion', 0);
	}
	// 立即升级
	function updateScript() {
		if(isChrome) {
			alert('Chrome用户请先卸载旧版本，再去脚本页面（点击查看更新即可）安装新版。\n卸载前请务必记好自定义的各项设置。');
			setValue('newVersion', 0);
		} else {
			hideUpdateMessage();
			setValue('newVersion', 0);
			window.location.replace(installUrl);
		}
	}
  function getNewVersion(funcbind) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://userscripts.org/scripts/source/105482.meta.js',
      overrideMimeType: 'text/html; charset=' + document.characterSet,
      onload: function(d) {
        var html = d.responseText;
        var versionCode = (/@version[ \t]+([0-9\.]+)/.exec(html) || ["", "未知"])[1]; // d.responseText.match(/\/\/[^\/]*@<em>version<\/em>[^\/]*\/\//i);
        if(versionCode) { // 如果找到 Version
          funcbind(String(versionCode).replace(/[^\d\.]/ig, ''));
        }
      }
    });
  }
    document.getElementById('check_update_a').addEventListener('click', function() {
      checkUpdateF();
    });  
	// 转换为 Boolean 类型
	function toBoolean(s) {
		return typeof(s) == 'boolean' ? s : (s == 'true' ? true : false);
	}
	/*********************************************************************************************
	 * 各功能函数 结束
	 *********************************************************************************************/
})();