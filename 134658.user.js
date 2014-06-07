// ==UserScript==
// @name          万卷书|爱看豆
// @namespace     com.douban.book
// @version	  1.1
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
    var WRAPPER_TMPL =  '<div class="gray_ad">'+
	'<h2><a href="http://ikandou.com/" target="_blank">爱看豆电子书下载››</a></h2>' +
	'<ul class="bs"><li class="msg" style="display:none;color:#333;">' +
	'万卷书上还没有这本书,你可以考虑<a target="_blank" href="http://ikandou.com/book/upload">上传一本</a>,'+
	'<br>或者<a href="http://ikandou.com">去看看</a>其它有趣的电子书</li></ul>'+
	'</div>',
        ITEM_TMPL_RELATED = '<li><a target="_blank" href="{{=url }}" title="{{=author }}">{{=title }}</a><b class="pl" style="padding-left:5px;">{{=rating }}星</b><span style="padding-left:5px;color:green;">{{=related }}</span></li>';	

    window.processRelatedResult = function (results) {
	var element = $(WRAPPER_TMPL);
	var cnt=0;
	list = element.find("ul");
	$.each(results, function (idx, value) {
		var item=$(ITEM_TMPL_RELATED.replace("{{=url }}",value.url)
			   .replace("{{=title }}",value.title)
			   .replace("{{=rating }}",value.rating)
			   .replace("{{=author }}",value.author)
			   .replace("{{=related }}", value.related));
		if (!value.related){
		    item.css('font-weight','bold');
		}
		element.find("ul").append(item);
		cnt=cnt+1;
	    });
	$(".aside").prepend(element);
	if (!cnt)
	    element.find(".msg").show();
    }

    var ptags="";
    var tags = $('div#db-tags-section a');
    $.each(tags, function(idx,tag){
	    ptags = ptags+$(this).text()+",";
	});
    var subjectId = document.location.href.match(/(\d+)/)[1];
    var matchUrl = "http://ikandou.com/api/related?callback=processRelatedResult&version=1.1&bookid=" + subjectId + "&tags=" + ptags;
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
