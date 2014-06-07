// ==UserScript==
// @name        DBank Linker
// @namespace   924a0340-eb53-4539-a285-d19214f30361
// @description DBank网盘（华为网盘）免登录下载、去广告、复制所有选中链接、自动签到等更多功能。Downloadable for non-logged in users, remove ads & more features for DBank download pages. 详细介绍: userscripts.org/scripts/show/116879 emulefans.com/dbank-linker
// @include     http://dl.vmall.com/*
// @include     http://dl.dbank.com/*
// @include     http://dbank.vmall.com/netdisk/*
// @include     http://vip.dbank.com/*
// @run-at      document-start
// @updateURL   https://userscripts.org/scripts/source/116879.meta.js
// @downloadURL https://userscripts.org/scripts/source/116879.user.js
// @version     4.2.6
// @grant       GM_addStyle
// @author      tomchen1989 <tomchen1989[AT]yahoo.com.cn>
// @license     MIT/Expat License
// ==/UserScript==
(function () {

function addStyleCompatible(css) {
	if (typeof(GM_addStyle) != "undefined") {
		if (typeof(GM_updatingEnabled) == "undefined" || document.getElementsByTagName("head").length !== 0) {
			GM_addStyle(css);//Greasemonkey, Google Chrome, Tampermonkey
		} else {
			var timer = window.setInterval(function() {//<head> must be loaded to use GM_addStyle in Scriptish
				if (document.getElementsByTagName("head").length !== 0) {
					window.clearInterval(timer);
					GM_addStyle(css);
				}
			}, 3);
		}
	} else if (typeof(PRO_addStyle) != "undefined") {//IEPro
		PRO_addStyle(css);
	} else if (typeof(addStyle) != "undefined") {//some plugins
		addStyle(css);
	} else {//others
		var head = document.querySelector("head"),
		style;
		if (head) {
			style = document.createElement("style");
			style.type = "text/css";
			style.innerHTML = css;
			head.appendChild(style);
		}
	}
}

function addEventCompatible(obj, evtType, fn) {
	if (obj.addEventListener) {//W3C
		obj.addEventListener(evtType, fn, false);
	} else if (obj.attachEvent) {//IE<9
		obj.attachEvent("on" + evtType, function (e) {
			fn.call(obj, e);//make "this" keyword refer to the obj
		});
	}
}

function onCondition(condition, todo, timeLimit, startOnWindowLoaded) {//check "condition" every 50 msc, do "todo" when "condition" exists or is true, pass the return value of the "condition" as the only argument to "todo"; the check starts when window loaded (if "startOnWindowLoaded" is presented) or the function excuted, and finishes after "timeLimit" (msc) (if "timeLimit" is presented) or window loaded
	timeLimit = timeLimit || false;
	startOnWindowLoaded = startOnWindowLoaded || false;
	var timer,
	windowLoaded = false;
	if (timeLimit) {
		var n = 0,
		limitTimes = timeLimit / 50;
	}
	function cycle() {
		var conditionReturn = condition();
		if (conditionReturn) {
			todo(conditionReturn);
		} else if (windowLoaded && !timeLimit || timeLimit && n > limitTimes) {
			return;
		} else {
			if (timeLimit) {
				n++;
			}
			timer = window.setTimeout(cycle, 50);
		}
	}
	if (startOnWindowLoaded) {
		addEventCompatible(window, "load", cycle);
	} else {
		cycle();
	}
	if (!timeLimit) {
		addEventCompatible(window, "load", function () {
			windowLoaded = true;
		});
	}
}

function $c(tagName, attributeListObj) {//create element
	var el;
	if (attributeListObj) {
		if (attributeListObj.hasOwnProperty("name")) {
			try {
				el = document.createElement("<" + tagName + " name='" + attributeListObj["name"] + "'></" + tagName + ">");
			} catch (e) {
				el = document.createElement(tagName);
				el.name = attributeListObj["name"];
			}
		} else {
			el = document.createElement(tagName);
		}
		for (var attrName in attributeListObj) {
			attrValue = attributeListObj[attrName];
			if (attrName == "name") {
			} else if (attrName == "class") {
				el.className = attrValue;
			} else if (attrName == "style") {
				el.style.cssText = attrValue;
			} else if (attrName == "innerHTML") {
				el.innerHTML = attrValue;
			} else {
				el.setAttribute(attrName, attrValue);
			}
		}
	} else {
		el = document.createElement(tagName);
	}
	return el;
}

function insertAfter(targetEl, insertedEl) {
	var parent = targetEl.parentNode;
	parent.insertBefore(insertedEl, targetEl);
	parent.insertBefore(targetEl, insertedEl);
}

function getUnsafeWindow() {
	if (typeof(this.unsafeWindow) != "undefined") {//Greasemonkey, Scriptish, Tampermonkey, etc.
		return this.unsafeWindow;
	} else if (typeof(unsafeWindow) != "undefined" && this === window && unsafeWindow === window) {//Google Chrome natively
		var node = document.createElement("div");
		node.setAttribute("onclick", "return window;");
		return node.onclick();
	} else {//Opera, IE7Pro, etc.
		return window;
	}
}

var myUnsafeWindow = getUnsafeWindow();

addStyleCompatible("\
/* remove ads & cancel 资源加载中,请稍候 */\
.adWrapper, .elink-t-banner, #filelist_marker {\
	display: none!important;\
}\
.list-cnt {\
	position: absolute;\
	top: 0;\
	right: -4em;\
	color: #646464;\
	width: 4.5em;\
	overflow: hidden;\
	background: #FFF;\
	border-left: #FDD7D6 solid 1px;\
	border-bottom: 1px dashed #DDD;\
}\
#dbanklinkerselected {\
	position: absolute;\
	right: -4em;\
	display: inline-block;\
	background: #99ff99;\
	padding: 1px 4px;\
	border-radius: 10px;\
	box-shadow: 1px 1px 1px #555;\
}\
#xunleidown, .dbanklinkerbtn {\
	display: inline-block;\
	height: 1em;\
	line-height: 1em;\
	margin: 5px;\
	padding: 0.5em;\
	color: #FFF;\
	font-size: 150%;\
	font-family: 'Microsoft YaHei';\
	font-weight: bold;\
	background: #9CD514;\
	background: linear-gradient(top, red, blue);\
	border-radius: 5px;\
	text-shadow: #555 1px 1px 1px;\
	box-shadow: 2px 2px 2px #555;\
	position: relative;\
}\
#xunleidown:hover, .dbanklinkerbtn:hover {\
	cursor: pointer;\
	text-decoration: none;\
	color: #FFF;\
	background: #8DE22E;\
}\
#dbanklinkershowbuttontitle {\
	margin: 6px 0 1px;\
}\
#dbanklinkertips {\
	margin-left: 6px;\
	font-size: 120%;\
	font-weight: bold;\
}\
#dbanklinkertipsgou {\
	background: #99ff99;\
	border: 1px solid #000;\
}\
#dbanklinkerhomelink {\
	line-height: 1.2em;\
	text-decoration: none;\
	display: inline-block;\
}\
.logininfor #dbanklinkerhomelink {\
	position: absolute;\
	right: -3.8em;\
	width: 3.5em;\
}\
#logininfor #dbanklinkerhomelink {\
	margin-left: 5px;\
	padding-left: 8px;\
	border-left: 1px solid #fff;\
	color: #fff;\
}\
#dbanklinkerhomelink:hover {\
	background: #000;\
}\
#dbanklinkerlinks {\
	display: block;\
	z-index: 99;\
	position: absolute;\
	right: 0;\
	top: 3.1em;\
	width: 13em;\
	background: #000;\
	box-shadow: 3px 3px 4px #555;\
}\
.logininfor #dbanklinkerlinks {\
	right: -3.8em;\
}\
#logininfor #dbanklinkerlinks {\
	top: 2.3em;\
}\
#logininfor #dbanklinkerlinks li {\
	padding: 0;\
}\
.header {\
	z-index: 11 !important;\
}\
#dbanklinkerlinks li a {\
	display: block;\
	width: 12em;\
	margin: 0;\
	padding: 0.5em;\
	height: 2em;\
	line-height: 2em;\
	text-align: right;\
}\
#dbanklinkerlinks li a:hover {\
	text-decoration: none;\
	background: #666;\
}\
");

var browser;
var ua = navigator.userAgent;
if (/Firefox/g.test(ua)) {
	browser = "Firefox";
} else if (/Chrome/g.test(ua)) {
	browser = "Chrome";
} else if (/Safari/g.test(ua)) {
	browser = "Safari";
} else if (/Opera/g.test(ua)) {
	browser = "Opera";
} else if (/MSIE/g.test(ua)) {
	browser = "IE";
} else {
	browser = "other";
}

//make adsShow false
onCondition(function (){
	return (typeof(myUnsafeWindow.adsShow) != "undefined");
}, function (){
	myUnsafeWindow.adsShow = false;
});

//==main block #xunleidown starts==
onCondition(function () {
	return document.querySelector("#xunleidown") &&
		(typeof(myUnsafeWindow.dbank) != "undefined") &&
		(typeof(myUnsafeWindow.dbank.crt) != "undefined") &&
		(typeof(myUnsafeWindow.dbank.crt.decrypt) != "undefined");
}, function () {

if (!document.querySelector("#dbanklinkerhomelink")) {//check if DBank Linker is already running

var lis = document.querySelectorAll("#down_filelist li"),
multiFiles = (myUnsafeWindow.globallinkdata.data.resource.files.length === 1) ? false : true,
copyTa = $c("textarea", {"id": "dbanklinkercopyta", "style": "display: none;"}),
copyTaXl = $c("textarea", {"id": "dbanklinkercopytaxl", "style": "display: none;"}),
xunleiDown = document.querySelector("#xunleidown");
document.body.appendChild(copyTa);
document.body.appendChild(copyTaXl);

function getFileInfoById(id) {
	if (typeof(myUnsafeWindow.globallinkdata) == "undefined") {
		return false;
	}
	for (var files = myUnsafeWindow.globallinkdata.data.resource.files, i = 0, l = files.length; i < l; i++) {
		if (files[i].id == id) {
			return files[i];
		}
	}
	return false;
}//.downloadurl, .xunleiurl, .cnt, .size

function getUrlById(id, type) {//without type = downloadurl; with type = xunleiurl
	if (type) {
		return myUnsafeWindow.dbank.crt.decrypt(getFileInfoById(id).xunleiurl, myUnsafeWindow.globallinkdata.data.encryKey);
	}
	return myUnsafeWindow.dbank.crt.decrypt(getFileInfoById(id).downloadurl, myUnsafeWindow.globallinkdata.data.encryKey);
}

function formatSize(val) {
	var sep = 100,
	unit = "B";
	if (val >= 1099511627776) {
		val = Math.round( val / (1099511627776/sep) ) / sep;
		unit = "T";
	} else if (val >= 1073741824) {
		val = Math.round( val / (1073741824/sep) ) / sep;
		unit = "G";
	} else if (val >= 1048576) {
		val = Math.round( val / (1048576/sep) ) / sep;
		unit = "M";
	} else if (val >= 1024) {
		val = Math.round( val / (1024/sep) ) / sep;
		unit = "K";
	}
	return val + unit;
}

function getChecked(type, all) {//get checked. type: 1=url list; 2=size sum; 3= xunleiurl list. all selected when all=true, none selected when all=false
	var urlList = [], sizeSum = 0, xlUrlList = [];
	for (var i = 0, l = lis.length, thisli, thisa, thischeckbox; i < l; i++) {
		thisli = lis[i];
		thisa = thisli.querySelector(".list-tit a");
		thischeckbox = thisli.querySelector(".list-select input");
		if ( ( ( !multiFiles || thischeckbox.checked ) && ( all !== false ) ) || ( all === true ) ) {
			urlList.push(getUrlById(thisa.id));
			sizeSum += getFileInfoById(thisa.id).size * 1;
			xlUrlList.push(getUrlById(thisa.id, 1));
		}
	}
	switch (type) {
		case 1:
			return urlList;
		case 2:
			return sizeSum;
		case 3:
			return xlUrlList;
	}
}

function renewSizeNCopy(all) {//renew selected size & copy textarea. all selected when all=true, none selected when all=false
	if (multiFiles) {
		document.querySelector("#dbanklinkerselectedcount").innerHTML = getChecked(1, all).length;
		document.querySelector("#dbanklinkerselectedsize").innerHTML = formatSize(getChecked(2, all));
	}
	copyTa.value = getChecked(1, all).join("\n");
	copyTaXl.value = getChecked(3, all).join("\n");
}

function showTips(text) {
	var tips = document.querySelector("#dbanklinkertips"),
	tipsText = tips.querySelector("#dbanklinkertipstext");
	tipsText.innerHTML = text;
	tips.style.display = "inline";
	var timer = window.setTimeout(function () {
		tips.style.display = "none";
		tipsText.innerHTML = "";
	}, 3000);
}

function checkjQueryEventBinded(id, evtType, num) {
	if (browser == "Chrome") {
		document.body.appendChild($c("script", {
			"id": "dbanklinkertempscript" + num,
			"innerHTML": "window.dbanklinkertempeventdata" + num + " = (typeof(jQuery) != 'undefined') && (jQuery('#" + id + "').data('events')) && (jQuery('#" + id + "').data('events')." + evtType + ");"
		}));
		document.body.removeChild(document.getElementById("dbanklinkertempscript" + num));
		return myUnsafeWindow["dbanklinkertempeventdata" + num];
	}
	return (typeof(myUnsafeWindow.jQuery) != "undefined") &&
		(myUnsafeWindow.jQuery.data(document.querySelector("#" + id), "events")) &&
		(myUnsafeWindow.jQuery.data(document.querySelector("#" + id), "events")[evtType]);
}

function showTitle() {
	if (!showButtonTitle.firstChild) {
		showButtonTitle.appendChild(document.createTextNode(this.title));
		this.title = "";
	} else if (showButtonTitle.firstChild.nodeValue === "") {
		showButtonTitle.firstChild.nodeValue = this.title;
		this.title = "";
	}
}

function hideTitle() {
	if (showButtonTitle.firstChild && showButtonTitle.firstChild.nodeValue !== "") {
		this.title = showButtonTitle.firstChild.nodeValue;
		showButtonTitle.firstChild.nodeValue = "";
	}
}

//set ruleType to 3 to make the register interface not shown
xunleiDown.setAttribute("ruleType", 3);

//handle file list
for (var i = 0, l = lis.length, thisli, thisa, thisa2, thischeckbox, thislistdl, thisid, thisurl, thiscnt; i < l; i++) {
	thisli = lis[i];
	thisa = thisli.querySelector(".list-tit a");
	thisa2 = thisli.querySelector(".list-op a");
	thischeckbox = thisli.querySelector(".list-select input");
	thislistdl = thisli.querySelector(".list-dl");
	thisid = thisa.id;
	thisurl = getUrlById(thisid);

	thisa.href = thisurl;
	thisa2.href = thisurl;
	thisa.removeAttribute("onclick");
	thisa2.removeAttribute("onclick");
	if (multiFiles) {
		thiscnt = getFileInfoById(thisid).cnt;
		if (thiscnt) {
			thislistdl.appendChild($c("span", {
				"class": "list-cnt",
				"innerHTML": "(" + getFileInfoById(thisid).cnt + "次)"
			}));
		}
		addEventCompatible(thischeckbox, "click", renewSizeNCopy);
	}
}

var buttonContainer = xunleiDown.parentNode,
checkAllSpan = buttonContainer.querySelector(".list-select"),
checkAll = checkAllSpan.querySelector("input[name='checkAll']");

if (multiFiles) {
//insert selected links info
	if (multiFiles) {
		insertAfter(document.querySelector("#down_filelist"), $c("span", {
			"id": "dbanklinkerselected",
			"innerHTML": "选中<span id='dbanklinkerselectedcount'></span>个文件，合<span id='dbanklinkerselectedsize'></span>"
		}));
	}

//bind renewSizeNCopy to checkAll
	addEventCompatible(checkAll, "click", function () {
		renewSizeNCopy(checkAll.checked);
	});
}

//init
renewSizeNCopy(true);

//create "下载所选文件" button
var downloadSelTitle = "用浏览器（或浏览器默认下载工具）下载所有勾选的文件（注：";
if (browser == "Chrome") {
	downloadSelTitle += "如您设置了“下载前询问每个文件的保存位置”(默认未选)，将会为每个文件弹出一个窗口，此时如文件过多则不建议使用）";
} else {
	downloadSelTitle += "可能会为每个文件弹出一个确认窗口，文件过多时不建议使用";
	if (browser == "Opera" || browser == "IE") {
		downloadSelTitle += "；可能需要允许弹窗才能使用此功能下载多个文件）";
	} else {
		downloadSelTitle += "）";
	}
}

var downloadSel = $c("a", {
	"id": "dbanklinkerdownloadsel",
	"class": "dbanklinkerbtn",
	"innerHTML": "下载所选文件",
	"title": downloadSelTitle
}),

//create "复制所选链接" button
copySelLinks = $c("a", {
	"id": "dbanklinkercopysellinks",
	"class": "dbanklinkerbtn",
	"innerHTML": "复制所选链接",
	"title": "复制所有勾选文件的直接链接（一行一个）到剪贴板（注：DBank华为网盘文件的直接链接非永久有效，会不断改变，可能几十分钟后就失效，请立即下载、使用，勿作为永久链接张贴）"
}),

hsDownload = document.querySelector("#hsdownload"),
saveToMyNetDisk = document.querySelector("#savetomynetdisk"),
toPhoneDown = document.querySelector("#tophonedown"),
tips = $c("span", {
	"id": "dbanklinkertips",
	"innerHTML": "<span id='dbanklinkertipsgou'>√</span><span id='dbanklinkertipstext'></span>",
	"style": "display: none;"
})

//insert
insertAfter(checkAllSpan, downloadSel);
insertAfter(downloadSel, copySelLinks);
insertAfter(copySelLinks, xunleiDown);
insertAfter(xunleiDown, tips);
insertAfter(tips, $c("br"));

onCondition(function () {
	return checkjQueryEventBinded("xunleidown", "click", "1") &&
		(typeof(myUnsafeWindow.ZeroClipboard) != "undefined");
}, function () {
//re-generate xunleiDown to remove all binded event listeners
	if (browser != "IE") {
		function renewNode(oldEl) {//re-generate node to remove all binded event listeners
			var attributeListObj = {};
			for (var i = 0, l = oldEl.attributes.length, thisAttr; i < l; i++) {
				thisAttr = oldEl.attributes[i];
				attributeListObj[thisAttr.nodeName] = thisAttr.nodeValue;
			}
			attributeListObj["innerHTML"] = oldEl.innerHTML;
			var newEl = $c(oldEl.tagName, attributeListObj);
			oldEl.parentNode.insertBefore(newEl, oldEl);
			oldEl.parentNode.removeChild(oldEl);
			return newEl;
		}
		xunleiDown = renewNode(xunleiDown);
		xunleiDown.removeAttribute("href");
	}
//copy to clipboard
	myUnsafeWindow.ZeroClipboard.setMoviePath("http://st3.dbank.com/js/swf/ZeroClipboard.swf");

//copy to clipboard for copysel
	var clip = new myUnsafeWindow.ZeroClipboard.Client(),
	text2Copy;
	clip.setHandCursor(true);
	clip.addEventListener("mouseOver", function (client) {
		text2Copy = document.querySelector("#dbanklinkercopyta").value;
		if (text2Copy) {
			clip.setText(text2Copy);
		}
	});
	clip.addEventListener("complete", function (client, text) {
		if (text2Copy) {
			showTips("链接已复制到剪贴板");
		} else {
			unsafeWindow.alert("请至少选择一个文件");
		}
	});
	clip.glue("dbanklinkercopysellinks");

	//copy to clipboard for xunlei
	if (browser != "IE") {
		var clip2 = new myUnsafeWindow.ZeroClipboard.Client(),
		text2Copy;
		clip2.setHandCursor(true);
		clip2.addEventListener("mouseOver", function (client) {
			text2Copy = document.querySelector("#dbanklinkercopytaxl").value;
			if (text2Copy && /\n/.test(text2Copy)) {//if its not one xunlei url
				clip2.setText(text2Copy);
			}
		});
		clip2.addEventListener("mouseUp", function (client) {
			if (text2Copy && !/\n/.test(text2Copy)) {//one xunlei url
				window.location = text2Copy;
			}
		});
		clip2.addEventListener("complete", function (client, text) {
			if (text2Copy && /\n/.test(text2Copy)) {
				showTips("迅雷链接已复制到剪贴板");
			} else if (text2Copy) {
				showTips("正在下载迅雷链接");
			} else {
				unsafeWindow.alert("请至少选择一个文件");
			}
		});
		clip2.glue("xunleidown");
	}

	addEventCompatible(xunleiDown, "mouseover", showTitle);
	addEventCompatible(xunleiDown, "mouseout", hideTitle);
}, 5000);

//buttons' .title
if (browser == "IE") {
	xunleiDown.title = "用迅雷批量下载所有勾选的文件";
} else {
	xunleiDown.title = "用迅雷下载所选文件（注：选中单个文件时，链接会输出给迅雷软件下载(此时浏览器需关联“thunder://”链接)；多个文件的话无法直接输给迅雷，而是会复制所有迅雷链接，请自行到迅雷中新建->右键->粘贴并立即下载，如果迅雷打开且监视了剪贴板的话会复制时也会立即弹出窗口）";
}

if (hsDownload) {
	hsDownload.title = "用DBank华为网盘的官方下载软件下载所选链接";
}
saveToMyNetDisk.title = "把文件转存到你的DBank华为网盘中";

//downloadSel bind
addEventCompatible(downloadSel, "click", function () {
	function download(url) {
		if (browser == "Firefox" || browser == "Safari") {
			var iframe = document.createElement("iframe");
			iframe.width = iframe.height = iframe.frameBorder = 0;
			iframe.scrolling = "no";
			iframe.src = url;
			document.body.appendChild(iframe);
		} else {
			window.open(url);
		}
	}
	var lists = getChecked(1),
	l = lists.length;
	if (l > 0) {
		for (var i = 0; i < l; i++) {
			download(lists[i]);
		}
	} else {
		unsafeWindow.alert("请至少选择一个文件");
	}
});

//show button title when mouse on
var showButtonTitle = $c("div", {"id": "dbanklinkershowbuttontitle"});
buttonContainer.appendChild(showButtonTitle);

addEventCompatible(downloadSel, "mouseover", showTitle);
addEventCompatible(downloadSel, "mouseout", hideTitle);

addEventCompatible(copySelLinks, "mouseover", showTitle);
addEventCompatible(copySelLinks, "mouseout", hideTitle);

if (hsDownload) {
	addEventCompatible(hsDownload, "mouseover", showTitle);
	addEventCompatible(hsDownload, "mouseout", hideTitle);
}

addEventCompatible(saveToMyNetDisk, "mouseover", showTitle);
addEventCompatible(saveToMyNetDisk, "mouseout", hideTitle);

if (toPhoneDown) {
	addEventCompatible(toPhoneDown, "mouseover", showTitle);
	addEventCompatible(toPhoneDown, "mouseout", hideTitle);
}

}

});
//==main block #xunleidown ends==

function checkIfLoggedIn() {
	var j = document.cookie.split(";");
	for (var e = 0; e < j.length; e++) {
		var f = j[e].split("=");
		if (f[0].replace(/^ | $/g, "") == "session") {
			return true;
		}
	}
	return false;
}

//DBank Linker's links
onCondition(function (){
	if ( browser == "Opera" &&//Opera has a bug here
		( /^http:\/\/dl\.vmall\.com\//g.test(window.location.href) ||
		/^http:\/\/dl\.dbank\.com\//g.test(window.location.href) ) &&//dbank resources download page
		( (typeof(myUnsafeWindow.dbank) == "undefined") ||
		(typeof(myUnsafeWindow.dbank.crt) == "undefined") ||
		(typeof(myUnsafeWindow.dbank.crt.decrypt) == "undefined") )//runs after this to fix the bug
	) {
		return false;
	}
	var h = document.querySelector("#headerMenu");
	h = h ? h : document.querySelector(".logininfor");
	h = h ? h : document.querySelector("#logininfor");
	return h;
}, function (h){
	var homelink = $c("a", {
		"id": "dbanklinkerhomelink",
		"innerHTML": "DBank<br />Linker",
		"href": "http://emulefans.com/dbank-linker/",
		"target": "_blank"
	}),
	linkUl = $c("ul", {
		"id": "dbanklinkerlinks",
		"innerHTML": "\
	<li><a href='http://emulefans.com/dbank-linker/' target='_blank'>DBank Linker主页</a></li>\
	<li><a href='http://userscripts.org/scripts/show/116879' target='_blank'>UserScripts.org上主页</a></li>\
	<li><a href='https://userscripts.org/scripts/source/116879.user.js' target='_blank'>点击更新/下载最新脚本</a></li>",
		"style": "display: none;"
	});
	h.appendChild(homelink);
	h.appendChild(linkUl);
	addEventCompatible(homelink, "mouseover", function () {
		linkUl.style.display = "block";
	});
	addEventCompatible(linkUl, "mouseover", function () {
		linkUl.style.display = "block";
	});
	addEventCompatible(homelink, "mouseout", function () {
		linkUl.style.display = "none";
	});
	addEventCompatible(linkUl, "mouseout", function () {
		linkUl.style.display = "none";
	});

//auto present sign
	if (checkIfLoggedIn()) {
		onCondition(function (){
			return typeof(myUnsafeWindow.nsp) != "undefined";
		}, function (){
			myUnsafeWindow.nsp.netdisk.nsp_invoke(
				{
					nsp_svc: "com.dbank.signin.signin",
					anticache: Math.floor(Math.random() * 1000)
				},
				function (respond) {//success
					var retcode = respond.retcode;
					if (retcode == "0000") {//successfully present signed
						homelink.innerHTML += "签到成功！";
					}// else if (retcode == "0001") {//already signed
					//}
				},
				function (respond) {//error
				}
			);
		});
	}

}, 3000);

})();