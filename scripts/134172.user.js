// ==UserScript==
// @name douban2mLook
// @author kong copyed from irachex
// @thanks irachex
// @description Found books in mLook when you see it on douban
// @include http://book.douban.com/*
// @include http://www.mlook.mobi/*
// @include http://www.douban.com/doulist/*
// ==/UserScript==


if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var isComplete=false;
var content;
var btn;

function ajaxget(url, fun) {
    setTimeout(function() {GM_xmlhttpRequest({
    	method: 'GET',
    	url: url,
    	onload: function(data) {
    	    content = data.responseText;
    	    isComplete = true;
            btn = handleResult(content,'');
            fun.call(this, btn);
    	}
    })}, 200);
}

function getQueryUrl(query) {
    //data is book title
    var timestamp = new Date().getTime();
    var url = "http://www.mlook.mobi/api/search?q={{query}}&limit=1&f=douban&timestamp="+timestamp;
    url = url.replace("{{query}}", query);
    return url;
}

function getBookUrl(id) {
    return "http://www.mlook.mobi/book/info/"+id;
}

function getButton(url,dbBookUrl) {
    var btn;
    
    if (url != '') {
        btn = '<a href="'+url+'?rel=doubanbook2mlook"  title="点击去 www.mlook.mobi 下载电子版" style="float:left;display: inline-block;background: #33A057;border: 1px solid #2F7B4B;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;" target="_blank">mLook download</a>';
    }
    else {
        btn = '<a href="http://www.mlook.mobi/book/upload/new_from_douban?title='+ query +'&rel=doubanbook2mlook&url='+dbBookUrl.toString()+'" title="mLook 没有找到书籍的电子版，如果你有，可以点击创建书籍" style="float:left;display: inline-block;background: #8D37C3;border: 1px solid #8D37C3;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;" target="_blank">添加到mLook</a>';
    }
    return btn;
}

function handleResult(content,dbBookUrl) {

    if(content != 'false' && content != '[]') {
        eval('info = '+content);
        var bookname = info.bookname;
        var id = info.bookid;
        //if (bookname == query) {}
        var downloadUrl = getBookUrl(id);
        return getButton(downloadUrl);
    } else {
        return getButton('',dbBookUrl);
    }
}

function main() {
    url = window.location.toString();
    
    // Book Page
    if ( url.indexOf('subject')!=-1 ){
        query = $("#mainpic img").attr("alt"); 
        var url = getQueryUrl(query);
        var that  = this;
        ajaxget(getQueryUrl(query), function(btn){
            $('div.a_stars').before(btn);
        });

    } else if( url.indexOf('doulist')!=-1 ){
        $('div.article table').each(function(){
            query = $('div.pl2 > a', this).text();
            var url = getQueryUrl(query);
            var that  = this;
            ajaxget(getQueryUrl(query), function(btn){
                $('td > span.rr', that).prepend(btn);
            });
        });
    } 
}

$(document).ready(function(){
    main();
});