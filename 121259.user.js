// ==UserScript==
// @name           douban-rating
// @namespace      http://blog.h2ero.cn
// @description    优酷网 奇艺高清 土豆网电影电视剧列表添加豆瓣评分和评分人数，点击分数文字链接查看该电视剧/电影影评页面。
// @version        1.0
// @include        *
// @include        http://movie.youku.com/*
// @include        http://tv.youku.com/*
// @include        http://tv.tudou.com/*
// @include        http://movie.tudou.com/*
// @include        http://list.iqiyi.com/*
// @include        http://localhost/*
// @include        http://www.youku.com/
// @include        http://www.tudou.com/
// @include        http://www.iqiyi.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//style
GM_addStyle(".mvpic{ margin: 28px; position: absolute;display:none;}");
$(function() {
	get_star = function(name, str, title) {
		GM_xmlhttpRequest({
			method : "GET",
			url : "http://api.douban.com/movie/subjects?max-results=1&q=" + name,
			//url : "http://localhost/demo/demo.html",
			onload : function(response) {
				data = new DOMParser().parseFromString(response.responseText, "text/xml");
				var t = data.getElementsByTagName('entry');
				var rate = t[0].getElementsByTagName('gd:rating')[0].getAttribute('average');
				var numRaters = t[0].getElementsByTagName('gd:rating')[0].getAttribute('numRaters');
				var id = t[0].getElementsByTagName('id')[0].firstChild.nodeValue;
				var pic = t[0].getElementsByTagName('link')[2].getAttribute('href');
				//var imdb= t[0].getElementsByTagName('db:attribute')[7].firstChild.nodeValue;
				var href = t[0].getElementsByTagName('link')[1].getAttribute('href');
				eval(str);
			}
		});
	}
	//初始化,list为单个电影的class，title为电影名，eachEval为显示评分的语句，gloabalEval为全局运行，主要修改样式
	init = function(list, titleE, eachEval, globalEval) {
		$(list).each(function() {
			var title = $(titleE, this);
			var name = title.text();
			eval(globalEval);
			get_star(name, eachEval, title);
		});
	}
	//划词获取
	$('body').append('<div id="db-rating" style="display:none;background:#fff;border-radius: 4px 4px 4px 4px;box-shadow: 1px 1px 6px #000;color:#0B9D96;padding:2px;position:absolute;text-shadow:0 0 1px #FFF;">加载中.......</div>');
	$('body').mouseup(function(event) {
		var name = window.getSelection();
		if(name != '') {
			var top = document.body.scrollTop || document.documentElement.scrollTop;
			$('#db-rating').show().css('left', 20 + event.clientX + 'px').css('top', 20 + event.clientY + top + 'px');
			str = '$("#db-rating").html("豆瓣评分:<a class=rate target=_blank href=" + href + " ><img class=mvpic src="+pic+" />" + rate + "分</a>评分人数:(" + numRaters + ")")';
			get_star(name, str);
		} else {
			$('#db-rating').hide();
		}
	});
	//优酷
	function y() {
		if($('.p_title').length != 0)
			init('.p_title', 'a', 'title.after("<li>豆瓣评分:<a target=_blank href="+href+" >"+rate+"分</a></li><li>评分人数:("+numRaters+")</li>")', '');
	}

	y();
	$('.unifilter a,.sPageL a,.ico__pagenext').live('click', function() {
		setTimeout(y, 1500);
	});
	//土豆网
	if($('.showcase .row .txt').length != 0)
		init('.txt', 'a', 'title.parent().parent().find(".info").append("<li>豆瓣评分:<a target=_blank href=" + href + " >" + rate + "分</a></li><li>评分人数:(" + numRaters + ")</li>")', '');
	//qiyi
	if($('.twC').length != 0)
		init('.twC', '.h2Title1 a', 'title.after("豆瓣评分:<a target=_blank href=" + href + " >" + rate + "分</a>评分人数:(" + numRaters + ")")', '');
	if($('#rs li').length != 0)
		init('#rs li', 'a[alt]', 'title.after("<br>豆瓣评分:<a target=_blank href=" + href + " >" + rate + "分</a><br>评分人数:(" + numRaters + ")")', "$(this).css('height','auto')");
});
