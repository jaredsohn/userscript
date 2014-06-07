// ==UserScript==
// @name DoubanBook2Library
// @author irachex
// @description Show Fudan University's library links in Douban Book
// @include http://book.douban.com/*
// @include http://202.120.227.11/*
// @include http://www.douban.com/doulist/*
// ==/UserScript==


if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var base_search_url = "http://202.120.227.11/F/?func=find-b&local_base=FDU01&find_code=ISB&request={{data}}";
var base_detail_url = "";

function is_west(str) {
    return !(/[^\x00-\xff]/g.test(str));
}

function getLibraryButton(keyword, bookname) {
    var search_url = base_search_url.replace("{{data}}", encodeURIComponent(keyword));
    if (is_west(bookname)) {
        search_url = search_url.replace("FDU01", "FDU09");
    }
    if (keyword == bookname) {
        search_url = search_url.replace("ISB", "WRD");
    }
    var borrowButton = $('<a href="'+search_url+'" style="float:left;display: inline-block;background: #33A057;border: 1px solid #2F7B4B;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;" target="_blank">借阅</a>');
    return borrowButton;
}

var url = window.location.toString();

function main() {
// Book Page
if ( url.indexOf('subject')!=-1 ){
    var keyword;
    var bookname = $("#mainpic img").attr("alt");
    if ($("#info span:last").html().indexOf("ISBN")!=-1) {
        keyword = $("#info").contents().slice(-3,-2)[0].nodeValue.trim();
    }
    else {
        keyword = bookname;
    }
    $('div.a_stars').before(getLibraryButton(keyword, bookname));
}

// People's Book List Page
else if( (url.indexOf('mine')!=-1)||(url.indexOf('people')!=-1) ){
    $('div.item ul').each(function(){
        var keyword = $('li.title a em', this).html();
        $('div.opt-r', this).after(getLibraryButton(keyword, keyword).css("float","right"));      
    });
}

// System's Book List Page : doulist
else if( url.indexOf('doulist')!=-1 ){
    $('div.article table').each(function(){
        var keyword = $('div.pl2 a', this).html();
        $('td > span.rr', this).prepend(getLibraryButton(keyword, keyword));
    });
}

// System's Book List Page : tag
else if( url.indexOf('tag')!=-1 ){
    $('div.article table').each(function(){
        var keyword = $('div.pl2 a', this).html();        
        $('td p span.rr', this).prepend(getLibraryButton(keyword, keyword));
    });
}
}

$(document).ready(function(){
    main();
});