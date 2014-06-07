// ==UserScript==
// @name        cg4douban
// @namespace   http://cg4douban
// @include       http://movie.douban.com/subject/*
// @include       http://music.douban.com/subject/*
// @include       http://book.douban.com/subject/*
// @version     1
// ==/UserScript==
//

var cgbtSearch = function(){
	var title = $('html head title').text();
	var keyword = title.replace( '(豆瓣)', '' ).trim();
	var url = 'http://cgbt.cn/browse.php?s='+keyword+'&c=0&st=1';
	var cgSearch = '<a href="'+url+'" title="搜晨光" target="_blank"><b>(晨光)</b></a>';
	$( 'h1 .year' ).append( cgSearch);
	
}
function contentEval( source ) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
contentEval( cgbtSearch );
