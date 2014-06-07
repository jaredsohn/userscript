// SearchPreview for Baidu example user script
// version 0.03 Beta
// 2012.6.26
// Copyright (c) 2012, 网络孤独行客
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------Read me----------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "SearchPreview for Baidu", and click Uninstall.
//
//--------------------------------F&Q------------------------------------------
//	1.因测试环境原因，暂时只提供宽度为1440 1366 1280 1024 的分辨率
//	2.此UserScript假定用户已使用ABP等扩展对百度广告进行了屏蔽，所以不对广告进行任
//	何处理。若因百度广告导致版面错乱，请自行去除广告。
//
// -----------------------------Information------------------------------------
//
// ==UserScript==
// @name          test
// @namespace    http://www.winbaike.com
// @description   test
// @include       http://www.baidu.com/*
// @exclude 
// ==/UserScript==


//-----------------------------插入CSS-----------------------------------------

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.diaobao {border-left:1px solid #e1e1e1 !important;padding-left:3px ! important;visibility:hidden !important;');
addGlobalStyle('.baodiao {border-left:1px solid #e1e1e1 !important;padding-left:3px ! important;visibility:visible !important;');

//-------------------------遍历td,插入链接-------------------------------------

var theTr=document.getElementsByTagName("td");
for(var count=0;count<theTr.length;count++)
{
    if(theTr[count].className=="f")
      {
       if(theTr[count].firstChild.className=="t")
        {
        
            var insert=theTr[count];
            var newTd=document.createElement("td");
			newTd.innerHTML='<a onMouseOver="click()" onclick="document.getElementById(&quot;thisDiv&quot;).className=&quot;baodiao&quot;"><img src="http://hiphotos.baidu.com/sanguomengxiang/pic/item/cf0613efce1b9d1613cd9bf5f3deb48f8d546459.jpg"></img></a>';
            var display=newTd.childNodes[0];
            display.target="onLoad";
			display.href=theTr[count].firstChild.firstChild.href;
            insert.parentNode.insertBefore(newTd,null);
      }
      
    }
}
//--------------访问container节点，插入iframe.--------------------------------

var theContainer=document.getElementById("container");
var showPage = document.createElement("table");
	showPage.id="preview"
	showPage.width="";
	showPage.align="right";
	showPage.innerHTML='<tr>'+
					'<td align="left" style="padding-right:0px">'+
					'<div id="thisDiv" onmouseout="" onmouseover="" class="diaobao">'+
					'<iframe id="theIfr" scrolling="no" width="100%&quot;" height="1100px"'+ 
					'frameborder="0" src="" id="onLoad" name="onLoad"></iframe>'+
					'</div></td></tr>';
theContainer.insertBefore(showPage,theContainer.firstChild);

//-----------------------插入属性---------------------------------------------
var fuckyou=document.getElementById("thisDiv");
fuckyou.setAttribute('onmouseover','this.firstChild.scrolling="yes"');
//fuckyou.setAttribute('onmouseout','alert("sss")');
//fuckyou.setAttribute('onmouseout','this.firstChild.scrolling="no"');
//----------------------检测分辨率--------------------------------------------

if (screen.width == 1440)
showPage.width="60%";
else if (screen.width == 1366)
showPage.width="58%";
else if (screen.width == 1280)
showPage.width="55%";
else if (screen.width == 1024)
showPage.width="44%";


//------------------------Update log-------------------------------------------
//
//2012-06-27 增加分辨率检测，自动适应大小。
//			 识别鼠标活动，隐藏滚动条。
//			 修正页面显示bug。
//2012-07-26 更改图片，鼠标滑过，自动预览。
//------------------------Updata log-------------------------------------------