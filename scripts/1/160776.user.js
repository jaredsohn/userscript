// ==UserScript==
// @name            Douban-rating-4-GDUFS-Library
// @description    	为GDUFS图书馆图书显示页面增加来自豆瓣的评分
// @include        http://opac.gdufs.edu.cn:8991/F/*
// @include        http://202.116.64.108:8991/F/*
// @require       http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.3.min.js
// @version       1.0.0
// @author	chendahui007@gmail.com
// ==/UserScript==
 
(function(){
    //var isbn0 = $('.td1').text().match(/([\d-]+)/ig)[0];
    //var isbn = isbn0.replace(/-/g, "");
    var link = document.querySelector('a[href*=dangdang]');
    var isbn = link.href.match(/[\d]+/ig)[1];
    console.log("isbn:"+isbn);
    
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://api.douban.com/book/subject/isbn/"+isbn+"?alt=json",
        //url: "https://api.douban.com/v2/book/isbn/:"+isbn;
        onload:function(response){
        var book = JSON.parse(response.responseText);
        var rating = book["gd:rating"]["@average"];
        var alt = book.link[1]["@href"];
        //console.log("alt:"+alt);
        //console.log("rating:"+rating);
        
        if(rating=="0"){
        rating = "暂无";
    }
        // show 1        
        $('<div>豆瓣评分:<a href="'+alt+'" target="_blank">'+rating+'</a></div>').insertAfter('#bigcover');
        // show 2 
        $('<tr><td class="td1" id="bold" width="15%" valign="top" nowrap colspan="1"><img src="http://opac.gdufs.edu.cn:8991/exlibris/aleph/u20_1/alephe/www_f_chi/icon/douban.jpg" border="0"> &nbsp;</td><td class="td1" align="left" colspan="1"><a href="'+alt+'" target="_blank">'+rating+'</a></td></tr>').insertAfter('tr:nth-child(10)');
    }
     });
})();