// ==UserScript==
// @name          掌上书苑豆瓣插件
// @namespace     www.cnepub.com
// @version	  1.2
// @include       http://book.douban.com/subject/*
// @exclude       http://movie.douban.com/
// @exclude       http://music.douban.com/
// @exclude       http://book.douban.com/
// @exclude       http://www.douban.com/*
// @exclude       http://9.douban.com/*
// @exclude       http://*.douban.com/subject/*/edit
// @exclude       http://*.douban.com/subject/*/update_image
// @exclude       http://*.douban.com/subject/*/edit?mine
// @exclude       http://*.douban.com/subject/*/new_version
// @exclude       http://*.douban.com/subject/*/offers
// @exclude       http://*.douban.com/subject/*/new_offer
// @exclude       http://*.douban.com/subject/offer/*/
// @exclude       http://*.douban.com/subject/*/cinema?view=ticket
// @exclude       http://*.douban.com/subject/*/doulists
// @exclude       http://*.douban.com/subject/*/all_photos
// @exclude       http://*.douban.com/subject/*/mupload
// @exclude       http://*.douban.com/subject/*/comments
// @exclude       http://*.douban.com/subject/*/reviews
// @exclude       http://*.douban.com/subject/*/new_review
// @exclude       http://*.douban.com/subject/*/group_collectors
// @exclude       http://*.douban.com/subject/*/discussion/
// @exclude       http://*.douban.com/subject/*/wishes
// @exclude       http://*.douban.com/subject/*/doings
// @exclude       http://*.douban.com/subject/*/collections
// ==/UserScript==

function init(){
    var WRAPPER_TMPL_CNEPUB =  
	'<div class="gray_ad">'+
	'<h2><a href="http://www.soepub.com" target="_blank">掌上书苑</a> 下载· · · · · ·</h2>' +
	'<ul class="bs"><li class="msg" style="display:none;color:#333;">' +
	'掌上书苑上还没有这本书,你可以考虑<a target="_blank" href="http://www.soepub.com/upload">上传一本</a>,'+
	'<br>或者<a href="http://www.soepub.com">去看看</a>其它电子书</li></ul>'+
	'</div>',
    ITEM_TMPL_RELATED_CNEPUB = '<li><span><a target="_blank" href="{{=url }}" title="{{=author }}">{{=title }}（{{=author }}）</a></span></li>';	
	ITEM_UPDATE_SCRIPT='<li><a style="float:right;margin-right:10px" href="http://www.soepub.com/plugins/douban/douban.user.js" target="_blank" title="更新插件">&gt;更新本插件</a></li>';
    window.processCnepubResult = function (results) {
	var element = $(WRAPPER_TMPL_CNEPUB);
	var cnt=0;
	list = element.find("ul");
	$.each(results, function (idx, value) {
		var item=$(ITEM_TMPL_RELATED_CNEPUB.replace("{{=url }}",value.url)
			   .replace(new RegExp("{{=title }}","gm"),value.title)
			   .replace(new RegExp("{{=author }}","gm"),value.author));
		element.find("ul").append(item);
		cnt=cnt+1;
	    });
	var update_script_item=$(ITEM_UPDATE_SCRIPT);
	element.find("ul").append(update_script_item);
		
	$(".aside").prepend(element);
	if (!cnt)
	    element.find(".msg").show();
    }
	
    var tag_title = $("h1 span");
	var btitle = "";
	$.each(tag_title, function(idx,title){
	    btitle = $(this).text();
	});
	
	var tag_authors = $("div#info span a");
	var bauthor = "";
	$.each(tag_authors, function(idx,author){
	    bauthor = bauthor + $(this).text() + ",";
	});

    var matchUrl = "http://www.soepub.com/api_douban/related.php?book_title=" + btitle + "&author=" + bauthor;
    $.getScript(matchUrl);
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
contentEval( init );