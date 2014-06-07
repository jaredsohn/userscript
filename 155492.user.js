// ==UserScript==
// @name           Tieba At EX
// @description    Convenient use @ function, additional issist input
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/i/*
// @exclude        http://tieba.baidu.com/f/like*
// @exclude        http://tieba.baidu.com/club/*
// @exclude        http://tieba.baidu.com/shipin/*
// @exclude        http://tieba.baidu.com/bakan*
// @exclude        http://tieba.baidu.com/daquan*
// @exclude        http://tieba.baidu.com/f/tupian*
// @exclude        http://tieba.baidu.com/tb/editor/*
// @exclude        http://tieba.baidu.com/*postBrowserBakan*
// @updateURL      https://userscripts.org/scripts/source/142292.meta.js
// @downloadURL    https://userscripts.org/scripts/source/142292.user.js
// @author         congxz6688 alytic
// @version        0.2.1
// ==/UserScript==

var replyCss = "";
replyCss += ".tb_icon_author, .tb_icon_author_rely{background:none !important;background-position:none !important;}";
replyCss += ".insertAt{padding:0px 0px 0px 0px; margin:1px 1px; cursor:pointer; background-color:lightGrey; display:inline-block;}";
replyCss += "#attaDiv{background-color:lightGrey; width:450px; border:4px double gray;}";
replyCss += ".leftDiv{display:inline-block; background-color:lightGrey;padding:5px 6px; width:48px;}";
replyCss += ".rightDiv{display:inline-block; background-color:lightGrey; padding:4px 6px; width:375px;}";
replyCss += ".addPlus{cursor:pointer; margin:0px 2px 0px 0px; width:20px; color:#aaa;}";
replyCss += ".addPlusBack{cursor:pointer; margin:0px 2px 0px 0px; width:20px; color:red;}";
replyCss += ".bbaa{cursor:pointer; margin:0px 2px 0px 0px; width:20px; color:green;} .bbaaB{cursor:pointer; margin:0px 2px 0px 0px; width:20px; color:#42B4FF;}";
replyCss += ".bbaaTab{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:green;} .bbaaTabB{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:#00C0F0;}";
replyCss += ".addPlusTab{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:blue;}";
replyCss += ".addPlusTabBack{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:red;}";
replyCss += ".closeDivbt{cursor:pointer; float:right; margin:0px -2px; width:16px; height:16px;}";
replyCss += "#atta{cursor:pointer; padding:10px 10px 0px 10px; display:inline-block; color:#3163B6;}";
replyCss += "#atta_lzl{margin:0 -20px 3px 0; float:right;cursor:pointer; font-size:1.2em; display:inline-block; color:#3163B6;}";
GM_addStyle(replyCss);

function unireconvert(str){
    str = str.replace(/(\\u)(\w{4}|\w{2})/gi, function($0,$1,$2){
        return String.fromCharCode(parseInt($2,16));
    });
    return str;
}

var hotUser = [];
var curr_user = unireconvert(document.head.outerHTML.split('"name":"')[1].split('"')[0]);
//console.log(curr_user);
//alert(curr_user);

var $ = unsafeWindow.$;
if (document.getElementsByClassName("nav_forum_name").length > 0) {
	var thisPageTitle = document.getElementsByClassName("nav_forum_name")[0].title;
} else {
	GM_addStyle(".thread_alt>td:nth-child(4){width:110px} .thread_alt>td:nth-child(5){width:160px}");
	var thisPageTitle = document.querySelectorAll(".nav_left>li:first-child>a,.nav_left>li:first-child>p>a")[0].title;
}

if (GM_getValue('myBaFriends', '') != '') {
	localStorage['myBaFriends'] = GM_getValue('myBaFriends');
	GM_deleteValue("myBaFriends");
}
if (GM_getValue("TodayTieba")) {
	GM_deleteValue("TodayTieba");
}
if (GM_getValue("smallBaToday")) {
	GM_deleteValue("smallBaToday");
}
if (GM_getValue("bigBaToday")) {
	GM_deleteValue("bigBaToday");
}

//函数 数组字符串重排序
String.prototype.reIndexStr = function () {
	var lastSt = this.split(",");
	var lastStr = lastSt.sort(function (a, b) {
			return a.localeCompare(b)
		});
	return lastStr;
}
//函数 判断数组字符串是否包含某元素
String.prototype.included = function (Someone) {
	var yn = false;
	thh = this.split(",");
	for (w in thh) {
		if (thh[w] == Someone) {
			yn = true;
			break;
		}
	}
	return yn;
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
	var getBazhu = JSON.parse((localStorage[ww]) ? localStorage[ww] : "{}");
	var bbarray = getBazhu[thisPageTitle] ? getBazhu[thisPageTitle] : [];
	return bbarray
}
//函数 载入各名单
function loadThe(ww) {
	switch (ww) {
	case "myBaFriends":
		$("#td22div").empty();
		var parentDiv = $("#td22div");
		var kindDiv = "#td21div{float:left}";
		break;
	case "bigBaToday":
		var parentDiv = $("#td12div");
		var kindDiv = "#td11div{float:left}";
		break;
	case "smallBaToday":
		var parentDiv = $("#td42div");
		var kindDiv = "#td41div{float:left}";
		break;
	}
	if (thisBaArray(ww).length != 0) {
		GM_addStyle(kindDiv);
		myFri = thisBaArray(ww).toString().reIndexStr();
		for (l = 0; l < myFri.length; l++) {
			$("<span>", {
				html : "&nbsp;@" + myFri[l] + "&nbsp;",
				class : "insertAt",
				click : insertEdiror
			}).appendTo(parentDiv);
		}
	}
}
//函数 插入到编辑器
function insertEdiror(e) {
	var InsertText = e.target.innerHTML;
	var editor = (sessionStorage['which_editor']) ? sessionStorage['which_editor'] : 'atta';
	(editor == "atta") ? unsafeWindow.rich_postor._editor.execCommand("inserthtml", InsertText) : unsafeWindow.LzlEditor._s_p._se.execCommand("inserthtml", InsertText);
	closeAttable();
}

function insertEdirorByString(InsertText) {
	var editor = (sessionStorage['which_editor']) ? sessionStorage['which_editor'] : 'atta';
	(editor == "atta") ? unsafeWindow.rich_postor._editor.execCommand("inserthtml", InsertText) : unsafeWindow.LzlEditor._s_p._se.execCommand("inserthtml", InsertText);
}

//函数 这是隐藏的福利，我会说吗？
function insertAll(e) {
	var idd = e.target.id;
	which_ed = (sessionStorage['which_editor']) ? sessionStorage['which_editor'] : 'atta';
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
	}
	if (lmo.length != 0) {
		for (p = 0; p < lmo.length; p++) {
			bazhuST += "@" + lmo[p] + "&nbsp;";
		}
	}
	(which_ed == "atta") ? unsafeWindow.rich_postor._editor.execCommand("inserthtml", bazhuST) : unsafeWindow.LzlEditor._s_p._se.execCommand("inserthtml", bazhuST);
	closeAttable();
}
//函数 编辑我的吧友名单
function promptMyfriend() {
	var ujuy = JSON.parse((localStorage["myBaFriends"]) ? localStorage["myBaFriends"] : "{}");
	var myfris = ujuy[thisPageTitle] ? ujuy[thisPageTitle].toString() : "";
	var namme = prompt("编辑你在" + thisPageTitle + "的吧友名单，用小写的逗号隔开\r\n", myfris);
	var namme = namme.replace(/,[ ,]*/g, ',').replace(/[ ,]*,/g, ',').replace(/[, ]*$/, '').replace(/^[ ,]*/, '');
	if (namme == "") {
		delete ujuy[thisPageTitle];
	} else {
		ujuy[thisPageTitle] = namme.split(",");
	}
	localStorage["myBaFriends"] = JSON.stringify(ujuy);
	loadThe("myBaFriends");
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
	if ($("#attaDiv").length == 0) {
		var ortt = ete.target;
		sessionStorage.which_editor = (ortt.id == "atta") ? 'atta' : 'atta_lzl';
		var getTop = (ortt.id == "atta") ? getElementTop(ortt) + 32 : getElementTop(ortt) + 20;
		//定位主列表位置
		if ((document.getElementById("Mark1") || document.getElementById("cMark")) && ortt.id == "atta") { //小脸
			var attaDiv = $("<div>", {
					id : "attaDiv"
				}).css({
					"position" : "fixed",
					"z-index" : "1000",
					"right" : "0",
					"bottom" : "0",
				}).appendTo(document.body);
		} else if (document.getElementsByClassName("floatEditor").length > 0 && ortt.id == "atta") { //悬浮主窗
			var attaDiv = $("<div>", {
					id : "attaDiv"
				}).css({
					"position" : "fixed",
					"z-index" : "1000",
					"left" : getElementLeft(ortt) - 250,
					"bottom" : 24,
				}).appendTo(document.body);
		} else if (ortt.id == "atta_lzl") { //楼中楼回复
			var attaDiv = $("<div>", {
					id : "attaDiv"
				}).css({
					"position" : "absolute",
					"z-index" : "1000",
					"left" : getElementLeft(ortt) - 200,
					"top" : getTop - 120,
				}).appendTo(document.body);
		} else { //主窗
			var attaDiv = $("<div>", {
					id : "attaDiv"
				}).css({
					"position" : "absolute",
					"z-index" : "1000",
					"left" : getElementLeft(ortt) - 200,
					"top" : getTop,
				}).appendTo(document.body);
		}
		//建表
		var atTable = $("<table>", {
				"border" : "1",
				"bordercolor" : "#FFF",
				"cellpadding" : "6"
			}).appendTo(attaDiv);
		//TR
		var attr1 = $("<tr>").appendTo(atTable);
		var attr4 = $("<tr>").appendTo(atTable);
		var attr2 = $("<tr>").appendTo(atTable);

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
				click : promptMyfriend
			}).appendTo(attr2);
		$("<div>", {
			html : "我的吧友",
			class : "leftDiv",
			title : "点击这里，可编辑吧友名单"
		}).appendTo(td21);

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
	}
}
//关闭@..列表
function closeAttable() {
	$(".insertAt").detach();
	$(".rightDiv").detach();
	$(".leftDiv").detach();
	$("#attaDiv").detach();
}

function issistInput(ete){
	if ($("#attaDiv_ii").length == 0) {
		var ortt = ete.target;
		sessionStorage.which_editor = (ortt.id == "atta") ? 'atta' : 'atta_lzl';
		var getTop = (ortt.id == "atta") ? getElementTop(ortt) + 32 : getElementTop(ortt) + 20;
		var IIdiv = $("<div>", {
				id : "attaDiv_ii"
			}).css({
				"position" : "absolute",
				"z-index" : "1000",
				"left" : getElementLeft(ortt) - 200,
				"top" : getTop,
				"html" : '123'
			}).appendTo(document.body);
			
		var MainDiv = $("<div>", {
				"style" : "width:400px;height:200px;border: 1px solid #AAAAAA;background:#FFF;",
			}).appendTo(IIdiv);

		$("<textarea>", {
				"style" : "width:380px;height:200px;font-size:13px;border: 0px;background:#FFF;",
				"title" : 'Double Click is Input',
				dblclick : function(){
					insertEdirorByString($(this).val());
					$(this).val('');
				}
		}).appendTo(MainDiv);
		
		var closeDivbt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA8UlEQVR42pWSMQrCQBBFcwPvI3gNKwtvYGVhaStqJYiFjY0IFmIrWEXRFIISiIqohYUYFcTC1gc/BFkSEmGyzMz/f3ZmNlaxMSvU7JQG2eJzdvdEW3j++vgstZ1AsNz6OgHkG6EpCFPe5S2qjHBzfgGZAuLV4TGw952Rg6MMVEKSZEyB7V6BW8NlJlcu1ccUPt0+1e6UkBMIgtkSKUi9iStSsz/H4SQJFD00ALXRZPMV2FxISDJ2S2qMpiVggFhB2BJsjaEB0ES3FO4k7dAqQHmm/F0rISMBRWxJjFQPF8IC9DsYoV42EOAlGtdyWyD4y76WWDtXsJol3gAAAABJRU5ErkJggg==";
		$("<span>", {
			class : "closeDivbt",
			style : 'padding-top:3px;padding-right:5px;',
			click : function(){
				$(IIdiv).detach();
			},
			html : "<img src='" + closeDivbt + "' alt='cancel' />"
		}).appendTo(MainDiv);
			
	}
}


var superAt_end = false;
function superAt(ete){
	setTimeout(function(){
		var count = 1;
		var list = '&nbsp;';
		if(superAt_end) {alert('Done!'); GM_setValue('curr_superAt_pos',0); superAt_end=false; return;}
		for(var i=parseInt(GM_getValue('curr_superAt_pos',0));i<hotUser.length;i++)
		{
			if(i == hotUser.length-1) superAt_end = true;
			list += '@' + hotUser[i] + '&nbsp;'
			if(count == 10)
			{
				GM_setValue('curr_superAt_pos',i+1);
				break;
			}
			count++;
		}
		insertEdirorByString(list);
	},0);
}

//函数 加入到我的吧友
function addTomyFriend(elk) {
	var iopo = elk.target;
	var Ta = iopo.getAttribute("value");
	var r = confirm("把 " + Ta + " 添加到我的吧友？");
	if (r == true) {
		var ujuyu = JSON.parse((localStorage["myBaFriends"]) ? localStorage["myBaFriends"] : "{}");
		if (!thisBaArray("bigBaToday").toString().included(Ta) && !thisBaArray("smallBaToday").toString().included(Ta)) {
			if (ujuyu[thisPageTitle]) {
				var temps = ujuyu[thisPageTitle].toString();
				if (!temps.included(Ta)) {
					temps += "," + Ta
					ujuyu[thisPageTitle] = temps.split(",");
				}
			} else {
				ujuyu[thisPageTitle] = Ta.split(",");
			}
			localStorage["myBaFriends"] = JSON.stringify(ujuyu);
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
//大吧小吧来召唤
function bbsbCall(ba) {
	var iopo = ba.target;
	var Ta = iopo.getAttribute("value");
	temp = '&nbsp;@' + Ta + '&nbsp;:';
	if (document.getElementById("Mark1") || document.getElementById("cMark")) { //兼容小脸
		smallFaceEnbale();
	}
	if (document.querySelector("#OaCbutton") && document.querySelector("#OaCbutton").getAttribute("status") == "close") {
		document.querySelector("#OaCbutton").click();
	}
	unsafeWindow.rich_postor._editor.execCommand("inserthtml", temp);
	if (!document.getElementById("OaCbutton")) {
		content.scrollTo(0, 10000000);
	}
}

//主编辑器添加@@@
function addAtInEditor() {
	if (!document.getElementById("atta")) {
		//$("<label>").appendTo($(".tb-editor-toolbar"));
		//$(".tb-editor-wrapper").css({'float': 'left'});
		$("<div>", {
			id : "newattr",
			style : 'float:right;',
		}).appendTo($(".new_tiezi_tip"));
		
		$("<em>", {
			id : "atta",
			html : "@..",
			title : 'Choose @',
			click : createAttable
		}).appendTo($("#newattr"));
		$("<em>", {
			id : "atta",
			html : "@@@",
			title : 'Auto @',
			click : superAt
		}).appendTo($("#newattr"));
		$("<em>", {
			id : "atta",
			html : "II",
			title : 'Issist Input',
			click : issistInput
		}).appendTo($("#newattr"));
		
	}
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

function get_hotUserList(arg) {
	GM_xmlhttpRequest({
		method : 'GET',
		synchronous : true,
		headers : {
			'Accept' : 'application/xhtml+xml'
		},
		url : "http://tieba.baidu.com/f?kw="+thisPageTitle.substr(0,thisPageTitle.length-1)+"&ie=utf-8",
		onload : function (reDetails) {
			var lastrep = reDetails.responseText.split('tb_icon_author_rely');
			var lruse_map = {};
			for(key in lastrep)
			{
				if(key == 0) continue;
				var username = lastrep[key].split('target="_blank">')[1].split('</a>')[0];
				if(username == curr_user || '[管理]' == username) continue;
				if(username in lruse_map) continue;
				lruse_map[username] = true;
				hotUser.push(username);
			}
		}
	});
};

/***************************华丽的分割线，以上为函数，以下为运行程序********************************/

//帖子内启动其功能函数
if (window.location.href.indexOf("/p/") != -1 || window.location.href.indexOf("ct=") != -1 || window.location.href.indexOf("kz=") != -1) {
	//不可点击的链接恢复可点击状态
	$("a").attr("href", function () {
		return this.href.replace(/http:\/\/[ ].*?(?=https?:\/\/)/, "")
	});
	//各ID加＋
	var Bigbaa = thisBaArray("bigBaToday").toString();
	var smallBaa = thisBaArray("smallBaToday").toString();
	var getFrd = thisBaArray("myBaFriends").toString();
	addNodeInsertedListener('.p_author_name,a.at', function () {
		var Lhtml = this.innerHTML.replace("@", "");
		if (Bigbaa.included(Lhtml)) {
			var ttitle = "这是大吧，可围观不可酱油，轻易别@它";
			var hhtml = "⑨";
			var cclass = "bbaaTabB";
			var cclick = bbsbCall;
		} else if (smallBaa.included(Lhtml)) {
			var ttitle = "这是小吧，想@就@吧~~";
			var hhtml = "②";
			var cclass = "bbaaTab";
			var cclick = bbsbCall;
		} else if (getFrd.included(Lhtml)) {
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
	});
	//楼中楼加@@@
	addNodeInsertedListener('.lzl_panel_captcha', function () {
		if (!document.getElementById("atta_lzl")) {
			$("<em>", {
				id : "atta_lzl",
				html : "@@@",
				click : createAttable
			}).appendTo(this);
		}
	});
	//鼠标悬浮于@上时不弹出
	addNodeInsertedListener('.lzl_p_p,.at', function () {
		this.removeAttribute("onmouseover");
		this.removeAttribute("onmouseout");
	});
	get_hotUserList();
}

//编辑器添加@@@
addAtInEditor();

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
						url : "http://wapp.baidu.com/f/m?kz=" + jih,
						headers : { //添加http头信息，希望有用
							'Accept' : 'application/xhtml+xml'
						},
						onload : function (data) {
							var pn = $(data.responseText).find('[name=pnum]').attr('value');
							if (pn == undefined) {
								var lastRes = data.responseText.match(/<a[ ]href[^>]+?pid=\d+/g);
								var lastRe = lastRes[lastRes.length - 1].replace(/<a[ ]href[^>]+?pid=/, "");
								window.location = 'http://tieba.baidu.com/p/' + jih + "?pid=" + lastRe + "#" + lastRe;
							} else {
								pn = Math.ceil(pn / 3);
								var lastUrl = "http://wapp.baidu.com" + data.responseText.match(/href="\/f\/q.*?last=1.*?(?=">)/)[0].replace('href="', "").replace(/&amp;/g, "&");
								GM_xmlhttpRequest({
									method : 'GET',
									url : lastUrl,
									headers : {
										'Accept' : 'application/xhtml+xml'
									},
									onload : function (yue) {
										var lastRe = yue.responseText.match(/<a[ ]href="flr\?pid=\d+(?=&)/)[0].replace('<a href="flr?pid=', '');
										window.location = 'http://tieba.baidu.com/p/' + jih + "?pid=" + lastRe + "#" + lastRe;
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
	var fulltime = yuy.getFullYear() + "/" + (yuy.getMonth() + 1) + "/" + yuy.getDate();

	//收集每日各贴吧版主信息
	var bigBaToday = JSON.parse((localStorage["bigBaToday"]) ? localStorage["bigBaToday"] : "{}");
	if ($(".manager_btn").length > 0 && (bigBaToday.date != fulltime || !bigBaToday[thisPageTitle])) {
		GM_log(thisPageTitle + " " + fulltime + " " + "大吧主信息收集，每天只一次。");
		var Bazhus = [];
		var thisBaBazhu = $(".region_cnt>ul:first>li>a");
		for (t = 0; t < thisBaBazhu.length; t++) {
			qwqq = Bazhus.push(thisBaBazhu[t].innerHTML);
		}
		if (bigBaToday.date != fulltime) {
			bigBaToday = {};
			bigBaToday.date = fulltime;
			bigBaToday[thisPageTitle] = Bazhus;
		} else {
			bigBaToday[thisPageTitle] = Bazhus;
		}
		localStorage["bigBaToday"] = JSON.stringify(bigBaToday);
	}
	//收集各小吧信息
	var getSmallbas = JSON.parse((localStorage["smallBaToday"]) ? localStorage["smallBaToday"] : "{}");
	if ($(".manager_btn").length > 0 && (getSmallbas.date != fulltime || !getSmallbas[thisPageTitle])) {
		GM_log(thisPageTitle + " " + fulltime + " " + "小吧主信息收集，每天只一次。");
		var smallbaUrl = window.location.href.replace("f?", "sign/member?") + "&ie=utf-8";
		GM_xmlhttpRequest({
			method : 'GET',
			synchronous : true,
			url : smallbaUrl,
			onload : function (reDetails) {
				var retxt = JSON.parse(reDetails.responseText).data.managers;
				if (retxt.length > 0) {
					smallbar = "";
					for (w in retxt) {
						smallbar += ((smallbar == "") ? "" : ",") + retxt[w].user.user_name;
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
	var Bigbaa = thisBaArray("bigBaToday").toString();
	var smallBaa = thisBaArray("smallBaToday").toString();
	var getFrd = thisBaArray("myBaFriends").toString();
	addNodeInsertedListener('tr>td:nth-child(4)>a,tr>td:nth-child(5)>a,.tb_icon_author>a,.tb_icon_author_rely>a', function () {
		var Lhtml = this.innerHTML;
		if (Bigbaa.included(Lhtml)) {
			var ttitle = "这是大吧，可围观不可酱油，轻易别@它";
			var hhtml = "⑨";
			var cclass = "bbaaB";
			var cclick = bbsbCall;
		} else if (smallBaa.included(Lhtml)) {
			var ttitle = "这是小吧，想@就@吧~~";
			var hhtml = "②";
			var cclass = "bbaa";
			var cclick = bbsbCall;
		} else if (getFrd.included(Lhtml)) {
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
	
	get_hotUserList();
}