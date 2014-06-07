// ==UserScript==
// @name        百度贴吧批量删贴
// @namespace   http://userscripts.org/scripts/show/148214
// @description 百度贴吧批量删贴脚本，为贴吧大小吧主批量删机器广告贴或爆吧贴之用。Baidu Tieba Batch Delete Threads
// @include     http://tieba.baidu.com/f*
// @include     http://tieba.baidu.com.cn/f*
// @include     http://tieba.baidu.cn/f*
// @run-at      document-start
// @updateURL   https://userscripts.org/scripts/source/148214.meta.js
// @downloadURL https://userscripts.org/scripts/source/148214.user.js
// @version     1.4
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

function addNodeInsertedListener(elCssPath, handler, executeOnce, noStyle) {
	var animName = "anilanim",
	prefixList = ["-o-", "-ms-", "-khtml-", "-moz-", "-webkit-", ""],
	eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function(array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	if (!noStyle) {
		var css = elCssPath + "{",
		css2 = "";
		forEach(prefixList, function(prefix) {
			css += prefix + "animation-duration:.001s;" + prefix + "animation-name:" + animName + ";";
			css2 += "@" + prefix + "keyframes " + animName + "{from{opacity:.9;}to{opacity:1;}}";
		});
		css += "}" + css2;
		addStyleCompatible(css);
	}
	if (handler) {
		var bindedFunc = function(e) {
			var els = document.querySelectorAll(elCssPath),
			tar = e.target,
			match = false;
			if (els.length !== 0) {
				forEach(els, function(el) {
					if (tar === el) {
						if (executeOnce) {
							removeNodeInsertedListener(bindedFunc);
						}
						handler.call(tar, e);
						return;
					}
				});
			}
		};
		forEach(eventTypeList, function(eventType) {
			document.addEventListener(eventType, bindedFunc, false);
		});
		return bindedFunc;
	}
}

function removeNodeInsertedListener(bindedFunc) {
	var  eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function(array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	forEach(eventTypeList, function(eventType) {
		document.removeEventListener(eventType, bindedFunc, false);
	});
}

function hasClass(el, cls) {
	return el.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
 
function addClass(el, cls) {
	if (!hasClass(el, cls)) {
		if (el.className === "") {
			el.className += cls;
		} else {
			el.className += " " + cls;
		}
	}
}
 
function removeClass(el, cls) {
	if (hasClass(el, cls)) {
		var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
		el.className = el.className.replace(reg, "");
	}
}

function getDataSet(dataName, el) {//dataName is camelCaseD without "-"
	function deCamelCase(str) {//camelCase to camel-case
		return str.replace(/([A-Z])/g, function(word){
			return "-" + word.toLowerCase();
		});
	}
	if (el.dataset !== undefined) {
		return el.dataset[dataName];
	} else {//dataset not supported
		return el.getAttribute("data-" + deCamelCase(dataName));
	}
}

addStyleCompatible("\
.tiebabatchdel_selected {\
	background-color: #ffaeae !important;\
}\
#tiebabatchdel_span {\
	position: relative;\
}\
#tiebabatchdel_ul {\
	position: absolute;\
	right: 0;\
	top: 1.5em;\
	background: #fff;\
	width: 5.2em;\
	border: 1px solid #ccc;\
	border-bottom: none;\
}\
#tiebabatchdel_ul li {\
	display: block;\
	border-bottom: 1px solid #ccc;\
}\
#tiebabatchdel_ul li a {\
	display: block;\
	margin: 0;\
	padding: 0.4em;\
	text-decoration: none;\
	line-height: 1.5em;\
}\
#tiebabatchdel_ul li a:hover {\
	background: #ddd;\
}\
#tiebabatchdel_page {\
	display: block;\
	text-align: center;\
}\
#tiebabatchdel_pagefrom, #tiebabatchdel_pageto {\
	width: 2em;\
	height: 1.4em;\
	line-height: 1.4em;\
}\
#search_baidu_promote, #search_button {\
	display: none !important;\
}\
");

addNodeInsertedListener(".s_tools", function() {
	function delThread(tid) {
		myUnsafeWindow.PostHandler.execute("threadDelete", {
			ie: "utf-8",
			tbs: myUnsafeWindow.PageData.tbs,
			kw: myUnsafeWindow.PageData.forum.forum_name,
			fid: myUnsafeWindow.PageData.forum.forum_id,
			tid: tid
		}, function (c) {
		/*	var b = "";
			switch (c.no) {
			case 0:
				location.href = "/f?kw=" + myUnsafeWindow.PageData.forum_name_u;
				break;
			case 12:
			case 13:
				myUnsafeWindow.Thread_add_result.resultNo = c.no;
				b = myUnsafeWindow.Thread_add_result.getMessage();
				break;
			default:
				b = "删除主题操作失败";
				break;
			}
			if (b != "") {
				var d = new myUnsafeWindow.Messager(b, "", false);
			}*/
		});
	}

	var thr = this,
	myspan = document.createElement("span");
	thr.appendChild(myspan);
	myspan.id = "tiebabatchdel_span";
	var bt = document.createElement("a");
	myspan.appendChild(bt);
	bt.innerHTML = "批量删贴";
	bt.href = "#";
	bt.id = "tiebabatchdel";
	var myul = document.createElement("ul");
	myspan.appendChild(myul);
	myul.id = "tiebabatchdel_ul";
	myul.style.display = "none";

	var myli1 = document.createElement("li");
	myul.appendChild(myli1);
	var bt1 = document.createElement("a");
	bt1.innerHTML = "全选";
	bt1.href = "#";
	bt1.id = "tiebabatchdel_selectall";
	myli1.appendChild(bt1);

	var myli2 = document.createElement("li");
	myul.appendChild(myli2);
	var bt2 = document.createElement("a");
	bt2.innerHTML = "全不选";
	bt2.href = "#";
	bt2.id = "tiebabatchdel_selectnone";

	var myli3 = document.createElement("li");
	myul.appendChild(myli3);
	var bt3 = document.createElement("span");
	bt3.innerHTML = "<input type='button' id='tiebabatchdel_pageload' value='载入页' /><br /><input type='text' id='tiebabatchdel_pagefrom' value='2' />-<input type='text' id='tiebabatchdel_pageto' value='2' />";
	bt3.href = "#";
	bt3.id = "tiebabatchdel_page";
	myli3.appendChild(bt3);
	myli2.appendChild(bt2);

	var myli4 = document.createElement("li");
	myul.appendChild(myli4);
	var bt4 = document.createElement("a");
	bt4.innerHTML = "删除所选";
	bt4.href = "#";
	bt4.id = "tiebabatchdel_execute";
	myli4.appendChild(bt4);

	function bindThrlistEvent() {
		var initChk = -1,
			thrlist = document.querySelectorAll(".j_thread_list"),
			i = 0,
			l = thrlist.length,
			toggleClassMode = function(el) {
				if (!hasClass(el, "tiebabatchdel_selected")) {
					addClass(el, "tiebabatchdel_selected");
				} else {
					removeClass(el, "tiebabatchdel_selected");
				}
			};
		for (; i < l; i++) {
			(function (i) {
				thrlist[i].addEventListener("click", function(e) {
					e.preventDefault();
					if (!e.shiftKey) {
						initChk = i;
						toggleClassMode(thrlist[i]);
					} else {
						var s, end;
						if (initChk < i) {
							s = initChk + 1;
							end = i;
						} else {
							s = i;
							end = initChk - 1;
						}
						for (; s <= end; s++){
							toggleClassMode(thrlist[s]);
						}
					}
				}, false);
			})(i);
		}
	}

	document.querySelector("#tiebabatchdel").addEventListener("click", function (e) {
		e.preventDefault();
		var theul = document.querySelector("#tiebabatchdel_ul"),
			pagerAs = document.querySelectorAll("#frs_list_pager a"),
			i2 = 0,
			l2 = pagerAs.length;
		if (theul.style.display == "none") {
			theul.style.display = "block";
			bt.innerHTML = "取消批删";
			bindThrlistEvent();
			addStyleCompatible("\
			#thread_list {\
				-webkit-touch-callout: none !important;\
				-webkit-user-select: none !important;\
				-khtml-user-select: none !important;\
				-moz-user-select: none !important;\
				-ms-user-select: none !important;\
				-o-user-select: none !important;\
				user-select: none !important;\
			}\
			");
			for (; i2 < l2; i2++) {
				pagerAs[i2].addEventListener("click", function(e) {
					theul.style.display = "none";
					bt.innerHTML = "批量删贴";
				}, false);
			}
			document.querySelector("#refresh").addEventListener("click", function(e) {
				theul.style.display = "none";
				bt.innerHTML = "批量删贴";
			}, false);
		} else {
			location.reload();
		}
	}, false);

	document.querySelector("#tiebabatchdel_selectall").addEventListener("click", function (e) {
		e.preventDefault();
		var thrlist = document.querySelectorAll(".j_thread_list"),
			i = 0,
			l = thrlist.length;
		for (; i < l; i++) {
			addClass(thrlist[i], "tiebabatchdel_selected");
		}
	}, false);

	document.querySelector("#tiebabatchdel_selectnone").addEventListener("click", function (e) {
		e.preventDefault();
		var thrlist = document.querySelectorAll(".j_thread_list"),
			i = 0,
			l = thrlist.length;
		for (; i < l; i++) {
			removeClass(thrlist[i], "tiebabatchdel_selected");
		}
	}, false);

	document.querySelector("#tiebabatchdel_pageload").addEventListener("click", function (e) {
		var pagenumFrom = document.querySelector("#tiebabatchdel_pagefrom").value * 1,
			pagenumTo = document.querySelector("#tiebabatchdel_pageto").value * 1,
			pagenumMax = document.querySelector("#frs_list_pager .last").href.match(/.+&pn=(\d+)/)[1] * 1;
		if (!pagenumFrom.toString().match(/^[0-9]+$/) || !pagenumTo.toString().match(/^[0-9]+$/) || pagenumFrom < 1 || pagenumTo < 1 || pagenumTo > pagenumMax || pagenumFrom > pagenumTo ) {
			myUnsafeWindow.alert("页码输入有误。");
			return;
		}
		function loadNextPage(current, to) {
			myUnsafeWindow.jQuery.get("http://tieba.baidu.com/f?kw=" + myUnsafeWindow.PageData.forum.name_url + "&pn=" + (current - 1) * 50 + "&apage=1&t=" + new Date().getTime(), function (text) {
				var reg = /<ul id=\"thread_list\" class=\"threadlist\">([\s\S]+<div class=\"clear\">\s*<\/div>\s*<\/li>)\s*<\/ul>/m;
				var pageContent = text.match(reg)[1];
				document.querySelector("#thread_list").innerHTML += pageContent;
				current++;
				if (current > to) {
					bindThrlistEvent();
					return;
				}
				loadNextPage(current, to);
			});
		}
		loadNextPage(pagenumFrom, pagenumTo);
	}, false);

	document.querySelector("#tiebabatchdel_execute").addEventListener("click", function (e) {
		e.preventDefault();
		var delselected = document.querySelectorAll(".tiebabatchdel_selected"),
			i = 0,
			l = delselected.length,
			myField;
		if (l > 0) {
			if (confirm("您确定要删除选中的" + l + "个主题贴吗？")) {
				for (; i < l; i++) {
					myField = JSON.parse(getDataSet("field", delselected[i]));
					delThread(myField.id);
				}
				location.reload();
			}
		}
	}, false);

}, true);

})();