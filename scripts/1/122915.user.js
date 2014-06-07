// ==UserScript==
// @name		豆瓣猜你妹 DoubanGuessYourSisiter
// @description		为豆瓣添加各种人性化的功能。
// @author		jimmyleo
// @namespace		com.jimmyleo.douban.guessyoursister         
// @include		http://*.douban.com/*
// @version             0.05
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


Secondguess();
LifeStreamOptimize();
document.addEventListener( 'DOMNodeInserted', function(evt){ onDOMNodeInsertion(evt.target); }, false );


function onDOMNodeInsertion( node ){
	if ( 	'DIV' == node.tagName && 
			node.classList.contains('article') ){
		LifeStreamOptimize();
	}
}


function LifeStreamOptimize(){
	if ( 	'www.douban.com' == location.host &&
			( location.pathname.indexOf('/update/') || location.pathname.indexOf('/statuses') ) ){		
		BanReshare();
		ShowRawImage();
	}
}


function Secondguess(){
	if ( 'www.douban.com' == location.host ){
		if ( $('.site-nav-items:first') ){
		$('.site-nav-items:first').html('\
			<ul>\
				<li><a href="http://www.douban.com/update/">友邻广播</a></li>\
				<li><a href="http://www.douban.com/">猜你妹</a></li>\
				<li><a href="http://www.douban.com/mine/">我的豆瓣</a></li>\
				<li><a href="http://www.douban.com/group/">我的小组</a></li>\
				<li><a href="http://www.douban.com/site/">我的小站</a></li>\
			</ul>\
		');
		}
		if ( $('.site-nav-logo:first') ){
		$('.site-nav-logo:first').html('\
			<a href="http://www.douban.com/update/">\
				<img src="http://img1.douban.com/pics/nav/lg_main_a10.png" alt="豆瓣">\
			</a>\
		');
		}
	}
};


function BanReshare(){
	$('.status-item span').each( function(index){
		if ( -1 !== $(this).attr('class').indexOf('reshared_by') ){
			$(this).parents('.status-item').fadeOut(1000);
		}
	}
	);
};


function ShowRawImage(){
	$('.status-item .attachments img').each( function(index){
		if ( -1 !== $(this).attr('class').indexOf('upload-pic')){
			$(this).attr('src', $(this).attr('data-raw-src'));
			$(this).css('max-width', '480px');
		}
	}
	);
};