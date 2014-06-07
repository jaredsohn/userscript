// Hyread easy order book
// version 2013/12/10
// This script make you order book in hyread more easier.
// on the confirm window, just press space bar to order book
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hyread easy order book
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   click booking a book in hyread
// @include       http://*.ebook.hyread.com.tw/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// @require       http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js
// @grant         none
// ==/UserScript==

/* booking books */
if (location.href.indexOf('bookDetail.jsp') !== -1)
{
    if ($('#libbook td a').length > 0 ){
        var theUrl =$('#libbook td a').attr('href');
        $.get(theUrl, function(data){
            if (data.length > 0 ){}
        })
    }
    if ($('#taebcTrial td a').length > 0){
        var theUrl =$('#taebcTrial td a').attr('href');
        $.get(theUrl, function(data){
            if (data.length > 0 ){}
        })
    }
}


/* return books */
if (location.href.indexOf('memberLendFile.jsp') !== -1)
{
  var books = $('.usebtn2').length;
  if (books > 0){
    if (confirm('return all books?')) {
        $('.usebtn2').find('a').each(function () {
            theUrl = $(this).attr('href');
            $.get(theUrl,function(data){
                console.log(books);
                gotopage(books);
            });            
        })
        //if (books>0){setTimeout(gotopage(books),1000);}
    }
  }
}


function gotopage(no){
    //get the libraryname
    var no2 = location.href.indexOf('.ebook');    
    var libname = location.href.substring(7,no2);
    var url1 = 'http://'+libname+'.ebook.hyread.com.tw/group/memberLendFile.jsp';
    top.location.href=url1;
}