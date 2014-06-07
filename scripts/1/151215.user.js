// ==UserScript==
// @name           tiebaMyLike
// @description    我喜欢的贴吧一览
// @include        http://tieba.baidu.com/f?kw=*
// @include        http://tieba.baidu.com/f?ie=gbk&kw=*
// @include        http://tieba.baidu.com/f?ie=utf-8&kw=*
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct=*
// @include        http://tieba.baidu.com/f?kz=*
// @include        http://tieba.baidu.com/f?tp=0&kw=*
// @include        http://tieba.baidu.com/f/good?kw=*
// @updateURL      https://userscripts.org/scripts/source/151215.meta.js
// @downloadURL    https://userscripts.org/scripts/source/151215.user.js
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2013.4.3.0
// ==/UserScript==


//此处供用户额外添加自己喜欢的吧，前10个有效
//一般说来，此处添加的吧应该是那种经验排名在20以后，无法出现在正常列表中的吧
//贴吧名称不要带后面的“吧”字，就象下面的例子一样，用小写的双引号括起来，再用小写的逗号相互隔开
var addByUser = ["贴吧例一", "贴吧例二"];

/**********************以下部分不要随意修改**********************/

var userSetNum = 20;
var signCSS = "";
signCSS += "#mylikeDiv{margin:-10px 0px -16px 0px!important;} .fonColor{color:#1D53BF} .useColor{color:#8B0000;}";
signCSS += "#mylikeDiv td{padding: 3px !important;} #likeTitle,#resetMylike{display:inline-block; cursor:pointer; width:50%; padding:9px 0px; border-bottom:2px solid #246DDA;}";
signCSS += ".likeTd{padding:0px 8px;} .userAdd{height:24px; padding:0px 12px 0px 8px;}#replaceUl{font-size:12px; margin:10px}";
signCSS += "#floatLikeDiv{border:1px solid grey; z-index:999; padding:8px 10px 10px 10px;background-color:white;}";
GM_addStyle(signCSS);
if (document.getElementById("frs_old_version")) {
	GM_addStyle("#mylikeDiv{display:none;}")
}
var yuy = new Date();
re = yuy.getTime() + 28800000;
yuy.setTime(re);
var fulltime = yuy.getUTCFullYear() + "/" + (yuy.getUTCMonth() + 1) + "/" + yuy.getUTCDate();
var userSignName = unsafeWindow.PageData.user.name;
var itieba_id = unsafeWindow.PageData.user.itieba_id;
if (userSignName != GM_getValue('currentUser', '')) {
	GM_setValue('currentUser', userSignName);
	getMylikeTiebas;
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
function getElementRight(element) {
	var actualRight =document.body.offsetWidth - element.offsetLeft - 180; //此处可微调悬浮列表框的左右位置
	return actualRight;
}
//创建列表显示区
var mylikeDiv = document.createElement("div");
mylikeDiv.setAttribute("class", "region_3");
mylikeDiv.id = "mylikeDiv";

var likeTitle = document.createElement("div");
likeTitle.setAttribute("class", "region_title");
likeTitle.id = "likeTitle";
likeTitle.innerHTML = "我喜欢的贴吧";
likeTitle.addEventListener("click", function () {
	window.open("http://tieba.baidu.com/i/" + itieba_id + "/forum");
}, false);
mylikeDiv.appendChild(likeTitle);

var resetMylike = document.createElement("div");
resetMylike.setAttribute("class", "region_title");
resetMylike.id = "resetMylike";
resetMylike.innerHTML = "重置";
resetMylike.addEventListener("click", getMylikeTiebas, false)
mylikeDiv.appendChild(resetMylike);

var likeListDiv = document.createElement("div");
likeListDiv.setAttribute("class", "region_cnt");
mylikeDiv.appendChild(likeListDiv);

var Tds1 = [];
var Tds2 = [];
//建表函数
function creaseTable(UrlLength, cons) {
	Tds1 = [];
	Tds2 = [];
	var tablepp = document.createElement("table");
	tablepp.setAttribute("class", "likeTable");
	tablepp.setAttribute("width", "100%");
	var trs = [];
	for (ly = 0; ly < Math.ceil(UrlLength / cons); ly++) {
		var tr = document.createElement("tr");
		mmd = trs.push(tr);
		tablepp.appendChild(tr);
	}
	for (ls = 0; ls < UrlLength; ls++) {
		var td = document.createElement("td")
			if (cons == 1) {
				td.setAttribute("class", "userAdd");
				wq = Tds2.push(td);
			} else {
				td.setAttribute("class", "likeTd");
				wq = Tds1.push(td);
			}
			trs[Math.floor(ls / cons)].appendChild(td);
	}
	return tablepp
}

//右上角“我爱逛的贴吧”相关替换函数
function openMylikeList(e) {
	if (!document.getElementById("floatLikeDiv")) {
		de = e.target;
		var thisTop = getElementTop(document.getElementsByClassName("nav_right")[0]) + 28;
		var thisRight = getElementRight(de);
		GM_addStyle("#floatLikeDiv{position:absolute; right:" + thisRight + "px; top:" + thisTop + "px}");
		var floatLikeDiv = document.createElement("div");
		floatLikeDiv.id = "floatLikeDiv";
		var fTable = document.createElement("table");
		floatLikeDiv.appendChild(fTable);
		var fTr = document.createElement("tr");
		fTable.appendChild(fTr);
		var fTd1 = document.createElement("td");
		var fTd2 = document.createElement("td");
		fTr.appendChild(fTd1);
		fTr.appendChild(fTd2);
		var likeTableFloat = document.getElementsByClassName("likeTable")[0].cloneNode(true);
		fTd2.appendChild(likeTableFloat);
		var allb = JSON.parse(GM_getValue('todayMylike', "{}"));
		var allbas = allb[userSignName] ? allb[userSignName] : [];
		var huuw = addByUser.deleteThe("贴吧例一").deleteThe("贴吧例二").deleteRepeatWith(allbas);
		if (huuw.length > 0) {
			var duur = huuw.length <= 10 ? huuw.length : 10;
			var floatLg = Math.max(duur, Math.ceil(allbas.length / 2));
			var userAddFt = creaseTable(floatLg, 1);
			for (vv = 0; vv < duur; vv++) {
				var anch = document.createElement("a");
				anch.href = "http://tieba.baidu.com/f?kw=" + huuw[vv];
				anch.title = huuw[vv];
				anch.target = "_blank";
				anch.innerHTML = '<fon class="useColor">' + huuw[vv].reComLength() + '</fon>';
				Tds2[vv].appendChild(anch);
			}
			fTd1.appendChild(userAddFt);
		}
		floatLikeDiv.addEventListener("mouseleave", closeMylikeList, false)
		document.querySelector(".nav_right").appendChild(floatLikeDiv);
	}
}
function closeMylikeList() {
	document.getElementById("floatLikeDiv").parentNode.removeChild(document.getElementById("floatLikeDiv"));
}
function addFloatMylike() {
	var replaceUl = document.createElement("li");
	replaceUl.id = "replaceUl";
	replaceUl.innerHTML = "<font color='white'>我爱逛的贴吧</font>";
	replaceUl.addEventListener("click", function () {
		window.open("http://tieba.baidu.com/i/" + itieba_id + "/forum");
	}, false);
	replaceUl.addEventListener("mouseover", openMylikeList, true);
	var tempNode = document.querySelector(".li_often_forum");
	document.querySelector(".nav_right").insertBefore(replaceUl, tempNode);
	tempNode.parentNode.removeChild(tempNode);
}
//右侧栏相关添加部分
function addAsideDiv() {
	if (document.getElementById("aside")) {
		var parentDiv = document.getElementById("aside");
	} else if (document.getElementById("j_aside")) {
		var parentDiv = document.getElementById("j_aside");
	} else if (document.querySelector(".right_section")) {
		var parentDiv = document.querySelector(".right_section");
	}
	parentDiv.insertBefore(mylikeDiv, document.getElementById("balv_mod").nextSibling);
	loadLiketieba();
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
		if (v.indexOf(this[w]) == -1){
			foo = ra.push(this[w]);
		}
	}
	return ra;
}
//载入贴吧列表进表格
function loadLiketieba() {
	var allb = JSON.parse(GM_getValue('todayMylike', "{}"));
	if (allb[userSignName]) {
		allbaa = allb[userSignName];
		newTable = creaseTable(allbaa.length, 2);
		likeListDiv.appendChild(newTable);
		for (s = 0; s < allbaa.length; s++) {
			var anch = document.createElement("a");
			anch.href = "http://tieba.baidu.com/f?kw=" + allbaa[s];
			anch.title = allbaa[s];
			anch.target = "_blank";
			anch.innerHTML = '<fon class="fonColor">' + allbaa[s].reComLength() + '</fon>';
			Tds1[s].appendChild(anch);
		}
	}
}
//获取顺序列表
function getMylikeTiebas() {
	GM_setValue('todayMylike', '{}');
	likeListDiv.innerHTML = "";
	GM_xmlhttpRequest({
		method : 'GET',
		synchronous : true,
		url : "http://tieba.baidu.com/f/like/mylike",
		onload : function (reDetails) {
			var wholeObject = {};
			var tempArrey = [];
			var simTxt = reDetails.responseText;
			var auDoc = document.implementation.createDocument("", "", null);
			var auElem = document.createElement('div');
			auElem.innerHTML = simTxt;
			auDoc.appendChild(auElem);
			var bass = auDoc.querySelectorAll("tr>td:first-child>a");
			if (userSetNum > 20 || userSetNum < 10) {
				userSetNum = 10;
			}
			ListLength = (bass.length >= userSetNum) ? userSetNum : bass.length;
			for (x = 0; x < ListLength; x++) {
				var tempA = tempArrey.push(bass[x].innerHTML);
			}
			wholeObject.date = fulltime;
			wholeObject[userSignName] = tempArrey;
			GM_setValue('todayMylike', JSON.stringify(wholeObject));
			loadLiketieba();
		}
	})
}

var allba = JSON.parse(GM_getValue('todayMylike', "{}"));
if (!allba[userSignName] || allba.date != fulltime || allba[userSignName].length != userSetNum) {
	getMylikeTiebas();
}
addAsideDiv();
if (document.querySelector(".li_often_forum")) {
	addFloatMylike();
}
