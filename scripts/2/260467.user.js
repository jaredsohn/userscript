// ==UserScript==
// @name           Vod_Xunlei_resizeVideoWindow
// @description    迅雷云播视窗调节
// @include        http://vod.xunlei.com/nplay.html*
// @author         congxz6688
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @version        2014.1.11
// @grant          GM_addStyle
// ==/UserScript==


GM_addStyle(".yb_bf{background-color:black !important;}");

function changeTo(w) {
	var buttonn = w.target;
	var wid = buttonn.value;
	acFuncss = "";
	acFuncss += "#XL_CLOUD_VOD_PLAYER,#PlayerCtrl,.yb_bfinner{width:" + wid + "px !important;height:" + (Math.floor(Number(wid) / 16 * 9) + 52) + "px !important; position:static;}";
	acFuncss += "#mobileUsetipArea{right:240px !important;}";
	GM_addStyle(acFuncss);
}

var newSpanasa = document.getElementsByClassName("m_open")[0];

var input1 = document.createElement("input");
input1.type = "button";
input1.value = "640";
input1.addEventListener("click", changeTo, false);
newSpanasa.parentNode.insertBefore(input1, newSpanasa);

var input2 = document.createElement("input");
input2.type = "button";
input2.value = "800";
input2.addEventListener("click", changeTo, false);
newSpanasa.parentNode.insertBefore(input2, newSpanasa);

var input3 = document.createElement("input");
input3.type = "button";
input3.value = "960";
input3.addEventListener("click", changeTo, false);
newSpanasa.parentNode.insertBefore(input3, newSpanasa);

var input4 = document.createElement("input");
input4.type = "button";
input4.value = "1024";
input4.addEventListener("click", changeTo, false);
newSpanasa.parentNode.insertBefore(input4, newSpanasa);

var input5 = document.createElement("input");
input5.type = "button";
input5.value = "1280";
input5.addEventListener("click", changeTo, false);
newSpanasa.parentNode.insertBefore(input5, newSpanasa);
