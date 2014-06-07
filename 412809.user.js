// ==UserScript==
// @name       豆瓣东西
// @email      941245621@qq.com
// @author      178chenzhiyu
// @description 清理瀑布流加载过多卡死问题
// @namespace  
// @version    0.1
// @description  enter something useful
// @match      http://dongxi.douban.com/
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==
var indexcontnet=0;
var liboj=null;
function clearcon(){
	var ul=$('.cardlist');
	ul.css('min-height',$(ul).height());
	var val=parseInt($('#val').val());
	indexcontnet=val;
	//alert(indexcontnet);
	var li=$('li.carditem');
	li.each(function(i,o){
		if(i<indexcontnet){
			$(o).empty();
		}
	});
}
function clearconall(){
	var ul=$('.cardlist');
	ul.css('min-height',$(ul).height());
	var li=$('li.carditem');
	indexcontnet=li.size();
	li.each(function(i,o){
		$(o).empty();
	});
}
$(function(){
	var ele='<div class="clearCont"><input id="val" type="text" value="10" /><input id="btn" type="button" value="clear" /></div>';
    var sty='<style type="text/css">.clearCont{position:fixed;bottom:20px;left:20px;}.clearCont input[type="text"]{width:30px;height:60px;text-align:center;margin:0;padding:0;border:1px solid #aaa;margin:0;padding:0;}.clearCont input[type="button"]{width:60px;height:60px;background:rgba(0,0,0,0.55);border:none;padding:0;margin:0 0 0 10px;color:#fff;border-radius:5px;cursor:pointer;}.clearCont input[type="button"]:hover{background:rgba(0,0,0,0.85);}.carditem{height:495px;width:302px;}</style>';
	$('body').append(ele);
    $('body').append(sty);
	$('#btn').click(function(){
		clearcon();
	});
	$('#btnall').click(function(){
		clearconall();
	});
	$(window).scroll(function(){
		liboj=$('li.carditem');
		liboj.hover(function(){
			var i=liboj.index($(this));
			$('#val').val(i);
        },function(){});
	});
});
