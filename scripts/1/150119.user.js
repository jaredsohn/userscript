// ==UserScript==
// @name        loveSimple
// @description	简化网页显示
// @namespace   http://www.huuxii.com
// @match		http://*.zmingcx.com/*
// @include		http://*.css88.com/*
// @include		http://*.google.com*
// @include		http://*.20rh.com/*
// @include     http://*blog.sina.com.cn/*
// @include     http://hi.baidu.com/*
// @include     http://*.cnblogs.com/*
// @include     http://*textuts.com/*
// @include     http://*tutsplus.com/*
// @include     http://*piaohua.com/*
// @require     http://code.jquery.com/jquery.min.js
// @require     http://www.zhangxinxu.com/study/js/mini/jquery.scrollLoading-min.js
// @version     1.1
// @grant       none
// ==/UserScript==

document.addEventListener('DOMNodeInserted',checksearch,false);
function checksearch(){
	var list = document.getElementById('ires');
	if(list){
		document.removeEventListener('DOMNodeInserted',checksearch,false);
		document.addEventListener('DOMNodeInserted',clear,false)
	};
}
function clear(){
	var items = document.querySelectorAll('a[onmousedown]');
	for(var i =0;i<items.length;i++){
		items[i].removeAttribute('onmousedown');
	}
}




//知更鸟zmingcx.com
if ( (/zmingcx.com/i).test(location.href) ) {
	$("#gg").remove();
	$("#top").remove();
	$("#header").remove();
	$("#featured").remove();
	$("#content").nextAll().remove();
	$("#map").remove();
	$(".entry_sb").nextAll().remove();
}


//WEB前端开发css88.com/archives
if ( (/css88.com\/archives/i).test(location.href) ) {
	$("#wrap").nextAll().remove();
	$("#header").children().remove();
	var post = $("[id^=post]");
	post.nextAll().remove();
	post.children(":not(.post-data,.post-txt)").remove();
	$("#sidebar").remove();
	$("#footer").remove();
}

//新浪博客blog.sina.com.cn
if ( (/blog.sina.com.cn/i).test(location.href) ) {
	$(".sinatopbar").remove();			//顶部条
	$("#column_1").remove();			//侧边栏
	$("#sinablogfooter").remove();		//脚步
	$("#ramdomVisitDiv").remove();		//右上角
	$("#openwin").remove();
	$("#blogTitle").nextAll().remove();	//移除标题以下的内容
	$(".popBox").remove();
}

//百度空间hi.baidu.com
if ( (/hi.baidu.com/i).test(location.href) ) {
	$("#modTopbar").remove();				//顶部条
	$(".mod-topspaceinfo").remove();		//header
	$(".mod-detail-pager").remove();		//页面导航
	$("#commentDetail").remove();			//最近访客
	$(".mod-footer").remove();				//footer
	$(".mod-post-info").remove();			//post文底
}

//博客园cnblogs.com
if ( (/cnblogs.com/i).test(location.href) ) {
	$("#header").remove();					//header
	$("#sideBar").remove();					//sideBar
	$("#topics").nextAll().remove();		//移除正文以下的内容
	$("#blog_post_info_block").remove();	//正文下面多余的
	$(".postDesc").remove();				//多余的
}

//textuts.com
if ( (/textuts.com/i).test(location.href) ) {
	$("#wrapper").nextAll().remove();		//移除正文以下的内容
	$("#sidebar").remove();					//sideBar
	$("#content .post").nextAll().remove();	//正文下面多余的
	$("#content .post .singlepost").nextAll().remove();
	$("#header ul span").remove();	
}

//tutsplus.com
if ( (/tutsplus.com/i).test(location.href) ) {
	$("#header_wrap").prevAll().remove();
	$("#header .rss_subscribe").remove();
	$("#header .twitter_subscribe").remove();
	$("#header .search_form").remove();
	$("#sidebar").remove();					//sideBar
	$("#page").prevAll().remove();
	$("#page .tut_bottom").remove();
	$("#page .post_inner_article").nextAll().remove();
	$("#page .post_inner_article > *").slice(-4).remove();
	$("#content_wrap").nextAll().remove();	//移除正文以下的内容
}

//google.com
if ( (/google.com/i).test(location.href) ) {
	// $(".mw").live("DOMNodeInserted",function(){
	// 	$("a[onmousedown]").removeAttr("onmousedown");
	// });
}

//飘花电影网piaohua.com
if ( (/piaohua.com/i).test(location.href) ) {
	$("#top").prevAll().remove();
	$("#main").nextAll().remove();
	$("iframe").remove();
	$("iframe,#cproIframe1holder,#cproIframe2holder").live("DOMNodeInserted",function(e){$(this).remove()});
	$("#nmr").remove();
}