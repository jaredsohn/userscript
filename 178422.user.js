// ==UserScript==
// @name        collection to inteye
// @author      inteye
// @website     http://www.inteye.com
// @namespace   com.taobao.alimama
// @description inteye's Application
// @include     http://*.alimama.com/*
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @require     http://www.jacklmoore.com/colorbox/jquery.colorbox.js
// @version     1
// ==/UserScript==

$(function(){
    var newStyle = document.createElement('style');
        newStyle.type = 'text/css';
        newStyle.innerHTML = '#colorbox, #cboxOverlay, #cboxWrapper{position:absolute; top:0; left:0; z-index:9999; overflow:hidden;} #cboxOverlay{position:fixed; width:100%; height:100%;} #cboxMiddleLeft, #cboxBottomLeft{clear:left;} #cboxContent{position:relative;} #cboxLoadedContent{overflow:auto; -webkit-overflow-scrolling: touch;} #cboxTitle{margin:0;} #cboxLoadingOverlay, #cboxLoadingGraphic{position:absolute; top:0; left:0; width:100%; height:100%;} #cboxPrevious, #cboxNext, #cboxClose, #cboxSlideshow{cursor:pointer;} .cboxPhoto{float:left; margin:auto; border:0; display:block; max-width:none; -ms-interpolation-mode:bicubic;} .cboxIframe{width:100%; height:100%; display:block; border:0;} #colorbox, #cboxContent, #cboxLoadedContent{box-sizing:content-box; -moz-box-sizing:content-box; -webkit-box-sizing:content-box;} #cboxOverlay{background:url(http://www.jacklmoore.com/colorbox/example1/images/overlay.png) repeat 0 0;} #colorbox{outline:0;} #cboxTopLeft{width:21px; height:21px; background:url(http://www.jacklmoore.com/colorbox/example1/images/controls.png) no-repeat -101px 0;} #cboxTopRight{width:21px; height:21px; background:url(http://www.jacklmoore.com/colorbox/example1/images/controls.png) no-repeat -130px 0;} #cboxBottomLeft{width:21px; height:21px; background:url(http://www.jacklmoore.com/colorbox/example1/images/controls.png) no-repeat -101px -29px;} #cboxBottomRight{width:21px; height:21px; background:url(http://www.jacklmoore.com/colorbox/example1/images/controls.png) no-repeat -130px -29px;} #cboxMiddleLeft{width:21px; background:url(http://www.jacklmoore.com/colorbox/example1/images/controls.png) left top repeat-y;} #cboxMiddleRight{width:21px; background:url(http://www.jacklmoore.com/colorbox/example1/images/controls.png) right top repeat-y;} #cboxTopCenter{height:21px; background:url(http://www.jacklmoore.com/colorbox/example1/images/border.png) 0 0 repeat-x;} #cboxBottomCenter{height:21px; background:url(http://www.jacklmoore.com/colorbox/example1/images/border.png) 0 -29px repeat-x;} #cboxContent{background:#fff; overflow:hidden;} .cboxIframe{background:#fff;} #cboxError{padding:50px; border:1px solid #ccc;} #cboxLoadedContent{margin-bottom:28px;} #cboxTitle{position:absolute; bottom:4px; left:0; text-align:center; width:100%; color:#949494;} #cboxCurrent{position:absolute; bottom:4px; left:58px; color:#949494;} #cboxLoadingOverlay{background:url(http://www.jacklmoore.com/colorbox/example1/images/loading_background.png) no-repeat center center;} #cboxLoadingGraphic{background:url(http://www.jacklmoore.com/colorbox/example1/images/loading.gif) no-repeat center center;} #cboxPrevious, #cboxNext, #cboxSlideshow, #cboxClose {border:0; padding:0; margin:0; overflow:visible; width:auto; background:none; } #cboxPrevious:active, #cboxNext:active, #cboxSlideshow:active, #cboxClose:active {outline:0;} #cboxSlideshow{position:absolute; bottom:4px; right:30px; color:#0092ef;} #cboxPrevious{position:absolute; bottom:0; left:0; background:url(http://www.jacklmoore.com/colorbox/example1/images/controls.png) no-repeat -75px 0; width:25px; height:25px; text-indent:-9999px;} #cboxPrevious:hover{background-position:-75px -25px;} #cboxNext{position:absolute; bottom:0; left:27px; background:url(http://www.jacklmoore.com/colorbox/example1/images/controls.png) no-repeat -50px 0; width:25px; height:25px; text-indent:-9999px;} #cboxNext:hover{background-position:-50px -25px;} #cboxClose{position:absolute; bottom:0; right:0; background:url(http://www.jacklmoore.com/colorbox/example1/images/controls.png) no-repeat -25px 0; width:25px; height:25px; text-indent:-9999px;} #cboxClose:hover{background-position:-25px -25px;} .cboxIE #cboxTopLeft, .cboxIE #cboxTopCenter, .cboxIE #cboxTopRight, .cboxIE #cboxBottomLeft, .cboxIE #cboxBottomCenter, .cboxIE #cboxBottomRight, .cboxIE #cboxMiddleLeft, .cboxIE #cboxMiddleRight {     filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF); }';
    document.getElementsByTagName('head')[0].appendChild(newStyle);	
	$('.list-info').each(function(i, m){
	   var id = getNumId($(m).children('.pic').attr('href'));
	   $(m).children('.shopkeeper').append('&nbsp;<a href="http://api.inteye.com/caiji?iid='+id+'" onclick="return false;" style="color:#ff0000;font-weight:bold;border:2px solid #ccc; background-color:#f1f1f1; padding:3px;text-decoration:none;" class="goods">AddToMyCart</a>');
	});
	$(".goods").colorbox({iframe:true, innerWidth:600, innerHeight:340});
});

KISSY.ready(function(S){
    var id = getUrlArg('auction_id');
     KISSY.use('med-dialog,switchable',function(){
        KISSY.one('.med-tip-b').hide();
        parent.KISSY.one('.ks-stdmod-header').html('Add To IntEYE\'s Apps');
        parent.KISSY.one('.btnoperate').hide();
        KISSY.one('.ks-switchable-panel').hide();
        KISSY.one('#J_urlRadio').fire('click');
        var url = $('#J_codeArea').val();
        window.location.href='http://api.inteye.com/caiji?iid='+id+'&url='+encodeURIComponent(url);
    });
});

function getUrlArg(key) {						//获取地址栏参数的值
	re = new RegExp("^"+key+"=","i");			//创建正则 相当于/^id=/i
	var arg = location.search;
	var tmparr = arg.substr(1, arg.length).split("&");
	for (i in tmparr) {
		n = tmparr[i];							//每一项 如:id=123456789
		if ( re.test(n) ) {						//如果含有key的字符串
			value = n.substr(key.length+1);		//取出key的值(+1是因为等于号)
			return value;
		}
	}
	return 0;
}

function getNumId(url) {
    if (url == undefined) {
        return "";
    }
    var link = url.split('=');
    return link[1];
}