// ==UserScript==
// @name           goToTop
// @version        2.1
// @namespace      http://userscripts.org/scripts/show/105411
// @include        *
// @author         anran
// @date           2011/6/24
// @require        http://code.jquery.com/jquery-1.6.min.js
// ==/UserScript==

/************************************************************
   更新日志
   10/21	菜单可选左右显示,减小触发区域,修复在twitter 饭否下的 bug , 相关参数设置请在脚本中修改
   10/19	全新显示方式,增加平滑滚动,谷歌站内搜索,相关参数请在脚本开始设置
 ************************************************************/
//----各种参数----//
var speedOfGoToTop = 1000;			//滚动到顶部的速度 , 越大越慢 , 0为关闭
var speedOfGoToBottom = 1000;		//滚动到底部的速度 , 越大越慢 , 0为关闭
var position = "left";				//面板位置

//----脚本开始----//
init();
function init() {
	var marginLeft1 = "85px";
	var marginLeft2 = "2px";
	
	if(window != window.top)
		return;
	
	if(position == "left"){
		position+=":0px;"
		marginLeft1 = "-" + marginLeft1;
		marginLeft2 = "-" + marginLeft2;
	} else {
		position+=":85px;"
	}
	
	//设置样式
	var css = "\
		ul#navigationMenu {\
			position: fixed;\
			margin: 0px;\
			padding: 0px;\
			top: 20%;"
			+ position +
			"list-style: none;\
			z-index:9999;\
		}\
		ul#navigationMenu li {\
			width: 20px;\
		}\
		ul#navigationMenu li a {\
			display: block;\
			margin-left: -2px;\
			width: 100px;\
			height: 70px;\
			background-color:#CFCFCF;\
			background-repeat:no-repeat;\
			background-position:center center;\
			border:1px solid #AFAFAF;\
			-moz-border-radius:10px 10px 10px 10px;\
			-webkit-border-bottom-right-radius: 10px;\
			-webkit-border-top-right-radius: 10px;\
			-khtml-border-bottom-right-radius: 10px;\
			-khtml-border-top-right-radius: 10px;\
			-moz-box-shadow: 0px 4px 3px #000;\
			-webkit-box-shadow: 0px 4px 3px #000;\
			opacity: 0.6;\
			filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);\
		}\
		/**图标自定义*/\
		ul#navigationMenu .goToTop a{\
			background-image: url(http://b.dryicons.com/images/icon_sets/coquette_part_5_icons_set/png/64x64/green_arrow_up.png);\
		}\
		ul#navigationMenu .goToBottom a      {\
			background-image: url(http://c.dryicons.com/images/icon_sets/coquette_part_5_icons_set/png/64x64/green_arrow_down.png);\
		}\
		ul#navigationMenu .searchByGoogle a      {\
			background-image: url(http://tympanus.net/Tutorials/FixedNavigationTutorial/images/search.png);\
		}\
		/**\
		ul#navigationMenu .podcasts a      {\
			background-image: url(http://tympanus.net/Tutorials/FixedNavigationTutorial/images/ipod.png);\
		}\
		ul#navigationMenu .rssfeed a   {\
			background-image: url(http://tympanus.net/Tutorials/FixedNavigationTutorial/images/rss.png);\
		}\
		ul#navigationMenu .photos a     {\
			background-image: url(http://tympanus.net/Tutorials/FixedNavigationTutorial/images/camera.png);\
		}\
		ul#navigationMenu .contact a    {\
			background-image: url(http://tympanus.net/Tutorials/FixedNavigationTutorial/images/mail.png);\
		}*/\
		";
		
	addStyle(css);
	
	//添加面板 ,配置是否可见及排序
	$(document.body).append('\
			<ul id="navigationMenu">\
	            <li class="goToTop"><a href=javascript:void(0); title="跳转到顶部"></a></li>\
	            <li class="goToBottom"><a href=javascript:void(0); title="跳转到底部"></a></li>\
	            <li class="searchByGoogle"><a href=javascript:void(0); title="google站内搜索"></a></li>\
	            <!--不需要的图标请放到下面\
	            <li class="photos"><a href=javascript:void(0); title="Photos"></a></li>\
	            <li class="rssfeed"><a href=javascript:void(0); title="Rss Feed"></a></li>\
	            <li class="podcasts"><a href=javascript:void(0); title="Podcasts"></a></li>\
	            <li class="contact"><a href=javascript:void(0); title="Contact"></a></li>\
	            -->\
        	</ul>')
        	
	//自动隐藏
	$('#navigationMenu a').stop().animate({
		'marginLeft' : marginLeft1
	}, 1000);
	$('#navigationMenu > li').hover(function() {
		$('a', $(this)).stop().animate({
			'marginLeft' : marginLeft2
		}, 200);
	}, function() {
		$('a', $(this)).stop().animate({
			'marginLeft' : marginLeft1
		}, 200);
	});
	
	//功能
	$html = $('html,body').eq(0);
	
	$("ul#navigationMenu .goToTop a").click(function() {
		$html.animate({
			scrollTop : 0
		}, speedOfGoToTop);
		return false;
	});

	$("ul#navigationMenu .goToBottom a").click(function() {
		$html.animate({
			scrollTop : document.body.clientHeight
		}, speedOfGoToBottom);
		return false;
	});

	$("ul#navigationMenu .searchByGoogle a").attr("href","javascript:q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22%E8%AF%B7%E8%BE%93%E5%85%A5%E5%85%B3%E9%94%AE%E8%AF%8D:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.google.com/search?num=100&hl=zh-CN&newwindow=1&q='+q+'&sitesearch='+location.host+'');window.open(qlocation);}%20void%200");
	
}
//增加样式
function addStyle(css) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
};

