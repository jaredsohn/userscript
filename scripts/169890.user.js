// ==UserScript==
// @name	SearchPreview for Baidu
// @description	SearchPreview for Baidu 伪百度搜索预览，提供一站式服务，无页面转跳，适合快速搜索资料。Re-edit by 864907600cc
// @include	http://www.baidu.com/s*
// @grant	none
// @version	1.7
// @icon	http://1.gravatar.com/avatar/147834caf9ccb0a66b2505c753747867
// @updateURL	https://userscripts.org/scripts/source/169890.meta.js
// @downloadURL	https://userscripts.org/scripts/source/169890.user.js
// ==/UserScript==

// Re-edit by 864907600cc
// 本脚本基于百度 firefox 吧吧友 网络孤独行客 的脚本修改（原贴地址 http://tieba.baidu.com/p/1687601275）
// 基于 GPL 协议 修改并发布
// 原脚本中附加的信息均未删除以便参考

// 更新历史
// 2013.6.7 (1.0)
// 	1. 修改脚本以兼容 chrome
// 	2. 自动适应浏览器宽度，解决在各浏览器下出现错位的问题
// 2013.6.7 (1.1)
// 	1. 修复 chrome 下无法滚动页面的问题。由于 chrome 的自身问题，将鼠标移至网页上时尽管已成功触发事件并为框架添加相关属性，但并不会激活，故针对 chrome 浏览器移除自动隐藏滚动栏样式
// 2013.6.7 (1.2)
//  1. 修复 firefox 在小屏幕浏览搜索结果时出现错位及无法滚动页面的问题
// 2013.6.7 (1.3)
//  1. 取消窗口固定样式以解决在上一版本更新时出现的预览页过窄的问题
// 2013.6.22 (1.4)
//  1. 添加展开按钮，点击可使预览页占满整个窗口，增大可视面积
// 2013.6.23 (1.5)
//  1. 改进原脚本中修改搜索结果宽度的样式，因为该样式会导致部分搜索结果排版错乱
// 2013.9.16 (1.6)
//  1. 修复百度更新后不可用的问题
// 2014.4.6 (1.7)
//  1. 修复百度更新后不可用的问题，暂只支持旧版百度搜索，其他功能高考后再说

/********************************** 源脚本附加信息开始 **********************************/
/*
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
*/
/********************************** 源脚本附加信息结束 **********************************/

//CSS
function addGlobalStyle(css) {
	var head, style;
	head = document.querySelectorAll('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.innerHTML = css;
	head.appendChild(style);
}
addGlobalStyle('.hide_Ifr {border-left:1px solid #e1e1e1;padding-left:3px !important;visibility:hidden}');
addGlobalStyle('.show_Ifr {border-left:1px solid #e1e1e1;padding-left:3px !important;visibility:visible;z-index:10}');
addGlobalStyle('.vspiic {background:url("http://hiphotos.baidu.com/sanguomengxiang/pic/item/2e1d1544ad34598230d750060cf431adcaef8402.jpg") no-repeat scroll -20px 0 transparent;display:block;height:15px;width:20px;top: 0;bottom: 0;margin: auto;position: absolute;}');
addGlobalStyle('.vspiic:hover {background:url("http://hiphotos.baidu.com/sanguomengxiang/pic/item/2e1d1544ad34598230d750060cf431adcaef8402.jpg") no-repeat;display:block;height:15px;width:20px;}');
addGlobalStyle('.widely {position:fixed!important;width:calc(100% - 70px);z-index:10000;right:5px;top:0px;height:100%;outline:10000px solid rgba(0,0,0,.5);background:white}');
addGlobalStyle('.widely>iframe {height:100%} .result{padding-right:20px;position:relative} #content_left {width:auto!important} .fuck{width:20px;position: absolute;height: 100%;top: 0;right: 0;} ');


document.querySelector("#container").style.width="auto";
//if(document.querySelector(".result-zxl"))leftWidth=636;
/*else*/var leftWidth=600;
document.querySelector("#content_left").style.width=leftWidth+"px";
if(document.querySelector("#content_right")){
	var cr=document.querySelector("#content_right")
	cr.parentNode.removeChild(cr);
}

//遍历td,插入链接
//var theTr=document.querySelectorAll("td.f");
var theTr=document.querySelectorAll(".result");
for(var count=0;count<theTr.length;count++){
	if(theTr[count].firstChild.className=="t"){       
		var insert=theTr[count];
		var newTd=document.createElement("td");
		newTd.className="fuck";
        newTd.style.width="20px";
        newTd.innerHTML='<a class="vspiic" onMouseOver="click()" onclick="document.getElementById(&quot;thisDiv&quot;).className=&quot;show_Ifr&quot;;document.getElementById(\'wider\').style.display=\'inline\'"></a>';
		var display=newTd.childNodes[0];
		display.target="onLoad";
		display.href=theTr[count].firstChild.firstChild.href;
		//insert.parentNode.insertBefore(newTd,null);
        insert.appendChild(newTd)
	}
}

//插入iframe.
var content_h=document.querySelector("#content_left").offsetHeight+"px";
var theContainer=document.querySelector("#container");
var showPage = document.createElement("table");
	showPage.id="preview";
	showPage.align="right";
	showPage.innerHTML='<tr><td class="preview" align="left" style="padding-right:0px">'+
    '<div id="wider" style="position: fixed;height: 18px;width: 50px;cursor: pointer;'+
    'background: url(data:image/png;base64,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)'+
    ' no-repeat rgba(255, 255, 255, 0.75) 0 0;-webkit-transition:background 1s ease-in-out;transition:background 1s ease-in-out;z-index:10001;margin-left: -50px;border-radius: 2px;display:none"></div>'+
    '<div id="thisDiv" onmouseout="" onmouseover="" class="hide_Ifr">'+
	'<iframe id="theIfr" style="overflow:visible" scrolling="yes" width="100%" height="'+content_h+
	'" frameborder="0" src="" id="onLoad" name="onLoad">Loading...</iframe>'+
	'</div></td></tr>';
theContainer.insertBefore(showPage,theContainer.firstChild);

var thisdiv=document.querySelector("#thisDiv");
if(/Chrome/.test(navigator.userAgent)){
	thisdiv.setAttribute('onmouseover','this.firstChild.style.overflow="visible"');
	thisdiv.setAttribute('onmouseout','this.firstChild.style.overflow="hidden"');
}
else{
	thisdiv.setAttribute('onmouseover','this.firstChild.style.overflow="visible";this.firstChild.scrolling="yes"');
	thisdiv.setAttribute('onmouseout','this.firstChild.style.overflow="hidden";this.firstChild.scrolling="no"');
}

showPage.style.width='calc(100% - '+leftWidth+'px)'

document.getElementById('wider').onclick=function(event){
    if(document.getElementsByClassName('widely')[0]){
        thisdiv.className='show_Ifr';
        this.style.backgroundPosition='0 0';
        this.style.right=""
    }
    else {
        thisdiv.className='show_Ifr widely';
        this.style.backgroundPosition='-50px 0'
        this.style.right="calc(100% - 60px)"
    }
}

//取消固定窗口以兼容 firefox
thisdiv.style.position="relative";

/********************************** 源脚本附加信息开始 **********************************/

//------------------------Update log-------------------------------------------
/*
2013-03.01			窗口自动固定
2012-06-27			1.增加分辨率检测，自动适应大小。
					2.识别鼠标活动，隐藏滚动条。
					3.修正页面显示bug。
2012-07-26 			1.更改图片2.鼠标滑过3.自动预览。
2013.04.22			百度更新，理论上适应所有分辨率。
*/

/********************************** 源脚本附加信息结束 **********************************/