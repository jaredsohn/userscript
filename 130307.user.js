// ==UserScript==
// @name           Jump to Top/Bottom
// @author         nhnhwsnh
// @namespace      http://www.renren.com/284775819
// @description    为网页增加向页尾、页首的按钮。
// @version        1.1
// @include        *
// @exclude     https://mail.google.com/*
// @exclude     https://*.google.com/reader/*
// @exclude     http://*.google.com/reader/*
// @exclude     http://dzh.mop.com/*
// @require        http://code.jquery.com/jquery-1.6.min.js
// ==/UserScript==

//----各种参数----//
var speedOfGoToTop = 1000;			//滚动到顶部的速度 , 越大越慢 , 0为关闭
var speedOfGoToBottom = 1000;		//滚动到底部的速度 , 越大越慢 , 0为关闭
/* ************************ 页面效果 ************************ */
//top按钮
$html = $('html,body').eq(0);
function create_back_to_top(TOP) {
if(document.body){
	var a = document.createElement('span');
	var c = 'opacity:0.3;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAEZJREFUGNNj6IABBgQLB2BME4CyxDoSIQymio52BTBLHaixCMRgrgCy2g2ALAuwac0MDCxQgx0YIqCsVhTbOIBUA9gUslkA7dcxR/3Xli8AAAAASUVORK5CYII=") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 0 0 5px;cursor:pointer;position:fixed;top:75%;width:60px;height:60px;right:-40px;z-index:9999';
	a.style.cssText = c;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1;}, false);
	a.addEventListener('mouseover', function(){ a.style.right = '0';}, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.3; }, false);
	a.addEventListener('mouseout', function(){ a.style.right = '-40px'; }, false);
	a.addEventListener('click', function() {$html.animate({scrollTop : 0}, speedOfGoToTop);return false;}, false );
	document.body.appendChild(a);
	}
};
if(self==top) create_back_to_top();
//bottom按钮
function create_back_to_bottom(BOTTOM) {
if(document.body){
    var windowHeight = $(window).height();
    var newHeight = document.body.scrollHeight + 9999999999;
	var b = document.createElement('span');
	var c = 'opacity:0.3;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAE1JREFUGNNjYGDg6OjoaGAAAfJZHTDAEAFltDKwQFkODAwWYEYzUCFzBZDRbgDSqw5kFYFNYaroaFcAsxjEOhIhDAbGNAEGHABhG5wFAH6qMUfw6SaOAAAAAElFTkSuQmCC") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 0 0 5px;cursor:pointer;position:fixed;top:85%;width:60px;height:60px;right:-40px;z-index:9999';
	b.style.cssText = c;
	b.addEventListener('mouseover', function(){ b.style.opacity = 1; }, false);
	b.addEventListener('mouseover', function(){ b.style.right = '0'; }, false);
	b.addEventListener('mouseout', function(){ b.style.opacity = 0.3; }, false);
	b.addEventListener('mouseout', function(){ b.style.right = '-40px'; }, false);
	b.addEventListener('click', GoToBottom, false);
	document.body.appendChild(b);
	}
};
function GoToBottom(){
    bodyHeight = document.body.scrollHeight,
    documentElementHeight = document.documentElement.scrollHeight;
    pageHeight = Math.max(bodyHeight, documentElementHeight);
    $html.animate({scrollTop : pageHeight}, speedOfGoToBottom);
    return false;
}
if(self==top) create_back_to_bottom();