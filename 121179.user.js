// ==UserScript==
// @name           Weibo Indicator
// @author         mattmonkey
// @namespace      weiboindicator
// @description    改造新浪微博的Favicon，通过色彩柔和的提醒你当前的未读条数
// @include        *weibo.com/u/*
// @version		   0.2
// @history        0.2  添加用户脚本设置菜单和通用化
// @history        0.1 第一版  
// ==/UserScript==
(function() {
	if (!window.self == window.top) return;

	// 配置全彩阀值的方法
	// step 1 ： 当前页面在自己的微博主页
	// step 2 ： 选择Tool-->GreaseMonkey-->用户脚本命令
	var siteDatas = {
		"weibo.com": new IndicatorBean({
			unread: "a[class=notes]",
			homepage: "div[class=input]",
		}),
	/**	"reader.youdao.com": new IndicatorBean({
			unread: "#allUnreadSpan",
			limit: 30
		}),
		"www.google.com": new IndicatorBean({
			unread: "#reading-list-unread-count",
			icon: "reader/ui/favicon.ico",
			limit: 100,
			lowest: 0.5
		})*/
	}

	var hostname = location.hostname;

	if (siteDatas[hostname]) {
		new WebIndicatorImpl(siteDatas[hostname]).start();
	}

	// classes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	
	function IndicatorBean(data) {
		this.homepage = "" // 确认页面用的第二个选择器
		this.icon = "favicon.ico" //
		this.limit = 15 // 全彩时的阀值
		this.unread = "" // 获取各类”未读数值“的选择器
		this.lowest = 0.01 // limit较大时用.比如limit为50,lowest为0.5时，未读数为1时，半彩色
		for(var k in data){
			this[k]=data[k]
		}
	}

	function WebIndicatorImpl(site) {
		
		var itv = $GV("itv", 5),
		nrn = $GV("nrn", site.limit),
		siteicon = "http://" + hostname + "/" + site.icon;

		// inherited WebIndicator
		WebIndicator.call(this, itv);
		this.indicator = new Indicator(siteicon);
		this.ui = new UIHandler(site.unread, site.homepage, nrn, this.timer);
	}

	function WebIndicator(itv) {
		this.timer = new Timer(itv * 1000);
		this.start = function() {
			if (this.ui.validate() == false) return;
			var thisScope = this;
			this.timer.process(function() {
				thisScope.indicator.drawAnFavicon(thisScope.ui.getUnReadParam());
			},
			function() {
				thisScope.indicator.drawAnFavicon(0.01);
			})
		}
	}

	function Timer(interval) {
		var tid = 0,
		fnRef = null,
		redoRef = null;
		this.process = function(fn, redo, flg) {
			fnRef = fn;
			redoRef = redo;
			tid = setInterval(fn, interval)
			flg ? redo() : fn();
		}

		this.redo = function() {
			clearInterval(tid);
			this.process(fnRef, redoRef, true);
		}
	}

	function UIHandler(unReadSelector, homePageSelector, limiting, timer) {
		var self2 = this;

		this.getUnReadParam = function checkUnReadCount() {
			var notesLink = document.querySelector(unReadSelector);
			addProcess(notesLink);

			var unReadNum = notesLink == null ? 0: notesLink.textContent.match(/\d{1,}/);
			return unReadNum > limiting ? 1: unReadNum / limiting;
		}

		function addProcess(link) {
			if (link) {
				//https://developer.mozilla.org/en/DOM/element.addEventListener#Multiple_identical_event_listeners
				link.addEventListener("click", self2)
			}
		}

		this.isHomePage = function() {
			if (!homePageSelector) return true;
			return (document.querySelector(homePageSelector) != null)
		}

		this.isTopView = function() {
			return (window.self == window.top);
		}

		this.validate = function() {
			return this.isHomePage() && this.isTopView();
		}

		this.handleEvent = function() {
			timer.redo();
		}

		this.setTitle = function(num) {
			window.title = "[" + num + "]" + window.title;
		}
	}

	function Indicator(url, lowest) {

		var pageFavicon = null,
		canvas = null,
		canvasContext = null,
		head = self.document.head,
		icoUrl = url,
		olderScale = null,
		size = 16,
		lowest = lowest ? lowest: 0;

		this.init = function initCanvas() {
			var canvas = document.createElement("canvas");
			canvas.width = size;
			canvas.height = size;
			this.canvas = canvas;
			this.canvasContext = this.canvas.getContext("2d");
		}

		this.drawAnFavicon = function(scale) {
			var aImage = new Image();
			aImage.src = icoUrl;

			// optimized 	
			if (olderScale == scale) {
				return;
			}

			olderScale = scale;
			// bug: aImage.onload			
			aImage.addEventListener("load", this);
		}

		this.handleEvent = function(evt) {
			this.canvasContext.clearRect(0, 0, size, size);
			// scaling 16*16
			this.canvasContext.drawImage(evt.target, 0, 0, size, size);
			var tmpData = this.canvasContext.getImageData(0, 0, size, size);
			this.hightLightImage(tmpData.data, size, size, olderScale);
			this.canvasContext.putImageData(tmpData, 0, 0);
			this.setFavicon(this.canvas.toDataURL());
		}

		this.setFavicon = function setFavicon(data) {
			if (pageFavicon) {
				head.removeChild(pageFavicon)
			}

			var indicator = document.createElement("link");
			indicator.type = "image/png";
			indicator.setAttribute("rel", "icon");
			indicator.setAttribute("href", data);
			head.appendChild(indicator);
			pageFavicon = indicator;
		}

		this.hightLightImage = function(data, h, w, pct) {
			pct = (pct < lowest) ? lowest: pct;
			var h2 = h * (1 - pct),
			delimiter = w * h2 * 4;
			for (var i = 0, n = delimiter; i < n; i += 4) {
				var grayscale = data[i] * .3 + data[i + 1] * .59 + data[i + 2] * .11;
				data[i] = grayscale;
				data[i + 1] = grayscale;
				data[i + 2] = grayscale;
			}
		}

		this.init();
	}

	// helper ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	GM_registerMenuCommand("Weibo Indicator- 设置未读数阀值 ", function() {
		var nVal = parseInt(prompt("有多少未读数时，全彩色提醒？", $GV("nrn", 15)).trim())
		if (!isNaN(nVal) && nVal > 0) {
			$SV("nrn", nVal);
		}
	});

	function $GV(key, def) {
		return GM_getValue("weiboindicator_" + hostname + "_" + key, def);
	}

	function $SV(key, value) {
		GM_setValue("weiboindicator_" + hostname + "_" + key, value);
	}

	function log(content) {
		GM_log(content);
	}
})();
