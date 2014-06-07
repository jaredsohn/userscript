// ==UserScript==
// @name	Imgize Douban
// @namespace	http://yourui.blogbus.com
// @description	将豆瓣图片链接显示为图片，鼠标滚轮改变图片大小，点击在新窗口打开原图，中键显示/隐藏图片，在GreaseMonkey的User Script Command菜单中选“设置豆瓣贴图宽度”可以设置贴图的统一宽度或最大宽度
// @version	1.0.6
// @date	2008-04-26
// @creator	isend
// @include	http://*.douban.com/*
// ==/UserScript==

function xpath(query)
{
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// set unified width for pics
function setWidth()
{
	var inData;
	var bRedo = true;
	var num;
	do {
		inData = prompt("请输入一个整数x来设置豆瓣贴图的宽度(单位px)\r\nx<0表示设置贴图统一宽度为-x\r\nx=0表示不设置贴图统一宽度或最大宽度\r\nx>=48表示设置贴图最大宽度为x\r\n0<x<48不被接受\r\n默认最小宽度是48，若设置了统一宽度则不受此限", theWidth);
		if (isNaN(inData)) {
			alert("您输入的不是数字，请重新输入");
		}
		else if (inData.indexOf(".") > -1) {
			alert("您输入的不是整数，请重新输入");
		}
		else {
			num = parseInt(inData);
			if (num > 0 && num < 48) {
				alert("最大宽度不能小于48，请重新输入");
			}
			else {
				bRedo = false;
				theWidth = num;
				GM_setValue("width", theWidth);
			}
		}
	} while (bRedo);
}

// if a given extension represents a pic
function isPic(ele)
{
	for (var index in Exts) {
		if (ele.toUpperCase() == Exts[index]) {
			return true;
		}
	}
	return false;
}

// zoom in and out
function resize(event)
{
	this.width = this.width * (1-event.detail/100);
	event.stopPropagation();
	event.preventDefault();
}

// switch between link and img
function midBtn(event)
{
	if (1 == event.button) {
		if ("IMG" == this.nodeName.toUpperCase()) {
			var linkEle = document.createTextNode(this.getAttribute("src"));
			this.parentNode.addEventListener("mousedown", midBtn, false);
			this.parentNode.replaceChild(linkEle, this);
			event.stopPropagation();
			event.preventDefault();
		}
		else if ("A" == this.nodeName.toUpperCase()) {
			showPic(this);
			event.stopPropagation();
			event.preventDefault();
		}
	}
}

// turn a <a> link into a img
function showPic(thisEle)
{
	var link = thisEle.getAttribute("href");
	var anEle = document.createElement("a");
	anEle.setAttribute("href", link);
	anEle.setAttribute("target", "_blank");
	anEle.setAttribute("rel", "nofollow");
	var newEle = document.createElement("img");
	newEle.setAttribute("src", link);
	newEle.setAttribute("title", "by 豆瓣贴图脚本");
	newEle.setAttribute("alt", "图片载入中...");
	if (0 == theWidth) {
		newEle.style.maxWidth = thisEle.parentNode.clientWidth + "px";
		newEle.style.minWidth = "48px";
	}
	else if (theWidth >= 48) {
		newEle.style.maxWidth = theWidth + "px";
		newEle.style.minWidth = "48px";
	}
	else if (theWidth < 0) {
		newEle.width = -theWidth;
	}
	newEle.addEventListener("DOMMouseScroll", resize, false);
	newEle.addEventListener("mousedown", midBtn, false);
	anEle.appendChild(newEle);
	thisEle.parentNode.replaceChild(anEle, thisEle);	
}

GM_registerMenuCommand("设置豆瓣贴图宽度", setWidth);
var Exts = new Array(".JPG", ".JPEG", ".JPE", ".JFIF", ".BMP", ".GIF", ".PNG", ".TIF", ".TIFF", ".ICO");
var theWidth = GM_getValue("width", 0); 
var allEles = xpath("//a[@href]");
for (var i = 0; i < allEles.snapshotLength; i++) {
	var theEle = allEles.snapshotItem(i);
	var theLink = theEle.getAttribute("href");
	var allImgs = theEle.getElementsByTagName("img");
	if (theLink.indexOf("?") < 0 && allImgs.length == 0
	&& (isPic(theLink.substr(theLink.length - 4, 4))
	|| isPic(theLink.substr(theLink.length - 5, 5)))) {
		showPic(theEle);
	}
}