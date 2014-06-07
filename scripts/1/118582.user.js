// ==UserScript==

// @name           36kr

// @author         liangguohuan

// @email          liangguohuan@gmail.com

// @description    36kr.com 网站简洁单屏显示，滚动优化，支持自动翻页

// @mod_date       2011-11-22

// @version        1.2

// @namespace      http://www.36kr.com/

// @include        http://www.36kr.com/*

// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js

// @resource jiathis http://v2.jiathis.com/code/jia.js?uid=1522335v=0929

// ==/UserScript==

var currUrl = document.location.href;

var regTest = /\/p\//



var sliderWidth = $('#sidebar').css('width').replace('px', '');

var wraperWidth = $('#wrapper').css('width').replace('px', ''); 

$('#header_wrap').remove();

$('#footer_wrap').remove();

$('#sidebar').remove();

$('.scroll_left').remove();

$('#pagination').remove();

$('#wrapper').css({

	'padding' : '10px 0px',

});



$('#content').css({

	'padding-left' : sliderWidth/2 + 'px',

});



//步长设置处理

var key_step = '36kr_key_step_single';

var step = GM_getValue(key_step) > 0 ? GM_getValue(key_step) : 2;

GM_registerMenuCommand ( 	  	

	'36kr单屏鼠标滚动步长切换' ,

	commandFunc36kr

); 

function commandFunc36kr(){

	GM_getValue(key_step) == 1 ? GM_setValue(key_step, 2) : GM_setValue(key_step, 1);

	step = GM_getValue(key_step);

}



//首页滚动处理

if( regTest.test(currUrl) == false ) {

	//鼠标滚动事件

	$('html,body').bind("DOMMouseScroll",function(event){
	    $('html,body').stop();

		var itag = getIndex();

		//GM_log("step:" + step);
		var setTop;

		if(event.detail<0){

			//up

			itag -= step;

			itag = itag < 0 ? 0 : itag;

			//$(window).scrollTop($( $('.post:has(h2)').get(itag) ).offset().top -10);
			setTop = $( $('.post:has(h2)').get(itag) ).offset().top -10;

			if(itag == 0) setTop = 0;

				//$(window).scrollTop(0);

		}else{

			//down

			itag += step;

			itag = itag >= $('.post:has(h2)').size() ? $('.post:has(h2)').size() -1 : itag;

			//$(window).scrollTop($( $('.post:has(h2)' ).get(itag) ).offset().top -10);
			setTop = $( $('.post:has(h2)' ).get(itag) ).offset().top -10;

		}
		$('html,body').animate({scrollTop:setTop}, 600);

		//delete default browse mousewheel event

		event.preventDefault();

		return false;

	});



	function getIndex(){

		var scrollTop = $(window).scrollTop();

		var itag = 0;

		$('.post:has(h2)').each(function(i){

			var postTop  = $(this).position().top; 

			//var postTop2 = $('.post:has(h2):eq(0)').next().first();

			if(scrollTop <= postTop) {

				itag = i;

				return false;

			}

		});

		return itag;

	}



	//请求新数据提示层

	var floatdiv = '<div id="floatdiv" style="background-color: #ccc;font-weight:bold ;height: 30px; line-height: 30px; position: fixed; right: 5px;padding:0px 5px ;bottom: 3px; font-size: 14px;-moz-border-radius: 5px;-moz-border-radius-bottomleft: 0px;-moz-border-radius-bottomright: 0px; display:none">请求数据...</div>';

	$(document.body).append(floatdiv);



	var page = 1;

	var isLoad = false;

	$(window).scroll( function() { 

		var screenHeight = $(window).height();

		var scrollHeight = $(document).height();

		var scrollTop = $(document).scrollTop();

		if (scrollHeight - screenHeight - scrollTop < 300 && isLoad == false) {

			//GM_log('scrollHeight：' + scrollHeight + ', scrollTop：' + scrollTop);

			page++;

			$('#floatdiv').show();

			$.get("http://www.36kr.com/page/" + page, function(data){

			   $('#content').append( $(data).find('.post:not(.scroll_left):has(h2)') );

			   $('#floatdiv').hide();

			   jiathisHanddle();  //处理Jisthis

			   newWinHanddle();   //新窗口打开详细页面

			   isLoad = false;

			});

			isLoad = true;   

		}

	} );



	function jiathisHanddle() {

		//$('body:eq(0)').append('<script charset="utf-8" src="http://v2.jiathis.com/code/jia.js?uid=1522335v=0929" type="text/javascript">');

		$('#jiathisScript').remove();

		var head = document.getElementsByTagName('head')[0];

		var script = document.createElement('script');

		script.type = 'text/javascript';

		script.id = "jiathisScript";

		var jQuery = GM_getResourceText('jiathis');

		script.innerHTML = jQuery;

		head.appendChild(script);

		//console.log('重新处理');

	}



	function newWinHanddle() {

		$('.post > h2 > a').attr('target', '_blank');

		$('.read-more > a').attr('target', '_blank');

	}

}