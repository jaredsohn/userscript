// ==UserScript==
// @name            MediaWiki TOC Floatable
// @description     key "m" and "Ctrl+Left mouse" to show ,“ESC” to Hide
// @source          http://userscripts.org/scripts/show/50864
// @identifier      http://userscripts.org/scripts/source/50864.user.js
// @date            2009-07-26
// @author          LajiCF
// @namespace       http://blog.suflanker.com
// @include         http://zh.wikipedia.org/*
// @include         http://en.wikipedia.org/*
// @require http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version         0.2
/* @reason
	V0.2 增加自动更新功能	
	@end*/
// ==/UserScript==
var thisScript = {
name: "MediaWiki浮动目录", 
id: "50864",
version:"0.2"
}
var updater = new Updater(thisScript); 
updater.check(); 


//参数定义
var TOCX = 0; //TOC坐标
var TOCY = 0; 
var Toc; 
//事件响应 
function KeyPress(e) {   
    if (e.keyCode==27) { //Esc键隐藏Toc
        hideTOC();		
        return
    }   
	if (e.charCode==109) { //'m'键显示TOC
		if (!Toc) {
		  showTOC();		
		  return
		}	
		if(Toc.style.display=='block') {
			hideTOC();
			return
		}else {
			showTOC();	
			return
		}       	
    }    
}
//鼠标抬起响应
function mouseupHandler(e){
	if (e == null) return;	
	TOCX = e.layerX - 20 + document.body.scrollLeft; 
	TOCY = e.layerY - 40 + document.body.scrollTop; 
	if ( e.ctrlKey && e.button==0 ){ //Ctrl+鼠标左键弹出TOC		
		showTOC();
		return
	} 
}
function mousemoveHandler(e) {
	if (e == null) return;	
	TOCX = e.layerX - 20 + document.body.scrollLeft; 
	TOCY = e.layerY - 40 + document.body.scrollTop; 
}
 
function TocClick(e) {
    if (window.IsMouseOverToc) //点击Toc后将其隐藏
		hideTOC();   
}
document.addEventListener('keypress', KeyPress, false);
document.addEventListener('mouseup',mouseupHandler,false);
document.addEventListener('click', TocClick, false);
document.addEventListener('mousemove',mousemoveHandler,false); 
//以下是功能函数
function hide(elm) {if (elm) elm.style.display='none'}	//隐藏元素
function show(elm) {if (elm) elm.style.display='block'} //显示元素 
//显示Toc
function showTOC() {
	var visible = (Toc && (Toc.style.display != 'none'))	
    if (!Toc) {
		Toc = buildToc();		
		show(Toc);
	}else {
		changePosition();
		show(Toc);
	}
 }
//隐藏Toc
function hideTOC() {
    hide(Toc);
}
//设置Toc位置
function changePosition() {
	if(!Toc) return;
	Toc.setAttribute('style', 'top:' + TOCY + 'px;left:' + TOCX + 'px;position:absolute;');
} 
//获取Toc
function buildToc() {
	Toc = document.getElementById('toc');
	Toc.setAttribute('style', 'top:' + TOCY + 'px;left:' + TOCX + 'px;position:absolute;');
    window.IsMouseOverToc = false; //点击Toc时将其隐藏
    Toc.addEventListener('mouseover', function(e){window.IsMouseOverToc = true;}, false);
    Toc.addEventListener('mouseout', function(e){window.IsMouseOverToc = false;}, false);
    return Toc;
 
}