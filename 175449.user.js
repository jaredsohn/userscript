// ==UserScript==
// @name        	Mr.Leo 
// @namespace   	http://userscripts.org/scripts/edit_src/175449
// @description 	userscript for mr. leo
// @match       	*
// @include     	*
// @require     	http://code.jquery.com/jquery-latest.js
// @require		http://jeromeetienne.github.io/jquery-qrcode/src/jquery.qrcode.js
// @require		http://jeromeetienne.github.io/jquery-qrcode/src/qrcode.js
// @updateURL		http://userscripts.org/scripts/source/175449.user.js
// @downloadURL		http://userscripts.org/scripts/source/175449.user.js
// @version      	0.1
// ==/UserScript==
//http://userscripts.org/scripts/edit_src/175449

var $ = unsafeWindow.jQuery;
console.log($);

//根据传入的URL，在head里生成script引用DOM对象
function createScriptLink(url){
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    console.log(scriptElement);
    document.head.appendChild(scriptElement);
}

//在head引入JQuery
;(function(){
    window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
    if (typeof jQuery == 'undefined') createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
})();

//页面右下角生成地址二维码
$(function(){
    createScriptLink('//jeromeetienne.github.io/jquery-qrcode/src/jquery.qrcode.js');
    createScriptLink('//jeromeetienne.github.io/jquery-qrcode/src/qrcode.js');
    
    var css = '<style>';
    css += '#code,#code_hover,#gotop{width:36px;height:48px;background:url(http://www.17sucai.com/preview/1093/2013-08-22/%E6%88%91%E5%96%9C%E6%AC%A2%E5%8F%B3%E4%BE%A7%E5%BE%AE%E4%BF%A1%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8/images/icon.png) no-repeat;position:fixed;right:50px;cursor:pointer;_position:absolute;_bottom:auto;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));}';
    css += '#code{background-position:-276px -258px;bottom:120px;_margin-bottom:120px;}';
    css += '#code_hover{background-position:-316px -258px;bottom:120px;_margin-bottom:120px;}';
    css += '#gotop{background-position:-276px -310px;bottom:67px;_margin-bottom:67px;} ';
    css += '#code_img{width:256px;height:256px;/*background:url(http://www.17sucai.com/preview/1093/2013-08-22/%E6%88%91%E5%96%9C%E6%AC%A2%E5%8F%B3%E4%BE%A7%E5%BE%AE%E4%BF%A1%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8/images/icon.png) -4px -3px no-repeat;*/position:fixed;right:90px;bottom:120px;cursor:pointer;display:none;_position:absolute;_bottom:auto;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));_margin-bottom:67px;}';
    css += '</style>';
    css += '<div id="code" title="扫描二维码"></div>';
    css += '<div id="code_img"></div>';
    css += '<a id="gotop" href="javascript:void(0)"></a>';
    $('body').append(css);
    
    var h = $(window).height();
	var t = $(document).scrollTop();
	if(t > h){
		$('#gotop').show();
	}else{
		$('#gotop').hide();
	}
	$('#gotop').click(function(){
		$(document).scrollTop(0);	
	});
	$('#code').hover(function(){
		$(this).attr('id','code_hover');
		$('#code_img').css('width','0px').show();
        $('#code_img').animate({
            width: '256px'
        }, 500);
	},function(){
		$(this).attr('id','code');
		//$('#code_img').hide(); 
        $('#code_img').animate({
            width: '0px'
        }, 500,function(){
         	$('#code_img').hide();   
        });
	})
    $(window).scroll(function(e){
        h = $(window).height();
        t = $(document).scrollTop();
        if(t > h){
            $('#gotop').show();
        }else{
            $('#gotop').hide();
        }		
    });
    //右下角二维码 eg.http://www.17sucai.com/pins/demoshow/2003
    $('#code_img').append('<div id="qrcodeTable" style="style="position: fixed; bottom: 120px; right: 100px; width: 256px; text-align: right; z-index: 99999;""></div> ');
    jQuery('#qrcodeTable').qrcode({
        text: "" + window.location.href
        //width:100,
        //height:100
    });
    /*
    $('#qrcodeTable').hover(
        function(){
            $(this).animate({
                left: '0px'
            }, 500);
        },
        function(){
            $(this).animate({
                left: '-290px'
            }, 500);
        }
    );
    */
    //删除iFrame中的二维码
    if(self.frameElement.tagName=="IFRAME"){
        $('#qrcodeTable').remove();
        $('#code').remove();
        $('#code_img').remove();
        $('#gotop').remove();
    }
});

//Google跳转
$(function(){
    var reg = /^https:\/\/www\.google\.com\.hk\/$/;
    var url = window.location;
    if(reg.test(url)){
        location.href="https://www.google.com/ncr";
    }
});

//爱唯侦察
$(function(){
    var reg;
    var url = window.location;
    //alert("UserScript-URL	:	"+url);
    
    //自动点击下载按钮
    reg = /^http:\/\/www3\..*$/;
    if(reg.test(url)){
        document.getElementById("down_btn").click();
        setTimeout(function(){
            window.close();
        },6000);
    }
    
    //自动关闭爱唯侦察下载弹窗
    reg = /^http:\/\/97\..*$/;
    if(reg.test(url)){
        if(window.location=="http://97.99bitgongchang.org/") return;
        if(/^http:\/\/97\..*\.html$/.test(window.location)) return;
        setTimeout(function(){
            window.close();
        },10);
    }   
});