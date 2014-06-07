// ==UserScript==
// @name           tiebagogo
// @description    常逛的贴吧快速切换
// @include        http://www.baidu.com/*
// @include        http://tieba.baidu.com/*
// @updateURL      https://userscripts.org/scripts/source/161540.meta.js
// @downloadURL    https://userscripts.org/scripts/source/161540.user.js
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2013.12.27.0
// ==/UserScript==


//此处供用户添加自己常逛的吧
//贴吧名称不要带后面的“吧”字，就象下面的例子一样，用小写的双引号括起来，再用小写的逗号相互隔开
var addByUser = ["赤色黎明", "宰执天下", "伐清", "三国好孩子", "晚明", "狮子", "chrome", "firefox", "三国志9", "大航海家3", "雨滴在心头", "郭德纲", "疑犯追踪", "超感神探", "bones", "Grimm"];

/**********************以下部分不要随意修改**********************/

var signCSS = "";
signCSS += ".useColor{color:#1E6AD0;} .gogoTd{line-height:22px; padding:0px 8px;} .gogo{text-decoration:none} .gogo:hover{text-decoration:underline}";
signCSS += "#floatGogo{border:1px solid grey; z-index:999; padding:8px 6px; background-color:white;}";
GM_addStyle(signCSS);

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
var Tds1 = [];
//建表函数
function creaseTable(UrlLength) {
	Tds1 = [];
	cons = 2;
	var tablepp = document.createElement("table");
	tablepp.setAttribute("width", "100%");
	var trs = [];
	for (ly = 0; ly < Math.ceil(UrlLength / cons); ly++) {
		var tr = document.createElement("tr");
		mmd = trs.push(tr);
		tablepp.appendChild(tr);
	}
	for (ls = 0; ls < UrlLength; ls++) {
		var td = document.createElement("td")
			td.setAttribute("class", "gogoTd");
		wq = Tds1.push(td);
		trs[Math.floor(ls / cons)].appendChild(td);
	}
	return tablepp
}

//悬浮列表窗创建函数
function openGogoList(e) {
	if (!document.getElementById("floatGogo")) {
		if ((e.target.getAttribute("href") && e.target.getAttribute("href") == "http://tieba.baidu.com") || (e.target.getAttribute("wdfield") && e.target.getAttribute("wdfield") == "kw")) {
			var jjue = e.target;
			var thisTop = getElementTop(jjue) + 15;
		} else {
			var jjue = document.querySelector(".nav_item") || document.querySelector(".star_info>a") || document.getElementById("tab_home") || document.getElementsByClassName("card_title")[0] || document.getElementById("tab_forumname");
			var thisTop = getElementTop(jjue) + 30;
		}
		var thisLeft = getElementLeft(jjue);
		GM_addStyle("#floatGogo{position:absolute; left:" + thisLeft + "px; top:" + thisTop + "px}");
		var floatGogo = document.createElement("div");
		floatGogo.id = "floatGogo";
		var huuw = addByUser.deleteThe("贴吧例一").deleteThe("贴吧例二");
		var fTable = creaseTable(huuw.length);
		floatGogo.appendChild(fTable);
		if (huuw.length > 0) {
			for (vv = 0; vv < huuw.length; vv++) {
				var anch = document.createElement("a");
				anch.href = "http://tieba.baidu.com/f?kw=" + huuw[vv];
				anch.title = huuw[vv];
				anch.className = "gogo";
				anch.target = "_blank";
				anch.innerHTML = '<fon class="useColor">' + huuw[vv].reComLength() + '</fon>';
				Tds1[vv].appendChild(anch);
			}
		}
		floatGogo.addEventListener("mouseleave", closeGogoList, false)
		document.body.appendChild(floatGogo);
	}
}
function closeGogoList() {
	document.getElementById("floatGogo").parentNode.removeChild(document.getElementById("floatGogo"));
}
//吧名长度计算
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
	var uui = yn > 15 ? kuu + "..." : this;
	return uui;
}
//数组中删除特定元素
Array.prototype.deleteThe = function (v) {
	var ra = [];
	for (w = 0; w < this.length; w++) {
		if (this[w] != v) {
			foo = ra.push(this[w]);
		}
	}
	return ra;
}
//数组中删除与另一数组重复的元素
Array.prototype.deleteRepeatWith = function (v) {
	var ra = [];
	for (w = 0; w < this.length; w++) {
		if (v.indexOf(this[w]) == -1) {
			foo = ra.push(this[w]);
		}
	}
	return ra;
}

var refresh = document.querySelector(".nav_item") || document.querySelector(".star_info>a") || document.getElementsByClassName("card_title_fname")[0] || document.getElementById("tab_home") || document.getElementById("tab_forumname") || document.getElementsByClassName("signrank_crown_tab_text")[0] || document.querySelector('[wdfield="kw"]');
refresh.addEventListener("mouseover", openGogoList, false);
