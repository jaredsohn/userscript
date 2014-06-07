// version 0.04 Beta
// 2012.6.26
// Copyleft (c) 2013, 网络孤独行客
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

//--------------------------------F&Q------------------------------------------
//	1.因测试环境原因，暂时只提供宽度为1440 1366 1280 1024 1920 的分辨率
//	2.此UserScript假定用户已使用ABP等扩展对百度广告进行了屏蔽，所以不对广告进行任
//	何处理。若因百度广告导致版面错乱，请自行去除广告。
// -------------------------------/F&Q----------------------------------------

// ==UserScript==
// @name          SearchPreview for Baidu
// @namespace     http://www.winbaike.com
// @description   SearchPreview for Baidu 伪百度搜索预览，提供一站式服务，
//				  无虽页面转跳。适合快速搜索资料。
// @updateURL     https://userscripts.org/scripts/source/137023.meta.js
// @downloadURL   https://userscripts.org/scripts/source/137023.user.js
// @include       http://www.baidu.com/*
// @exclude 
// @grant 		  none
// ==/UserScript==

//CSS
function addGlobalStyle(css) {
	var head, style;
	head = document.querySelectorAll('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.innerHTML = css;
	head.appendChild(style);
}
addGlobalStyle('.hide_Ifr {border-left:1px solid #e1e1e1;padding-left:3px !important;visibility:hidden');
addGlobalStyle('.show_Ifr {border-left:1px solid #e1e1e1;padding-left:3px !important;visibility:visible');
addGlobalStyle('.vspiic {background:url("http://hiphotos.baidu.com/sanguomengxiang/pic/item/2e1d1544ad34598230d750060cf431adcaef8402.jpg") no-repeat scroll -20px 0 transparent;display:block;height:15px;width:20px;}');
addGlobalStyle('.vspiic:hover {background:url("http://hiphotos.baidu.com/sanguomengxiang/pic/item/2e1d1544ad34598230d750060cf431adcaef8402.jpg") no-repeat;display:block;height:15px;width:20px;}');

document.querySelector("#container").style.width="auto";
document.querySelector("#content_left").style.width="560px";
if(document.querySelector("#content_right")){
	var cr=document.querySelector("#content_right")
	cr.parentNode.removeChild(cr);
}

//遍历td,插入链接
var theTr=document.querySelectorAll("td.f");
for(var count=0;count<theTr.length;count++){
	if(theTr[count].firstChild.className=="t"){       
		var insert=theTr[count];
		var newTd=document.createElement("td");
		newTd.className="fuck";
		newTd.innerHTML='<a class="vspiic" onMouseOver="click()" onclick="document.getElementById(&quot;thisDiv&quot;).className=&quot;show_Ifr&quot;"></a>';
		var display=newTd.childNodes[0];
		display.target="onLoad";
		display.href=theTr[count].firstChild.firstChild.href;
		insert.parentNode.insertBefore(newTd,null);
	}
}

//插入iframe.
var content_h=document.querySelector("#content_left").offsetHeight+"px";
var theContainer=document.querySelector("#container");
var showPage = document.createElement("table");
	showPage.id="preview";
	showPage.align="right";
	showPage.innerHTML='<tr><td class="preview" align="left" style="padding-right:0px">'+
	'<div id="thisDiv" onmouseout="" onmouseover="" class="hide_Ifr">'+
	'<iframe id="theIfr" style="overflow:hidden" scrolling="no" width="100%&quot;" height="'+content_h+
	'" frameborder="0" src="" id="onLoad" name="onLoad"></iframe>'+
	'</div></td></tr>';
theContainer.insertBefore(showPage,theContainer.firstChild);

var thisdiv=document.querySelector("#thisDiv");
thisdiv.setAttribute('onmouseover','this.firstChild.style.overflow="visible";this.firstChild.scrolling="yes"');
thisdiv.setAttribute('onmouseout','this.firstChild.style.overflow="hidden";this.firstChild.scrolling="no"');

showPage.width=screen.width-50-560+'px';
var div_w=thisdiv.offsetWidth+"px";

//固定预览框
window.onscroll=function(){
	var st = document.documentElement.scrollTop;
	var ch = document.documentElement.clientHeight;
	var at = document.getElementById("page").offsetTop;
	var v = ch - (at - st);

    if(document.documentElement.scrollTop>=100){
		thisdiv.style.position="fixed";
		thisdiv.style.top=0;
		thisdiv.style.width=div_w;
	}
	else{
		thisdiv.style.position="relative";
	}
	if(v>=0){
		thisdiv.style.position="relative";
	}
}

//------------------------Update log-------------------------------------------
/*
2013-03.01			窗口自动固定
2012-06-27			1.增加分辨率检测，自动适应大小。
					2.识别鼠标活动，隐藏滚动条。
					3.修正页面显示bug。
2012-07-26 			1.更改图片2.鼠标滑过3.自动预览。
2013.04.22			百度更新，理论上适应所有分辨率。
*/