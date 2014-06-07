// ==UserScript==
// @name           hatena_archive_bookmark
// @namespace      http://d.hatena.ne.jp/tomo_snowbug/
// @include        http://d.hatena.ne.jp/*/archive*
// ==/UserScript==

HatenaArchiveAddBookmark = {

	targets: null,
	
	init: function() {
		window.setTimeout(HatenaArchiveAddBookmark.loadTargetAnchors,500);
		this.addCategoryAnchorHandler();
		this.addRssCount();
		this.registerSettingCommand();
		if (GM_getValue(this.isHatebEnabledKey) === undefined) {
			//初回に設定画面を表示
			this.showSettingPanel();
		}
	},
	
	loadTargetAnchors: function() {
		HatenaArchiveAddBookmark._loadTargetAnchors.apply(HatenaArchiveAddBookmark, arguments);
	},
	_loadTargetAnchors: function() {
		if (this.targets === null) {
			//call first time.
			this.targets = [];
			var titleAnchor = document.evaluate("/html/body/h1/a[1]", document, null, 7, null).snapshotItem(0);
			this.targets.push(titleAnchor);
		} else {
			this.targets = [];
		}
		var allAnchors = document.evaluate("//ul[@class='archives']/descendant::a", document, null, 7, null);
		for (var i = 0; i < allAnchors.snapshotLength; i++) {
			var target = allAnchors.snapshotItem(i);
			if (target && target.href.indexOf("/archive") == -1) {
				this.targets.push(target);
			}
		}
		this.addBookmarkCounts();
	},
	
	addBookmarkCounts: function() {
		HatenaArchiveAddBookmark._addBookmarkCounts.apply(HatenaArchiveAddBookmark, arguments);
	},
	_addBookmarkCounts: function() {
		var bks = this.targets;
		var loadAtOnce = 2
		if (bks.length == 0) return;
		for (var i = 0; i < loadAtOnce; i++) {
			var target = bks.shift();
			this.addBookmarkCount(target);
		}
		//callback later.
		window.setTimeout(HatenaArchiveAddBookmark.addBookmarkCounts,250);
	},
	
	addBookmarkCount: function(target) {
		
		if (!target) return;
		console.log("::::"+target);
		
		addFc2BookmarkCount(target);
		addBuzzurlBookmarkCount(target);
		addYahooBookmarkCount(target);
		addLivedoorClipCount(target);
		addHatebCount(target);
		return;
		
		function insertNext(tar,ins) {
			tar.parentNode.insertBefore(ins, tar.nextSibling);
		}
		function createImageTag(url) {
			var img = document.createElement("img");
			img.src = url;
			img.style.verticalAlign = "middle";
			img.style.margin = "0px 1px";
			img.style.border = "0px";
			return img;
		}
		function createAnchorTag(url,child) {
			var anc = document.createElement("a");
			anc.href = url;
			anc.appendChild(child);
			return anc;
		}
		function addHatebCount(target) {
			if (!GM_getValue(HatenaArchiveAddBookmark.isHatebEnabledKey)) return;
			var apiUrl = "http://b.hatena.ne.jp/entry/image/";
			var bookmarkUrl = "http://b.hatena.ne.jp/entry/";
			var img = createImageTag(apiUrl + target.href);
			var anc = createAnchorTag(bookmarkUrl + target.href, img);
			anc.title = "\u306f\u3066\u306a\u30d6\u30c3\u30af\u30de\u30fc\u30af";
			insertNext(target, anc);
		}
		function addLivedoorClipCount(target) {
			if (!GM_getValue(HatenaArchiveAddBookmark.isLDClipEnabledKey)) return;
			var apiUrl = "http://image.clip.livedoor.com/counter/";
			var bookmarkUrl = "http://clip.livedoor.com/page/";
			var img = createImageTag(apiUrl + target.href);
			var anc = createAnchorTag(bookmarkUrl + target.href, img);
			anc.title = "livedoor\u30af\u30ea\u30c3\u30d7";
			insertNext(target, anc);
		}
		function addYahooBookmarkCount(target) {
			if (!GM_getValue(HatenaArchiveAddBookmark.isYahooBKMEnabledKey)) return;
			var apiUrl = "http://num.bookmarks.yahoo.co.jp/image/small/";
			var bookmarkUrl = "http://bookmarks.yahoo.co.jp/url?url=";
			var img = createImageTag(apiUrl + target.href);
			var anc = createAnchorTag(bookmarkUrl + encodeURIComponent(target.href), img);
			anc.title = "yahoo\u30d6\u30c3\u30af\u30de\u30fc\u30af";
			insertNext(target, anc);
		}
		function addBuzzurlBookmarkCount(target) {
			if (!GM_getValue(HatenaArchiveAddBookmark.isBuzzurlBKMEnabledKey)) return;
			var apiUrl ="http://api.buzzurl.jp/api/counter/";
			var bookmarkUrl = "http://buzzurl.jp/entry/";
			var img = createImageTag(apiUrl + target.href);
			var anc = createAnchorTag(bookmarkUrl + target.href, img);
			anc.title = "Buzzurl";
			insertNext(target, anc);
		}
		function addFc2BookmarkCount(target) {
			if (!GM_getValue(HatenaArchiveAddBookmark.isFc2BKMEnabledKey)) return;
			var apiUrl ="http://bookmark.fc2.com/image/users/";
			var bookmarkUrl = "http://bookmark.fc2.com/search/url?url=";
			var img = createImageTag(apiUrl + target.href);
			var anc = createAnchorTag(bookmarkUrl + encodeURIComponent(target.href), img);
			anc.title = "fc2\u30d6\u30c3\u30af\u30de\u30fc\u30af";
			insertNext(target, anc); 
		}
	},
	
	addCategoryAnchorHandler: function() {
		var categoryAnchors = document.evaluate("//div[@id='archive-category']/descendant::a", document, null, 7, null);
		for (var i = 0; i < categoryAnchors.snapshotLength; i++) {
			categoryAnchors.snapshotItem(i).addEventListener("click",function() {
				window.setTimeout(HatenaArchiveAddBookmark.loadTargetAnchors,500);
			},false);
		}
	},
	addRssCount: function() {
		//add LDR and fastladder count.
		var apiUrl_ldr = "http://rpc.reader.livedoor.com/count?feedlink=";
		var apiUrl_flr = "http://rpc.fastladder.com/count?feedlink=";
		var targetAnc = null;
		var allAnc = document.getElementsByTagName("a");
		for (var i = 0; i < allAnc.length; i++) {
			if (allAnc[i].href.match(/.*\/rss$/)) {
				targetAnc = allAnc[i];
				break;
			}
		}
		if (targetAnc == null) return;
		//add LDR count.
		if (GM_getValue(this.isLdrEnabledKey)) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: apiUrl_ldr + encodeURIComponent(targetAnc.href),
				headers: {
					'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					},
				onload: function(ret) {
					var count = ret.responseText;
					var ctag = createCountTag();
					if(count == 1) {
						ctag.innerHTML = "LDR: "+ count + " user";
						insertNext(targetAnc, ctag);
					} else if (count > 1) {
						ctag.innerHTML = "LDR: "+ count + " users";
						insertNext(targetAnc, ctag);
					}
				}
			});
		}
		//add fastladder count.
		if (GM_getValue(this.isFastLadderEnabledKey)) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: apiUrl_flr + encodeURIComponent(targetAnc.href),
				headers: {
					'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				},
				onload: function(ret){
					var count = ret.responseText;
					var ctag = createCountTag();
					if (count == 1) {
						ctag.innerHTML = "Fastladder: " + count + " user";
						insertNext(targetAnc, ctag);
					} else if (count > 1) {
						ctag.innerHTML = "Fastladder: " + count + " users";
						insertNext(targetAnc, ctag);
					}
				}
			});
		}
		
		function createCountTag() {
			var ret = document.createElement("span");
			ret.setAttribute("style",
				"border: 1px solid green; margin: 0px 3px;padding: 1px 1px 0px;" +
				"font-size: 10px; font-waight: normal;");
			return ret;
		}
		
		function insertNext(tar,ins) {
			tar.parentNode.insertBefore(ins, tar.nextSibling);
		}
	},
	registerSettingCommand: function() {
		GM_registerMenuCommand("Hatena Archive Bookmark - config",HatenaArchiveAddBookmark.showSettingPanel);
	},
	settingPanel: null,
	isHatebEnabledKey: "__hateb_Enabled",
	isLDClipEnabledKey: "__ldclip_Enabled",
	isYahooBKMEnabledKey: "__ybkm_Enabled",
	isBuzzurlBKMEnabledKey: "__buzzurl_Enabled",
	isFc2BKMEnabledKey: "__fc2bkm_Enabled",
	isLdrEnabledKey: "__ldr_Enabled",
	isFastLadderEnabledKey: "__fast_LadderEnabled",
	showSettingPanel: function() {
		HatenaArchiveAddBookmark._showSettingPanel.apply(HatenaArchiveAddBookmark, arguments);
	},
	_showSettingPanel: function() {
		if (this.settingPanel != null) return;
		var panelBase = createBase();
		var enableHatebCheck = createCheckUi("hatena bookmark",this.isHatebEnabledKey);
		var enableLdClipCheck = createCheckUi("livedoor clip",this.isLDClipEnabledKey);
		var enableYahooBKMCheck = createCheckUi("yahoo bookmark",this.isYahooBKMEnabledKey);
		var enableBuzzurlBKMCheck = createCheckUi("buzzurl",this.isBuzzurlBKMEnabledKey);
		var enableFc2BKMCheck = createCheckUi("fc2 bookmark",this.isFc2BKMEnabledKey);
		var enableLdrCheck = createCheckUi("livedoor reader",this.isLdrEnabledKey);
		var enableFlrCheck = createCheckUi("fastladdr",this.isFastLadderEnabledKey);
		append(panelBase,enableHatebCheck,
			enableLdClipCheck,enableYahooBKMCheck,enableBuzzurlBKMCheck,
			enableFc2BKMCheck,enableLdrCheck,enableFlrCheck);
		var enterButton = createEnterButtonUi();
		append(panelBase, enterButton);
		append(window.top.document.body, panelBase);
		this.settingPanel = panelBase;
		return;
				
		function createBase() {
			var ret = create("div");
			ret.setAttribute("style","position:fixed; right:10px; bottom:10px;" +
				"width: 200px; height:200px; background-color:black; color:white;" +
				"opacity: 0.7; border:3px double silver;" +
				"font-size:12px; padding:5px;");
			ret.id = this.settingPanelId;
			var title = create("p");
			title.innerHTML = "Hatena Archive Bookmark: config";
			ret.appendChild(title);
			return ret;
		}
		function createCheckUi(label, id) {
			var ret = create("div");
			ret.setAttribute("style","text-align: left;");
			var _label = create("label");
			_label.setAttribute("for",id);
			_label.setAttribute("style","padding: 0px 5px;");
			_label.innerHTML = label;
			var check = create("input");
			check.id = id;
			check.type = "checkbox";
			check.setAttribute("style"," vertical-align: middle;");
			checked = GM_getValue(id);
			if (checked === true) check.checked = true;
			ret.appendChild(check);
			ret.appendChild(_label);
			return ret;
		}
		function createEnterButtonUi() {
			var button = create("input");
			button.type = "button";
			button.value = " OK ";
			var topdoc = window.top.document;
			button.addEventListener("click", function() {
				setValue(HatenaArchiveAddBookmark.isHatebEnabledKey);
				setValue(HatenaArchiveAddBookmark.isLDClipEnabledKey);
				setValue(HatenaArchiveAddBookmark.isYahooBKMEnabledKey);
				setValue(HatenaArchiveAddBookmark.isBuzzurlBKMEnabledKey);
				setValue(HatenaArchiveAddBookmark.isFc2BKMEnabledKey);
				setValue(HatenaArchiveAddBookmark.isLdrEnabledKey);
				setValue(HatenaArchiveAddBookmark.isFastLadderEnabledKey);
				topdoc.body.removeChild(HatenaArchiveAddBookmark.settingPanel);
				HatenaArchiveAddBookmark.settingPanel = null;
				
				function setValue(id) {
					var target = topdoc.getElementById(id);
					if (target && target.checked === true) {
						console.log("set true: " +id);
						GM_setValue(id, true);
					} else {
						GM_setValue(id, false);
					}
				}
			}, false);
			return button;
		}
		function append() {
			var parent = arguments[0];
			for (var i = 1; i < arguments.length; i++) {
				parent.appendChild(arguments[i]);
			}
		}
		function create(ele) {
			return window.top.document.createElement(ele);
		}
	},
};

HatenaArchiveAddBookmark.init();
