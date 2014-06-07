// ==UserScript==
// @name		Jump to Top/Bottom of page with hotkeys_修改版
// @author	windup	
// @namespace	*	
// @description		Jump to Top/Bottom of page with hotkeys_修改版。
// @require     	http://libs.baidu.com/jquery/1.9.1/jquery.min.js
// @version     	1.1
// @include     	*
// @exclude     	https://mail.google.com/*
// @exclude     	*.google.com/reader/*
// @exclude     	http://dzh.mop.com/*
// @exclude     	http://www.douban.com/photos/*
// @icon			data:image/png;base64,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
// ==/UserScript==

/* ************************ 页面效果 ************************ */
//top按钮
function create_top_button() {
	var a = document.createElement('span');
	var c = 'opacity:0.0;-moz-transition-duration:0.2s;-webkit-transition-duration:1.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAEZJREFUGNNj6IABBgQLB2BME4CyxDoSIQymio52BTBLHaixCMRgrgCy2g2ALAuwac0MDCxQgx0YIqCsVhTbOIBUA9gUslkA7dcxR/3Xli8AAAAASUVORK5CYII=") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 5px 5px 5px;cursor:pointer;position:fixed;bottom:50%;width:40px;height:40px;right:0px;z-index:9999';
	a.style.cssText = c;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1;}, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.0; }, false);
	a.addEventListener('click', function(){ $("body").animate({ scrollTop:0}); }, false );
	document.body.appendChild(a);
};
if(self == top) create_top_button();
//bottom按钮
function create_bottom_button() {
    var newHeight = document.body.scrollHeight + 9999999999;
	var b = document.createElement('span');
	var c = 'opacity:0.0;-moz-transition-duration:0.2s;-webkit-transition-duration:1.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAE1JREFUGNNjYGDg6OjoaGAAAfJZHTDAEAFltDKwQFkODAwWYEYzUCFzBZDRbgDSqw5kFYFNYaroaFcAsxjEOhIhDAbGNAEGHABhG5wFAH6qMUfw6SaOAAAAAElFTkSuQmCC") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 5px 5px 5px;cursor:pointer;position:fixed;top:51%;width:40px;height:40px;right:0px;z-index:9999';
	b.style.cssText = c;
	b.addEventListener('mouseover', function(){ b.style.opacity = 1; }, false);
	b.addEventListener('mouseout', function(){ b.style.opacity = 0.0; }, false);
    b.addEventListener('click', function(){  $("html,body").animate({ scrollTop:document.body.scrollHeight}); }, false);
	document.body.appendChild(b);
};
if(self==top) create_bottom_button();

//翻页快捷键
(function () {
    var newHeight = document.body.scrollHeight + 9999999999;
    var scroll = {
        'j' : function() { scrollBy(0,  40);},
		'J'	: function() { scrollBy(0,  40)}, 						// 往下翻一点点
        'n' : function() { scrollBy(0,  150)},
		'N' : function() { scrollBy(0,  150)}, 					// 往下翻多一点
		'd' : function() { scrollBy(0,  window.innerHeight / 2)},
		'D' : function() { scrollBy(0,  window.innerHeight / 2)},  // 往下翻（最多）
		
		'k' : function() { scrollBy(0, -40)},
		'K' : function() { scrollBy(0, -40)}, 						// 往上翻一点点
        'm' : function() { scrollBy(0, -150)},
		'M' : function() { scrollBy(0, -150)}, 					// 往上翻多一点
		'a' : function() { scrollBy(0, -window.innerHeight / 2)},
		'A' : function() { scrollBy(0, -window.innerHeight / 2)},  // 往上翻（最多）
		
		'w' : function() { $("html,body").animate({ scrollTop:0}); },
		'W' : function() { $("html,body").animate({ scrollTop:0}); },						// 回页首
		
		's' : function() { $("html,body").animate({ scrollTop:document.body.scrollHeight}); },
		'S' : function() { $("html,body").animate({ scrollTop:document.body.scrollHeight});},					// 回页尾
    };
    var formElement = { 'input':true, 'button':true, 'select':true, 'textarea':true };
    window.addEventListener('keypress',
        function(e) {
            if (e.metaKey || e.ctrlKey || e.altKey ||
                formElement[e.target.tagName.toLowerCase()] || e.target.isContentEditable || document.designMode ==="on") {
                return; }
            var key = (e.shiftKey? 'S-' : '') + String.fromCharCode(e.charCode);
            if (scroll[key]) {
                scroll[key]();
                e.preventDefault();
                e.stopPropagation();
            }
        }, false);
})();

/* 
//快速跳转至Firefox吧
var Firefox = /tieba\.baidu\.com/i.test(location.href);
!Firefox && openFirefoxBar();// 判断是否为贴吧页面
function openFirefoxBar(){
	var k=[];
	document.addEventListener('keydown', function(e){
		k.push(e.keyCode);
		if(k.toString().indexOf('70,73,82,69,70,79,88')>=0){
		   GM_openInTab('http://tieba.baidu.com/f?kw=firefox');
		   k=[];
		}
	}, false); 
};
*/

//自动更新
//new Updater({name: 'Jump to Top/Bottom of page with hotkeys',id: '108242',version: '1.9.6'}).check();