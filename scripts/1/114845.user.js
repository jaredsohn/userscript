// ==UserScript==
// @name           xiaojianzhu_editor
// @namespace      http://xiaojianzhu.com
// @description    this is for xiaojianzhu editor 
// @include        *
// @exclude        http://www.xiaojianzhu.com/*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            xjz_begin();
        }
    }


var imgSrc ;

function addTextBox() {
    var html = '<textarea id="xiaojianzhu_editor" style="position:fixed;top:200px;right:20px;height:200px;width:300px"></textarea>';
    $('body').append(html);

    var imgbox = '<div id="xiaojianzhu_imgbox" style="position:fixed;top:40px;right:20px;height:150px;width:100px"><div id="xjz_imgbox_in"></div><div id="xiaojianzhu_imgname"><a href="javascript:void(0);" id="xzj_add">添加这个图片</a></div></div>';
    $('body').append(imgbox);

    $('#xzj_add').click(function(){
        var html = $('#xiaojianzhu_editor').val();
　	var imgin = '<img src="'+ imgSrc +'"/>';
        $('#xiaojianzhu_editor').val(html+'\n' + imgin);
    });

    
}


function bindmouseover(){
$("img").live('mouseover',function(){
  var width = $(this).attr("width");
  var height = $(this).attr("height");
  if (imgSrc != $(this).attr("src")) {
  	imgSrc = $(this).attr("src");
　	var imgsquare = '<img src="'+imgSrc+'" style="width:80px;height:80px;"/>';
  	$('#xjz_imgbox_in').fadeOut();
  	$('#xjz_imgbox_in').html(imgsquare);
	$('#xjz_imgbox_in').fadeIn();
   }
         
});
}


function xjz_begin() {
    
    addTextBox();
	
    bindmouseover();



}
