// ==UserScript==
// @name           tieba_At_Ta
// @description    百度贴吧@它
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/mo/*
// @exclude        http://tieba.baidu.com/i/*
// @exclude        http://tieba.baidu.com/f/like*
// @exclude        http://tieba.baidu.com/club/*
// @exclude        http://tieba.baidu.com/shipin/*
// @exclude        http://tieba.baidu.com/bakan*
// @exclude        http://tieba.baidu.com/daquan*
// @exclude        http://tieba.baidu.com/f/tupian*
// @exclude        http://tieba.baidu.com/tb/*
// @exclude        http://tieba.baidu.com/*postBrowserBakan*
// @updateURL      https://userscripts.org/scripts/source/142292.meta.js
// @downloadURL    https://userscripts.org/scripts/source/142292.user.js
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2014.4.24.0
// ==/UserScript==


//下面这一段CSS，可帮助编辑器工具栏不够用的同学，没有这个需要的同学可删除它。
var forCss2er = ".cut_screen{display:none!important;}";
forCss2er += ".tb-editor-wrapper{width:720px !important}";
forCss2er += ".recentImgDiv>.tb-editor-overlay{left:28% !important; top:30px !important;} .arrow.down{left: 218px !important;}";
GM_addStyle(forCss2er);

//脚本主css
var replyCss = "";
replyCss += ".tb_icon_author, .tb_icon_author_rely{background:none !important;background-position:none !important; white-space:nowrap !important;}";
replyCss += ".insertAt{padding:0px 0px 0px 0px; margin:1px 1px; cursor:pointer; background-color:lightGrey; display:inline-block;}";
replyCss += "#attaDiv{background-color:lightGrey; width:450px; border:4px double gray;} #ATTAnewEditDiv *:not(.pageTitle){font-size:12px !important;}";
replyCss += ".leftDiv{display:inline-block; background-color:lightGrey;padding:5px 6px; width:48px;}";
replyCss += ".rightDiv{display:inline-block; background-color:lightGrey; padding:4px 6px; width:375px;}";
replyCss += ".addPlus{cursor:pointer; margin:0px 2px 0px 0px; width:20px; color:blue;}";
replyCss += ".addPlusBack{cursor:pointer; margin:0px 2px 0px 0px; width:20px; color:red;}";
replyCss += ".picFrd{cursor:pointer; margin:0px 2px 0px -1px; width:20px; color:#A0522D; font-size:13px} .bbaa{cursor:pointer; margin:0px 2px 0px -1px; width:20px; color:green; font-size:13px} .bbaaB{cursor:pointer; margin:0px 2px 0px -1px; width:20px; color:#1E90FF; font-size:13px}";
replyCss += ".picFrdTab{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:#A0522D;} .bbaaTab{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:green;} .bbaaTabB{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:#1E90FF;}";
replyCss += ".addPlusTab{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:blue;}";
replyCss += ".addPlusTabBack{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:red;}";
replyCss += ".closeDivbt{cursor:pointer; float:right; margin:0px -2px; width:16px; height:16px;}";
replyCss += "#atta{cursor:pointer; margin:0 0 0 12px; display:inline-block; color:#3163B6; padding: 1px 1px 10px 1px; position:relative; top:0px}";
replyCss += "#atta_lzl{margin:0 5px 3px 5px; float:right;cursor:pointer; font-size:1.2em; display:inline-block; color:#3163B6;}";
replyCss += ".thread_alt>td:nth-child(4){width:110px} .thread_alt>td:nth-child(5){width:160px}";
replyCss += ".ATeditFaceTxtTb{width:150px; padding:1px 1px 0 0;} .inputInTd{width:149px;} .FTbutton{margin:10px 10px 0px 0px}";
replyCss += "#ATTAnewEditDiv{border: 1px solid gray; z-index:9999; background-color:#EEEEEE; padding:20px; position:fixed; left:300px; bottom:80px;}";
replyCss += ".pageTitle{font-size : 16px; margin-bottom : 15px;}";
replyCss += ".no_icon_author{padding-left:21px !important;}";
GM_addStyle(replyCss);

unsafeWindow.PageData.user.is_login =1;
var $ = unsafeWindow.$;
var Tds = []; //数据修改用列表
var thisPageTitle = document.getElementById("wd1").value + "吧";

//脚本双存储数据相互恢复
if (!localStorage.myBaFriends && GM_getValue("myBaFriends", "") != "") {
	localStorage.myBaFriends = GM_getValue("myBaFriends");
}
if (GM_getValue("myBaFriends", "") == "" && localStorage.myBaFriends) {
	GM_setValue("myBaFriends", localStorage.myBaFriends);
}
if (!localStorage.publicFriends && GM_getValue("publicFriends", "") != "") {
	localStorage.publicFriends = GM_getValue("publicFriends");
}
if (GM_getValue("publicFriends", "") == "" && localStorage.publicFriends) {
	GM_setValue("publicFriends", localStorage.publicFriends);
}

//函数 数组字符串重排序
String.prototype.reIndexStr = function () {
	var lastSt = this.split(",");
	var lastStr = lastSt.sort(function (a, b) {
			return a.localeCompare(b)
		});
	return lastStr;
}

//长ID缩略显示
String.prototype.reComLength = function () {
	var yn = 0;
	var kuu = "";
	for (w in this) {
		if (w < this.length) {
			if (/[a-zA-Z0-9]/.exec(this[w])) {
				yn += 1;
			} else {
				yn += 2;
			}
			if (yn < 13) {
				kuu += this[w];
			}
		}
	}
	var uui = yn > 14 ? kuu + "..." : this;
	return uui;
}
//元素精确监听
function addNodeInsertedListener(elCssPath, handler, executeOnce, noStyle) {
	var animName = "anilanim",
	prefixList = ["-o-", "-ms-", "-khtml-", "-moz-", "-webkit-", ""],
	eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	if (!noStyle) {
		var css = elCssPath + "{",
		css2 = "";
		forEach(prefixList, function (prefix) {
			css += prefix + "animation-duration:.001s;" + prefix + "animation-name:" + animName + ";";
			css2 += "@" + prefix + "keyframes " + animName + "{from{opacity:.9;}to{opacity:1;}}";
		});
		css += "}" + css2;
		GM_addStyle(css);
	}
	if (handler) {
		var bindedFunc = function (e) {
			var els = document.querySelectorAll(elCssPath),
			tar = e.target,
			match = false;
			if (els.length !== 0) {
				forEach(els, function (el) {
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
		forEach(eventTypeList, function (eventType) {
			document.addEventListener(eventType, bindedFunc, false);
		});
		return bindedFunc;
	}
}
//移除精确监听
function removeNodeInsertedListener(bindedFunc) {
	var eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	forEach(eventTypeList, function (eventType) {
		document.removeEventListener(eventType, bindedFunc, false);
	});
}
//获取本吧各数组
function thisBaArray(ww) {
	if (ww == "publicFriends") {
		var bbarray = (localStorage.publicFriends) ? localStorage.publicFriends.split(",") : [];
	} else {
		var getBazhu = JSON.parse((localStorage[ww]) ? localStorage[ww] : "{}");
		var bbarray = getBazhu[thisPageTitle] ? getBazhu[thisPageTitle] : [];
	}
	return bbarray
}
//函数 载入各名单
function loadThe(ww) {
	switch (ww) {
	case "myBaFriends":
		$("#td22div").empty();
		var parentDiv = document.getElementById("td22div");
		break;
	case "bigBaToday":
		var parentDiv = document.getElementById("td12div");
		break;
	case "smallBaToday":
		var parentDiv = document.getElementById("td42div");
		break;
	case "publicFriends":
		$("#td32div").empty();
		var parentDiv = document.getElementById("td32div");
		break;
	}
	if (thisBaArray(ww).length != 0) {
		myFri = thisBaArray(ww).toString().reIndexStr();
		for (l = 0; l < myFri.length; l++) {
			var ddoi = document.createElement("span");
			ddoi.innerHTML = "&nbsp;@" + myFri[l] + "&nbsp;";
			ddoi.className = "insertAt";
			ddoi.addEventListener("click", insertEdiror, false);
			parentDiv.appendChild(ddoi);
		}
	}
}

//函数 插入到编辑器
function insertEdiror(e) {
	var InsertText = e.target.innerHTML;
	var editor = (localStorage['which_editor']) ? localStorage['which_editor'] : 'atta';
	(editor == "atta") ? unsafeWindow.test_editor.execCommand("inserthtml", InsertText) : unsafeWindow.LzlEditor._s_p._se.execCommand("inserthtml", InsertText);
	closeAttable();
}
//函数 这是隐藏的福利，我会说吗？
function insertAll(e) {
	var idd = e.target.id;
	which_ed = (localStorage['which_editor']) ? localStorage['which_editor'] : 'atta';
	var bazhuST = "";
	switch (idd) {
	case "td42div":
		var lmo = thisBaArray("smallBaToday");
		break;
	case "td12div":
		var lmo = thisBaArray("bigBaToday");
		break;
	case "td22div":
		var lmo = thisBaArray("myBaFriends");
		break;
	case "td32div":
		var lmo = thisBaArray("publicFriends");
		break;
	}
	if (lmo.length != 0) {
		for (p = 0; p < lmo.length; p++) {
			bazhuST += "@" + lmo[p] + "&nbsp;";
		}
	}
	(which_ed == "atta") ? unsafeWindow.test_editor.execCommand("inserthtml", bazhuST) : unsafeWindow.LzlEditor._s_p._se.execCommand("inserthtml", bazhuST);
	closeAttable();
}
//列表创建函数
function creaseTable(UrlLength) {
	var tablepp = document.createElement("table");
	tablepp.id = "ATTAtablepp";
	var trs = [];
	for (ly = 0; ly <= Math.ceil(UrlLength / 3); ly++) {
		var tr = document.createElement("tr");
		mmd = trs.push(tr);
		tablepp.appendChild(tr);
	}
	for (ls = 0; ls < trs.length * 3; ls++) {
		var td = document.createElement("td");
		td.className = "ATeditFaceTxtTb";
		td.innerHTML = "<input type='text' class='inputInTd' value=''>";
		wq = Tds.push(td);
		trs[Math.floor(ls / 3)].appendChild(td);
	}
	return tablepp
}
//函数 编辑我的本吧吧友名单
function promptMyfriend(el) {
	if (!document.getElementById("ATTAnewEditDiv")) {
		kpp = el.target.getAttribute("eclass");
		if (kpp == "promptMyfriend") {
			var ujuy = JSON.parse((localStorage["myBaFriends"]) ? localStorage["myBaFriends"] : "{}");
			var myfris = ujuy[thisPageTitle] ? ujuy[thisPageTitle] : [];
		} else {
			var myfris = ((localStorage["publicFriends"]) ? localStorage["publicFriends"] : "").split(",");
		}
		var ATTAnewEditDiv = document.createElement("div");
		ATTAnewEditDiv.id = "ATTAnewEditDiv";

		var pageTitle = document.createElement("div");
		pageTitle.className = "pageTitle";
		pageTitle.innerHTML = "可直接修改或添加：";
		ATTAnewEditDiv.appendChild(pageTitle);

		newTable = creaseTable(myfris.length);
		ATTAnewEditDiv.appendChild(newTable);

		var yesButton = document.createElement("input");
		yesButton.type = "button";
		yesButton.className = "FTbutton";
		yesButton.value = "确定";
		yesButton.addEventListener("click", function () {
			var reGetArray = [];
			var hht = document.getElementsByClassName("inputInTd");
			for (hh = 0; hh < hht.length; hh++) {
				if (hht[hh].value != "") {
					ko = reGetArray.push(hht[hh].value.trim());
				}
			}
			if (reGetArray.length > 0) {
				if (kpp == "promptMyfriend") {
					ujuy[thisPageTitle] = reGetArray;
				} else {
					localStorage["publicFriends"] = reGetArray.toString();
					GM_setValue("publicFriends", reGetArray.toString());
				}
			} else {
				if (kpp == "promptMyfriend") {
					delete ujuy[thisPageTitle];
				} else {
					localStorage.removeItem("publicFriends");
					GM_deleteValue("publicFriends");
				}
			}
			if (kpp == "promptMyfriend") {
				localStorage["myBaFriends"] = JSON.stringify(ujuy);
				GM_setValue("myBaFriends", JSON.stringify(ujuy));
				loadThe("myBaFriends");
			} else {
				loadThe("publicFriends");
			}
			$(".inputInTd").html("");
			$("#ATTAtablepp").remove();
			$("#ATTAnewEditDiv").remove();
		}, false);
		ATTAnewEditDiv.appendChild(yesButton);

		var addButton = document.createElement("input");
		addButton.type = "button";
		addButton.className = "FTbutton";
		addButton.value = "加行";
		addButton.addEventListener("click", function () {
			var tdNum = document.getElementsByClassName("inputInTd").length;
			var newTr = document.createElement("tr");
			document.getElementById("ATTAtablepp").appendChild(newTr);
			for (es = 0; es < 3; es++) {
				var newTD = document.createElement("td");
				newTD.className = "ATeditFaceTxtTb";
				newTD.innerHTML = "<input type='text' class='inputInTd' value=''>";
				newTr.appendChild(newTD);
			}
		}, false);
		ATTAnewEditDiv.appendChild(addButton);
		document.body.appendChild(ATTAnewEditDiv);

		for (ss = 0; ss < myfris.length; ss++) {
			document.getElementsByClassName("inputInTd")[ss].value = myfris[ss];
		}
	}
}
//函数 绝对定位
function getElementLeft(element) {
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null) {
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}
//函数 绝对定位
function getElementTop(element) {
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null) {
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}
//主函数 由编辑窗上方的@@@调用，展开主列表
function createAttable(ete) {
	if (!document.getElementById("attaDiv")) {
		var ortt = ete.target;
		localStorage.which_editor = (ortt.id == "atta") ? 'atta' : 'atta_lzl';
		var getTop = (ortt.id == "atta") ? getElementTop(ortt) + 32 : getElementTop(ortt) + 20;
		//定位主列表位置
		if ($('#tb_rich_poster').css('position')=='fixed' && ortt.id == "atta") { //原子的悬浮窗
					GM_log("Mmax is here")
			var attaDiv = $("<div>", {
					id : "attaDiv"
				}).css({
					"position" : "fixed",
					"z-index" : "9999",
					"right" : "38px",
					"bottom" : "0"
				}).appendTo(document.body);
		} else if (ortt.id == "atta_lzl") { //楼中楼回复
			var attaDiv = $("<div>", {
					id : "attaDiv"
				}).css({
					"position" : "absolute",
					"z-index" : "9999",
					"left" : getElementLeft(ortt) - 200,
					"top" : getTop - 120
				}).appendTo(document.body);
		} else { //主窗
			var attaDiv = $("<div>", {
					id : "attaDiv"
				}).css({
					"position" : "absolute",
					"z-index" : "9999",
					"left" : getElementLeft(ortt) - 200,
					"top" : getTop
				}).appendTo(document.body);
		}
		//建表
		var atTable = $("<table>", {
				"border" : "1",
				"bordercolor" : "#B8B3FF",
				"cellpadding" : "6"
			}).appendTo(attaDiv);
		//TR
		var attr1 = $("<tr>").appendTo(atTable);
		var attr4 = $("<tr>").appendTo(atTable);
		var attr2 = $("<tr>").appendTo(atTable);
		var attr3 = $("<tr>").appendTo(atTable);

		//左TD
		var td11 = $("<td>").appendTo(attr1);
		$("<div>", {
			html : "伟大吧主",
			class : "leftDiv"
		}).appendTo(td11);
		var td41 = $("<td>").appendTo(attr4);
		$("<div>", {
			html : "各位小吧",
			class : "leftDiv"
		}).appendTo(td41);
		var td21 = $("<td>", {
				"eclass" : "promptMyfriend",
				click : promptMyfriend
			}).appendTo(attr2);
		$("<div>", {
			"eclass" : "promptMyfriend",
			html : "本吧吧友",
			class : "leftDiv",
			title : "点击这里，可编辑本吧吧友名单"
		}).appendTo(td21);
		var td31 = $("<td>", {
				"eclass" : "promptPubfriend",
				click : promptMyfriend
			}).appendTo(attr3);
		$("<div>", {
			"eclass" : "promptPubfriend",
			html : "通用吧友",
			class : "leftDiv",
			title : "点击这里，可编辑通用吧友名单"
		}).appendTo(td31);

		//右TD
		var td12 = $("<td>").appendTo(attr1);
		$("<div>", {
			id : "td12div",
			class : "rightDiv",
			dblclick : insertAll
		}).appendTo(td12);
		var td42 = $("<td>").appendTo(attr4);
		$("<div>", {
			id : "td42div",
			class : "rightDiv",
			dblclick : insertAll
		}).appendTo(td42);
		var td22 = $("<td>").appendTo(attr2);
		$("<div>", {
			id : "td22div",
			class : "rightDiv",
			dblclick : insertAll
		}).appendTo(td22);
		var td32 = $("<td>").appendTo(attr3);
		$("<div>", {
			id : "td32div",
			class : "rightDiv",
			dblclick : insertAll
		}).appendTo(td32);

		//关闭按钮
		var closeDivbt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA8UlEQVR42pWSMQrCQBBFcwPvI3gNKwtvYGVhaStqJYiFjY0IFmIrWEXRFIISiIqohYUYFcTC1gc/BFkSEmGyzMz/f3ZmNlaxMSvU7JQG2eJzdvdEW3j++vgstZ1AsNz6OgHkG6EpCFPe5S2qjHBzfgGZAuLV4TGw952Rg6MMVEKSZEyB7V6BW8NlJlcu1ccUPt0+1e6UkBMIgtkSKUi9iStSsz/H4SQJFD00ALXRZPMV2FxISDJ2S2qMpiVggFhB2BJsjaEB0ES3FO4k7dAqQHmm/F0rISMBRWxJjFQPF8IC9DsYoV42EOAlGtdyWyD4y76WWDtXsJol3gAAAABJRU5ErkJggg==";
		$("<span>", {
			class : "closeDivbt",
			click : closeAttable,
			html : "<img src='" + closeDivbt + "' alt='X' />"
		}).appendTo("#td12div");

		//载入吧主到列表中
		loadThe("bigBaToday");
		//载入小吧到列表中
		loadThe("smallBaToday");
		//载入我的吧友
		loadThe("myBaFriends");
		//载入通用吧友
		loadThe("publicFriends");
	}
}
//关闭@@@列表
function closeAttable() {
	$(".insertAt").detach();
	$(".rightDiv").detach();
	$(".leftDiv").detach();
	$("#attaDiv").detach();
}

//函数 加入到我的吧友
function addTomyFriend(elk) {
	var iopo = elk.target;
	var Ta = iopo.getAttribute("value");
	var r = confirm("把 " + Ta + " 添加到我的吧友？");
	if (r == true) {
		var ujuyu = JSON.parse((localStorage["myBaFriends"]) ? localStorage["myBaFriends"] : "{}");
		if (thisBaArray("bigBaToday").indexOf(Ta) == -1 && thisBaArray("smallBaToday").indexOf(Ta) == -1 && thisBaArray("publicFriends").indexOf(Ta) == -1) {
			if (ujuyu[thisPageTitle]) {
				if (ujuyu[thisPageTitle].indexOf(Ta) == -1) {
					ioii = ujuyu[thisPageTitle].push(Ta);
				}
			} else {
				ujuyu[thisPageTitle] = Ta.split(",");
			}
			localStorage["myBaFriends"] = JSON.stringify(ujuyu);
			setTimeout(function () {
				GM_setValue("myBaFriends", JSON.stringify(ujuyu));
			}, 0);
		} else {
			window.location = window.location.href;
		}
		temppp = "." + iopo.getAttribute("class") + "[value='" + Ta + "']";
		temppq = "." + iopo.getAttribute("class") + "[value='@" + Ta + "']";
		$(temppp + "," + temppq).each(function () {
			$(this).replaceWith($("<spam>", {
					title : "从我的@吧友中删除",
					value : Ta,
					html : "㈠",
					class : iopo.getAttribute("class") + "Back",
					click : removeFriend
				}));
		});
	}
}
//函数 从我的吧友中删除
function removeFriend(bad) {
	var iopo = bad.target;
	var Ta = iopo.getAttribute("value");
	var r = confirm("把 " + Ta + " 从我的吧友中删除？");
	if (r == true) {
		var ujuyu = JSON.parse((localStorage["myBaFriends"]) ? localStorage["myBaFriends"] : "{}");
		var BaList = ujuyu[thisPageTitle] ? ujuyu[thisPageTitle].toString() : ""; //此判断仅用于A页已执行过删除，B页中尚未知觉的情况
		if (BaList != "") {
			if (BaList == Ta) {
				delete ujuyu[thisPageTitle];
			} else {
				BaList = BaList.replace(Ta + ',', '').replace(',' + Ta, '');
				ujuyu[thisPageTitle] = BaList.split(",");
			}
		}
		localStorage["myBaFriends"] = JSON.stringify(ujuyu);
		setTimeout(function () {
			GM_setValue("myBaFriends", JSON.stringify(ujuyu));
		}, 0);
		temppp = "." + iopo.getAttribute("class") + "[value='" + Ta + "']";
		temppq = "." + iopo.getAttribute("class") + "[value='@" + Ta + "']";
		$(temppp + "," + temppq).each(function () {
			$(this).replaceWith($("<spam>", {
					title : "添加到我的@吧友",
					value : Ta,
					html : "㈩",
					class : iopo.getAttribute("class").replace("Back", ""),
					click : addTomyFriend
				}));
		});
	}
}
//直接@它
function justAtta(T) {
	var iopo = T.target;
	var Ta = iopo.innerHTML.replace("@", "");
	temp = '&nbsp;<span class="at">@' + Ta + '</span>&nbsp;';
	if (document.getElementById("Mark1") || document.getElementById("cMark")) { //兼容小脸
		smallFaceEnbale();
	}
	if (document.querySelector("#OaCbutton") && document.querySelector("#OaCbutton").getAttribute("status") == "close") {
		document.querySelector("#OaCbutton").click();
	}
	unsafeWindow.test_editor.execCommand("inserthtml", temp);
}
//大吧小吧来召唤
function bbsbCall(ba) {
	var iopo = ba.target;
	var Ta = iopo.getAttribute("value");
	temp = '&nbsp;<span class="at">@' + Ta + '</span>&nbsp;';
	if (document.getElementById("Mark1") || document.getElementById("cMark")) { //兼容小脸
		smallFaceEnbale();
	}
	if (document.querySelector("#OaCbutton") && document.querySelector("#OaCbutton").getAttribute("status") == "close") {
		document.querySelector("#OaCbutton").click();
	}
	unsafeWindow.test_editor.execCommand("inserthtml", temp);
}

//兼容小脸
function smallFaceEnbale() {
	$('#cLinkContent1').css({
		"display" : 'table-cell'
	}); //兼容旧版小脸，打开编辑窗
	$('#cLinkContent').css({
		"display" : 'table-cell'
	}); //兼容新版小脸，打开编辑窗
	$('#menuSwitch').html('>>'); //兼容小脸，打开编辑窗
}




/***************************华丽的分割线，以上为函数，以下为运行程序********************************/

//帖子内启动其功能函数
if (window.location.href.indexOf("/p/") != -1 || window.location.href.indexOf("ct=") != -1 || window.location.href.indexOf("kz=") != -1) {
	//各ID加＋
	addNodeInsertedListener('.p_author_name,a.at', function () {
		var Lhtml = this.innerHTML.replace("@", "");
		if (thisBaArray("bigBaToday").indexOf(Lhtml) != -1) {
			var ttitle = "这是大吧，可围观不可酱油，轻易别@它";
			var hhtml = "⑨";
			var cclass = "bbaaTabB";
			var cclick = bbsbCall;
		} else if (thisBaArray("smallBaToday").indexOf(Lhtml) != -1) {
			var ttitle = "这是小吧，想@就@吧~~";
			var hhtml = "②";
			var cclass = "bbaaTab";
			var cclick = bbsbCall;
		} else if (thisBaArray("publicFriends").indexOf(Lhtml) != -1) {
			var ttitle = "这是通用吧友，就是用来@的~~";
			var hhtml = "＠";
			var cclass = "picFrdTab";
			var cclick = bbsbCall;
		} else if (thisBaArray("myBaFriends").indexOf(Lhtml) != -1) {
			var ttitle = "从我的@吧友中删除";
			var hhtml = "㈠";
			var cclass = "addPlusTabBack";
			var cclick = removeFriend;
		} else {
			var ttitle = "添加到我的@吧友";
			var hhtml = "㈩";
			var cclass = "addPlusTab";
			var cclick = addTomyFriend;
		}
		if ($(this).siblings("spam[value='" + Lhtml + "']").length == 0) {
			$("<spam>", {
				title : ttitle,
				html : hhtml,
				value : Lhtml,
				class : cclass,
				click : cclick
			}).insertAfter(this);
		}
		//帖子内点击直接@它 删除下面4行即可去掉这一功能，要想彻底删干净，就把函数justAtta也删掉
		this.title += " 点击直接@它";
		this.href = "javascript:void(0);";
		this.removeAttribute("target");
		this.removeAttribute("onmouseover");
		this.removeAttribute("onmouseout");
		this.addEventListener("click", justAtta, false);
	});
	//楼中楼加@@@
	addNodeInsertedListener('.lzl_panel_wrapper>tbody>tr>td:first-child', function () {
		if (!document.getElementById("atta_lzl")) {
			$("<em>", {
				id : "atta_lzl",
				html : "@@@",
				click : createAttable
			}).appendTo(this);
		}
	});
}

//主编辑器添加@@@
addNodeInsertedListener('.edui-btn-toolbar', function () {
	if (!document.getElementById("atta")) {
		$("<div>", {
			id : "atta",
			html : "@@@",
			click : createAttable
		}).appendTo(this);
	}
})


//主题列表
if (window.location.href.indexOf("kw=") != -1) {
	//最后一页
	addNodeInsertedListener('#thread_list_table tr>td:nth-child(2),.threadlist_rep_num', function () {
		if (this.nodeName == "DIV") { //新版
			var getThisUrl = $(this.parentNode.parentNode).find("a").attr("href");
		} else { //旧版
			var getThisUrl = $(this.parentNode).find("a").attr("href");
		}
		var klii = this.innerHTML;
		if (klii > 30) {
			this.innerHTML = "";
			$("<a>", {
				href : "javascript:void(0);",
				title : "直达最后一页",
				html : klii
			}).click(function () {
				var jih = getThisUrl.split("/p/")[1];
				setTimeout(function () {
					GM_xmlhttpRequest({
						method : 'GET',
						url : "http://wapp.baidu.com/mo/m?kz=" + jih,
						headers : { //添加http头信息，希望有用
							'Accept' : 'application/xhtml+xml'
						},
						onload : function (data) {
							var pn = $(data.responseText).find('[name="pnum"]').attr('value');
							if (pn == undefined) {
								var lastRes = data.responseText.match(/<a[ ]href[^>]+?pid=\d+/g);
								var lastRe = lastRes[lastRes.length - 1].replace(/<a[ ]href[^>]+?pid=/, "");
								window.location = 'http://tieba.baidu.com/f?ct=335675392&tn=baiduPostBrowser&sc=' + lastRe + "&z=" + jih + "#" + lastRe;
							} else {
								var lastUrl = data.responseText.match(/<\/a>&#160;<a[ ]href=".*last=1.*?(?=">)/)[0].replace('</a>&#160;<a href="', "").replace(/&amp;/g, "&");
								GM_xmlhttpRequest({
									method : 'GET',
									url : lastUrl,
									headers : {
										'Accept' : 'application/xhtml+xml'
									},
									onload : function (yue) {
										var lastRe = yue.responseText.match(/flr\?pid=\d+(?=&)/)[0].replace('flr?pid=', '');
										window.location = 'http://tieba.baidu.com/f?ct=335675392&tn=baiduPostBrowser&sc=' + lastRe + "&z=" + jih + "#" + lastRe;
									}
								})
							}
						}
					});
				}, 0);
			}).appendTo(this);
		}
	});

	//今天的日期和本吧名
	var yuy = new Date();
	var fulltime = yuy.toLocaleDateString();

	//收集每日各贴吧吧主信息
	var bigBaToday = JSON.parse((localStorage["bigBaToday"]) ? localStorage["bigBaToday"] : "{}");
	var getSmallbas = JSON.parse((localStorage["smallBaToday"]) ? localStorage["smallBaToday"] : "{}");
	if ($(".manager_btn").length > 0 && (bigBaToday.date != fulltime || !bigBaToday[thisPageTitle])) {
		GM_log(thisPageTitle + " " + fulltime + " " + "吧主信息收集，每天只一次。");
		var smallbaUrl = window.location.href.replace("f?", "f/bawu/admin_group?");
		GM_xmlhttpRequest({
			method : 'GET',
			synchronous : true,
			url : smallbaUrl,
			onload : function (reDetails) {
				var retxt1 = reDetails.responseText.replace(/\r/gi, "").replace(/\n/gi, "");
				//以下是大吧获取
				var bigbass = retxt1.replace(/.*本吧吧主：<\/td[ ]><td[ ]style="padding-bottom:20px;"[ ]>&nbsp;/, "").replace(/&nbsp;<\/td[ ]><\/tr[ ]><tr[ ]valign="top"[ ]><td[ ]width="70"[ ]align="right"[ ]>实习吧主：.*/, "");
				var bigtxt = bigbass.match(/" >.*?</g);
				if (bigtxt.length > 0) {
					bigbarrs = "";
					for (w = 0; w < bigtxt.length; w++) {
						bigbarrs += ((bigbarrs == "") ? "" : ",") + bigtxt[w].replace(/[" ><]/g, "");
					}
					if (bigBaToday.date != fulltime) {
						bigBaToday = {};
						bigBaToday.date = fulltime;
						bigBaToday[thisPageTitle] = bigbarrs.split(",");
					} else {
						bigBaToday[thisPageTitle] = bigbarrs.split(",");
					}
					localStorage['bigBaToday'] = JSON.stringify(bigBaToday);
				}
				//以下是小吧获取
				var retxt2 = retxt1.replace(/.*小吧主：<\/td[ ]><td[ ]style="padding-bottom:20px;"[ ]>&nbsp;/, "").replace(/&nbsp;<\/td[ ]><\/tr[ ]><tr[ ]valign="top"[ ]><td[ ]width="70"[ ]align="right"[ ]>图片小编：.*/, "");
				var retxt = retxt2.match(/" >.*?</g);
				if (retxt.length > 0) {
					smallbar = "";
					for (w = 0; w < retxt.length; w++) {
						smallbar += ((smallbar == "") ? "" : ",") + retxt[w].replace(/[" ><]/g, "");
					}
					if (getSmallbas.date != fulltime) {
						getSmallbas = {};
						getSmallbas.date = fulltime;
						getSmallbas[thisPageTitle] = smallbar.split(",");
					} else {
						getSmallbas[thisPageTitle] = smallbar.split(",");
					}
					localStorage['smallBaToday'] = JSON.stringify(getSmallbas);
				}
			}
		})
	}

	//各ID加＋
	addNodeInsertedListener('.tb_icon_author>a,.tb_icon_author_rely>a', function () {
		if (this.parentNode.title) {
			Lhtml = this.parentNode.title.match(/.*[:：]\s?(.*)/)[1];
		} else if (this.parentNode.parentNode.title) {
			Lhtml = this.parentNode.parentNode.title.match(/.*[:：]\s?(.*)/)[1];
		}
		this.innerHTML = Lhtml.reComLength();
		if (thisBaArray("bigBaToday").indexOf(Lhtml) != -1) {
			var ttitle = "这是大吧，可围观不可酱油，轻易别@它";
			var hhtml = "⑨";
			var cclass = "bbaaB";
			var cclick = bbsbCall;
		} else if (thisBaArray("smallBaToday").indexOf(Lhtml) != -1) {
			var ttitle = "这是小吧，想@就@吧~~";
			var hhtml = "②";
			var cclass = "bbaa";
			var cclick = bbsbCall;
		} else if (thisBaArray("publicFriends").indexOf(Lhtml) != -1) {
			var ttitle = "这是通用吧友，就是用来@的~~";
			var hhtml = "＠";
			var cclass = "picFrd";
			var cclick = bbsbCall;
		} else if (thisBaArray("myBaFriends").indexOf(Lhtml) != -1) {
			var ttitle = "从我的@吧友中删除";
			var hhtml = "㈠";
			var cclass = "addPlusBack";
			var cclick = removeFriend;
		} else {
			var ttitle = "添加到我的@吧友";
			var hhtml = "㈩";
			var cclass = "addPlus";
			var cclick = addTomyFriend;
		}
		if ($(this).siblings("spam").length == 0) {
			$("<spam>", {
				title : ttitle,
				html : hhtml,
				value : Lhtml,
				class : cclass,
				click : cclick
			}).insertBefore(this);
		}
	});
}

//上传图片默认不选中“加本吧水印”的复选框
addNodeInsertedListener('.i_checkbox', function () {
	this.checked = false;
});
