// ==UserScript==
// @name DoubanBook2Shuim
// @author irachex
// @description Show shu.im links in Douban Book
// @include http://book.douban.com/*
// @include http://shu.im/*
// @include http://www.douban.com/doulist/*
// ==/UserScript==


if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var isComplete=false;
var content;
var btn;

function ajaxget(url) {
    setTimeout(function() {GM_xmlhttpRequest({
    	method: 'GET',
    	url: url,
    	onload: function(data) {
    	    content = data.responseText;
    	    isComplete = true;
    	}
    })}, 200);
}

function getQueryUrl(query) {
    //data is book title
    var timestamp = new Date().getTime();
    var url = "http://shu.im/search/all?q={{query}}&limit=1&timestamp="+timestamp;
    url = url.replace("{{query}}", query);
    return url;
}

function getBookUrl(id) {
    return "http://shu.im/books/"+id;
}

function getButton(url) {
    var btn;
    if (url != '') {
        btn = '<a href="'+url+'?rel=doubanbook2shuim"  title="点击去 shu.im 下载电子版" style="float:left;display: inline-block;background: #33A057;border: 1px solid #2F7B4B;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;" target="_blank">shu.im</a>';
    }
    else {
        btn = '<a href="http://shu.im/books/new?title='+ query +'&rel=doubanbook2shuim" title="shu.im 没有找到书籍的电子版，如果你有，可以点击创建书籍" style="float:left;display: inline-block;background: #cc2b2f;border: 1px solid #cc0007;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;" target="_blank">shu.im</a>';
    }
    return btn;
}

function handleResult(content) {
    var info = content.split('#!#');
    var title = info[0];
    var id = info[1];
    if (title == query) {
        var url = getBookUrl(id);
        return getButton(url);
    }
    else {
        return getButton('');
    }
}

function sendQuery(query, callback) {
    if (isComplete == false) {
        setTimeout(function() {
            sendQuery(query, callback);
        }, 200);
    }
    else {
        btn = handleResult(content);
        callback();
    }
}

function main() {
    url = window.location.toString();
    
    // Book Page
    if ( url.indexOf('subject')!=-1 ){
        query = $("#mainpic img").attr("alt"); 
        ajaxget(getQueryUrl(query));
        sendQuery(query, function() {
            btn = $(btn);
            $('div.a_stars').before(btn);
        });
    }
}

$(document).ready(function(){
    main();
});
