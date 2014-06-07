// ==UserScript==
// @name       滚动条
// @namespace  http://weibo.com/monsm
// @version    0.2
// @description  变色的滚动条啊
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match      http://*/*
// @include      http*://*/*
// @author	monsm
// @copyright  2013+, monsm
// ==/UserScript==


    var css  = '@namespace url(http://www.w3.org/1999/xhtml);';
            css += '::-webkit-scrollbar {width:15px;height:15px;}';
            css += '::-webkit-scrollbar-track-piece {background-color:#fff;opacity: 0;}';
            css += '::-webkit-scrollbar-thumb:vertical {background-color:rgba(0,0,0,0.2);height:20px;border-right:4px solid #fff;border-left:4px solid #fff}';
            css += '::-webkit-scrollbar-thumb:horizontal {background-color:rgba(0,0,0,0.2);width:20px;border-top:4px solid #fff;border-bottom:4px solid #fff}';
            css += '::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,0.4)}';
            css += 'body::-webkit-scrollbar{display:none;}';
            css += 'html::-webkit-scrollbar{display:none;}';
            css += '.wsx_scroll{z-index:999999999999;width:30px; position: fixed;right: 0px; top: 0px; display:none; -webkit-user-select: none; transition: opacity 200ms linear;padding:0;margin:0;}';
            css += '.wsx_scroll_bar{position: relative; height:100%; pointer-events: none; -webkit-user-select: none;padding:0;margin:0;}';
            css += '.wsx_fade{z-index:9999999999999;position: fixed;right: 0px;top: 0px; width: 45px;display:block;height:100%;pointer-events: none; -webkit-user-select: none;padding:0;margin:0;}';            
        GM_addStyle(css);
$(function(){
var config = {
	'backgroundColor': ['#f60', '#0A90CF', '#CC0F16', '#111', '#427700', '#E00'],
	'opacity': 0.6,
	'borderRadius': '3px',
	'width': '6px',
	'left': '19px'
}

var rand = parseInt(6*Math.random());


$('<div class="wsx_fade"></div><div class="wsx_scroll"><div class="wsx_scroll_bar"></div></div>').appendTo('body');
$('.wsx_scroll_bar').css({'background-color': config.backgroundColor[rand], 'opacity': config.opacity, '-webkit-border-radius': config.borderRadius, 'width': config.width, 'left': config.left});


var content = document.documentElement?document.documentElement:document.body;
var change = $(window).height();
var scrollShow = false;
var wsx_t;

function upScrollHeight() {
	clearTimeout(wsx_t)
	var wHeight = $(window).height();
	//var docElemProp = window.document.documentElement.clientHeight;  
    //var wHeight = window.document.compatMode === "CSS1Compat" && docElemProp || window.document.body.clientHeight || docElemProp;  
	var dHeight = $(document).height();
	//var dHeight = window.document.height;
	var tmpScroll = $('.wsx_scroll');
	if(dHeight<=wHeight) {
		if (scrollShow == true) {
			tmpScroll.hide();
		}
		scrollShow = false;
    } else {
		tmpScroll.css({'display':'block', 'opacity':1 ,'pointer-events':'none'});
		scrollShow = true;
	}
	var scrollHeight = wHeight/dHeight*wHeight > 30 ? wHeight/dHeight*wHeight : 30;
	var top = $(document).scrollTop()/(dHeight-wHeight)*(wHeight-scrollHeight);
    tmpScroll.css({'top':top});
	tmpScroll.height(scrollHeight);

	wsx_t=setTimeout(function(){
		tmpScroll.css({'opacity':0, 'pointer-events':'none'});
		scrollShow = false;
	},500);
	//console.log(wHeight+' '+dHeight);
}
//setInterval use $().fadeOut() and i'll stop. why?
var init = window.setInterval(function() {
	if(change != content.scrollHeight) {
		change = content.scrollHeight;
		upScrollHeight();
	}
},100);

$(window).bind('scroll',function(){
	upScrollHeight();
});

$(window).bind('resize',function(){
	upScrollHeight();
});

var always;
var mousedown = false;
var in_mousedown = false;
var startY;
var Y;

$(window).bind('mousemove',function(event){
	if((content.clientWidth-event.clientX) < 40) {
	//console.log(content.clientWidth-event.clientX);
		if (scrollShow == false) {
			upScrollHeight();
		}
		clearTimeout(wsx_t)
		always = true;
		
	} else {
		if (always == true) {
			//console.log('always:'+always);
			always = false;
			wsx_t=setTimeout(function(){
				$('.wsx_scroll').css({'opacity':0, 'pointer-events':'none'})
				scrollShow = false;
			},500);
		}
	}
	if (mousedown == true) {
	$('.wsx_fade').css({'pointer-events':'auto'});
		var endY=event.clientY;
		var top=endY-startY+Y;
		if(top<0){
			top=0;
		}
		var max_height=$(window).height()-$('.wsx_scroll').height();
		if(top>max_height){
			top=max_height;
		}
		var scroll_top=top/($(window).height()-$('.wsx_scroll').height())*($(document).height()-$(window).height());
		$(document).scrollTop(scroll_top);
	}

});

$(window).bind('mousedown',function(event){
	startY = event.clientY;
	Y=$(document).scrollTop()/($(document).height()-$(window).height())*($(window).height()-$('.wsx_scroll').height());
	
	if((content.clientWidth-event.clientX) < 40 && (content.clientWidth-event.clientX) >= 0) {		
		console.log(content.clientWidth-event.clientX);
		mousedown=true;
		window.document.onselectstart=function(){
			return false;
		};
	}
});
$(window).bind('mouseup',function(event){
	document.onselectstart=null;
	mousedown=false;
	$('.wsx_fade').css({'pointer-events':'none'});
});

});

