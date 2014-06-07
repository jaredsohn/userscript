// ==UserScript==
// @author         liangguohuan
// @email          liangguohuan@gmail.com
// @mod_date       2011-12-30
// @version        1.3
// @description    36kr.com 网站简洁单屏显示，滚动优化，支持自动翻页
// @name           36kr_new
// @namespace      36kr new
// @include        http://www.36kr.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// ==/UserScript==

/**
* 2011-12-30: 修正第一次滚动不平滑问题
*/

$(function(){

    //步长设置处理
    var key_step = '36kr_key_step_single';
    var step = GM_getValue(key_step) > 0 ? GM_getValue(key_step) : 1;
    GM_registerMenuCommand ( 	  	
	    '36kr单屏鼠标滚动步长切换' ,
	    commandFunc36kr
    ); 
    function commandFunc36kr(){
	    GM_getValue(key_step) == 2 ? GM_setValue(key_step, 1) : GM_setValue(key_step, 2);
	    step = GM_getValue(key_step);
    }
    
    //简化操作
    $('#featured,.orbit-wrapper').remove();
    
    //鼠标滚动事件
    var bLock = false;
	$('html,body').bind("DOMMouseScroll",function(event){
	    if (bLock) return true;
	    $('html,body').stop();
	    var duration = 300;
	    var rates = 300/600;
		var itag = getIndex();
		var target = -1;
		//GM_log("step:" + step);
		var setTop;
		if(event.detail<0){
			//up
			target = itag - step > 0 ? itag - step : -1;
			if (target > -1) {
			    setTop = $( $('.posts:has(h3)').get(target) ).offset().top -10;
			    duration = ($( $('.posts:has(h3)').get(itag) ).offset().top - $( $('.posts:has(h3)').get(target) ).offset().top) * rates;
			} else {
			    setTop = 0;
			}
		}else{
			//down
			target = itag + step >= $('.posts:has(h3)').size() ? $('.posts:has(h3)').size() -1 : itag + step;
			if (itag == 0 && parseInt($( $('.posts:has(h3)').get(itag) ).offset().top -10) != $(window).scrollTop()) {
			    target = 0;
			} else {
			    duration = ($( $('.posts:has(h3)').get(target) ).offset().top - $( $('.posts:has(h3)').get(itag) ).offset().top) * rates;
			}
		    setTop = $( $('.posts:has(h3)').get(target) ).offset().top -10;
		}
		if (Math.abs(duration) > 1000) duration = 300;
		$('html,body').animate({scrollTop:setTop}, duration, function(){ bLock = false; });
		//delete default browse mousewheel event
		event.preventDefault();
		return false;
	});

	function getIndex(){
		var scrollTop = $(window).scrollTop();
		var itag = 1;
		$('.posts:has(h3)').each(function(i){
			var postTop  = $(this).position().top; 
			if(scrollTop <= postTop) {
				itag = i;
				return false;
			}
		});
		itag -= 1;
		return itag;
	}
	
	//请求新数据提示层
	var floatdiv = '<div id="floatdiv" style="background-color: #ccc;font-weight:bold ;height: 30px; line-height: 30px; position: fixed; right: 5px;padding:0px 5px ;bottom: 3px; font-size: 14px;-moz-border-radius: 5px;-moz-border-radius-bottomleft: 0px;-moz-border-radius-bottomright: 0px; z-index:100001;display:none">请求数据...</div>';
	$(document.body).append(floatdiv);
	
	$('.pagination').parent().remove(); //删除分页导航

	var page = 1;
	var isLoad = false;
	$(window).scroll( function() { 
		var screenHeight = $(window).height();
		var scrollHeight = $(document).height();
		var scrollTop = $(document).scrollTop();
		if ( scrollTop > parseInt(scrollHeight*2/3) && isLoad == false) {
			page++;
			$('#floatdiv').show();

			GM_xmlhttpRequest({
			    method:'GET',
			    url:"http://www.36kr.com/page/" + page,
			    data:null,
			    onload: function(data){
			        $('#posts').append( $(data.responseText).find('.posts:has(h3)') );
			        $('#floatdiv').hide();
			        isLoad = false;
			    }
			});
			isLoad = true;   
		}
	} );
	
});