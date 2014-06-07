// ==UserScript==
// @name        DoubanBook2SCNULib
// @namespace   http://www.softngr.org
// @description Show SCNU library status of douban books
// @include     http://book.douban.com/people/*
// @include     http://book.douban.com/subject/*
// @include     http://book.douban.com/tag/*
// @include     http://book.douban.com/doulist/*
// @grant       none
// @version     1
// ==/UserScript==
var base_search_url = "http://202.116.41.246:8080/opac/openlink.php?strSearchType=title&historyCount=1&strText={{data}}&x=31&y=12&doctype=ALL&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&location=ALL";


function getLibraryButton(keyword) {
    var search_url = base_search_url.replace("{{data}}", keyword);
    var borrowButton = $('<a href="'+search_url+'" style="float:left;display: inline-block;background: #33A057;border: 1px solid #2F7B4B;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;" target="_blank">借阅</a>');
    return borrowButton;
}

var url = window.location.toString();

// Book Page
if ( url.indexOf('subject')!=-1 ){
    var keyword;
    if ($("#info span:last").html().indexOf("isbn")!=-1) {
        keyword = $("#info").contents().slice(-3,-2)[0].nodeValue.trim();
    }
    else {
        keyword = $("#mainpic img").attr("alt");
    }
    $('div.a_stars').before(getLibraryButton(keyword));
}

// People's Book List Page
else if( (url.indexOf('mine')!=-1)||(url.indexOf('people')!=-1) ){
    $('div.item ul').each(function(){
        var keyword = $('li.title a em', this).html();
        $('div.opt-r', this).after(getLibraryButton(keyword).css("float","right"));      
    });
}

// System's Book List Page : doulist
else if( url.indexOf('doulist')!=-1 ){
    $('div.article table').each(function(){
        var keyword = $('div.pl2 a', this).html();
        $('td > span.rr', this).prepend(getLibraryButton(keyword));
    });
}

// System's Book List Page : tag
else if( url.indexOf('tag')!=-1 ){
    $('div.article table').each(function(){
        var keyword = $('div.pl2 a', this).html();        
        var kw = keyword.split("<span");
        var kword = kw[0];
        $('td p span.rr', this).prepend(getLibraryButton(kword));
    });
}
